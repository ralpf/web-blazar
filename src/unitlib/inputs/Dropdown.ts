import { Action } from "../Action";
import { Assert } from "../Assert";
import { Unit } from "../Unit";
import { InputUnit } from "./InputUnit";


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
}