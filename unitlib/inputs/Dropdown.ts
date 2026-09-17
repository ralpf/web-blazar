import { logi } from "../core/global";
import { DOM } from "../static/DOM";
import { InputUnit } from "./InputUnit";


/** an wrapper of <select> element. Callback accepts selected index */
export class Dropdown extends InputUnit {

    private select!: HTMLSelectElement;

    protected override prepareInnerElements(): void {
        this.select = DOM.Find(this.root, 'select') as HTMLSelectElement;
        this.select.addEventListener('change', () => this.invokeCallback(this.select.selectedIndex));
    }

    protected setInputVisualTo(value: any): void {
        if (Number.isInteger(value) && value >= 0 && value < this.select.options.length) {
            // dropdown should trigger it's event to update the UI
            this.select.selectedIndex = value;
            this.invokeCallback(value);
        }
        else logi(`invalid dropdown index '${value}'`);
    }
}