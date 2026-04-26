import { CanvasManager } from "./CanvasManager";

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const manager = new CanvasManager(canvas);

const btnPencil = document.getElementById("btnPencil") as HTMLButtonElement;
const btnEraser = document.getElementById("btnEraser") as HTMLButtonElement;
const colorPicker = document.getElementById("colorPicker") as HTMLInputElement;

btnPencil.addEventListener("click", () => {
    manager.setColor(colorPicker.value);
    manager.setSize(4);
});

btnEraser.addEventListener("click", () => {
    manager.setColor("white");
    manager.setSize(20);
});

colorPicker.addEventListener("input", () => {
    manager.setColor(colorPicker.value);
    manager.setSize(4);
});

