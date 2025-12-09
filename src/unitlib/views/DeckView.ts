import { Unit } from "../Unit";
import { CompositeUnit } from "./CompositeUnit";

export class DeckView extends CompositeUnit {
    
    constructor(root: HTMLElement, parent: Unit) {
        super(root, parent);
    }

    public finalizeClassFields(): void {
        throw new Error("Method not implemented.");
    }
}