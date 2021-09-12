const notesCtrl = {} //Creación de un objeto vacio

const Note = require('../models/Note');


notesCtrl.renderNoteForm = (req, res) => { 
    res.render('notes/new-note');
    //console.log(req.user.id);
};


notesCtrl.createNewNote = async (req, res) => {
    const { title, description } = req.body;
    const newNote = new Note({ title, description }); //Creacion de un objeto
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/notes');
    //res.send('New Note');
    //console.log(req.body); req.body es un objeto
    //console.log(newNote);
};


notesCtrl.renderNotes = async (req, res) => {
    const notes = await Note.find({ user: req.user.id }).lean().sort({ createdAt: 'desc' }); //Devueleve un arreglo de notas
    res.render('notes/all-notes', { notes });
    //res.send('Render Notes');
};


notesCtrl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    if( note.user != req.user.id ) {
        req.flash('error_msg', 'Not Authorized');
        return res.redirect('/notes');
    }
    res.render('notes/edit-note', { note });
    //res.send('Render Edit Form');
    //console.log(note);
};


notesCtrl.updateNote = async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
    req.flash('success_msg', 'Note Updated Successfully'); //Nombre y valor de la variable
    res.redirect('/notes');
    //res.send('Update Note');
    //console.log(req.body);
};


notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note Deleted Successfully');
    res.redirect('/notes');
    //res.send('Deleting Note');
    //console.log(req.params.id);
};


module.exports = notesCtrl;