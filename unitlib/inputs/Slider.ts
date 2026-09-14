import { log } from "../core/global";
import { DOM } from "../static/DOM";
import { InputUnit } from "./InputUnit";


export class Slider extends InputUnit {

    protected override prepareInnerElements(): void {
        const slider = DOM.Find(this.root, 'input[type="range"]') as HTMLInputElement;
        slider.addEventListener('change', () => this.invokeCallback(slider.valueAsNumber));
    }

    protected override setInputVisualTo(value: any): void {
        const slider = DOM.Find(this.root, 'input[type="range"]') as HTMLInputElement;
        slider.valueAsNumber = Number(value);
    }
}


//                                      NOTE:
//  'input'  event -> fire continuosly
//  'change' event -> fire on release
