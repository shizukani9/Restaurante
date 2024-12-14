@ui
Feature: Categorias
@loginAdmin @Categorias @Ca-1
Scenario: Crear una nueva categoria exitosamente
    Given Abro el menu principal
    When Selecciono el menú principal y el submenu con:
        | Menú Principal | Gestión     |
        | Submenú        | Categorías  |
    Then Cierro el menu principal
    When Hago clic en Agregar Nueva Categoria
    Then Completo los campos con: 
        | Nombre              | Electrónica       |
        | Descripción         | Categoría general |
        | Estado              | Activo            |
        | En ecommerce        | Sí                |
        | Clasificación       | Principal         |
        | Color de fondo      | #FFFFFF           |
        | Color de texto      | #000000           |
    Then Hago clic en Confirmar
    Then Deberia ver el mensaje Categoria creada exitosamente
    Then La nueva categoria deberia estar en la lista:
        | Nombre              | Electrónica       |
