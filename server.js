const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');

const server = express();
const port = 9000;
var database;

server.use(bodyParser.json());

const pgConnectionConfig = 'postgres://dm:dm@localhost/dm';

massive(pgConnectionConfig).then(dbInstance => {
    database = dbInstance;
    console.log('\n\n==[ Database Connected Successfully!! ]==\n\n');
})

//build endpoints here
server.post('/users', (req, res) => {
    //check if user has a name
    //save the user
    //return the user
    if (req.body.name && req.body.name.length > 0) {
        database.users.save(req.body).then(function (user) {
            res.status(201).json(user);
        });
    } else {
        res.status(400).json({ message: 'The user must have a name' });
    }
});

server.get('/users', (req, res) => {
    database.users.find().then(function (users) {
        res.status(200).send(users);
    })
});

server.get('/users/:id', (req, res) => {
    var id = req.params.id;
    database.users.findOne({
        id
    }).then(user => {
        res.status(200).send(user);
    })
});

server.listen(port, () => {
    console.log(`server running on port ${port}`);
});