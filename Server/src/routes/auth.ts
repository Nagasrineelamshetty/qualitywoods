import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { IUser } from '../models/User';
import { Document } from 'mongoose';

const router = express.Router();

// Utility to generate JWT token
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
};

// POST /api/signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists)
      return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password });

    // Ensure _id is properly typed
    const typedUser = user as IUser & Document;

    const token = generateToken(typedUser._id.toString());

    res.status(201).json({
      token,
      user: {
        id: typedUser._id,
        name: typedUser.name,
        email: typedUser.email,
        isAdmin: typedUser.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error });
  }
});

// POST /api/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const typedUser = user as IUser & Document;

    const token = generateToken(typedUser._id.toString());

    res.status(200).json({
      token,
      user: {
        id: typedUser._id,
        name: typedUser.name,
        email: typedUser.email,
        isAdmin: typedUser.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
});

// POST /api/logout
router.post('/logout', (_req, res) => {
  res.status(200).json({ message: 'Logout success (client-side handled)' });
});

export default router;
