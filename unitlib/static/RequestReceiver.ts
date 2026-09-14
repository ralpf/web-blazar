import { CompositeUnit } from "../containers/CompositeUnit";
import { Assert } from "../core/Assert";
import { err } from "../core/global";


// NOTE: this class is WIP and not finished yet
// it's goal is to route requests made towards the webpage
// - request URL: given a url like string, forward it towards a html element (usually input) to set it's visual state to a value (syncked from an esp32 board)
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
        throw new Error("Method not implemented. IT'S UNFINISHED, DO NOT USE YET");
    }
}