import {Drawable} from "./Interfaces/Drawable";

export class Pen implements Drawable {
    private antX: number;

    private antY: number;

    private posX: number;

    private posY: number;

    private color: string;

    private size: number;

    constructor(posX: number, posY: number, color: string = "black", size: number = 4) {
        this.antX = posX;
        this.antY = posY;
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.size = size;
    }

    moveTo(posX: number, posY: number): void {
        this.antX = this.posX;
        this.antY = this.posY;
        this.posX = posX;
        this.posY = posY;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.moveTo(this.antX, this.antY);
        ctx.lineTo(this.posX, this.posY);
        ctx.stroke();
        ctx.closePath();
    }

    setColor(color: string): void {
        this.color = color;
    }

    getColor(): string {
        return this.color;
    }

    setSize(size: number): void {
        this.size = size;
    }

    getSize(): number {
        return this.size;
    }
}
