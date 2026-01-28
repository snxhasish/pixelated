import { getReadableTextColor } from "@/lib/color"
import { MusicPreview, Track } from "./music-select";
import { Show, ShowPreview } from "./show-select";
import { PostAttachment } from "@/app/(client)/(app)/create/create-card";
import { MediaFile } from "../ui/media-input";
import MediaCarousel from "../ui/media-carousel";
import Image from "next/image";

export default function PostCard(
    {
        bg,
        text,
        music,
        show,
        attachments
    }: {
        bg: string,
        text: string,
        music: Track | null,
        show: Show | null,
        attachments: (MediaFile | PostAttachment)[]
    }
) {
    const textColor = getReadableTextColor(bg);

    return (
        <div
            className="w-full flex flex-col gap-4 sm:max-w-lg p-4 rounded-lg hover:scale-95 transition duration-500"
            style={{ backgroundColor: bg, color: textColor }}
        >
            {text && (
                <p className="text-base font-medium">
                    {text}
                </p>
            )}

            {music && (
                <MusicPreview
                    className="p-0"
                    track={music}
                    onHover={false}
                />
            )}

            {show && (
                <ShowPreview
                    className="p-0"
                    show={show}
                />
            )}

            {attachments.length > 0 && (
                <MediaCarousel
                    media={attachments}
                />
            )}
        </div>
    )
}

export const PostCardMedia = ({ type, url }: PostAttachment) => {
    return (
        <></>
    )
}