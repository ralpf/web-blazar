import { Assert } from "./Assert";
import { Time } from "./Time";

export class Coroutine {

    private static runningSet: Set<Iterator<any>>;



    public static start(coroutine: Iterator<any>) {
        Assert.Defined(coroutine);
        const isFirstCall = !this.runningSet ? true : false;
        if (isFirstCall) this.runningSet = new Set<Iterator<any>>();

        this.runningSet.add(coroutine);
        if (isFirstCall) this.update();
    }

    private static update = () => {     // important for this capture
        // keep time updated
        Time.update();
        if (!this.runningSet || this.runningSet.size === 0) {
            requestAnimationFrame(this.update);
            return;
        }
        // run all
        const finished: Iterator<any>[] = [];
        for (const cr of this.runningSet) {
            const res = cr.next();
            if (res.done) finished.push(cr);
        }
        // remove done
        finished.forEach(x => this.runningSet.delete(x));
        // re-schedule
        requestAnimationFrame(this.update);
    }

}


//export const CR = new CoroutineMan();
// startup the infrastructure
//CR.update();