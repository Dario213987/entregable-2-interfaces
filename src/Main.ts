import { CanvasManagerImpl } from "./CanvasManagerImpl";
import {Grayscale} from "./utils/Firlters/Grayscale";
import {Negative} from "./utils/Firlters/Negative";
import {Sepia} from "./utils/Firlters/Sepia";
import {Binarization} from "./utils/Firlters/Binarization";
import {Brightness} from "./utils/Firlters/Brightness";
import {Saturation} from "./utils/Firlters/Saturation";
import {Blur} from "./utils/Firlters/Blur";
import {EdgeDetection} from "./utils/Firlters/EdgeDetection";
import {HistoryManager} from "./utils/HistoryManger";

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const manager = new HistoryManager(new CanvasManagerImpl(canvas), canvas);

const btnPencil = document.getElementById("btnPencil") as HTMLButtonElement;
const btnEraser = document.getElementById("btnEraser") as HTMLButtonElement;
const colorPicker = document.getElementById("colorPicker") as HTMLInputElement;
const fileInput = document.getElementById("fileInput") as HTMLInputElement;
const btnClear = document.getElementById("btnClear") as HTMLButtonElement;
const btnGrayscale = document.getElementById("btnGrayscale") as HTMLButtonElement;
const btnNegative = document.getElementById("btnNegative") as HTMLButtonElement;
const btnSepia = document.getElementById("btnSepia") as HTMLButtonElement;
const btnBinarization = document.getElementById("btnBinarization") as HTMLButtonElement;
const btnBlur = document.getElementById("btnBlur") as HTMLButtonElement;
const btnEdge = document.getElementById("btnEdge") as HTMLButtonElement;
const btnBrightness = document.getElementById("btnBrightness") as HTMLButtonElement;
const brightnessSlider = document.getElementById("brightnessSlider") as HTMLInputElement;
const btnSaturation = document.getElementById("btnSaturation") as HTMLButtonElement;
const saturationSlider = document.getElementById("saturationSlider") as HTMLInputElement;

const btnUndo = document.getElementById("btnUndo") as HTMLButtonElement;
const btnRedo = document.getElementById("btnRedo") as HTMLButtonElement;

btnUndo.addEventListener("click", () => manager.undo());
btnRedo.addEventListener("click", () => manager.redo());


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

btnNegative.addEventListener("click", () => {
    manager.applyFilter(new Negative());
});

btnSepia.addEventListener("click", () => {
    manager.applyFilter(new Sepia());
});

btnBinarization.addEventListener("click", () => {
    manager.applyFilter(new Binarization());
});

btnBrightness.addEventListener("click", () => {
    const value = parseInt(brightnessSlider.value);
    manager.applyFilter(new Brightness(value));
});

btnSaturation.addEventListener("click", () => {
    const value = parseInt(saturationSlider.value);
    manager.applyFilter(new Saturation(value));
});

btnBlur.addEventListener("click", () => {
    manager.applyFilter(new Blur());
});

btnEdge.addEventListener("click", () => {
    manager.applyFilter(new EdgeDetection());
});


