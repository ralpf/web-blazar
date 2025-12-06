import { Unit } from "../Unit";
import { InputUnit } from "./InputUnit";
export class Slider extends InputUnit {
    constructor(root, callback) {
        super(root, callback);
        const slider = Unit.Find(this.root, 'input[type="range"]');
        slider.addEventListener('change', () => this.onInputEvent(slider.valueAsNumber));
    }
}
