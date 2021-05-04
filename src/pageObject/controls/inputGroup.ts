import {Base} from "../base";
import {ElementHandle} from "puppeteer";


export class InputGroup extends Base {
    protected _container: string;
    protected _eye: string;
    protected _input: string;
    protected _error: string;

    constructor(container: string, name: string) {
        super(name);
        this._container = container;
        this._input = `${this._container} input`;
        this._eye = `${this._container} .icon-eye`;
        this._error = `${this._container} .tooltip-error .tooltip-text`;
    }

    get input(): Promise<ElementHandle<Element> | null> {
        return page.$(this._input)
    }

    get eye(): Promise<ElementHandle<Element> | null> {
        return page.$(this._eye)
    }

    get error(): Promise<ElementHandle<Element> | null> {
        return page.$(this._error)
    }

    public async setInputValue(text: string): Promise<void> {
        await page.waitForSelector(this._input)
        await (await this.input)?.click({clickCount: 3}) // to clean input
        return (await this.input)?.type(text)
    }
}
