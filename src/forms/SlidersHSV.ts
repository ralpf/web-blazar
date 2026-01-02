import { FormUnit } from "unitlib/containers/FormUnit";
import { Slider } from "unitlib/inputs/Slider";


export class SlidersHSV extends FormUnit {

    private hue!: Slider;
    private sat!: Slider;


    protected initializeClassFields(): void {
        this.hue = this.getField('hue');
        this.sat = this.getField('sat');
    }

    protected initializeEvents(): void {
        this.hue.callback = (n: number) => this.propagateURL(`hue=${n}`);
        this.sat.callback = (n: number) => this.propagateURL(`sat=${n}`);
    }

}