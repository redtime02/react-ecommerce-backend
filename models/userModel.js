const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const crypto = require('crypto');
const cryptoJS = require("crypto-js");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Array,
      default: [],
    },
    passwordChangedAt: {
      type: Date,
      select: true,
    },
    passwordResetToken: {
      type: String,
      select: true,
    },
    passwordResetExpires: {
      type: Date,
      select: true,
    },
    address: {
      type: String,
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  // next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = cryptoJS.lib.WordArray.random(32).toString();
  this.passwordResetToken = cryptoJS.SHA256(resetToken).toString();
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 10 phút
  return resetToken;
};

//Export the model
module.exports = mongoose.model("User", userSchema);
