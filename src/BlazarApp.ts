import { ViewsManager } from "./views/ViewsManager";
import { Application } from "unitlib/static/Application";


export class BlazarApp extends Application
 {

    private static mainPager: ViewsManager;


    static async initializeAsync() {
        await BlazarApp.initializeRootClasses(ViewsManager);
        BlazarApp.bindKeyboard();
        BlazarApp.initializeCompleted();
        this.mainPager = Application.getSingleton(ViewsManager);
    }

    static bindKeyboard() {
        Application.bindKeyAction(key => {
            const x = Application.getSingleton(ViewsManager);
            if (key === 't') x.isVisible = !x.isVisible;
        });
    }
}


async function main() { await BlazarApp.initializeAsync(); }
main(); //      <<~~ entry point