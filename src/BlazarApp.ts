import { ViewsManager } from "./views/ViewsManager";
import { Application } from "unitlib/static/Application";


export class BlazarApp extends Application
 {

    private static mainPager: ViewsManager;
    private static xfTable: Record<string, string> = {
        'ViewsManager'  : 'esp',
        'LampView'      : 'lamp',
        'DeckView'      : 'deck',
        'SettingsView'  : 'glob',
        'MoodColors'    : 'mood',
        'SlidersHSV'    : 'hsv',
        'ColorArray'    : 'picker',
        'FlickerWave'   : 'flik',
    };

    static async initializeAsync() {
        await BlazarApp.initializeRootClasses(ViewsManager);
        BlazarApp.initializeUrlRemap(this.xfTable);
        BlazarApp.bindKeyboard();
        BlazarApp.initializeCompleted();
        this.mainPager = Application.getSingleton(ViewsManager);
        // all done
    }

    static bindKeyboard() {
        Application.bindKeyAction(key => {
            const x = Application.getSingleton(ViewsManager);
            if (key === 't') x.isVisible = !x.isVisible;
        });
    }
}


async function main() { await BlazarApp.initializeAsync(); }
main(); // entry point