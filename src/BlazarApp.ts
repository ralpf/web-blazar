import { Assert } from "unitlib/core/Assert";
import { ViewsManager } from "./views/ViewsManager";
import { Application } from "unitlib/static/Application";
import { RequestDispatcher } from "unitlib/static/RequestDispatcher";
import { RequestReceiver } from "unitlib/static/RequestReceiver";


export class BlazarApp extends Application
 {

    private static mainPager: ViewsManager;


    static async initializeAsync() {
        await BlazarApp.initialize();
        BlazarApp.bindKeyboard();
        RequestDispatcher.enabled = true;
        RequestReceiver.enabled = true;

        Assert.True(Application.getRootUnit() instanceof ViewsManager);
        this.mainPager = Application.getRootUnit() as ViewsManager;
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