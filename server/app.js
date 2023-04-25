const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/auth');

env.config();

mongoose.connect(
    `mongodb://localhost:27017/${process.env.MONGO_DB_DATABASE}`, 
    {   
        // useNewUrlParser: true, 
        // useUnifiedTopology: true,
        // useCreateIndex: true
    }
).then((res) => {
    console.log('Database Connected');
});

app.use(cors());

app.use(express.json());

app.use('/api', authRouter);

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});