const insertCommentQuery = require("../../ddbb/queries/comments/insertCommentQuery");
const { generateError, saveFile } = require("../../helpers");

const newComment = async (req, res, next) => {
  try {
    //Obtenemos la información necesaria de nuestra request.
    const { text } = req.body;
    const { idEntry } = req.params;
    const file = req.files.file;

    //Si no hay archivo, generamos un error.
    if (!file) {
      throw generateError("Falta adjuntar el archivo", 400);
    }

    //Guardamos el archivo y su nombre.
    const fileName = saveFile(file);

    //Llamamos a la función encargada de registrar el comentario en la base de datos.
    await insertCommentQuery(req.user.id, idEntry, text, fileName);

    res.send({
      status: "ok",
      message: "Comment creado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newComment;
