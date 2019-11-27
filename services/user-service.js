var db = require('../bin/database');
let jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);



//Get All Employees Data Service
var getAllusers = function (req, res) {
    db.execute('SELECT * FROM users')
        .then(result => {
            console.log(result[0].Employee_Id);
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
        .then( user => {
               let pwd = JSON.stringify(user[0]);
               let pwd2 = JSON.parse(pwd);
             //  console.log(pwd2[0]);
               let  hash =  pwd2[0].Password;
              // console.log(hash);
              
               bcrypt.compare(pawd,hash,(err,match)=>{
                if(err){
                    res.status(404).send(err);
                }
                else{
                    if(match){
                    let token = jwt.sign({ "IsAdmin": pwd2[0].IsAdmin }, "secret", { algorithm: 'HS256'} , { expiresIn: '300s' });
                    res.status(200).send({
                        Statu_Code : 200,
                        Message : "Authentication successful ",
                        token: token
                    });

                    }
                    else{
                        res.status(400).send({
                            Statu_Code : 400,
                            Message : "Wrong Password"
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
    let CreatedBy = req.CreatedBy;  let Password = req.Password;
    let UpatedBy = req.UpatedBy; 
    let IsAdmin = req.IsAdmin;
    const hash = await bcrypt.hash(Password,salt);
    console.log(hash);
    let userquery = 'INSERT INTO users (FirstName, LastName,Gender,Phone,Email,DateOfBirth,CreatedBy,CreatedOn,UpatedBy,UpatedOn,IsAdmin,Password) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
    db.execute(userquery, [FirstName, LastName,Gender,Phone,Email,DateOfBirth,CreatedBy,new Date(),UpatedBy,new Date(),IsAdmin,hash])
        .then(async result => {
            res.status(200).send({
                Statu_Code : 200,
                Message : "Registration successful "
            });
        })
        .catch(err => {
            res.status(400).send({
                Statu_Code : 400,
                Message : "Registration failed"
            });
        });
};



//==========================================================================================================================================



//sending questions
var onlineQuestions = function (req, res) {
    let sub = req.query.sub;
    let final=["questions"]; 
    let arr=[];  let questions=[];  var options = []; 
    db.execute('SELECT question,options,marks FROM questions  where sub=?', [sub])
        .then(result => {
           // console.log(result);
            result[0].forEach((q)=>{ 
                       let obj = {
                        question:q.question,
                        options:JSON.parse(q.options),
                        marks:q.marks
                    };
                    questions.push(obj);
                })
             let c=1;
            while(c<50){
                let b = num1();
                arr.push(b);
                c++;
            };
         let arr2 = arr.filter((item,index)=>arr.indexOf(item)==index);
         let id=1;
         arr2.forEach(e=>{
            questions[e].Q_No=id;
            let flag=true;
            while(flag){
               if(options.length==4){
                   flag=false;
                   break;
               }
               else{
                let h = Math.floor(Math.random() * 4)+1;
                  if(!options.includes(h)){
                      options.push(h);
                  }
               }
            }
           var obj= {};
          
            options.forEach((ele,index)=>{
                obj[`${index+1}`] = questions[e].options[`${ele}`];
            })
            questions[e].options = obj;
             final.push(questions[e]);
             id++;
         })       
            res.send(final);  
         })
        .catch(err => {
            res.send(err);
        })
};




// generating random numbers for questions
function num1(){
    let a = Math.floor(Math.random() * 10);
    return a;
}



//==========================================================================================================================================



//validate result








































// //update employee
// var updateEmployee = function (req, res) {
//     let Pwd = req.Password;
//     Email = req.Email;
//     db.execute('SELECT * FROM employee `e` join authorization `a` on (e.Employee_Id=a.Employee_Id)  where Email=? and Is_Deleted=?', [Email,0])
//         .then(async user => {
//             try {
//                      let pwd_decrypt = JSON.stringify(user[0]);
//                      let dbpwd = JSON.parse(pwd_decrypt);
//                      let Employee_Id = dbpwd[0].Employee_Id;

//                      const hash = await bcrypt.hash(Pwd,salt);

//                     db.execute('UPDATE authorization SET Password=? WHERE Employee_Id=?',[hash, Employee_Id])
//                         .then(result => {
//                             res.status(200).send('Updation successful..!!');
//                         })
//                         .catch(err => {
//                             res.status(400).send('Updation failed..!');
//                         });
                      
//             } catch (e) {
//                  res.status(404).send('user not found..!');
//             }
//         })
//         .catch(err => {
//             res.status(400).send('user not found');
//         });    
// };

    

// //delete employee
// var deleteEmployee = function (req, res) {
//     let Employee_Id = req.Employee_Id;
//     db.execute('SELECT * FROM employee  where Employee_Id=?', [Employee_Id])
//         .then(async user => {
//             let pwd_decrypt = JSON.stringify(user[0]);
//             let dbpwd = JSON.parse(pwd_decrypt);
//             let Is_Deleted = dbpwd[0].Is_Deleted;
//                 if(user[0].length>0 && Is_Deleted==0){
            
//                     db.execute('UPDATE employee SET Is_Deleted=? WHERE Employee_Id=?',[1, Employee_Id])
//                         .then(result => {
//                             console.log(result[0]);
//                             res.status(200).send('deleted successful..!!');
//                         })
//                         .catch(err => {
//                             res.status(400).send('can not be deleted..!');
//                         });
                      
//             }
//             else{
//                 res.send('user not found ');
                
//             }
        
                 
            
//         })    
// };





module.exports = {
     getAllusers: getAllusers,
    getUser: getUser,
    createUser: createUser,
    onlineQuestions:onlineQuestions,
    // deleteEmployee:deleteEmployee

}









