import { CompositeUnit } from "../containers/CompositeUnit";
import { Assert } from "../core/Assert";
import { err, log } from "../core/global";
import { Application } from "./Application";


// NOTE: this class is WIP and not finished yet
// it's goal is to route requests made towards the webpage
// - request URL: given a url like string, forward it towards a html element (usually input) to set it's visual state to a value (syncked from an esp32 board)
export class RequestReceiver {

    public static enabled = false;


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

    private static processString(url: string) {
        // supported url-like paths, of form: lamp/flik?hSpd=45 (note no leading / and mandatory ?)
        // this will dig into unit hierarchy using the url as path
        if (url.includes('/') && url.includes('?') && url.includes('='))
            Application.syncFieldOnRoot(url);
        else log(`[RequestReceiver] ignoring malformated string command \n\t'${url}'`);

        // other kind of string commands are not supported yet
    }
}