// server.js
import 'dotenv';
const express = require('express');
const app = express();


const  axios = require('axios');
const path = require('path');


app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const ollamaApiUrl = process.env.OLLAMA_API_URL;




app.post('/api/chat', async(req, res) => {
  

    try {
      console.log('Received req:', req.body);
       const response = await fetch(ollamaApiUrl, {
        method: 'POST',
        headers: {'Content-Type' :'application/json'},
        body: JSON.stringify(req.body),
       });
        console.log('Response:', response)
      if(!response.ok){
       throw new Error(`OLLAMA API error! status: ${response.status}`);
    }
      const data = await response.json();
    console.log('Response from Ollama API:', data);
    res.json(data);
    // res.status(200).json(data);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to interact with Ollama agent' });
  }
});




app.get('/', (req, res) => {

  res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(3000, () => {
  console.log('Server listening on port 3000');
})
