import Appbar from "@/components/app/appbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="h-screen w-full flex flex-col">
            <Appbar />
            <div className="flex-1 overflow-hidden">
                {children}
            </div>
        </main>
    );
}
