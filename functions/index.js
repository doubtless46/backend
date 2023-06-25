
// const functions = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const bodyParser = require('body-parser');

const serviceAccount =  require("../functions/doubtless-56011-firebase-adminsdk-6mlpn-8ba7c16ed3.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://doubtless-56011.firebaseio.com'   
});



const doubtRoutes = require("./routes/doubt-route");
const postAnswer = require("./routes/post_answer");
const searchAnswer = require("./routes/search_route")



const express = require("express")
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({origin:true}))
app.use(bodyParser.text());
app.use('/api/doubts', doubtRoutes.routes);
app.use("/api/search", searchAnswer.routes) 
app.use("/api/doubts/answer",postAnswer.routes)  
app.get("/",(req,res)=>{
    return res.status(200).send("Welcome to Doubtless")
})


// exports.doubtless = functions.region("asia-south1").https.onRequest(app);
exports.doubtless = onRequest(app);


