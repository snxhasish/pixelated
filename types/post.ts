import { Track } from "@/components/app/music-select";
import { Show } from "@/components/app/show-select";

export type PostAttachment = {
    type: "image" | "video";
    url: string;
};

export type Post = {
    date: string;
    id: string;
    text?: string;
    attachments: PostAttachment[];
    show: Show | null;
    music: Track | null;
    color?: string;
    createdAt: Date;
    userId: string;
};