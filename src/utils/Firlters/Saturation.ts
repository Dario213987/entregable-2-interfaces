import { Filter } from "./Filter";
import { ColorUtils } from "../ColorUtils";

export class Saturation implements Filter {
    private saturation: number;

    constructor(saturation: number) {
        this.saturation = saturation / 100;
    }

    apply(imageData: ImageData): ImageData {
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const [h, s, l] = ColorUtils.rgbToHsl(data[i], data[i + 1], data[i + 2]);
            const newS = Math.min(1, Math.max(0, s + this.saturation));
            const [r, g, b] = ColorUtils.hslToRgb(h, newS, l);

            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
        }

        return imageData;
    }
}
