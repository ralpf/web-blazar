import { Unit } from "../../unitlib/Unit";
import { CompositeUnit } from "../../unitlib/views/CompositeUnit";

export class SettingsView extends CompositeUnit {
    
    constructor(root: HTMLElement, parent: Unit) {
        super(root, parent);
    }

    public finalizeClassFields(): void {
        throw new Error("Method not implemented.");
    }

}