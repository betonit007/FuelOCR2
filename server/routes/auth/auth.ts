import express, { Request, Response } from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';
import validator from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';

import { Document } from 'mongoose';
import User from '../../models/Users.js';

//Protected GET route to get user infor
router.get('/', auth, async (req: any, res: Response) => {
  try {
    const user: Document | null = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Public POST Route to login user
router.post(
  '/',
  [
    validator.check('email', 'Please include a valid email').isEmail(),
    validator.check('password', 'Password is required').exists(),
  ],
  async (req: Request, res: Response) => {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user: any | null = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 }, //expires in a hour
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        },
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

//Public POST Route to register user
router.post(
  '/user',
  [
    validator
      .check('name', 'Name is required')
      .not()
      .isEmpty(),
    validator.check('email', 'Please include a valid email').isEmail(),
    validator.check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, avatar } = req.body;

    try {
      let user: any | null = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 }, //expires in a hour
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        },
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

export default router;
