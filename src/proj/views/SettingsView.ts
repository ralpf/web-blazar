import { Unit } from "../../unitlib/Unit";
import { CompositeUnit } from "../../unitlib/containers/CompositeUnit";


export class SettingsView extends CompositeUnit {

    constructor(root: HTMLElement, parent: Unit) {
        super(root, parent);
    }

    public initializeClassFields(): void {
        throw new Error("Method not implemented.");
    }

    protected initializeEvents(): void {
        throw new Error("Method not implemented.");
    }
}