const selectAllEntriesQuery = require("../../ddbb/queries/entries/selectAllEntriesQuery");
const selectEntryByCategoryQuery = require("../../ddbb/queries/entries/selectEntryByCategoryQuery");

const listEntries = async (req, res, next) => {
  try {
    const { category } = req.query;
    let entries;

    //Si existe el parámetro "Category", buscamos solo las entradas de esa categoría.
    if (category) {
      entries = await selectEntryByCategoryQuery(category);
    }
    //Si no, se mostrarán todas.
    else {
      entries = await selectAllEntriesQuery();
    }
    res.send({
      status: "ok",
      data: {
        entries,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = listEntries;
