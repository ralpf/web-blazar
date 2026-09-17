import { DOM } from "../static/DOM";
import { Assert } from "../core/Assert";
import { Unit } from "../core/Unit";
import { ButtonsRow } from "./ButtonsRow";
import { logi } from "../core/global";


/** like ButtonsRow, but contains an element that can signal which buttons was selected */
export class ButtonsRowSig extends ButtonsRow {

    private signals!: HTMLElement[];


    protected override prepareInnerElements(): void {
        // do not call super.()
        // search in DOM by tag
        const buttons = Array.from( DOM.FindWithTag(this.root, `buttons`).children, x => x as HTMLElement );
        this.signals  = Array.from( DOM.FindWithTag(this.root, `signals`).children, x => x as HTMLElement );
        // validate stuff
        Assert.True(buttons.length === this.signals.length, `in root ${this.domPath}`);
        this.signals.forEach(x => Assert.True(x.children.length === 2, `in root ${this.domPath}`));
        // subscribe
        buttons.forEach((bt, i) => bt.onclick = () => this.invokeOnChange(i) );
    }


    public override invokeOnChange(i: number): void {
        for (const x of this.signals) this.setSignalOnOff(x, false);
        this.setSignalOnOff(this.signals[i], true);
        super.invokeOnChange(i);
    }


    private setSignalOnOff(parent: HTMLElement, isOn: boolean) {
        DOM.setIsVisible(parent.firstElementChild as HTMLElement,  isOn);
        DOM.setIsVisible(parent.lastElementChild  as HTMLElement, !isOn);
    }


    protected setInputVisualTo(value: any): void {
        if (Number.isInteger(value) && value >= 0 && value < this.signals.length) {
            for (const x of this.signals) this.setSignalOnOff(x, false);
            this.setSignalOnOff(this.signals[value], true);
        }
        else logi(`invalid button signal index '${value}'`);
    }


}

//type Signal = { on: Unit, of: Unit };