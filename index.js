const  mongoose = require('mongoose');
require('./modal');

mongoose.connect('mongodb://127.0.0.1:27017/employee',(err) => {
    if(!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : '+err);
    });
