//npm run devstart in terminal

var express = require('express');
var router = express.Router();
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"bks4u"
});

var uid = 0,customer_id=0,book_id = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('welcome',{title:'Welcome:)'});
});

router.get('/login1',function(req,res,next){
  res.render('login1',{title:'Please login your details'});
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Books4u' });
});

// router.get('/buy',function(req,res,next){
//   res.render('buy',{title: 'Buy'})
// })

router.get('/pad',function(req,res,next){
  res.render('pad',{title:'Post Ad!!!'});
});

router.get('/logout',function(req,res,next){
  res.render('logout',{title:'Please login your details'});
});

//Signup Form
router.post('/signup', function(req, res, next){
  
    con.query({
      sql : "insert into user_info(uName,uPassword,u_id,uPh_no,uEmail_id,uSem) values(?,?,?,?,?,?)",
      values : [req.body.username, req.body.password, uid, req.body.phone, req.body.email, req.body.semester]
    },
    function(err,result, fields){
      if(err) throw err;
      else
      {
        con.query({
        sql : "Select max(u_id) as mid from user_info",
        //values : [req.body.phone]
        },
        function(err,result1, fields){
          console.log('hello');
          console.log(result1[0].mid);
            con.query({
              //sql: "call curDate (?) ;",
              // values:[result1[0].mid]
              sql: "Select * from user_info"
              },
             function(err,result2, fields){
                //console.log(result2[0]);
                   con.query({
                  sql : "Select * from books join seller_info on books.Book_id = seller_info.Book_id"
                 
                  },

                  function(err,result3,fields)
                  {
                    console.log(req.body.username);
                    console.log(result3[0]);
                    console.log(result3[1]);
                    console.log(result3[2]);
                    res.render('home',{username:req.body.username,Subject:result3[0].Name,Price:result3[0].MRP,Author:result3[0].Author,
                                    Subject1:result3[1].Name,Price1:result3[1].MRP,Author1:result3[1].Author,
                                    Subject2:result3[2].Name,Price2:result3[2].MRP,Author2:result3[2].Author,
                                    Name:result3[0].sName,Pno:result3[0].sPh_no,Address:result3[0].sAddress,Email:result3[0].sEmail,
                                  Name1:result3[1].sName,Pno1:result3[1].sPh_no,Address1:result3[1].sAddress,Email1:result3[1].sEmail,
                                  Name2:result3[2].sName,Pno2:result3[2].sPh_no,Address2:result3[2].sAddress,Email2:result3[2].sEmail
                              });

                });
           });
      });
    }
});
    
    // res.render('home',{username:req.body.username});
});
 module.exports = router;

router.get('/home',function(req,res,next){ 
con.query({
       sql : "Select * from books join seller_info on books.Book_id = seller_info.Book_id"
       // values:[s.Book_id]
  },

    function(err,result1,fields)
    {
      // res.render('home');
      console.log(result1[0]);
      console.log(result1[1]);
      console.log(result1[2]);
      res.render('home',{Subject:result1[0].Name,Price:result1[0].MRP,Author:result1[0].Author,
                      Subject1:result1[1].Name,Price1:result1[1].MRP,Author1:result1[1].Author,
                      Subject2:result1[2].Name,Price2:result1[2].MRP,Author2:result1[2].Author,
                      Name:result1[0].sName,Pno:result1[0].sPh_no,Address:result1[0].sAddress,Email:result1[0].sEmail,
                    Name1:result1[1].sName,Pno1:result1[1].sPh_no,Address1:result1[1].sAddress,Email1:result1[1].sEmail,
                    Name2:result1[2].sName,Pno2:result1[2].sPh_no,Address2:result1[2].sAddress,Email2:result1[2].sEmail
                  });

    });
     //res.render('login1',{title:'Welcome',login_status:'Login Again!!'});//
});





