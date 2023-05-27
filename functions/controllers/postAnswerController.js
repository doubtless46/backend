
const { getFirestore  } = require("firebase-admin/firestore");
const db = getFirestore()



const postAnswer = async(req, res, next)=>{
    const {doubt_id, answer,userName, userId,userPhoto} = req.body
    try {
        const parentDocRef = db.doc('AllDoubts/'+doubt_id);
        const subcollectionRef = parentDocRef.collection('Answer');
        const req_body = { doubt_id,answer, userName, userId,userPhoto,timeStamp : new Date().getTime()}
        subcollectionRef.add(req_body)
        .then((docRef) => {
            console.log('Document written with ID: ', docRef.id);
        })
        .catch((error) => {
            console.error('Error adding document: ', error);
        });

        res.status(200).send(JSON.stringify(req_body));
    } catch (error) {
        res.status(400).send(error.message);
        console.log(req.body);
    }
}

module.exports = { postAnswer }