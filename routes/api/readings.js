const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const Reading = require('../../models/Readings')
const User = require('../../models/Users')

//Private POST route to record a reading
router.post('/', [ 
    auth, 
    [ 
        check('store', 'Store name is required').not().isEmpty(),
        check('total', 'A total price must be included').not().isEmpty().isNumeric(),
        check('perGallon', 'A total price must be included').not().isEmpty().isNumeric(),
        check('numGallons', 'A numGallons price must be included').not().isEmpty().isNumeric(),
    ] 
], 
    async (req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() })
      }
      try {
        
        const { store, street, city, state, total, perGallon, numGallons } = req.body
        const user = await User.findById(req.user.id).select('-password')

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
            numGallons
        })

        const reading = await newReading.save()

        res.json(reading)
          
      } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
      }
})

//public route to get all readings
router.get('/', async (req, res) => {
  try {
     
    const readings = await Reading.find().sort({ date: -1 })
    res.json(readings)

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//public route to get all readings
router.get('/', async (req, res) => {
    try {
       
      const readings = await Reading.find().sort({ date: -1 })
      res.json(readings)
  
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  })

module.exports = router