import {Pen} from "./utils/Pen";
import {Filter} from "./utils/Firlters/Filter";
import {CanvasManager} from "./utils/Interfaces/CanvasManager";

export class CanvasManagerImpl implements CanvasManager{
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private currentPen: Pen | null = null;
    private isDrawing: boolean = false;

    private currentColor: string = "black";
    private currentSize: number = 4;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Something went wrong");

        this.ctx = ctx;

        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.initEvents();
    }

    private initEvents(): void {
        this.canvas.addEventListener("mousedown", (e: MouseEvent) => {
            this.isDrawing = true;
            const { x, y } = this.getMousePos(e);
            this.currentPen = new Pen(x, y, this.currentColor, this.currentSize);
            this.currentPen.draw(this.ctx);
        });

        this.canvas.addEventListener("mousemove", (e: MouseEvent) => {
            if (!this.isDrawing || !this.currentPen) return;
            const { x, y } = this.getMousePos(e);
            this.currentPen.moveTo(x, y);
            this.currentPen.draw(this.ctx);
        });

        this.canvas.addEventListener("mouseup", () => {
            this.isDrawing = false;
            this.currentPen = null;
            this.onStrokeEnd?.();
        });

        this.canvas.addEventListener("mouseleave", () => {
            this.isDrawing = false;
            this.currentPen = null;
        });
    }

    drawImage(image: HTMLImageElement): void {
        const scale = Math.min(
            this.canvas.width / image.width,
            this.canvas.height / image.height
        );

        const scaledWidth = image.width * scale;
        const scaledHeight = image.height * scale;
        const offsetX = (this.canvas.width - scaledWidth) / 2;
        const offsetY = (this.canvas.height - scaledHeight) / 2;

        this.ctx.drawImage(image, offsetX, offsetY, scaledWidth, scaledHeight);
    }


    applyFilter(filter: Filter): void {
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const filtered = filter.apply(imageData);
        this.ctx.putImageData(filtered, 0, 0);
    }


    clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setColor(color: string): void {
        this.currentColor = color;
    }

    setSize(size: number): void {
        this.currentSize = size;
    }

    private getMousePos(e: MouseEvent): { x: number; y: number } {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    private onStrokeEnd: (() => void) | null = null;

    setOnStrokeEnd(callback: () => void): void {
        this.onStrokeEnd = callback;
    }
}
