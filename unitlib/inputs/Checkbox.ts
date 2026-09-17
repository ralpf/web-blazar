import { logi } from "../core/global";
import { DOM } from "../static/DOM";
import { InputUnit } from "./InputUnit";


export class Checkbox extends InputUnit {

    private checkbox!: HTMLInputElement;


    protected prepareInnerElements(): void {
        this.checkbox = DOM.Find(this.root, 'input[type="checkbox"]') as HTMLInputElement;
        this.checkbox.addEventListener('change', () => this.invokeCallback(this.checkbox.checked));
    }

    protected setInputVisualTo(value: any): void {
        const type = typeof value;
        if (type === 'boolean') {
            this.checkbox.checked = value;
            this.invokeCallback(value);
        }
        else logi(`unexpected value '${value}' of type '${type}'`);
    }
}