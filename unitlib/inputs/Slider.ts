import { Action } from "../aliases";
import { Unit } from "../core/Unit";
import { InputUnit } from "./InputUnit";


export class Slider extends InputUnit {

    protected override prepareInnerElements(): void {
        const slider = Unit.Find(this.root, 'input[type="range"]') as HTMLInputElement;
        slider.addEventListener('input', () => this.invokeCallback(slider.valueAsNumber));
        // input -> fire continuosly
    }

}
