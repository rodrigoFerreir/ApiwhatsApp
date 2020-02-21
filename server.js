const express = require('express');
const puppeteear = require('puppeteer');

const app = express();



const openWhatsapp = async() => {
    const browser = await puppeteear.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://web.whatsapp.com/')

    return  await browser.pages();
   
};
openWhatsapp().then(res => { 
    console.log(true, res.length)
    const Router = require('./routes')(res);
app.use('/routes', Router);
   })




 


app.listen(process.env.PORT || 8000, function() {
    console.log('Server rodando na porta: ' + this.address().port)
  })