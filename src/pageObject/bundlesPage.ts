import {BasePage} from "./basePage";
import {InputGroup} from "./controls/inputGroup";
import {ElementHandle} from "puppeteer";


export class BundlesPage extends BasePage {
    private _container: string = '.container';
    private _userBtn: string = '.ssls-header-add-nav .ssls-dropdown:nth-child(3) .ssls-dropdown__toggle';
    private _email: InputGroup = new InputGroup(`.form-group.email`, `email`);
    private _password: InputGroup = new InputGroup(`.form-group:not(.email)`, `password`);

    constructor() {
        super('Bundles Page')
        this.url = 'https://www.sbzend.ssls.com/user/bundles';
    }
    get userBtn(): Promise<ElementHandle<Element> | null> {
        return page.$(this._userBtn)
    }
    public async openUserDropdownAndGetContentList(): Promise<string[]> {
        await page.waitForSelector(this._userBtn, {visible: true})
        const classes = await (await page.$(this._userBtn))?.evaluate(node => node.getAttribute('class'))
        if(!classes.toString().includes('ssls-is-opened')) {
            const element = await page.$(this._userBtn)
            await element?.evaluate(node => node.click()) // clicking "approximately" on this triangle:)
        }
        return  await page.evaluate(() => {
            //@ts-ignore
            [...element] = document.querySelectorAll('.ssls-is-opened .ssls-header-dropdown-nav li > *');
            //@ts-ignore
            return [...element].map(x => x.textContent);
        });

    }

    public async clickItemInDropDownByName(name: string) {
        const item = await page.$x(`.//*[@type="button" and contains(.,'${name}')]`)
        return  item[0]?.click()
    }

    public async isUserBtnIsDisplayed(): Promise<ElementHandle<Element> | null> {
        return page.waitForSelector(this._userBtn, {visible: true,});
    }

    public async waitLoaded(): Promise<ElementHandle | null> {
        return page.waitForSelector(
            this._container);
    }
}
