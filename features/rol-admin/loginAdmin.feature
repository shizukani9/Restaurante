
Feature: Escenarios relacionados con el login

  Scenario: Un administrador puede iniciar sesión con sus credenciales
    Given configuro las credenciales de inicio de sesión
    When intento iniciar sesión en la aplicación
    Then debería ver la página de Introducción