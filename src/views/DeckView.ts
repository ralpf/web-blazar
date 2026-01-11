import { CompositeUnit } from "unitlib/containers/CompositeUnit";
import { Container } from "unitlib/containers/Container";
import { Dropdown } from "unitlib/inputs/Dropdown";
import { Slider } from "unitlib/inputs/Slider";
import { AnimationFX } from "../anim/AnimationFX";


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
        this.luma.callback       = (n: number) => this.propagateURL(`luma=${n}`);
        this.modeSelect.callback = (n: number) => this.modeContent.activeIdx = n;
        // just a coroutine example, keep it
        AnimationFX.sliderLuma(this.luma, 0.33);
    }

}