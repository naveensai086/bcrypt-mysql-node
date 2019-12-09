var db = require('../bin/database');

// cerating question
var createQuestion =  function (req, res) {
       let sub = req.sub;  let question = req.question; let options = JSON.stringify(req.options); let answer = req.answer;
     let marks = req.marks; 
     console.log('in service method=======',req);
    let userquery = 'INSERT INTO questions (sub, question,options,answer,marks) VALUES (?,?,?,?,?)';
    db.execute(userquery, [sub, question,options,answer,marks])
        .then(async result => {
            console.log('h4=======','in then method ');
           res.status(200).send({
                        Statu_Code : 200,
                        Message : "question added successful "
                    });
        })
        .catch(err => {
            console.log('in catch method==== ',err);
            res.status(400).send({
                Statu_Code : 400,
                Message : "question adding failed "
            });
        });
};

//==========================================================================================================================================

//Get All results
var getResults = function (req, res) {
    db.execute('SELECT * FROM result')
        .then(result => {
            res.send(result[0]);
        })
        .catch(err => {
            res.send(err);
        })
};



module.exports = {
    createQuestion: createQuestion,
    getResults:getResults
}