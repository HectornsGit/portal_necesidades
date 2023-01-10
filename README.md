# Portal de necesidades

Backend de un portal donde se pide ayuda para diferentes problemas (editar una imagen, traducir un texto...) y otra persona puede solucionarlas.

## Es necesario Introducir en la carpeta uploads un avatar predeterminado con el nombre "default_avatar.png" !!!

## Endpoints de usuario

- POST [/users] Permite registrar al usuario (email, contraseña, nombre, bio,foto) ✅
- POST [/users/login] Login de usuario(email,contraseña) ✅
- GET [/users/:idUser] Devuelve la información de un usuario ✅
- (OPCIONAL)PUT [/users] Edita la información del usuario **TOKEN**✅

## Endpoints de entries

- POST [/entries] Permite crear una entrada **TOKEN** ✅
- GET [/entries] Permite ver las entradas actuales ✅
- GET [/entries?category=Otros] Permite ver las entradas filtrándolas por categorías ✅
- POST [/entries/:idEntry] Permite comentar una entrada **TOKEN** ✅
- POST [/entries/:idEntry/:idComment] Permite valorar un comentario **TOKEN**✅
- (OPCIONAL)##DELETE[/entries/:idEntry] Permite borrar una entrada **TOKEN**✅
- (OPCIONAL)##DELETE[/entries/:idEntry/:idComment] Permite borrar un comentario **TOKEN**✅
- (OPCIONAL)##DELETE[/entries/:idEntry/:idComment/:idRating] Permite borrar una valoración **TOKEN**✅

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

- ratings:

  - id
  - user_id
  - comment_id
  - rating
  - creation_date
