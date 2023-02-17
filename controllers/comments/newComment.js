const insertCommentQuery = require("../../ddbb/queries/comments/insertCommentQuery");
const selectUserByIdQuery = require("../../ddbb/queries/users/selectUserByIdQuery");
const { generateError, saveFile } = require("../../helpers");

const newComment = async (req, res, next) => {
  try {
    //Obtenemos la información necesaria de nuestra request.
    const { text } = req.body;
    const { idEntry } = req.params;

    const file = req.files?.file;
    let fileName;
    //Guardamos el archivo y su nombre.
    if (req.files) {
      fileName = saveFile(file);
    }

    //Llamamos a la función encargada de registrar el comentario en la base de datos.
    const idComment = await insertCommentQuery(
      req.user.id,
      idEntry,
      text,
      fileName
    );

    //Llamamos a la función de seleccionar usuarios para poder devolver
    //en la respuesta el avatar y el nombre del usuario que creo el comentario.

    const userData = await selectUserByIdQuery(req.user.id);

    res.send({
      status: "ok",
      message: "Comment creado",
      data: {
        id: idComment,
        idUser: req.user.id,
        text,
        file_name: fileName,
        creation_date: new Date(),
        avatar: userData.avatar,
        username: userData.username,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newComment;
