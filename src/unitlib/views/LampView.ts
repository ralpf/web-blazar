import { Unit } from "../Unit";
import { CompositeUnit } from "./CompositeUnit";


// more like page for all lamp blazar stuff
export class LampView extends CompositeUnit {
    
    constructor(root: HTMLElement, parent: Unit) {
        super(root, parent);
    }

    public override finalizeClassFields(): void {
        
    }

}