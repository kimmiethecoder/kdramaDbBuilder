//Require Dependencies
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8005
require('dotenv').config()

//Declared DB Variables
let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'kdrama-app'

//Connect to Mongo
MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })


//Set Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//CRUD Methods
app.get('/', (request, response) => {
    db.collection('kdrama-info').find().toArray()
        .then(data => {
            let nameList = data.map(item => item.title)
            console.log(nameList)
            response.render('index.ejs', {info: nameList})
        })
        .catch(error => console.log(error))
})

app.post('/api', (request, response) => {
    console.log('Post Heard')
    db.collection('kdrama-info').insertOne(
        request.body
    )
    .then(result => {
        console.log(result)
        response.redirect('/')
    })
})

app.put('/updateEntry', (request, response) => {
    console.log(request.body)
    Object.keys(request.body).forEach(key => {
        if (request.body[key] === null || request.body[key] === undefined || request.body[key] === "") {
            delete request.body[key]
        }
    })
    console.log(request.body)
    db.collection('kdrama-info').findOneAndUpdate(
        {name: request.body.name},
        {
            $set: request.body
        }
    )
    .then(result => {
        console.log(result)
        response.json('Success')
    })
    .catch(error => console.log(error))
})

app.delete('/deleteEntry', (request, response) => {
    db.collection('kdrama-info').deleteOne(
        {name: request.body.name},
    )
    .then(result => {
        console.log('Entry Deleted')
        response.json('Entry Deleted')
    })
    .catch(error => console.log(error))
})

//Set up localhost on PORT
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})