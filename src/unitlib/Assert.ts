import { err } from "./global";


export class Assert {

    static True(condition: boolean, msg = 'Condition was false'): asserts condition {
        if (!condition) err(msg);
    }

    static False(condition: boolean, msg = 'Condition was true'): asserts condition is false {
        if (condition) err(msg);
    }

    static Index(array: any[], i: number) {
        if (i < 0 || i >= array.length) err(`Index out of range: ${array.length}[${i}]`);
    }

    static Defined(obj: any): asserts obj {
        if (!obj) err(`object was undefined or null`);
    }

    static IsType(instance: any, className: Function) {
        if (instance instanceof className) return;
        const got = (instance as any)?.constructor?.name ?? typeof instance;
        err(`Type mismatch: expected ${className.name}, got ${got}`);
    }

    static IsArray(instance: any, count?: number) {
        if (!Array.isArray(instance)) err('The object is not an array');
        if (count === undefined) {
            if (instance.length === 0) err('The array is empty');
        } else {
            if (instance.length !== count) err(`Expected array length ${count}, got ${instance.length}`);
        }
    }

}