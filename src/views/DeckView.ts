import { Composite } from "unitlib/containers/Composite";
import { Dropdown } from "unitlib/inputs/Dropdown";
import { Slider } from "unitlib/inputs/Slider";
import { AnimationFX } from "../anim/AnimationFX";
import { DOM } from "unitlib/static/DOM";
import { Switcher } from "unitlib/misc/Switcher";


export class DeckView extends Composite {

    private luma!     : Slider;
    private dropdown! : Dropdown;
    private panels!   : Switcher;


    protected initializeClassFields(): void {
        this.luma = this.getField('luma');
        this.dropdown = this.getField('mode');
        const panelsRootEl = DOM.FindWithTag(this.root, 'deck-panels');
        this.panels = new Switcher(panelsRootEl);
    }

    protected initializeEvents(): void {
        this.luma.callback     = (n: number) => this.propagateURL(`luma=${n}`);
        this.dropdown.callback = (n: number) => this.onModeChanged(n);
        // just a coroutine example, keep it
        AnimationFX.sliderLuma(this.luma, 0.33);
    }

    private onModeChanged(n: number) {
        this.panels.activeIdx = n;
        this.propagateURL(`mode=${n}`);
    }

}