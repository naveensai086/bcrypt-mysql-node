var nodemailer = require('nodemailer');

function tempMail(FirstName,Email,pawd,temp1){
  let email=Email;  let paw=pawd;  let temp=temp1; let FN=FirstName;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'naveensai086@gmail.com',
        pass: 'Gmail@97.'
    }
});

const mailOptions = {
  from: 'naveensai086@gmail.com', 
  to: 'nyalamala@miraclesoft.com', 
  subject: 'Temporary Password for Reset ', 
  html: ` <!DOCTYPE html>
  <html>
  <head>
  </head>
  <body> 
   <header>  
        <th align="center"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT6XL1pRO8d3ccLmQUUC18QrvO9voXUyXcoL0R3-DsqaWHkKmzO" width="150" height="100">naveen software Solutions</th> <br>     
     </header>    
        <h4>Welcome `+ FN +` </h4> 
        <p>your Temporary Password is `+temp +` </p><br>
    <footer>
         <td  height="20" style="font-size:12px; font-style;">
          <strong>Thank You</strong> <br>
            <strong>Naveen Sai kumar Yalamala</strong>
            <br>
            <em style="font-size:12px; font-weight:400;">Software Engineer</em><br>
         <p>Adress :</p>
       <pre>
        Miracle Software Systems, Inc.
        Global Headquarters
        45625 Grand River Avenue
        Novi, MI - USA( 48374 )
        Ph: (248)-233-1100
        E : info@miraclesoft.com
     </pre>
    </footer>
  </table>
  </body>
  </html> 
  `
};



transporter.sendMail(mailOptions, function (err, info) {
  if (err)
      console.log(err)
  else
      console.log(info);
});
}




module.exports = {
  tempMail: tempMail
}
