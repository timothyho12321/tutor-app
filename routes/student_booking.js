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
        // console.log("subjects: ", subjects);
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

        const { subjectId, 
                teacherId,
                subjectName,
                teacherName } = req.body;
        // console.log('Subject Name:', subjectId);
        // console.log('Teacher Name:', teacherId);
        // console.log('Subject Name:', subjectName);
        // console.log('Teacher Name:', teacherName);

        //find all lessons with that teacher_id and subject_id
        let allLessonsByTeacherAndSubject = await Lesson.query().where('teacher_id', teacherId)
                                            .andWhere('subject_id', subjectId)
                                            .andWhere('status', "Open")
                                            .andWhere('is_hide', 0)
                                            .orderBy('date', 'ASC')
                                            .orderBy('Time_start', 'ASC');

                                

        // console.log("allLessonsByTeacherAndSubject: ", allLessonsByTeacherAndSubject);
        res.render('booking_student_date', {
            subjectName: subjectName,
            teacherNameName: teacherName,
            teacherId: teacherId,
            // subjects: subjects,
            // date: entered_date 
            allLessonsByTeacherAndSubject: allLessonsByTeacherAndSubject
        });
    }

    async submitBookingDate(req, res) {

        const {
            selectedLessonId,
            teacherId
            }                   = req.body; 
        // console.log('selectedLessonId:', selectedLessonId);
        // console.log('Teacher Id:', teacherId);
        // console.log('cookie student Id:', req.cookies.student_id);
        // find lesson by lesson id
        // insert a new booking record with the details from lesson
        // update lesson status to Matched and is_hide to 1

        let lesson = await Lesson.query().findById(selectedLessonId);
        // console.log('name:', lesson.name);

        // search subject name by lesson.subject_id
        let subject = await Subject.query().findById(lesson.subject_id);

        let booking = await Booking.query().insert({
                                                    lesson_id: selectedLessonId,
                                                    name: lesson.name,
                                                    subject: subject.name, // Assuming this field exists in the lesson object
                                                    day: lesson.day, // Assuming this field exists in the lesson object
                                                    date: lesson.date,
                                                    time_start: lesson.time_start,
                                                    time_end: lesson.time_end,
                                                    duration: lesson.duration, // This might need to be calculated or set explicitly
                                                    mode: lesson.mode,
                                                    type: lesson.type, // Assuming this field exists in the lesson object
                                                    status: "Scheduled", // Assuming a default status for new bookings
                                                    is_hide: 0, // Assuming 0 means not hidden
                                                    rate: lesson.rate, // Assuming this field exists in the lesson object
                                                    pax: 1, // Assuming a default value, adjust as necessary
                                                    address: lesson.address, // Assuming this field exists in the lesson object
                                                    postal_code: lesson.postal_code, // Assuming this field exists in the lesson object
                                                    link: lesson.link, // Assuming this field exists in the lesson object
                                                    is_paid: 0, // Assuming 0 means not paid
                                                    paid_amount: 0, // Default value, assuming not paid yet
                                                    paid_date: null, // Null or a default value, assuming not paid yet
                                                    payor: null, // Null or a default value, assuming not paid yet
                                                    feedback: null, // Assuming feedback is not available at the time of booking
                                                    teacher_id: teacherId,
                                                    student_id: req.cookies.student_id
                                                    
                                                });
        let updatedLesson = await Lesson.query().findById(selectedLessonId).patch({
                                                    status: "Matched",
                                                    is_hide: 1
                                                });

        res.redirect(`/login/success`);
    }



}

// Usage with Express router
const studentBookingController = new StudentBookingController();
router.get('/add-student-booking', (req, res) => studentBookingController.addBookingView(req, res));
router.post('/add-student-booking', (req, res) => studentBookingController.addBookingDate(req, res));
router.post('/submit-student-booking', (req, res) => studentBookingController.submitBookingDate(req, res));


module.exports = router;