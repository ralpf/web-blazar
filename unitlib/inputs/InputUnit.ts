import { Action } from "../core/aliases";
import { Assert } from "../core/Assert";
import { Unit }   from "../core/Unit";
import { RequestDispatcher } from "../static/RequestDispatcher";


export abstract class InputUnit extends Unit {

    private _cb?: Action;
    public set callback(action: Action) { this._cb = action };


    constructor(root: HTMLElement) {
        super(root);
        this.prepareInnerElements();
    }

    public invokeOnChange(value: any) {   // override this
        this.invokeCallback(value);
    }

    protected invokeCallback(value: any) {
        if (RequestDispatcher.enabled === false) return;    // global disabled input, looks ugly
        Assert.True(!!this._cb, `input callback undefined in ${this.domPath} <${this.typeName}>`);
        this._cb(value);
    }

    protected abstract prepareInnerElements(): void;

}

// NOTE: maybe implement dispose() and clear listners from imputs too