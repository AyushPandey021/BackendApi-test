import mongoose from 'mongoose';

const professorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  availableSlots: [{ type: Date }]
});

const Professor = mongoose.model('Professor', professorSchema);
export default Professor;
