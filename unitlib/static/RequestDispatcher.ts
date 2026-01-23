import { Assert } from "../core/Assert";
import { err, log } from "../core/global";


export class RequestDispatcher {

    private static readonly baseUrl = `http://${window.location.host}`;
    public  static enabled = false;


    public static init(xfTable: Record<string, string>) {
        // pass the transform table to dedicated class
        UrlTransformer.setMap(xfTable);
    }

    public static process(url: string) {
        if (!this.enabled) return;
        // url incomes in class form, i.e. ViewManager/LampView/FlickerWave/...
        const remapedUrl  = UrlTransformer.toUrlForm(url);
        const querryedUrl = this.formatQuerrySection(remapedUrl);
        const escapedUrl  = this.removeHash(querryedUrl);
        const finalUrl    = `${this.baseUrl}${escapedUrl}`;
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
        if (url.includes('127.0.0.1') || url.includes('localhost')) {
            log('Skipping request to localhost');
            return;
        }

        const req = await fetch(url, { method: 'GET' });
        if (!req.ok) err(`ESP GET failed: ${req.status}`);
        const data = await req.text(); // or res.json()
        log(`RESP <- ${data}`);
    }

}



class UrlTransformer {
    private static xfTable: Record<string, string>;

    public static setMap(map: Record<string, string>): void {
        Assert.Defined(map);
        this.xfTable = map;
    }

    // change url parts like ViewManager -> api
    public static toUrlForm(classForm: string): string {
        Assert.Defined(classForm);
        if (!this.xfTable) err(`first set the transform map via setMap() method!`);
        const tokens = classForm.split('/').filter((token) => token.length > 0);
        const transformedTokens = tokens.map((token) => this.xfTable[token] ?? token);
        return `/${transformedTokens.join('/')}`;
    }

    public static toClassForm(urlForm: string): string {

    }

}