//BackEnd
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();

require('../database/db')
const FeedbackModel = require('../schema/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type', 'x-access-token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => {
    res.end("Welcome to Root Path")
});

app.get('/home', (req, res) => {
    res.end("Welcome to Home")
});

app.post('/api', (req, res) => {

    const username = req.body.username
    const password = req.body.password
    const firstname = req.body.firstname
    const lastname = req.body.lastname

    console.log(req.body)

    FeedbackModel.find({ username, password }, (err, doc) => {
        if (err) {
            res.json({ result: "false!!" })
        }
        if (doc.length == 0) {
            res.json({ result: "don have username or password" })
        } else {
            jwt.sign({ doc: doc }, 'secretkey', { expiresIn: '60s' }, (err, token) => {
                res.json({
                    data: doc,
                    token
                });
                console.log(doc);
                console.log(token);
            });

        }

    });
    // FeedbackModel.create(req.body, (err, doc) => {
    //     if (err) res.json({ result: "false", username: username, password: password });
    //     res.json({ username: username, password: password });
    // })
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
})

app.get('/api', (req, res) => {
    FeedbackModel.find((err, doc) => {
        if (err) res.json({ result: "falsed!!" })
        res.json({ result: "success", data: doc })
    })
})


function verifyToken(req, res, next) {

    const baererHeader = req.headers['authorization'];

    if (typeof baererHeader !== 'undefined') {

        const bearer = baererHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken
        next();

    } else {
        res.sendStatus(403);
    }
}

app.listen(3000, () => {
    console.log("Server is Running!!")
})