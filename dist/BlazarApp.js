import { log } from "./unitlib/log.js";
import { Application } from "./unitlib/Application.js";
import { MainPager } from "./MainPager.js";
export class BlazarApp extends Application {
}
log("OK: TS Framework started");
BlazarApp.initialize(MainPager);
BlazarApp.bindKeyAction(key => {
    const x = Application.getRoot(MainPager);
    if (key === 't')
        x.isVisible = !x.isVisible;
});
