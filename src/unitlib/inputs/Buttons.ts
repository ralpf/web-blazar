import { InputUnit } from "./InputUnit";

export class Buttons extends InputUnit {

    protected findInput(): HTMLElement {
        throw new Error("Method not implemented.");
    }
    protected findLabel(): HTMLLabelElement | null {
        return null;
    }
    protected readInput() {
        throw new Error("Method not implemented.");
    }

}