import { err, log } from "../core/global";


export class RequestDispatcher {

    private static baseUrl = `http://${window.location.host}`;

    private static xfTable: Record<string, string> = {
        'ViewsManager'  : 'esp',
        'LampView'      : 'lamp',
        'DeckView'      : 'deck',
        'SettingsView'  : 'glob',
        'MoodColors'    : 'mood',
        'SlidersHSV'    : 'hsv',
        'ColorArray'    : 'picker',
        'FlickerWave'   : 'flik',
    };


    public static process(url: string) {
        const espUrl  = this.transformUrl(url);
        const fullUrl = `${this.baseUrl}${espUrl}`;
        this.GET(fullUrl);
    }

    private static transformUrl(url: string): string {
        // change url parts like ViewManager -> api
        const tokens = url.split("/").filter((token) => token.length > 0);
        const transformedTokens = tokens.map((token) => this.xfTable[token] ?? token);
        // If the last token is a key=value pair, treat it as a query param.
        const lastToken = transformedTokens[transformedTokens.length - 1];
        let finalUrl = '';
        if (lastToken && lastToken.includes("=")) {
            finalUrl = transformedTokens.slice(0, -1).join("/");
            finalUrl = finalUrl.length > 0 ? `/${finalUrl}?${lastToken}` : `/?${lastToken}`;
        } else {
            finalUrl = `/${transformedTokens.join("/")}`;
        }
        // url ready, ex esp/lamp?lume=55
        return finalUrl;
    }

    private static async GET(url: string) {
        log(`GET -> ${url}`);
        if (url.includes("127.0.0.1")) { log("Skipping request to 127.0.0.1"); return; }

        const req = await fetch(url, { method: "GET" });
        if (!req.ok) err(`ESP GET failed: ${req.status}`);
        const data = await req.text(); // or res.json()
        log(`RESP <- ${data}`);
    }

}
