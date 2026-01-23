"use client";

import { authClient } from "@/lib/auth-client";
import CreateCard from "./create-card";

export default function CreatePage() {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    

    return (
        <div className="h-full w-full flex flex-col justify-center items-center gap-4">
            <CreateCard
                user={user}
            />
        </div>
    )
}