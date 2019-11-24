const express= require('express');
const router=express.Router();
const path =require('path');




router.post('/signin',(req,res)=>{


    res.redirect('/')
	
});


router.post('/signup',(req,res)=>{


	res.render('payment')

});



module.exports= router;

const flag=0;