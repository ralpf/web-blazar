import { log } from "../core/global";
import { DOM } from "../static/DOM";
import { InputUnit } from "./InputUnit";


export class Slider extends InputUnit {

    private slider!: HTMLInputElement;

    protected override prepareInnerElements(): void {
        this.slider = DOM.Find(this.root, 'input[type="range"]') as HTMLInputElement;
        this.slider.addEventListener('change', () => this.invokeCallback(this.slider.valueAsNumber));
    }

    protected override setInputVisualTo(value: any): void {
        if (Number.isFinite(value)) this.slider.valueAsNumber = value;
        else log(`invalid slider value '${value}'`);
    }
}


//                                      NOTE:
//  'input'  event -> fire continuosly
//  'change' event -> fire on release
