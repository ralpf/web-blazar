import { FormUnit } from "unitlib/containers/FormUnit";
import { Application } from "unitlib/static/Application";
import { ColorItem } from "../inputs/ColorItem";


export class ColorArray extends FormUnit {

    private prototype!: ColorItem;
    private container!: HTMLElement;
    private all       : ColorItem[] = [];

    private get count(): number { return this.all.length; }


    protected initializeClassFields(): void {
        this.prototype = this.getField('prototype');
        this.container = this.prototype.root.parentElement!;
        this.prototype.root.remove(); // remove from dom, but will keep the subtree alive
        this.cloneTemplate(0); // hide the x button
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
        item.callback  = (c: string) => this.propagateURL(`color=${c}`);
        // insert into the array and fix the 'delete' button
        this.all.splice(idx + 1, 0, item);
        this.all[0].setDeleteButtonVisible(this.count > 1);
        // assign random color
        item.setRandomColor();
    }
    
    private onAddItemClicked(item: ColorItem) {
        let i = 0;
        for (; i < this.count; ++i)
            if (this.container.children[i] === item.root) break;
        this.cloneTemplate(i);
    }

    private onDelItemClicked(item: ColorItem) {
        Application.removeUnit(item);
        this.all = this.all.filter(x => x !== item);
        if (this.count === 1) this.all[0].setDeleteButtonVisible(false);
    }

}