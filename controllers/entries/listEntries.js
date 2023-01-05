const selectAllEntriesQuery = require("../../ddbb/queries/entries/selectAllEntriesQuery");
const selectEntryByCategoryQuery = require("../../ddbb/queries/entries/selectEntryByCategoryQuery");

const listEntries = async (req, res, next) => {
  try {
    const { category } = req.query;
    let entries;
    if (category) {
      entries = await selectEntryByCategoryQuery(category);
    } else {
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
