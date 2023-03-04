require("dotenv").config();
const path = require("path");
const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const cors = require("cors");
const isAuth = require("./middlewares/isAuth");
const isUser = require("./middlewares/isUser");

const { PORT, UPLOADS_DIR } = process.env;
const app = express();

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.use(fileUpload());

// Middleware que indica cuál es el directorio de ficheros estáticos.
app.use(express.static("uploads"));

//Comprobación de que es una petición con token
app.use(isAuth);

/**
 * ############################
 * ## Controladores usuarios ##
 * ############################
 */

const {
  loginUser,
  newUser,
  getUser,
  editAvatar,
  editUser,
} = require("./controllers/users/index");

// Registrar un nuevo usuario.
app.post("/users", newUser);

// Logear un usuario y retornar un token.
app.post("/users/login", loginUser);

// Obtener información sobre el usuario del token.
app.get("/users");

//Obtener información sobre un usuario
app.get("/users/:idUser", getUser);

//Editar el usuario
app.put("/users", isUser, editUser);

// Editar avatar de usuario.
app.put("/users/avatar", isUser, editAvatar);

/**
 * ############################
 * ## Controladores entradas ##
 * ############################
 */
const {
  newEntry,
  listEntries,
  getEntry,
  deleteEntry,
  toggleSolved,
} = require("./controllers/entries/index");

// Crear una nueva entrada.
app.post("/entries", isUser, newEntry);

//Marcar una entrada como resuelta
app.put("/entries/:idEntry", isUser, toggleSolved);

// Listar todas las entradas.
app.get("/entries", listEntries);

// Obtener información de una entrada concreta.
app.get("/entries/:idEntry", getEntry);

//Borrar una entrada
app.delete("/entries/:idEntry", isUser, deleteEntry);

/**
 * ###############################
 * ## Controladores comentarios ##
 * ###############################
 */

const { newComment, deleteComment } = require("./controllers/comments/index");

// Crear un nuevo comentario.
app.post("/entries/:idEntry", isUser, newComment);

//Borrar un comentario
app.delete("/entries/:idEntry/:idComment", isUser, deleteComment);

/**
 * ################################
 * ## Controladores Valoraciones ##
 * ################################
 */

const { newLike } = require("./controllers/likes/index");

//Crear una nueva valoración.
app.post("/entries/:idEntry/:idComment", isUser, newLike);

/**
 * ####################################
 * ## Middelware de error/ not found ##
 * ####################################
 */

//Middelware de error.
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).send({
    status: "error",
    message: err.message,
  });
});

//Middelware de ruta no encontrada.
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Ruta no encontrada",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at PORT: ${PORT}`);
});
