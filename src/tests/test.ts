import {HomePage} from '../pageObject/homePage';
import {AuthorizationPage} from '../pageObject/authorizationtPage';
import {BundlesPage} from "../pageObject/bundlesPage";

describe("test", () => {
    let homePage: HomePage;
    let authorizationPage: AuthorizationPage;
    let bundlesPage: BundlesPage;

    beforeAll(async () => {
        homePage = new HomePage();
        await homePage.open();
        await page.evaluate(`(() => { window.localStorage.clear(); })()`)
        const client = await page.target().createCDPSession()
        await client.send('Network.clearBrowserCookies')
    });

    it("Authorization page. Not registered user", async () => {
        await homePage.open();
        await homePage.waitLoaded();  // checks that Home page is opened
        authorizationPage = await homePage.openAuthorizationPage()
        await authorizationPage.waitLoaded()  // checks that Authorization page is opened
        await authorizationPage.email.setInputValue(`invalid@eml.test`)
        await authorizationPage.password.setInputValue(`invalidPwd`)
        await authorizationPage.login()
        await (await authorizationPage.password.eye)?.click()
        expect( await (await authorizationPage.password.input)?.evaluate(
            node => node.value),'password should be displayed').toEqual(`invalidPwd`);

        // check an error msg or notification msg? were this msg is actually should be displayed?
        expect(await (await authorizationPage.email.error)?.evaluate(
            node => node.innerText), `Error message is not displayed or incorrect`)
            .toEqual(`Uh oh! Email or password is incorrect`);
    })

    it("Authorization page (Welcome back!)", async () => {
        await homePage.open();
        await homePage.waitLoaded();
        authorizationPage = await homePage.openAuthorizationPage()
        await authorizationPage.waitLoaded()
        await authorizationPage.email.setInputValue(`ssls.automation+666@gmail.com`)
        await authorizationPage.password.setInputValue(`123456`)
        await (await authorizationPage.password.eye)?.click()
        expect( await (await authorizationPage.password.input)?.evaluate(
            node => node.value), 'password should be displayed').toEqual(`123456`);
        bundlesPage = await authorizationPage.login()
        await bundlesPage.waitLoaded()
        /*
         1. "from the LEFT side in the Header of the page" - "Log in" button was on the RIGHT side of the Header. So, were button actually should be?
         2. And how to check without opening that this button is the "button (with dropdown menu)", maybe we should make an additional step and open the dropdown?
         'coz checking an element if it classes contains .ssls-dropdown__toggle class is not really accurate, on my opinion
        */
        expect(await bundlesPage.isUserBtnIsDisplayed(), 'User@email should be displayed').toBeTruthy();
    })
})
