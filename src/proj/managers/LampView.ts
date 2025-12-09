import { Unit } from "../../unitlib/Unit";
import { CompositeUnit } from "../../unitlib/views/CompositeUnit";


// more like page for all lamp blazar stuff
export class LampView extends CompositeUnit {
    
    constructor(root: HTMLElement, parent: Unit) {
        super(root, parent);
    }

    public override finalizeClassFields(): void {
        
    }

}