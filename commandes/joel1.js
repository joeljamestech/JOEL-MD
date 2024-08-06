"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "ping", reaction: "🕷️", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = 'testing ping \n\n ' + "please wait...";
    let d = ' Response Speed 0.0040 _Second_ 
 0.014514000155031681 _miliseconds_

Runtime : 1 hour, 36 minutes, 21 seconds

💻 Info Server
RAM: 20.23 GB / 61.68 GB

_NodeJS Memory Usaage_
rss         : 142.99 MB
heapTotal   : 60.93 MB
heapUsed    : 58.42 MB
external    : 11.83 MB
arrayBuffers: 8.41 MB

_Total CPU Usage_
Intel(R) joel(R) CPU E5-1650 v3 @ 3.50GHz (3541.9999999999995 MHZ)
- *user* : 77.94%
- *nice* : 0.00%
- *sys*  : 17.14%
- *idle* : 4.92%
- *irq*  : 0.00%
_CPU Core(s) Usage (12 Core CPU)_
1. Intel(R) joel(R) CPU E5-1650 v3 @ 3.50GHz (3542 MHZ)
- *user* : 74.85%
- *nice* : 0.00%
- *sys*  : 19.66%
- *idle* : 5.48%
- *irq*  : 0.00%

2. Intel(R) joel(R) CPU E5-1650 v3 @ 3.50GHz (3542 MHZ)
- *user* : 77.80%
- *nice* : 0.00%
- *sys*  : 17.33%
- *idle* : 4.86%
- *irq*  : 0.00%

3. Intel(R) joel(R) CPU E5-1650 v3 @ 3.50GHz (3542 MHZ)
- *user* : 78.30%
- *nice* : 0.00%
- *sys*  : 17.01%
- *idle* : 4.68%
- *irq*  : 0.00%

4. Intel(R) joel(R) CPU E5-1650 v3 @ 3.50GHz (3542 MHZ)
- *user* : 78.32%
- *nice* : 0.00%
- *sys*  : 17.01%
- *idle* : 4.67%
- *irq*  : 0.00%

5. Intel(R) joel(R) CPU E5-1650 v3 @ 3.50GHz (3542 MHZ)
- *user* : 76.93%
- *nice* : 0.00%
- *sys*  : 18.09%
- *idle* : 4.98%
- *irq*  : 0.00%

6. Intel(R) joel(R) CPU E5-1650 v3 @ 3.50GHz (3542 MHZ)
- *user* : 78.18%
- *nice* : 0.00%
- *sys*  : 17.10%
- *idle* : 4.72%
- *irq*  : 0.00%

7. Intel(R) joel(R) CPU E5-1650 v3 @ 3.50GHz (3542 MHZ)
- *user* : 69.18%
- *nice* : 0.00%
- *sys*  : 25.14%
- *idle* : 5.67%
- *irq*  : 0.00%

8. Intel(R) joel(R) CPU E5-1650 v3 @ 3.50GHz (3542 MHZ)
- *user* : 80.75%
- *nice* : 0.00%
- *sys*  : 13.93%
- *idle* : 5.32%
- *irq*  : 0.00%

9. Intel(R) joel(R) CPU E5-1650 v3 @ 3.50GHz (3542 MHZ)
- *user* : 82.18%
- *nice* : 0.00%
- *sys*  : 13.16%
- *idle* : 4.66%
- *irq*  : 0.00%

10. Intel(R) joel(R) CPU E5-1650 v3 @ 3.50GHz (3542 MHZ)
- *user* : 82.26%
- *nice* : 0.00%
- *sys*  : 13.17%
- *idle* : 4.57%
- *irq*  : 0.00%

11. Intel(R) joel(R) CPU E5-1650 v3 @ 3.50GHz (3542 MHZ)
- *user* : 77.06%
- *nice* : 0.00%
- *sys*  : 18.24%
- *idle* : 4.69%
- *irq*  : 0.00%

12. Intel(R) joel(R) CPU E5-1650 v3 @ 3.50GHz (3542 MHZ)
- *user* : 82.19%
- *nice* : 0.00%
- *sys*  : 13.27%
- *idle* : 4.54%
- *irq*  : 0.00%';
    let varmess = z + d;
    var img = 'https://telegra.ph/file/e8311b969d1cb5ce67da8.jpg';
    await zk.sendMessage(dest, { image: { url: img }, caption: varmess });
    //console.log("montest")
});
console.log("mon test");
/*module.exports.commande = () => {
  var nomCom = ["test","t"]
  var reaction="☺️"
  return { nomCom, execute,reaction }
};

async function  execute  (origineMessage,zok) {
  console.log("Commande saisie !!!s")
   let z ='Salut je m\'appelle *Zokou* \n\n '+'je suis un bot Whatsapp Multi-appareil '
      let d =' developpé par *Djalega++*'
      let varmess=z+d
      var img='https://telegra.ph/file/626e7105422c8908f723d.jpg'
await  zok.sendMessage(origineMessage,  { image:{url:img},caption:varmess});
}  */ 
