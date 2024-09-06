# Restaurante La Sabrosita - Frontend

## Descripción del Proyecto

Este proyecto es el frontend para la aplicación de gestión del restaurante "La Sabrosita". Está desarrollado utilizando **Vue 3**, **Vite** y **Ant Design**. La aplicación permite a los usuarios iniciar sesión, registrarse y acceder a diferentes paneles de administración y clientes según sus roles.

## Tecnologías Usadas

- **Vue 3:** Framework de JavaScript para construir interfaces de usuario.
- **Vite:** Herramienta de construcción para un desarrollo rápido y eficiente.
- **Ant Design:** Biblioteca de componentes de UI para mejorar el diseño y la experiencia de usuario.
- **Axios:** Cliente HTTP para realizar solicitudes a la API backend.

## Estructura del Proyecto

- **`.vscode/`**: Configuración específica del entorno de desarrollo en Visual Studio Code.
  - **`extensions.json`**: Lista de extensiones recomendadas para el proyecto.
  - **`launch.json`**: Configuración para la depuración en Visual Studio Code.
  
- **`node_modules/`**: Dependencias instaladas del proyecto.

- **`public/`**: Archivos estáticos que se sirven directamente, como íconos.
  - **`LaSabrosita.ico`**: Ícono de la aplicación.

- **`src/`**: Código fuente del proyecto.
  - **`api/`**: Funciones para interactuar con la API backend.
    - **`auth.js`**: Funciones para autenticación.
    - **`axiosConfig.js`**: Configuración de Axios.
    - **`detallePedido.js`**: Funciones para detalles de pedidos.
    - **`pedido.js`**: Funciones para pedidos.
    - **`permission.js`**: Funciones para permisos.
    - **`producto.js`**: Funciones para productos.
    - **`roles.js`**: Funciones para roles.
    - **`usuario.js`**: Funciones para usuarios.
  - **`assets/`**: Archivos estáticos como CSS y imágenes.
    - **`auth/`**: Estilos específicos para autenticación.
      - **`common.css`**: Estilos comunes para formularios de autenticación.
    - **`fondo.jpg`**: Imagen de fondo.
    - **`global.css`**: Estilos globales de la aplicación.
    - **`logo.png`**: Logo de la aplicación.
  - **`components/`**: Componentes reutilizables.
    - **`auth/`**: Componentes relacionados con autenticación.
      - **`ForgotPasswordForm.vue`**: Componente para recuperar la contraseña.
      - **`LoginFormComponent.vue`**: Componente para el formulario de inicio de sesión.
      - **`RegisterFormComponent.vue`**: Componente para el formulario de registro.
      - **`ResetPasswordForm.vue`**: Componente para restablecer la contraseña.
    - **`user/`**: Componentes relacionados con usuarios.
      - **`ConfirmDeleteModal.vue`**: Modal para confirmar la eliminación de un usuario.
      - **`UserDetailsModal.vue`**: Modal para mostrar detalles de un usuario.
      - **`UserFormModal.vue`**: Modal para el formulario de usuario.
    - **`Utils/`**: Componentes y utilidades generales.
      - **`CrudTable.vue`**: Componente para tablas CRUD.
      - **`tableUtils.js`**: Utilidades para manejar tablas.
  - **`router/`**: Configuración de las rutas de Vue Router.
    - **`index.js`**: Archivo principal de configuración de rutas.
  - **`views/`**: Vistas principales de la aplicación.
    - **`Admin/`**: Vistas para el panel de administración.
      - **`AdminDashboardDetallePedidos.vue`**: Vista para detalles de pedidos en el panel de administración.
      - **`AdminDashboardHome.vue`**: Vista principal del panel de administración.
      - **`AdminDashboardPedidos.vue`**: Vista para gestión de pedidos en el panel de administración.
      - **`AdminDashboardPermisos.vue`**: Vista para gestión de permisos en el panel de administración.
      - **`AdminDashboardProductos.vue`**: Vista para gestión de productos en el panel de administración.
      - **`AdminDashboardProfile.vue`**: Vista para perfil del administrador.
      - **`AdminDashboardRoles.vue`**: Vista para gestión de roles en el panel de administración.
      - **`AdminDashboardUsuarios.vue`**: Vista para gestión de usuarios en el panel de administración.
    - **`Cliente/`**: Vistas para clientes.
      - **`ClienteDashboardHome.vue`**: Vista principal del panel del cliente.
      - **`ClienteDashboardPedidos.vue`**: Vista para gestión de pedidos en el panel del cliente.
      - **`ClienteDashboardProfile.vue`**: Vista para perfil del cliente.
    - **`AdminDashboard.vue`**: Vista principal para administradores.
    - **`ClienteDashboard.vue`**: Vista principal para clientes.
    - **`ForgotPassword.vue`**: Vista para recuperar la contraseña.
    - **`LoginPage.vue`**: Vista de inicio de sesión.
    - **`RegisterPage.vue`**: Vista de registro.
    - **`ResetPassword.vue`**: Vista para restablecer la contraseña.
  - **`App.vue`**: Componente raíz de la aplicación.
  - **`main.js`**: Archivo de entrada de la aplicación.

