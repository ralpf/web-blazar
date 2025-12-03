export class Assert {

    static IsType(instance: any, className: Function): void {
        if (instance instanceof className) return;
        const got = (instance as any)?.constructor?.name ?? typeof instance;
        throw new Error(`Type mismatch. Expected ${className.name} Got ${got}`);
    }
}