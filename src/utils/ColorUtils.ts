// Credit to https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion

export class ColorUtils {
    static hueToRgb(p: number, q: number, t: number): number {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    static hslToRgb(h: number, s: number, l: number): [number, number, number] {
        let r: number, g: number, b: number;

        if (s === 0) {
            r = g = b = l;
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = ColorUtils.hueToRgb(p, q, h + 1/3);
            g = ColorUtils.hueToRgb(p, q, h);
            b = ColorUtils.hueToRgb(p, q, h - 1/3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    static rgbToHsl(r: number, g: number, b: number): [number, number, number] {
        r /= 255;
        g /= 255;
        b /= 255;

        const vmax = Math.max(r, g, b);
        const vmin = Math.min(r, g, b);
        let h: number, s: number;
        const l = (vmax + vmin) / 2;

        if (vmax === vmin) {
            return [0, 0, l];
        }

        const d = vmax - vmin;
        s = l > 0.5 ? d / (2 - vmax - vmin) : d / (vmax + vmin);

        if (vmax === r) h = (g - b) / d + (g < b ? 6 : 0);
        else if (vmax === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;

        h /= 6;

        return [h, s, l];
    }
}