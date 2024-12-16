const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const apartmentRoute = require('./routes/apartmentRoute')
const auth = require('./routes/auth')
app.use(apartmentRoute)
app.use(auth)

const app = express();
app.use(express.json());
app.use(cors());

const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, async() => {
 await mongoose.connect(process.env.MONGOURI).then(()=>console.log("Mongo DB connected"))
  console.log(`Server is running on port ${PORT}`);
});
