/** Most base class for all classes in unitlib framework */
export class Unit {
    constructor(root) {
        this.root = root;
        Unit.refMap.set(root, this);
    }
    get isVisible() { return this.root.style.display !== 'none'; }
    set isVisible(v) { this.root.style.display = v ? '' : 'none'; }
    show() {
        this.isVisible = true;
    }
    hide() {
        this.isVisible = false;
    }
    dispose() {
        Unit.refMap.delete(this.root);
    }
    /**
    * Finds first descendant element inside the given root element.
    ** Throws if nothing is found.
    ** Selector is standard js querrySelector()
    */
    static Find(root, selector) {
        if (!selector)
            throw new Error('selector argument should be a non-empty string');
        if (!root)
            throw new Error('root argument was null');
        const x = root.querySelector(selector);
        if (!x)
            throw new Error(`root element has no child with selector '${selector}'\nroot path:'${Unit.ElementDomPath(root)}'`);
        return x;
    }
    /**
     * Finds all descendant elements inside the given root element.
     ** Throws if nothing is found.
     ** Selector is standard js querrySelector()
     */
    static FindAll(root, selector) {
        if (!selector)
            throw new Error('selector argument should be a non-empty string');
        if (!root)
            throw new Error('root argument was null');
        const all = root.querySelectorAll(selector);
        if (!all || all.length === 0)
            throw new Error(`root element has no children with selector '${selector}'\nroot path:'${Unit.ElementDomPath(root)}'`);
        return Array.from(all);
    }
    /**
     * Find instance of T derived from Unit, that is 'attached' to the element
     ** Throws if not found
     ** Ex: Unit.FindUnit(el, Dropdown): Drowpdown
     */
    static FindUnit(root, ctor) {
        if (!root)
            throw new Error('root argument was null');
        const selector = `[data-component="${ctor.name}"]`;
        const el = root.querySelector(selector);
        if (!el)
            throw new Error(`not found: Unit '${ctor.name}' in hierarchy of ID: '${root.id}'`);
        // lookup map
        const unit = this.refMap.get(el);
        if (!unit) {
            throw new Error(`not found: Unit '${ctor.name}' (key) on HTMLElement with ID: '${el.id}'`);
        }
        // ensure the instance is of expected type
        if (!(unit instanceof ctor)) {
            throw new Error(`unit found, but it's not T '${ctor.name}' on HTMLElement with ID: '${el.id}'`);
        }
        return unit;
    }
    /**
     * Prints a DOM hierarchy path to the element. Also ID, if available
     ** Ex: div/div/div/select [someId]
     */
    static ElementDomPath(el) {
        const names = [];
        let curr = el;
        while (curr) {
            names.push(curr.tagName.toLocaleLowerCase());
            curr = curr.parentElement;
        }
        const id = el.id ? ` [${el.id}]` : '';
        return names.reverse().join('/') + id;
    }
}
//...........................................................................STATIC
Unit.refMap = new Map(); // <~~~ important
