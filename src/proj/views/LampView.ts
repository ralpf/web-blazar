import { Unit } from "../../unitlib/Unit";
import { CompositeUnit } from "../../unitlib/containers/CompositeUnit";
import { Container } from "../../unitlib/containers/Container";
import { Dropdown } from "../../unitlib/inputs/Dropdown";


// more like page for all lamp blazar stuff
export class LampView extends CompositeUnit {

    private modes!    : Container;
    private dropdown! : Dropdown;

    public override initializeClassFields(): void {
        this.modes = this.getField<Container>('modes');
        this.dropdown = this.getField<Dropdown>('dropdown');
    }

    protected initializeEvents(): void {
        //throw new Error("Method not implemented.");
    }

}