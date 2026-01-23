import { getSpotifyAccessToken } from "@/lib/spotify";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(req: Request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);

    const query = searchParams.get("q");
    if (!query) return Response.json({ error: "Missing search query" }, { status: 400 });

    const { access_token } = await getSpotifyAccessToken();

    const res = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
            query
        )}&type=track&limit=5`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    )

    if (!res.ok) return Response.json({ error: "Spotify search failed" }, { status: 500 });

    const data = await res.json();

    return Response.json(
        data.tracks.items.map((track: any) => ({
            id: track.id,
            name: track.name,
            artists: track.artists.map((a: any) => a.name).join(", "),
            album: track.album.name,
            image: track.album.images[0]?.url,
            preview_url: track.preview_url,
            spotify_url: track.external_urls.spotify,
        }))
    );
}
