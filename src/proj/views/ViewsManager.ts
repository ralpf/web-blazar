import { CompositeUnit } from "../../unitlib/containers/CompositeUnit";
import { Container } from "../../unitlib/containers/Container";
import { ButtonsRowSig } from "../../unitlib/inputs/ButtonsRowSig";
import { InputUnit } from "../../unitlib/inputs/InputUnit";



export class ViewsManager extends CompositeUnit {

    protected viewsSelect! : InputUnit;
    protected viewsRoot!   : Container;


    public finalizeClassFields(): void {
        this.viewsSelect = this.getField<ButtonsRowSig>('viewsSelect')
        this.viewsRoot   = this.getField<Container>('viewsRoot');
    }

}