import { Unit } from "../Unit.js";
import { InputUnit } from "./InputUnit.js";
/** a collection of buttos as a single input element. Callback accepts clicked button index */
export class ButtonsRow extends InputUnit {
    constructor(root, callback) {
        super(root, callback);
        const buttons = Unit.FindAll(this.root, 'button');
        buttons.forEach((bt, i) => bt.addEventListener('click', () => this.onInputEvent(i)));
    }
}
