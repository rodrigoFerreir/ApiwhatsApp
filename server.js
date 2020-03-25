const express = require('express');
const routes = require('./routes');
const bodyparser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(cors())
app.use(bodyparser.json())
app.use(routes)



// const openWhatsapp = async () => {
//     const browser = await puppeteer.launch({
//         headless: false,
//         args: [
//             '--log-level=3', // fatal only
//             //'--start-maximized',
//             '--no-default-browser-check',
//             '--disable-infobars',
//             '--disable-web-security',
//             '--disable-site-isolation-trials',
//             '--no-experiments',
//             '--ignore-gpu-blacklist',
//             '--ignore-certificate-errors',
//             '--ignore-certificate-errors-spki-list',
//             '--disable-gpu',
//             '--disable-extensions',
//             '--disable-default-apps',
//             '--enable-features=NetworkService',
//             '--disable-setuid-sandbox',
//             '--no-sandbox'
//           ],
//     });
//     const page = await browser.newPage();
//     await page.goto('https://web.whatsapp.com/')

//     return await browser.pages();

// };

// openWhatsapp().then(res => {
//     console.log(true, res.length)
//     const Router = require('./routes')(res);
//     app.use('/routes', Router);
// });


app.listen(process.env.PORT || 3002, function () {
    console.log('Server rodando na porta: ' + this.address().port)
})