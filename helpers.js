const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");
const { v4: uuid } = require("uuid");
const { UPLOADS_DIR } = process.env;
/**
 * ################
 * ## Save Photo ##
 * ################
 */

const savePhoto = async (img, imgType = 0) => {
  const uploadsPath = path.join(__dirname, UPLOADS_DIR);

  try {
    await fs.access(uploadsPath);
  } catch {
    await fs.mkdir(uploadsPath);
  }

  const sharpImg = sharp(img.data);

  if (!imgType) {
    sharpImg(180);
  }

  const imgName = `${uuid()}.jpg`;

  const imgPath = path.join(uploadsPath, imgName);

  await sharpImg.toFile(imgPath);

  return imgName;
};

/**
 * ##################
 * ## Delete Photo ##
 * ##################
 */

const deletePhoto = async (imgName) => {
  try {
    const photoPath = path.join(__dirname, UPLOADS_DIR, imgName);

    try {
      await fs.access(photoPath);
    } catch {
      return;
    }

    await fs.unlink(photoPath);
  } catch {
    throw generateError("Error al eliminar la imagen del servidor");
  }
};

/**
 * ####################
 * ## GENERATE ERROR ##
 * ####################
 */

const generateError = (msg, status) => {
  const err = new Error(msg);
  err.statusCode = status;
  return err;
};

module.exports = { generateError, savePhoto, deletePhoto };
