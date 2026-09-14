import { Assert } from "./Assert";
import { DOM } from "../static/DOM";
import { RequestDispatcher } from "../static/RequestDispatcher";


// DONT convert this class to err() or log() or Assert.*
/** Most base class for all classes in unitlib framework */
export class Unit {

    private _root   : HTMLElement;          // the carrier dom element for this class
    private _parU!  : Unit;                 // the Unit that created this instance
    private _parFN? : string;               // if this unit is a field of CompositeUnit, it's field name is cached here

    // GET
    public get root()       : HTMLElement { return this._root; }
    public get parentUnit() : Unit        { return this._parU; }
    public get domPath()    : string      { return DOM.elementDomPath(this._root); }
    public get typeName()   : string      { return this.constructor.name; }


    constructor(root: Element) {
        this._root = root as HTMLElement;
    }

    get isVisible() : boolean { return getComputedStyle(this._root).display !== 'none'; }
    set isVisible(v: boolean) { this._root.style.display = v ? 'flex' : 'none'; }

    public show(): void {
        this.isVisible = true;
    }

    public hide(): void {
        this.isVisible = false;
    }

    //................................................................................INFRASTRUCTURE

    // used for Units constructed from DOM traversal
    public reportsTo(parent: Unit) {
        Assert.Defined(parent);
        this._parU  = parent;
    }

    // this and next are not very preety. Maybe to put it under an interface of hierarchable objects
    public setItsParentFieldName(fieldName: string) {
        Assert.Defined(fieldName);
        this._parFN = fieldName;
    }

    public getItsParentFieldName(): string {
        if (this._parFN) return this._parFN;
        else return '';
    }

    // a part of chain for URL creation
    public propagateURL(url: string) {
        Assert.Defined(this._parFN, `parent's field name was not set for ${this.domPath}`);    // should have a field name set
        const moreUrl = `${this._parFN}/${url}`;
        if (this.parentUnit) this.parentUnit.propagateURL(moreUrl);
        else RequestDispatcher.process(moreUrl);
    }

    public dispose() {
        this.root.remove();
        this._parU = null as any;
    }

}