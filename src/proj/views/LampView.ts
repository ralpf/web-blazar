import { Container } from "../../unitlib/containers/Container";
import { ViewUnit } from "../../unitlib/containers/ViewUnit";
import { Dropdown } from "../../unitlib/inputs/Dropdown";


// more like page for all lamp blazar stuff
export class LampView extends ViewUnit {

    private modes!    : Container;
    private dropdown! : Dropdown;

    public override initializeClassFields(): void {
        this.modes = this.getField<Container>('modes');
        this.dropdown = this.getField<Dropdown>('dropdown');
    }

    protected initializeEvents(): void {
        this.dropdown.callback = (idx) => this.modes.activeIdx = idx;
    }

}