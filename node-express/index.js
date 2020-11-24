require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cartRoutes = require('./routes/cart')
const ordersRoutes = require('./routes/orders')
const User = require('./models/user')
const { text } = require('express')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main', 
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  });

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('5fbbdef691e8ce55886cf03b') 
         req.user = user
         next()
    } catch (e) {
        console.log(e)
    }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/cart', cartRoutes)
app.use('/orders', ordersRoutes)

// app.get('/', (req, res) => {
//     // res.status(200) // goes by default
//     // res.sendFile(path.join(__dirname, 'views', 'index.html'))
//     res.render('index', {
//         title: 'Main page',
//         isHome: true
//     }) // when use handlebars
// })

// app.get('/about', (req, res) => {
//     // res.sendFile(path.join(__dirname, 'views', 'about.html'))
//     res.render('about',  {
//         title: 'About',
//         isAbout: true
//     })
// })

const PORT = process.env.PORT || 3000


async function start() {
    try {
        const URL = `mongodb+srv://${process.env.MONGODB_NAME}:${process.env.MONGODB_PASSWORD}@cluster0.z75lf.mongodb.net/shop`
        await mongoose.connect(URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        const candidate = await User.findOne() // returns one item if exists
        if (!candidate) {
            const user = new User({
                email: 'viktorkyssa23021994@gmail.com',
                name: 'Viktor',
                cart: {items: []}
            })
            await user.save()
        }
    
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}...`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()