import { FormUnit } from "unitlib/containers/FormUnit";
import { ButtonsRow } from "unitlib/inputs/ButtonsRow";


export class MoodColors extends FormUnit {

    private buttons!: ButtonsRow;

    protected initializeClassFields(): void {
        this.buttons = this.getField<ButtonsRow>('buttons');
    }

    protected initializeEvents(): void {
        this.buttons.callback = (i:number) => this.propagateURL(`${i + 1}`);
    }

}