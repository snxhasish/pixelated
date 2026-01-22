import { generateDays } from "@/lib/calendar"

const days = generateDays("7d");

export default function Calendar() {
    return (
        <div className="w-full h-full">
            <div className="w-full h-full grid grid-cols-7">
                {days.map((d, i) => {
                    return (
                        <div key={i} className="h-full flex flex-col items-center border-r last:border-r-0 p-4">
                            <h2 className="text-sm font-medium text-muted-foreground">
                                {d.date.toLocaleDateString("en-US", { day: "2-digit", month: "short" })}
                            </h2>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

