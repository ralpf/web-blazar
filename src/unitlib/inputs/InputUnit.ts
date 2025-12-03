import { Action } from "../Action";
import { Unit }   from "../Unit";


// abstract wrapper for all DOM input types
export abstract class InputUnit extends Unit {

    private callback: Action;
    protected label: HTMLLabelElement | null;
    protected input: HTMLElement;
    protected eventName: string = "change";     // override this in derived class
                                                // ex: 'click'  'input' (for live input)  'mouseup' (many other)


    constructor(root: HTMLElement, callback: Action) {
        super(root);
        this.callback = callback;
        this.input = this.findInput();   // input element first
        this.label = this.findLabel();
        this.input.addEventListener(this.eventName, () => this.callback(this.readInput()));
    }
    
    setLabelText(text: string): void {
        if (this.label) this.label.textContent = text;
    }
    
    setLabelHtml(html: string): void {
        if (this.label) this.label.innerHTML = html;
    }
    
    protected abstract findInput(): HTMLElement;
    protected abstract findLabel(): HTMLLabelElement | null;
    protected abstract readInput(): any;    // inputs read from different data fields
                                            // ex: .value  .valueAsNumber  .checked

}