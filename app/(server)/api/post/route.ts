import { db } from "@/db";
import { post } from "@/db/schema";
import { desc, eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const posts = await db
        .select({
            id: post.id,
            text: post.text,
            attachments: post.attachments,
            show: post.show,
            music: post.music,
            color: post.color,
            createdAt: post.createdAt,
            userId: post.userId,
        })
        .from(post)
        .where(
            and(
                eq(post.userId, session.user.id),
                eq(post.isPublished, true),
                eq(post.isArchived, false),
            )
        )
        .orderBy(desc(post.createdAt))
        .limit(50);

    const postsWithDate = posts.map((p) => ({
        ...p,
        date: p.createdAt.toISOString().slice(0, 10),
    }));

    return Response.json({
        posts: postsWithDate
    });
}
