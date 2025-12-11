import { FormUnit } from "../../unitlib/containers/FormUnit";
import { ButtonsRow } from "../../unitlib/inputs/ButtonsRow";
import { Unit } from "../../unitlib/Unit";


export class MoodColors extends FormUnit {

    private buttons!: ButtonsRow;

    protected initializeClassFields(): void {
        this.buttons = this.getField<ButtonsRow>('buttons');
    }

    protected initializeEvents(): void {
        this.buttons.callback = i => console.log(`button presseed ${i + 1}`);
    }

}