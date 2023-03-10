require("dotenv").config();
const express = require("express");
const app = express();
const DATABASE = require("./database/connect");
const path = require("path");
const PORT = process.env.PORT || 8092;
const ACCOUNT = require("./api/accountRouter.js");
const USER = require("./api/userRouter.js");
const IMAGE = require("./api/imageRouter.js");
const CONTRACT = require("./api/contractRouter.js");
const ADMIN = require("./api/adminRouter.js");
const PAYMENTHISTORY = require("./api/paymentHistoryRouter.js");
const EMAIL = require("./api/emailRouter.js");
const cors = require("cors");



app.use(cors())

// app.use(
//   function(res, _, next) {
//       res.header('Access-Control-Allow-Origin', '*');
//       res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
//       next();
//   }
// )
app.use(express.json()); // middleware
app.use(
  "/",
  express.static(path.resolve(__dirname, "..", "..", "production/"))
);

// api routes
app.use("/api/paymenthistories", PAYMENTHISTORY);
app.use("/api/contracts", CONTRACT);
app.use("/api/accounts", ACCOUNT);
app.use("/api/emails", EMAIL);
app.use("/api/images", IMAGE);
app.use("/api/admins", ADMIN);
app.use("/api/users", USER);

DATABASE.connect()
  .then(() =>
    console.log("You have been successfully connected to the Database!")
  )
  .then(() =>
    app.listen(PORT, () => {
      console.log(
        `Express Server has started on port ${PORT}! See http://localhost:${PORT}/`
      );
    })
  );

module.exports = app;
