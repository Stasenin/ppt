import {BasePage} from "./basePage";
import {AuthorizationPage} from "./authorizationtPage";


export class HomePage extends BasePage {
    private _container: string = '#app';
    private _loginBtn: string = '.ssls-header-add-nav button.ssls-btn:nth-of-type(1):not(.ssls-dropdown__toggle)';

    constructor() {
        super('base page')
        this.url = 'https://www.sbzend.ssls.com';
    }

    public async openAuthorizationPage(): Promise<AuthorizationPage> {
        await page.waitForSelector(this._loginBtn,{visible: true});
        await page.click(this._loginBtn);
        return new AuthorizationPage()
    }

    public async waitLoaded(): Promise<any> {
        return page.waitForSelector(this._container, {visible: true});
    }
}
