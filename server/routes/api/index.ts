import express from 'express';
const router = express.Router();

import userRoutes from './users.js';
import readingsRoutes from './readings.js';
import authRoutes from './auth.js';

router.use(`/api/users`, userRoutes);
router.use(`/api/readings`, readingsRoutes);
router.use(`/api/auth`, authRoutes);

export default router;
