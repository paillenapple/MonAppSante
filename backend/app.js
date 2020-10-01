const express = require("express");
const formData = require("express-form-data");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const patientRoutes = require("./routes/patient");

const app = express();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_LOGIN}:${process.env.MONGO_DB_PASSWORD}@cluster0.xwugj.mongodb.net/user?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

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

app.use(formData.parse());

app.use("/api/auth", userRoutes);

app.use("/api/patients", patientRoutes);

module.exports = app;
