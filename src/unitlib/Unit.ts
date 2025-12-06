import { UnitCTOR } from "./aliases.js";


/** Most base class for all classes in unitlib framework */
export class Unit {

    private _root : HTMLElement;

    public get root() : HTMLElement { return this._root; }

    constructor(root: HTMLElement) {
        this._root = root;
        //Unit.refMap.set(root, this);
    }

    get isVisible() : boolean { return getComputedStyle(this._root).display !== 'none'; }
    set isVisible(v: boolean) { this._root.style.display = v ? 'flex' : 'none'; }

    show(): void {
        this.isVisible = true;
    }

    hide(): void {
        this.isVisible = false;
    }

    //...........................................................................STATIC

    //private static refMap = new Map<HTMLElement, Unit>();    // <~~~ important

     /**
     * Finds first descendant element inside the given root element.
     ** Throws if nothing is found.
     ** Selector is standard js querrySelector()
     */
    static Find(root: HTMLElement, selector: string): HTMLElement {
        if (!selector) throw new Error('selector argument should be a non-empty string');
        if (!root) throw new Error('root argument was null');
        const x = root.querySelector(selector);
        if (!x) throw new Error(`root element has no child with selector '${selector}'\nroot path:'${Unit.elementDomPath(root)}'`);
        return x as HTMLElement;
    }

    /**
     * Finds all descendant elements inside the given root element.
     ** Throws if nothing is found.
     ** Selector is standard js querrySelector()
     */
    static FindAll(root: HTMLElement, selector: string): HTMLElement[] {
        if (!selector) throw new Error('selector argument should be a non-empty string');
        if (!root) throw new Error('root argument was null');
        const all = root.querySelectorAll(selector);
        if (!all || all.length === 0) throw new Error(`root element has no children with selector '${selector}'\nroot path:'${Unit.elementDomPath(root)}'`);
        return Array.from(all) as HTMLElement[];
    }

    static FindInnerUnit(root: HTMLElement, ctor: UnitCTOR): HTMLElement {
        const el = root.querySelector(`[data-type="${ctor.name}"]`);
        if (!el) throw new Error(`no inner ${ctor.name} : Unit found in ${Unit.elementDomPath(root)}`);
        return el as HTMLElement;
    }
    
    // /**
    //  * Find instance of T derived from Unit, that is 'attached' to the element
    //  ** Throws if not found
    //  ** Ex: Unit.FindUnit(el, Dropdown): Drowpdown
    //  */
    // static FindUnit<T extends Unit>(root: HTMLElement, ctor: UnitCTOR): T {
    //     if (!root) throw new Error('root argument was null');
    //     const selector = `[data-component="${ctor.name}"]`;
    //     const el = root.querySelector(selector) as HTMLElement | null;
    //     if (!el) throw new Error(`not found: Unit '${ctor.name}' in hierarchy of ID: '${root.id}'`);
    //     // lookup map
    //     const unit = this.refMap.get(el);
    //     if (!unit) {
    //         throw new Error(`not found: Unit '${ctor.name}' (key) on HTMLElement with ID: '${el.id}'`);
    //     }
    //     // ensure the instance is of expected type
    //     if (!(unit instanceof ctor)) {
    //         throw new Error(`unit found, but it's not T '${ctor.name}' on HTMLElement with ID: '${el.id}'`);
    //     }
    //     return unit as T;
    // }

    /**
     * Prints a DOM hierarchy path to the element. Also ID, if available
     ** Ex: div/div/div/select [someId]
     */
    static elementDomPath(el: HTMLElement): string {
        const names = [];
        let curr: HTMLElement | null = el;
        while (curr) {
            names.push(curr.tagName.toLocaleLowerCase());
            curr = curr.parentElement;
        }
        const id = el.id ? ` [${el.id}]` : '';
        return names.reverse().join('/') + id;
    }

}