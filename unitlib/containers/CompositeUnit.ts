import { Assert } from "../core/Assert";
import { log } from "../core/global";
import { Unit } from "../core/Unit";
import { InputUnit } from "../inputs/InputUnit";


export abstract class CompositeUnit extends Unit {

    private fields: Record<string, Unit> = {}

    /** used ONLY during init from DOM. Implements feature of 'delayed fields' for views and forms */
    public attachClassField(fieldName: string, unitInstance: Unit) {
        Assert.True(!!fieldName, 'filedName was empty');
        Assert.True(!this.fields[fieldName], `duplicate of '${fieldName}'`);
        this.fields[fieldName] = unitInstance;
        unitInstance.setItsParentFieldName(fieldName);
        log(`\t\t·${this.typeName}.${fieldName} field bind ok`);
    }

    /** called when the *Unit object tree is constructed. Marks getField<T>() method accessible */
    public onObjectConstructed() {
        this.initializeClassFields();
        this.initializeEvents();
    }

    public syncField(url: string) {
         // i.e. lamp/flik?hSpd=45 ;; note that url can't have leading /
        Assert.Defined(url);
        const i = url.indexOf('/');
        const is_composite = i >= 0;

        let fieldName = '';
        let fieldUnit = null;

        if (is_composite) {
            fieldName = url.slice(0, i);
            fieldUnit = this.getField<CompositeUnit>(fieldName);
            fieldUnit.syncField(url.slice(i + 1));  // the rest of the url
        } else {
            const j = url.indexOf('?');
            Assert.True(j > 0);
            fieldName = url.slice(0, j);
            fieldUnit = this.getField<InputUnit>(fieldName);
            const valueString = url.slice(j + 1);
            fieldUnit.showValue(valueString);
        }


    }

    /** generic way to access a delayed class field */
    protected getField<T extends Unit>(fieldName: string): T {
        const unit = this.fields[fieldName];
        Assert.False(!unit, `no filed '${this.typeName}.${fieldName}' was found (refactored?) Available: [${Object.keys(this.fields).join(", ")}]`);
        return unit as T;
    }

    protected abstract initializeClassFields(): void;
    protected abstract initializeEvents(): void;

}