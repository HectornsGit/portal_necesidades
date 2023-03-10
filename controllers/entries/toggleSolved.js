const { generateError } = require("../../helpers");
const selectEntryByIdQuery = require("../../ddbb/queries/entries/selectEntryByIdQuery");
const toggleSolvedQuery = require("../../ddbb/queries/entries/toggleSolvedQuery");

const toggleSolved = async (req, res, next) => {
  try {
    const { idEntry } = req.params;

    //seleccionamos la entry por el id
    const [entry] = await selectEntryByIdQuery(idEntry);
    const { user_id } = entry;
    const solved = entry.solved !== 1;
    //Si el usuario no es el creador no podrá editarla.
    if (user_id != req.user.id) {
      throw generateError("No tienes permisos");
    }
    //Llamamos a la función que modifica la entrada.
    await toggleSolvedQuery(entry);

    res.send({
      status: "ok",
      message: "Entrada modificada correctamente",
      data: {
        solved,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = toggleSolved;
