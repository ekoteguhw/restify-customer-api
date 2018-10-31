const errors = require('restify-errors')
const Customer = require('../models/customer')

module.exports = server => {
  // Get all Customers
  server.get('/customers', async (req, res, next) => {
    try {
      const customers = await Customer.find({})
      res.send(200, customers)
      next()
    } catch (err) {
      return next(new errors.InvalidContentError(err))
    }
  })

  // Get a Customer
  server.get('/customers/:id', async (req, res, next) => {
    try {
      const customer = await Customer.findById(req.params.id)
      res.send(200, customer)
      next()
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no customer with the id of ${req.params.id}`,
        ),
      )
    }
  })

  // Post a Customer
  server.post('/customers', async (req, res, next) => {
    if (!req.is('application/json')) {
      next(new errors.InvalidContentError("Expect 'application/json'"))
    }

    const { name, email, balance } = req.body
    const customer = new Customer({ name, email, balance })

    try {
      const newCustomer = await customer.save()
      res.send(201, newCustomer)
      next()
    } catch (err) {
      return next(new errors.InternalError(err))
    }
  })

  // Update a Customer
  server.put('/customers/:id', async (req, res, next) => {
    if (!req.is('application/json')) {
      next(new errors.InvalidContentError("Expect 'application/json'"))
    }

    try {
      const customer = await Customer.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
      )
      res.send(200, customer)
      next()
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no customer with the id of ${req.params.id}`,
        ),
      )
    }
  })

  // Delete a Customer
  server.del('/customers/:id', async (req, res, next) => {
    try {
      const customer = await Customer.findByIdAndRemove({ _id: req.params.id })
      res.send(204, customer)
      next()
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no customer with the id of ${req.params.id}`,
        ),
      )
    }
  })
}
