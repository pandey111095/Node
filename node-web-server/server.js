const  express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app= express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method}  ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log +'\n',(err) => {
        if(err){
            console.log('Unable to Append server.log');
        }
    });
    next();
});


// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
//     next();
// });


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() =>{
    return new Date().getFullYear();
    //return 'test';
});


hbs.registerHelper('doUpper', (text='Ram') =>{
        return text.toUpperCase();
});


app.get('/', (req,res) =>{
    res.render('home.hbs',{
        pageTitle: 'Home',
        welcomMessage: 'Welcome to Home'
    })
});

// app.get('/',(req,res) =>{
//     //res.send('<h1>Hello World</h1>');
//     res.send({
//         name: 'Rahul',
//         likes: ['Biking' ,'Cricket']
//     })
// });

app.get('/about', (req,res) => {
   // res.send('About Page')                   if we want to send the file then we this syntax
   
   res.render('about.hbs', {                    // if we want to load dynamic page with handelbar package called hbs 
       pageTitle: 'About ',                     // for passing some data in hbs file we use second argument
   });                                          
                                               
});


app.get('/bad',(req,res) => {
    res.send({
        errorMessage:'Bad Request'
    });
});


app.listen(port, () => {
    console.log(`Server is ready to listen at ${port}`);
});


