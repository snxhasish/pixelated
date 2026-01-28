import { MediaFile } from "@/components/ui/media-input";
import { PostAttachment } from "@/app/(client)/(app)/create/create-card";
import { useState } from "react";

export function useMediaUpload() {
    const [progress, setProgress] = useState({ current: 0, total: 0, success: 0, error: 0 });
    const [isUploading, setIsUploading] = useState(false);

    const uploadMedia = async (media: MediaFile[]) => {
        setIsUploading(true);
        setProgress({ current: 0, total: media.length, success: 0, error: 0 });

        const attachments: PostAttachment[] = [];

        for (const m of media) {
            if (m.url && m.url.startsWith("https://")) {
                attachments.push({
                    type: m.type,
                    url: m.url
                });
                setProgress((prev) => {
                    return {
                        current: prev.current + 1,
                        total: media.length,
                        success: prev.success + 1,
                        error: prev.error
                    };
                });
            }
            else if (m.file) {
                const formData = new FormData();
                formData.append("file", m.file);

                const response = await fetch("/api/media/upload", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.url) {
                        attachments.push({
                            type: m.type,
                            url: data.url
                        });
                        setProgress((prev) => {
                            return {
                                current: prev.current + 1,
                                total: media.length,
                                success: prev.success + 1,
                                error: prev.error
                            };
                        });
                    }
                    else
                        setProgress((prev) => {
                            return {
                                current: prev.current + 1,
                                total: media.length,
                                success: prev.success,
                                error: prev.error + 1
                            };
                        });
                }
                else
                    setProgress((prev) => {
                        return {
                            current: prev.current + 1,
                            total: media.length,
                            success: prev.success,
                            error: prev.error + 1
                        };
                    });
            }
            else
                setProgress((prev) => {
                    return {
                        current: prev.current + 1,
                        total: media.length,
                        success: prev.success,
                        error: prev.error + 1
                    };
                });
        }

        setIsUploading(false);

        return attachments;
    };

    return { uploadMedia, progress, isUploading };
}