import { Action } from "../../unitlib/aliases";
import { Unit } from "../../unitlib/Unit";
import { InputUnit } from "../../unitlib/inputs/InputUnit";


export class ColorItem extends InputUnit {

    private label!          : HTMLLabelElement;
    private buttonDel!      : HTMLButtonElement;
    private buttonAdd!      : HTMLButtonElement;
    private colorPicker!    : HTMLInputElement;
    private buttonDelUnit!  : Unit;

    public onAddItem!       : Action;
    public onDelItem!       : Action;


    public setLabelText(text: string) {
        this.label.textContent = text;
    }

    public setDeleteButtonVisible(isVisible: boolean) {
        this.buttonDelUnit.isVisible = isVisible;
    }

    protected prepareInnerElements(): void {
        this.label         = Unit.Find(this.root, 'label') as HTMLLabelElement;
        this.colorPicker   = Unit.Find(this.root, 'input') as HTMLInputElement;
        this.buttonDel     = Unit.FindWithTag(this.root, 'x') as HTMLButtonElement;
        this.buttonAdd     = Unit.FindWithTag(this.root, '+') as HTMLButtonElement;
        this.buttonDelUnit = new Unit(this.buttonDel);
        // subscribe to events
        this.colorPicker.addEventListener('input', () => this.invokeCallback(this.colorPicker.value));
        this.buttonAdd.onclick = () => this.onAddItem!(this);
        this.buttonDel.onclick = () => this.onDelItem(this);
    }

}