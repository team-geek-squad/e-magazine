const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const authRouter = require("./routes/auth.route");
const magazineRouter = require("./routes/magazine.route");
const passport = require('passport');
const passportConfig = require("./config/passport.config");

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

// setup middlewares
app.use(cors());
app.use(express.json({limit: "150mb", extended:true}));
app.use(express.urlencoded({limit: "150mb", extended:true}));

passport.use(passportConfig.localStrategy);
passport.use(passportConfig.jwtStrategy);

// require database connection
const dbConnect = require("./db/dbConnect");

// execute database connection
dbConnect();


// getting port from .env file
const PORT = process.env.PORT;

// // Mount the auth router on the /auth path
app.use("/auth", authRouter);
// Mount the magazine router on the /magazine path
app.use("/magazine", magazineRouter);

// server listening to requests on port on env file
app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`);
  });