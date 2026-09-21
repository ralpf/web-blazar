import { FormUnit } from "unitlib/containers/FormUnit";
import { Numeral } from "unitlib/inputs/Numeral";
import { DOM } from "unitlib/static/DOM";



export class CometFX extends FormUnit {

    private speedUnit!      : Numeral;
    private button_piu! : HTMLButtonElement;
    private button_piU! : HTMLButtonElement;
    private button_Piu! : HTMLButtonElement;
    private button_PIU! : HTMLButtonElement;

    private speed! : number;


    protected initializeClassFields(): void {
        this.speed = 160;
        this.speedUnit      = this.getField('speed');
        this.button_piu = DOM.FindWithTag(this.root, 'piu') as HTMLButtonElement;
        this.button_piU = DOM.FindWithTag(this.root, 'piU') as HTMLButtonElement;
        this.button_Piu = DOM.FindWithTag(this.root, 'Piu') as HTMLButtonElement;
        this.button_PIU = DOM.FindWithTag(this.root, 'PIU') as HTMLButtonElement;
    }
    
    
    protected initializeEvents(): void {
        this.speedUnit.showValue(this.speed);
        this.speedUnit.callback = (n) => this.speed = n;
        this.button_piu.addEventListener('click', () => this.propagateURL(`spd=${this.speed}`));
    }
}