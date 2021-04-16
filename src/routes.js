const { addNoteHandler, getAllNotesHandler, getSpecifiedNoteHandler, updateSpecifiedNoteHandler } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
        //options: {
        //    cors: {
        //        origin: ['*'],
        //    },
        //},
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getSpecifiedNoteHandler,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: updateSpecifiedNoteHandler,
    }

]

module.exports = routes;