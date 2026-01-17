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
        const remapedUrl  = this.transformUrl(url);
        const querryedUrl = this.formatQuerrySection(remapedUrl);
        const escapedUrl  = this.escapeUrl(querryedUrl);
        const finalUrl    = `${this.baseUrl}${escapedUrl}`;
        this.GET(finalUrl);
    }

    private static transformUrl(url: string): string {
        // change url parts like ViewManager -> api
        const tokens = url.split('/').filter((token) => token.length > 0);
        const transformedTokens = tokens.map((token) => this.xfTable[token] ?? token);
        return `/${transformedTokens.join('/')}`;
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

    private static escapeUrl(url: string): string {
        return url.includes('#') ? url.split('#').join('%23') : url;
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
