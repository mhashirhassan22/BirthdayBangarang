const path = require('path');
const http = require('http');
const fs = require('fs');
const express = require('express');
const exphbs = require('express-handlebars');
const firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");
const app = express();
const parser = require("body-parser");

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
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {


  let venueRef = db.collection('venue');
  let Allvenues = venueRef.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if (flag == 0) {
          venues.push(doc.data());
        }
      });
    }).then(function () {
      // console.log(venues);
      flag = 1;
      res.render('home', { venues })
    }
    )
    .catch(err => {
      console.log('Error getting documents', err);
    });

});

app.get('/ContactUs', (req, res) => {

  flag = 1;
  res.render('ContactUs')
});


app.get('/selectTheme/:name', (req, res) => {

  let ThemesRef = db.collection('venue').doc(req.params.name);
  let getDoc = ThemesRef.get()
    .then(doc => {
      
   
        venue = doc.data();
 
        for (var i = 0, len = venue.Themes.length; i < len; i++) {             
        let ThemeRef = db.collection('themes').doc(venue.Themes[i]);
        let getDoc = ThemeRef.get()
          .then(doc => {
          
              Themes.push(doc.data())  

          })     
          .catch(err => {
            console.log('Error getting document', err);
          });
        }

    
      
    })
    .catch(err => {
      console.log('Error getting document', err);
    }).then(doc => {
      console.log(Themes);
      res.redirect('/selectTheme')
  }
  );

})
app.get('/selectTheme', (req, res) => {


  res.render('selectTheme',{venue,Themes})
});


app.get('/themeSelected/:name', (req, res) => {

  let ThemeRef = db.collection('themes').doc(req.params.name);
  let getDoc = ThemeRef.get()
    .then(doc => {

      theme = doc.data();
      console.log(doc.data());
    })
    .catch(err => {
      console.log('Error getting document', err);
    }).then(doc => {
      let ThemeRef = db.collection('users').doc(venue.Owner);
      let getDoc = ThemeRef.get()
        .then(doc => {

          user = doc.data();
          res.redirect('/themeSelected')
        })
        .catch(err => {
          console.log('Error getting document', err);
        })
    });

});




app.get('/themeSelected/', (req, res) => {
  console.log(venue);
  console.log(user);
  console.log(theme);
  res.render('themeSelected',{venue,user,theme})
});

app.get('/payment', (req, res) => {


  res.render('payment')
});

app.use('/', require('./routes/Authentication'))

//static folder


app.use(express.static(path.join(__dirname, 'views')));

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log("server started on Port 1000"));


var flag = 0;
var names = 'Tumbling';


const venues = [];

var venue = {};
var Themes=[];
var theme={};
var user={};