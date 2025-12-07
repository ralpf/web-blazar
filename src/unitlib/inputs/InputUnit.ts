import { Action } from "../aliases.js";
import { log } from "../global.js";
import { Unit }   from "../Unit.js";


export abstract class InputUnit extends Unit {

    private callback: Action;

    constructor(root: HTMLElement, callback: Action) {
        super(root);
        this.callback = callback;
    }

    protected onInputEvent(value: any) {
        this.callback(value);
    }
}

// NOTE: maybe implement dispose() and clear listners from imputs too