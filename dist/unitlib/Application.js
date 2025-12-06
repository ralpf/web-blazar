import { log } from "./log.js";
import { Assert } from "./Assert.js";
/** Extend this class to make a web app */
export class Application {
    /** pass a list of constructors, they will be searched and resolved from DOM  */
    static initialize(...ctors) {
        Assert.IsArray(ctors);
        Assert.True(this.rootMap.size === 0); // only one call for initialize
        log('App initializing ...');
        for (const ctor of ctors) {
            log(`Making root ${ctor.name} : Unit`);
            const allElements = Array.from(document.querySelectorAll(`[data-roottype="${ctor.name}"]`));
            Assert.IsArray(allElements, 1); // only one root element per class
            const singleton = new ctor(allElements[0]);
            this.rootMap.set(ctor, singleton);
        }
        Assert.True(this.rootMap.size > 0); // at least one singleton
        log(`App initialized with ${this.rootMap.size} root objects`);
    }
    /** get a root *Unit type from DOM */
    static getRoot(classCTOR) {
        const rootInstance = Application.rootMap.get(classCTOR);
        if (!rootInstance)
            throw new Error(`Controller of type '${classCTOR.name}' not in registry`);
        return rootInstance;
    }
    /** bind a generic keyboard to the app */
    static bindKeyAction(action) {
        window.addEventListener('keydown', e => {
            if (e.repeat)
                return; // ignore key hold
            action(e.key);
        });
    }
}
Application.rootMap = new Map();
