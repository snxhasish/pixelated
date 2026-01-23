"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FilmIcon, ImageIcon, MusicIcon, SmileIcon, StickerIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { CircularProgress } from "@/components/ui/circular-progress";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PostCard from "@/components/app/post-card";
import MusicSelect, { Track } from "@/components/app/music-select";
import Image from "next/image";
import ShowSelect, { formatReleaseDate, Show } from "@/components/app/show-select";

const MAX_LENGTH = 250;

export default function CreateCard({ user }: {
    user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
    } | undefined
}) {
    const router = useRouter();

    const [tab, setTab] = useState<"text" | "preview" | "music" | "show" | "gif" | "emoji">("text");
    const [text, setText] = useState<string>("");
    const [color, setColor] = useState<string>("#E64980");
    const [track, setTrack] = useState<Track | null>(null);
    const [show, setShow] = useState<Show | null>(null);

    const textareaProgress = useMemo(() => {
        return Math.min(Math.floor((text.length / MAX_LENGTH) * 100), 100);
    }, [text]);

    const handleTextareaValueChange = (value: string) => {
        setText(value);
    }

    if (tab === "preview")
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <PostCard
                    text={text}
                    bg={color}
                />

                <Button variant="link" onClick={() => setTab("text")}>
                    Edit
                </Button>
            </div>
        );

    if (tab === "music")
        return (
            <MusicSelect
                selectedTrack={track}
                setSelectedTrack={setTrack}
                setTab={setTab}
            />
        );

    if (tab === "show")
        return (
            <ShowSelect
                selectedShow={show}
                setSelectedShow={setShow}
                setTab={setTab}
            />
        );

    return (
        <Card className="w-full sm:max-w-lg p-0">
            <CardContent className="p-2">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center gap-4">
                        <CardButton onClick={() => router.back()}>
                            <XIcon />
                        </CardButton>

                        <div className="flex gap-2 items-center">
                            <Button variant="link" onClick={() => setTab("preview")}>
                                Preview
                            </Button>
                            <Link href="/drafts">
                                <Button variant="link">
                                    Drafts
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex gap-4 p-2">
                        <Avatar>
                            <AvatarImage src={user?.image ? user.image : `https://api.dicebear.com/9.x/glass/svg?seed=${user?.name ? user.name : "User"}`} />
                            <AvatarFallback>
                                {(user?.name ? user.name : user?.email)?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="w-full flex flex-col">
                            <Textarea
                                id="post"
                                name="post"
                                value={text}
                                placeholder="Post something..."
                                className="w-full bg-transparent! border-0 p-0 shadow-none resize-none outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus:border-0 text-base! max-h-[600px] whitespace-pre-wrap wrap-break-words overflow-wrap-anywhere"
                                maxLength={MAX_LENGTH}
                                autoFocus
                                onChange={(v) => handleTextareaValueChange(v.target.value)}
                            />
                        </div>
                    </div>

                    {track && (
                        <div className="flex p-2">
                            <div className="flex items-center gap-2 text-sm">
                                <Image
                                    src={track.image}
                                    alt={`track-image-${track.id}`}
                                    height={100}
                                    width={100}
                                    className="h-8 w-8 rounded-md"
                                />
                                <span className="truncate flex flex-col">
                                    <span className="text-sm font-medium">
                                        {track.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {track.artists}
                                    </span>
                                </span>
                            </div>
                        </div>
                    )}

                    {show && (
                        <div className="flex p-2">
                            <div className="flex items-center gap-2 text-sm">
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
                                <span className="truncate flex flex-col">
                                    <span className="text-sm font-medium">
                                        {show.title}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {formatReleaseDate(show.releaseDate)}
                                    </span>
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between items-center border-t">
                        <div className="w-full flex items-center justify-between border-r pt-2">
                            <div className="flex items-center gap-2">
                                <CardButton>
                                    <ImageIcon />
                                </CardButton>

                                <CardButton>
                                    <StickerIcon />
                                </CardButton>

                                <CardButton>
                                    <SmileIcon />
                                </CardButton>

                                <CardButton onClick={() => setTab("music")}>
                                    <MusicIcon />
                                </CardButton>

                                <CardButton onClick={() => setTab("show")}>
                                    <FilmIcon />
                                </CardButton>

                                <ColorPicker
                                    color={color}
                                    setColor={setColor}
                                />
                            </div>

                            <CircularProgress
                                size={40}
                                strokeWidth={3}
                                value={textareaProgress}
                            />
                        </div>

                        <div className="flex items-center pl-2 pt-2">
                            <Button size="sm" className="rounded-full">
                                Post
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export function CardButton({ children, ...props }: { children: React.ReactNode, [props: string]: any }) {
    return (
        <button
            className="scale-80 text-muted-foreground hover:text-primary cursor-pointer rounded-full"
            {...props}
        >
            {children}
        </button>
    )
}

export function ColorPicker({ color, setColor, }: { color: string; setColor: (color: string) => void; }) {
    return (
        <label className="relative inline-block">
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer"
            />

            <span
                className="block size-5 rounded-full border-2"
                style={{ backgroundColor: color }}
            />
        </label>
    );
}
