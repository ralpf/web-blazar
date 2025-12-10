import { Action } from "../aliases";
import { Unit } from "../Unit";
import { InputUnit } from "./InputUnit";


export class Slider extends InputUnit {

    constructor(root: HTMLElement, callback: Action) {
        super(root, callback);
        const slider = Unit.Find(this.root, 'input[type="range"]') as HTMLInputElement;
        slider.addEventListener('change', () => this.invokeCallback(slider.valueAsNumber));
    }

}
