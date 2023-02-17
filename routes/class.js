const express = require('express');
const router = express.Router();
const Course = require('../model/class');

// Getting all Course
router.get('/',async (req,res)=>{
    try{
        const classes = await Course.find();
        res.json(classes);
    }
    catch(eror){
        res.status(500).json({message: error.message});
    }
});

// Getting one
router.get('/:id',getClass,(req,res)=>{
    res.send(res.classes);
});

// Creating one 
router.post('/',async (req,res)=>{
    const classes = new Course({
        courseID: req.body.courseID,
        name: req.body.name,
        desc: req.body.desc,
        day: req.body.day,
        time: req.body.time,
        tutor: req.body.tutor
    });

    try {
        const newStudent = await classes.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// Updating one 
router.patch('/:id',getClass,async (req,res)=>{
    if(req.body.courseID != null){
        res.classes.courseID = req.body.courseID;
    }
    if(req.body.name != null){
        res.classes.name = req.body.name;
    }
    if(req.body.desc != null){
        res.classes.desc = req.body.desc;
    }
    if(req.body.day != null){
        res.classes.day = req.body.day;
    }
    if(req.body.time != null){
        res.classes.time = req.body.time;
    }
    if(req.body.tutor != null){
        res.classes.tutor = req.body.tutor;
    }
    if(req.body.count != null){
        res.classes.count = req.body.count;
    }
    try {
        const updatedStudent = await res.classes.save();
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
});

// Deleting one 
router.delete('/:id',getClass, async (req,res)=>{
    let courseID =  res.classes.courseID;
    try {
        await res.classes.remove();
        res.status(200).json({message: "Course ("+courseID+") is Deleted"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

async function getClass(req, res,next){
    let classes
    try {
        classes = await Course.findById(req.params.id)
        if(classes == null){
            return res.status(404).json({message: "Course is not found"})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    res.classes = classes;
    next();
}
module.exports = router;