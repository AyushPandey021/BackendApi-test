import Appointment from '../models/Appointment.js';
import Professor from '../models/Professor.js';

export const bookAppointment = async (req, res) => {
  const studentId = req.user._id;
  const { professorId, slot } = req.body;

  try {
    const prof = await Professor.findById(professorId);
    if (!prof) {
      return res.status(404).json({ message: 'Professor not found' });
    }

    let available = false;
    for (let i = 0; i < prof.availableSlots.length; i++) {
      const dateA = new Date(prof.availableSlots[i]);
      const dateB = new Date(slot);
      if (dateA.getTime() === dateB.getTime()) {
        available = true;
        break;
      }
    }

    if (!available) {
      return res.status(400).json({ message: 'Selected slot is not available' });
    }

    const newAppointment = new Appointment({
      student: studentId,
      professor: professorId,
      slot: slot
    });

    const saved = await newAppointment.save();

    prof.availableSlots = prof.availableSlots.filter((each) => {
      const a = new Date(each).getTime();
      const b = new Date(slot).getTime();
      return a !== b;
    });

    await prof.save();

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment: saved
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
