import { CompositeUnit } from "unitlib/containers/CompositeUnit";
import { Container } from "unitlib/containers/Container";
import { Assert } from "unitlib/core/Assert";
import { Unit } from "unitlib/core/Unit";
import { ButtonsRowSig } from "unitlib/inputs/ButtonsRowSig";
import { InputUnit } from "unitlib/inputs/InputUnit";
import { Coroutine } from "unitlib/static/Coroutine";
import { AnimationFX } from "../anim/AnimationFX";


export class ViewsManager extends CompositeUnit {

    protected viewsSelect! : InputUnit;
    protected viewsRoot!   : Container;

    private   isStarAnimated = false;


    public initializeClassFields(): void {
        this.viewsSelect = this.getField<ButtonsRowSig>('viewsSelect')
        this.viewsRoot   = this.getField<Container>('viewsRoot');
    }

    protected initializeEvents(): void {
        this.viewsSelect.callback = (idx) => this.viewsRoot.activeIdx = idx;
        this.viewsSelect.invokeOnChange(1);
        this.registerBlazarClick();
        this.registerStarClick();
    }
    
    
private registerBlazarClick() {
        const clickTimeWindowMs = 1000;
        const span = document.getElementById('ID-span-blazar');
        Assert.Defined(span);
        let clickCount = 0;
        let clickTimer: any = null;
        span.addEventListener('click', () => {
            clickCount++;
            console.log(`hit word click count: ${clickCount}`);
            if (clickTimer === null) {
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                    clickTimer = null;
                }, clickTimeWindowMs);
            }
            if (clickCount === 3) {
                clearTimeout(clickTimer);
                clickTimer = null;
                clickCount = 0;
                // action on tripple click
                console.log(`hit word -> tripple click!!`);
                this.viewsRoot.activeIdx = 3;   // dev hidden page
            }
        });
    }

    private registerStarClick() {
        const span = document.getElementById('ID-span-star');
        Assert.Defined(span);
        span.addEventListener('click', () => this.animateStar(span));
    }

    private animateStar(span: HTMLElement) {
        console.log(`hit start is animated: ${this.isStarAnimated}`);
        if (this.isStarAnimated) return;

        AnimationFX.startHeader(
            span, 
            () => this.isStarAnimated = true,
            () => this.isStarAnimated = false
        );
    }


}