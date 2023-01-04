require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const cors = require("cors");
const { PORT, UPLOADS_DIR } = process.env;
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
} = require("./controllers/users/index");

// Registrar un nuevo usuario.
app.post("/users", newUser);

// Logear un usuario y retornar un token.
app.post("/users/login", loginUser);

// Obtener información sobre el usuario del token.
app.get("/users/");
//Obtener información sobre un usuario
app.get("/users/:idUser", getUser);

// Editar avatar de usuario.
app.put("/users/avatar", isAuth, editAvatar);

/**
 * ##########################
 * ## Controladores entries ##
 * ##########################
 */
const {
  newEntry,
  listEntries,
  voteEntry,
} = require("./controllers/entries/index");

// Crear una nueva entrada.
app.post("/entries", isAuth, newEntry);

// Listar todas las entradas.
app.get("/entries", listEntries);

// Obtener información de una entrada concreta.
app.get("/entries/:idEntry");

// Votar una entrada.
app.post("/entries/:idEntry/votes", isAuth, voteEntry);

/**
 * ###################################
 * ## Middelware de error/ not fund ##
 * ###################################
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
