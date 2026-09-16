import { CompositeUnit } from "unitlib/containers/CompositeUnit";
import { log, logi } from "unitlib/core/global";
import { ButtonOne } from "unitlib/inputs/ButtonOne";
import { Application } from "unitlib/static/Application";
import { DOM } from "unitlib/static/DOM";
import { RequestDispatcher } from "unitlib/static/RequestDispatcher";
import { RequestReceiver } from "unitlib/static/RequestReceiver";


export class DevView extends CompositeUnit {

    private logLines!   : HTMLElement;
    private wsocketOnOf!: HTMLElement;
    private commandLine!: HTMLElement;
    private actionButton!: ButtonOne;

    private ws!         : WebSocket | null;


    protected initializeClassFields(): void {
        // resolve the fields
        this.logLines = DOM.FindWithTag(this.root, 'logRoot');
        this.wsocketOnOf = DOM.FindWithTag(this.root, 'ws-on-off');
        this.commandLine = DOM.FindWithTag(this.root, 'dev-command-line');
        this.actionButton = this.getField<ButtonOne>('actionButton');
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
        this.initWebsocket();
        this.initCommandLine();
        this.initActionbutton();
    }


    private initWebsocket(): void {
        if (!this.ws) return;
        // subscribe websocket
        this.ws.onopen = () => {
            log('[WebSocket] Connect OK');
            this.wsocketOnOf.textContent = 'on';
            this.wsocketOnOf.style.backgroundColor = "rgba(0, 168, 0, 1)";
        };
        // unsubscrive websocket
        this.ws.onclose = () => {
            log('[WebSocket] disconnected');
            this.wsocketOnOf.textContent = 'of';
            this.wsocketOnOf.style.backgroundColor = "rgba(168, 0, 0, 1)";
        };
        // receive websocket message
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


    private initCommandLine(): void {
        // subscribe to run command text input
        const runCommandInput = DOM.Find(this.commandLine, 'input') as HTMLInputElement;
        this.commandLine.addEventListener('submit', ev => {         // this is a form with ok button
            ev.preventDefault();    // prevent page reload
            const cmd = runCommandInput.value.trim();
            log(`[DEV.CommandLine] run '${cmd}'`);
            RequestReceiver.runRequestAny(cmd);
        });
    }


    private initActionbutton(): void {
        const onClick = () => {
            logi(`Ze Button Waz prezzed`);
            Application.syncFromESP();
        };

        this.actionButton.callback = onClick;
    }

}