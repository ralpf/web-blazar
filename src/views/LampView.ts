import { Container } from "unitlib/containers/Container";
import { ViewUnit } from "unitlib/containers/ViewUnit";
import { Dropdown } from "unitlib/inputs/Dropdown";
import { Slider } from "unitlib/inputs/Slider";


// more like page for all lamp blazar stuff
export class LampView extends ViewUnit {

    private content!  : Container;
    private dropdown! : Dropdown;
    private luma!     : Slider;
    // more fields exist like sliders, mood and palette, flicker

    public override initializeClassFields(): void {
        this.dropdown = this.getField('dropdown');
        this.luma     = this.getField('luma');
        this.content  = this.getField('content');
    }

    protected initializeEvents(): void {
        this.luma.callback     = (n: number) => this.propagateURL(`luma=${n}`);
        this.dropdown.callback = (n: number) => this.onModeChanged(n);
    }

    private onModeChanged(n: number) {
        this.content.activeIdx = n;
        this.propagateURL(`mode=${n}`);
    }

}