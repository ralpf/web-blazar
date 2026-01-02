import { Assert } from "../core/Assert";
import { Time } from "../core/Time";

export class Coroutine {

    private static runningSet: Set<Routine>; // there were some problems with default ctor before


    //.................................................................PUBLIC

    public static start(coroutine: Iterator<any>) {
        Assert.Defined(coroutine);
        const isFirstCall = this.runningSet == null;
        if (isFirstCall) this.runningSet = new Set<Routine>();
        this.runningSet.add(new Routine(coroutine));
        if (isFirstCall) this.update();
    }



    public static waitSeconds(s: number): WaitToken {
        const doneTime = performance.now() + s * 1000;
        return new WaitToken(
            () => performance.now() >= doneTime
        );
    }

    public static waitCondition(fn: () => boolean): WaitToken {
        return new WaitToken(fn);
    }

    public static waitFrames(count: number): WaitToken {
        let k = count;
        return new WaitToken(
            () => --k <= 0
        );
    }

    //................................................................PRIVATE

    private static update = () => {     // important for 'this' capture | methods will auto-schedule itself
        // keep time updated
        Time.update();
        if (!this.runningSet || this.runningSet.size === 0) {
            requestAnimationFrame(this.update);     // just reschedule the update
            return;
        }
        // run all
        const finished: Routine[] = [];
        for (const routine of this.runningSet) {
            if (routine.token != null) {
                if (routine.token.isDone) {
                    routine.token = undefined;
                } else continue;    // still waiting, skip to next cr
            }
            // no wait token, progress cr
            const crYield = routine.gen.next();
            // check if returns unity-like yield instructions
            if (crYield.value instanceof WaitToken) {
                if (crYield.value.isDone === false) {
                    routine.token = crYield.value;
                    continue;   // skip to next coroutine
                } // else the wait token is already done, so ignore it
            } 
            // finally check if cr did run to completion
            if (crYield.done) finished.push(routine);
        }
        // remove done
        finished.forEach(x => this.runningSet.delete(x));
        // re-schedule update()
        requestAnimationFrame(this.update);
    }
}

//...................................................................TYPE

export class WaitToken {

    private readonly _pred: () => boolean;

    public get isDone() { return this._pred(); }

    constructor(predicat: () => boolean) {
        this._pred = predicat;
    }

}

//...................................................................TYPE

class Routine {

    public readonly gen: Iterator<any>;
    public token?: WaitToken;

    constructor(gen: Iterator<any>) {
        this.gen = gen;
    }

}