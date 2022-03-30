//const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const client = require("../configs/db");
// const tempdata=[
//     {
//         "name":"Jai",
//         "email":"jai@gmail.com",
//         "password":12345
//     },
//     {
//         "name":"Raj",
//         "email":"Raj@gmail.com",
//         "password":12345
//     },
//     {
//         "name":"Ram",
//         "email":"Ram@gmail.com",
//         "password":1234567
//     }
// ]
exports.signup=(req,res)=>
{
    
   const{name,email,password}=req.body
//    console.log(email)
//    //res.send("ALL IS WELL");
//    const isvalid=tempdata.findIndex((ele)=>(ele.email===email));
//    console.log(isvalid);
//  if(isvalid!==-1)
//  {
//     res.status(400).json({
//         error:"Already Exist"
//     });
// }
//console.log("I am in");
client
    .query(`SELECT * FROM users WHERE email = '${email}';`)
    .then((data) => {
    console.log("I am in");
    console.log(password);
      isValid = data.rows;
      console.log(data);

      //IF USER ALREADY EXISTS WE RECIEVE A NON EMPTY ARRAY SO WE CHECK LENGTH OF ARRAY AND SEND RESPONSE BACK THAT USER ALREADY EXISTS
      if (isValid.length !== 0) {
        res.status(400).json({
          error: "User already exists.",
        });
      } else {
        //IF THE CONDITION IS FALSE THAT IS THE USER DOES NOT EXIST ALREADY IN OUT DB, WE NEED TO SAVE HIS DATA TO DB FOR THAT FIRST WE HASH THE PLAIN PASSWORD GIVEN BY USER
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                if(err)
                {
                    res.status(500).json({
                        error:"NOT HASHED"
                    });
                }
            });
        });
        console.log(hash);

          //IF NO ERROR OCCURS AND PASSWORD IS HASHED SUCCESSFULLY WE CREATE A USER OBJECT WITH NAME, EMAIL, AND HASHED PASSWORD
          const user = {
            name,
            email,
            password: hash,
          };

          //NOW WE NEED TO SAVE THE ABOVE USER TO OUR DB FOR THAT WE PERFORM A INSERT QUERY
          client
            .query(
              `INSERT INTO users (id,name, email, password) VALUES ('2','${user.name}', '${user.email}' , '${user.password}');`
            )
            .then((data) => {
              //IF THE USER IS SUCCESSFULLY SAVED IN OUR DB WE GENERATE TOKEN FOR THE USER TO SEND BACK TO THE BROWSER
              const token = jwt.sign(
                {
                  email: email,
                },
                process.env.SECRET_KEY
              );

              //FINALLY WE SEND THE TOKEN BACK TO USER WITH A SUCCESS MESSAGE
              res.status(200).json({
                message: "User added successfully to database",
                token: token,
              });
            })
            .catch((err) => {
                console.log(err);
              //IF ANY ERROR OCCURS WHILE SAVING THE USER TO THE DATABASE WE SEND A DATABASE ERROR RESPONSE
              res.status(500).json({
                error: "Database errorinside occurred!",
              });
            });
      }
    })
    .catch((err) => {
        console.log(err);
      //IF ANY ERROR OCCURS WHILE CHECKING FOR USER IN THE DATABASE WE SEND A DATABASE ERROR RESPONSE
      res.status(500).json({
        error: "Database error occurred!",
      });
    });
};


exports.signin=(req,res)=>
{
   
}