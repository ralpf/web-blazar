/** Most base class for all classes in unitlib framework */
export class Unit {
    get root() { return this._root; }
    constructor(root) {
        this._root = root;
    }
    get isVisible() { return getComputedStyle(this._root).display !== 'none'; }
    set isVisible(v) { this._root.style.display = v ? 'flex' : 'none'; }
    show() {
        this.isVisible = true;
    }
    hide() {
        this.isVisible = false;
    }
    //...........................................................................STATIC
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
            throw new Error(`root element has no child with selector '${selector}'\nroot path:'${Unit.elementDomPath(root)}'`);
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
            throw new Error(`root element has no children with selector '${selector}'\nroot path:'${Unit.elementDomPath(root)}'`);
        return Array.from(all);
    }
    static FindInnerUnit(root, ctor) {
        const el = root.querySelector(`[data-type="${ctor.name}"]`);
        if (!el)
            throw new Error(`no inner ${ctor.name} : Unit found in ${Unit.elementDomPath(root)}`);
        return el;
    }
    /**
     * Prints a DOM hierarchy path to the element. Also ID, if available
     ** Ex: div/div/div/select [someId]
     */
    static elementDomPath(el) {
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
