const express = require('express');
const { dirname } = require('path');
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

// const db = require('../../db/db.json')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// Route that sends the user to the index.html.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}.`)
})