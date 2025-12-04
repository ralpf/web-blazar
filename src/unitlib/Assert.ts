export class Assert {

    static True(condition: boolean, msg = 'assert failed' ) {
        if (!condition) throw new Error(`Not True: ${msg}`);
    }

    static False(condition: boolean, msg = 'assert failed' ) {
        if (condition) throw new Error(`Not False: ${msg}`);
    }

    static Index(array: any[], i: number, msg = 'index out of bounds') {
        if (i < 0 || i >= array.length) throw new Error(`IOR ${array.length}[${i}]: ${msg}`);
    }

    static IsType(instance: any, className: Function): void {
        if (instance instanceof className) return;
        const got = (instance as any)?.constructor?.name ?? typeof instance;
        throw new Error(`Type mismatch. Expected ${className.name} Got ${got}`);
    }
}