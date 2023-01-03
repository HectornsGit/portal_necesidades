# Portal de necesidades

- Backend de un portal donde se pide ayuda para diferentes problemas (editar una imagen, traducir un texto...) y otra persona puede solucionarlas.

## Endpoints de usuario

- POST [/users] Permite registrar al usuario (email, contraseña, nombre, bio,foto)
- POST [/users/login] Login de usuario(email,contraseña)
- GET [/users] Devuelve la información del usuario **TOKEN**
- (OPCIONAL)PUT [/users] Edita la información del usuario **TOKEN**

## Endpoints de entries

- POST [/entries] Permite crear una entrada **TOKEN**
- GET [/entries] Permite ver las entradas actuales
- POST [/entries/:idEntry] Permite comentar una entrada **TOKEN**
- (OPCIONAL)##DELETE[/entries/:idEntry] Permite borrar una entrada **TOKEN**

## Entidades

\***\*\*\*\*\*\*\***FALTA ACABAR ESTE CAMPO\***\*\*\*\*\*\*\***

- User:

  - id
  - email
  - password
  - avatar
  - role
  - createdAt
  - modifiedAt

- Tweet:

  - id
  - idUser
  - text
  - image (opcional)
  - createdAt

- Likes:

  - id
  - idUser
  - idTweet
  - createdAt
