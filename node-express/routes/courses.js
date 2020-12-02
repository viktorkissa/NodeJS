const {Router} = require('express')
const { route } = require('./home')
const Course = require('../models/course')
const router = Router()
const auth = require('../middleware/auth')

function isOwner(course, req) {
    return course.userId.toString() === req.user._id.toString()
}   

router.get('/', async (req, res) => {
    try {
        const courses = await Course.find()
        .populate('userId', 'email name')
        .lean()  

        res.render('courses',  {
            title: 'Courses',
            isCourses: true,
            userId: req.user ? req.user._id.toString() : null,
            courses
        })
    } catch (err) {
        console.log(err)
    }    
})

router.get('/:id/edit', auth, async(req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    try {
        const course = await Course.findById(req.params.id).lean()

        if (!isOwner(course, req)) {
            return res.redirect('/courses')
        }

        res.render('course-edit', {
            title: `Edit ${course.title}`,
            course
        })

    } catch (err) {
        console.log(err)
    }
})

router.post('/edit', auth, async (req, res) => {
    try {
        const {id} = req.body
        delete req.body.id
        const course = await Course.findById(id)

        if (!isOwner(course, req)) {
            return res.redirect('/courses')
        }
        
        Object.assign(course, req.body)
        await course.save()
        res.redirect('/courses')
    } catch (err) {
        console.log(err)
    }    
})

router.post('/remove', auth, async (req, res) => {
    try {
        await Course.deleteOne({
            _id: req.body.id,
            userId: req.user._id
        })
        res.redirect('/courses')
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).lean()
        res.render('course', {
            layout: 'empty',
            title: `Course ${course.title}`,
            course
        })
    } catch (err) {
        console.log(err)
    }    
})

module.exports = router