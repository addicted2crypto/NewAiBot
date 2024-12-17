// server.js
const express = require('express');
const app = express();
// import  ollama from 'ollama';
const { Ollama } = require('Ollama');
const { axios } = require('axios');
const path = require('path');
const { response } = require('express');


app.use(express.json());



const ollamaApiUrl = 'http://localhost:2222';
const requestBody = {
  context: `Yo, addicted was here!`,
  completion: {
    max_tokens: 1024,
    temperature: 1,
  },
};

fetch(`${apiUrl}${chatEndpoint}`,
{
  method: 'POST',
  headers: {'Content-type': 'application/json'},
  body: JSON.stringify(requestBody),
}).then((respnse) => respnse.json()).then((data) => {console.log(data)
  
}).catch((error) => {
  console.error(error);
});


const chatBot = new Ollama({url: ollamaApiUrl});


app.post('/api/chat', async(req, res) => {
  try {
    const {input} = req.body;
    const response = await fetch(ollamaApiUrl + 'respond', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: {
          text: input
        },
        context: {}
      }),
    });

    if(!response.ok){
      throw new Error(`HEEP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    res.json({response: data.output.text});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to interact with Ollama agent' });
  }
});



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// fetch('http://localhost:2222/models')
//   .then(response => response.json())
//   .then(data => console.log(data));

app.listen(3000, () => {
  console.log('Server listening on port 3000');
})
