import { err, log, logi, unitRegistry } from "../core/global";
import { buildUnitRegistry } from "../core/global";
import { Action, UnitCTOR } from "../core/aliases";
import { Assert } from "../core/Assert";
import { Unit } from "../core/Unit";
import { CompositeUnit } from "../containers/CompositeUnit";
import { RequestDispatcher } from "./RequestDispatcher";
import { RequestReceiver } from "./RequestReceiver";
import { DOM } from "./DOM";





/** Extend this class to make a web app */
export class Application {

    private static rootUnit: CompositeUnit;

    /** get a root *Unit type from DOM */
    public static getRootUnit(): CompositeUnit {
        return this.rootUnit;
    }

    /** bind a generic keyboard to the app */
    public static bindKeyAction(action: Action) {
        window.addEventListener('keydown', e => {
            if (e.repeat) return;  // ignore key hold
            action(e.key);
        });
    }

    /** pass a list of constructors, they will be searched and resolved from DOM  */
    public static async initialize() {
        Assert.True(!this.rootUnit);   // only one call per session
        await buildUnitRegistry();
        logi(`classes in global registry:\n[${Object.keys(unitRegistry)}]`);
        this.buildRootUnits();
        this.buildAutoUnits();
        logi('... all done');
    }

    public static initializeCompleted() {
        // call this after all init is done
        
    }

    public static cloneUnit<T extends Unit>(prototype: T, parentUnit: Unit, rootDomElement: Element): T {
        Assert.Defined(prototype);
        // we have 2 parents: one is dom parent, other is Unit parent, which may be not the same object
        const newElement = prototype.root.cloneNode(true) as HTMLElement;
        rootDomElement.appendChild(newElement);
        // create and the unit instance on top object
        const ctor = prototype.constructor as UnitCTOR<T>;
        const newUnit = new ctor(newElement) as T;
        newUnit.reportsTo(parentUnit);
        this.recursiveBuildUnit(newUnit, newUnit.root, 0);
        if (newUnit instanceof CompositeUnit) newUnit.onObjectConstructed();
        return newUnit;
    }

    public static removeUnit(unit: Unit) {
        Assert.Defined(unit);
        unit.dispose();
    }

    public static syncFieldOnRoot(url: string) {
        // here it is ok to pre-precess the url
        // after this we will proceed to dig into the hierarchy
        // and pass a payload (usually to an input to sync it's visual)

        const i = url.indexOf('/');
        if (i <= 0 || i === url.length - 1) err(`Expected root name w/o a leading '/': '${url}'`);

        const rootName = url.slice(0, i);
        if (this.rootUnit.getItsParentFieldName() !== rootName)
            err(`url root '${rootName}' does not match DOM root filedName '${this.rootUnit.getItsParentFieldName()}'`);
        this.rootUnit.syncField(url.slice(i + 1));  // the reminder of the url
    }

    public static syncStateOnRoot(sjson: string) {
        // accept a json with objects
    }

    private static buildRootUnits() {
        logi(`searching for DOM root Unit ...`);

        const allElements = Array.from( document.querySelectorAll(`[data-roottype]`) );
        if (allElements.length === 0) err(`no [data-roottype=*] found in DOM`);
        if (allElements.length > 1)   err(`multiple [data-roottype=*] found in DOM`);

        const rootElement = allElements[0];
        const fieldName = rootElement.getAttribute('data-field');
        Assert.Defined(fieldName, `expected to have field name set for root unit`);
        const ctorName = rootElement.getAttribute('data-roottype');
        Assert.Defined(ctorName);

        const unitCtor = unitRegistry[ctorName];
        Assert.Defined(unitCtor, `unknown root type '${ctorName}' (not in ctor registry)`);
        const unit = new unitCtor(rootElement);
        Assert.True(unit instanceof CompositeUnit);

        // important not to use this, as the 'this' can be a derived type (i.e. BlazarApp)
        // which will create efectivelly 2 references Application.rootUnit and BlazarApp.rootUnit and mess things up
        Application.rootUnit = unit;
        this.rootUnit.setItsParentFieldName(fieldName);
    }

    private static buildAutoUnits() {
        log('auto-discovering of Unit(s)');
        this.recursiveBuildUnit(this.rootUnit, this.rootUnit.root, 0);
        this.rootUnit instanceof CompositeUnit && this.rootUnit.onObjectConstructed();
    }

    private static recursiveBuildUnit(parentUnit: Unit, domElement: HTMLElement, depth: number) {
        for (const child of  Array.from(domElement.children, x => x as HTMLElement)) {
            const typeName = child.dataset.type;
            const fieldName = child.dataset.field;
            const domPath = DOM.elementDomPath(child);
            //log(`-------- debug I'm in ${Unit.elementDomPath(child)} data-type=${typeName}`);

            if (typeName) {   // found [data-type] attrib
                Assert.False(!fieldName, `Dom el. ${domPath} declared type '${typeName}' but is missing 'data-field' attribute`);
                const unitCtor = unitRegistry[typeName];
                if (!unitCtor) err(`DOM el. ${domPath} attached type '${typeName}' that is NOT part of Unit family ctors`);
                log('    '.repeat(depth + 1) + `+ ${typeName}`);        // pretty log
                const newUnit = new unitCtor(child);                    // ~ build the *Unit class
                newUnit.reportsTo(parentUnit);                          // this is used for url up-propagation
                this.recursiveBuildUnit(newUnit, child, depth + 1);     // recurse in it's own dom inner tree, depth is for debug
                if (newUnit instanceof CompositeUnit) newUnit.onObjectConstructed(); // think how to rename the mehtod or refactor the dom walker
                // attach the instance to it's parent, if the dom object uses a fields, but NOT 'none'
                if (fieldName !== 'none') this.findCompositeParent(newUnit).attachClassField(fieldName!, newUnit);
            }
            else {                                                      // no [data-type], scan in inner elements
                this.recursiveBuildUnit(parentUnit, child, depth + 1);
            }
        }
    }

    private static findCompositeParent(unit: Unit): CompositeUnit {
        let curr = unit.parentUnit;
        while (true) {
            if (!curr) err(`DOM el. ${unit.domPath} does not have a parent that is ${CompositeUnit.name}`);
            if (curr instanceof CompositeUnit) return curr;
            curr = curr.parentUnit;
        }
    }

}
