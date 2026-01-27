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

export function isValidColor(color: string): boolean {
    // HEX
    if (/^#([0-9a-fA-F]{3,4}){1,2}$/.test(color)) return true;

    // RGB / RGBA
    if (/^rgba?\(\s*(\d{1,3}\s*,\s*){2}\d{1,3}(\s*,\s*(0|1|0?\.\d+))?\s*\)$/.test(color)) {
        return color
            .match(/\d+(\.\d+)?/g)!
            .every((n, i) =>
                i < 3 ? Number(n) <= 255 : Number(n) <= 1
            );
    }

    // HSL / HSLA
    if (/^hsla?\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%(\s*,\s*(0|1|0?\.\d+))?\s*\)$/.test(color)) {
        const nums = color.match(/\d+(\.\d+)?/g)!;
        const [h, s, l, a] = nums.map(Number);

        return (
            h >= 0 &&
            h <= 360 &&
            s >= 0 &&
            s <= 100 &&
            l >= 0 &&
            l <= 100 &&
            (a === undefined || a <= 1)
        );
    }

    return false;
}
