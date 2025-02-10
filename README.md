# Librería Cybrary

## Instalación

Instalar Front-end de la Librería Cybrary con npm

```bash
  git clone https://github.com/Lucascabral95/libreria-cybrary
  cd gestion-de-inventario
  npm install 
  npm run dev
```
 
## 🌟 Descripción

Este es el **frontend** de la librería **Cybrary**, una plataforma web donde se exhiben todos los libros con su información detallada e ilustraciones, organizados por **categorías y autores**. Además, incluye un **buscador dinámico** para filtrar por autor, categoría y título, y una sección con información de los autores junto con sus fotos. 

También cuenta con un sistema de **login y registro** para empleados, así como una completa **gestión de inventario**, que permite agregar, modificar, actualizar y eliminar **productos, categorías, autores, proveedores y movimientos** dentro del sistema.

## ⚙️ Características Principales:

- **📚 Gestión de Libros**: Permite agregar, actualizar, eliminar y consultar libros en la librería, cada uno con su propia imagen ilustrativa.
- **🛒 Proveedores**: Control y administración de los proveedores de libros y otros recursos.
- **👥 Empleados y Administradores**: Gestión de empleados con diferentes roles y privilegios de acceso.
- **📂 Categorías de Libros**: Organización de los libros según sus categorías.
- **✍️ Autores**: Registro y administración de autores de los libros, con sus respectivas fotos.
- **🔄 Movimientos de la Librería**: Seguimiento de transacciones y actividades internas, tanto de ventas a clientes como de compras a proveedores.
- **📊 Dashboard Administrativo**: Información clave sobre cantidad de productos, proveedores, empleados, libros más vendidos con sus montos en $, etc.
- **🔒 Autenticación Segura**: Implementada mediante **JSON Web Tokens (JWT)** y **cookies HTTP-only** para proteger las rutas de acceso.

## 🔒 Seguridad y Autenticación:

- **JWT con Passport**: Se genera un token JWT con los datos del usuario autenticado.
- **Cookies HTTP-only**: Almacena el token en una cookie segura para permitir autenticación en rutas protegidas.
- **Control de Privilegios**: Acceso restringido a ciertas acciones según el rol del usuario (**administrador o empleado**).

## 📝 Conclusión:

Esta plataforma proporciona una solución robusta y escalable para la **gestión integral de una librería**, asegurando un control eficiente de los recursos y una experiencia optimizada para empleados y administradores. Gracias a su **autenticación segura**, su integración con **Neon Serverless PostgreSQL** y su sistema de gestión de inventario, **Cybrary** garantiza un entorno confiable, accesible y flexible para la administración de una librería moderna.

## 🚀 Tecnologías Utilizadas

- **Next.js**: Framework de React que permite renderizado del lado del servidor y optimización de páginas.
- **Nest.js**: Framework de Node.js para la construcción de APIs escalables y mantenibles.
- **Neon Serverless PostgreSQL**: Base de datos relacional serverless para almacenar información de usuarios y libros.
- **Passport.js con JWT**: Middleware de autenticación flexible y modular para la gestión de sesiones seguras.
- **TypeScript**: Superset de JavaScript que añade tipado estático y otras funcionalidades avanzadas para mejorar la calidad y el mantenimiento del código.
- **Zustand**: Librería de gestión de estado para manejar de forma eficiente el estado global de la aplicación.
- **Zod**: Biblioteca de validación de datos que permite definir esquemas estrictos para formularios y entradas de datos.

## 💌 Contacto

Si tenés alguna pregunta o sugerencia, no dudes en contactarme a través de:
- **Correo**: [lucassimple@hotmail.com](mailto:lucassimple@hotmail.com)
- **GitHub**: [https://github.com/Lucascabral95](https://github.com/Lucascabral95)
- **Linkedin**: [https://www.linkedin.com/in/lucas-gast%C3%B3n-cabral/](https://www.linkedin.com/in/lucas-gast%C3%B3n-cabral/)

## 📝 Notas:

Se han implementado los siguientes módulos para una mejor organización del sistema:
- **Auth**: Manejo de autenticación y seguridad.
- **Product**: Gestión de libros y productos relacionados.
- **Author**: Registro y administración de autores.
- **Category**: Organización de libros por categorías.
- **Supplier**: Administración de proveedores.
- **Stock_movement**: Control y seguimiento de movimientos en el inventario.

## 🗝 Aclaración:
El acceso a la creación de usuarios y a las funcionalidades del **ERP (Enterprise Resource Planning)** está restringido exclusivamente al administrador de la página. El login de éste se encuentra en ***/API/AUTH/LOGIN***.  
Si desea realizar una prueba completa del sistema, puede solicitar las credenciales de acceso al desarrollador, **Lucas Cabral**, enviando un correo a **Lucassimple@hotmail.com** o un mensaje a [**LinkedIn - Lucas Gastón Cabral**](https://www.linkedin.com/in/lucas-gast%C3%B3n-cabral/). 