import {BasePage} from "./basePage";


export class ProfilePage extends BasePage {
    private _container: string = '.container';
    private _ItemsList: string = '.panel.inline-panel .item';

    constructor() {
        super('Profile Page')
        this.url = 'https://www.sbzend.ssls.com/user/profile';
    }
    public async getProfileDataList(): Promise<any[]> {
        let profileData: any[] = []
        await page.waitForSelector(this._ItemsList, {visible: true})
        const elements = await page.$$(this._ItemsList)
            for (const element of elements) {
                const item =  await (await element?.$('.terms .text'))?.evaluate(
                    node => node.textContent) ?? ''
                const value =  await (await element?.$('.description .text'))?.evaluate(
                    node => node.textContent) ?? ''
                profileData.push({ item, value })
            }

        return profileData;
    }

    public async waitLoaded(): Promise<any> {
        return page.waitForSelector(this._container, {visible: true});
    }
}
