import { DOM } from "../static/DOM";
import { InputUnit } from "./InputUnit";


export class Slider extends InputUnit {

    protected override prepareInnerElements(): void {
        const slider = DOM.Find(this.root, 'input[type="range"]') as HTMLInputElement;
        slider.addEventListener('change', () => this.invokeCallback(slider.valueAsNumber));
        // input  -> fire continuosly
        // change -> fire on release
    }

    protected setInputVisualTo(value: any): void {
        throw new Error("Method not implemented.");
    }
}
