import { logi } from "../core/global";
import { DOM } from "../static/DOM";
import { InputUnit } from "./InputUnit";


/** a collection of buttos as a single input element. Callback accepts clicked button index */
export class ButtonsRow extends InputUnit {
    protected override prepareInnerElements(): void {
        const buttons = DOM.FindAll(this.root, 'button');
        buttons.forEach( (bt, i) => bt.addEventListener('click', () => this.invokeCallback(i)) );
    }

    protected setInputVisualTo(value: any): void {
        logi(`this class lacks visual feedback. Value was ${value}`);
    }
}