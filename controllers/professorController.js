import Professor from '../models/Professor.js';

export const setAvailability = async (req, res) => {
  const { name, availableSlots } = req.body;

  try {
    let professor = await Professor.findOne({ name });

    if (!professor) {
      const newProfessor = new Professor({
        name: name,
        availableSlots: availableSlots
      });

      const savedProfessor = await newProfessor.save();

      return res.status(200).json({
        message: 'Availability set successfully',
        professor: savedProfessor
      });
    } else {
      professor.availableSlots = availableSlots;

      const updated = await professor.save();

      return res.status(200).json({
        message: 'Availability updated',
        professor: updated
      });
    }

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getAvailableSlots = async (req, res) => {
  const professorId = req.params.professorId;

  try {
    const prof = await Professor.findById(professorId);

    if (!prof) {
      return res.status(404).json({ message: 'Professor not found' });
    }

    const slots = prof.availableSlots;

    res.status(200).json({ availableSlots: slots });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
