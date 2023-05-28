const Redis = require('ioredis');
const redisClient = new Redis();

const searchAnswer = async(req, res) => {
  const queryArray = req.query.queryArray;

  try {
    const keys = await redisClient.keys('*');
    const matchingKeys = keys.filter(key => {
      const keyWords = key.split(' ');
      return queryArray.some(word => keyWords.includes(word.toLowerCase()));
    });

    const matchingData = [];
    const pipeline = redisClient.pipeline();

    matchingKeys.forEach(key => {
      pipeline.get(key);
    });

    const results = await pipeline.exec();

    results.forEach(result => {
      const value = result[1];
      if (value !== null) {
        const data = JSON.parse(value);
        matchingData.push(data);
      }
    });

    res.status(200).json(matchingData);
  } catch (error) {
    console.error('Error searching for data in Redis:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  }


  

module.exports = {searchAnswer }