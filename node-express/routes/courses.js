const {Router} = require('express')
const { route } = require('./home')
const router = Router()

router.get('/', (req, res) => {
    res.render('courses',  {
        title: 'Courses',
        isCourses: true
    })
})

module.exports = router