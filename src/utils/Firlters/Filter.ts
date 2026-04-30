//  Interface for the Filter Startegy pattern
export interface Filter {
    apply(imageData: ImageData): ImageData;
}