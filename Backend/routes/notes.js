const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

// ROUTE 1:  Get all the notes using GET: "/api/notes/getuser" . Login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 2:  Add a new note using POST: "/api/notes/addnote" . Login required

router.post("/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 10 characters").isLength({
      min: 10,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      console.log(savedNote);
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 3:  Updating a existing note using PUT: "/api/notes/updatenote" . Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //Create new Notes object
    const newNotes = {};

    if (title) {
      newNotes.title = title;
    }
    if (description) {
      newNotes.description = description;
    }
    if (tag) {
      newNotes.tag = tag;
    }
    //Find the note to be updated
    var note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("Can't find any notes");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Authorized");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNotes },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 4:  Deletng a note using DELETE: "/api/notes/deletenote" . Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //Find the note to be deleted
    var note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("Can't find any notes");
    }

    //Allow deletion only if user is owning
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Authorized");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "The note has been deleted." });
  } catch (error) {
    console.error(error.message);
    // res.status(500).send("Internal server error");
  }
});

module.exports = router;
