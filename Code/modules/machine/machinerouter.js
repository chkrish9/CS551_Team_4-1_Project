var express = require('express');
var router = express.Router();

var Machine = require('../../models/machine');
var session = require('express-session');
//retriving todos
router.get('/todos/:email', (req, res, next) => {
    console.log(req.user);
    req.session.email=req.params.email;
    Machine.getMachines(req.params.email,(err, todos) => {
        res.json(todos);
    });
    //res.send('Redirected to Contant list');
});

//add machine
router.post('/machine', (req, res, next) => {
    //logic to add machine
    let newTodo = new Machine({
        email: req.body.email,
        task: req.body.task,
        isCompleted: req.body.isCompleted,
        isEditing: req.body.isEditing
    });
    Machine.addTodo(newTodo, (err, machine) => {
        if (err) {
            res.json({ msg: 'Failed while adding new contact', status: 'error' });
        } else {
            // res.json({ msg: 'new contact added successfully' });
           Machine.getMachines(machine.email,(err, todos) => {
                res.json(todos);
           });
        }
    });
});

//update machine
router.put('/machine/:id', function (req, res,next) {
    var id = req.params.id;
    var update = (req.body.task === undefined) ? { isCompleted : req.body.isCompleted }:{ task: req.body.task };
    Machine.updateTodo(id, update, (err, machine) => {
         if (err) {
            res.json({ msg: 'Failed while updating contact', status: 'error' });
        } else {
            // res.json({ msg: 'new contact added successfully' });
           Machine.getMachines(machine.email,(err, todos) => {
                res.json(todos);
           });
        }
    });
});

//delete machine
router.delete('/machine/:id', (req, res, next) => {
    //logic to delete machine
    Machine.deleteTodo(req.params.id,(err, result) => {
        if (err) {
            res.json({ msg: 'Failed while deleting contact', status: 'error',success:false });
        } else {
           
            Machine.getMachines(req.session.email,(err, todos) => {
                    res.json(todos);
            });
        }
    })
});

module.exports = router;