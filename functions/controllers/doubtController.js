const { getFirestore, Timestamp } = require("firebase-admin/firestore");
const admin = require("firebase-admin");
const db = getFirestore();
const Redis = require("ioredis");
const { log } = require("firebase-functions/logger");
const client = new Redis({
  host: "redis-14041.c228.us-central1-1.gce.cloud.redislabs.com",
  port: 14041,
  password: "1RrBA2zUGheO7bAgJnPPqrwk5VETgxgV",
});

function isQuestion(sentence) {
  sentence = sentence.trim();
  if (sentence.endsWith("?")) {
    return true;
  }
  const questionWords = [
    "who",
    "what",
    "when",
    "where",
    "why",
    "which",
    "how",
    "is",
    "are",
    "do",
    "does",
    "did",
    "can",
    "could",
    "should",
    "would",
    "will",
    "won't",
    "kya",
    "kyu",
    "kaise",
  ];
  const words = sentence.split(' ');
  for (const word of words) {
    const lowercaseWord = word.toLowerCase();
    if (questionWords.includes(lowercaseWord)) {
      return true;
    }
  }

  return false;
}

const addDoubt = async (req, res, next) => {
  const {
    author_Id,
    author_name,
    author_photo_url,
    author_college,
    heading,
    description,
    net_votes,
    tags,
    keywords,
  } = req.body;

  if (isQuestion(description)) {
    try {
      // const doubtDoc = db.collection('AllDoubts').doc()
      const timestamp = Timestamp.now();
      const req_body = {
        author_Id,
        author_name,
        author_photo_url,
        author_college,
        heading,
        description,
        net_votes,
        tags,
        keywords,
        count_answers: 0,
        createdOn: timestamp,
      };

      const collectionRef = db.collection("AllDoubts");

      const docRef = collectionRef.doc();
      await docRef.set(req_body); // Add new doubt in the collection

      const pipeline = client.pipeline();

      const lowerCaseKeywords = keywords.map((word) => word.toLowerCase());

      lowerCaseKeywords.forEach((jsonKey) => {
        pipeline.exists(jsonKey); // Add the EXISTS command to check if the key exists
      });

      const existsResults = await pipeline.exec();
      const doubtID = { doubt_id: docRef.id };
      const reqBody = { ...doubtID, ...req_body };

      existsResults.forEach((result, index) => {
        const jsonKey = lowerCaseKeywords[index];
        const pathExist = result[1]; // Get the result of the EXISTS command
        if (pathExist) {
          pipeline.call(
            "JSON.ARRAPPEND",
            jsonKey,
            "$",
            JSON.stringify(reqBody)
          ); // Use JSON.ARRAPPEND for ARRAPPEND
        } else {
          pipeline.call("JSON.SET", jsonKey, "$", JSON.stringify([reqBody])); // Use JSON.SET for SET
        }
      });

      await pipeline.exec(); // Execute the pipeline

      res.status(200).send(JSON.stringify(reqBody));
      client.quit();
    } catch (error) {
      res.status(400).send(error.message);
      console.log(req.body);
    }
  } else {
    res.send({ message: "ASK QUESTIONS ONLY" });
  }
};

module.exports = { addDoubt };
