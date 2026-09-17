import { Assert } from "unitlib/core/Assert";
import { ButtonsRowSig } from "unitlib/inputs/ButtonsRowSig";
import { InputUnit } from "unitlib/inputs/InputUnit";
import { AnimationFX } from "../anim/AnimationFX";
import { Composite } from "unitlib/containers/Composite";
import { Switcher } from "unitlib/misc/Switcher";
import confetti from "canvas-confetti";
import { DOM } from "unitlib/static/DOM";


export class ViewsManager extends Composite {

    protected selector! : InputUnit;
    protected panels!   : Switcher;

    private   isStarAnimated = false;


    public initializeClassFields(): void {
        this.selector = this.getField<ButtonsRowSig>('viewsSelect')
        const rootPanelsEl = DOM.FindWithTag(this.root, 'mainview-panels');
        this.panels = new Switcher(rootPanelsEl, 1);
    }

    protected initializeEvents(): void {
        this.selector.callback = (idx) => this.panels.activeIdx = idx;
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
            this.shootParticles(span);  // Particle FX
            if (this.isStarAnimated) return;
            AnimationFX.startHeader(span,() => this.isStarAnimated = true, () => this.isStarAnimated = false);
        });
    }

    private shootParticles(element: HTMLElement) {
        // move this method to some other place, later
        const rect = element.getBoundingClientRect();

        confetti({
            particleCount: 30,
            spread: 360,
            startVelocity: 15,
            origin: {
                x: (rect.left + rect.width / 2) / window.innerWidth,
                y: (rect.top + rect.height / 2) / window.innerHeight
            },
        });
        
        setTimeout(() => {
            confetti({
                particleCount: 160,
                spread: 70,
                startVelocity: 25,
                origin: {
                    x: (rect.left + rect.width / 2) / window.innerWidth,
                    y: (rect.top + rect.height / 2) / window.innerHeight
                },
                angle: 240, // Down and right.
            });
        }, 150); // Delay in milliseconds.
    }

}