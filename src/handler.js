const { nanoid } = require("nanoid");
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    const { title = "untitled", tags, body } = request.payload;
    const id = nanoid(10);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, updatedAt, createdAt,
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;
    if(isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);

    return response;
};

const getAllNotesHandler = () => ({
    status: 'success',
    data: {notes},
});

const getSpecifiedNoteHandler = (request, h) => {
    let { id } = request.params;
    let note = notes.filter((note) => note.id === id)[0];
    console.log(notes);
    if(note !== undefined){
        console.log('masuk');
        return {
            status: 'success',
            data: {note}
        }
    }

    const response = h.response({
        status: 'fail',
        message: 'No data found',
    })
    response.code(404);
    return response;
}

const updateSpecifiedNoteHandler = (request, h) => {
    const {id} = request.params;
    const {title, tags, body} = request.payload;
    const idx = notes.findIndex((n) => n.id === id)
    if(idx !== -1){
        notes[idx].title = title;
        notes[idx].tags = tags;
        notes[idx].body = body;
        notes[idx].updatedAt = new Date().toISOString();

        return {
            status: 'success',
            data: notes[idx]
        }
    }

    let response = h.response({
        status: 'fail',
        message: 'Not Found',
    })
    response.code(405);
    return response;
}

const deleteSpecifiedNote = (request, h) => {
    const {id} = request.params;
    const idxArray = notes.reduce((note) => note.id === id);

    if(idxArray !== -1){
        notes.splice(id, 1);
        return h.response({
            status: 'success',
            message: 'Note berhasil dihapus'
        });
    }

    const response = h.response({status: 'fail', message: 'Not found'}).code(404)
    return response;
}

module.exports = {addNoteHandler, getAllNotesHandler, getSpecifiedNoteHandler, updateSpecifiedNoteHandler, deleteSpecifiedNote};