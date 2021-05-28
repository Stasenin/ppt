import {AuthorizationPage} from '../pageObject/authorizationtPage';
import {BundlesPage} from "../pageObject/bundlesPage";
import {ProfilePage} from "../pageObject/profilePage";

describe("test", () => {
    let authorizationPage: AuthorizationPage;
    let bundlesPage: BundlesPage;
    let profileDataListExpected: any[] = []

    beforeAll(async () => {
        authorizationPage = new AuthorizationPage();
        await authorizationPage.open()
        await page.evaluate(`(() => { window.localStorage.clear(); })()`)
        const client = await page.target().createCDPSession()
        await client.send('Network.clearBrowserCookies')
        await authorizationPage.open()
        await authorizationPage.waitLoaded()
        await authorizationPage.email.setInputValue(`ssls.automation+666@gmail.com`)
        await authorizationPage.password.setInputValue(`123456`)
        bundlesPage = await authorizationPage.login()
        await bundlesPage.waitLoaded()
        await (await bundlesPage.openUserDropdownAndGetContentList())
        await (await bundlesPage.clickItemInDropDownByName('Profile'))
        const profilePage = new ProfilePage()
        await profilePage.waitLoaded()
        profileDataListExpected = await profilePage.getProfileDataList()
        await page.evaluate(`(() => { window.localStorage.clear(); })()`)
        // clear cookies
        await client.send('Network.clearBrowserCookies')
    });

    it("My profile page. Client area", async () => {
        await authorizationPage.open()
        await authorizationPage.waitLoaded()
        await authorizationPage.email.setInputValue(`ssls.automation+666@gmail.com`)
        await authorizationPage.password.setInputValue(`123456`)
        bundlesPage = await authorizationPage.login()
        await bundlesPage.waitLoaded()
        await (await bundlesPage.openUserDropdownAndGetContentList())
        await (await bundlesPage.clickItemInDropDownByName('Profile'))
        const profilePage = new ProfilePage()
        await profilePage.waitLoaded() // checks that Profile page is opened
        const profileDataList = await profilePage.getProfileDataList()
        expect(profileDataList, 'User@email should be displayed').toEqual(profileDataListExpected)
    })
})
