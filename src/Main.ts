import { CanvasManager } from "./CanvasManager";
import {Grayscale} from "./utils/Firlters/Grayscale";

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const manager = new CanvasManager(canvas);

const btnPencil = document.getElementById("btnPencil") as HTMLButtonElement;
const btnEraser = document.getElementById("btnEraser") as HTMLButtonElement;
const colorPicker = document.getElementById("colorPicker") as HTMLInputElement;
const fileInput = document.getElementById("fileInput") as HTMLInputElement;
const btnClear = document.getElementById("btnClear") as HTMLButtonElement;
const btnGrayscale = document.getElementById("btnGrayscale") as HTMLButtonElement;

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

btnClear.addEventListener("click", () => {
    manager.clearCanvas();
});

fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => manager.drawImage(img);
        img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
});

btnGrayscale.addEventListener("click", () => {
    manager.applyFilter(new Grayscale());
});
