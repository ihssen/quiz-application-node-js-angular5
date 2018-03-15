const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkJwt = require('express-jwt');
var ObjectID = require("mongodb").ObjectID;


function apiRouter(database) {
    const router = express.Router();


    router.use(
        checkJwt({ secret: process.env.JWT_SECRET }).unless({ path: '/api/authenticate'})
    );

    router.use((err, req, res, next) => {
        if( err.name ==='UnauthorizedError') {
            res.status(401).send({ error: err.message })
        }
    })

    ////// get all quizzes //////////
    router.get('/quizzes', (req, res) => {

        const quizzesCollection = database.collection('quizzes');
    
        quizzesCollection.find({}).toArray((err, quizz) => {
        return res.json(quizz)
        });
    });

    ////// get quiz by Id ////////
    router.get('/quizzes/:id', (req, res) => {

        const quizzesCollection = database.collection('quizzes');
    
        quizzesCollection.findOne({_id: ObjectID(req.params.id)},{}, function(err, result) {
            if (err)
                res.send(err);
            res.json(result);
        });
    });

    //// post quizz //////////////
    router.post('/quizzes', (req, res) => {
        let quiz = {
            type: req.body.type,
            level: req.body.level
            };
        const quizzesCollection = database.collection('quizzes');
        quizzesCollection.insertOne(quiz, (err, r) => {
            if (err) {
                return res.status(500).json({ error: 'Error inserting new record.' })
            }
        
            const newRecord = r.ops[0];
        
            return res.status(201).json(newRecord);
        });
    });

    //// delete quizz ////////////
    router.delete('/quizzes/:id', (req, res) => {
        let quiz = { _id: req.params.id };
        const quizzesCollection = database.collection('quizzes');

        quizzesCollection.remove({_id: ObjectID(req.params.id)}, {safe: true}, function(err, result) {
            if(err) return res.send({status: false, result: err});
            return res.json({message: "quizzes delted"});
        })
    });

    //// update quizz /////////////
    router.put('/quizzes/:id', (req, res) => {

        const quizzesCollection = database.collection('quizzes').findOneAndUpdate({_id: req.params.id}, {$set: req.body }, {new: true}, function(err, quizz) {
            if (err){
                return res.send({status: false, result: err});
            }

            res.json({status: true, data: quizz,  result: "User successffuly updated"});
        });
    });

    // ///// get all questions for one quiz
    router.get('/questions/quiz/:id', (req, res) => {

        const questionsCollection = database.collection('questions');
    
        questionsCollection.find({id_quizz: req.params.id}).toArray((err, quizz) => {
        return res.json(quizz)
        });
    });

    /////// get first question id for quiz
    router.get('/question/quiz/:id_quiz', (req, res) => { 

        const questionsCollection = database.collection('questions');
    
        questionsCollection.findOne({}, function(err, responses) {
            return res.json(responses);
        });
    });

    // //// get  question bu Id///
    router.get('/questions/:id', (req, res) => {

        const questionsCollection = database.collection('questions');
    
        questionsCollection.findOne({_id: ObjectID(req.params.id)},{}, function(err, result) {
            if (err)
                res.send(err);
            res.json(result);
        });
    });

    // //// post question /////
    router.post('/questions', (req, res) => {
        let question = {
            text: req.body.text,
            id_quizz: req.body.id_quizz
            };
        const questionsCollection = database.collection('questions');
        questionsCollection.insertOne(question, (err, r) => {
            if (err) {
                return res.status(500).json({ error: 'Error inserting new record.' })
            }
        
            const newRecord = r.ops[0];
        
            return res.status(201).json(newRecord);
        });
    });

    // //// update question ////
    router.put('/questions/:id', (req, res) => {
        
        const questionsCollection = database.collection('questions').findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, question) {
            if (err){
                return res.send({status: false, result: err});
            }

            res.json({status: true, data: question,  result: "User successffuly updated"});
        });
    });

    // ///// delete question /////
    router.delete('/questions/:id', (req, res) => {
        let quiz = { _id: req.params.id };
        const questionsCollection = database.collection('questions');

        questionsCollection.remove({_id: ObjectID(req.params.id)}, {safe: true}, function(err, result) {
            if(err) return res.send({status: false, result: err});
            return res.json({status: true, data: result.ok, message: "questions deleted"});
        })
    });

    // /// get answers
    router.get('/answers/:id', (req, res) => {

        const answersCollection = database.collection('answers');
    
        answersCollection.findOne({_id: ObjectID(req.params.id)},{}, function(err, result) {
            if (err)
                res.send(err);
            res.json(result);
        });
    });

    // ////post answer ///////////
    router.post('/answers', (req, res) => {
        let question = {
            id_quizz:    req.body.id_quizz,
            id_question: req.body.id_question,
            text:        req.body.text,
            is_right:    req.body.is_right
            };
        const answersCollection = database.collection('answers');
        answersCollection.insertOne(question, (err, r) => {
            if (err) {
                return res.status(500).json({ error: 'Error inserting new record.' })
            }
        
            const newRecord = r.ops[0];
        
            return res.status(201).json(newRecord);
        });
    });

    // ///// delete answer 
    router.delete('/answers/:id', (req, res) => {
        let quiz = { _id: req.params.id };
        const answersCollection = database.collection('answers');

        answersCollection.remove({_id: ObjectID(req.params.id)}, {safe: true}, function(err, result) {
            if(err) return res.send({status: false, result: err});
            return res.json({status: true, data: result.ok, message: "answers deleted"});
        })
    });

    ////// get answers for a question
    router.get('/answers/question/:idQuestion/quiz/:idQuiz', (req, res) => {

        const answersCollection = database.collection('answers');
    
        answersCollection.find({id_quizz: req.params.idQuiz, id_question: req.params.idQuestion}).toArray((err, responses) => {
        return res.json(responses)
        });
    });


    /////// put answer ////
    router.put('/answers/:id', (req, res) => {
        
        const answersCollection = database.collection('answers').findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, answer) {
            if (err){
                return res.send({status: false, result: err});
            }

            res.json({status: true, data: answer,  result: "User successffuly updated"});
        });
    });

    // //// get  answers for quiz ///
    router.get('/answers/quiz/:idQuiz', (req, res) => { 
        const answersCollection = database.collection('answers');
    
        answersCollection.find({id_quizz: req.params.idQuiz}).toArray((err, responses) => {
        return res.json(responses)
        });

    })
    //// athenticate ////////////
    router.post('/authenticate', (req, res) => {
        const user = req.body;

        const usersCollection = database.collection('users');

        usersCollection
            .findOne({ username: user.username }, (err, result) => {
                if(!result) {
                    return res.status(401).json({ error: 'user not found'})
                }

                if (!bcrypt.compareSync(user.password, result.password)) {
                    return res.status(401).json({error: 'incorrect password'});
                }

                const payload = {
                    username: result.username,
                    admin: result.admin
                };

                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h'});

                return res.json({
                    message: "successfuly authenticate",
                    token: token
                });
            });

    })



    return router;
}

module.exports = apiRouter;