const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const express = require("express")
const cors = require("cors")

const app = express();
initializeApp();
app.use(cors({origin:true}))

app.get("/",(req,res)=>{
    return res.status(200).send("Hello world")
})


exports.v1 = onRequest(app);


exports.api = onRequest((req, res) => {
  switch (req.method) {
    case "GET":
      res.send("It was a Get request");
      break;

    case "POST":
        const body = req.body;
      res.send(body);
      break;

    case "DELETE":
      res.send("It was a Delete request");
      break;

    default:
      break;
  }
});
