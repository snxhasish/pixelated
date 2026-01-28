import { Track } from "@/components/app/music-select";
import { Show } from "@/components/app/show-select";
import { MediaFile } from "@/components/ui/media-input";

export type Post = {
    date: string;
    id: string;
    text?: string;
    attachments: MediaFile[];
    show: Show | null;
    music: Track | null;
    color?: string;
    createdAt: Date;
    userId: string;
};