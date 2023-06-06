const { Timestamp, getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();
const { v4: uuidv4 } = require("uuid");

const postAnswer = async (req, res, next) => {
  const {
    doubt_id,
    description,
    author_id,
    author_name,
    author_photo_url,
    author_year,
    author_college,
  } = req.body;
  try {
    let myuuid = uuidv4();

    parentDocRef = db.doc(`AllDoubts/` + doubt_id);
    const subcollectionRef = parentDocRef.collection("Answer");
    const req_body = {
      doubt_id,
      answer_id: myuuid,
      description,
      author_id,
      author_name,
      author_photo_url,
      author_year,
      author_college,
      net_votes: 0,
      created_on: Timestamp.now(),
    };
    subcollectionRef
      .doc(myuuid)
      .set(req_body)
      .then((docRef) => {
        console.log("Document written with ID: ", myuuid);
        const collectionRef = db.collection("AllDoubts").doc(doubt_id);
        collectionRef.get().then((doc) => {
          if (doc.exists) {
            const counterValue = doc.data().count_answers;

            const updatedValue = counterValue + 1;

            // Update the counter field in the document
            collectionRef
              .update({ count_answers: updatedValue })
              .then(() => {
                console.log("Counter updated successfully!");
              })
              .catch((error) => {
                console.error("Error updating counter:", error);
              });
          }
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    res.status(200).send(JSON.stringify(req_body));
  } catch (error) {
    res.status(400).send(error.message);
    console.log(req.body);
  }
};

module.exports = { postAnswer };

