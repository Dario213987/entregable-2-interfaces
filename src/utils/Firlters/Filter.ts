export interface Filter {
    apply(imageData: ImageData): ImageData;
}