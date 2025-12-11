import { CompositeUnit } from "../../unitlib/containers/CompositeUnit";
import { Container } from "../../unitlib/containers/Container";
import { ButtonsRowSig } from "../../unitlib/inputs/ButtonsRowSig";
import { InputUnit } from "../../unitlib/inputs/InputUnit";



export class ViewsManager extends CompositeUnit {

    protected viewsSelect! : InputUnit;
    protected viewsRoot!   : Container;


    public initializeClassFields(): void {
        this.viewsSelect = this.getField<ButtonsRowSig>('viewsSelect')
        this.viewsRoot   = this.getField<Container>('viewsRoot');
    }

    protected initializeEvents(): void {
        this.viewsSelect.callback = (idx) => this.viewsRoot.activeIdx = idx;
        this.viewsSelect.onChange(1);
    }

}