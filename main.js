const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");
const app = express();

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

//app.set('view options', { layout: 'other' });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {

    Themes = [];
    let venueRef = db.collection('venue');
    let Allvenueref = venueRef.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (flag == 0) {
            Allvenues.push(doc.data());
          }
        });
      }).then(function () {
        // console.log(venues);
        flag = 1;
        res.render('home', { venues: Allvenues })
        // res.render('BookedParties')
      }
      )
      .catch(err => {
        console.log('Error getting documents', err);
      });
});
app.get('/Host', (req, res) => {

    Themes = [];
    let venueRef = db.collection('venue');
    let Allvenues = venueRef.where('Owner','==',currentuser.Name).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          if (flag == 0) {
            yourvenues.push(doc.data());
          }
        });
      }).then(function () {
        // console.log(venues);
        flag = 1;
        res.render('Host', { venues: yourvenues })
      }
      )
      .catch(err => {
        console.log('Error getting documents', err);
      });

});

app.get('/changelayouts/:email', (req, res) => {

  if(layout==0)
  {
    venues=[];
    app.engine('handlebars', exphbs({ defaultLayout: 'Host' }));
    layout=1;
    flag=0;
    let userRef = db.collection('users');
    let query = userRef.where('Email', '==', req.params.email).get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        snapshot.forEach(doc => {
          currentuser=doc.data();
          res.redirect('/Host')
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }
  else{
    venues=[];
    app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
    layout=0;
    res.redirect('/')
  }
 

});

app.get('/ContactUs', (req, res) => {

  flag = 1;
  res.render('ContactUs')
});

app.post('/search', (req, res) => {

  search=venues.filter(venue => venue.Name.toUpperCase().includes(req.body.vName.toUpperCase()))
  console.log(search);
  res.render('home', { venues: search })

});
const getthemes = (req, res) => {
  
};

app.get('/selectTheme/:name', (req, res) => {

        
  let ThemesRef = db.collection('venue').doc(req.params.name);
  let getDoc = ThemesRef.get()
    .then(doc => {
      
   
        venue = doc.data();
        
        for (var i = 0, len = venue.Themes.length; i < len; i++) 
        {             
        let ThemeRef = db.collection('themes').doc(venue.Themes[i]);
        let getDoc = ThemeRef.get()
          .then(doc => {
              
              Themes.push(doc.data())  
              console.log(Themes.length)
              console.log(venue.Themes.length)
             if(Themes.length===venue.Themes.length)
             {
                res.redirect('/selectTheme') 
             };

          })     
          .catch(err => {
            console.log('Error getting document', err);
          });
          
        }
              
        
    })
    .catch(err => {
      console.log('Error getting document', err);
    })
})

app.get('/hostTheme/:name', (req, res) => {

        
  let ThemesRef = db.collection('venue').doc(req.params.name);
  let getDoc = ThemesRef.get()
    .then(doc => {
      
   
        venue = doc.data();
        for (var i = 0, len = venue.Themes.length; i < len; i++) 
        {             
        let ThemeRef = db.collection('themes').doc(venue.Themes[i]);
        let getDoc = ThemeRef.get()
          .then(doc => {
              
              Themes.push(doc.data())  
              console.log(Themes.length)
              console.log(venue.Themes.length)
             if(Themes.length===venue.Themes.length)
             {
                res.redirect('/hostTheme')

             };

          })     
          .catch(err => {
            console.log('Error getting document', err);
          });
          
        }
              
        
    })
    .catch(err => {
      console.log('Error getting document', err);
    })
})

app.get('/selectTheme', (req, res) => {

  res.render('selectTheme',{venue,Themes})
  Themes=[];
});

app.get('/hostTheme', (req, res) => {

  res.render('hostTheme',{venue,Themes})
  Themes=[];
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
      if(layout==0)
      {
      let ThemeRef = db.collection('users').doc(venue.Owner);
      let getDoc = ThemeRef.get()
        .then(doc => {

          user = doc.data();
          res.redirect('/themeSelected')
        })
        .catch(err => {
          console.log('Error getting document', err);
        })
      }
      else
      {
        let venueRef = db.collection('venue').doc(venue.Name);
        let setWithOptions = venueRef.set({
        Themes: [venue.Themes[0],theme.Name]
      }, {merge: true});
          res.redirect('/Host')
      }
    });

});




app.get('/themeSelected', (req, res) => {

  res.render('themeSelected',{venue,user,theme})
});

app.post('/Payment', (req, res) => {

  res.render('payment')
});

app.use('/', require('./routes/Authentication'))



app.post('/Host',(req,res)=>{

 /* let docRef = db.collection('venue').doc(req.body.Name);
  let setAda = docRef.set({
      Name: req.body.Name,
      Price: req.body.Price,
      Discription: req.body.Discription,
      Address: req.body.Address,
      City: req.body.City,
      BusinessName: req.body.Image,
      Owner: user.Name;
      Themes: []
  });*/
  res.redirect('/Host');

});
app.get('/DeleteTheme/:name', (req, res) => {

  let ThemeRef = db.collection('themes').doc(req.params.name);
  let getDoc = ThemeRef.get()
    .then(doc => {

      theme = doc.data();
      console.log(doc.data());
    })
    .catch(err => {
      console.log('Error getting document', err);
    }).then(doc => {
        var Dtheme = venue.Themes.filter(theme => theme.Name!=theme.Name);
        let venueRef = db.collection('venue').doc(venue.Name);
        let setWithOptions = venueRef.set({
        Themes: [Dtheme]
      }, {merge: true});
          res.redirect('/Host')

    });
})
app.get('/Themes/:name', (req, res) => {

  let ThemeRef = db.collection('themes');
   let getDoc = ThemeRef.get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      Themes.push(doc.data()) 
    });
  })
  .then(err => {
    res.redirect('/selectTheme') 
  }); 

});

//static folder


app.use(express.static(path.join(__dirname, 'views')));

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log("server started on Port 1000"));


var flag = 0;
var names = 'Tumbling';


var Allvenues = [];
var yourvenues=[];
var search=[];
var venue = {};
var Themes=[];
var theme={};
var user={};
var layout=0;
var currentuser={};