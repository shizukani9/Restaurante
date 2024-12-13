const { By, until } = require("selenium-webdriver");
const DriverFactory = require("../../core/ui/driverFactory");
const configuration = require("../../configuration.json");

class MenuPage {
    constructor() {
        // Selector para el botón que abre el menú
        this.menuButton = By.css('svg.icon-tabler-mist');
        this.mainModuleSelector = (mainModuleName) => By.xpath(`//div[@class="accordion-header"]//button/div[contains(text(), "${mainModuleName}")]`);
        this.subMenuSelector = (subMenuName) => By.xpath(`//div[@class="accordion-body"]//button[contains(text(), "${subMenuName}")]`);
    }

    // Método reutilizable para esperar un elemento
    async waitForElement(selector) {
        try {
            const element = await DriverFactory.myDriver.wait(
                until.elementLocated(selector),
                configuration.browser.timeout_12_seconds
            );
            await DriverFactory.myDriver.wait(until.elementIsVisible(element), configuration.browser.timeout_12_seconds);
            await DriverFactory.myDriver.wait(until.elementIsEnabled(element), configuration.browser.timeout_12_seconds);
            return element;
        } catch (error) {
            console.error(`Error al esperar el elemento: ${selector}`, error);
        }
    }

    // Método para hacer clic en el botón que abre el menú
    async clickMenuButton() {
        try {
            const menuButton = await this.waitForElement(this.menuButton);
            await menuButton.click();
        } catch (error) {
            console.error('Error al hacer clic en el botón que abre el menú:', error);
        }
    }

    // Método para navegar a un submenú dentro de un módulo principal
    async navigateToSubMenu(mainModuleName, subMenuName) {
        try {
            const mainModuleButton = await this.waitForElement(this.mainModuleSelector(mainModuleName));
            await mainModuleButton.click();
            
            const subMenuButton = await this.waitForElement(this.subMenuSelector(subMenuName));
            await subMenuButton.click();
        } catch (error) {
            console.error(`Error al navegar al submenú "${subMenuName}" dentro del módulo "${mainModuleName}":`, error);
        }
    }
}

module.exports = new MenuPage();