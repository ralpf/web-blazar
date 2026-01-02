import { ViewsManager } from "./views/ViewsManager";
import { Application } from "unitlib/static/Application";


export class BlazarApp extends Application
 {

    private static mainPager: ViewsManager;

    static async Run() {
        await BlazarApp.initialize(ViewsManager);
        BlazarApp.bindKeyboard();
        // construcotrs builds all and links events
        this.mainPager = Application.getSingleton(ViewsManager);

    }

    static bindKeyboard() {
        Application.bindKeyAction(key => {
            const x = Application.getSingleton(ViewsManager);
            if (key === 't') x.isVisible = !x.isVisible;
        });
    }
}


async function main() { await BlazarApp.Run(); }
main(); // entry point