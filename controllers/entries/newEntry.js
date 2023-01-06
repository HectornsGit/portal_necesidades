const insertEntryQuery = require("../../ddbb/queries/entries/insertEntryQuery");

const { generateError, saveFile } = require("../../helpers");

const newEntry = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;
    const files = req.files;

    //Si falta alguno de estos campos generamos un error.
    if (!title || !description || !category || !files) {
      throw generateError("Faltan campos", 400);
    }

    //Guardamos el archivo a subir y su nombre.
    const fileName = saveFile(req.files.file);

    //Guardamos la entrada en la base de datos.
    await insertEntryQuery(title, description, fileName, category, req.user.id);

    res.send({
      status: "ok",
      message: "Entrada Creada",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newEntry;
