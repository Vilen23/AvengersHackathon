const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const router = express.Router();
require('dotenv').config();


// Your Marvel API keys
const publicKey = process.env.publicKey;
const privateKey = process.env.privateKey;

// Middleware to calculate the hash
router.use((req, res, next) => {
  const timestamp = new Date().getTime().toString();
  const hash = crypto
    .createHash('md5')
    .update(timestamp + privateKey + publicKey)
    .digest('hex');

  req.marvelParams = {
    ts: timestamp,
    apikey: publicKey,
    hash: hash,
  };

  next();
});

// Example route to fetch comics
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(
      'https://gateway.marvel.com/v1/public/comics',
      {
        params: req.marvelParams,
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching comics:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

