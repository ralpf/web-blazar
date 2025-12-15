import { Unit } from "../Unit";
import { InputUnit } from "./InputUnit";


export class Checkbox extends InputUnit {

    protected prepareInnerElements(): void {
        const checkbox = Unit.Find(this.root, 'input[type="checkbox"]') as HTMLInputElement;
        checkbox.addEventListener('change', () => this.invokeCallback(checkbox.checked));
    }

}