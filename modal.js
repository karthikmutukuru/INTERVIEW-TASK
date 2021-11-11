const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
   name: {
       type: String,
       required : 'This is a mandatory field.'
   },
    salary:{
        type: String,
    },
    empCode: {
        type: String,
    },
    mobile:  {
    type: String,
     },

});

employeeSchema.path('mobile').validate((val) => {
    mobileRegex = /^(0|[+91]{3})?[7-9][0-9]{9}$/;
    return mobileRegex.test(val);
},'Invalid Number');

mongoose.model('Employee',employeeSchema);