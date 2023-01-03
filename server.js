require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const cors = require("cors");
const { PORT } = process.env;
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

const { loginUser, newUser } = require("./controllers/users/index");

// Registrar un nuevo usuario.
app.post("/users", newUser);

// Logear un usuario y retornar un token.
app.post("/users/login", loginUser);

// Obtener información sobre el usuario del token.
app.get("/users/");

/**
 * ##########################
 * ## Controladores entries ##
 * ##########################
 */

// Crear una nueva entrada.
app.post("/entries");

// Listar todas las entradas.
app.get("/entries", (req, res) => {});

// Obtener información de una entrada concreta.
app.get("/entries/:idEntry");

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
