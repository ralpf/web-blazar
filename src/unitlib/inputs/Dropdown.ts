import { Action } from "../aliases";
import { Unit } from "../Unit";
import { InputUnit } from "./InputUnit";


/** an wrapper of <select> element. Callback accepts selected index */
export class Dropdown extends InputUnit {
    
    constructor(root: HTMLElement, callback: Action) {
        super(root, callback);
        const select = Unit.Find(this.root, 'select') as HTMLSelectElement;
        select.addEventListener('change', () => this.invokeCallback(select.selectedIndex));
    }
}