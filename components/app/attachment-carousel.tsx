"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { MediaFile } from "@/components/ui/media-input";

export function AttachmentsCarousel({
    attachments,
}: {
    attachments: MediaFile[];
}) {
    if (!attachments.length) return null;

    return (
        <Carousel
            opts={{ align: "start" }}
            className="w-full"
        >
            <CarouselContent className="px-4">
                {attachments.map((attachment, index) => (
                    <CarouselItem
                        key={index}
                        className="basis-1/5"
                    >
                        <Card className="border-none p-0 rounded-none">
                            <CardContent className="relative h-20 w-20 p-0">
                                {attachment.type === "image" ? (
                                    <Image
                                        src={attachment.url}
                                        alt={`attachment-${index}`}
                                        fill
                                        sizes="80px"
                                        className="object-contain rounded-lg"
                                    />
                                ) : (
                                    <video
                                        src={attachment.url}
                                        muted
                                        className="h-full w-full object-cover rounded-lg"
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
