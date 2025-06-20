import dotenv from 'dotenv';


import app from './app.js'
import connectDB from "./config/db.js"
dotenv.config();

console.log('JWT_SECRET:', process.env.JWT_SECRET);

const PORT = process.env.PORT || 5000
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✔️server runing at http://localhost:${PORT}`);

  })
})