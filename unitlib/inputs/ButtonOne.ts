import { DOM } from "../static/DOM";
import { InputUnit } from "./InputUnit";

/** a single button as a single input element. */
export class ButtonOne extends InputUnit {

    private buttonElem!: HTMLButtonElement;

    protected prepareInnerElements(): void {
        this.buttonElem = this.root instanceof HTMLButtonElement
            ? this.root
            : DOM.Find(this.root, 'button') as HTMLButtonElement;

        this.buttonElem.addEventListener(
            'click',
            () => this.invokeCallback(this.buttonElem.textContent)
        );
    }

    protected setInputVisualTo(value: any): void {
        if (typeof value === 'string') this.buttonElem.textContent = value;
        // else ignore
    }

}