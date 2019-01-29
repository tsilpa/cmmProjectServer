const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/test';
const User = require('./model/user');
const Insert = require('./model/mongodbInserts');
var projectJson = require('./model/projectInserts.json');
var domainJson = require('./model/domainInserts.json');
var maturityCriteriaJson = require('./model/maturityCriteriaInserts.json');

app.get('/api/user/login', (req, res) => {
    res.send('Hello World!');
});


app.get('/api/project/insert', (req, res) => {
    mongoose.connect(url,{ useNewUrlParser: true }, function(err){
        if(err) throw err;
        Insert.Project.collection.insertMany(projectJson, function(err, docs){
            if(err) throw err;
            console.log(docs);
            return res.status(200).json({
                status: 'success',
                data: docs
            })
        });
    });
    res.send('success!');
});


app.get('/api/domain/insert', (req, res) => {
    mongoose.connect(url,{ useNewUrlParser: true }, function(err){
        if(err) throw err;
        Insert.Domain.collection.insertMany(domainJson, function(err, docs){
            if(err) throw err;
            console.log(docs);
            return res.status(200).json({
                status: 'success',
                data: docs
            })
        });
    });
    res.send('success!');
});


app.get('/api/maturityCriteria/insert', (req, res) => {
    mongoose.connect(url,{ useNewUrlParser: true }, function(err){
        if(err) throw err;
        Insert.MaturityCriteria.collection.insertMany(maturityCriteriaJson, function(err, docs){
            if(err) throw err;
            console.log(docs);
            return res.status(200).json({
                status: 'success',
                data: docs
            })
        });
    });
    res.send('success!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));

app.post('/api/user/login', (req, res) => {
    console.log(req.body.username);
    console.log(req.body.password);
    console.log(url);
    mongoose.connect(url,{ useNewUrlParser: true }, function(err){
        if(err) throw err;
        User.find({
            username : req.body.username, password : req.body.password
        }, function(err, user){
            if(err) throw err;
            if(user.length === 1){
               // localstorage().setItem('currentUser', JSON.stringify(user));
                return res.status(200).json({
                    status: 'success',
                    data: user
                })
            } else {
                return res.status(200).json({
                    status: 'fail',
                    message: 'Login Failed'
                })
            }

        })
    });
});


app.post('/api/currentUser/get', (req, res) => {
return JSON.parse(localStorage.getItem(currentUser));
});

app.get('/api/project/get', (req, res) => {
    console.log("here");
mongoose.connect(url,{ useNewUrlParser: true }, function(err){
    if(err) throw err;
    Insert.Project.find({}, function(err, projects){
        console.log(projects);
        if(err) throw err;
        if(projects.length > 0){
            return res.status(200).json({
                status: 'success',
                data: projects
            })
        } else {
            return res.status(200).json({
                status: 'fail',
                message: 'No projects found'
            })
        }

    })
});
});

app.get('/api/domain/get', (req, res) => {
    console.log("here");
mongoose.connect(url,{ useNewUrlParser: true }, function(err){
    if(err) throw err;
    Insert.Domain.find({}, function(err, domains){
        if(err) throw err;
        if(domains.length > 0){
            return res.status(200).json({
                status: 'success',
                data: domains
            })
        } else {
            return res.status(200).json({
                status: 'fail',
                message: 'No domains found'
            })
        }

    })
});
});

app.get('/api/question/get', (req, res) => {
    console.log("here");
mongoose.connect(url,{ useNewUrlParser: true }, function(err){
    if(err) throw err;
    Insert.MaturityCriteria.find({}, function(err, questions){
        console.log(questions);
        if(err) throw err;
        if(questions.length > 0){
            return res.status(200).json({
                status: 'success',
                data: projects
            })
        } else {
            return res.status(200).json({
                status: 'fail',
                message: 'No questions found'
            })
        }

    })
});
});

app.get('/api/answer/get', (req, res) => {
    console.log("here");
mongoose.connect(url,{ useNewUrlParser: true }, function(err){
    if(err) throw err;
    Insert.Project.find({}, function(err, answers){
        console.log(answers);
        if(err) throw err;
        return res.status(200).json({
            status: 'success',
            data: answers
        })
    })
});
});

app.get('/api/answer/post', (req, res) => {
mongoose.connect(url,{ useNewUrlParser: true }, function(err){
    if(err) throw err;
    Insert.Project.find({}, function(err, answers){
        console.log(answers);
        if(err) throw err;
        return res.status(200).json({
            status: 'success',
            data: answers
        })
    })
});
});

app.listen(3000, () => console.log('blog server running on port 3000!'));