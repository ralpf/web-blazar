import { Assert } from "../core/Assert";
import { err, log, logi } from "../core/global";


export class RequestDispatcher {

    public  static enabled = false;
    private static readonly baseUrl = `http://${window.location.host}`;



    public static sendPropagatedUrl(url: string) {
        // propagated url is one created from Unit hierarchy.
        // is has a form like /esp/someMode/SomePanel/SomeGroup/SomeControl=123
        // In this method a reduction function can be applied, even intermidiates deleted
        // The idea is to put data into a parameter quesrry list, and have sm like
        // /esp/someMode/SomePanel/SomeGroup?SomeControl=123
        url = this.formatQuerrySection(url);
        // remove # incoming from colors, since in url it is a separator. ESP can handle colors w/o # prefix
        url = this.removeHash(url);
        // add baseUrl, the address of the esp
        this.send(url);
    }


    public static send(url: string) {
        if (!this.enabled) { logi(`ignore request - the class is disabled ...`); return; }
        Assert.Defined(url);
        if (!url.startsWith('/')) url = '/' + url;
        this.GET(this.baseUrl + url);
    }


    public static async sendAsync(url: string): Promise<string> {
        if (!this.enabled) { logi(`ignore request - the class is disabled ...`); return ''; }
        Assert.Defined(url);
        if (!url.startsWith('/')) url = '/' + url;
        return this.GET(this.baseUrl + url);
    }

    private static formatQuerrySection(url: string): string {
        const i = url.lastIndexOf('/');
        const lastPart = url.slice(i + 1);
        if (!lastPart.includes('=')) return url;
        const path = url.slice(0, i + 1);
        return `${path || '/'}?${lastPart}`;
    }

    private static removeHash(url: string): string {
        return url.replace(/#/g, '');
    }

    private static async GET(url: string): Promise<string> {
        log(`GET -> ${url}`);
        const req = await fetch(url, { method: 'GET' });
        if (!req.ok) err(`ESP GET failed: ${req.status}`);
        const text = await req.text(); // or res.json() for a parsed java object
        log(`RESP <- ${text}`);
        return text;
    }

}
