# Doubtless-backend

# Express Backend with Firebase Cloud Functions
This is an Express.js backend project using Firebase Cloud Functions. It serves as the server-side component for Doubtless application and provides API endpoints and business logic. Firebase Cloud Functions allow you to deploy and run serverless functions on the Firebase platform.

# Prerequisites #
Before getting started, ensure that you have the following installed:

`Node.js: `<br>
Download Node.js - https://nodejs.org/en

`Firebase CLI:`<br>

Install the Firebase CLI globally by running the following command:

npm install -g firebase-tools

# Getting Started #
Clone this repository to your local machine or download the source code.

Install the project dependencies by running the following command in the project's root directory:

npm install

`Configure Firebase:`

Create a new Firebase project on the Firebase console.
Install the Firebase CLI (if not already installed) by running npm install -g firebase-tools.
Authenticate the Firebase CLI by running firebase login.

`Configure Firebase Project:`

Run firebase init in the project's root directory.
Select the Firebase project you created earlier.
Choose Functions when asked to select a Firebase feature.
Follow the prompts to configure Firebase Functions for your project.

You can refer the official cloud functions doc :
https://firebase.google.com/docs/functions/get-started?gen=2nd

`Update Firebase Configuration:`

Open the .firebaserc file and ensure that the default Firebase project is set correctly.

# Development:

Write your Express.js routes, middleware, and business logic in the functions/index.js file.
Use the firebase-functions and firebase-admin packages to interact with Firebase services from your Express.js app.
Deploy your functions to Firebase by running firebase deploy --only functions in the project's root directory.

`Testing:`

You can test your Express.js routes and logic locally by running npm start in the project's root directory. This will start the Firebase emulator suite and allow you to test your functions locally.

`Deployment:`

Deploy your Firebase Functions to the cloud by running firebase deploy --only functions in the project's root directory.
The deployed functions will be accessible via their respective URLs provided in the Firebase CLI output.


`Folder Structure`<br>
/functions: Contains the Firebase Cloud Functions code.<br>
/functions/index.js: Main file where you define your Express.js routes and logic.<br>
/functions/package.json: Package configuration file for Firebase Cloud Functions.<br>
/functions/controllers: Contains the controller for PostDoubt, PostAnswer , ProfileImageUpload, Search.<br>

# High Level Desgin (HLD) #

## 1. System Overview ##

The system is designed to manage doubts posted by users, including the ability to answer doubts, upvote/downvote and manage user profiles. The system will have collections for doubts, answers, users, and app-related data, and it will use Redis for efficient keyword-based search and retrieval.

## 2. Architecture Components ##

Frontend: The frontend will be a web/mobile application providing interfaces for posting doubts, answering, voting, following, and managing profiles.

Backend: The backend will handle API requests, process business logic, interact with the database, and manage Redis caching.

Database: Firestore (or any NoSQL database) will be used to store structured data related to doubts, answers, users, and other app-related data.

Redis Cache: Redis will be used for caching keyword-based mappings of doubts to enhance search performance.

## 3. Database Design ##

### Collections: ###

`Doubt :`
```
    doubt_id: Unique identifier for the doubt.
    author_id: User ID of the author.
    author_name: Name of the author.
    author_photo_url: URL of the author's photo.
    author_college: Author's college.
    heading: The heading of the doubt.
    description: Detailed description of the doubt.
    net_votes: Total votes (upvotes - downvotes).
    tags: List of tags associated with the doubt.
    keywords: Keywords extracted for search optimization.
    count_answers: Number of answers to the doubt.
    createdOn: Timestamp of when the doubt was created.
```

`Answers (Sub-collection):`
```
    answer_id: Unique identifier for the answer.
    doubt_id: Reference to the associated doubt.
    author_id: User ID of the answer's author.
    author_name: Name of the answer's author.
    author_photo_url: URL of the author's photo.
    author_college: Author's college.
    description: Text of the answer.
    netVotes: Number of votes on the answer.
    createdOn: Timestamp of when the answer was created.
```

## 4. Redis Cache Structure ##

`Redis Map:`<br>
Each keyword will map to a list of doubtData objects.

`Example structure:`<br>
attendance : [doubtData1, doubtData2, …]<br>
year : [doubtData1, doubtData2, …]<br>
student : [doubtData1, doubtData2, …]<br>
Keywords will be stored in lowercase to ensure case-insensitive search.


## 5. Key Features ##

`Doubt Posting:`<br>
Users can post doubts with details like heading, description, and tags.<br>
Keywords are extracted and stored in Redis for fast retrieval.

`Answering Doubts:`<br>
Users can answer doubts, and answers are stored as sub-collections within the corresponding doubt document.

`Upvoting/Downvoting:`<br>
Users can upvote or downvote doubts and answers.<br>
Votes are tracked and updated in the net_votes field.

`User Profiles:`<br>
Users can manage their profile, which includes their email, photo, and other attributes.

`Notifications:`<br>
Notifications are generated for events like new answers, votes, etc., and are stored with relevant details.

## 6. Data Flow ##

`Doubt Creation:`<br>
User submits a doubt → Backend processes the request → Doubt is stored in AllDoubts → Keywords are extracted and stored in Redis.

`Answer Submission:`<br>
User submits an answer → Backend stores it as a sub-collection within the corresponding doubt.

`Voting:`<br>
User votes on a doubt/answer → Backend updates net_votes → Updates are reflected in the front-end.

`Keyword Search:`<br>
User searches by a keyword → Backend queries Redis → Relevant doubts are fetched and returned.

`Notifications:`<br>
Triggered by specific actions (e.g., new answer) → Stored in the Notifications collection → Delivered to the user.

## 7. Performance Considerations ##
`Caching:` Redis is used to speed up search queries and reduce database load.<br>
`Pagination:` Doubts and answers can be paginated to handle large datasets.<br>
`Indexes:` Create indexes on frequently queried fields like author_id, tags, and keywords.<br>

## 8. Security and Privacy ##
`Authentication:` Secure user authentication using JWT tokens.<br>
`Authorization:` Ensure users can only modify their own data.<br>
`Data Encryption:` Encrypt sensitive data like user emails and phone numbers.

## 9. Scalability ##

`Horizontal Scaling:` The system should be able to scale horizontally by adding more instances of the backend service.<br>
`Database Scaling:` Use sharding or partitioning in the database for handling large datasets.

## 10. Architecture Diagram ##
![Architecture Diagram](image.png)


## Contributing ##
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.


