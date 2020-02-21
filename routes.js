const express = require('express')
const sendMessage = express.Router();

module.exports = (paage) =>{
    sendMessage.post('/teste',async (req,res)=>{
       
            let page = paage[1];
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
             await page.waitForSelector(`span[data-icon='send']`);
             debugger;
             await page.click("span[data-icon='send']");
             await page.on("dialog", async dialog => {
               try {
                 await dialog.accept();
               } catch (e) {}
             });//rescebendo numero e eviando para o usuario !esta funçao necessita de uma mensagem para ser enviada
             
             await page.waitFor(1000);
             res.send({status: true})
    })
    return sendMessage
};


// module.exports = getMessageInNotification.get('/getmessagenotification', async (req, res)=> { 

//     await page.waitFor(10000);//espera 10s
//     const msg = await page.evaluate(() => {
//         const msgRecebidas = [];
//         const msgRecebidasNoty = [];
//         let array = Array.from(document.querySelectorAll('div.X7YrQ div._2WP9Q')).map(patern => { return patern });
//         array.map((x, index) => {
//           if (!!x.childNodes[1].childNodes[1].childNodes[0].innerText.length) {
//             msgRecebidas.push(index);
//           };
//         });
//         msgRecebidas.map((y) => {
//           msgRecebidasNoty.push(JSON.stringify({
//             msg: array[y].lastElementChild.textContent,
//             remetente: array[y].firstElementChild.textContent,
//           }));
//         });
//         return msgRecebidasNoty;
//      });
//      return msg;
// });