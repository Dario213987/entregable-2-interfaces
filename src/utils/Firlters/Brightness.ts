import { Filter } from "./Filter";

export class Brightness implements Filter {
    private brightness: number;

    constructor(brightness: number) {
        this.brightness = brightness;
    }

    apply(imageData: ImageData): ImageData {
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, Math.max(0, data[i] + this.brightness));
            data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + this.brightness));
            data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + this.brightness));
        }

        return imageData;
    }
}
