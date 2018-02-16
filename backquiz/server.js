var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());
var api = express.Router();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
    next();
})



var quizzes = [{id:0,type:"symfony2",level:3},{id:1,type:"Angular",level:2}];
var questions = [{id: 0, id_quizz: 0, text: "comment installer symfony"},{id: 1 ,id_quizz: 0, text: "comment génerer des crud symfony"},
                 {id: 2, id_quizz: 1, text: "comment installer angular"},{id: 3, id_quizz: 1, text: "comment installer les dépandance pour angular4"}];

var responses = [
    {id: 0, id_question: 0, text:"with composer", status: false, if_right: 1},{id: 1, id_question: 0, text:"with npm", status: false, if_right: 0},{id: 2, id_question: 0, text:"with bower", status: false, if_right: 0},
    {id: 3, id_question: 1, text:"with composer", status: false, if_right: 1},{id: 4, id_question: 1, text:"with npm", status: false, if_right: 0},{id: 5, id_question: 2, text:"with bower", status: false, if_right: 0},
    {id: 6, id_question: 2, text:"with composer", status: false, if_right: 1},{id: 7, id_question: 2, text:"with npm", status: false, if_right: 0},{id: 8, id_question: 3, text:"with bower", status: false, if_right: 0},
    {id: 3, id_question: 9, text:"with composer", status: false, if_right: 1},{id: 4, id_question: 10, text:"with npm", status: false, if_right: 0},{id: 11, id_question: 4, text:"with bower", status: false, if_right: 0},
                
]

  //app.get('/', (req, res) => res.send('Hello World!'));

api.get('/quizzes', (req, res) => {
    res.json(quizzes);
})











app.use('/api', api);

app.listen(3000);