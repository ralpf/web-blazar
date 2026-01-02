import { Assert } from "unitlib/core/Assert";
import { Unit } from "unitlib/core/Unit";
import { Coroutine } from "unitlib/static/Coroutine";


export class AnimationFX {
    public static sliderLuma(u: Unit, delay: number) {
        Coroutine.start( this.cr_labelStuff(u, delay) );
    }

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
}