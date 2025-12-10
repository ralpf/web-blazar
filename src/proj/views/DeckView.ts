import { Unit } from "../../unitlib/Unit";
import { CompositeUnit } from "../../unitlib/containers/CompositeUnit";


export class DeckView extends CompositeUnit {
    
    constructor(root: HTMLElement, parent: Unit) {
        super(root, parent);
    }

    public finalizeClassFields(): void {
        throw new Error("Method not implemented.");
    }
}