var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require("underscore");


app.use(bodyParser.json());
var api = express.Router();

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
//     next();
// })


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // allow preflight
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

var quizzes = [{id:0,type:"PHP",level:3},{id:1,type:"Symfpny2",level:2}];


var questions = [
    {id: 0, id_quizz: 0, text: "What does PHP stand for?"},
    {id: 1 ,id_quizz: 0, text: "PHP server scripts are surrounded by delimiters, which?"},
    {id: 2 ,id_quizz: 0, text: "How do you write \"Hello World\" in PHP"},
    {id: 3, id_quizz: 0, text: "All variables in PHP start with which symbol?"},
    {id: 4, id_quizz: 0, text: "How do you get information from a form that is submitted using the \"get\" method?"},

    {id: 5, id_quizz: 1, text: "1 What does PHP stand for?"},
    {id: 6 ,id_quizz: 1, text: "1 PHP server scripts are surrounded by delimiters, which?"},
    {id: 7 ,id_quizz: 1, text: "1 How do you write \"Hello World\" in PHP"},
    {id: 8, id_quizz: 1, text: "1 All variables in PHP start with which symbol?"},
    {id: 9, id_quizz: 1, text: "1 How do you get information from a form that is submitted using the \"get\" method?"}
];

var responses = [
    {id: 0, id_quizz: 0, id_question: 0, text:"Personal Hypertext Processor", is_checked: false, is_right: 1},
    {id: 1, id_quizz: 0, id_question: 0, text:"Private Home Page", is_checked: false, is_right: 0},
    {id: 2, id_quizz: 0, id_question: 0, text:"PHP: Hypertext Preprocessor", is_checked: false, is_right: 0},

    {id: 3, id_quizz: 0, id_question: 1, text:"<?php...?>", is_checked: false, is_right: 1},
    {id: 4, id_quizz: 0, id_question: 1, text:"<script>...</script>", is_checked: false, is_right: 0},
    {id: 5, id_quizz: 0, id_question: 1, text:"<?php>...</?>", is_checked: false, is_right: 0},

    {id: 6, id_quizz: 0, id_question: 2, text:"Document.Write(\"Hello World\");", is_checked: false, is_right: 1},
    {id: 7, id_quizz: 0, id_question: 2, text:"echo \"Hello World\";", is_checked: false, is_right: 0},
    {id: 8, id_quizz: 0, id_question: 2, text:"Hello World\";", is_checked: false, is_right: 0},

    {id: 9, id_quizz: 0, id_question: 3, text:"!", is_checked: false, is_right: 1},
    {id: 10,id_quizz: 0, id_question: 3, text:"&", is_checked: false, is_right: 0},
    {id: 11,id_quizz: 0, id_question: 3, text:"$", is_checked: false, is_right: 0},

    {id: 12, id_quizz: 0, id_question: 4, text:"$_GET[];", is_checked: false, is_right: 1},
    {id: 14, id_quizz: 0, id_question: 4, text:"Request.QueryString;", is_checked: false, is_right: 0},
    {id: 14 ,id_quizz: 0, id_question: 4, text:"Request.Form;", is_checked: false, is_right: 0},



    {id: 15, id_quizz: 1, id_question: 5, text:"Personal Hypertext Processor", is_checked: false, is_right: 1},
    {id: 16, id_quizz: 1, id_question: 5, text:"Private Home Page", is_checked: false, is_right: 5},
    {id: 17, id_quizz: 1, id_question: 5, text:"PHP: Hypertext Preprocessor", is_checked: false, is_right: 0},

    {id: 18, id_quizz: 1, id_question: 6, text:"<?php...?>", is_checked: false, is_right: 1},
    {id: 19, id_quizz: 1, id_question: 6, text:"<script>...</script>", is_checked: false, is_right: 0},
    {id: 20, id_quizz: 1, id_question: 6, text:"<?php>...</?>", is_checked: false, is_right: 0},

    {id: 21, id_quizz: 1, id_question: 7, text:"Document.Write(\"Hello World\");", is_checked: false, is_right: 1},
    {id: 22, id_quizz: 1, id_question: 7, text:"echo \"Hello World\";", is_checked: false, is_right: 0},
    {id: 23, id_quizz: 1, id_question: 7, text:"Hello World\";", is_checked: false, is_right: 0},

    {id: 24, id_quizz: 1, id_question: 8, text:"!", is_checked: false, is_right: 1},
    {id: 25,id_quizz: 1, id_question: 8, text:"&", is_checked: false, is_right: 0},
    {id: 26,id_quizz: 1, id_question: 8, text:"$", is_checked: false, is_right: 0},

    {id: 27, id_quizz: 1, id_question: 9, text:"$_GET[];", is_checked: false, is_right: 1},
    {id: 28, id_quizz: 1, id_question: 9, text:"Request.QueryString;", is_checked: false, is_right: 0},
    {id: 29 ,id_quizz: 1, id_question: 9, text:"Request.Form;", is_checked: false, is_right: 0},
             
]

  //app.get('/', (req, res) => res.send('Hello World!'));

/// get all quizzes
api.get('/quizzes', (req, res) => {
    res.json(quizzes);
})

//// post quiz 
api.post('/quizzes', (req, res) => {
    let quiz = {
        id: quizzes.length + 1,
        type: req.body.type,
        level: req.body.level
      };
    
    quizzes.push(quiz);

    res.json(quiz);
})

///// delete quizz 
api.delete('/quizzes/:id', (request, response) => {
  
    let quizzeId = request.params.id;
  
    let quizze = quizzes.filter(quizze => {
      return quizze.id == quizzeId;
    })[0];
  
    const index = quizzes.indexOf(quizze);
  
    quizzes.splice(index, 1);
  
    response.json({ message: `Quiz ${quizzeId} deleted.`});
  
  });
  
///// get all questions for one quiz
api.get('/quizzes/:id/questions', (req, res) => {    
    const result = questions.filter(question => question.id_quizz == req.params.id);
    res.json(result);
})

/// get responses for a question
api.get('/quizzes/:id_quiz/questions/:id_question', (req, res) => { 
    const result1 = responses.filter(response => response.id_question == req.params.id_question );
    const result = result1.filter(response => response.id_quizz == req.params.id_quiz );
    res.json(result);
})


//// get first question id for quiz
api.get('/quizzes/:id_quiz', (req, res) => { 
    const result = questions.filter(question => question.id_quizz == req.params.id_quiz );
    res.json(result);
})

//// save response checked ////
api.put('/responses/:idResponse', (req, res) => {

    const requestId = req.params.idResponse;

    let response = responses.filter(response => {
        return response.id == requestId;
    })[0];
    
    const index = responses.indexOf(response);
    const keys = Object.keys(req.body);

    keys.forEach(key => {
        response[key] = req.body[key];
    });

    responses[index] = response;
    
    res.json(responses[index]);
})

 
//// get  response for quiz ///
api.get('/responses/:idQuiz', (req, res) => { 
    const result = responses.filter(response => response.id_quizz == req.params.idQuiz );
    res.json(result);
})





app.use('/api', api);

app.listen(3000);