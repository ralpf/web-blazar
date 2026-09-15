import { Assert } from "../core/Assert";
import { err, log } from "../core/global";


export class RequestDispatcher {

    public  static enabled = false;
    private static readonly baseUrl = `http://${window.location.host}`;


    public static send(url: string) {
        if (!this.enabled) return;
        // url incomes in class form, i.e. ViewManager/LampView/FlickerWave/...
        const querryedUrl = this.formatQuerrySection(url);
        const fixedUrl    = this.removeHash(querryedUrl);       // # is a separator and has to be escaped. ESP api will handle colors w/0 it no problem
        const finalUrl    = `${this.baseUrl}${fixedUrl}`;
        this.GET(finalUrl);
    }

    private static formatQuerrySection(url: string): string {
        const tokens = url.split('/');
        const lastToken = tokens[tokens.length - 1];
        let finalUrl = url;
        if (lastToken && lastToken.includes('=')) {
            const path = tokens.slice(0, -1).filter((token) => token.length > 0).join('/');
            finalUrl = path.length > 0 ? `/${path}?${lastToken}` : `/?${lastToken}`;
        }
        return finalUrl;
    }

    private static removeHash(url: string): string {
        return url.replace(/#/g, '');
    }

    private static async GET(url: string) {
        log(`GET -> ${url}`);
        const req = await fetch(url, { method: 'GET' });
        if (!req.ok) err(`ESP GET failed: ${req.status}`);
        const data = await req.text(); // or res.json() for a parsed java object
        log(`RESP <- ${data}`);
    }

}
