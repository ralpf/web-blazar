import { Unit } from "../core/Unit";
import { InputUnit } from "./InputUnit";


export class Numeral extends InputUnit {

    protected prepareInnerElements(): void {
        const num = Unit.Find(this.root, 'input[type="number"]') as HTMLInputElement;
        num.addEventListener('change', () => this.invokeCallback(num.valueAsNumber));
    }

}