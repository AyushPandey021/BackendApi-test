import Student from '../models/Student.js';
import generateToken from '../utils/generateToken.js';

export const registerStudent = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const studentExists = await Student.findOne({ email });

    if (studentExists) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const student = await Student.create({
      name,
      email,
      password
    });

    if (student) {
      res.status(201).json({
        _id: student._id,
        name: student.name,
        email: student.email,
        token: generateToken(student._id) // ✅ JWT here
      });
    } else {
      res.status(400).json({ message: 'Invalid student data' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
