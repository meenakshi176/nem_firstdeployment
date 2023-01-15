const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    title: String,
    Year: Number,
    tag: String,
    author: String,
    userID: String,
  },
  {
    versionKey: false,
  }
);
const NoteModel = mongoose.model("note", noteSchema);

module.exports = {
  NoteModel,
};
