import { MediaFile } from "@/components/ui/media-input";

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif"];
const VIDEO_EXTENSIONS = ["mp4", "webm", "mov", "m4v"];

function isValidUrl(url: string) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export async function validateMediaUrl(
    url: string,
    type: "image" | "video"
): Promise<boolean> {
    try {
        const res = await fetch(url, { method: "HEAD" });

        if (!res.ok) return false;

        const contentType = res.headers.get("content-type");
        if (!contentType) return false;

        if (type === "image" && !contentType.startsWith("image/")) {
            return false;
        }

        if (type === "video" && !contentType.startsWith("video/")) {
            return false;
        }

        return true;
    } catch {
        return false;
    }
}


export function validateAttachments(
    attachments: unknown
): attachments is Omit<MediaFile, "file">[] {
    if (!Array.isArray(attachments)) return false;

    return attachments.every((att) => {
        if (
            !att ||
            typeof att !== "object" ||
            !("type" in att) ||
            !("url" in att)
        ) {
            return false;
        }

        if (att.type !== "image" && att.type !== "video") {
            return false;
        }

        if (typeof att.url !== "string" || !isValidUrl(att.url)) {
            return false;
        }

        const ext = att.url.split(".").pop()?.toLowerCase();

        if (!ext) return false;

        if (
            att.type === "image" &&
            !IMAGE_EXTENSIONS.includes(ext)
        ) {
            return false;
        }

        if (
            att.type === "video" &&
            !VIDEO_EXTENSIONS.includes(ext)
        ) {
            return false;
        }

        return true;
    });
}
