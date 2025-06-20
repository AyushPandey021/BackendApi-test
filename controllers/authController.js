import Student from '../models/Student.js';
import jwt from 'jsonwebtoken';

function createAuthToken(userId) {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d', // 7 day expire
  });
  return token;
}

//new student
export const registerStudent = async (req, res) => {
  const { name, email, password } = req.body;


  if (!name || !email || !password) {
    return res.status(400).json({ message: ' fill all fields !!' });
  }

  try {
    const existing = await Student.findOne({ email });

    if (existing) {
      return res.status(400).json({ message: 'Student already exists and email' });
    }

    const newStudent = new Student({
      name: name,
      email: email,
      password: password,
    });

    let savedStudent;
    try {
      savedStudent = await newStudent.save();
    } catch (saveError) {
      console.log('error in saving student');
      return res.status(500).json({ message: ' save is  student. Try again.' });
    }
    return res.status(201).json({
      _id: savedStudent._id,
      name: savedStudent.name,
      email: savedStudent.email,
      token: createAuthToken(savedStudent._id),
    });

  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ message: 'wrong. Please try again later.' });
  }
};

export const loginStudent = async (req, res) => {
  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password  imp' });
  }

  try {
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(401).json({ message: 'No account in this email' });
    }
    const isPasswordValid = await student.matchPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    return res.json({
      _id: student._id,
      name: student.name,
      email: student.email,
      token: createAuthToken(student._id),
    });

  } catch (err) {
    console.error('lkogin error:', err.message);
    res.status(500).json({ message: 'login  server error' });
  }
};
