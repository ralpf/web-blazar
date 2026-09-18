import { FormUnit } from "unitlib/containers/FormUnit";
import { Application } from "unitlib/static/Application";
import { ColorItem } from "../inputs/ColorItem";
import { SyncUnit } from "unitlib/core/SyncUnit";


export class ColorArray extends FormUnit {

    private prototype!  : ColorItem;
    private maxSync!    : SyncUnit;
    private colorsSync! : SyncUnit;
    private container!  : HTMLElement;
    private all         : ColorItem[] = [];
    private limit       : number = 16;

    private get count(): number { return this.all.length; }


    protected initializeClassFields(): void {
        this.prototype = this.getField('prototype');
        this.maxSync   = this.getField('max');
        this.colorsSync= this.getField('cols32');
        this.container = this.prototype.root.parentElement!;
        this.prototype.root.remove(); // remove from dom, but will keep the subtree alive
    }
    
    protected initializeEvents(): void {
        this.cloneTemplate(0);
        this.checkAuxButtonsVisibility();
        this.maxSync.callback = (value) => this.limit = value;
        this.colorsSync.callback = (value) => this.syncColorArray(value);
    }

    private cloneTemplate(idx: number) {
        const item = Application.cloneUnit(this.prototype, this, this.container);
        const sibling = this.container.children[idx + 1] ?? null;
        this.container.insertBefore(item.root, sibling);
        // attach events. Fix wrong 'this' ref
        item.onAddItem = this.onAddItemClicked.bind(this);
        item.onDelItem = this.onDelItemClicked.bind(this);
        item.callback  = this.onAnythingChanged.bind(this);
        // insert into the array
        this.all.splice(idx + 1, 0, item);
        // style
        item.setRandomColor();
    }

    private syncColorArray(arr: number[]) {
        this.all.forEach(x => Application.removeUnit(x));
        this.all = [];
        arr.slice(0, this.limit).forEach((color, i) => {
            this.cloneTemplate(this.count - 1);
            this.all[i].setColor('#' + color.toString(16).padStart(6, '0'));
        });
        this.checkAuxButtonsVisibility();
    }
    
    //..........................................................................................UTIL

    private checkAuxButtonsVisibility() {
        const canDelete = this.count > 1;
        const canAdd = this.count < this.limit;
        this.all.forEach(x => {
            x.setDelButtonVisible(canDelete);
            x.setAddButtonVisible(canAdd);
        });
    }

    //......................................................................................HANDLER

    private onAddItemClicked(item: ColorItem) {
        let i = 0;
        for (; i < this.count; ++i)
            if (this.container.children[i] === item.root) break;
        this.cloneTemplate(i);
        this.checkAuxButtonsVisibility();
        this.onAnythingChanged();
    }

    private onDelItemClicked(item: ColorItem) {
        Application.removeUnit(item);
        this.all = this.all.filter(x => x !== item);
        this.checkAuxButtonsVisibility();
        this.onAnythingChanged();
    }

    private onAnythingChanged() {
        const combined = this.all.map(x => `col=${x.getColorString()}`).join('&');
        const urlQuerry = combined.replace(/#/g, '');
        this.propagateURL(urlQuerry);
    }

}
