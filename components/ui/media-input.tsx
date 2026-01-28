"use client";

import { ImagePlusIcon, XCircleIcon } from "lucide-react";
import Image from "next/image";
import Dropzone from "react-dropzone";
import { cn } from "@/lib/utils";

interface MediaFile {
  file?: File;
  url: string;
  type: "image" | "video";
}

interface MediaPreviewProps {
  media: MediaFile;
  onRemove: () => void;
}

export const MediaPreview = ({ media, onRemove }: MediaPreviewProps) => (
  <div className="relative col-span-1 aspect-square">
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
        src={media.url}
        width={500}
      />
    ) : (
      <video
        className="h-full w-full rounded-md border border-border object-cover"
        src={media.url}
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
  const handleDrop = (acceptedFiles: File[]) => {
    const newMediaFiles = acceptedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image/") ? ("image" as const) : ("video" as const),
    }));

    const updatedFiles = [...value, ...newMediaFiles].slice(0, maxFiles);
    onChange?.(updatedFiles);
  };

  const handleRemove = (index: number) => {
    const mediaToRemove = value[index];

    // Revoke URL if it's a blob URL
    if (mediaToRemove.url.startsWith('blob:')) {
      URL.revokeObjectURL(mediaToRemove.url);
    }

    const newMediaFiles = value.filter((_, i) => i !== index);
    onChange?.(newMediaFiles);
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="w-full flex flex-col gap-4">
        {value.length > 0 && (
          <div className="w-full grid grid-cols-5 gap-2">
            {value.map((m, i) => (
              <MediaPreview
                key={`${m.url}-${i}`}
                media={m}
                onRemove={() => handleRemove(i)}
              />
            ))}
          </div>
        )}

        {value.length < maxFiles && (
          <Dropzone
            accept={accept}
            maxFiles={maxFiles - value.length}
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
                  "w-full p-5 flex cursor-pointer  items-center justify-center gap-2 rounded-lg border border-dashed transition-colors focus:border-primary focus:outline-hidden",
                  {
                    "border-primary bg-secondary": isDragActive && isDragAccept,
                    "border-destructive bg-destructive/20":
                      isDragActive && isDragReject,
                  }
                )}
              >
                <input {...getInputProps()} />
                <div className="flex gap-2">
                  <ImagePlusIcon className="h-8 w-8 text-muted-foreground" strokeWidth={1} />
                </div>
                <p className="text-base font-medium text-muted-foreground text-center px-2">
                  Upload or drop media files
                </p>
              </div>
            )}
          </Dropzone>
        )}
      </div>
    </div>
  );
}

export function MediaList({ media, onChange }: { media: MediaFile[], onChange: (f: MediaFile[]) => void }) {
  const handleRemove = (index: number) => {
    const mediaToRemove = media[index];

    // Revoke URL if it's a blob URL
    if (mediaToRemove.url.startsWith('blob:')) {
      URL.revokeObjectURL(mediaToRemove.url);
    }

    const newMediaFiles = media.filter((_, i) => i !== index);
    onChange(newMediaFiles);
  };

  return (
    <div className="w-full grid grid-cols-5 gap-2">
      {media.map((m, i) => (
        <MediaPreview
          key={`${m.url}-${i}`}
          media={m}
          onRemove={() => handleRemove(i)}
        />
      ))}
    </div>
  )
}

export type { MediaFile };