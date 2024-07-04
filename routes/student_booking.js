const express = require('express');
const path = require('path'); 
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model defined
const Teacher = require('../models/Teacher');
const Booking = require('../models/Booking');
const Lesson = require('../models/Lesson');
const Subject = require('../models/Subject');
const SubjectTeacher = require('../models/Subject Teacher');

class StudentBookingController {
    async addBookingView(req, res) {
        let subjects = req.cookies.subjects_student_id;
        console.log("subjects: ", subjects);
        // convert subject name to the id from the subject table
        let allClassesObject = {};
        for (let subjectId of subjects) {
            let subjectName = await Subject.query().findById(subjectId);
            // allClassesObject[subjectName.name] = "";

            let teachersSubject = await SubjectTeacher.findAllBySubjectId(subjectId);
            // console.log("teachersSubject: ", teachersSubject);  
            
            let allTeachers = [];
            // console.log("entered");
            for (let teacher of teachersSubject) {
                let teacherId = teacher.teacher_id;
                let teacherProfile = await Teacher.query().findById(teacherId);

                let teacherDetails = {};
                teacherDetails["name"] = teacherProfile.name;
                teacherDetails["description"] = teacherProfile.description;
                teacherDetails["years_experience"] = teacherProfile.years_experience;
                teacherDetails["link"] = teacherProfile.link;
                teacherDetails["achievement"] = teacherProfile.achievement;
                teacherDetails["subject_id"] = subjectId;
                teacherDetails["teacher_id"] = teacherId;
                

                allTeachers.push(teacherDetails);
            }
            // console.log("allTeachers: ", allTeachers);
            allClassesObject[subjectName.name] = allTeachers;
        }
        console.log("allClassesObject: ", allClassesObject);

        res.render('add_booking_student', {
            studentId: req.cookies.student_id,
            subjects: subjects,
            allClassesObject: allClassesObject
        });
    }

    async addBookingDate(req, res) {

        const { subjectId, teacherId } = req.body;
        console.log('Subject Name:', subjectId);
        console.log('Teacher Name:', teacherId);
        
        res.render('booking_student_date', {
            // teacherId: req.cookies.student_id,
            // subjects: subjects,
            // date: entered_date
        });
    }


}

// Usage with Express router
const studentBookingController = new StudentBookingController();
router.get('/add-student-booking', (req, res) => studentBookingController.addBookingView(req, res));
router.post('/add-student-booking', (req, res) => studentBookingController.addBookingDate(req, res));

module.exports = router;