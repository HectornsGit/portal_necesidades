const selectEntryByIdQuery = require("../../ddbb/queries/entries/selectEntryByIdQuery");
const selectAllCommentsFromEntryQuery = require("../../ddbb/queries/comments/selectAllCommentsFromEntryQuery");
const selectLikeByUserQuery = require("../../ddbb/queries/likes/selectLikeByUserQuery");
const jwt = require("jsonwebtoken");

const getEntry = async (req, res, next) => {
  try {
    const { idEntry } = req.params;
    const { authorization } = req.headers;

    //seleccionamos la entry por el id
    const entry = await selectEntryByIdQuery(idEntry);

    //seleccionamos todos los comments por el id de la entry
    const comments = await selectAllCommentsFromEntryQuery(idEntry);

    // let likes;

    // if (Object.entries(authorization).length > 0) {
    //   let tokenInfo;

    //   tokenInfo = jwt.verify(authorization, process.env.SECRET);

    //   likes = await selectLikeByUserQuery(tokenInfo.id);
    // }

    // for (let comment of comments) {
    //   for (let like of likes)
    //     comment.isLiked = like.comment_id === comment.id ? true : false;
    // }

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
