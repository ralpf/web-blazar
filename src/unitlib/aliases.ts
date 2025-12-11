import { Unit } from "./Unit";


/**Delegate for function(value) */
export type Action = (value: any) => void;

/**Delegate for Unit-derived class contrstructors */
export type UnitCTOR<T extends Unit = Unit> = new (el: Element, ...args: any[]) => T;
//                                  ^~~~ defaults the param to 'Unit' type
