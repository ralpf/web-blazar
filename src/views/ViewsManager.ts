import { Assert } from "unitlib/core/Assert";
import { ButtonsRowSig } from "unitlib/inputs/ButtonsRowSig";
import { InputUnit } from "unitlib/inputs/InputUnit";
import { AnimationFX } from "../anim/AnimationFX";
import { Composite } from "unitlib/containers/Composite";
import { Switcher } from "unitlib/misc/Switcher";
import confetti from "canvas-confetti";
import { DOM } from "unitlib/static/DOM";
import { logi } from "unitlib/core/global";
import { Confetti } from "unitlib/fx/Confetti";


export class ViewsManager extends Composite {

    protected selector! : InputUnit;
    protected panels!   : Switcher;

    private   isStarAnimated = false;


    public initializeClassFields(): void {
        this.selector = this.getField<ButtonsRowSig>('viewsSelect');
        const rootPanelsEl = DOM.FindWithTag(this.root, 'mainview-panels');
        this.panels = new Switcher(rootPanelsEl);
    }

    protected initializeEvents(): void {
        this.selector.callback = this.onSelectorChangeView.bind(this);
        this.registerBlazarClick();
        this.registerStarClick();
        // select the Lamp panel (idx=1)
        this.selector.invokeOnChange(1);
    }


    private onSelectorChangeView(i: number): void {
        this.panels.activeIdx = i;
    }


    private registerBlazarClick() {
        const clickTimeWindowMs = 1000;
        const span = document.getElementById('ID-span-blazar');
        Assert.Defined(span);
        let clickCount = 0;
        let clickTimer: any = null;
        span.addEventListener('click', () => {
            clickCount++;
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
                this.panels.activeIdx = 3;   // dev hidden page
            }
        });
    }

    private registerStarClick() {
        const span = document.getElementById('ID-span-star');
        Assert.Defined(span);
        span.addEventListener('click', () => {
            Confetti.shootTwice(span);  // Particle FX
            if (this.isStarAnimated) return;
            AnimationFX.startHeader(span,() => this.isStarAnimated = true, () => this.isStarAnimated = false);
        });
    }

}