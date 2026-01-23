import Appbar from "@/components/app/appbar";

export default function AppLayout({ children, modal }: { children: React.ReactNode, modal: React.ReactNode }) {
    return (
        <main className="h-screen w-full flex flex-col">
            <Appbar />
            <div className="flex-1 overflow-hidden">
                {children}
                {modal}
            </div>
        </main>
    );
}
