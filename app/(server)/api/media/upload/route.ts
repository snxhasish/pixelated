import { auth } from "@/lib/auth";
import { client } from "@/sanity/lib/write-client";
import { headers } from "next/headers";

export const runtime = "nodejs";

export async function POST(req: Request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) return Response.json({ error: "No file" }, { status: 400 });

    const buffer = Buffer.from(await new Response(file).arrayBuffer());
    const asset = await client.assets.upload("image", buffer);

    const response = {
        id: asset._id,
        url: asset.url,
        width: asset.metadata.dimensions.width,
        height: asset.metadata.dimensions.height,
        size: asset.size,
        mimeType: asset.mimeType,
        blurHash: asset.metadata.blurHash ?? null,
    };

    return Response.json(response, { status: 201 })
}
