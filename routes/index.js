var express = require('express');
var router = express.Router();
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"Bks4u"
});

var uid = 0;

/* GET home page. */
router.get('/login',function(req,res,next){
  res.render('login',{title:'Welcome'});
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Books4u' });
});

router.get('/home',function(req,res,next){
  res.render('home',{title:'Welcome'});
});



router.post('/', function(req, res, next){
  
    con.query({
      sql : "insert into user_info(uName,uPassword,u_id,uPh_no,uEmail_id,uSem) values(?,?,?,?,?,?)",
      values : [req.body.username, req.body.password, uid, req.body.phone, req.body.email, req.body.semester]
    },
    function(err,result, fields){
      if(err) throw err;
      else console.log("Value inserted");
    });
    
    res.render('home',{username:req.body.username});
});
module.exports = router;

router.post('/login', function(req, res, next){
    console.log(req.body);
    con.query({
      sql : "Select * from user_info where uEmail_id = ?",
      values : [req.body.Email]
    },
    function(err,result, fields){
      if(err) throw err;
      else 
      {
          console.log(result);
         if(result.length >0){
            console.log(result[0].uName);
             if(result[0].uPassword == req.body.password){
                res.render('home',{username:result[0].uName});
             }else{
                console.log("WRONG PASSWORD");
          res.render('login',{title:'Welcome'});
                  }
        }
        else{
          console.log("result empty");
          res.render('login',{title:'Welcome'});
        }
      }
      });
  });
    // function(err,result, fields){
    //    if (error) {
    // // console.log("error ocurred",error);
    //       res.send({
    //         "code":400,
    //         "failed":"error ocurred"
    //       });
    //   }else{
    // // console.log('The solution is: ', results);
    //       if(result.length >0){
    //         if([0].password == password){
    //           res.send({
    //             "code":200,
    //             "success":"login sucessfull"
    //               });
    //         }}
    //     else{
    //       res.send({
    //         "code":204,
    //         "success":"Email and password does not match"
    //           });
    //     }
    //   }
    //   // else{
    //   //   res.send({
    //   //     "code":204,
    //   //     "success":"Email does not exits"
    //   //       });
    //   // }
    
    // });
    
      
      
     
  
