import { Unit } from "./Unit.js";


/**Delegate for function(value) */
export type Action = (value: any) => void;

/**Delegate for Unit-derived class contrstructors */
export type UnitCTOR<T extends Unit = Unit> = new (el: HTMLElement) => T;       // ... Unit = Unit -> defaults the param to Unit type