import { Unit } from "../Unit.js";
export class InputUnit extends Unit {
    constructor(root, callback) {
        super(root);
        this.callback = callback;
    }
    onInputEvent(value) {
        this.callback(value);
    }
}
// NOTE: maybe implement dispose() and clear listners from imputs too
