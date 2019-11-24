const path =require('path');
const http = require('http');
const fs = require('fs');
const express=require('express');
const exphbs = require('express-handlebars');
const app= express();

//handlebar middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:false }));

app.get('/',(req,res)=>{

          //  if(flag==0)
           // { 
           // res.render('home')
          //  }
           // else
            res.render('home',{name: names})
});

app.get('/ContactUs',(req,res)=>{

                flag=1;
               res.render('ContactUs')
});

app.get('/venu/:name',(req,res)=>{

      res.render('venu',{venu:req.params.name})

});

app.get('/selectTheme',(req,res)=>{

     res.render('selectTheme')
});
app.get('/themeSelected',(req,res)=>{

       res.render('themeSelected')
});
app.get('/payment',(req,res)=>{


     res.render('payment')
});

app.use('/',require('./routes/Authentication'))

 //static folder
app.use(express.static(path.join(__dirname,'views')));

const PORT=process.env.PORT || 1000;
app.listen(PORT, ()=>console.log("server started on Port 1000"));


var flag=0;
var names='Tumbling';