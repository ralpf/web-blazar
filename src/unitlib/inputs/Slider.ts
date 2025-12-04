import { Unit } from "../Unit";
import { Action } from "../Action";
import { InputUnit } from "./InputUnit";


export class Slider extends InputUnit {

    protected override input!: HTMLInputElement;
    protected override eventName = "input";      // sliders update continuously

    constructor(root: HTMLElement, callback: Action) {
        super(root, callback);
    }

    protected findInput(): HTMLElement {
        return Unit.Find(this.root, 'input[type="range"]') as HTMLInputElement;
    }

    protected findLabel(): HTMLLabelElement | null {
        return this.input.labels?.[0] ?? null;
    }

    protected readInput(): number {
        return this.input.valueAsNumber;
    }

    dispose(): void {
        super.dispose();
    }
}
