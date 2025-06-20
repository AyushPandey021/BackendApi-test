import express from 'express';
import { setAvailability, getAvailableSlots } from '../controllers/professorController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST: Set professor's available time slots (Protected)
router.post('/availability', protect, setAvailability);

// GET: Get all available slots of a specific professor
router.get('/:professorId/slots', getAvailableSlots);

export default router;
