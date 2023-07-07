require("dotenv").config();
const functions = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");


admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount),
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_BUCKET,
  messagingSenderId: process.env.FIREBASE_,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASURMENT_ID,
  databaseURL: process.env.FIREBASE_DB_URL 
});

const doubtRoutes = require("./routes/doubt-route");
const postAnswer = require("./routes/post_answer");
const searchAnswer = require("./routes/search_route");

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({ origin: true }));
app.use(bodyParser.text());
app.use("/api/doubts", doubtRoutes.routes);
app.use("/api/search", searchAnswer.routes);
app.use("/api/doubts/answer", postAnswer.routes);
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to Doubtless");
});
app.listen(process.env.PORT || 5000, () =>
  console.log(`Server Started at ${process.env.PORT}`)
);

//exports.doubtless = functions.region("asia-south1").https.onRequest(app); // use for deploying funtions

exports.doubtless = onRequest(app); // use for local testing


