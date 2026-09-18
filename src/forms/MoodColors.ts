import { FormUnit } from "unitlib/containers/FormUnit";
import { ButtonOne } from "unitlib/inputs/ButtonOne";
import { Application } from "unitlib/static/Application";

/** A form that contains an array of buttons to select 'mood' color*/
export class MoodColors extends FormUnit {

    private prototype!: ButtonOne;
    private container!: HTMLElement;
    private colors: [string, string, string][] = [
        ["#ef5353", "#ff0000", "Red"],
        ["#ec68e7", "#ff00ff", "Cat"],
        ["#eaaa44", "#ffba18", "Sun"],
        ["#40f176", "#41ff37", "Fairy"],
        ["#4eeaf2", "#00fffb", "Teal"],
        ["#cddeff", "#c9dffb", "Ice"],
    ];


    protected initializeClassFields(): void {
        this.prototype = this.getField('prototype');
        this.container = this.prototype.root.parentElement!;
        this.prototype.root.remove(); // remove from dom, but will keep the subtree alive
    }

    protected initializeEvents(): void {
        this.colors.forEach(([buttonColor, urlColor, text]) => {
            const item = Application.cloneUnit(this.prototype, this, this.container);
            item.callback = () => this.propagateURL(`col=${urlColor}`);
            item.root.style.backgroundColor = buttonColor;
            item.showValue(text);
        });
    }

}
