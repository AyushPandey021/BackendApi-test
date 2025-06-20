import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js';
import professorRoutes from './routes/proferssorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/students', authRoutes);
app.use('/api/professors', professorRoutes);
app.use('/api/appointments', appointmentRoutes);


app.get("/", (req, res) => {
  res.send('collage appointment api is runing..')
})
export default app;