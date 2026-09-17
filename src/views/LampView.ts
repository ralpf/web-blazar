import { ViewUnit } from "unitlib/containers/ViewUnit";
import { Assert } from "unitlib/core/Assert";
import { Dropdown } from "unitlib/inputs/Dropdown";
import { Slider } from "unitlib/inputs/Slider";
import { Switcher } from "unitlib/misc/Switcher";
import { DOM } from "unitlib/static/DOM";
import { FlickerWave } from "../forms/FlickerWave";


// more like page for all lamp blazar stuff
export class LampView extends ViewUnit {

    private modeSelect!  : Dropdown;
    private luma!        : Slider;         // global lamp brightness
    private flickerForm! : FlickerWave;
    private panels!      : Switcher;

    // more fields exist like sliders, mood and palette, flicker

    public override initializeClassFields(): void {
        this.modeSelect  = this.getField('mode');
        this.luma        = this.getField('luma');
        this.flickerForm = this.getField("flick");
        const rootPanelsEl = DOM.FindWithTag(this.root, 'lamp-panels');
        this.panels = new Switcher(rootPanelsEl);
    }

    protected initializeEvents(): void {
        this.luma.callback     = (n: number) => this.propagateURL(`luma=${n}`);
        this.modeSelect.callback = (n: number) => this.onModeChanged(n);
    }

    private onModeChanged(i: number) {
        this.panels.activeIdx = i;
        this.propagateURL(`mode=${i}`);
    }

}