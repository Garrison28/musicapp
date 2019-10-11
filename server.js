const express = require('express');
const db = require('./models');

const app = express();

app.use(express.urlencoded({ extended: false }))

function logError(error) {
    console.log('FUUUUUUUUUUUCCCCCCCCCCKKKKKKKK')
    console.log(error)
    res.send({ 'message': 'there was an error' })
}

app.get('/', function(req, res) {
    res.send('home route')
});

app.get('/songs', function(req, res) {
    db.song.findAll()
    .then(function(songs) {
        res.json(songs)
    })
    .catch(logError);
});

app.get('/songs/:id', function(req, res) {
    db.song.findByPk(parseInt(req.params.id))
    .then(function(foundSong) {
        if (!foundSong) {
            res.json({message: 'No such song'})
        } else {
            res.json(foundSong);
        }
    })
    .catch(logError);
});

app.post('/songs', function(req,res) {
    db.song.findOrCreate({
        where: {
            songName: req.body.songName
        },
        defaults: {
            artistName: req.body.artistName,
            year: req.body.year,
            genre: req.body.genre
        }
    }).then(function([song, created]) {
        console.log(`${song.songName} was ${created ? 'created' : 'found'}`)
        res.redirect('/songs');
    })
});

app.put('/songs/:id', function(req, res) {
    db.song.update(req.body, {
        where: {
            id: parseInt(req.params.id)
        }
        .then(function(numOfUpdated) {
            console.log(numOfUpdated);
            res.redirect(`/users/${req.params.id}`)
        })
    })
});

app.delete('/songs/:id', function(req, res) {
    db.song.destroy({
        where: {
        id: parseInt(req.params.id)
        }
    }).then(function(numDeleted) {
        console.log(numDeleted)
        res.redirect('/songs');
    })
});


app.listen(3000, () => console.log('server up'))