import { DOM } from "../static/DOM";
import { InputUnit } from "./InputUnit";


export class Numeral extends InputUnit {

    protected prepareInnerElements(): void {
        const num = DOM.Find(this.root, 'input[type="number"]') as HTMLInputElement;
        num.addEventListener('change', () => this.invokeCallback(num.valueAsNumber));
    }

    protected setInputVisualTo(value: any): void {
        throw new Error("Method not implemented.");
    }
}