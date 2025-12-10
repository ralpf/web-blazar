import { Unit } from "../Unit";
import { Assert } from "../Assert";


/** A container for content, to show one children at a time */
export class Container extends Unit {

    private all: Unit[] = [];
    private idx: number;

    get count(): number     { return this.all.length; }
    get activeUnit(): Unit  { return this.all[this.idx]; }

    get activeIdx(): number { return this.idx; }
    set activeIdx(i:number) { this.activateIdx(i); }


    constructor(root: HTMLElement) {
        super(root);
        //let contentRoot = Unit.FindIn(this.root, '[data-tag="container"]');

        for (const x of this.root.children)
            this.all.push(new Unit(x));

        this.idx = this.all.findIndex(x => x.isVisible);
        if (this.idx < 0) this.idx = 0;

        this.all.forEach(x => x.hide());
        this.activeUnit.show();
    }

    private activateIdx(i: number) {
        Assert.Index(this.all, i);
        this.activeUnit.hide();
        this.idx = i;
        this.activeUnit.show();
    }

}

// TODO: add next() , preve()