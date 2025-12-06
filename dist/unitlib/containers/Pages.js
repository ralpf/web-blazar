import { Unit } from "../Unit.js";
import { Assert } from "../Assert.js";
/** A container for content, to show one children at a time */
export class Pages extends Unit {
    get count() { return this.all.length; }
    get activeUnit() { return this.all[this.idx]; }
    get activeIdx() { return this.idx; }
    set activeIdx(i) { this.activateIdx(i); }
    constructor(root) {
        super(root);
        this.all = [];
        //let contentRoot = Unit.FindIn(this.root, '[data-tag="container"]');
        for (const x of this.root.children)
            this.all.push(new Unit(x));
        this.idx = this.all.findIndex(x => x.isVisible);
        if (this.idx < 0)
            this.idx = 0;
        this.all.forEach(x => x.hide());
        this.activeUnit.show();
    }
    activateIdx(i) {
        Assert.Index(this.all, i);
        this.activeUnit.hide();
        this.idx = i;
        this.activeUnit.show();
    }
}
// TODO: add next() , preve()
