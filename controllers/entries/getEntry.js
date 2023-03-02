const selectEntryByIdQuery = require("../../ddbb/queries/entries/selectEntryByIdQuery");
const selectAllCommentsFromEntryQuery = require("../../ddbb/queries/comments/selectAllCommentsFromEntryQuery");
const selectCommentByIdQuery = require("../../ddbb/queries/comments/selectCommentByIdQuery");
const getEntry = async (req, res, next) => {
  try {
    const { idEntry } = req.params;

    //seleccionamos la entry por el id
    const entry = await selectEntryByIdQuery(idEntry);

    //seleccionamos todos los comments por el id de la entry
    const comments = await selectAllCommentsFromEntryQuery(idEntry, req.user);

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
