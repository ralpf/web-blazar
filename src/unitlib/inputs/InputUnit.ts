import { Action } from "../aliases";
import { log } from "../global";
import { Unit }   from "../Unit";


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