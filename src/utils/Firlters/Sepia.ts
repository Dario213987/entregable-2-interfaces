import {Filter} from "./Filter";

export class Sepia implements Filter{
    apply(imageData: ImageData): ImageData {

        for (let i = 0; i < imageData.data.length; i += 4) {

            let r = imageData.data[i];
            let g = imageData.data[i + 1];
            let b = imageData.data[i + 2];

            imageData.data[i] = Math.min(255, 0.393 * r + 0.769 * g + 0.189 * b);
            imageData.data[i + 1] = Math.min(255, 0.349 * r + 0.686 * g + 0.168 * b);
            imageData.data[i + 2] = Math.min(255, 0.272 * r + 0.534 * g + 0.131 * b);
        }

        return imageData;
    }

}