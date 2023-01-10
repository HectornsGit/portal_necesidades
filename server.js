require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const cors = require("cors");
const { PORT } = process.env;
const isAuth = require("./middlewares/isAuth");
const app = express();

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.use(fileUpload());

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
app.get("/users/");

//Obtener información sobre un usuario
app.get("/users/:idUser", getUser);

//Editar el usuario
app.put("/users/", isAuth, editUser);

// Editar avatar de usuario.
app.put("/users/avatar", isAuth, editAvatar);

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
app.post("/entries", isAuth, newEntry);

//Marcar una entrada como resuelta
app.put("/entries/:idEntry", isAuth, toggleSolved);

// Listar todas las entradas.
app.get("/entries", listEntries);

// Obtener información de una entrada concreta.
app.get("/entries/:idEntry", getEntry);

//Borrar una entrada
app.delete("/entries/:idEntry", isAuth, deleteEntry);

/**
 * ###############################
 * ## Controladores comentarios ##
 * ###############################
 */

const { newComment, deleteComment } = require("./controllers/comments/index");

// Crear un nuevo comentario.
app.post("/entries/:idEntry", isAuth, newComment);

//Borrar un comentario
app.delete("/entries/:idEntry/:idComment", isAuth, deleteComment);

/**
 * ################################
 * ## Controladores Valoraciones ##
 * ################################
 */

const { newRating, deleteRating } = require("./controllers/ratings/index");

//Crear una nueva valoración.
app.post("/entries/:idEntry/:idComment", isAuth, newRating);
//Borrar una valoración.
app.delete("/entries/:idEntry/:idComment/:idRating", isAuth, deleteRating);

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
