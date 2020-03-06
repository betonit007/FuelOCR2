import express from 'express';
const router = express.Router();

import apiRoutes from './api/index.js';
import authRoutes from './auth/index.js';

router.use(`/api`, apiRoutes);
router.use(`/auth`, authRoutes);

export default router;
