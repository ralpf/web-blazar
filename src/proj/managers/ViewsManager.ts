import { log } from "../../unitlib/global";
import { Unit } from "../../unitlib/Unit";
import { Container } from "../../unitlib/containers/Container";
import { ButtonsRow } from "../../unitlib/inputs/ButtonsRow";
import { Application } from "../../unitlib/Application";
import { CompositeUnit } from "../../unitlib/views/CompositeUnit";



export class ViewsManager extends CompositeUnit {

    protected viewsSelect!: ButtonsRow;
    protected viewsRoot!: Container;


    public finalizeClassFields(): void {
        this.viewsSelect = this.getField<ButtonsRow>('viewsSelect')
        this.viewsRoot   = this.getField<Container>('viewsRoot');
    }

}