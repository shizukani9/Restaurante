const { By, until } = require("selenium-webdriver");
const DriverFactory = require("../../core/ui/driverFactory");
const configuration =require("../../configuration.json");

class LoginPage{
    constructor() {
        this.usernameInput = By.css('.input-field input[name="username"]');
        this.passwordInput = By.css('.input-field input[name="password"]');
        this.loginButton = By.css('.login button');
    }

    async waitForElement(selector) {
        const element = await DriverFactory.myDriver.wait(until.elementLocated(selector), configuration.browser.timeout);
        await DriverFactory.myDriver.wait(until.elementIsVisible(element), configuration.browser.timeout);
        await DriverFactory.myDriver.wait(until.elementIsEnabled(element), configuration.browser.timeout);
        return element;
    }

    async enterUsername(username) {
        try {
            const usernameInput = await this.waitForElement(this.usernameInput);
            await usernameInput.sendKeys(username);
        } catch (error) {
            console.error('Error al ingresar el nombre de usuario:', error);
            throw error;
        }
    }

    async enterPassword(password) {
        try {
            const passwordInput = await this.waitForElement(this.passwordInput);
            await passwordInput.sendKeys(password);
        } catch (error) {
            console.error('Error al ingresar la contraseña:', error);
            throw error;
        }
    }

    async clickLoginButton() {
        try {
            const loginButton = await this.waitForElement(this.loginButton);
            await loginButton.click();
        } catch (error) {
            console.error('Error al hacer clic en el botón de inicio de sesión:', error);
            throw error;
        }
    }
}

module.exports = new LoginPage();