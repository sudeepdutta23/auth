const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/auth');

env.config();

//CORS middleware
const corsOptions = {
    origin: ["http://localhost:4200", "http://localhost:8080"],
    credentials: true,
    allowedHeaders: [
      "headers",
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, X-location, Content-Type, Accept, Cache-Control, Authorization, Referer",
    ],
    methods: "GET,POST,OPTIONS,DELETE,PUT",
    preflightContinue: false,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

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

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api', authRouter);

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});