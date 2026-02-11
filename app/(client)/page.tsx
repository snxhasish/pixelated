import { Track } from "@/components/app/music-select";
import PostCard from "@/components/app/post-card";
import Navbar from "@/components/landing/navbar";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { GeistPixelSquare } from "geist/font/pixel";
import { ArrowRightIcon } from "lucide-react";

export default function Landing() {
  return (
    <main className="w-full h-screen flex flex-col gap-4">
      <Navbar />

      <div className="w-full h-full flex flex-col items-center gap-4">
        <div className="h-full w-full p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center items-center gap-4">
          <h1 className={cn(GeistPixelSquare.className, "text-8xl text-center")}>
            your visual timeline
          </h1>

          <p className={cn("text-lg font-semibold text-muted-foreground text-center")}>
            mini-journaling and a visual archive for your daily moments
          </p>

          <div className="flex gap-4 items-center mt-5">
            <InputGroup className="md:w-72 rounded-full pl-2! py-5!">
              <InputGroupInput
                type="email"
                name="email"
                id="email"
                placeholder="you@pxlt.me"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton variant="default" size="icon-sm" className="rounded-full">
                  <ArrowRightIcon />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

        <div className="w-full h-full border-t grid grid-cols-7">
          <div className="col-span-1 border-r flex flex-col items-center gap-2 p-4">
            <p className="text-sm font-medium text-muted-foreground">
              Jan 21
            </p>

            <PostCard
              bg="#000000"
              text="share the show you can't stop obsessing over."
              music={null}
              show={null}
              attachments={[]}
            />

            <PostCard
              show={{
                "type": "tv",
                "title": "Frieren: Beyond Journey's End",
                "poster": "https://image.tmdb.org/t/p/w342/dqZENchTd7lp5zht7BdlqM7RBhD.jpg",
                "tmdbId": 209867,
                "releaseDate": "2023-09-29"
              }}
              bg="#ffffff"
              text=""
              music={null}
              attachments={[]}
            />
          </div>
          <div className="col-span-1 border-r flex flex-col items-center gap-2 p-4">
            <p className="text-sm font-medium text-muted-foreground">
              Mar 06
            </p>

            <PostCard
              bg="#000000"
              text=""
              attachments={[
                {
                  "url": "https://cdn.sanity.io/images/iw7xoazz/production/5430e7016adf18c4dec01e9a9a45d8f4b80d09bd-500x500.jpg",
                  "type": "image"
                }
              ]}
              music={null}
              show={null}
            />

            <PostCard
              bg="#000000"
              text="post images and videos that sums up the day."
              music={null}
              show={null}
              attachments={[]}
            />
          </div>
          <div className="col-span-1 border-r flex flex-col items-center gap-2 p-4">
            <p className="text-sm font-medium text-muted-foreground">
              April 13
            </p>

            <PostCard
              music={{
                id: "7wAkQFShJ27V8362MqevQr",
                name: "So Long, London",
                album: "THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY",
                image: "https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa",
                artists: "Taylor Swift",
                preview_url: "",
                spotify_url: "https://open.spotify.com/track/7wAkQFShJ27V8362MqevQr"
              }}
              bg="#FFFFFF"
              text=""
              show={null}
              attachments={[]}
            />
            <PostCard
              bg="#000000"
              text="post the song that wouldn't leave your head. the one you played 17 times this week."
              music={null}
              show={null}
              attachments={[]}
            />
          </div>
          <div className="col-span-1 border-r flex flex-col items-center gap-2 p-4">
            <p className="text-sm font-medium text-muted-foreground">
              June 03
            </p>

            <PostCard
              bg="#000000"
              text="write a mini journal entry."
              music={null}
              show={null}
              attachments={[]}
            />

            <PostCard
              bg="#ffffff"
              text="long call with someone i almost drifted from. glad we didn't let it fade."
              music={null}
              show={null}
              attachments={[]}
            />

            <PostCard
              bg="#000000"
              text="not a diary, just a few lines, just enough to remember how it felt."
              music={null}
              show={null}
              attachments={[]}
            />
          </div>
          <div className="col-span-1 border-r flex flex-col items-center gap-2 p-4">
            <p className="text-sm font-medium text-muted-foreground">
              Sep 20
            </p>

            <PostCard
              bg="#ffffff"
              text="a day that matters to me a lot."
              music={null}
              show={null}
              attachments={[]}
            />

            <PostCard
              bg="#000000"
              text="📌 pin a day that mattered. a birthday. a win. a turning point. let it stay."
              music={null}
              show={null}
              attachments={[]}
            />

            <PostCard
              bg="#ffffff"
              text=""
              music={{
                "id": "6m9qTOnwtA88VyqJoE2PmL",
                "name": "Fault line",
                "album": "Good Riddance (Deluxe)",
                "image": "https://i.scdn.co/image/ab67616d0000b2730500294bb235c45c0a964d69",
                "artists": "Gracie Abrams",
                "preview_url": "",
                "spotify_url": "https://open.spotify.com/track/6m9qTOnwtA88VyqJoE2PmL"
              }}
              show={null}
              attachments={[]}
            />
          </div>
          <div className="col-span-1 border-r flex flex-col items-center gap-2 p-4">
            <p className="text-sm font-medium text-muted-foreground">
              Nov 28
            </p>

            <PostCard
              bg="#000000"
              text="keep some days just for you 🔒"
              music={null}
              show={null}
              attachments={[]}
            />

            <PostCard
              bg="#ffffff"
              text="make private posts only visible to you."
              music={null}
              show={null}
              attachments={[]}
            />

            <PostCard
              bg="#000000"
              text="not everything needs to be shared."
              music={null}
              show={null}
              attachments={[]}
            />
          </div>
          <div className="col-span-1 flex flex-col items-center gap-2 p-4">
            <p className="text-sm font-medium text-muted-foreground">
              Dec 13
            </p>

            <PostCard
              show={{
                "type": "movie",
                "title": "About Time",
                "poster": "https://image.tmdb.org/t/p/w342/iR1bVfURbN7r1C46WHFbwCkVve.jpg",
                "tmdbId": 122906,
                "releaseDate": "2013-09-04"
              }}
              bg="#ffffff"
              text=""
              music={null}
              attachments={[]}
            />

            <PostCard
              bg="#000000"
              text="not a feed. not endless scrolling. just days, sitting next to each other."
              music={null}
              show={null}
              attachments={[]}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

