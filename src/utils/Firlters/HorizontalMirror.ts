import { Filter } from "./Filter";

export class HorizontalMirror implements Filter {
    apply(imageData: ImageData): ImageData {
        const data = imageData.data;
        const width = imageData.width;
        const height = imageData.height;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width / 2; x++) {
                const i = (y * width + x) * 4;
                const j = (y * width + (width - x - 1)) * 4;

                for (let c = 0; c < 4; c++) {
                    const tmp = data[i + c];
                    data[i + c] = data[j + c];
                    data[j + c] = tmp;
                }
            }
        }
        return imageData;
    }
}