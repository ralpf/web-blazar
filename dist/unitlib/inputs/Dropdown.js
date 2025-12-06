import { Unit } from "../Unit.js";
import { InputUnit } from "./InputUnit.js";
/** an wrapper of <select> element. Callback accepts selected index */
export class Dropdown extends InputUnit {
    constructor(root, callback) {
        super(root, callback);
        const select = Unit.Find(this.root, 'select');
        select.addEventListener('change', () => this.onInputEvent(select.selectedIndex));
    }
}
