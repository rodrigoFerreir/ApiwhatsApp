const puppeteer = require('puppeteer');

let pages = [];
module.exports = {
    async openPage(req, res) {
        const browser = await puppeteer.launch({
            headless: false,
            args: [
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding'
            ],
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
        const phone = '8197616802';
        const message = req.query.text;
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
        await page.type("div._3u328", message);
        await page.$(`span[data-icon='send']`);
        await page.click("span[data-icon='send']");
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

        console.log(msg)
        return msg;
    }
}