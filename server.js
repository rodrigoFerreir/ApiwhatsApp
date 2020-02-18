const express = require('express');

const app = express();
const Router = require('./routes');

app.use('/routes', Router);

const postInfo = async() => {
    
    const browser = await puppeteear.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://web.whatsapp.com/')
};

postInfo();


server.listen(process.env.PORT || 8000, function() {
    console.log('Server rodando na porta: ' + this.address().port)
  })