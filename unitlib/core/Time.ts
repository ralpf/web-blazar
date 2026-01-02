

export class Time {

    private static _msPrev = performance.now();

    public static dt = 0;
    public static now = 0;

    static update() {
        const msNow = performance.now();
        this.dt = msNow - this._msPrev / 1000;
        this.now = msNow / 1000;
        this._msPrev = msNow;
    }

}

// NOTE: this will be updated by coroutine infrastructure