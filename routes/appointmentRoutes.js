import express from 'express';
import { bookAppointment } from '../controllers/appointmentController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST: Book appointment (Protected)
router.post('/book', protect, bookAppointment);

export default router;
