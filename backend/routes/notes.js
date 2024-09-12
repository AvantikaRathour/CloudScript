const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')
// ROUTE 1 -  get all notes using GET /api/notes/fetchallnotes . Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
})
// ROUTE 2 -  add new notes using POST /api/notes/addnote . Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({ user: req.user.id, title, description, tag })
        const savednote = await note.save();
        res.json(savednote)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Some Internal Error Occured");
    }
})
// ROUTE 3 -  update an existing node POST /api/notes/updatenode . Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // create a newNote object
        const newnote = {};
        if (title) { newnote.title = title };
        if (description) { newnote.description = description }
        if (tag) { newnote.tag = tag }

        // Find note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
        res.json({ note });
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Some Internal Error Occured");
    }
}

)
// Route 4 for deleting existing note /deletenote using delete: login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    // Find note to be deleted 
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        // allows deletion if user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted" });
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Some Internal Error Occured");
    }

})
module.exports = router;