import { Assert } from "../core/Assert";

export class DOM {

    /**
     * Finds first descendant element inside the given root element.
     ** Throws if nothing is found.
     ** Selector is standard js querrySelector()
     */
    static Find(root: HTMLElement, selector: string): HTMLElement {
        if (!selector) throw new Error('selector argument should be a non-empty string');
        if (!root) throw new Error('root argument was null');
        const x = root.querySelector(selector);
        if (!x) throw new Error(`root element has no child with selector '${selector}'\nroot path:'${DOM.elementDomPath(root)}'`);
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
        if (!all || all.length === 0) throw new Error(`root element has no children with selector '${selector}'\nroot path:'${DOM.elementDomPath(root)}'`);
        return Array.from(all) as HTMLElement[];
    }


    static FindWithTag(root: HTMLElement, tag: string): HTMLElement {
        if (!tag) throw new Error(`tag can't be empty`);
        if (!root) throw new Error(`root dom element can't be null`);
        const x = root.querySelector(`[data-tag="${tag}"]`);
        if (!x) throw new Error(`not found in DOM: child with tag '${tag}' in parent ${DOM.elementDomPath(root)}`);
        return x as HTMLElement;
    }


    // static FindInnerUnit(root: HTMLElement, ctor: UnitCTOR): HTMLElement {
    //     const el = root.querySelector(`[data-type="${ctor.name}"]`);
    //     if (!el) throw new Error(`no inner ${ctor.name} : Unit found in ${Unit.elementDomPath(root)}`);
    //     return el as HTMLElement;
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