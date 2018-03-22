const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")

const userSchema = new Schema({
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre("save", function(next) {
  const user = this

  // if the user's password has changed since the last time the user was saved, or if this is a completely new user
  if (user.isModified("password") || user.isNew) {
    // hash their password
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        return next(err)
      }

      // set their password to be equal to the hash
      user.password = hash
      next()
    })
  } else {
    return next()
  }
})

// adds a method to all users to be able to compare a password
userSchema.methods.comparePassword = function(password) {
  // uses bcrypt to compare user's password with hash
  return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("User", userSchema);
