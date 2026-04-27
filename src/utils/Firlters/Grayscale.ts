
import { Filter } from "./Filter";

export class Grayscale implements Filter {
    apply(imageData: ImageData): ImageData {
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const gray = (r + g + b) / 3;

            data[i] = gray;
            data[i + 1] = gray;
            data[i + 2] = gray;
        }

        return imageData;
    }
}