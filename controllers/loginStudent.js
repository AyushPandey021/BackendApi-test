import Student from '../models/Student.js';
import generateToken from '../utils/generateToken.js';

export const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });

    if (student && (await student.matchPassword(password))) {
      res.json({
        _id: student._id,
        name: student.name,
        email: student.email,
        token: generateToken(student._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
