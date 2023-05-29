const Redis = require('ioredis');
const redisClient = new Redis({
  port: , 
  host: "", 
  username: "",
  password: "",
  
});

const searchAnswer = async(req, res) => {
  let queryArray = req.query.queryArray;

  // Split the query string into an array of words and convert to lowercase
  queryArray = queryArray.toString().toLowerCase().split(' ');
  queryArray = queryArray.toString().split(',').map(query => query.trim());
  console.log(queryArray)
  

  try {
    const matchingData = [];

    const keys = await redis.keys('*');
    const values = await redis.mget(...keys);

    for (const value of values) {
      const data = JSON.parse(value);

      const stringValue = typeof data === 'string' ? data : JSON.stringify(data);

      if (queryArray.some(query => stringValue.toLowerCase().includes(query.toLowerCase()))) {
        matchingData.push(data);
      }
    }

    // Return the result if any matching data is found
    if (matchingData.length > 0) {
      res.status(200).json(matchingData);
    } else {
      res.status(404).json({ message: 'No matching data found' });
    }
  } catch (error) {
    console.error('Error searching for data in Redis:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  }

module.exports = {searchAnswer }