const errors = require('restify-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Auth = require('../config/auth')
const config = require('../config')

module.exports = server => {
  // Register a User
  server.post('/sign_up', (req, res, next) => {
    const { email, password } = req.body

    const user = new User({ email, password })

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err
      bcrypt.hash(user.password, salt, async (err, hash) => {
        if (err) throw err
        // Hash password
        user.password = hash
        // Save a User
        try {
          const newUser = await user.save()
          res.send(201, newUser)
          next()
        } catch (err) {
          return next(new errors.InternalError(err))
        }
      })
    })
  })

  // Auth a User
  server.post('/sign_in', async (req, res, next) => {
    const { email, password } = req.body

    try {
      // Authenticate a User
      const user = await Auth.authenticate(email, password)
      // Create Jwt
      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: '15m',
      })

      // Take issue and expiration of token
      const { iat, exp } = jwt.decode(token)

      // Response with Token
      res.send(200, { iat, exp, token })

      next()
    } catch (err) {
      return next(new errors.UnauthorizedError(err))
    }
  })
}
