import { log } from "./unitlib/log.js";
import { Unit } from "./unitlib/Unit.js";
import { Application } from "./unitlib/Application.js";
import { MainPager } from "./MainPager.js";

log("OK: TS Framework started");


export class BlazarApp extends Application {

    private static mainPager: MainPager;

    static Run() {
        BlazarApp.initialize(MainPager);
        BlazarApp.bindKeyboard();
        
        this.mainPager = Application.getRoot(MainPager);
    }
    
    static bindKeyboard() {
        Application.bindKeyAction(key => {
            const x = Application.getRoot(MainPager);
            if (key === 't') x.isVisible = !x.isVisible;
        });
    }
}


BlazarApp.Run();