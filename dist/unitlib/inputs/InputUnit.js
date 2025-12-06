import { Unit } from "../Unit";
// abstract wrapper for all DOM input types
export class InputUnit extends Unit {
    // ex: 'click'  'input' (for live input)  'mouseup' (many other)
    constructor(root, callback) {
        super(root);
        this.eventName = "change"; // override this in derived class
        this.callback = callback;
        this.input = this.findInput(); // input element first
        this.label = this.findLabel();
        this.input.addEventListener(this.eventName, this);
    }
    setLabelText(text) {
        if (this.label)
            this.label.textContent = text;
    }
    setLabelHtml(html) {
        if (this.label)
            this.label.innerHTML = html;
    }
    // ex: .value  .valueAsNumber  .checked
    handleEvent(_) {
        this.callback(this.readInput());
    }
    dispose() {
        this.input.removeEventListener(this.eventName, this);
        super.dispose();
    }
}
