"use client";

import { ImageIcon, VideoIcon, XCircleIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { cn } from "@/lib/utils";

interface MediaFile {
  file: File;
  preview: string;
  type: "image" | "video";
}

interface MediaPreviewProps {
  media: MediaFile;
  onRemove: () => void;
}

const MediaPreview = ({ media, onRemove }: MediaPreviewProps) => (
  <div className="relative aspect-square">
    <button
      type="button"
      className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-10"
      onClick={onRemove}
    >
      <XCircleIcon className="h-5 w-5 fill-primary text-primary-foreground" />
    </button>
    {media.type === "image" ? (
      <Image
        alt="Preview"
        className="h-full w-full rounded-md border border-border object-cover"
        height={500}
        src={media.preview}
        width={500}
      />
    ) : (
      <video
        className="h-full w-full rounded-md border border-border object-cover"
        src={media.preview}
      >
        <track kind="captions" />
      </video>
    )}
  </div>
);

interface MediaInputProps {
  value?: MediaFile[];
  onChange?: (files: MediaFile[]) => void;
  maxFiles?: number;
  accept?: {
    [key: string]: string[];
  };
  className?: string;
}

export default function MediaInput({
  value = [],
  onChange,
  maxFiles = 10,
  accept = {
    "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"],
    "video/*": [".mp4", ".mov", ".avi", ".webm"],
  },
  className,
}: MediaInputProps) {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(value);

  const handleDrop = (acceptedFiles: File[]) => {
    const newMediaFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("image/") ? ("image" as const) : ("video" as const),
    }));

    const updatedFiles = [...mediaFiles, ...newMediaFiles].slice(0, maxFiles);
    setMediaFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  const handleRemove = (index: number) => {
    const newMediaFiles = mediaFiles.filter((_, i) => i !== index);

    // Clean up object URL to prevent memory leaks
    URL.revokeObjectURL(mediaFiles[index].preview);

    setMediaFiles(newMediaFiles);
    onChange?.(newMediaFiles);
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {mediaFiles.map((media, index) => (
          <MediaPreview
            key={index}
            media={media}
            onRemove={() => handleRemove(index)}
          />
        ))}

        {mediaFiles.length < maxFiles && (
          <Dropzone
            accept={accept}
            maxFiles={maxFiles - mediaFiles.length}
            onDrop={handleDrop}
          >
            {({
              getRootProps,
              getInputProps,
              isDragActive,
              isDragAccept,
              isDragReject,
            }) => (
              <div
                {...getRootProps()}
                className={cn(
                  "flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed transition-colors focus:border-primary focus:outline-hidden",
                  {
                    "border-primary bg-secondary": isDragActive && isDragAccept,
                    "border-destructive bg-destructive/20":
                      isDragActive && isDragReject,
                  }
                )}
              >
                <input {...getInputProps()} />
                <div className="flex gap-2">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" strokeWidth={1.25} />
                  <VideoIcon className="h-8 w-8 text-muted-foreground" strokeWidth={1.25} />
                </div>
                <p className="text-xs text-muted-foreground text-center px-2">
                  Drop files or click
                </p>
              </div>
            )}
          </Dropzone>
        )}
      </div>
    </div>
  );
}

export type { MediaFile };