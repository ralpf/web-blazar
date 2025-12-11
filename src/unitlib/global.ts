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

const modules = import.meta.glob("../**/*.ts", { eager: true });
for (const path in modules) {
    if (path.endsWith("Application.ts")) continue; // do not auto-scan Application.ts, it imports global.ts
    if (path.endsWith("BlazarApp.ts"))  continue;
    const module = modules[path] as Record<string, any>;
    for (const exportName in module) {
        const exportSymbol = module[exportName];
        if (typeof exportSymbol === 'function')
            if (exportSymbol.prototype instanceof Unit)
                unitRegistry[exportName] = exportSymbol;    // <className: string, classCTOR: func>
    }
}
//console.log("unitRegistry keys:", Object.keys(unitRegistry));
