"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { AtSignIcon, CheckIcon, SendIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { toast } from "sonner";

export default function Login() {
    const { theme } = useTheme();
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSendVerification = async () => {
        setLoading(true);

        const { error } = await authClient.signIn.magicLink({
            email,
            callbackURL: "/app",
            errorCallbackURL: "/login/error"
        });

        if (error) {
            console.error("Error sending email: ", error);
            toast.error(error.message);
            setLoading(false);
        }
    }

    return (
        <main className="h-screen w-full flex flex-col justify-center items-center gap-4">
            <Card className="w-full md:max-w-md">
                <CardHeader>
                    <div className="w-full h-32">
                        <FlickeringGrid
                            className="inset-0 z-0"
                            squareSize={5}
                            color={theme === "light" ? "#000000" : "#ffffff"}
                            maxOpacity={0.75}
                            flickerChance={0.2}
                        />
                    </div>

                    <CardTitle className="text-3xl tracking-tighter">
                        Login to pixelated
                    </CardTitle>
                    <CardDescription className="font-medium">
                        We will send a verification link to your email address.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="email@pxlt.me"
                                    onInput={(e) => setEmail(e.currentTarget.value)}
                                />
                                <InputGroupAddon align="inline-start">
                                    <AtSignIcon className="text-muted-foreground" />
                                </InputGroupAddon>
                            </InputGroup>
                        </Field>

                        <Button
                            disabled={loading}
                            className="w-full"
                            onClick={handleSendVerification}
                        >
                            {
                                loading ?
                                    <>
                                        <CheckIcon />
                                        <span>Sent</span>
                                    </> :
                                    <>
                                        <SendIcon />
                                        <span>Send Verification Link</span>
                                    </>
                            }
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </main>
    )
}