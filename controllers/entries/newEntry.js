const insertEntryQuery = require("../../ddbb/queries/entries/insertEntryQuery");
const insertPhotoQuery = require("../../ddbb/queries/entries/insertPhotoQuery");

const { generateError, savePhoto } = require("../../helpers");

const newEntry = async (req, res, next) => {
  try {
    const { title, description, file_name, category } = req.body;

    if (!title || !description || !file_name || !category) {
      throw generateError("Faltan campos", 400);
    }

    const idEntry = await insertEntryQuery(
      title,
      description,
      file_name,
      category,
      req.user.id
    );

    //TEMPORAL
    if (req.files?.length == 1) {
      const photoName = await savePhoto(req.files, 1);
      await insertPhotoQuery(photoName, idEntry);
    }

    res.send({
      status: "ok",
      message: "Entrada Creada",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newEntry;
