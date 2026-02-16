import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full border-b flex justify-between items-center gap-4 px-4 sm:px-8 md:px-10 lg:px-16 py-4">
            <h1 className="text-2xl font-semibold tracking-tighter">
                pxlt.
            </h1>

            <div className="hidden sm:flex items-center gap-4">
                <NavLink href="/subscribe">Subscribe</NavLink>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/community">Community</NavLink>
                <NavLink href="/support">Support</NavLink>
            </div>

            <div className="flex items-center justify-end gap-4">
                <Link href="/login">
                    <Button size="sm">
                        Login
                    </Button>
                </Link>
            </div>
        </nav>
    )
}

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link href={href}>
            <Button variant="link" size="sm" className="text-muted-foreground hover:text-primary font-semibold">
                {children}
            </Button>
        </Link>
    )
}