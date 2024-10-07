# API_Chat

**API_Chat** es una aplicación backend diseñada para gestionar chats y mensajes entre usuarios, proporcionando funcionalidades de registro, modificación y eliminación tanto de mensajes como de chats completos. Esta API está basada en el modelo cliente-servidor y está pensada para ser consumida por aplicaciones web o móviles.

## Tecnologías utilizadas

- **Framework:** Adonis.js 5
- **Node.js:** v18.13.0
- **Socket.io:** v4.8.0
- **MongoDB:** Mongoose v8.5.3
- **Autenticación personalizada:** Implementación de hash y verificación de usuarios propia
- **Manejo de zona horaria:** Middleware personalizado

## Funcionalidades principales

### Usuarios

- **CRUD de usuarios:** Permite la creación, actualización y eliminación de usuarios.
- **Login y Logout:** Proceso de autenticación para los usuarios.
- **Verificación de contraseñas:** Utilizando una implementación personalizada de hashing.

### Chats

- **Store:** Crear un nuevo chat entre usuarios.
- **Index:** Obtener la lista de todos los chats asociados a un usuario.
- **Destroy:** Eliminar un chat específico.

### Mensajes

- **Show:** Visualizar los mensajes dentro de un chat específico.
- **Store:** Enviar un nuevo mensaje dentro de un chat.
- **Update:** Actualizar el contenido de un mensaje existente.
- **Destroy:** Eliminar un mensaje específico.

### Middleware

- **Manejo de zona horaria:** Un middleware personalizado ajusta las respuestas según la zona horaria del usuario para fechas y horas.

## Instalación

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/Jesus-Aranda-Rdz/Api_Chat.git
   ```

2. **Accede al directorio del proyecto**:

   ```bash
   cd API_Chat
   ```

3. **Instala las dependencias**:

   ```bash
   npm install
   ```

4. **Configura el entorno**:

   Copia el archivo `.env.example` a `.env` y modifica las variables necesarias, como la conexión a la base de datos MongoDB.

5. **Ejecuta las migraciones** (si las tienes configuradas):

   ```bash
   node ace migration:run
   ```

   6. **Ejecuta los seeders** :

   ```bash
   node ace db:seed
   ```

6. **Inicia el servidor**:

   ```bash
   node ace serve
   ```

   El servidor estará corriendo en `http://localhost:3333`.

## Uso de la API

### Autenticación

- **Login:** `api/v1/login` (POST)
- **Logout:** `api/v1/logout` (POST)

### Usuarios

- **Lista de usuario:** `api/v1/users` (GET)
- **Crear usuario:** `api/v1/users` (POST)
- **Actualizar usuario:** `api/v1/users/:id` (PUT)
- **Eliminar usuario:** `api/v1/users/:id` (DELETE)
- **Obtener detalles de usuario:** `api/v1/users/:id` (GET)

### Chats

- **Crear chat:** `api/v1/chats` (POST)
- **Listar chats del usuario:** `api/v1/chats` (GET)
- **Eliminar chat:** `api/v1/chats/:id` (DELETE)

### Mensajes

- **Ver mensajes de un chat:** `api/v1/messages/:id` (GET)
- **Enviar mensaje:** `api/v1/messages` (POST)
- **Actualizar mensaje:** `api/v1/messages/:id` (PUT)
- **Eliminar mensaje:** `api/v1/messages/:id` (DELETE)

## Notificaciones en tiempo real

Utilizamos **Socket.io** para enviar y recibir notificaciones en tiempo real cuando se envían nuevos mensajes o se actualizan chats.


## Licencia

Este proyecto está bajo la licencia MIT.

---

Este archivo README incluye una descripción clara del proyecto, los pasos para instalar y ejecutar la aplicación, las rutas principales de la API, y detalles sobre las funcionalidades clave.
