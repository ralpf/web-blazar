import { Unit } from "../Unit.js";
export class InputUnit extends Unit {
    constructor(root, callback) {
        super(root);
        this.callback = callback;
    }
    onInputEvent(value) {
        this.callback(value);
    }
}
// NOTE: maybe implement dispose() and clear listners from imputs too
// // abstract wrapper for all DOM input types
// export abstract class InputUnit extends Unit implements EventListenerObject {
//     private callback: Action;
//     protected label: HTMLLabelElement | null;
//     protected input: HTMLElement;
//     protected eventName: string = "change"; // override this in derived class
//                                             // ex: 'click'  'input' (for live input)  'mouseup' (many other)
//     constructor(root: HTMLElement, callback: Action) {
//         super(root);
//         this.callback = callback;
//         this.input = this.findInput();      // input element first
//         this.label = this.findLabel();
//         this.input.addEventListener(this.eventName, this);
//     }
//     setLabelText(text: string): void {
//         if (this.label) this.label.textContent = text;
//     }
//     setLabelHtml(html: string): void {
//         if (this.label) this.label.innerHTML = html;
//     }
//     protected abstract findInput(): HTMLElement;
//     protected abstract findLabel(): HTMLLabelElement | null;
//     protected abstract readInput(): any;    // inputs read from different data fields
//                                             // ex: .value  .valueAsNumber  .checked
//     handleEvent(_: Event): void {           // interface EventListenerObject
//         this.callback(this.readInput());
//     }
//     dispose(): void {                       // destructor
//         this.input.removeEventListener(this.eventName, this);
//         super.dispose();
//     }
// }
