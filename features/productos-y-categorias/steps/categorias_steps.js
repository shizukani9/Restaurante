const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { By, until } = require('selenium-webdriver');
const MenuPage = require('../../../main/page/Menu_page');

Given('Abro el menu principal', async function () {
    try {
        await MenuPage.clickMenuButton();
    } catch (error) {
        console.error('Error al abrir el menú principal:', error);
        throw error;
    }
});

When('Selecciono el menú principal y el submenu con:', async function (dataTable) {
    const data = dataTable.rowsHash();
    const menu = data['Menú Principal'];
    const submenu = data['Submenú'];
    try {
        await MenuPage.navigateToSubMenu(menu, submenu);
    } catch (error) {
        console.error(`Error al seleccionar el menú principal "${menu}" y el submenú "${submenu}":`, error);
        throw error;
    }
});

Then('Cierro el menu principal', async function () {
    try {
        await MenuPage.clickMenuButton();
    } catch (error) {
        console.error('Error al cerrar el menú principal:', error);
        throw error;
    }
});

When('Hago clic en Agregar Nueva Categoria', async function () {
    // Mantén este paso en blanco hasta que implementes la lógica correspondiente
});

Then('Completo los campos con:', async function (dataTable) {
    // Mantén este paso en blanco hasta que implementes la lógica correspondiente
});

Then('Hago clic en Confirmar', async function () {
    // Mantén este paso en blanco hasta que implementes la lógica correspondiente
});

Then('Deberia ver el mensaje Categoria creada exitosamente', async function () {
    // Mantén este paso en blanco hasta que implementes la lógica correspondiente
});

Then('La nueva categoria deberia estar en la lista:', async function (dataTable) {
    // Mantén este paso en blanco hasta que implementes la lógica correspondiente
});