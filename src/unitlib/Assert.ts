

export class Assert {

    static True(condition: boolean) {
        if (!condition) throw new Error('Condition was false');
    }

    static False(condition: boolean) {
        if (condition) throw new Error(`Condition was true`);
    }

    static Index(array: any[], i: number) {
        if (i < 0 || i >= array.length) throw new Error(`Index out of range: ${array.length}[${i}]`);
    }

    static IsType(instance: any, className: Function) {
        if (instance instanceof className) return;
        const got = (instance as any)?.constructor?.name ?? typeof instance;
        throw new Error(`Type mismatch: expected ${className.name}, got ${got}`);
    }

    static IsArray(instance: any, count?: number) {
        if (!Array.isArray(instance)) throw new Error('The object is not an array');
        if (count === undefined) {
            if (instance.length === 0) throw new Error('The array is empty');
        } else {
            if (instance.length !== count) throw new Error(`Expected array length ${count}, got ${instance.length}`);
        }
    }

}