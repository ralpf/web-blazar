import { Assert } from "unitlib/core/Assert";
import { ViewsManager } from "./views/ViewsManager";
import { Application } from "unitlib/static/Application";
import { RequestDispatcher } from "unitlib/static/RequestDispatcher";
import { RequestReceiver } from "unitlib/static/RequestReceiver";
import { Confetti } from "unitlib/fx/Confetti";


export class BlazarApp extends Application
 {

    private static viewsManager: ViewsManager;


    static async initializeAsync() {
        await BlazarApp.initialize();
        BlazarApp.bindKeyboard();

        Assert.True(Application.getRootUnit() instanceof ViewsManager);
        this.viewsManager = Application.getRootUnit() as ViewsManager;
        BlazarApp.syncFromESP();
    }

    static bindKeyboard() {
        Application.bindKeyAction(key => {
            const root = Application.getRootUnit();
            if (key === 't') root.isVisible = !root.isVisible;
        });
    }
}


async function main() { await BlazarApp.initializeAsync(); }
main(); //      <<~~ entry point