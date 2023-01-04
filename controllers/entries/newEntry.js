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

    const photos = [];

    if (req.files) {
      for (const photo of Object.values(req.files).slice(0, 3)) {
        const photoName = await savePhoto(photo, 1);

        photos.push(photoName);

        await insertPhotoQuery(photoName, idEntry);
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = newEntry;
