const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
})

UserSchema.plugin(timestamp)

const user = mongoose.model('User', UserSchema)

module.exports = user
