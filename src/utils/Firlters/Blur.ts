import { Filter } from "./Filter";

export class Blur implements Filter {
    // I made the kernel size a little bit bigger in this one since when using size 3 the blur was too soft
    private readonly KERNEL = [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]
    ];
    private readonly KERNEL_SIZE = 5;

    apply(imageData: ImageData): ImageData {
        const data = imageData.data;
        const width = imageData.width;
        const height = imageData.height;
        const output = new ImageData(width, height);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = (x + y * width) * 4;
                let sumR = 0, sumG = 0, sumB = 0;
                let count = 0;

                for (let i = 0; i < this.KERNEL_SIZE; i++) {
                    for (let j = 0; j < this.KERNEL_SIZE; j++) {
                        const offsetX = x + i - Math.floor(this.KERNEL_SIZE / 2);
                        const offsetY = y + j - Math.floor(this.KERNEL_SIZE / 2);

                        if (offsetX < 0 || offsetX >= width || offsetY < 0 || offsetY >= height) continue;

                        const offsetIndex = (offsetX + offsetY * width) * 4;
                        sumR += data[offsetIndex] * this.KERNEL[i][j];
                        sumG += data[offsetIndex + 1] * this.KERNEL[i][j];
                        sumB += data[offsetIndex + 2] * this.KERNEL[i][j];
                        count++;
                    }
                }

                output.data[index] = sumR / count;
                output.data[index + 1] = sumG / count;
                output.data[index + 2] = sumB / count;
                output.data[index + 3] = 255;
            }
        }

        return output;
    }
}