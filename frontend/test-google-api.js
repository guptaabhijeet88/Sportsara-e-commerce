const axios = require('axios');
require('dotenv').config({ path: 'd:/Desktop/CWH_Web_Development/video68/fullstack-ecommerce/frontend/.env' });

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

async function test(input) {
  try {
    const { data } = await axios.post(
      'https://places.googleapis.com/v1/places:autocomplete',
      {
        input: input,
        includedRegionCodes: ['in'],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'suggestions.placePrediction.placeId,suggestions.placePrediction.structuredFormat,suggestions.placePrediction.text'
        }
      }
    );
    
    if (!data.suggestions || data.suggestions.length === 0) {
      console.log('No suggestions found for', input);
      return;
    }

    const prediction = data.suggestions[0].placePrediction;
    console.log('Prediction:', JSON.stringify(prediction, null, 2));

    const { data: detailsData } = await axios.get(
      `https://places.googleapis.com/v1/places/${prediction.placeId}`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'addressComponents,formattedAddress'
        }
      }
    );

    console.log('Details:', JSON.stringify(detailsData, null, 2));

  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

async function run() {
  console.log("--- TEST 1 ---");
  await test("Link Road, Laxmi Nagar, Goregaon West, Mumbai");
  console.log("--- TEST 2 ---");
  await test("GARDEN ESTATES GOREGAON WEST, Colony No 2");
}

run();
