import { Application } from "unitlib/Application";
import { ViewsManager } from "./views/ViewsManager";
import { log } from "unitlib/global";
import { Time } from "unitlib/Time";

export class BlazarApp extends Application
 {

    private static mainPager: ViewsManager;

    static Run() {
        BlazarApp.initialize(ViewsManager);
        BlazarApp.bindKeyboard();
        // construcotrs builds all and links events
        this.mainPager = Application.getSingleton(ViewsManager);

    }

    // COROUTINE EXAMPLE
    static *gogogo() {
        log(`BEGIN GO GO GO`);
        let t = 0;
        let f = 0;
        while (true) {
            t += Time.dt;
            f += 1;
            if (f % 60 === 0) log(`time=${t} | f=${f}`);
            yield;
        }
    }

    static bindKeyboard() {
        Application.bindKeyAction(key => {
            const x = Application.getSingleton(ViewsManager);
            if (key === 't') x.isVisible = !x.isVisible;
        });
    }
}


BlazarApp.Run();    // etnry point