"use client";

import { authClient } from "@/lib/auth-client";
import CreateCard from "@/app/(client)/(app)/create/create-card";

export default function CreateModal() {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    return (
        <div className="fixed inset-0 backdrop-blur-xs h-screen w-full bg-primary/5 flex justify-center items-center">
            <CreateCard
                user={user}
            />
        </div>
    );
}