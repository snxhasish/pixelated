"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { BookmarkIcon, CreditCardIcon, EqualIcon, Grid2X2Icon, HomeIcon, ImageIcon, LogOut, MoonIcon, SettingsIcon, StarIcon, SunIcon, TrafficConeIcon, UserRoundIcon } from "lucide-react";
import { SiGithub, SiInstagram } from "react-icons/si";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Kbd } from "@/components/ui/kbd";
import { useTheme } from "next-themes";

export default function Appbar() {
    const { data: session } = authClient.useSession();
    const { theme, setTheme } = useTheme();
    const user = session?.user;

    const [menuOpen, setMenuOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;

            const target = e.target as HTMLElement | null;
            if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;

            if (e.key === "m" || e.key === "M") {
                e.preventDefault()
                setMenuOpen((prev) => !prev)
            }

            if (e.key === "u" || e.key === "U") {
                e.preventDefault()
                setUserOpen((prev) => !prev)
            }
        }

        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, []);

    // if (isPending) return (
    //     <></>
    // )
    // else
    return (
        <nav className="w-full flex justify-between items-center gap-4 border-b px-4 sm:px-6 md:px-8 py-4">
            <h1 className="text-2xl font-semibold tracking-tighter">
                pxlt.
            </h1>

            <div className="flex items-center justify-end gap-4">
                <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon-lg">
                            <EqualIcon className="size-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader >
                            <SheetTitle className="flex items-center gap-4">
                                Menu <Kbd>m</Kbd>
                            </SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col gap-4 p-4">
                            <MenuItem href="/app"><HomeIcon /> <span>Home</span></MenuItem>
                            <MenuItem href="/profile"><UserRoundIcon /> <span>Profile</span></MenuItem>
                            <MenuItem href="/dashboard"><Grid2X2Icon /> <span>Dashboard</span></MenuItem>
                            <MenuItem href="/media"><ImageIcon /> <span>Media Gallery</span></MenuItem>
                            <MenuItem href="/collections"><BookmarkIcon /> <span>Collections</span></MenuItem>

                            <Separator />

                            <MenuItem href="/subscription"><StarIcon /> <span>Subscription</span></MenuItem>
                            <MenuItem href="/settings"><SettingsIcon /> <span>Settings</span></MenuItem>
                            <MenuItem href="/billing"><CreditCardIcon /> <span>Billing</span></MenuItem>
                        </div>
                    </SheetContent>
                </Sheet>

                <DropdownMenu open={userOpen} onOpenChange={setUserOpen}>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="border-2">
                            <AvatarImage src={user?.image ? user.image : `https://api.dicebear.com/9.x/glass/svg?seed=${user?.name ? user.name : "User"}`} />
                            <AvatarFallback>
                                {(user?.name ? user.name : user?.email)?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>
                                <div className="flex gap-2">
                                    <Avatar>
                                        <AvatarImage src={user?.image ? user.image : `https://api.dicebear.com/9.x/glass/svg?seed=${user?.name ? user.name : "User"}`} />
                                        <AvatarFallback>
                                            {(user?.name ? user.name : user?.email)?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex flex-col">
                                        <h2 className="font-medium text-sm">
                                            {user?.name ? user.name : "<No display name>"}
                                        </h2>
                                        <p className="text-xs text-muted-foreground font-medium">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel className="text-muted-foreground text-xs">
                                Account
                            </DropdownMenuLabel>
                            <Link href="/account/settings">
                                <DropdownMenuItem>
                                    <SettingsIcon />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/account/subscription">
                                <DropdownMenuItem>
                                    <StarIcon />
                                    <span>Subscription</span>
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/account/billing">
                                <DropdownMenuItem>
                                    <CreditCardIcon />
                                    <span>Billing</span>
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel className="text-muted-foreground text-xs">
                            Appearance
                        </DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                            {theme === "light" ? <MoonIcon /> : <SunIcon />}
                            <span>Toggle theme</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel className="text-muted-foreground text-xs">
                            pixelated
                        </DropdownMenuLabel>
                        <Link href="https://discord.gg/6FFRAKJJ6e">
                            <DropdownMenuItem>
                                <TrafficConeIcon />
                                <span>Support</span>
                            </DropdownMenuItem>
                        </Link>
                        <Link href="https://github.com/snxhasish/pixelated">
                            <DropdownMenuItem>
                                <SiGithub />
                                <span>GitHub</span>
                            </DropdownMenuItem>
                        </Link>
                        <Link href="https://instagram.com/pxltme">
                            <DropdownMenuItem>
                                <SiInstagram />
                                <span>Instagram</span>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                            <LogOut />
                            <span>Log out</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
                            Quick open using <Kbd>u</Kbd>
                        </DropdownMenuLabel>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}

export function MenuItem({ href, children }: { href: string, children: React.ReactNode }) {
    const pathname = usePathname();
    const active = pathname === href || (href !== "/" && pathname.startsWith(href));

    return (
        <Link href={href}>
            <p className={cn("w-fit flex items-center gap-2 text-xl sm:text-2xl md:text-3xl tracking-tighter font-semibold hover:text-primary", active ? "text-primary border-b-2 border-primary border-dashed" : "text-muted-foreground")}>
                {children}
            </p>
        </Link>
    )
}