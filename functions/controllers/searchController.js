const Redis = require('ioredis');
const redis = new Redis({
  host: "",
  port: ,
  password: "",
});

const searchAnswer = async (req, res) => {
  let queryArray = req.body;
  // Split the query string into an array of words and convert to lowercase
  queryArray =  JSON.stringify(queryArray.toLowerCase().trim(" ")).split(` `);
  console.log(queryArray)

  try {
    const pipeline = redis.pipeline();

    queryArray.forEach((query) => {
      pipeline.keys(query);
    });

    const existsResults = await pipeline.exec();
    console.log(existsResults);
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
  console.log(results)

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
