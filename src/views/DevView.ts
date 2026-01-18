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
        if (url.includes('127.0.0.1') || url.includes('localhost')) this.ws = null;
        else this.ws = new WebSocket(url);
    }

    protected initializeEvents(): void {
        // subscribe websocket
        if (!this.ws) { log(`[WebSocket] disabled for localhost`); return; }
        this.ws.onopen = () => log('[WebSocket] Connect OK');
        this.ws.onclose = () => log('[WebSocket] disconnected');
        this.ws.onmessage = (ev) => {
            const msg = String(ev.data);
            log(`[WebSocket] ${msg}`);
            const line = document.createElement('div');
            line.textContent = msg;
            this.logLines.appendChild(line);
            this.logLines.scrollTop = this.logLines.scrollHeight;
        };
    }

}