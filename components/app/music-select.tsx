"use client";

import { SiSpotify } from "react-icons/si";
import { Card, CardContent } from "../ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "../ui/input-group";
import { SearchIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export type Track = {
    id: string,
    name: string,
    artists: string,
    album: string,
    image: string,
    preview_url: string,
    spotify_url: string
};

export default function MusicSelect({ selectedTrack, setSelectedTrack, setTab }: { selectedTrack: Track | null, setSelectedTrack: (track: Track | null) => void, setTab: (tab: "text" | "preview" | "music" | "gif" | "emoji") => void }) {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 400);

    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setTracks([]);
            return;
        }

        const controller = new AbortController();

        async function search() {
            try {
                setLoading(true);

                const res = await fetch(
                    `/api/music/search?q=${encodeURIComponent(debouncedQuery)}`,
                    { signal: controller.signal }
                );

                if (!res.ok) throw new Error("Search failed");

                const data = await res.json();
                setTracks(data);
            } catch (err: any) {
                if (err.name !== "AbortError") {
                    console.error(err);
                }
            } finally {
                setLoading(false);
            }
        }

        search();

        return () => controller.abort();
    }, [debouncedQuery]);

    if (selectedTrack)
        return (
            <Card className="w-full sm:max-w-lg">
                <CardContent>
                    <div className="w-full flex flex-col gap-4">
                        <div className="flex items-center justify-between gap-4">
                            <h1 className="flex items-center gap-2 font-medium leading-1">
                                <SiSpotify />
                                <span>Search music</span>
                            </h1>

                            <Button variant="link" onClick={() => setTab("text")}>
                                Done
                            </Button>
                        </div>

                        <div className="flex items-center gap-2">
                            <MusicPreview
                                track={selectedTrack}
                            />

                            <Button
                                onClick={() => setSelectedTrack(null)}
                                size="icon-lg"
                                variant="ghost"
                                className="rounded-full hover:bg-red-400/25!"
                            >
                                <XIcon />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )

    return (
        <Card className="w-full sm:max-w-lg">
            <CardContent>
                <div className="w-full flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="flex items-center gap-2 font-medium leading-1">
                            <SiSpotify />
                            <span>Search music</span>
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
                            placeholder="I Told You Things by Gracie Abrams"
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

                    {tracks.length > 0 && (
                        <ul className="flex flex-col gap-2">
                            {tracks.map((track) => (
                                <MusicPreview
                                    key={track.id}
                                    track={track}
                                    onClick={() => setSelectedTrack(track)}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export function MusicPreview({ track, onHover = true, className, ...props }: { track: Track, onHover?: boolean, className?: string, [props: string]: any }) {
    return (
        <li
            className={cn("w-full flex items-center gap-3 p-2 rounded-md cursor-pointer", className, onHover ? "hover:bg-muted" : "")}
            {...props}
        >
            <Image
                src={track.image}
                alt={track.name}
                className="h-10 w-10 rounded"
                height={100}
                width={100}
            />
            <div className="flex flex-col">
                <span className="text-sm font-medium">
                    {track.name}
                </span>
                <span className="text-xs text-white mix-blend-difference ">
                    {track.artists}
                </span>
            </div>
        </li>
    )
}