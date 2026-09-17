import { err, log, logi, unitRegistry } from "../core/global";
import { buildUnitRegistry } from "../core/global";
import { Action, UnitCTOR } from "../core/aliases";
import { Assert } from "../core/Assert";
import { Unit } from "../core/Unit";
import { Composite } from "../containers/Composite";
import { DOM } from "./DOM";
import { RequestDispatcher } from "./RequestDispatcher";





/** Extend this class to make a web app */
export class Application {

    private static rootUnit: Composite;

    /** get a root *Unit type from DOM */
    public static getRootUnit(): Composite {
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
        this.buildRootUnit();
        this.buildAutoUnits();
        logi('... initialize() done');
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
        if (newUnit instanceof Composite) newUnit.onObjectConstructed();
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
        let jobj = null;
        try {
            jobj = JSON.parse(sjson);
        }
        catch { err(`can't parse json '${sjson}'`); }
        
        
        logi(`... done sync webpage internals with extern json`);
    }

    public static async syncFromESP() {
        logi(`will request esp32 for sync json ...`);
        const sjson = await RequestDispatcher.sendAsync("/esp/sync/state");
        this.syncStateOnRoot(sjson);
    }

    private static parseUnitAttribute(element: HTMLElement, attribute: 'data-type' | 'data-roottype') {
        const value = element.getAttribute(attribute) ?? '';
        const parts = value.split('.');
        Assert.True(parts.length === 2 && !!parts[0] && !!parts[1],
            `DOM el. ${DOM.elementDomPath(element)} expected ${attribute}="ClassName.fieldName", got '${value}'`);
        return { typeName: parts[0], fieldName: parts[1] };
    }

    private static buildRootUnit() {
        logi(`searching for DOM root Unit ...`);

        const allElements = Array.from( document.querySelectorAll<HTMLElement>(`[data-roottype]`) );
        if (allElements.length === 0) err(`no [data-roottype=*] found in DOM`);
        if (allElements.length > 1)   err(`multiple [data-roottype=*] found in DOM`);

        const rootElement = allElements[0];
        const { typeName, fieldName } = this.parseUnitAttribute(rootElement, 'data-roottype');

        const unitCtor = unitRegistry[typeName];
        Assert.Defined(unitCtor, `unknown root type '${typeName}' (not in ctor registry)`);
        const unit = new unitCtor(rootElement);
        Assert.True(unit instanceof Composite);

        // important not to use this, as the 'this' can be a derived type (i.e. BlazarApp)
        // which will create efectivelly 2 references Application.rootUnit and BlazarApp.rootUnit and mess things up
        Application.rootUnit = unit;
        this.rootUnit.setItsParentFieldName(fieldName);
    }

    private static buildAutoUnits() {
        log('auto-discovering of Unit(s)');
        this.recursiveBuildUnit(this.rootUnit, this.rootUnit.root, 0);
        this.rootUnit instanceof Composite && this.rootUnit.onObjectConstructed();
    }

    private static recursiveBuildUnit(parentUnit: Unit, domElement: HTMLElement, depth: number) {
        for (const child of  Array.from(domElement.children, x => x as HTMLElement)) {
            if (child.hasAttribute('data-type')) {
                const { typeName, fieldName } = this.parseUnitAttribute(child, 'data-type');
                const unitCtor = unitRegistry[typeName];
                if (!unitCtor) err(`DOM el. ${DOM.elementDomPath(child)} attached type '${typeName}' that is NOT part of Unit family ctors`);
                log('    '.repeat(depth + 1) + `+ ${typeName}`);        // pretty log
                const newUnit = new unitCtor(child);                    // ~ build the *Unit class
                newUnit.reportsTo(parentUnit);                          // this is used for url up-propagation
                this.recursiveBuildUnit(newUnit, child, depth + 1);     // recurse in it's own dom inner tree, depth is for debug
                if (newUnit instanceof Composite) newUnit.onObjectConstructed(); // think how to rename the mehtod or refactor the dom walker
                // attach the instance to it's parent, if the dom object uses a fields, but NOT 'none'
                if (fieldName !== 'none') this.findCompositeParent(newUnit).attachClassField(fieldName, newUnit);
            }
            else {                                                      // no [data-type], scan in inner elements
                this.recursiveBuildUnit(parentUnit, child, depth + 1);
            }
        }
    }

    private static findCompositeParent(unit: Unit): Composite {
        let curr = unit.parentUnit;
        while (true) {
            if (!curr) err(`DOM el. ${unit.domPath} does not have a parent that is ${Composite.name}`);
            if (curr instanceof Composite) return curr;
            curr = curr.parentUnit;
        }
    }

}
