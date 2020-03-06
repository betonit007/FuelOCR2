import express from 'express';
const router = express.Router();

import authRoutes from './auth.js';

router.use(`/`, authRoutes);

export default router;
