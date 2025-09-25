const express = require('express');
const app = express();
const connectDB=require('./config/db.js');
const bodyparser=require('body-parser');
const authRoutes=require('./routes/authroutes.js')

const jobseekerroutes=require('./routes/jobseekerroutes.js');
const profileroutes=require('./routes/companyroutes.js');
const JobPostingRoutes=require('./routes/JobPostingRoutes.js');

connectDB();
app.use(express.json()); 

// app.use('/user',userRoutes);
app.use('/userRoutes',jobseekerroutes);
app.use('/auth',authRoutes)
app.use('/api', profileroutes);
app.use('/Jobs', JobPostingRoutes);
// Test route
app.get('/', (req, res) => {
  res.send(' API is working and MongoDB is connected');
});
// Start server
app.listen(5000, () => {
  console.log(' Server running on http://localhost:5000');
});