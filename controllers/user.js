import User from '../models/User.js';
import Memory from '../models/Memory.js';

import Api400 from '../errors/Api400.js';
import Api404 from '../errors/Api404.js';
import Api401 from '../errors/Api401.js';

// Create
export const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const isUsernameUsed = await User.findOne({ username });
    if (isUsernameUsed) throw new Api400('Username is already in use.');

    const user = await User.create({ username, password });

    res.status(201).json({
      user,
      token: user.getToken(),
    });
  } catch (error) {
    next(error);
  }
};

// Read
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) throw new Api404('User not found.');

    const isPasswordCorrect = await user.checkPassword(password);
    if (!isPasswordCorrect) throw new Api401('Wrong password.');

    res.status(200).json({
      user,
      token: user.getToken(),
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

// Update
export const editUser = async (req, res, next) => {
  try {
    const user = req.user;
    const { username } = req.body;

    const isUsernameUsed = await User.findOne({ username });
    if (isUsernameUsed && isUsernameUsed._id.toString() !== user._id.toString())
      throw new Api400('Username is already in use.');

    user.username = username;
    await user.save();

    res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const user = req.user;
    const { password, newPassword } = req.body;

    const isPasswordCorrect = await user.checkPassword(password);
    if (!isPasswordCorrect) throw new Api401('Wrong password.');

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Delete
export const deleteUser = async (req, res, next) => {
  try {
    const user = req.user;
    const { password } = req.body;

    const isPasswordCorrect = await user.checkPassword(password);
    if (!isPasswordCorrect) throw new Api401('Wrong password.');

    await Memory.deleteMany({ userId: user._id.toString() });
    await user.delete();

    res.status(200);
  } catch (error) {
    next(error);
  }
};
