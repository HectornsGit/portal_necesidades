const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");
const { v4: uuid } = require("uuid");
const { UPLOADS_DIR } = process.env;
/**
 * ##################
 * ## Save Avatar  ##
 * ##################
 */
//Función que nos permite redimensionar y guardar los avatares.
//----------------------------------------------------------------------------------------------------------//
const saveAvatar = async (img) => {
  //Guardamos el directorio en una variable.
  const uploadsPath = path.join(__dirname, UPLOADS_DIR);

  try {
    //Comprobamos que exista el directorio y si no, lo creamos.
    await fs.access(uploadsPath);
  } catch {
    await fs.mkdir(uploadsPath);
  }
  //Convertimos el avatar en un objeto Sharp.
  const sharpImg = sharp(img.data);

  //Cambiamos el tamaño para que se ajuste al perfil.
  sharpImg.resize(180);

  //Generamos un nombre único y aleatorio para el avatar.
  const imgName = `${uuid()}.jpg`;

  //Guardamos la ruta donde va a ir nuestra imagen.
  const imgPath = path.join(uploadsPath, imgName);

  //Convertimos la imagen de vuelta.
  await sharpImg.toFile(imgPath);

  //Devolvemos el nombre para luego guardarlo en la base de datos.
  return imgName;
};

/**
 * ##################
 * ## Delete File  ##
 * ##################
 */

const deleteFile = async (fileName) => {
  try {
    const filePath = path.join(__dirname, UPLOADS_DIR, fileName);
    try {
      await fs.access(filePath);
    } catch {
      return;
    }

    await fs.unlink(filePath);
  } catch {
    throw generateError("Error al eliminar el archivo del servidor");
  }
};

/**
 * ####################
 * ##    Save File   ##
 * ####################
 */
//Función que nos permite guardar archivos en el disco duro y devuelve el nombre con el que se han guardado.
//----------------------------------------------------------------------------------------------------------//

const saveFile = (file) => {
  try {
    //Guardamos el archivo en una variable.
    let newFile = file;
    //Le añadimos la fecha al nombre del archivo para asegurarnos que no hay dos iguales.
    const fileName = `${new Date().toDateString().replaceAll(" ", "-")}-${
      newFile.name
    }`;

    //Guardamos el archivo en el servidor.
    newFile.mv(`./uploads/${fileName}`);

    //Devolvemos su nombre para guardarlo en la base de datos.
    return fileName;
  } catch (err) {
    throw generateError("Hubo un error al subir el archivo");
  }
};

/**
 * ####################
 * ## GENERATE ERROR ##
 * ####################
 */
//Función que nos permite manejar los errores.
//----------------------------------------------------------------------------------------------------------//
const generateError = (msg, status) => {
  const err = new Error(msg);
  err.statusCode = status;
  return err;
};

module.exports = { generateError, saveAvatar, deleteFile, saveFile };
