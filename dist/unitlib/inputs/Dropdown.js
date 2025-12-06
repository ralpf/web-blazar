import { Unit } from "../Unit.js";
import { InputUnit } from "./InputUnit.js";
// an wrapper of <select> element
export class Dropdown extends InputUnit {
    constructor(root, callback) {
        super(root, callback);
    }
    findInput() {
        return Unit.Find(this.root, 'select');
    }
    findLabel() {
        return this.input.labels?.[0] ?? null;
    }
    readInput() {
        return this.input.selectedIndex;
    }
    dispose() {
        super.dispose();
    }
}
