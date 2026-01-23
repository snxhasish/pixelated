import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(req: Request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q");
    if (!q) {
        return Response.json([], { status: 200 })
    }

    const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
            q
        )}&include_adult=true`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
        }
    )

    if (!res.ok) {
        return Response.json({ error: "TMDB failed" }, { status: 500 })
    }

    const data = await res.json()

    const results = data.results
        .filter(
            (r: any) => r.media_type === "movie" || r.media_type === "tv"
        )
        .slice(0, 5)
        .map((r: any) => ({
            tmdbId: r.id,
            type: r.media_type, // movie | tv
            title: r.title ?? r.name,
            poster:
                r.poster_path
                    ? `https://image.tmdb.org/t/p/w342${r.poster_path}`
                    : null,
            releaseDate: r.release_date ?? r.first_air_date ?? null,
        }))

    return Response.json(results)
}
