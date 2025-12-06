import { Unit } from "../Unit";
import { InputUnit } from "./InputUnit";
export class Slider extends InputUnit {
    constructor(root, callback) {
        super(root, callback);
        this.eventName = "input"; // sliders update continuously
    }
    findInput() {
        return Unit.Find(this.root, 'input[type="range"]');
    }
    findLabel() {
        return this.input.labels?.[0] ?? null;
    }
    readInput() {
        return this.input.valueAsNumber;
    }
    dispose() {
        super.dispose();
    }
}
