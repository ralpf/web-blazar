import { UnitCTOR } from "./aliases";
import { Unit } from "./Unit";


//..................................................................VARS

export const unitRegistry: Record<string, UnitCTOR> = {}    // central ctors register

//..................................................................FUNC

/** a nice shortcut for console.log()
 ** but forget about caller metadata (file:line)
 ** use 'traceON' to print callstack */
export function log(msg: string, traceON = false) {
    //traceON = true;
    console.log(`${msg}`);
    if (traceON) console.trace();
}

/** "intelligent" version of log()
 ** does infer the caller type.method
 ** more expensive*/
export function logi(msg: string) {
    const e = new Error(msg);
    const stack = e.stack!.split('\n');
    const frame = stack[2] ?? '';  // frame 2 = caller
    const match = frame.match(/at\s+([^\s(]+)/);  // remove irrelevent stuff like url
    const caller = match ? match[1] : "unknown";
    console.log(`[${caller}]: ${msg}`);
}

export function err(msg: string): never {
    const e = new Error(msg);
    const stack = e.stack!.split('\n');
    const frame = stack[2] ?? '';  // frame 2 = caller
    const match = frame.match(/at\s+([^\s(]+)/);  // remove irrelevent stuff like url
    const caller = match ? match[1] : "unknown";
    e.message = `[${caller}] ${msg}`;
    throw e;
}

//..............................................UNIT-CLASS-CTOR-REGISTRY

export async function buildUnitRegistry() {
    const modules = import.meta.glob([
        "../**/*.ts",       // the unitlib folder
        "../../**/*.ts"     // the project folder
    ]);
    const loaders = Object.values(modules).map(load =>
        load().then((mod: any) => {
            for (const key in mod) {
                const symbol = mod[key];
                if (typeof symbol === "function")
                    unitRegistry[symbol.name] = symbol;
            }
        })
    );
    await Promise.all(loaders);
    unitRegistry[Unit.name] = Unit;  // this class has to be add separatelly
}
