# Portal de necesidades

Aplicación CRUD en express, una biblioteca node.js y Mysql. Gestiona usuarios, publicaciones con archivos, comentarios con archivos y likes para estos últimos.

## Requisitos
- node.js
- Mysql
- cliente http cUrl o Postman(preferiblemente este último)

## Instrucciones
- Clona este repositorio.
- Crea una base de datos MySQL.
- Abre un terminal en la carpeta raíz e instala las dependencias escribiendo `npm i`.
- Crea un fichero ".env" siguiendo la plantilla ".envExample" y rellena los campos tal que `CAMPO=valor`.
- Inicia las tablas de la base de datos escribiendo `npm run initDB` en el terminal.
- Añade una imagen png "default_avatar.png" como la que encontrarás en la carpeta "uploads" a la carpeta de archivos subidos ("uploads" por defecto).
- Inicia el servidor introduciendo `npm run dev` en el terminal.
- Si utilizas postman como cliente http importa la colección que viene en el repositorio.
- Envía las peticiones http que desees a http://localhost:<puerto>/<endpoint>.

## Endpoints

### Usuarios

- POST `/users` Permite registrar al usuario (email, contraseña, nombre, bio, foto).
- POST `/users/login` Login de usuario(email,contraseña).
- GET `/users/:idUser` Devuelve la información de un usuario.
- PUT `/users` Edita la información del usuario (Solo usuario registrado).

### Entradas

- POST `/entries` Permite crear una entrada (Solo usuario registrado).
- GET `/entries` Permite ver las entradas actuales.
- GET `/entries?category=<categoría>` Permite ver las entradas filtrándolas por categorías.
- POST `/entries/:idEntry` Permite comentar una entrada (Solo usuario registrado).
- DELETE `/entries/:idEntry` Permite borrar una entrada (Solo usuario creador de la propia).

### Comentarios

- DELETE `/entries/:idEntry/:idComment` Permite borrar un comentario (Solo usuario creador).

### Likes

- POST `/entries/:idEntry/:idComment` Permite valorar un comentario (Solo usuario registrado).
- DELETE `/entries/:idEntry/:idComment/:idRating` Permite borrar una valoración (Solo usuario creador).

## Entidades

- User:

  - id
  - email
  - password
  - username
  - bio
  - avatar
  - registration_date

- Entries:

  - id
  - user_id
  - title
  - description
  - file_name
  - solved
  - category
  - creation_date

- comments:

  - id
  - user_id
  - entry_id
  - file_name
  - creation_date

- likes:

  - id
  - user_id
  - comment_id
  - creation_date
