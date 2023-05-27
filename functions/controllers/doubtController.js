
const { getFirestore  } = require("firebase-admin/firestore");
const db = getFirestore()



const addDoubt = async(req, res, next)=>{
    const {description,downVotes,heading, score,upVotes,userName} = req.body
    try {
        await db.collection('doubts').doc().create({
            description,downVotes,heading, score,upVotes,userName
        });
        res.status(200).send("doubt saved successfully");
    } catch (error) {
        res.status(400).send(error.message);
        console.log(req.body);
    }






    
}


module.exports ={ addDoubt };