import { Composite } from "unitlib/containers/Composite";
import { Slider } from "unitlib/inputs/Slider";


export class SettingsView extends Composite {

    private luma!: Slider;

    public initializeClassFields(): void {
        this.luma = this.getField('luma');
    }

    protected initializeEvents(): void {
        this.luma.callback = (n: number) => this.propagateURL(`luma=${n}`);
    }
}