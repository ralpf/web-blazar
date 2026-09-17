import { Composite } from "../containers/Composite";
import { Assert } from "../core/Assert";
import { err, log } from "../core/global";
import { Application } from "./Application";


// NOTE: this class is WIP and not finished yet
// it's goal is to route requests made towards the webpage
// - request URL: given a url like string, forward it towards a html element (usually input) to set it's visual state to a value (syncked from an esp32 board)
export class RequestReceiver {

    public static enabled = false;


    /** The only API to run a command on frontend. Pass a sync json or url command */
    public static runRequestAny(obj: any): void {
        if (!this.enabled) {
            log(`[RequestReceiver] i'm disabled, ignoring command...`);
            return;
        }

        if (typeof obj === 'string') {
            this.processString(obj);
        } else if (obj !== null && typeof obj === 'object') {
            throw new Error('JSON requests are not implemented yet');
        } else throw new Error('Expected a string or object');
    }


    private static processString(str: string) {
        str = str.trim();
        if (!str) { log(`[RequestReceiver] ignore emtpy string command ...`); return; }

        // supported url-like paths, of form: lamp/flik?hSpd=45
        if (str.includes('/') && str.includes('?') && str.includes('='))
            this.processStringUrl(str);
        else if (str.startsWith('{') && str.endsWith('}'))
            this.processStringJson(str);
        else log(`[RequestReceiver] unknown format of string command \n\t'${str}'`);
    }


    private static processStringUrl(url: string) {
        Application.syncFieldOnRoot(url);
    }


    private static processStringJson(sjson: string) {

    }
}