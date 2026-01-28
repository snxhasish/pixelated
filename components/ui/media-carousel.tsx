"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { MediaFile } from "./media-input";
import { PostAttachment } from "@/app/(client)/(app)/create/create-card";

type MediaItem = MediaFile | PostAttachment;

interface MediaCarouselProps {
    media: MediaItem[];
    className?: string;
    showControls?: boolean;
    showDots?: boolean;
    aspectRatio?: "square" | "video" | "auto";
}

export default function MediaCarousel({
    media,
    className,
    showControls = true,
    showDots = true,
    aspectRatio = "auto",
}: MediaCarouselProps) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    if (!media || media.length === 0) {
        return null;
    }

    const aspectClass = {
        square: "aspect-square",
        video: "aspect-video",
        auto: "min-h-[400px] max-h-[600px]", // Fixed: Give explicit height range
    }[aspectRatio];

    return (
        <div className={cn("w-full", className)}>
            <Carousel className="w-full" setApi={setApi}>
                <CarouselContent>
                    {media.map((item, index) => (
                        <CarouselItem key={index}>
                            {item.type === "image" ? (
                                <div className="relative w-full h-full">
                                    <img
                                        src={item.url}
                                        alt={`Media ${index + 1}`}
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            ) : (
                                <video
                                    src={item.url}
                                    loop
                                    autoPlay
                                    className="w-full h-full object-contain"
                                    preload="metadata"
                                >
                                    <track kind="captions" />
                                </video>
                            )}
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {showControls && media.length > 1 && (
                    <>
                        <CarouselPrevious />
                        <CarouselNext />
                    </>
                )}
            </Carousel>

            {showDots && media.length > 1 && (
                <div className="mt-4 flex items-center justify-center gap-2">
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            className={cn(
                                "h-2 w-2 rounded-full border-2 transition-all",
                                {
                                    "border-primary bg-primary w-8": current === index + 1,
                                    "border-muted-foreground": current !== index + 1,
                                }
                            )}
                            key={index}
                            onClick={() => api?.scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}