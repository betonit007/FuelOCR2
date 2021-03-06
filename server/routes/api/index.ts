import express from 'express';
const router = express.Router();

import readingsRoutes from './readings.js';

router.use(`/readings`, readingsRoutes);

export default router;
