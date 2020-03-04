import express, { Request, Response } from 'express';
const router = express.Router();
import validator from 'express-validator';
import auth from '../../middleware/auth.js';
import Reading from '../../models/Readings.js';
import User from '../../models/Users.js';

//Private POST route to record a reading
router.post(
  '/',
  auth,
  [
    validator
      .check('store', 'Store name is required')
      .not()
      .isEmpty(),
    validator
      .check('total', 'A total price must be included')
      .not()
      .isEmpty()
      .isNumeric(),
    validator
      .check('perGallon', 'A total price must be included')
      .not()
      .isEmpty()
      .isNumeric(),
    validator
      .check('numGallons', 'A numGallons price must be included')
      .not()
      .isEmpty()
      .isNumeric(),
  ],
  async (req: any, res: Response) => {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { store, street, city, state, total, perGallon, numGallons } = req.body;
      const user: any | null = await User.findById(req.user.id).select('-password');

      const newReading = new Reading({
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
        store,
        street,
        city,
        state,
        total,
        perGallon,
        numGallons,
      });

      const reading = await newReading.save();

      res.json(reading);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

//public route to get all readings
router.get('/', async (req: Request, res: Response) => {
  try {
    console.log('Backend route hit!');
    const readings = await Reading.find().sort({ date: -1 });
    res.json(readings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
