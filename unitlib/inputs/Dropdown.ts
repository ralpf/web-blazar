import { Unit } from "../Unit";
import { InputUnit } from "./InputUnit";


/** an wrapper of <select> element. Callback accepts selected index */
export class Dropdown extends InputUnit {

    protected override prepareInnerElements(): void {
        const select = Unit.Find(this.root, 'select') as HTMLSelectElement;
        select.addEventListener('change', () => this.invokeCallback(select.selectedIndex));
    }

}