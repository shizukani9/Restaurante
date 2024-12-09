const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const LoginPage = require('../../../main/page/login_page');
const environment = require('../../../environment.json');
const configuration = require("../../../configuration.json");
const DriverFactory = require('../../../core/ui/driverFactory');

Given('configuro las credenciales de inicio de sesión', async function () {
    await LoginPage.enterUsername(environment.demo.userAdmin.username);
    await LoginPage.enterPassword(environment.demo.userAdmin.password);
});

When('intento iniciar sesión en la aplicación', async function () {
    await LoginPage.clickLoginButton();
});

Then('debería ver la página de Introducción', async function () {
    const expectedUrl = `${environment.demo.url}${environment.demo.routes.company}`;
    console.log('Esperando redirección a la URL esperada...');
    await DriverFactory.myDriver.wait(until.urlIs(expectedUrl),configuration.browser.timeout_12_seconds);

    const currentUrl = await DriverFactory.myDriver.getCurrentUrl();
    console.log('currentUrl: ', currentUrl);
    console.log('expectedUrl: ', expectedUrl);
    if (currentUrl !== expectedUrl) {
        throw new Error("El login falló, no se redirigió a la página esperada.");
    }
});