import { err, log, logi, unitRegistry } from "./global";
import { Action, UnitCTOR } from "./aliases";
import { Assert } from "./Assert";
import { Unit } from "./Unit";

/** Extend this class to make a web app */
export class Application {

    private static rootMap = new Map<Function, Unit>();

    /** get a root *Unit type from DOM */
    static getRoot<T extends Unit>(classCTOR: UnitCTOR): T {
              const rootInstance = Application.rootMap.get(classCTOR) as T;
              if (!rootInstance) throw new Error(`Controller of type '${classCTOR.name}' not in registry`);
              return rootInstance;
    }

    /** bind a generic keyboard to the app */
    static bindKeyAction(action: Action) {
        window.addEventListener('keydown', e => {
            if (e.repeat) return;  // ignore key hold
            action(e.key);
        });
    }

    /** pass a list of constructors, they will be searched and resolved from DOM  */
    static initialize(...ctors: UnitCTOR[]) {
        Assert.True(this.rootMap.size === 0);   // only one call per session
        Assert.IsArray(ctors);
        logi('initializing ...');
        this.buildRootUnits(ctors);
        this.buildAutoUnits();
    }

    private static buildRootUnits(ctors: UnitCTOR[]) {
        logi('searching of DOM root Unit(s)');
        for (const ctor of ctors) {
            logi(`making root ${ctor.name} : Unit`);
            const allElements = Array.from( document.querySelectorAll(`[data-roottype="${ctor.name}"]`) );
            Assert.IsArray(allElements, 1);     // only one root element per class
            const singleton = new ctor(allElements[0] as HTMLElement);
            this.rootMap.set(ctor, singleton);
        }
        Assert.True(this.rootMap.size > 0);     // at least one singleton
        logi(`total ${this.rootMap.size} root Unit object(s)`);
    }

    private static buildAutoUnits() {
        logi('start auto-discover of Unit(s)');
        this.rootMap.forEach(unit =>  this.recursiveBuildUnit(unit, unit.root, 0));
    }

    private static recursiveBuildUnit(parentUnit: Unit, domElement: HTMLElement, depth: number) {
        for (const child of domElement.children) {
            const childElement = child as HTMLElement;
            const unitTypeName = childElement.dataset.type;

            if (unitTypeName) {   // found [data-type] attrib
                const unitCtor = unitRegistry[unitTypeName];
                if (!unitCtor) err(`DOM el. ${Unit.elementDomPath(childElement)} attached type '${unitTypeName}' that is part of Unit family ctors`);
                log('    '.repeat(depth) + `+ ${unitTypeName}`);                // pretty log
                const unitInstance = new unitCtor(childElement, parentUnit);    // this will build the *Unit class
                this.recursiveBuildUnit(unitInstance, childElement, depth + 1); // and will recurse in it's own dom inner tree
                continue;
            }                                                                   // else no [data-type], scan in inner elements
            this.recursiveBuildUnit(parentUnit, childElement, depth + 1);
        }
    }

}
