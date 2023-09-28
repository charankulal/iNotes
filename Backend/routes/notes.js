const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

// ROUTE 1:  Get all the notes using GET: "/api/auth/getuser" . Login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 2:  Add a new note using POST: "/api/auth/addnote" . Login required

router.get(
  "/addnote",
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
module.exports = router;
