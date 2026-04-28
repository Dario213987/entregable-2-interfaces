import { Filter } from "./Filter";

export class EdgeDetection implements Filter {
    private readonly KERNEL_X = [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
    ];

    private readonly KERNEL_Y = [
        [-1, -2, -1],
        [ 0,  0,  0],
        [ 1,  2,  1]
    ];

    private readonly KERNEL_SIZE = 3;

    apply(imageData: ImageData): ImageData {
        const data = imageData.data;
        const width = imageData.width;
        const height = imageData.height;
        const output = new ImageData(width, height);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = (x + y * width) * 4;
                let sumXR = 0, sumXG = 0, sumXB = 0;
                let sumYR = 0, sumYG = 0, sumYB = 0;
                let count = 0;

                for (let i = 0; i < this.KERNEL_SIZE; i++) {
                    for (let j = 0; j < this.KERNEL_SIZE; j++) {
                        const offsetX = x + i - Math.floor(this.KERNEL_SIZE / 2);
                        const offsetY = y + j - Math.floor(this.KERNEL_SIZE / 2);

                        if (offsetX < 0 || offsetX >= width || offsetY < 0 || offsetY >= height) continue;

                        const offsetIndex = (offsetX + offsetY * width) * 4;
                        sumXR += data[offsetIndex] * this.KERNEL_X[i][j];
                        sumXG += data[offsetIndex + 1] * this.KERNEL_X[i][j];
                        sumXB += data[offsetIndex + 2] * this.KERNEL_X[i][j];
                        sumYR += data[offsetIndex] * this.KERNEL_Y[i][j];
                        sumYG += data[offsetIndex + 1] * this.KERNEL_Y[i][j];
                        sumYB += data[offsetIndex + 2] * this.KERNEL_Y[i][j];
                        count++;
                    }
                }

                output.data[index] = Math.min(255, Math.sqrt(sumXR ** 2 + sumYR ** 2));
                output.data[index + 1] = Math.min(255, Math.sqrt(sumXG ** 2 + sumYG ** 2));
                output.data[index + 2] = Math.min(255, Math.sqrt(sumXB ** 2 + sumYB ** 2));
                output.data[index + 3] = 255;
            }
        }

        return output;
    }
}