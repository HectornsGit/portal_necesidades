const insertEntryQuery = require("../../ddbb/queries/entries/insertEntryQuery");

const { generateError, saveFile } = require("../../helpers");

const newEntry = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;

    //Si falta alguno de estos campos generamos un error.
    if (!title || !description || !category) {
      throw generateError("Faltan campos", 400);
    }

    //Declaramos la variable donde irá el nombre de nuestro archivo.
    let fileName;

    if (req.files) {
      fileName = saveFile(req.files?.file);
    }

    //Guardamos la entrada en la base de datos.
    const idEntry = await insertEntryQuery(
      title,
      description,
      fileName,
      category,
      req.user.id
    );

    res.send({
      status: "ok",
      message: "Entrada Creada",
      data: {
        idUser: req.user.id,
        id: idEntry,
        title,
        description,
        file_name: fileName,
        category,
        creation_date: new Date(),
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newEntry;
