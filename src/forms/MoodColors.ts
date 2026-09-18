import { FormUnit } from "unitlib/containers/FormUnit";
import { logi } from "unitlib/core/global";
import { SyncUnit } from "unitlib/core/SyncUnit";
import { ButtonOne } from "unitlib/inputs/ButtonOne";
import { Application } from "unitlib/static/Application";

/** A form that contains an array of buttons to select 'mood' color*/
export class MoodColors extends FormUnit {

    private prototype!: ButtonOne;
    private container!: HTMLElement;
    private colorSync!: SyncUnit;

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
        this.colorSync  = this.getField('col32');
        this.container = this.prototype.root.parentElement!;
        this.prototype.root.remove(); // remove from dom, but will keep the subtree alive
    }

    protected initializeEvents(): void {
        // clone/setup buttons
        this.colors.forEach(([buttonColor, urlColor, text]) => {
            const item = Application.cloneUnit(this.prototype, this, this.container);
            item.callback = () => this.propagateURL(`col=${urlColor}`);
            item.root.style.backgroundColor = buttonColor;
            item.showValue(text);
        });
        // subscribe to sync unit
        this.colorSync.callback = (value) => logi(`got color to sync, but there is no visual to modify`);
    }

}
