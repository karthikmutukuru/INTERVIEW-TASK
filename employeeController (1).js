const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var ValidationError = mongoose.Error.ValidationError;
const Employee = mongoose.model('Employee');
var ObjectId = require('mongoose').Types.ObjectId;

router.get('/',(req,res) => {
        res.render("employee/addOrEdit",{
                viewTitle : "Insert Employee"
            });
});

router.get('/login',(req,res) => {
    res.render("employee/login",{
        viewTitle : "Login Page"
    });
});

router.post('/',(req,res) => {
    if(req.body._id = '')
       insertRecord(req, res);
    else
       updateRecord(req,res);
});

function insertRecord(req,res){
    var employee = new Employee();
    employee.name = req.body.name;
    employee.salary = req.body.salary;
    employee.empCode = req.body.empCode;
    employee.mobile = req.body.mobile;
    employee.save((err,doc) => {
        if(!err)
            res.redirect('employee/list');
        else
        {
            if(err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee:req.body,
                });
            }
            else
                console.log('Failed to insert : '+err);
        }
    });
}

function handleValidationError(err,body)
{
    for(field in err.errors)
    {
        switch(err.errors[field].path){
            case 'name' :
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'mobile' :
                body['mobileError'] = err.errors[field].message;
                break;
            default:
                break;

        }
    }
}


router.get('/list',(req,res) => {
      Employee.find((err,docs) => {
        if(!err) {
            res.render('employee/list', {
                list: docs.map(document => {
                    return {
                        name: document.name,
                        salary: document.salary,
                        empCode: document.empCode,
                        mobile: document.mobile,
                    }
                })
            });
        }else{
            console.log('Error in fetching : '+err);
        }
    });
});

router.get('/:id',(req,res) => {
        Employee.findById({ _id : req.params.id}, (err, doc) => {
           if (!err) {
                res.render("employee/addOrEdit", {
                    viewTitle: "Update Employee",
                   employee: doc,
                });
            } else
               console.log('Error in fetching id ' + err);
         });
});

function updateRecord(req,res) {
    Employee.findOneAndUpdate({ _id : req.body._id }, req.body , { new : true },(err,doc) => {
        if(!err)
        { res.redirect('employee/list');}
        else
        {
            if(err.name == 'ValidationError')
            {
                res.render("employee/addOrEdit", {
                    viewTitle: "Update Employee",
                    employee: req.body,
                });
            }
            else
                    console.log('Error in updating record ' +err);
        }
    })
}

router.get('/delete/:id',(req,res) => {
    Employee.findByIdAndDelete({_id :req.params.id,(err , doc), => {
        if(!err){
            res.redirect('employee/list');
        }else
            console.log('Error in deleting : '+err);

    });
});

module.exports = router;