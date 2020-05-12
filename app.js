const express = require("express");
const request= require("request");
const bodyParser = require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); // to use static files in local directory

app.listen(process.env.PORT ||3000, function(){  //process.env.PORT is used to deploy 
                                                // the app on a heroku server
    console.log("server is running on port 3000");
});

app.post("/", function(req,res){

    var firstName=req.body.fName;
    var lastName=req.body.lName;
    var email=req.body.email;

    //mailchip data format 
    var data={
        members:[         // members is an array of objects
            {
            email_address: email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
            }
        ],
       

    };

    var jsonData=JSON.stringify(data);  //transfrom JS into JSON type

    //options used in request function
    var options = {
        url:"https://us18.api.mailchimp.com/3.0/lists/63c5907593",
        method:"POST",
        headers:{
            "Authorization": "ayush1 c56114009ab4d102f3d06ce85724d0b9-us18"
        },
       body:jsonData
    }

    request(options, function(error, response, body){
        if(error){
            res.sendFile(__dirname+ "/failure.html");
        }else{
           if(response.statusCode===200){
               console.log(__dirname);
            res.sendFile(__dirname + "/success.html");
           }
           else{
            res.sendFile(__dirname+ "/failure.html");
           }
        }
    })

console.log(firstName, lastName, email);
});


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/failure", function(req,res){
    res.redirect("/");
});


//api key
// c56114009ab4d102f3d06ce85724d0b9-us18
//unique id
// 63c5907593