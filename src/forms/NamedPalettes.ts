import { err } from "unitlib/core/global";
import { InputUnit } from "unitlib/inputs/InputUnit";
import { DOM } from "unitlib/static/DOM";




export class NamedPalettes extends InputUnit {

    private buttonProto! : HTMLButtonElement;
    private container! : HTMLElement;
    private activeIdx! : number;


    protected prepareInnerElements(): void {
        this.buttonProto = DOM.Find(this.root, 'button') as HTMLButtonElement;
        this.container = this.buttonProto.parentElement!;
        this.buttonProto.remove(); // Keep the template in memory, outside the visible row.
        this.activeIdx = 0;
    }


    private cloneButton(label: string, idx: number): HTMLButtonElement {
        const button = this.buttonProto.cloneNode(true) as HTMLButtonElement;
        button.textContent = label;
        // all buttons are like 1 input. Invoke ours cb, so subscribers can react
        button.addEventListener('click', () => this.onSomeButtonClicked(idx));
        this.container.appendChild(button);
        return button;
    }


    // protected setInputVisualTo(value: string[]): void {
    //     this.container.replaceChildren();
    //     value.forEach((label, idx) => this.cloneButton(label, idx));
    //     this.updateSelection();
    // }
    protected setInputVisualTo(value: any): void {
        if (typeof value !== 'number') err(`unexpected type '${typeof value}' (${value})`);
        this.activeIdx = value;
        this.updateSelection();
    }


    private onSomeButtonClicked(idx: number): void {
        this.activeIdx = idx;
        this.invokeCallback(idx);
        this.updateSelection();
    }


    private updateSelection(): void {
        Array.from(this.container.children).forEach((button, idx) => {
            const selected = idx === this.activeIdx;
            button.classList.toggle('is-selected', selected);
            // aria-pressed describes a button’s persistent on/off state. String makes a 'true' or 'false' value
            button.setAttribute('aria-pressed', String(selected));
    });
}

}
