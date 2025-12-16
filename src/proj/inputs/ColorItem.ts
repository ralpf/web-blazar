import { Action } from "../../unitlib/aliases";
import { Unit } from "../../unitlib/Unit";
import { InputUnit } from "../../unitlib/inputs/InputUnit";
import { Color } from "../utils/Color";


export class ColorItem extends InputUnit {

    private label!          : HTMLLabelElement;
    private buttonDel!      : HTMLButtonElement;
    private buttonAdd!      : HTMLButtonElement;
    private colorPicker!    : HTMLInputElement;
    private buttonDelUnit!  : Unit;

    public onAddItem!       : Action;
    public onDelItem!       : Action;


    public setLabelText(text: string) {
        text = this.camelCase2Text(text);
        this.label.style.fontSize = ''; // first reset to default
        const defltSize = parseFloat(getComputedStyle(this.label).fontSize);
        const finalSize = this.calculateTextFontSize(text, defltSize);
        this.label.style.fontSize = finalSize + 'px';
        this.label.textContent = text;
    }

    public setColor(hex: string) {
        this.colorPicker.value = hex;
        this.setLabelText(Color.getNearestColorName(hex));
        this.invokeCallback(hex);
    }

    public setRandomColor() {
        this.setColor(Color.random());
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
        this.colorPicker.addEventListener('input', () => this.setColor(this.colorPicker.value));
        this.buttonAdd.onclick = () => this.onAddItem!(this);
        this.buttonDel.onclick = () => this.onDelItem(this);
    }

    private camelCase2Text(text: string) {
        // split camelCase into words
        const spaced = text.replace(/([a-z])([A-Z])/g, '$1 $2');
        // capitalize words
        return spaced.replace(/\b\w/g, c => c.toUpperCase());
    }

    private calculateTextFontSize(text: string, defltSize: number): number {
        let scale = 1;
        if (text.length > 24) scale = 0.5; else
        if (text.length > 20) scale = 0.6; else
        if (text.length > 16) scale = 0.7; else
        if (text.length > 12) scale = 0.8; else
        if (text.length > 8)  scale = 0.9;
        return Math.min(defltSize, defltSize * scale * 1.3);
    }

}