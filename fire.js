const firebase = require("firebase/app");
const firebase_db = require("firebase/database");


const firebaseConfig = {
	apiKey : process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DB_URL,
};

firebase.initializeApp(firebaseConfig);

module.exports = firebase;
