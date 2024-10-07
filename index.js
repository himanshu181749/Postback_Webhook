const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

require('dotenv').config();


const { Client, Databases, ID } = require("appwrite");
const port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World');
});


// app.get('/create', async (req, res) => {
//   const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1')
//     .setProject('66f3c2520025bb651143');

//   const databases = new Databases(client);

//   try {
//     const response = await databases.createDocument(
//       '66f3c2e1001bd15c52eb',
//       '66f3c42000207aa520cf',
//       ID.unique(),
//       { url: "https://www.microsoft.com" }
//     );

//     console.log('Document created:', response);
//     res.status(201).json({ message: 'Document created successfully', document: response });
//   } catch (error) {
//     console.error('Error creating document:', error);
//     res.status(500).json({ message: 'Error creating document', error: error.message });
//   }
// });

app.get('/publishers', async (req, res) => {
  const { click_id, publisher_id, campaign_id, source, aff_click_id } = req.query;


  console.log(click_id, publisher_id, campaign_id, source, aff_click_id);
  res.status(200).json({ status_publishers: 'success' });
});



// Postback route
app.get('/postbacks/appexco', async (req, res) => {
  // Extracting the data from the request query parameters -------------------------------------
  const { click_id, publisher_id, campaign_id, source, aff_click_id } = req.query;

  // Validating the data ------------------------------------------------------------------------
  if (!click_id || !publisher_id || !campaign_id || !source || !aff_click_id) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // Process the data (example: just logging for now)
  console.log(`Received postback: click_id=${click_id}, publisher_id=${publisher_id}, ` +
    `campaign_id=${campaign_id}, source=${source}, aff_click_id=${aff_click_id}`);

  // Here we would typically update our database or perform other actions -------------------------

  // tasks ----------------------------------------------------------------------------------------
  // 1. for the given publisher_id, get the publisher details from the database
  // 2. now find the entire url (url field) from the database using the campaign_id
  // 3. now hit that url with the given query parameters.


  // http://localhost:3000/postbacks/appexco?click_id={click_id}&publisher_id=BoB123&campaign_id={campaign_id}&source={source}&aff_click_id={aff_click_id}
  // http://localhost:3000/postbacks/appexco?click_id=12345&publisher_id=BoB123&campaign_id=CAMP001&source=facebook&aff_click_id=AFF789"



  // Construct the URL with query parameters -------------------------------------------------------
  const baseUrl = "http://localhost:4000/publishers"; // Replace with actual base URL
  const urlWithParams = new URL(baseUrl);
  urlWithParams.searchParams.append('click_id', click_id);
  urlWithParams.searchParams.append('publisher_id', publisher_id);
  urlWithParams.searchParams.append('campaign_id', campaign_id);
  urlWithParams.searchParams.append('source', source);
  urlWithParams.searchParams.append('aff_click_id', aff_click_id);

  // Hit the URL with query parameters using axios with async/await
  try {
    const response = await axios.get(urlWithParams.toString());
    console.log('Publisher URL hit successfully:', response.data);
  } catch (error) {
    console.error('Error hitting Publisher URL:', error.message);
  }

  // Return a success response
  res.status(200).json({ status: 'success' });
  console.log('Postback received succesfully');
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});