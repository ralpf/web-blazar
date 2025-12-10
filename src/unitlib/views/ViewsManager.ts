import { log } from "../global";
import { Unit } from "../Unit";
import { Container } from "../containers/Container";
import { ButtonsRow } from "../inputs/ButtonsRow";
import { Application } from "../Application";
import { CompositeUnit } from "./CompositeUnit";
import { ButtonsRowSig } from "../inputs/ButtonsRowSig";
import { InputUnit } from "../inputs/InputUnit";



export class ViewsManager extends CompositeUnit {

    protected viewsSelect! : InputUnit;
    protected viewsRoot!   : Container;


    public finalizeClassFields(): void {
        this.viewsSelect = this.getField<ButtonsRowSig>('viewsSelect')
        this.viewsRoot   = this.getField<Container>('viewsRoot');
    }

}