//Login form
router.post('/login1', function(req, res, next){
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
                // res.render('home',{username:result[0].uName,});
                 con.query({
       sql : "Select * from books join seller_info on books.Book_id = seller_info.Book_id"
       // values:[s.Book_id]
  },

    function(err,result1,fields)
    {
      // res.render('home');
      console.log(result[0].uName);
      console.log(result1[1]);
      console.log(result1[2]);
      res.render('home',{username:result[0].uName,Subject:result1[0].Name,Price:result1[0].MRP,Author:result1[0].Author,
                      Subject1:result1[1].Name,Price1:result1[1].MRP,Author1:result1[1].Author,
                      Subject2:result1[2].Name,Price2:result1[2].MRP,Author2:result1[2].Author,
                      Name:result1[0].sName,Pno:result1[0].sPh_no,Address:result1[0].sAddress,Email:result1[0].sEmail,
                    Name1:result1[1].sName,Pno1:result1[1].sPh_no,Address1:result1[1].sAddress,Email1:result1[1].sEmail,
                    Name2:result1[2].sName,Pno2:result1[2].sPh_no,Address2:result1[2].sAddress,Email2:result1[2].sEmail
                  });

    });
             }
              else{
                  console.log("WRONG PASSWORD");
                 res.render('login1',{title:'Welcome',login_status:'Login Form'});
                  }
          }
              else{
                console.log("result empty");
                res.render('login1',{title:'Welcome',login_status:'Login Form'});
              }
      }
      });
});
   
 //Post ad Form     
  


router.post('/pad', function(req, res, next){
console.log(req.body.sem);
  con.query({
    sql: "insert into books(Name,Author,Branch,Semester,MRP,your_Price,Book_id) values(?,?,?,?,?,?,?)",
    values:[req.body.name,req.body.author,req.body.branch,req.body.sem,req.body.mrp,req.body.price,book_id]
  },
  function(err,result,fields)
  {
    console.log("done!!");
  });

  if(req.body.want == 'buy')
  {    
    con.query({
      sql : "insert into buyer_info(bName,bPh_no,b_id,buyer_id,bEmail,bAddress) values(?,?,?,?,?,?)",
      values : [req.body.username, req.body.pno, uid, customer_id, req.body.email, req.body.address]
    },
    function(err1,result1, fields1){
      if(err1){
        console.log(err1);
      }

      else
       console.log("Value inserted");
    });
  }

  else if(req.body.want == 'sell')
  {
      con.query({
      sql : "insert into seller_info(sName,sPh_no,s_id,seller_id,sEmail,sAddress) values(?,?,?,?,?,?)",
      values : [req.body.username, req.body.pno, uid, customer_id, req.body.email, req.body.address]
    },
    function(err1,result1, fields1){
      if(err1){
        console.log(err1);
      }
      else 
        console.log("Value inserted");
    });
  }
    
   res.render('login1',{title:'Welcome',login_status:'Login Again!!'});

});

//Logout form
router.post('/logout', function(req, res, next){
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
                // res.render('home',{username:result[0].uName,});
                 con.query({
       sql : "Select * from books join seller_info on books.Book_id = seller_info.Book_id"
       // values:[s.Book_id]
  },

    function(err,result1,fields)
    {
      // res.render('home');
      console.log(result[0].uName);
      console.log(result1[1]);
      console.log(result1[2]);
      res.render('home',{username:result[0].uName,Subject:result1[0].Name,Price:result1[0].MRP,Author:result1[0].Author,
                      Subject1:result1[1].Name,Price1:result1[1].MRP,Author1:result1[1].Author,
                      Subject2:result1[2].Name,Price2:result1[2].MRP,Author2:result1[2].Author,
                      Name:result1[0].sName,Pno:result1[0].sPh_no,Address:result1[0].sAddress,Email:result1[0].sEmail,
                    Name1:result1[1].sName,Pno1:result1[1].sPh_no,Address1:result1[1].sAddress,Email1:result1[1].sEmail,
                    Name2:result1[2].sName,Pno2:result1[2].sPh_no,Address2:result1[2].sAddress,Email2:result1[2].sEmail
                  });

    });
             }
              else{
                  console.log("WRONG PASSWORD");
                 res.render('login1',{title:'Welcome',login_status:'Login Form'});
                  }
          }
              else{
                console.log("result empty");
                res.render('logout',{title:'Welcome',login_status:'Login Form'});
              }
      }
      });
});



