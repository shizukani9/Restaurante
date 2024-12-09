const { Before, After, AfterAll, BeforeAll } = require("@cucumber/cucumber");
const axios = require('axios');
const environment = require("../../environment.json");
const configuration = require("../../configuration.json");
const DriverFactory = require("../../core/ui/driverFactory");
const LoginPage = require("../../main/page/login_page");
const { until, Key, By } = require("selenium-webdriver");
const { setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(120000);

let loginHook = false;

BeforeAll({ tags: "@ui" }, async function () {
    try {
        console.log("Starting Framework");
        this.driver = await new DriverFactory();
        console.log("Driver created:", this.driver);

        console.log("Opening Browser with URL:", environment.demo.url);
        await this.driver.get(environment.demo.url);

        console.log("Setting Browser Window Size:", configuration.browser.resolution);
        await this.driver.manage().window().setRect({width: configuration.browser.resolution.width, height: configuration.browser.resolution.height});

        console.log("Browser setup complete");
    } catch (error) {
        console.error("Error in BeforeAll hook:", error);
        throw error;
    }
});


Before({ tags: '@loginAdmin' }, async function (scenario) {
    console.log("Scenario: " + scenario.pickle.name);

    await DriverFactory.myDriver.get(`${environment.demo.url}${environment.demo.routes.login}`);
    await DriverFactory.myDriver.wait(until.urlIs(`${environment.demo.url}${environment.demo.routes.login}`), configuration.browser.timeout_12_seconds);

    if (!loginHook) {
        console.log("Hook: Iniciando sesión como administrador...");
        await LoginPage.enterUsername(environment.demo.userAdmin.username);
        await LoginPage.enterPassword(environment.demo.userAdmin.password);
        await LoginPage.clickLoginButton();

        const expectedUrl = `${environment.demo.url}${environment.demo.routes.company}`;
        console.log('Esperando redirección a la URL esperada...');
        await DriverFactory.myDriver.wait(until.urlIs(expectedUrl),configuration.browser.timeout_12_seconds);

        const currentUrl = await DriverFactory.myDriver.getCurrentUrl();
        console.log('currentUrl: ', currentUrl);
        console.log('expectedUrl: ', expectedUrl);
        if (currentUrl !== expectedUrl) {
            throw new Error("El login falló, no se redirigió a la página esperada.");
        }

        console.log("Login exitoso.");
        loginHook = true;
    }
});


AfterAll({ tags: "@ui" },async function(){
    await DriverFactory.closeDriver();
});