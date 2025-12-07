import { log } from "./log.js";
import { Action, UnitCTOR } from "./aliases.js";
import { Assert } from "./Assert.js";
import { Unit } from "./Unit.js";
import { ButtonsRow } from "./inputs/ButtonsRow.js";
import { Pages } from "./containers/Pages.js";


/** Extend this class to make a web app */
export class Application {

    private static rootMap = new Map<Function, Unit>();

    /** pass a list of constructors, they will be searched and resolved from DOM  */
    static initialize(...ctors: UnitCTOR[]) {
        Assert.True(this.rootMap.size === 0);   // only one call per session
        Assert.IsArray(ctors);
        log('App initializing ...');
        this.buildRootUnits(ctors);
        this.buildAutoUnits();
    }

    private static buildRootUnits(ctors: UnitCTOR[]) {
        log('Start search of DOM root Unit(s)');
        for (const ctor of ctors) {
            log(`Making root ${ctor.name} : Unit`);
            const allElements = Array.from( document.querySelectorAll(`[data-roottype="${ctor.name}"]`) );
            Assert.IsArray(allElements, 1);     // only one root element per class
            const singleton = new ctor(allElements[0] as HTMLElement);
            this.rootMap.set(ctor, singleton);
        }
        Assert.True(this.rootMap.size > 0);     // at least one singleton
        log(`Created ${this.rootMap.size} root Unit object(s)`);
    }

    private static buildAutoUnits() {
        log('Start auto-discover of Unit(s)');
        this.rootMap.forEach(unit =>  this.recursiveBuildUnit(unit));
    }

    private static recursiveBuildUnit(parent: Unit) {
        for (const child of parent.root.children) {
            const element = child as HTMLElement;
            const unitType = element.dataset.type;

            if (unitType) {   // found [data-type] attrib

            }
        }
    }



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

}


const reg = {
    Pages,
    ButtonsRow,
}