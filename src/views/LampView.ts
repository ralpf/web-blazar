import { Container } from "unitlib/containers/Container";
import { ViewUnit } from "unitlib/containers/ViewUnit";
import { Dropdown } from "unitlib/inputs/Dropdown";
import { Slider } from "unitlib/inputs/Slider";


// more like page for all lamp blazar stuff
export class LampView extends ViewUnit {

    private modes!    : Container;
    private dropdown! : Dropdown;
    private luma!     : Slider;

    public override initializeClassFields(): void {
        this.dropdown = this.getField('dropdown');
        this.luma     = this.getField('luma');
        this.modes    = this.getField('modes');
    }

    protected initializeEvents(): void {
        this.dropdown.callback = (idx) => this.modes.activeIdx = idx;
        this.luma.callback = (n: number) => this.propagateURL(`luma=${n}`);
    }

}