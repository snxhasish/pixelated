import { Track } from "@/components/app/music-select";
import { Show } from "@/components/app/show-select";
import { Post, PostAttachment } from "@/types/post";

export const getPosts = async () => {
    const res = await fetch(`/api/post`, { credentials: "include" });
    if (!res.ok) return [];

    const data = await res.json();

    return data.posts as Post[];
}

export const createPost = async ({ text, color, attachments, music, show }: { text?: string, color?: string, attachments: PostAttachment[], music: Track | null, show: Show | null }) => {
    if (!text && attachments.length < 1 && !music && !show) return { error: "Nothing provided to post" };
    if (text && text.length > 250) return { error: "Post text must be shorter than 250 characters." };
    if (attachments && attachments.length > 5) return { error: "Cannot post more than 5 attachments." };

    const res = await fetch(`/api/post/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            text,
            attachments,
            color,
            music,
            show
        })
    });

    if (!res.ok) return { error: "Failed to post. Please retry." };

    const data = await res.json();
    return { data };
}
