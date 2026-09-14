import { DOM } from "../static/DOM";
import { InputUnit } from "./InputUnit";


/** an wrapper of <select> element. Callback accepts selected index */
export class Dropdown extends InputUnit {

    protected override prepareInnerElements(): void {
        const select = DOM.Find(this.root, 'select') as HTMLSelectElement;
        select.addEventListener('change', () => this.invokeCallback(select.selectedIndex));
    }

    protected setInputVisualTo(value: any): void {
        throw new Error("Method not implemented.");
    }
}