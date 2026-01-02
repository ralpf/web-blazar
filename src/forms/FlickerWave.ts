import { FormUnit } from "unitlib/containers/FormUnit";
import { Checkbox } from "unitlib/inputs/Checkbox";
import { Numeral } from "unitlib/inputs/Numeral";
import { Unit } from "unitlib/core/Unit";



export class FlickerWave extends FormUnit {

    private checkbox!: Checkbox;
    private content! : Unit;
    private hueSpeed!: Numeral;
    private hueAmplitude!: Numeral;
    private lumaSpeed!: Numeral;
    private lumaAmplitude!: Numeral;


    protected initializeClassFields(): void {
        this.checkbox = this.getField('checkbox');
        this.content  = this.getField('content');
        this.hueSpeed = this.getField('hueSpeed');
        this.hueAmplitude = this.getField('hueAmplitude');
        this.lumaSpeed = this.getField('lumaSpeed');
        this.lumaAmplitude = this.getField('lumaAmplitude');
    }

    protected initializeEvents(): void {
        this.checkbox.callback = (b: boolean) => this.content.isVisible = b;
        this.hueSpeed.callback = (n: number) => this.propagateURL(`hueSpeed=${n}`);
        this.hueAmplitude.callback = (n: number) => this.propagateURL(`hueAmplitude=${n}`);
        this.lumaSpeed.callback = (n: number) => this.propagateURL(`lumaSpeed=${n}`);
        this.lumaAmplitude.callback = (n: number) => this.propagateURL(`lumaAmplitude=${n}`);
    }

}