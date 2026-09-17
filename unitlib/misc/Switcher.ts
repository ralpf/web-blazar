import { Assert } from "../core/Assert";
import { DOM } from "../static/DOM";


/** A simple panel switcher. Pass a root - all it's children are considered panels. Not an Unit! */
export class Switcher {

    private all: HTMLElement[] = [];
    private idx: number;

    get count(): number     { return this.all.length; }
    get active(): HTMLElement  { return this.all[this.idx]; }

    get activeIdx(): number { return this.idx; }
    set activeIdx(i:number) { this.activateIdx(i); }


    constructor(root: HTMLElement, defaultIdx = 0) {
        Assert.Defined(root);
        Assert.True(root.childElementCount > 0, `the parent element should have children`);
        for (const x of root.children)
            this.all.push(x as HTMLElement);

        this.hideAll();
        this.idx = defaultIdx;
        this.show(this.active);
    }

    private activateIdx(i: number) {
        Assert.Index(this.all, i);
        this.hideAll();
        this.idx = i;
        this.show(this.active);
    }

    private show(el: HTMLElement): void { DOM.setIsVisible(el, true);  }
    private hide(el: HTMLElement): void { DOM.setIsVisible(el, false); }
    private hideAll(): void { for (const x of this.all) this.hide(x);   }

}