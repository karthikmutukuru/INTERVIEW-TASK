require('./index');
const express = require('express');
const employeeController = require('./controllers/employeeController');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

var app = express();
app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({extname:'hbs',defaultLayout:'mainLayout',layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine','hbs');
app.listen(3000,() => {
    console.log('App has started on 3000 port.');
});
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use('/employee',employeeController);