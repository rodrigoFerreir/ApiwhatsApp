const puppeteear = require('puppeteer');

const postInfo = async() => {
    // const code = '55';
    // const phone = '8193651366';
    // const message = 'ok';
    const browser = await puppeteear.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://web.whatsapp.com/')
    // await page.goto(
    //     `https://web.whatsapp.com/send?phone=${code}${phone}`
    //   );
    //   try {
    //     await page.waitForNavigation();
    //   } catch (e) {
    //     await page.evaluate(() => {
    //       window.alert(
    //         `Não foi possível realizar a conexão. Contato em espera: ${phone}`
    //       );
    //       return false;
    //     });
    // }
    // await page.type("div._3u328", message);
    // await page.waitForSelector(`span[data-icon='send']`);
    // await page.click("span[data-icon='send']");
    // await page.on("dialog", async dialog => {
    //   try {
    //     await dialog.accept();
    //   } catch (e) {}
    // });
    await page.waitFor(1000);

    // const scrape = async () => {
    //   await page.waitFor(10000);
    //   const msg = await page.evaluate(
    //       () => Array.from(document.querySelectorAll('div.message-in')).map((patern) => patern.innerText.trim())
    //     );
    //   console.log('msg' + msg);
    //   //for(let i = 0; i < msg.length ; i++){console.log(msg[i].textContent)}
    // };//pega mensagens e adiciona em uma array

    const scrapInNotification = async ()=>{
      await page.waitFor(10000);

      const msgs = await page.evaluate(
        () => {
      // const msgRecebidas = [];
      // const msgRecebidasmsg = [];
      //     let array = Array.from(document.querySelectorAll('div.X7YrQ div._2WP9Q')).map(patern => {
      //      return patern
      //     })
      //     array.map((x,index)=>{
      //       if(!!x.childNodes[1].childNodes[1].childNodes[0].innerText.length){
      //         msgRecebidas.push(index)
      //       }
      //     })
      //   page.click('div.X7YrQ ')
      // msgRecebidas.map((y)=>{
      //   msgRecebidasmsg.push(JSON.stringify({
      //     msg: array[y].lastElementChild.textContent,
      //     remetente : array[y].firstElementChild.textContent,
      //   }))
      // })
      //     return msgRecebidasmsg;
      let array = Array.from(document.querySelectorAll('div.X7YrQ div._2WP9Q')).map(patern => {
             return patern
            })
      array[15].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerHTML = ""
    return true
    }
      );
        //console.log(array[0].lastElementChild.children[1].textContent);
        console.log('msgs:'+ msgs);
    }
    scrapInNotification();
    //scrape();   
}
postInfo(); // envia mensagem para o numero especificado.

//array[0].removeChild('P6z4j')


//array[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerText = ""
//teste = document.querySelectorAll('div .message-in')
//for(let i = 0; i < teste.length ; i++){console.log(teste[i].textContent)}

//array[i].firstElementChild.textContent (acessando o nome do contato)
//array[i].lastElementChild.textContent (acessando as mensagens recebidas.)
