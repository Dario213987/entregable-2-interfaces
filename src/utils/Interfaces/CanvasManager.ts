import {Filter} from "../Firlters/Filter";

/*
* I made Canavas manager into an interface so I could implement the decorator more easily
* */
export interface CanvasManager {
    drawImage(image: HTMLImageElement): void;
    applyFilter(filter: Filter): void;
    clearCanvas(): void;
    setColor(color: string): void;
    setSize(size: number): void;
    setOnStrokeEnd(callback: () => void): void;
}