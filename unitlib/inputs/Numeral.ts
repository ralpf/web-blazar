import { InputUnit } from "./InputUnit";
import { logi } from "../core/global";
import { DOM } from "../static/DOM";


export class Numeral extends InputUnit {

    private num!: HTMLInputElement;

    protected prepareInnerElements(): void {
        this.num = DOM.Find(this.root, 'input[type="number"]') as HTMLInputElement;
        this.num.addEventListener('change', () => this.invokeCallback(this.num.valueAsNumber));
    }

    protected setInputVisualTo(value: any): void {
        const type = typeof value;
        if (type === 'number') this.num.valueAsNumber = value;
        else logi(`unexpected value '${value}' of type '${type}'`);
    }
}