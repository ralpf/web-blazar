import { CompositeUnit } from "unitlib/containers/CompositeUnit";
import { Container } from "unitlib/containers/Container";
import { Dropdown } from "unitlib/inputs/Dropdown";
import { Slider } from "unitlib/inputs/Slider";
import { AnimationFX } from "../anim/AnimationFX";


export class DeckView extends CompositeUnit {

    private luma!     : Slider;
    private dropdown! : Dropdown;
    private content!  : Container;


    protected initializeClassFields(): void {
        this.luma = this.getField('luma');
        this.dropdown = this.getField('dropdown');
        this.content = this.getField('content');
    }

    protected initializeEvents(): void {
        this.luma.callback     = (n: number) => this.propagateURL(`luma=${n}`);
        this.dropdown.callback = (n: number) => this.onModeChanged(n);
        // just a coroutine example, keep it
        AnimationFX.sliderLuma(this.luma, 0.33);
    }

        private onModeChanged(n: number) {
        this.content.activeIdx = n;
        this.propagateURL(`mode=${n}`);
    }

}