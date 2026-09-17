import { Action } from "../core/aliases";
import { Assert } from "../core/Assert";
import { Unit }   from "../core/Unit";


export abstract class InputUnit extends Unit {

    private _cb?: Action;
    public set callback(action: Action) { this._cb = action };


    constructor(root: HTMLElement) {
        super(root);
        this.prepareInnerElements();
    }

    public invokeOnChange(value: any) {     // override this for derived classes
        this.invokeCallback(value);
    }

    public showValue(value: any) {          // does not notify listeners
        Assert.Defined(value);
        this.setInputVisualTo(value);
    }

    protected invokeCallback(value: any) {
        Assert.True(!!this._cb, `input callback undefined in ${this.domPath} <${this.typeName}>`);
        this._cb(value);
    }

    protected abstract prepareInnerElements(): void;
    protected abstract setInputVisualTo(value: any): void;

}

// NOTE: maybe implement dispose() and clear listners from imputs too