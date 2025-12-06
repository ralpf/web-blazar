import { Action } from "../aliases.js";
import { Assert } from "../Assert.js";
import { Unit } from "../Unit.js";
import { InputUnit } from "./InputUnit.js";


// an wrapper of <select> element
export class Dropdown extends InputUnit {
    
    protected override input!: HTMLSelectElement;

    constructor(root: HTMLElement, callback: Action) {
        super(root, callback);
    }
    
    protected findInput(): HTMLElement {
        return Unit.Find(this.root, 'select') as HTMLSelectElement;
    }

    protected findLabel(): HTMLLabelElement | null {
        return this.input.labels?.[0] ?? null;
    }

    protected readInput(): number {
        return this.input.selectedIndex;
    }

    dispose(): void {
        super.dispose();
    }
}