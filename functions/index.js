const functions = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
var serviceAccount = require("./doubtless-bd798-firebase-adminsdk-5sxx2-18b56b565c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://doubtless-bd798.firebaseio.com'
});

const doubtRoutes = require("./routes/doubt-route");


const express = require("express")
const cors = require("cors");
const app = express();



app.use(cors({origin:true}))
app.use('/api', doubtRoutes.routes);

app.get("/",(req,res)=>{
    return res.status(200).send("Hello world")
})


exports.v1 = onRequest(app);


