import { FormUnit } from "unitlib/containers/FormUnit";
import { Application } from "unitlib/static/Application";
import { ColorItem } from "../inputs/ColorItem";


export class ColorArray extends FormUnit {

    private prototype!: ColorItem;
    private container!: HTMLElement;
    private all       : ColorItem[] = [];
    private limit     : number = 16;

    private get count(): number { return this.all.length; }


    protected initializeClassFields(): void {
        // fields are attached by dom objects. Assign class members here
        this.prototype = this.getField('prototype');
        this.container = this.prototype.root.parentElement!;
        this.prototype.root.remove(); // remove from dom, but will keep the subtree alive
        this.cloneTemplate(0);
        this.checkAuxButtonsVisibility();
    }

    protected initializeEvents(): void {
        // events are attached when items are added
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