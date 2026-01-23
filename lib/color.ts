export function getReadableTextColor(bgHex: string) {
    // removing #
    const hex = bgHex.replace("#", "");

    // converting to RGB
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    // convertng sRGB to linear
    const [R, G, B] = [r, g, b].map((c) =>
        c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );

    // relative luminance
    const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;

    // contrast threshold (WCAG)
    return luminance > 0.5 ? "#0F172A" : "#FFFFFF";
}