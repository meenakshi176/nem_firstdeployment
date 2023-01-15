const express = require("express");
const { NoteModel } = require("../models/note.model");
const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
  const note_data = await NoteModel.find();
  res.send(note_data);
});

noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const data = new NoteModel(payload);
    await data.save();
    res.send({ msg: "Notes Data Added Successfully" });
  } catch (e) {
    console.log(e);
    res.send({ msg: "Something went wrong" });
  }
});

noteRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const ID = req.params.id;
  const note = await NoteModel.findOne({ _id: ID });
  const userID_in_note = note.userID;
  const userID_making_req = req.body.userID;
  try {
    if (userID_making_req !== userID_in_note) {
      res.send({ msg: "You are not authorized" });
    } else {
      await NoteModel.findByIdAndUpdate({ _id: ID }, payload);
      res.send("Data Updated Sucessfully");
    }
  } catch (e) {
    console.log(e);
    res.send({ msg: "Something went wrong" });
  }
});
noteRouter.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await NoteModel.findByIdAndDelete({ _id: ID });
    res.send("Data Deleted Successfully");
  } catch (e) {
    console.log(e);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  noteRouter,
};
