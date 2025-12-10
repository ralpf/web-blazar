import { Assert } from "../Assert";
import { log } from "../global";
import { Unit } from "../Unit";


export abstract class CompositeUnit extends Unit {

    private fields: Record<string, Unit> = {}

    /** used ONLY during init from DOM. Implements feature of 'delayed fields' for views and forms */
    public attachClassField(fieldName: string, unitInstance: Unit) {
        Assert.True(!!fieldName, 'filedName was empty');
        Assert.True(!this.fields[fieldName], `duplicate of '${fieldName}'`);
        this.fields[fieldName] = unitInstance;
        log(`\t\t·${this.typeName}.${fieldName} field added`);
    }

    /** called when the *Unit object tree is constructed. Marks getField<T>() method accessible */
    public abstract finalizeClassFields(): void;

    /** generic way to access a delayed class field */
    protected getField<T extends Unit>(fieldName: string): T {
        const unit = this.fields[fieldName];
        Assert.False(!unit, `no filed '${this.typeName}.${fieldName}' was found (refactored?) Available: [${Object.keys(this.fields).join(", ")}]`);
        return unit as T;
    }
}