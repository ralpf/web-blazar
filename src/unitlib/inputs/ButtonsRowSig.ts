import { Assert } from "../Assert";
import { Unit } from "../Unit";
import { ButtonsRow } from "./ButtonsRow";


/** like ButtonsRow, but contains an element that can signal which buttons was selected */
export class ButtonsRowSig extends ButtonsRow {

    private signalArr!: Signal[];

    protected override prepareInnerElements(): void {
        // do not call super.()
        // search in DOM by tag
        const buttons = Array.from( Unit.FindWithTag(this.root, `buttons`).children );
        const signals = Array.from( Unit.FindWithTag(this.root, `signals`).children );
        // validate stuff
        Assert.True(buttons.length === signals.length, `in root ${this.domPath}`);
        signals.forEach(x => Assert.True(x.children.length === 2, `in root ${this.domPath}`));
        // cache signal elements
        this.signalArr = signals.map(x => ({ on: new Unit(x.children[0]), of: new Unit(x.children[1])}));
        // subscribe
        buttons.forEach((bt, i) => (bt as HTMLElement).onclick = () => this.onChange(i) );
    }
    
    public override onChange(idx: number): void {
        this.signalArr.forEach(x => this.setSignalOnOff(false, x));
        const currSig = this.signalArr[idx];
        this.setSignalOnOff(true, currSig);
        super.onChange(idx);
    }

    private setSignalOnOff(isOn: boolean, sig: Signal) {
        sig.on.isVisible =  isOn;
        sig.of.isVisible = !isOn;
    }


}

type Signal = { on: Unit, of: Unit };