import { log } from "../core/global";


export class RequestDispatcher {

    private static baseUrl = `http://${window.location.host}`;


    public static process(url: string) {
        log(`ba url ${url} -> TO -> ${this.baseUrl}`);
    }

}