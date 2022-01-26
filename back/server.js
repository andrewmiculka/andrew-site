const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

app.get('/flying-italians', (req, res) => {
    res.json({message : "This is the flying-italians page"})
})

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})