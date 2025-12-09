import { log } from "../global";
import { Unit } from "../Unit";
import { Container } from "../containers/Container";
import { ButtonsRow } from "../inputs/ButtonsRow";
import { Application } from "../Application";
import { CompositeUnit } from "./CompositeUnit";



export class ViewsManager extends CompositeUnit {

    protected viewsSelect!: ButtonsRow;
    protected viewsRoot!: Container;


    public finalizeClassFields(): void {
        this.viewsSelect = this.getField<ButtonsRow>('viewsSelect')
        this.viewsRoot   = this.getField<Container>('viewsRoot');
    }

}