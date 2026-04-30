import { Filter } from "./Filter";

export class Binarization implements Filter {

    apply(imageData: ImageData): ImageData {
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
            const value = gray >= 128 ? 255 : 0; // <-- Arbitrary value of 128

            data[i] = value;
            data[i + 1] = value;
            data[i + 2] = value;
        }

        return imageData;
    }
}
