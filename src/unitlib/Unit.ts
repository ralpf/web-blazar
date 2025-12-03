
// all wrappers around DOM elements derive from this
export abstract class Unit {

    protected root : HTMLElement;

    constructor(root: HTMLElement) {
        this.root = root;
    }

    get isVisible() : boolean { return this.root.style.display !== 'none'; }
    set isVisible(v: boolean) { this.root.style.display = v ? '' : 'none'; }

    show(): void {
        this.isVisible = true;
    }

    hide(): void {
        this.isVisible = false;
    }

    //..........................................................STATIC

    static Find(root: HTMLElement, selector: string): HTMLElement {
        if (!selector) throw new Error('selector argument should be a non-empty string');
        if (!root) throw new Error('root argument was null');
        const x = root.querySelector(selector);
        if (!x) throw new Error(`root element has no child with selector '${selector}'\nroot path:'${Unit.ElementDomPath(root)}'`);
        return x as HTMLElement;
    }

    static ElementDomPath(el: HTMLElement): string {
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