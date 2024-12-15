const { By, until } = require("selenium-webdriver");
const DriverFactory = require("../../core/ui/driverFactory");
const configuration = require("../../configuration.json");

class MenuPage {
    constructor() {
        // Selector para el botón que abre el menú
        this.menuButton = By.css('svg.icon-tabler-mist'); //mejorar el boton 
        this.mainModuleSelector = (mainModuleName) =>
            By.xpath(`//div[@class="accordion-header"]//button/div[contains(text(), "${mainModuleName}")]`);
        this.subMenuSelector = (subMenuName) =>
            By.xpath(`//div[@class="accordion-body"]//button[contains(text(), "${subMenuName}")]`);
    }

    // Método reutilizable para esperar un elemento
    async waitForElement(selector) {
        try {
            console.log(`Esperando el elemento con selector: ${selector}`);
            const element = await DriverFactory.myDriver.wait(
                until.elementLocated(selector),
                configuration.browser.timeout_12_seconds
            );
            console.log(`Elemento localizado: ${selector}`);
            //await DriverFactory.myDriver.wait(until.elementIsVisible(element), configuration.browser.timeout_12_seconds);
           // console.log(`Elemento visible: ${selector}`);
            await DriverFactory.myDriver.wait(until.elementIsEnabled(element), configuration.browser.timeout_12_seconds);
            console.log(`Elemento habilitado: ${selector}`);
            return element;
        } catch (error) {
            console.error(`Error al esperar el elemento: ${selector}`, error);
            throw error;
        }
    }

    // Método para hacer clic en el botón que abre el menú
    async clickMenuButton() {
        try {
            console.log("Intentando localizar el botón del menú...");
            const menuButton = await this.waitForElement(this.menuButton);
            console.log("Botón del menú localizado. Intentando hacer clic...");
            await menuButton.click();
            console.log("Clic realizado en el botón del menú.");
        } catch (error) {
            console.error('Error al hacer clic en el botón que abre el menú:', error);
            throw error;
        }
    }

    // Método para navegar a un submenú dentro de un módulo principal
    async navigateToSubMenu(mainModuleName, subMenuName) {
        try {
            console.log(`Navegando al módulo principal: ${mainModuleName}`);
            const mainModuleButton = await this.waitForElement(this.mainModuleSelector(mainModuleName));
            console.log(`Módulo principal localizado: ${mainModuleName}. Intentando hacer clic...`);
            await mainModuleButton.click();
            console.log(`Clic realizado en el módulo principal: ${mainModuleName}`);

            console.log(`Navegando al submenú: ${subMenuName}`);
            const subMenuButton = await this.waitForElement(this.subMenuSelector(subMenuName));
            console.log(`Submenú localizado: ${subMenuName}. Intentando hacer clic...`);
            await subMenuButton.click();
            console.log(`Clic realizado en el submenú: ${subMenuName}`);
        } catch (error) {
            console.error(`Error al navegar al submenú "${subMenuName}" dentro del módulo "${mainModuleName}":`, error);
            throw error;
        }
    }
}

module.exports = new MenuPage();