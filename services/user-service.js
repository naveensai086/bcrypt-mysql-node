var db = require('../bin/database');
let jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

var shuffle = require('shuffle-array');

//Get All Employees Data Service
var getAllusers = function (req, res) {
    db.execute('SELECT * FROM users')
        .then(result => {
            res.send(result[0]);
        })
        .catch(err => {
            res.send(err);
        })
};



//=========================================================================================================================================


// user login 
var getUser = async function (req, res) {
    let pawd = req.Password;
    Email = req.Email;
    //console.log(pawd,Email);
    db.execute('SELECT IsAdmin,Password FROM users  where Email=?', [Email])
        .then(user => {
            let pwd = JSON.stringify(user[0]);
            let pwd2 = JSON.parse(pwd);
            let hash = pwd2[0].Password;
            bcrypt.compare(pawd, hash, (err, match) => {
                if (err) {
                    res.status(404).send(err);
                }
                else {
                    if (match) {
                        let token = jwt.sign({ "IsAdmin": pwd2[0].IsAdmin }, "secret", { algorithm: 'HS256' }, { expiresIn: '300s' });
                        res.status(200).send({
                            Statu_Code: 200,
                            Message: "Authentication successful ",
                            token: token
                        });
                    }
                    else {
                        res.status(400).send({
                            Statu_Code: 400,
                            Message: "Wrong Password"
                        });
                    }
                }
            })


        })
        .catch(err => {
            res.status(404).send('wrong credentials..!');
        });
};



//========================================================================================================================================



//registration user 
var createUser = async function (req, res) {
    let FirstName = req.FirstName; let LastName = req.LastName; let Gender = req.Gender;
    let Phone = req.Phone; let Email = req.Email; let DateOfBirth = req.DateOfBirth;
    let CreatedBy = req.CreatedBy; let Password = req.Password;
    let UpatedBy = req.UpatedBy;
    let IsAdmin = req.IsAdmin;
    const hash = await bcrypt.hash(Password, salt);
    console.log(hash);
    let userquery = 'INSERT INTO users (FirstName, LastName,Gender,Phone,Email,DateOfBirth,CreatedBy,CreatedOn,UpatedBy,UpatedOn,IsAdmin,Password) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
    db.execute(userquery, [FirstName, LastName, Gender, Phone, Email, DateOfBirth, CreatedBy, new Date(), UpatedBy, new Date(), IsAdmin, hash])
        .then(async result => {
            res.status(200).send({
                Statu_Code: 200,
                Message: "Registration successful "
            });
        })
        .catch(err => {
            res.status(400).send({
                Statu_Code: 400,
                Message: "Registration failed"
            });
        });
};



//==========================================================================================================================================



//sending questions
var onlineQuestions = function (req, res) {
    let sub = req.query.sub;
    let final = ["questions"]; let questions = []; let arr = [];
    db.execute('SELECT q_id, question,options,marks FROM questions  where sub=?', [sub])
        .then(result => {
            result[0].forEach((q) => {
                let obj = {
                    q_id: q.q_id,
                    question: q.question,
                    options: JSON.parse(q.options),
                    marks: q.marks
                };
                questions.push(obj);
            });
            shuffle(questions);
            questions.forEach(e => {
                var objkeys = Object.keys(e.options);
                shuffle(objkeys);
                objkeys.forEach((ele) => {
                    console.log(ele);
                    arr[ele] = [{ ele: questions[e].options[ele] }]

                });
                console.log(arr);
                console.log('============');

            })
            res.send(final);
        })
        .catch(err => {
            res.send(err);
        })
};




//==========================================================================================================================================



//validate result
var validateResult = async function (req, res) {
    let UserId = req.UserId; let Sub = req.Sub;
    let Email = req.Email; let Answers = req.Answers; var Grade = ''; 
     var Sum=0;
     for (x in Answers) {
        let q_id = Answers[x].q_id; let answer1 = Answers[x].answer; 
      await  db.execute('SELECT answer,marks FROM questions where q_id=? ', [q_id])
            .then(result => {
                let ans = JSON.stringify(result[0]);
                let ans2 = JSON.parse(ans);
                let answer = ans2[0].answer;
                let marks = ans2[0].marks;
                console.log(q_id,answer1,answer,marks);
                if (answer == answer1) {
                    Sum = Sum + marks;
                }
            })
            .catch(err => {
                res.send(err);
            })    
    }
     console.log('Sum=',Sum);
    let Percentage = ((Sum / 15) * 100).toFixed(2);
    console.log('Percentage',Percentage);
    if (Percentage >= 90) {
        Grade = 'A'
        console.log('Grade',Grade);
    }
    else if (Percentage >= 70 && Percentage < 90) {
        Grade = 'B'
        console.log('Grade',Grade);
    }
    else if (Percentage >= 50 && Percentage < 70) {
        Grade = 'C'
        console.log('Grade',Grade);
    }
    else {
        Grade = 'F'
        console.log('Grade',Grade);
    }
    console.log(UserId, Email, Sub, Sum, Percentage, Grade);
    let resultQuery = 'INSERT INTO result (UserId,Email,Sub,Sum,Percentage,Grade) VALUES (?,?,?,?,?,?)';
     db.execute(resultQuery, [UserId, Email, Sub, Sum, Percentage, Grade])
        .then(result => {
            res.status(200).send({
                Statu_Code: 200,
                message: "result stored "
            });
        })  
        .catch(err => {
            res.send(err);
        })
};



module.exports = {
    getAllusers: getAllusers,
    getUser: getUser,
    createUser: createUser,
    onlineQuestions: onlineQuestions,
    validateResult: validateResult

}
