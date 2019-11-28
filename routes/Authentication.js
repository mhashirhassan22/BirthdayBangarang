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


    firebase.auth().signInWithEmailAndPassword(req.body.email,req.body.password).then((cred)=>{
    console.log(cred);
   }).catch(err=>{
        console.log(err);
   });

   res.redirect('/')
});

	


router.post('/signup',(req,res)=>{


	var auth = firebase.auth();
    auth.createUserWithEmailAndPassword(req.body.email,req.body.password).then((cred)=>{
    console.log(cred);
    }).catch(err=>{
     console.log(err);
    });
    res.redirect('/');

});



module.exports= router;

const flag=0;