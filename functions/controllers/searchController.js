const Redis = require('ioredis');
const dotenv = require('dotenv');
dotenv.config();
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

const searchAnswer = async (req, res) => {
  let queryArray = req.body
  const length = queryArray.length; // (1,length-1)  gives output end"
  queryArray = queryArray.substring(1,length-1); //we have to trim out the quotes also but dont know the reason
  // Split the query string into an array of words and convert to lowercase
  queryArray = queryArray.toLowerCase().trim(" ").split(` `)

  try {
    const pipeline = redis.pipeline();

    queryArray.forEach((query) => {
      pipeline.keys(query);
    });

    const existsResults = await pipeline.exec();
    const flattened = existsResults.flat(2).filter((value) => value !== null);
    const values = await performJsonGets(flattened);

    res.status(200).send(values.flat(2));
  } catch (error) {
    console.error('Error searching for data in Redis:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

async function performJsonGets(keys) {
  const pipeline = redis.pipeline();

  keys.forEach((key) => {
    pipeline.call('JSON.GET', key, '$');
  });

  const results = await pipeline.exec();

  const values = results.map((result) => {
    if (result[1]) {
      // Check if the command was successful
      return JSON.parse(result[1]);
    } else {
      // Handle errors for specific keys
      console.error(`Error fetching value for key: ${result[1]}`);
      return null;
    }
  });

  return values;
}

module.exports = { searchAnswer };
