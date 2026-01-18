import { CompositeUnit } from "unitlib/containers/CompositeUnit";
import { log } from "unitlib/core/global";
import { Unit } from "unitlib/core/Unit";


export class DevView extends CompositeUnit {

    private logLines!   : HTMLElement;
    private ws!         : WebSocket | null;

    protected initializeClassFields(): void {
        this.logLines = Unit.FindWithTag(this.root, 'logRoot');
        // init WebSocket
        const url = `ws://${window.location.host}/log`;
        if (url.includes('127.0.0.1') || url.includes('localhost')) {
            log('[WebSocket] disabled for localhost');
            this.ws = null;
        } 
        else {
            log(`[WebSocket] will use url: ${url}`);
            this.ws = new WebSocket(url);
        }
    }

    protected initializeEvents(): void {
        // subscribe websocket
        if (!this.ws) return;
        this.ws.onopen = () => log('[WebSocket] Connect OK');
        this.ws.onclose = () => log('[WebSocket] disconnected');
        this.ws.onmessage = (ev) => {
            const msg = String(ev.data);
            log(`[WebSocket] ${msg}`);
            const line = this.logLines.firstElementChild!.cloneNode(true) as HTMLElement;
            const timeStamp = new Date().toLocaleTimeString('en-GB', { hour12: false });
            line.textContent = `${timeStamp}: ${msg}`;
            this.logLines.appendChild(line);
            this.logLines.scrollTop = this.logLines.scrollHeight;
        };
        // close websoket on page reload
        window.addEventListener("beforeunload", () => this.ws?.close() );
    }

}