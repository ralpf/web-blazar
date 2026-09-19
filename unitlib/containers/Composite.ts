import { JObject } from "../core/aliases";
import { Assert } from "../core/Assert";
import { err, log, logi } from "../core/global";
import { Unit } from "../core/Unit";
import { InputUnit } from "../inputs/InputUnit";


export class Composite extends Unit {

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

    /** called when the html was parsed and all units were build and linked. Usefull to do post-init stuff, like fetch data from esp */
    public onUnitTreeReady() {
        // call the same method recursivelly. Override this method to add more action
        for (const unit of Object.values(this.fields)) {
            if (unit instanceof Composite) {
                unit.onUnitTreeReady();
            }
        }
    }

    /** use to sync just 1 input somewhere using a string url */
    public syncField(url: string) {
         // i.e. main/lamp/flik?hSpd=45 ;; note that url can't have leading /
        Assert.Defined(url);

        let i: number;
        let payload  = '';
        let nextName = '';

        if ((i = url.indexOf('/')) >= 0) {                                      // lamp/flik?hSpd=45
            nextName = url.slice(0, i);
            payload  = url.slice(i + 1);
            this.getField<Composite>(nextName).syncField(payload);
        } else if ((i = url.indexOf('?')) >= 0) {                                    // flik?hSpd=45
            nextName = url.slice(0, i);
            payload  = url.slice(i + 1);
            this.getField<Composite>(nextName).syncField(payload);
        } else if ((i = url.indexOf('=')) >= 0) {                                         // hSpd=45
            nextName = url.slice(0, i);
            payload  = url.slice(i + 1);
            this.getField<InputUnit>(nextName).showValue(payload);
        } else throw new Error('Never should happen');
    }

    /** use to sync the full object plus it's internals with a json object */
    public syncState(jobj: JObject): void {
        for (const [name, value] of Object.entries(jobj)) {
            Assert.Defined(name);
            if (this.hasField(name) === false) {
                logi(`skip sync '${name}' on '${this.getItsParentFieldName()}' because the latest lacks former field with such name`);
                continue;
            }
            // the field is present
            if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
                const nextUnit = this.getField<Composite>(name);
                Assert.True(nextUnit instanceof Composite,
                    `JSON/Unit-tree mismatch at ${this.typeName}.${name}: expected it to be Composite, got '${nextUnit.typeName}'`);
                nextUnit.syncState(value as JObject);
            } else {    // primitive value or array
                const leafInput = this.getField<InputUnit>(name);
                leafInput.showValue(value);
                //err(`this method is incomplete, because of composite hierarchy`);
            }
        }
    }


    protected getField<T extends Unit>(fieldName: string): T {
        const unit = this.fields[fieldName];
        Assert.False(!unit, `no filed '${this.typeName}.${fieldName}' was found (refactored?) Available: [${Object.keys(this.fields).join(", ")}] at ${this.domPath}`);
        return unit as T;
    }


    protected hasField(fieldName: string): boolean {
        return Object.prototype.hasOwnProperty.call(this.fields, fieldName);
    }


    protected getNestedField<T extends Unit>(fieldPath: string): T {
        const parts = fieldPath.split('.');
        if (parts.some(x => !x)) err(`invalid field path '${fieldPath}'`);
        let unit: Unit = this;
        for (const part of parts) {
            if (!(unit instanceof Composite))
                err(`can't resolve '${part}' in '${fieldPath}': '${unit.typeName}' is not Composite`);
            unit = unit.getField<Unit>(part);
        }
        return unit as T;
    }

    protected initializeClassFields(): void {};
    protected initializeEvents(): void {};

}
