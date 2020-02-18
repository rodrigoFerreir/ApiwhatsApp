const express = require('express')
const sendMessage = express.Router();

module.exports = sendMessage.post('send', (req, res) => {
            const phone = req.query.num //(DDD...)
            const message = req.query.msg
            await page.goto(
                `https://web.whatsapp.com/send?phone=55${phone}`
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
            await page.waitForSelector(`span[data-icon='send']`);
            await page.click("span[data-icon='send']");
            await page.on("dialog", async dialog => {
                try {
                    await dialog.accept();
                } catch (e) {}
            })
            res.send(true)
        await page.waitFor(1000);
    });
 