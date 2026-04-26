import {Pen} from "./utils/Pen";

export class CanvasManager {
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
        });

        this.canvas.addEventListener("mouseleave", () => {
            this.isDrawing = false;
            this.currentPen = null;
        });
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
}
