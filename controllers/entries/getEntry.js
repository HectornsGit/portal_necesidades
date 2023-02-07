const selectEntryByIdQuery = require("../../ddbb/queries/entries/selectEntryByIdQuery");
const selectAllCommentsFromEntryQuery = require("../../ddbb/queries/comments/selectAllCommentsFromEntryQuery");
const getEntry = async (req, res, next) => {
  try {
    const { idEntry } = req.params;

    //seleccionamos la entry por el id
    const entry = await selectEntryByIdQuery(idEntry);
    const comments = await selectAllCommentsFromEntryQuery(idEntry);
    res.send({
      status: "ok",
      data: {
        entry,
        comments,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getEntry;
