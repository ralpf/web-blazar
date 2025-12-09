import { log, logi, err, unitRegistry } from "../unitlib/global";
import { Unit } from "../unitlib/Unit";
import { Application } from "../unitlib/Application";
import { ViewsManager } from "./managers/ViewsManager";

export class BlazarApp extends Application {

    private static mainPager: ViewsManager;

    static Run() {
        BlazarApp.initialize(ViewsManager);
        BlazarApp.bindKeyboard();
        // construcotrs builds all and links events
        this.mainPager = Application.getRoot(ViewsManager);
    }

    static bindKeyboard() {
        Application.bindKeyAction(key => {
            const x = Application.getRoot(ViewsManager);
            if (key === 't') x.isVisible = !x.isVisible;
        });
    }
}


BlazarApp.Run();    // etnry point