- **`.gitignore`**: Archivos y directorios que Git debe ignorar.

- **`babel.config.js`**: Configuración de Babel para la transpilación del código.

- **`eslint.config.js`**: Configuración de ESLint para el linting del código.

- **`index.html`**: Archivo HTML principal de la aplicación.

- **`jsconfig.json`**: Configuración de JavaScript para el editor.

- **`package-lock.json`**: Archivo de bloqueo de dependencias.

- **`package.json`**: Archivo de configuración de npm y dependencias del proyecto.

- **`README.md`**: Este archivo.

- **`vite.config.js`**: Configuración de Vite para la construcción y el desarrollo del proyecto.

## Características Implementadas

- **Inicio de Sesión:** Componente de inicio de sesión con validación y manejo de errores.
- **Registro de Usuarios:** Componente de registro de nuevos usuarios.
- **Panel de Cliente:** Vista para clientes con acceso a sus pedidos.
- **Panel de Administrador:** Vista para administradores con acceso a funcionalidades adicionales.
- **Manejo de Sesión:** Almacenamiento de datos de usuario y token JWT en `localStorage`.

## Estado Actual del Proyecto

- **Características Completas:**
  - Inicio de sesión y registro de usuarios.
  - Interfaz para clientes y administradores.
  - Manejo de pedidos y funcionalidades básicas del dashboard.

- **Problemas Resueltos:**
  - Errores de validación en el inicio de sesión y registro.
  - Configuración de estilos y componentes.

- **Cambios Significativos:**
  - Implementación de autenticación con JWT.
  - Refactorización de componentes para mejorar la reutilización y mantenibilidad del código.

## Documentación de Componentes

### `LoginPage.vue`
- **Descripción:** Vista de inicio de sesión que permite a los usuarios autenticarse.
- **Componentes:**
  - `LoginFormComponent.vue`: Componente de formulario de inicio de sesión.
- **Estilos:** 
  - Utiliza `common.css` para estilos generales.
- **Modificaciones Recientes:**
  - Cambiado el nombre del componente a `LoginView.vue` para cumplir con la convención de nombres multi-palabra.

### `RegisterPage.vue`
- **Descripción:** Vista de registro de nuevos usuarios.
- **Componentes:**
  - `RegisterFormComponent.vue`: Componente de formulario de registro.
- **Estilos:**
  - Utiliza `common.css` para estilos generales.
- **Modificaciones Recientes:**
  - Cambiado el nombre del componente a `RegisterView.vue` para cumplir con la convención de nombres multi-palabra.

## Documentación de la API

### `pedido.js`
- **Descripción:** Funciones para interactuar con la API de pedidos.
- **Endpoints Implementados:**
  - **Obtener pedidos asignados a un domiciliario:** `GET /pedidos/asignados/domiciliario/:domiciliarioId`
  - **Contar pedidos completados por un domiciliario:** `GET /pedidos/completados/domiciliario/:domiciliarioId`
  - **Obtener pedidos asignados a un empleado:** `GET /pedidos/asignados/empleado/:empleadoId`
  - **Contar pedidos completados por un empleado:** `GET /pedidos/completados/empleado/:empleadoId`
  - **Obtener todos los pedidos:** `GET /pedidos`
  - **Eliminar un pedido:** `DELETE /pedidos/:id`
  - **Actualizar un pedido:** `PUT /pedidos/:id`
  - **Crear un nuevo pedido:** `POST /pedidos`
- **Modificaciones Recientes:**
  - Eliminado el `try/catch` innecesario para simplificar el manejo de errores.
  - Actualizado el manejo de errores para registrar mensajes más detallados.

## Configuración del Entorno de Desarrollo

1. **Clonar el Repositorio:**
   ```bash
   git clone https://gitlab.com/laortiz937/lasabrosita.git
2. **Instalar Dependencias:**
   cd frontend
   npm install
3. **Iniciar el Servidor de Desarrollo:**
   npm run dev
4. **Acceder a la Aplicación:**
   Abre tu navegador y visita http://localhost:3000 para ver la aplicación en funcionamiento.

## Contribuciones
Las contribuciones son bienvenidas. Por favor, sigue el flujo de trabajo estándar de Git para enviar pull requests y reportar problemas.

## Licencia
Este proyecto está licenciado bajo la MIT License.

## Contacto
Para más información, puedes contactar al equipo de desarrollo a través del correo electrónico: contacto@lasabrosita.com