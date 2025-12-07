import { log } from "./unitlib/log.js";
import { Unit } from "./unitlib/Unit.js";
import { Pages } from "./unitlib/containers/Pages.js";
import { ButtonsRow } from "./unitlib/inputs/ButtonsRow.js";
export class MainPager extends Unit {
    constructor(root) {
        super(root);
        // resolve pages        
        const pagesRoot = Unit.FindInnerUnit(this.root, Pages);
        this.pages = new Pages(pagesRoot);
        // then buttons and link them
        const buttonsRoot = Unit.FindInnerUnit(this.root, ButtonsRow);
        this.controlButtons = new ButtonsRow(buttonsRoot, (value) => this.pages.activeIdx = value);
        log("OK MainPager online");
    }
}
