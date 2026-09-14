import { CompositeUnit } from "unitlib/containers/CompositeUnit";
import { Container } from "unitlib/containers/Container";
import { Assert } from "unitlib/core/Assert";
import { ButtonsRowSig } from "unitlib/inputs/ButtonsRowSig";
import { InputUnit } from "unitlib/inputs/InputUnit";
import { AnimationFX } from "../anim/AnimationFX";

import confetti from "canvas-confetti";


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
                this.viewsRoot.activeIdx = 3;   // dev hidden page
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
            angle: 0, // Down and right.
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