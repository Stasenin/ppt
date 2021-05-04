import {Base} from "./base";
import {HTTPResponse} from "puppeteer";


export abstract class BasePage extends Base{
    protected url: string = '';

    protected constructor(pageObjName: string) {
        super(pageObjName)
    }

    public async open(): Promise<HTTPResponse> {
        return page.goto(this.url, {waitUntil:"domcontentloaded"});
    }
}
