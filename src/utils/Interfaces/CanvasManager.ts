import {Filter} from "../Firlters/Filter";

export interface CanvasManager {
    drawImage(image: HTMLImageElement): void;
    applyFilter(filter: Filter): void;
    clearCanvas(): void;
    setColor(color: string): void;
    setSize(size: number): void;
    setOnStrokeEnd(callback: () => void): void;
}