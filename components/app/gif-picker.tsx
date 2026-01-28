"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Card, CardContent } from "../ui/card";
import { SearchIcon, StickerIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Button } from "../ui/button";
import { CreateTabs } from "@/app/(client)/(app)/create/create-card";

export type Gif = {
    id: string;
    mp4: string;
    webp: string;
    preview: string;
    width: string;
    height: string;
};

export default function GifPicker({ onSelect, setTab, }: { onSelect: (gif: Gif) => void; setTab: (tab: CreateTabs) => void }) {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 400);

    const [gifs, setGifs] = useState<Gif[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function loadGifs() {
            try {
                setLoading(true);

                const res = await fetch(
                    `/api/gif/search${debouncedQuery ? `?q=${debouncedQuery}` : ""}`,
                    { signal: controller.signal }
                );

                if (!res.ok) throw new Error("Fetch failed");

                const data = await res.json();
                setGifs(data);
            } catch (err: any) {
                if (err.name !== "AbortError") {
                    console.error(err);
                }
            } finally {
                setLoading(false);
            }
        }

        loadGifs();

        return () => controller.abort();
    }, [debouncedQuery]);


    return (
        <Card className="w-full sm:max-w-lg">
            <CardContent>
                <div className="w-full flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="flex items-center gap-2 font-medium leading-1">
                            <StickerIcon />
                            <span>Search Giphy</span>
                        </h1>

                        <Button variant="link" onClick={() => setTab("text")}>
                            Done
                        </Button>
                    </div>

                    <InputGroup>
                        <InputGroupInput
                            value={query}
                            onChange={(e) => setQuery(e.currentTarget.value)}
                            id="track-name"
                            name="track-name"
                            placeholder=""
                        />
                        <InputGroupAddon align="inline-start">
                            <SearchIcon className="text-muted-foreground" />
                        </InputGroupAddon>
                    </InputGroup>

                    {loading && (
                        <span className="text-sm text-muted-foreground">
                            Searching…
                        </span>
                    )}

                    <div className="grid max-h-80 grid-cols-2 gap-2 overflow-y-auto">
                        {gifs.map((gif) => (
                            <button
                                key={gif.id}
                                onClick={() => onSelect(gif)}
                                className="relative overflow-hidden rounded-md"
                            >
                                <video
                                    src={gif.mp4}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="h-full w-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
