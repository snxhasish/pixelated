const TOKEN_URL = "https://accounts.spotify.com/api/token";

export async function getSpotifyAccessToken() {
    const res = await fetch(TOKEN_URL, {
        method: "POST",
        headers: {
            Authorization:
                "Basic " +
                Buffer.from(
                    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
                ).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
        cache: "no-store",
    })

    if (!res.ok) {
        throw new Error("Failed to get Spotify token");
    }

    return res.json() as Promise<{
        access_token: string
        token_type: string
        expires_in: number
    }>;
}