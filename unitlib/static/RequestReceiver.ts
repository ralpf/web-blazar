import { CompositeUnit } from "../containers/CompositeUnit";
import { Assert } from "../core/Assert";
import { err } from "../core/global";


export class RequestReceiver {

    public static enabled = false;
    private static rootName : string;           // root name
    private static rootUnit : CompositeUnit;    // root unit


    public static init(rootName: string, rootUnit: CompositeUnit) {
        Assert.Defined(rootName);
        Assert.Defined(rootUnit);
        this.rootName = rootName;        // i.e. 'esp'
        this.rootUnit = rootUnit;        // i.e. 'ViewManager'
    }

    public static process(url: string) {
        if (!this.enabled) return;
        if (!this.rootName || !this.rootUnit) err("call init() firts");
        const prefix = `/${this.rootName}/`;
        if (url.startsWith(prefix) === false) err(`unexpected URL format: ${url}`);
        // this will dig in unit hierarchy using the url as path
        this.rootUnit.syncField(url.replace(prefix, ''));
    }
}