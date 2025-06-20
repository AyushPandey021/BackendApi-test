import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  professor: { type: mongoose.Schema.Types.ObjectId, ref: 'Professor', required: true },
  slot: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
