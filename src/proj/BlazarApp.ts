import { log, logi, err, unitRegistry } from "../unitlib/global";
import { Unit } from "../unitlib/Unit";
import { Application } from "../unitlib/Application";
import { MainPager } from "./managers/MainPager";

export class BlazarApp extends Application {

    private static mainPager: MainPager;

    static Run() {
        BlazarApp.initialize(MainPager);
        BlazarApp.bindKeyboard();
        // construcotrs builds all and links events
        this.mainPager = Application.getRoot(MainPager);
    }

    static bindKeyboard() {
        Application.bindKeyAction(key => {
            const x = Application.getRoot(MainPager);
            if (key === 't') x.isVisible = !x.isVisible;
        });
    }
}


BlazarApp.Run();    // etnry point