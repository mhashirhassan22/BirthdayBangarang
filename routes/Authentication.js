const express = require('express');
const parser = require("body-parser");
const router = express();
const firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");



router.use(parser.json());
router.use(parser.urlencoded({ extended: true }));
var db = firebase.firestore();

router.post('/signin',(req,res)=>{


    firebase.auth().signInWithEmailAndPassword(req.body.Email,req.body.Passowrd).then((cred)=>{
    console.log(cred);
   }).catch(err=>{
        console.log(err);
   });

   res.redirect('/')
});

	


router.post('/signup',(req,res)=>{

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
    });
	var auth = firebase.auth();
    auth.createUserWithEmailAndPassword(req.body.Email,req.body.Passowrd).then((cred)=>{
    console.log(cred);
    }).catch(err=>{
     console.log(err);
    });
    res.redirect('/');

});



module.exports= router;

const flag=0;