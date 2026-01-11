import { FormUnit } from "unitlib/containers/FormUnit";
import { ButtonsRow } from "unitlib/inputs/ButtonsRow";


export class MoodColors extends FormUnit {

    private buttons!: ButtonsRow;
    private colors: string[] = [
        "#ff0000",
        "#ff00ff",
        "#ffba18",
        "#41ff37",
        "#00fffb",
        "#c9dffb",
    ];


    protected initializeClassFields(): void {
        this.buttons = this.getField<ButtonsRow>('buttons');
    }

    protected initializeEvents(): void {
        this.buttons.callback = (i:number) => this.propagateURL(`col=${this.colors[i]}`);
    }

}