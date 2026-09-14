import { DOM } from "../static/DOM";
import { InputUnit } from "./InputUnit";


export class Checkbox extends InputUnit {

    protected prepareInnerElements(): void {
        const checkbox = DOM.Find(this.root, 'input[type="checkbox"]') as HTMLInputElement;
        checkbox.addEventListener('change', () => this.invokeCallback(checkbox.checked));
    }

    protected setInputVisualTo(value: any): void {
        throw new Error("Method not implemented.");
    }
}