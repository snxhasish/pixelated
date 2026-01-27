import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const GIPHY_KEY = process.env.GIPHY_API_KEY!;
const BASE = "https://api.giphy.com/v1/gifs";

export async function GET(req: Request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");
    const limit = searchParams.get("limit") ?? "10";

    const endpoint = q
        ? `${BASE}/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(
            q
        )}&limit=${limit}&rating=pg-13`
        : `${BASE}/trending?api_key=${GIPHY_KEY}&limit=${limit}&rating=pg-13`;

    const res = await fetch(endpoint, {
        headers: {
            "Accept": "application/json"
        },
        next: {
            revalidate: 60
        },
    });

    const json = await res.json();
    const gifs = json.data.map((g: any) => ({
        id: g.id,
        width: g.images.fixed_width.width,
        height: g.images.fixed_width.height,
        mp4: g.images.fixed_width.mp4,
        webp: g.images.fixed_width.webp,
        preview: g.images.fixed_width_small.webp,
    }));

    return Response.json(gifs);
}
