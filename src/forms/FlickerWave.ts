import { FormUnit } from "unitlib/containers/FormUnit";
import { Checkbox } from "unitlib/inputs/Checkbox";
import { Numeral } from "unitlib/inputs/Numeral";
import { Unit } from "unitlib/core/Unit";
import { DOM } from "unitlib/static/DOM";
import { Switcher } from "unitlib/misc/Switcher";



export class FlickerWave extends FormUnit {

    private checkbox!: Checkbox;
    private hueSpeed!: Numeral;
    private hueAmplitude!: Numeral;
    private lumaSpeed!: Numeral;
    private lumaAmplitude!: Numeral;
    private panel! : HTMLElement;


    protected initializeClassFields(): void {
        this.checkbox      = this.getField('isOn');

        this.hueSpeed      = this.getNestedField('hue.spd');
        this.hueAmplitude  = this.getNestedField('hue.ampl');
        this.lumaSpeed     = this.getNestedField('val.spd');
        this.lumaAmplitude = this.getNestedField('val.ampl');
        this.panel = DOM.FindWithTag(this.root, 'panel');
    }

    protected initializeEvents(): void {
        this.checkbox.callback = (b: boolean)     => this.setFormOnOff(b);
        this.hueSpeed.callback = (n: number)      => this.propagateURL(`hSpd=${n}`);
        this.hueAmplitude.callback = (n: number)  => this.propagateURL(`hAmpl=${n}`);
        this.lumaSpeed.callback = (n: number)     => this.propagateURL(`lSpd=${n}`);
        this.lumaAmplitude.callback = (n: number) => this.propagateURL(`lAmpl=${n}`);
    }

    private setFormOnOff(isOn: boolean) {
        DOM.setIsVisible(this.panel, isOn);
        this.propagateURL(`on=${isOn ? 1 : 0}`);
    }

}