const puppeteear = require('puppeteer');

const postInfo = async () => {
      const code = '55';
      const phone = '8193651366';
      const message = 'Teste de mensagem';
      const browser = await puppeteear.launch({
        headless: false
      });
      const page = await browser.newPage();
      await page.goto('https://web.whatsapp.com/')
        await page.goto(
          `https://web.whatsapp.com/send?phone=${code}${phone}&text=${message}`
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
      });//rescebendo numero e eviando para o usuario !esta funçao necessita de uma mensagem para ser enviada

      await page.waitFor(1000);

      const scrapeMessage = async () => {
        await page.waitFor(10000);//espera 10s
        const msg = await page.evaluate(
          () => Array.from(document.querySelectorAll('div.message-in')).map((patern) => patern.innerText.trim())
        );
        console.log('msg' + msg);
        for (let i = 0; i < msg.length; i++) {
          console.log(msg[i].textContent)
        }
      }; //pega mensagens recebidas e adiciona em uma array

      const marcandoMsgLida = async () => {
        await page.waitFor(10000);//espera 10s
        let arrayMsg = await page.evaluate(() => Array.from(document.querySelectorAll('div.X7YrQ div._2WP9Q')).map(patern => {return patern}))
          arrayMsg.map((i, index)=> {
            if(!!arrayMsg.length){
              console.log('Sem mensagem não lida')
            }else{
              arrayMsg[index].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerHTML = "";
            }
            try {
              console.log('ok')
            } catch (erro){
              console.log('Sem mensagem não lida', erro)
            };
          });
          return true;
      }

      const scrapInNotification = async () => {
        await page.waitFor(10000);//espera 10s
        const msgs = await page.evaluate(() => {
            const msgRecebidas = [];
            const msgRecebidasNoty = [];
            let array = Array.from(document.querySelectorAll('div.X7YrQ div._2WP9Q')).map(patern => { return patern });
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
            console.log(msgRecebidasNoty);
            // let array = Array.from(document.querySelectorAll('div.X7YrQ div._2WP9Q')).map(patern => {return patern})
              return msgRecebidasNoty;
              //array[15].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerHTML = ""
            });
            //console.log(array[0].lastElementChild.children[1].textContent);
            console.log('msgs:' + msgs);
          };
        scrapInNotification();
        marcandoMsgLida();
        scrapeMessage();
      }
      postInfo(); // envia mensagem para o numero especificado.

      //array[0].removeChild('P6z4j')


      //array[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerText = ""(elemento de notificação de na barra de conversas)
      //teste = document.querySelectorAll('div .message-in')
      //for(let i = 0; i < teste.length ; i++){console.log(teste[i].textContent)}

      //array[i].firstElementChild.textContent (acessando o nome do contato)
      //array[i].lastElementChild.textContent (acessando as mensagens recebidas.)