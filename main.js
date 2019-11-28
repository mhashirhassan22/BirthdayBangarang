const path =require('path');
const http = require('http');
const fs = require('fs');
const express=require('express');
const exphbs = require('express-handlebars');
const firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");
const app= express();

const firebaseConfig = {
     apiKey: "AIzaSyCtCT7Et6ukWw6Alok-PYzWg3ZK7s9x9pk",
     authDomain: "project-dff1f.firebaseapp.com",
     databaseURL: "https://project-dff1f.firebaseio.com",
     projectId: "project-dff1f",
     storageBucket: "project-dff1f.appspot.com",
     messagingSenderId: "469353822648",
     appId: "1:469353822648:web:b2622b46eacdc56232b74d"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

//handlebar middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:false }));

app.use("/css",express.static(path.join(__dirname,'views/css')));
app.use("/assets",express.static(path.join(__dirname,'views/assets')));
app.use("/bootstrap-4",express.static(path.join(__dirname,'views/bootstrap-4')));
app.use("/fontawesome",express.static(path.join(__dirname,'views/fontawesome')));
app.use("/fonts",express.static(path.join(__dirname,'views/fonts')));
app.use("/images",express.static(path.join(__dirname,'views/images')));
app.use("/jquery",express.static(path.join(__dirname,'views/jquery')));
app.use("/js",express.static(path.join(__dirname,'views/js')));

app.get('/',(req,res)=>{

     let venueRef = db.collection('venue');
     let Allvenues = venueRef.get()
       .then(snapshot => {
         snapshot.forEach(doc => {
          venues.push(doc.data());
         
         });
       }).then(function() {
          console.log(venues);
          res.render('home',{venues})
       }
          )
       .catch(err => {
         console.log('Error getting documents', err);
       });
            
});

app.get('/ContactUs',(req,res)=>{

                flag=1;
               res.render('ContactUs')
});

app.get('/venu/:name',(req,res)=>{

     let cityRef = db.collection('venue').doc(req.params.name);
let getDoc = cityRef.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
      venue=doc.data()
      res.render('venu',{venue})
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
      res.render('venu',{venue})

});


app.get('/selectTheme/:name',(req,res)=>{

      res.redirect('/selectTheme')

   
});
app.get('/selectTheme',(req,res)=>{

     res.render('selectTheme')

  
});

app.get('/themeSelected/:name',(req,res)=>{

       res.render('themeSelected')
});
app.get('/payment',(req,res)=>{


     res.render('payment')
});

app.use('/',require('./routes/Authentication'))

 //static folder




const PORT=process.env.PORT || 1000;
app.listen(PORT, ()=>console.log("server started on Port 1000"));


var flag=0;
var names='Tumbling';


var venues=[];

var venue={};
