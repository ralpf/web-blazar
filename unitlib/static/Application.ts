import { err, log, logi, unitRegistry } from "../core/global";
import { buildUnitRegistry } from "../core/global";
import { Action, UnitCTOR } from "../core/aliases";
import { Assert } from "../core/Assert";
import { Unit } from "../core/Unit";
import { CompositeUnit } from "../containers/CompositeUnit";


/** Extend this class to make a web app */
export class Application {

    private static rootMap = new Map<Function, Unit>();

    /** get a root *Unit type from DOM */
    public static getSingleton<T extends Unit>(classCTOR: UnitCTOR): T {
              const rootInstance = Application.rootMap.get(classCTOR) as T;
              if (!rootInstance) throw new Error(`Controller of type '${classCTOR.name}' not in registry`);
              return rootInstance;
    }

    /** bind a generic keyboard to the app */
    public static bindKeyAction(action: Action) {
        window.addEventListener('keydown', e => {
            if (e.repeat) return;  // ignore key hold
            action(e.key);
        });
    }

    /** pass a list of constructors, they will be searched and resolved from DOM  */
    public static async initialize(...ctors: UnitCTOR[]) {
        await buildUnitRegistry();
        logi(`classes in global registry:\n[${Object.keys(unitRegistry)}]`);
        Assert.True(this.rootMap.size === 0);   // only one call per session
        Assert.IsArray(ctors);
        logi('initializing ...');
        this.buildRootUnits(ctors);
        this.buildAutoUnits();
        logi('... all done');
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

    private static buildRootUnits(ctors: UnitCTOR[]) {
        log('searching of DOM root Unit(s)');
        for (const ctor of ctors) {
            log(`@ ${ctor.name}`);
            const allElements = Array.from( document.querySelectorAll(`[data-roottype="${ctor.name}"]`) );
            if (allElements.length === 0) err(`no [data-roottype=${ctor.name}] found in DOM`);
            const singleton = new ctor(allElements[0]);
            this.rootMap.set(ctor, singleton);
        }
        Assert.True(this.rootMap.size > 0);     // at least one singleton
        log(`total ${this.rootMap.size} root Unit object(s)`);
    }

    private static buildAutoUnits() {
        log('auto-discovering of Unit(s)');
        for (const [ctor, unit] of this.rootMap) {
            log(`+ [M]${ctor.name}`);
            this.recursiveBuildUnit(unit, unit.root, 0);
            unit instanceof CompositeUnit && unit.onObjectConstructed();
        }
    }

    private static recursiveBuildUnit(parentUnit: Unit, domElement: HTMLElement, depth: number) {
        for (const child of  Array.from(domElement.children, x => x as HTMLElement)) {
            const typeName = child.dataset.type;
            const fieldName = child.dataset.field;
            const domPath = Unit.elementDomPath(child);
            //log(`-------- debug I'm in ${Unit.elementDomPath(child)} data-type=${typeName}`);

            if (typeName) {   // found [data-type] attrib
                Assert.False(!fieldName, `Dom el. ${domPath} declared type '${typeName}' but is missing 'data-field' attribute`);
                const unitCtor = unitRegistry[typeName];
                if (!unitCtor) err(`DOM el. ${domPath} attached type '${typeName}' that is NOT part of Unit family ctors`);
                log('    '.repeat(depth + 1) + `+ ${typeName}`);        // pretty log
                const newUnit = new unitCtor(child);                    // ~ build the *Unit class
                newUnit.reportsTo(parentUnit);                          // this is used for url up-propagation
                this.recursiveBuildUnit(newUnit, child, depth + 1);     // recurse in it's own dom inner tree
                if (newUnit instanceof CompositeUnit) newUnit.onObjectConstructed();
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
