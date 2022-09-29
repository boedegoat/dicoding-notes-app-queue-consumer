const { Pool } = require('pg')

class NotesService {
    constructor() {
        this._pool = new Pool()
    }

    async getNotes(userId) {
        const query = {
            text: `
                SELECT notes.* FROM notes
                LEFT JOIN collaborations ON collaborations.note_id = notes.id
                WHERE notes.owner = $1 OR collaborations.user_id = $1
            `,
            values: [userId],
        }

        const notes = (await this._pool.query(query)).rows
        return notes
    }
}

module.exports = NotesService
