"use client";

import { Card, CardContent } from "../ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "../ui/input-group";
import { FilmIcon, SearchIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import Image from "next/image";
import { Button } from "../ui/button";
import { CreateTabs } from "@/app/(client)/(app)/create/create-card";
import { cn } from "@/lib/utils";

export type Show = {
    tmdbId: number,
    type: string,
    title: string,
    poster: string,
    releaseDate: string
};

export const formatReleaseDate = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date));
}


export default function ShowSelect({ selectedShow, setSelectedShow, setTab }: { selectedShow: Show | null, setSelectedShow: (show: Show | null) => void, setTab: (tab: CreateTabs) => void }) {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 400);

    const [shows, setShows] = useState<Show[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setShows([]);
            return;
        }

        const controller = new AbortController();

        async function search() {
            try {
                setLoading(true);

                const res = await fetch(
                    `/api/shows/search?q=${encodeURIComponent(debouncedQuery)}`,
                    { signal: controller.signal }
                );

                if (!res.ok) {
                    setShows([]);
                    console.error("Response error");
                    return;
                }

                const data = await res.json();
                setShows(data);
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

    if (selectedShow)
        return (
            <Card className="w-full sm:max-w-lg">
                <CardContent>
                    <div className="w-full flex flex-col gap-4">
                        <div className="flex items-center justify-between gap-4">
                            <h1 className="flex items-center gap-2 font-medium leading-1">
                                <FilmIcon />
                                <span>Selected show</span>
                            </h1>

                            <Button variant="link" onClick={() => setTab("text")}>
                                Done
                            </Button>
                        </div>

                        <div className="flex items-center gap-2">
                            <ShowPreview
                                show={selectedShow}
                            />

                            <Button
                                onClick={() => setSelectedShow(null)}
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
                            <FilmIcon />
                            <span>Search shows</span>
                        </h1>

                        <Button variant="link" onClick={() => setTab("text")}>
                            Done
                        </Button>
                    </div>

                    <InputGroup>
                        <InputGroupInput
                            value={query}
                            onChange={(e) => setQuery(e.currentTarget.value)}
                            id="show-name"
                            name="show-name"
                            placeholder="Movies, TV series, anime..."
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

                    {shows.length > 0 && (
                        <ul className="flex flex-col gap-2">
                            {shows.map((show) => (
                                <ShowPreview
                                    key={show.tmdbId}
                                    show={show}
                                    onClick={() => setSelectedShow(show)}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export function ShowPreview({ show, onHover = true, className, ...props }: { show: Show, onHover?: boolean, className?: string, [props: string]: any }) {
    return (
        <li
            className={cn("w-full flex items-center gap-3 p-2 rounded-md cursor-pointer", className, onHover ? "hover:bg-muted" : "")}
            {...props}
        >
            {show.poster && (
                <Image
                    src={show.poster}
                    alt={show.title}
                    width={40}
                    height={60}
                    className="rounded"
                    sizes="40px"
                />
            )}

            <div className="flex flex-col">
                <span className="text-sm font-medium">
                    {show.title}
                </span>
                <span className="text-xs">
                    {formatReleaseDate(show.releaseDate)}
                </span>
            </div>
        </li>
    )
}