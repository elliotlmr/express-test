const Memo = require("../modules/memo");

exports.create = async (req, res) => {
  try {
    const memoCount = await Memo.find().count();
    const memo = await Memo.create({
      user: req.user._id,
      position: memoCount > 0 ? memoCount : 0,
    });
    res.status(201).json(memo);
  } catch (err) {
    return res.status(500).json(err);
  }
};
exports.getAll = async (req, res) => {
  try {
    const memos = await Memo.find({ user: req.user._id }).sort("position");
    res.status(200).json(memos);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.updatePosition = async (req, res) => {
  const memos = req.body;
  try {
    // for (const key in memos.revers()) {
    for (const key in memos) {
      const memo = memos[key];
      await Memo.findByIdAndUpdate(memo._id, { $set: { position: key } });
    }
    res.status(200).json("Position Updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getOne = async (req, res) => {
  const { memoId } = req.params;
  try {
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("Memo doesn't exist");
    res.status(200).json(memo);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  const { memoId } = req.params;
  const { title, description, favorite } = req.body;
  try {
    if (title === "") req.body.title = "No Title";
    if (description === "") req.body.description = "No Description";

    const currentMemo = await Memo.findById(memoId);
    if (!currentMemo) return res.status(404).json("The memo doesn't exist");

    // When there is no favorite memo
    if (favorite !== undefined && currentMemo.favorite !== favorite) {
      const favorites = await Memo.find({
        user: currentMemo.user,
        favorite: true,
        _id: { $ne: memoId },
      });
      // console.log("---Update Favorites", favorites);

      if (favorite) {
        req.body.favoritePosition = favorites.length > 0 ? favorites.length : 0;
      } else {
        for (const key in favorites) {
          const element = favorites[key];
          await Memo.findByIdAndUpdate(element._id, {
            $set: { favoritePosition: key },
          });
        }
        // console.log(favorite);
      }
    }
    const memo = await Memo.findByIdAndUpdate(memoId, { $set: req.body });
    res.status(200).json(memo);
  } catch (err) {
    console.log("error with update", err);
    res.status(500).json(err);
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Memo.find({
      user: req.user._id,
      favorite: true,
    }).sort("favoritePosition");
    res.status(200).json(favorites);
  } catch (err) {
    console.log("error with getFavorite", err);
    res.status(500).json(err);
  }
};
exports.delete = async (req, res) => {
  const { memoId } = req.params;
  const { title, description } = req.body;
  try {
    const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
    if (!memo) return res.status(404).json("Memo doesn't exist");

    await Memo.deleteOne({ _id: memoId });
    res.status(200).json("Successfully deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

// exports.update = async (req, res) => {
//   const { memoId } = req.params;
//   const { title, description } = req.body;
//   try {
//     if (title === "") req.body.title = "No Title";
//     if (description === "") req.body.description = "No Description";
//     const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
//     if (!memo) return res.status(404).json("Memo doesn't exist");

//     const updatedMemo = await Memo.findByIdAndUpdate(memoId, {
//       $set: req.body,
//     });
//     res.status(200).json(updatedMemo);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };
