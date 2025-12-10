import { Action } from "../aliases";
import { Assert } from "../Assert";
import { Unit } from "../Unit";
import { ButtonsRow } from "./ButtonsRow";



/** like ButtonsRow, but contains an element that can signal which buttons was selected */
export class ButtonsRowSig extends ButtonsRow {

    constructor(root: HTMLElement, callback: Action) {
        super(root, callback);
    }

    protected override initDomButtons(): void {
        // find in DOM by tag
        const buttons = Array.from( Unit.FindWithTag(this.root, `buttons`).children ) as HTMLElement[];
        const signals = Array.from( Unit.FindWithTag(this.root, `signals`).children ) as HTMLElement[];
        // validate stuff
        Assert.True(buttons.length === signals.length, `in root ${this.domPath}`);
        signals.forEach(x => Assert.True(x.children.length === 2, `in root ${this.domPath}`));
        // subscribe
        buttons.forEach((x, i) => x.onclick = () => this.onSomeButtonClick(i, signals) );
    }

    private onSomeButtonClick(idx: number, signals: HTMLElement[]) {
        signals.forEach(x => this.setSignalOnOff(false, x));
        const currSig = signals[idx];
        this.setSignalOnOff(true, currSig);
        this.invokeCallback(idx);
    }

    private setSignalOnOff(isOn: boolean, sig: HTMLElement) {
        // use Unit class as a nice tmp wrapper
        const unitOn = new Unit(sig.children[0] as HTMLElement);
        const unitOf = new Unit(sig.children[1] as HTMLElement);
        unitOn.isVisible =  isOn;
        unitOf.isVisible = !isOn;
    }

}