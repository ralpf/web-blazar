import { Assert } from "unitlib/core/Assert";
import { Unit } from "unitlib/core/Unit";
import { Coroutine } from "unitlib/static/Coroutine";


export class AnimationFX {

    //..........................................................................PUBLIC-STARTUP-FUNCS

    public static sliderLuma(u: Unit, delay: number) {
        Coroutine.start( this.cr_labelStuff(u, delay) );
    }

    public static startHeader(el: HTMLElement, onStart: () => void, onFinish: () => void) {
        // note: for the <span> text to be 'transformable' it has to not be inlined
        // the css for the animated element should declare 'display: inline-block;'
        Coroutine.start( this.cr_animateHeaderStar(el, onStart, onFinish) );
    }

    //.............................................................................HIDDEN-COROUTINES

    private static *cr_labelStuff(u: Unit, delay: number) {
        Assert.Defined(u);
        const label = Unit.Find(u.root, `label`);
        if (label.textContent.length === 0) return;
        const orig = label.textContent.toLowerCase();
        let i = 0;
        while (true) {
            const arr = orig.split('');
            const k = i++ % orig.length;
            arr[k] = arr[k].toUpperCase();
            label.textContent = arr.join('');
            yield Coroutine.waitSeconds(delay);
        }
    }

    private static *cr_animateHeaderStar(el: HTMLElement, onStart: () => void, onFinish: () => void) {
        onStart();

        const base = el.style.transform;
        let t = 0;
        let ampl = 18;
        const decay = 0.97;
        const dt = 0.15;

        try {
            while (ampl > 0.5) {
                // chaotic-ish ellipse
                const x = Math.sin(t * 1.7) * ampl;
                const y = Math.cos(t * 1.3 + Math.sin(t)) * ampl * 0.6;
                const r = Math.sin(t * 2.1) * 6;   // small rotation
                el.style.transform = `${base} translate(${x}px, ${y}px) rotate(${r}deg)`;
                ampl *= decay;
                t += dt;
                yield 0;
            }
        }
        finally {
            el.style.transform = base;
            onFinish();
        }
    }
}