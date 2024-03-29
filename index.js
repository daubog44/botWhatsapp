const puppeteer = require("puppeteer");
const prompt = require("prompt-sync")();

const contactName = prompt("inserisci contatto: ");
const quantity = prompt("numero volte: ");
const delayMessage = prompt("inserisci in millisecondi il delay: ");
const messageContain = prompt("inserisci contenuto messaggio: ");

(async function main() {
  try {
    // configures puppeteer
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(30000);
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    // navigatess to whatsapp
    await page.goto("https://web.whatsapp.com/", {
      waitUntil: "domcontentloaded",
    });

    // wait for confirm of login
    await page.waitForSelector("div[data-testid='chat-list-search']");

    //! CTRL + ALT + SHIFT + / = ricerca tra le chat e i messaggi
    await page.keyboard.down("ControlLeft");
    await page.keyboard.down("AltLeft");
    await page.keyboard.down("ShiftLeft");
    await page.keyboard.press("/");
    await page.keyboard.up("ShiftLeft");
    await page.keyboard.up("AltLeft");
    await page.keyboard.up("ControlLeft");
    // change to contact you want to send message and select it

    await page.keyboard.type(contactName, { delay: 100 });
    await page.keyboard.press("Enter");
    await page.waitForTimeout(10);
    // amount of message you want to send
    // loops through cycle of sending message
    for (let i = 0; i < Number(quantity); i++) {
      await page.keyboard.type(messageContain);
      await page.click("span[data-testid='send']");
      await page.waitForTimeout(delayMessage);
    }
    await page.waitForTimeout(7000);
    await browser.close();
    console.log("i tuoi messaggi sono stati mandati!");
  } catch (err) {
    console.error(err);
  }
})(contactName, quantity, delayMessage, messageContain);
