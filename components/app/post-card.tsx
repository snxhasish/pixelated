import { getReadableTextColor } from "@/lib/color"

export default function PostCard({ bg, text }: { bg: string, text: string }) {
    const textColor = getReadableTextColor(bg);

    return (
        <div className="w-full min-w-[300px] sm:max-w-lg p-4 rounded-lg text-base font-medium" style={{ backgroundColor: bg, color: textColor }}>
            {text}
        </div>
    )
}