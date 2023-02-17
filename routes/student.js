const express = require('express');
const router = express.Router();
const Student = require('../model/student');

// Getting all Student
router.get('/',async (req,res)=>{
    try{
        const student = await Student.find();
        res.json(student);
    }
    catch(eror){
        res.status(500).json({message: error.message});
    }
});

// Getting one
router.get('/:id',getStudent,(req,res)=>{
    res.send(res.student);
});


// Creating one 
router.post('/',async (req,res)=>{
    const student = new Student({
        name: req.body.name,
        class: req.body.class,
        phone: req.body.phone
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// Updating one 
router.patch('/:id',getStudent,async (req,res)=>{
    if(req.body.name != null){
        res.student.name = req.body.name;
    }
    if(req.body.class != null){
        res.student.class = req.body.class;
    }
    if(req.body.phone != null){
        res.student.phone = req.body.phone;
    }

    try {
        const updatedStudent = await res.student.save();
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
});

// Deleting one 
router.delete('/:id',getStudent, async (req,res)=>{
    let name =  res.student.name;
    try {
        await res.student.remove();
        res.status(200).json({message: "Student ("+name+") is Deleted"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

async function getStudent(req, res,next){
    let student
    try {
        student = await Student.findById(req.params.id)
        if(student == null){
            return res.status(404).json({message: "Student is not found"})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    res.student = student;
    next();
}
module.exports = router;