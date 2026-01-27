import { db } from "@/db";
import { post } from "@/db/schema";
import { validateAttachments, validateMediaUrl } from "@/lib/attachment";
import { auth } from "@/lib/auth";
import { isValidColor } from "@/lib/color";
import { headers } from "next/headers";

export async function POST(req: Request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const user = session.user;

    const {
        text,
        attachments = [],
        color,
        music = null,
        show,
        scheduledAt,
    } = await req.json();

    if (!text?.trim() && attachments.length === 0 && !music && !show)
        return Response.json({ error: "Post cannot be empty" }, { status: 400 });

    if (text && text.length > 250)
        return Response.json({ error: "Post text cannot exceed 250 characters." }, { status: 400 });

    if (color && isValidColor(color) !== true)
        return Response.json({ error: "Invalid color. Must be of type: HEX, RGB(A) or HSL(A)." });

    if (!validateAttachments(attachments)) {
        return Response.json(
            { error: "Invalid attachments format" },
            { status: 400 }
        );
    }

    for (const attachment of attachments) {
        const isValid = await validateMediaUrl(
            attachment.url,
            attachment.type
        );

        if (!isValid) {
            return Response.json(
                {
                    error: `Invalid ${attachment.type} URL`,
                    url: attachment.url,
                },
                { status: 400 }
            );
        }
    }

    if (scheduledAt && new Date(scheduledAt) < new Date())
        return Response.json({ error: "Scheduled time must be in the future" }, { status: 400 });

    const [createdPost] = await db
        .insert(post)
        .values({
            id: crypto.randomUUID(),
            userId: user.id,
            text,
            attachments,
            color,
            music,
            show,
            scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
            isPublished: scheduledAt ? false : true,
        })
        .returning({
            id: post.id,
            userId: post.userId,
            scheduledAt: post.scheduledAt,
            createdAt: post.createdAt,
            isPublised: post.isPublished,
        });

    return Response.json({ post: createdPost }, { status: 201 });
}
