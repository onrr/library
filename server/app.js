const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')

const libraryRoutes = require('./routes/libraryRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
const port = 5000


// Middlewares
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/books', libraryRoutes)
app.use('/api/users', userRoutes)


// Connect DB
mongoose.connect('mongodb://127.0.0.1/library-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,

}).then(() => {
    app.listen(port, () => {
        console.log(`Server ${port} listening..`)
    })
}).catch((err) => {
    console.log(err)
})
