import { CompositeUnit } from "unitlib/containers/CompositeUnit";
import { Slider } from "unitlib/inputs/Slider";


export class SettingsView extends CompositeUnit {

    private luma!: Slider;

    public initializeClassFields(): void {
        this.luma = this.getField('luma');
    }

    protected initializeEvents(): void {
        this.luma.callback = (n: number) => this.propagateURL(`luma=${n}`);
    }
}