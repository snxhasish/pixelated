"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { DayRange, generateDays } from "@/lib/calendar";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Post } from "@/types/post";
import { getPosts } from "@/lib/post";
import PostCard from "./post-card";

export default function Calendar() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [daysValue, setDaysValue] = useState<DayRange>("7d");

    const generatedGrid = daysValue === "3d" ? "grid-cols-3 grid-rows-1" : daysValue === "5d" ? "grid-cols-5  grid-rows-1" : daysValue === "7d" ? "grid-cols-7 grid-rows-1" : daysValue === "14d" ? "grid-cols-7 grid-rows-2" : "grid-cols-7 grid-rows-4";

    const days = useMemo(() => generateDays(daysValue), [daysValue]);

    const toDayKey = (value: Date | string) => {
        const d = new Date(value);

        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    const postsByDay = useMemo(() => {
        const map = new Map<string, Post[]>();

        for (const post of posts) {
            const key = toDayKey(post.createdAt);
            const bucket = map.get(key);

            if (bucket) {
                bucket.push(post);
            } else {
                map.set(key, [post]);
            }
        }

        return map;
    }, [posts]);

    useEffect(() => {
        (async () => {
            const retrievedPosts = await getPosts();
            // console.log(retrievedPosts);
            setPosts(retrievedPosts);
        })();
    }, []);

    return (
        <div className="w-full h-full flex flex-col justify-between items-center">
            <div className={cn("w-full h-[92%] grid overflow-hidden", generatedGrid)}>
                {days.map((d, i) => {
                    const dayKey = toDayKey(d.date);
                    const dayPosts = postsByDay.get(dayKey) ?? [];

                    return (
                        <div key={i} className={cn("min-h-0 col-span-1 row-span-1 flex flex-col items-center border-r last:border-r-0 p-2", i > 6 ? "border-t" : "")}>
                            <h2 className="text-sm font-medium text-muted-foreground shrink-0">
                                {d.date.toLocaleDateString("en-US", { day: "2-digit", month: "short" })}
                            </h2>

                            <div className="mt-5 flex flex-col gap-2 w-full flex-1 overflow-y-auto noscrollbar">
                                {dayPosts.length === 0 ? null : (
                                    dayPosts.map((post) => (
                                        <PostCard
                                            key={post.id}
                                            bg={post.color ?? "#fff"}
                                            text={post.text ?? ""}
                                            attachments={post.attachments}
                                            music={post.music}
                                            show={post.show}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="w-full h-[8%] grid grid-cols-3 items-center border-t px-4 sm:px-6 md:px-8 py-2">
                <div className="justify-self-start">
                    a
                </div>

                <div className="justify-self-center">
                    <Link href="/create">
                        <Button variant="outline">
                            <PlusIcon />
                            <span>Create</span>
                        </Button>
                    </Link>
                </div>

                <div className="justify-self-end">
                    <Select
                        value={daysValue}
                        onValueChange={(v) => setDaysValue(v as DayRange)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Time range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Time range</SelectLabel>
                                <SelectItem value="3d">3 days</SelectItem>
                                <SelectItem value="5d">5 days</SelectItem>
                                <SelectItem value="7d">1 week</SelectItem>
                                <SelectItem value="14d">2 weeks</SelectItem>
                                <SelectItem value="28d">1 month</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}

