import {BasePage} from "./basePage";
import {InputGroup} from "./controls/inputGroup";
import {ElementHandle} from "puppeteer";
import {BundlesPage} from "./bundlesPage";
import * as config from "../../config/config.json"


export class AuthorizationPage extends BasePage {
    private _container: string = '.container';
    private _loginBtn: string = '.primary';
    private _notification: string = '.ssls-notification__info .noty_text';
    private _email: InputGroup = new InputGroup(`.form-group.email`, `email`);
    private _password: InputGroup = new InputGroup(`.form-group:not(.email)`, `password`);

    constructor() {
        super('Authorization Page')
        this.url = `${config.baseUrl}/authorize`;
    }
    get notification(): Promise<ElementHandle<Element> | null> {
        return page.$(this._notification)
    }

    get email(): InputGroup {
        return this._email
    }

    get password(): InputGroup {
        return this._password
    }

    public async login(): Promise<BundlesPage> {
        await page.click(this._loginBtn);
        return new BundlesPage()
    }

    public async waitLoaded(): Promise<ElementHandle | null> {
        return page.waitForSelector(
            this._container);
    }
}
