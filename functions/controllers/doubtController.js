const { getFirestore, Timestamp } = require("firebase-admin/firestore");
const { v4: uuidv4 } = require('uuid');

const db = getFirestore();
const Redis = require("ioredis");
const client = new Redis({
  host: "",
  port: ,
  password: "",
});

function isQuestion(sentence) {
  sentence = sentence.trim(" ");
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
    author_id,
    author_name,
    author_photo_url,
    author_college,
    author_year,
    heading,
    description,
    net_votes,
    tags,
    keywords,
  } = req.body;

  if (isQuestion(description)) {
    try {
      let myuuid = uuidv4();
      const timestamp = Timestamp.now();
      const req_body = {
        doubt_id : myuuid,
        author_id,
        author_name,
        author_photo_url,
        author_college,
        author_year,
        heading,
        description,
        net_votes,
        tags,
        keywords,
        count_answers: 0,
        created_on: timestamp,
      };

      const collectionRef=db.collection("AllDoubts");
      console.log(collectionRef);
      const docRef = collectionRef.doc(myuuid);
      await docRef.set(req_body); 

      const pipeline = client.pipeline();

      const lowerCaseKeywords = keywords.map((word) => word.toLowerCase());

      lowerCaseKeywords.forEach((jsonKey) => {
        pipeline.exists(jsonKey); 
      });

      const existsResults = await pipeline.exec();

      existsResults.forEach((result, index) => {
        const jsonKey = lowerCaseKeywords[index];
        const pathExist = result[1]; 
        if (pathExist) {
          pipeline.call(
            "JSON.ARRAPPEND",
            jsonKey,
            "$",
            JSON.stringify(req_body)
          ); 
        } else {
          pipeline.call("JSON.SET", jsonKey, "$", JSON.stringify([req_body])); 
        }
      });

      await pipeline.exec(); 

      res.status(200).send(JSON.stringify(req_body));
    } catch (error) {
      res.status(400).send(error.message);
      console.log(req.body);
    }

  } else {
    res.status(400).send({ message: "ASK QUESTIONS ONLY" });
  }
};

module.exports = { addDoubt };
