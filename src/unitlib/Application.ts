import { err, log, logi, unitRegistry } from "./global";
import { Action, UnitCTOR } from "./aliases";
import { Assert } from "./Assert";
import { Unit } from "./Unit";
import { CompositeUnit } from "./views/CompositeUnit";

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
        logi('... all done');
    }

    private static buildRootUnits(ctors: UnitCTOR[]) {
        log('searching of DOM root Unit(s)');
        for (const ctor of ctors) {
            log(`@ ${ctor.name}`);
            const allElements = Array.from( document.querySelectorAll(`[data-roottype="${ctor.name}"]`) );
            if (allElements.length === 0) err(`no [data-roottype=${ctor.name}] found in DOM`);
            const singleton = new ctor(allElements[0] as HTMLElement);
            this.rootMap.set(ctor, singleton);
        }
        Assert.True(this.rootMap.size > 0);     // at least one singleton
        log(`total ${this.rootMap.size} root Unit object(s)`);
    }

    private static buildAutoUnits() {
        log('auto-discovering of Unit(s)');
        for (const [ctor, unit] of this.rootMap) {
            log(`@ ${ctor.name}`);
            this.recursiveBuildUnit(unit, unit.root, 0);
        }
    }

    private static recursiveBuildUnit(parentUnit: Unit, domElement: HTMLElement, depth: number) {
        for (const child of  Array.from(domElement.children, x => x as HTMLElement)) {
            const typeName = child.dataset.type;
            const fieldName = child.dataset.field;
            const domPath = Unit.elementDomPath(child);

            if (typeName) {   // found [data-type] attrib
                Assert.False(!fieldName, `Dom el. ${domPath} declared type '${typeName}' but is missing 'data-field' attribute`);
                const unitCtor = unitRegistry[typeName];
                if (!unitCtor) err(`DOM el. ${domPath} attached type '${typeName}' that is part of Unit family ctors`);
                log('    '.repeat(depth + 1) + `+ ${typeName}`);        // pretty log
                const newUnit = new unitCtor(child, parentUnit);        // ~ build the *Unit class
                this.recursiveBuildUnit(newUnit, child, depth + 1);     // recurse in it's own dom inner tree
                parentUnit instanceof CompositeUnit && parentUnit.attachClassField(fieldName!, newUnit);   // man, this looks good, c#-er here
            }
            else {                                                      // no [data-type], scan in inner elements
                this.recursiveBuildUnit(parentUnit, child, depth + 1);
            }
        }
        parentUnit instanceof CompositeUnit && parentUnit.finalizeClassFields();
    }

}
