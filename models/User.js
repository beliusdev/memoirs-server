import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    unique: true,
    required: true,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcryptjs.hash(this.password, 12);
  next();
});

UserSchema.methods.checkPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

UserSchema.methods.getToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_CODE, {
    expiresIn: process.env.TOKEN_EXPIRE_TIME,
  });
};

const User = mongoose.model('User', UserSchema);
export default User;
