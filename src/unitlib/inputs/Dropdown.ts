import { Action } from "../aliases.js";
import { Unit } from "../Unit.js";
import { InputUnit } from "./InputUnit.js";


/** an wrapper of <select> element. Callback accepts selected index */
export class Dropdown extends InputUnit {
    
    constructor(root: HTMLElement, callback: Action) {
        super(root, callback);
        const select = Unit.Find(this.root, 'select') as HTMLSelectElement;
        select.addEventListener('change', () => this.onInputEvent(select.selectedIndex));
    }
}