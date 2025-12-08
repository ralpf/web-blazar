import { log } from "../../unitlib/global";
import { Unit } from "../../unitlib/Unit";
import { Pages } from "../../unitlib/containers/Pages";
import { ButtonsRow } from "../../unitlib/inputs/ButtonsRow";
import { Application } from "../../unitlib/Application";



export class MainPager extends Unit {

    private controlButtons: ButtonsRow;
    private pages: Pages;

    constructor(root: HTMLElement) {
        super(root);
        // resolve pages
        const pagesRoot = Unit.FindInnerUnit(this.root, Pages);
        this.pages = new Pages(pagesRoot);
        // then buttons and link them
        const buttonsRoot = Unit.FindInnerUnit(this.root, ButtonsRow);
        this.controlButtons = new ButtonsRow(buttonsRoot, (value) => this.pages.activeIdx = value);
    }

}