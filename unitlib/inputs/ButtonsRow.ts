import { DOM } from "../static/DOM";
import { InputUnit } from "./InputUnit";


/** a collection of buttos as a single input element. Callback accepts clicked button index */
export class ButtonsRow extends InputUnit {
    protected override prepareInnerElements(): void {
        const buttons = DOM.FindAll(this.root, 'button');
        buttons.forEach( (bt, i) => bt.addEventListener('click', () => this.invokeCallback(i)) );
    }

    protected setInputVisualTo(value: any): void {
        throw new Error("Method not implemented.");
    }
}