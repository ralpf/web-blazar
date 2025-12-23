import { Unit } from "../../unitlib/Unit";
import { CompositeUnit } from "../../unitlib/containers/CompositeUnit";
import { Container } from "../../unitlib/containers/Container";
import { Dropdown } from "../../unitlib/inputs/Dropdown";
import { Slider } from "../../unitlib/inputs/Slider";


export class DeckView extends CompositeUnit {

    private luma!: Slider;
    private modeSelect!: Dropdown;
    private modeContent!: Container;


    protected initializeClassFields(): void {
        this.luma = this.getField('luma');
        this.modeSelect = this.getField('modeSelect');
        this.modeContent = this.getField('modeContent');
    }

    protected initializeEvents(): void {
        this.luma.callback = (value: number) => this.propagateURL(`my val is ${value}`);
        this.modeSelect.callback = (idx: number) => this.modeContent.activeIdx = idx;
    }

}