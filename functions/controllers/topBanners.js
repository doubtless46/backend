const { v4: uuidv4 } = require('uuid');

const topBanner = async (req, res) => {
  try {
    const { name, email, college } = req.body;

    const id = uuidv4();

    const response = {
      type: 'TOP_BANNER',
      data: [
        {
          id: id,
          image_url: 'url1',
          redirection: {
            type: 'URL',
            url: 'url1',
          },
        },
      ],
    };

    res.json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { topBanner };
