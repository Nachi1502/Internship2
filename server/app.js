const express = require("express");
const cookieParser = require('cookie-parser')
const app = express();
const cors = require('cors');
app.use(cookieParser())
const dotenv=require('dotenv')

dotenv.config({path:'./config.env'})

require('./DB/conn')
const User = require('./model/userSchema')

app.use(cors());


app.use(express.json())
//we make the router file to mmake our router easy
app.use(require('./Router/auth'))

//middleware

// const middleware = (req, res, next) => {
//   console.log("my middleware");
//   next()
// }; 


// app.get("/", (req, res) => {
//   res.send("hello world from server");
// });
// app.get("/about", middleware,(req, res) => {
//     console.log("my middleware about");
//   res.send("hello world from server about");
// });
app.get("/contact", (req, res) => {
  res.send("hello world from server contact");
});
app.get("/sighin", (req, res) => {
  res.send("hello world from server signin");
});

app.listen(5000, () => {
  console.log("server is running");
});
