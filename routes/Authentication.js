const express = require('express');
const parser = require("body-parser");
const router = express();
const exphbs = require('express-handlebars');
const firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");
const app = express();


router.use(parser.json());
router.use(parser.urlencoded({ extended: true }));
var db = firebase.firestore();

router.post('/signin',(req,res)=>{


    firebase.auth().signInWithEmailAndPassword(req.body.email,req.body.password).then((cred)=>{
        res.redirect('/changelayouts/'+req.body.email)
   }).catch(err=>{
        console.log(err);
   });
   
 
});

router.get('/logout',(req,res)=>{


    firebase.auth().signOut();
    res.redirect('/changelayouts')
   
 
});	


router.post('/signup',(req,res)=>{

    
	var auth = firebase.auth();
    auth.createUserWithEmailAndPassword(req.body.Email,req.body.Passowrd).then((cred)=>{
    console.log(cred);
    let docRef = db.collection('users').doc(req.body.Name);
    let setAda = docRef.set({
        Name: req.body.Name,
        Passowrd: req.body.Passowrd,
        PaypalID: req.body.PaypalID,
        BankRouting: req.body.BankRouting,
        CheckingAcct: req.body.CheckingAcct,
        BusinessName: req.body.BusinessName,
        Address: req.body.Address,
        City: req.body.City,
        Phone: req.body.Phone,
        Email: req.body.Email,
        Website: req.body.Website
    })
	    auth = firebase.auth();
        firebase.auth().signInWithEmailAndPassword(req.body.Email,req.body.Passowrd).then((cred)=>{
            res.redirect('/changelayouts/'+req.body.email)
       }).catch(err=>{
            console.log(err);
       });
    }).catch(err=>{
     console.log(err);
     res.redirect('/');
    });

});



module.exports= router;

const flag=0;