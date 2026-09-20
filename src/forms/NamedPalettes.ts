import { FormUnit } from "unitlib/containers/FormUnit";
import { err } from "unitlib/core/global";
import { SyncUnit } from "unitlib/core/SyncUnit";
import { Checkbox } from "unitlib/inputs/Checkbox";
import { InputUnit } from "unitlib/inputs/InputUnit";
import { Numeral } from "unitlib/inputs/Numeral";
import { DOM } from "unitlib/static/DOM";




export class NamedPalettes extends FormUnit {

    private isRand! : Checkbox;
    private speed!  : Numeral;
    private idxSync!: SyncUnit;

    private activeIdx!   : number;
    private buttonProto! : HTMLButtonElement;
    private container!   : HTMLElement;


    protected override initializeClassFields(): void {
        this.isRand  = this.getField('rand');
        this.speed   = this.getField('spd');
        this.idxSync = this.getField('idx');
    }


    protected override initializeEvents(): void {
        this.isRand.callback = (b) => this.propagateURL(`rand=${(b ? '1': '0')}`);
        this.speed .callback = (n) => this.propagateURL(`spd=${n}`);
        this.idxSync.callback= (n) => { this.activeIdx = n; this.updateSelectionVisuals() };
        // buttons init
        this.buttonProto = DOM.Find(this.root, 'button') as HTMLButtonElement;
        this.container = this.buttonProto.parentElement!;
        this.buttonProto.remove(); // Keep the template in memory, outside the visible row.
        this.activeIdx = 0;
    }


    private onSomeButtonClicked(idx: number): void {
        this.activeIdx = idx;
        this.updateSelectionVisuals();
        this.propagateURL(`idx=${idx}`);
    }


    private updateSelectionVisuals(): void {
        Array.from(this.container.children).forEach((button, idx) => {
            const selected = idx === this.activeIdx;
            button.classList.toggle('is-selected', selected);
            // aria-pressed describes a button’s persistent on/off state. String makes a 'true' or 'false' value
            button.setAttribute('aria-pressed', String(selected)); 
        });
    }


    public externRebuildButtons(buttonNames: string[]): void {
        this.container.replaceChildren();
        buttonNames.forEach((label, idx) => this.cloneButton(label, idx));
        this.updateSelectionVisuals();
    }


    private cloneButton(label: string, idx: number): HTMLButtonElement {
        const button = this.buttonProto.cloneNode(true) as HTMLButtonElement;
        button.textContent = label;
        // all buttons are like 1 input. Invoke ours cb, so subscribers can react
        button.addEventListener('click', () => this.onSomeButtonClicked(idx));
        this.container.appendChild(button);
        return button;
    }


    protected setInputVisualTo(value: any): void {
        if (typeof value !== 'number') err(`unexpected type '${typeof value}' (${value})`);
        this.activeIdx = value;
        this.updateSelectionVisuals();
    }

}
