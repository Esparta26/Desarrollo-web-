# Retrospectiva - StyleHub (Sprint 7)
**Metodología:** Starfish (Estrella de Mar)
**Fecha:** 23 de Mayo de 2026

---

## 1. Comenzar a hacer (Start Doing)
* **Validaciones tempranas de entorno:** Empezar a revisar de forma obligatoria el estado de los servicios locales (como XAMPP/MySQL) antes de iniciar las jornadas de desarrollo para evitar pérdidas de tiempo por errores de conexión (`ECONNREFUSED`).
* **Pruebas de APIs en crudo:** Implementar pruebas manuales en el navegador o Postman de los endpoints apenas se mapeen los modelos en Sequelize, antes de avanzar al diseño visual.

## 2. Hacer más (More of)
* **Coordinación y control de cambios en la Base de Datos:** Documentar de inmediato en el equipo si se agregan o quitan columnas o tablas (como sucedió con la tabla/modelo `Brand`) para evitar conflictos de columnas inexistentes (`ER_BAD_FIELD_ERROR`) que congelen el avance del backend.
* **Uso de condicionales seguros en vistas EJS:** Asegurar que las variables de sesión compartidas (como `locals.userLogged`) siempre tengan validaciones de existencia antes de aplicar métodos de strings (`.split()`) en el frontend.

## 3. Continuar haciendo (Keep Doing)
* **Validación en dos capas:** Mantener la arquitectura de seguridad validando los datos tanto en el cliente (JavaScript en el navegador para mejorar la experiencia de usuario) como en el servidor (Express Validator para blindar la base de datos).
* **Uso de frameworks CSS modernos:** Seguir utilizando Tailwind CSS para estructurar los mensajes de error dinámicos de forma limpia, manteniendo la estética urbana y minimalista de la tienda.

## 4. Hacer menos (Less of)
* **Modificaciones directas sobre archivos estructurales sin aviso:** Reducir la práctica de alterar archivos compartidos como `models/index.js` o inyectar asociaciones en los modelos individuales sin previa sincronización con el encargado del flujo del servidor.

## 5. Dejar de hacer (Stop Doing)
* **Uso de atributos 'required' nativos sueltos:** Dejar de depender del comportamiento por defecto del HTML5 para los formularios importantes, delegando el control total a los scripts de JavaScript personalizados para poder mostrar alertas estilizadas bajo los inputs.
