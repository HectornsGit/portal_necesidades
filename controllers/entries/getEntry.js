const selectEntryByIdQuery = require("../../ddbb/queries/entries/selectEntryByIdQuery");

const getEntry = async (req, res, next) => {
  try {
    const { idEntry } = req.params;

    //seleccionamos la entry por el id
    const entry = await selectEntryByIdQuery(idEntry);

    res.send({
      status: "ok",
      data: {
        entry,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getEntry;
