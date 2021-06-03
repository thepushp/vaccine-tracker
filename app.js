// const fs = require('fs');
const hbs = require('hbs');
const express = require('express');
const app = express();
const path = require('path');
const port = 8084;
// const center_info=require('./public/js/searchbar');


const tmp=path.join(__dirname, './templates');
const hbspath=path.join(__dirname, './templates/partials');
hbs.registerPartials(hbspath);
app.set("view engine",'hbs')
app.set("views",tmp);

const stpath=path.join(__dirname, './public');
app.use(express.static(path.join(__dirname, './public')));
console.log(stpath);

let props=[{
    link:"uWGTciX795o"
},
{
    link:"zvSxJ0bkPmI"
},
{
    link:"OG8bU1OJlm8"
},
{
    link:"p8OOqnLJs2Q"
},
{
    link:"GhPbcwA8EiA"
},
{
    link:"gZIPSJSYvkE"
},
];
console.log(props[0].link)

app.get('/', (req,res)=>{
    res.render('../templates/index',{show_props:props});
    // res.send("yes launched successfully")
});

app.get('/home', (req,res)=>{
    res.render('../templates/index',{show_props:props});
    // res.send("yes launched successfully")
});
app.get('/searchbypin', (req,res)=>{
    res.render('../templates/searchbypin',{show_props:props});
    // res.send("yes launched successfully")
});
app.get('/searchbydistrict', (req,res)=>{
    res.render('../templates/index',{show_props:props});
    // res.send("yes launched successfully")
});
app.get('/certificate', (req,res)=>{
    res.render('../templates/certificate',{show_props:props});
    // res.send("yes launched successfully")
});


app.listen(process.env.PORT|| port,()=>{
    console.log("hureyyy server started successfully ...")
})
