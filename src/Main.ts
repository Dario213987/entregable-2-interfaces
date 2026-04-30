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

// get elements form DOM
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
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
const btnUndo = document.getElementById("btnUndo") as HTMLButtonElement;
const btnRedo = document.getElementById("btnRedo") as HTMLButtonElement;
const btnSave = document.getElementById("btnSave") as HTMLButtonElement;
const brightnessSlider = document.getElementById("brightnessSlider") as HTMLInputElement;
const brightnessVal = document.getElementById("brightnessVal") as HTMLElement;
const btnBrightness = document.getElementById("btnBrightness") as HTMLButtonElement;
const saturationSlider = document.getElementById("saturationSlider") as HTMLInputElement;
const saturationVal = document.getElementById("saturationVal") as HTMLElement;
const btnSaturation = document.getElementById("btnSaturation") as HTMLButtonElement;

// load events
btnUndo.addEventListener("click", () => manager.undo());
btnRedo.addEventListener("click", () => manager.redo());

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "z") manager.undo();
    if (e.ctrlKey && e.key === "y") manager.redo();
});

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

btnClear.addEventListener("click", () => manager.clearCanvas());

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

btnGrayscale.addEventListener("click", () => manager.applyFilter(new Grayscale()));
btnNegative.addEventListener("click", () => manager.applyFilter(new Negative()));
btnSepia.addEventListener("click", () => manager.applyFilter(new Sepia()));
btnBinarization.addEventListener("click", () => manager.applyFilter(new Binarization()));
btnBlur.addEventListener("click", () => manager.applyFilter(new Blur()));
btnEdge.addEventListener("click", () => manager.applyFilter(new EdgeDetection()));

brightnessSlider.addEventListener("input", () => {
    brightnessVal.textContent = brightnessSlider.value;
});

btnBrightness.addEventListener("click", () => {
    manager.applyFilter(new Brightness(parseInt(brightnessSlider.value)));
});

saturationSlider.addEventListener("input", () => {
    saturationVal.textContent = saturationSlider.value;
});

btnSaturation.addEventListener("click", () => {
    manager.applyFilter(new Saturation(parseInt(saturationSlider.value)));
});

btnSave.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = crypto.randomUUID() + ".png"; // random uuid in order to not have file, file(1), file(2), etc
    link.href = canvas.toDataURL("image/png");
    link.click();
});

// set up the pen and eraser pointer when using them. they are not a pen nor an eraser though
btnPencil.addEventListener('click', () => {
    canvas.dataset.tool = 'pencil';
});

btnEraser.addEventListener('click', () => {
    canvas.dataset.tool = 'eraser';
});