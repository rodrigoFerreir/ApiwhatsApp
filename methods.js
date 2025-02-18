const puppeteer = require('puppeteer');

let pages = [];
module.exports = {

    async test(req, res) {
        const wsChromeEndpointurl = 'ws://127.0.0.1:9222/devtools/browser/18ed15dc-3977-4d65-9bab-30399f8c085e';
        const browser = await puppeteer.connect({
            browserWSEndpoint: wsChromeEndpointurl,
            headless: true,

        });
        const page = await browser.newPage();
        await page.goto('http://127.0.0.1:5500/index.html')
        //await page.$eval('#butto', elem => elem.click());
        pages = await browser.pages();
        res.send('ok');
        return pages
    },

    async testClick(req, res){
        console.log(pages[1])
        let page = pages[1]
        await page.$eval('#butto', elem => elem.click());
        res.send('ok click')
    },

    async openPage(req, res) {
        const browser = await puppeteer.launch({
            headless: false,
        });
        const page = await browser.newPage();
        await page.goto('https://web.whatsapp.com/')
        pages = await browser.pages();
        res.status(200).send('WhatsApp está aberto')
        return pages;
    },

    async sendMessage(req, res) {
        const page = pages[1];
        const code = '55';
        const phone = req.body.phone;
        const message = req.body.message;
        await page.goto(
            `https://web.whatsapp.com/send?phone=${code}${phone}`
        );
        try {
            await page.waitForNavigation();
        } catch (e) {
            await page.evaluate(() => {
                window.alert(
                    `Não foi possível realizar a conexão. Contato em espera: ${phone}`
                );
                return false;
            });
        }
         await page.waitFor(5000);
        await page.type(`div._3u328[data-tab="1"]`, message);
        //await page.$$(`span[data-icon="send"]`);
        await page.waitFor(3000);
        await page.$eval(`span[data-icon="send"]`, elem => elem.click());
        await page.on("dialog", async dialog => {
            try {
                await dialog.accept();
            } catch (e) {}
        });
        await page.waitFor(1000);
        res.send({
            status: 'Mensagem enviada!'
        })
    },
    
    async getMessages(req, res) {
        const page = pages[1];
        const msg = await page.evaluate(() => {
            const msgRecebidas = [];
            const msgRecebidasNoty = [];
            let array = Array.from(document.querySelectorAll('div.X7YrQ div._2WP9Q')).map(patern => {
                return patern
            });
            array.map((x, index) => {
                if (!!x.childNodes[1].childNodes[1].childNodes[0].innerText.length) {
                    msgRecebidas.push(index);
                };
            });
            msgRecebidas.map((y) => {
                msgRecebidasNoty.push(JSON.stringify({
                    msg: array[y].lastElementChild.textContent,
                    remetente: array[y].firstElementChild.textContent,
                }));
            });
            return msgRecebidasNoty;
        });
        res.status(200).json({
            messages: msg
        })
        return msg;
    },
}