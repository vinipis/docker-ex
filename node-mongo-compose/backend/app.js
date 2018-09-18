const express = require('express')
const restful = require('node-restful')
const server = express()
const mongoose = restful.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')

//Database
mongoose.Promise = global.Promise
mongoose.connect('mongodb://db/mydb')

//middlewares
server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(cors())

//ODM
const Client = restful.model('Client',{
    name: { type: String, require: true}
})

//Rest API
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOpitions({new: true, runValidators: true})

//routes
Client.register(server, '/clients')

//Teste nesta aula não é necessario
//server.get('/', (req, res, next) => res.send('backend'))

//Start Server
server.listen(3000)