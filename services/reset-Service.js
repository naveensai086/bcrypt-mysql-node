var db = require('../bin/database');
var bcrypt = require('bcrypt');
const RandExp = require('randexp');
const TempMail = require('./tempMail');
var salt = bcrypt.genSaltSync(10);




//reset password
var resetPassword = async function (req, res) {
    let pawd = req.Password;
    let Email = req.Email;
    await db.execute('SELECT Password,FirstName FROM users  where Email=? and IsDeleted=0', [Email])
        .then(user => {
            let pwd = JSON.stringify(user[0]);
            let pwd2 = JSON.parse(pwd);
            let hash = pwd2[0].Password;
            let FirstName = pwd2[0].FirstName;
            bcrypt.compare(pawd, hash, async (err, match) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (match) {
                        let temp1 = new RandExp(/([A-Z0-9]{7})/).gen();
                        await db.execute('update users set TemporaryPassword= ? WHERE Email=? ', [temp1, Email])
                            .then(() => {
                                console.log(FirstName, Email, pawd, temp1);
                                TempMail.tempMail(FirstName, Email, pawd, temp1);
                            })
                            .catch(err => {
                                res.status(404).send({
                                    status: 404,
                                    message: "temporary password is on hold"
                                });
                            });
                    } else {
                        res.status(401).send({
                            status: 401,
                            message: 'wrong password'
                        });
                    }
                }
            })
        })
        .catch(err => {
            res.status(404).send({
                status: 404,
                message: "invalid email or your account might be deleted"
            });
        });
};









// =============================================================================================================

//new paaword
var newPassword = async function (req, res) {
    let Email = req.Email; let oldPassword = req.oldPassword; let tempPassword = req.tempPassword;
    let NewPassword = req.NewPassword; let ConformPassword = req.ConformPassword;
    if (NewPassword != ConformPassword) {
        res.status(401).send(
            {
                status: 401,
                message: "your new password filed is not matching with conform password "
            }
        );
    }
    await db.execute('SELECT Password,TemporaryPassword FROM users  where Email=?', [Email])
        .then(user => {
            let pwd = JSON.stringify(user[0]);
            let pwd2 = JSON.parse(pwd);
            let hash = pwd2[0].Password; let tempPwd = pwd2[0].TemporaryPassword;
            if (tempPassword == tempPwd) {
                bcrypt.compare(oldPassword, hash, async (err, match) => {
                    if (err) {
                        console.log(err);
                    }
                    if (match) {
                        console.log("password matched ")
                        const hashPwd = await bcrypt.hash(NewPassword, salt);
                        console.log(hashPwd);
                        await db.execute('update users set Password= ? , TemporaryPassword= ? WHERE Email=? ', [hashPwd, null, Email])
                            .then(() => {
                                res.status(200).send({
                                    status: 200,
                                    message: 'your password updated successfully '
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(404).send(err);
                            });
                    } else {
                        res.status(401).send({
                            status: 401,
                            message: 'you entered wrong  password'
                        });
                    }
                });
            } else {
                res.status(401).send({
                    status: 401,
                    message: 'you entered wrong temporary password'
                });
            }
        })
        .catch(err => {
            res.status(404).send('wrong credentials..!');
        });
};







module.exports = {
    resetPassword: resetPassword,
    newPassword: newPassword
}