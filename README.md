# portal_necesidades
Backend de un portal donde se pide ayuda para diferentes problemas (editar una imagen, traducir un texto...) y otra persona puede solucionarlas.

##Endpoints de usuario

#POST [/users] Endpoint que permita registrar al usuario (email, contraseña, nombre, bio,foto)
#POST [/users/login] Endpoint de login de usuario(email,contraseña)
#GET [/users] Endpoint que devuelve la información del usuario **TOKEN**
(OPCIONAL)#PUT [/users] Endpoint para editar la información del usuario **TOKEN**

##Endpoints de entries

##POST [/entries] Endpoint que permita crear una entrada **TOKEN**
##GET [/entries] Endpoint que permite ver las entradas actuales
##POST [/entries/:idEntry] Endpoint que permite comentar una entrada **TOKEN**
(OPCIONAL)##DELETE[/entries/:idEntry] Endpoint que permite borrar una entrada **TOKEN**


-Entidades

user
  
