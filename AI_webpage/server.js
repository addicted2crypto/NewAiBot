// server.js

const express = require('express');
const app = express();


const  axios = require('axios');
const path = require('path');

app.use(express.json());

const ollamaApiUrl = 'http://localhost:2222';
const chatEndpoint ='/generate';



app.post('/api/chat', async(req, res) => {
  
    // const {context} = req.body;
    // const completion = {
    //   max_tokens: 1024,
    //   temperature: 0.7,
    // };

    try {
       const response = await axios.post(`${ollamaApiUrl}${chatEndpoint}`, req.body);
        
      if(!response.ok){
       throw new Error(`HEEP error! status: ${response.status}`);
    }
      const data = response.data;
    console.log(data);
    res.json({response: data.completion});
    
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
