export type DayMeta = {
    date: Date
    iso: string
    timestamp: number
}

export type DayRange = "3d" | "5d" | "7d" | "14d" | "28d";

const RANGE_MAP: Record<DayRange, number> = {
    "3d": 3,
    "5d": 5,
    "7d": 7,
    "14d": 14,
    "28d": 28,
}

export function generateDays(range: DayRange): DayMeta[] {
    const days = RANGE_MAP[range];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return Array.from({ length: days }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - (days - 1 - i));

        return {
            date: d,
            iso: d.toISOString().split("T")[0],
            timestamp: d.getTime(),
        };
    });
}
