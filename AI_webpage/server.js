// server.js

const express = require('express');
const app = express();

const { Ollama } = require('Ollama');
const  axios = require('axios');
const path = require('path');
const { response } = require('express');



app.use(express.json());



const ollamaApiUrl = 'http://localhost:2222';
const chatEndpoint ='/api/chat'
const requestBody = {
  
  completion: {
    max_tokens: 1024,
    temperature: 1,
  },
};

// fetch(`${ollamaApiUrl}${chatEndpoint}`,
// {
//   method: 'POST',
//   headers: {'Content-type': 'application/json'},
//   body: JSON.stringify(requestBody),
// }).then((respnse) => respnse.json()).then((data) => {console.log(data)
  
// }).catch((error) => {
//   console.error(error);
// });


const chatBot = new Ollama({url: ollamaApiUrl});


app.post(chatEndpoint, async(req, res) => {
  
    const {context} = req.body;
    const completion = {
      max_tokens: 1024,
      temperature: 0.7,
    };

    try {
    const response = await axios.post(`${ollamaApiUrl}/api/chat`, {
      // method: 'POST',
      // headers: { 'Content-Type': 'application/json'},
      // body: JSON.stringify({context, completion}),
      context,
      completion,
    });
    

    if(!response.ok){
      throw new Error(`HEEP error! status: ${response.status}`);
    }
      const data = await response.data;
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
// async function main() {
// const response = await ollama.chat({
//   model: 'ollama3.2',
//   messages: [
//     {role: 'user', content: 'Why wont you work?'},
//   ],
// });
// console.log(response.message.content);
// }
// main();
// fetch('http://localhost:2222/models')
//   .then(response => response.json())
//   .then(data => console.log(data));

app.listen(3000, () => {
  console.log('Server listening on port 3000');
})
