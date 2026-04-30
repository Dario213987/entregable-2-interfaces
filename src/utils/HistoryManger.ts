import { CanvasManager } from "./Interfaces/CanvasManager";
import { Filter } from "./Firlters/Filter";
/*
 * Decorator class for a CanvasManagerImpl that adds history suport.
 * Manages an array with max length 20 that stores the image data of the canvas after an action is made (load image, pencil stoke, filter, etc)
 */
export class HistoryManager implements CanvasManager {
    private readonly MAX_HISTORY = 20;
    private history: ImageData[] = [];
    private currentIndex: number = -1;
    private canvasManager: CanvasManager;
    private canvas: HTMLCanvasElement;

    constructor(canvasManager: CanvasManager, canvas: HTMLCanvasElement) {
        this.canvasManager = canvasManager;
        this.canvas = canvas;

        this.setOnStrokeEnd(() => this.saveState());
        this.saveState();
    }

    private saveState(): void {
        const ctx = this.canvas.getContext("2d")!;
        const imageData = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        this.history = this.history.slice(0, this.currentIndex + 1);
        this.history.push(imageData);

        if (this.history.length > this.MAX_HISTORY) {
            this.history.shift();
        } else {
            this.currentIndex++;
        }
    }

    undo(): void {
        if (this.currentIndex <= 0) return;
        this.currentIndex--;
        const ctx = this.canvas.getContext("2d")!;
        ctx.putImageData(this.history[this.currentIndex], 0, 0);
    }

    redo(): void {
        if (this.currentIndex >= this.history.length - 1) return;
        this.currentIndex++;
        const ctx = this.canvas.getContext("2d")!;
        ctx.putImageData(this.history[this.currentIndex], 0, 0);
    }

    drawImage(image: HTMLImageElement): void {
        this.canvasManager.drawImage(image);
        this.saveState();
    }

    applyFilter(filter: Filter): void {
        this.canvasManager.applyFilter(filter);
        this.saveState();
    }

    clearCanvas(): void {
        this.canvasManager.clearCanvas();
        this.saveState();
    }

    setColor(color: string): void {
        this.canvasManager.setColor(color);
    }

    setSize(size: number): void {
        this.canvasManager.setSize(size);
    }

    setOnStrokeEnd(callback: () => void): void {
        this.canvasManager.setOnStrokeEnd(callback);
    }
}