import { InputUnit } from "../inputs/InputUnit";



/** this class is used to help sync from esp for sm that are not inputs.
 *  I.e. an array of buttons with one pressed, indicated by sygnal. This is used to forward the synced value
 */
export class SyncUnit extends InputUnit {

    protected prepareInnerElements(): void {
        // nothing to prepare
    }
    protected setInputVisualTo(value: any): void {
        // this method will receive the synced value from esp
        // report it to someone interested (a panel)
        this.invokeCallback(value);
    }

}