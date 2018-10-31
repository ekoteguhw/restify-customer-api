const restify = require('restify')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const rjwt = require('restify-jwt-community')

const config = require('./config')

const server = restify.createServer()

// Middleware
server.use(restify.plugins.bodyParser())

// Protect Routes
server.use(
  rjwt({ secret: config.JWT_SECRET }).unless({
    path: ['/sign_in', '/sign_up'],
  }),
)

server.listen(config.PORT, () => {
  mongoose.set('useFindAndModify', false)
  mongoose.connect(
    config.MONGODB_URI,
    { useNewUrlParser: true },
  )
})

const db = mongoose.connection
db.on('error', err => console.log(err))
db.once('open', () => {
  require('./routes/customers')(server)
  require('./routes/users')(server)
  console.log(`Server listen on port ${config.PORT}`)
})
