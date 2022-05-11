const puppeteer = require("puppeteer");
const prompt = require("prompt-sync")();

const contactName = prompt("inserisci contatto");
const quantity = prompt("numero volte");
const delayMessage = prompt("inserisci in millisecondi il delay");

(async function main() {
  try {
    // configures puppeteer
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(10000000);
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    // navigatess to whatsapp
    await page.goto("https://web.whatsapp.com/");
    await page.waitForSelector("._3m_Xw");
    await delay(3000);

    // change to contact you want to send message
    const search = await page.waitForSelector(
      "#side > div.uwk68 > div > label > div > div._13NKt.copyable-text.selectable-text"
    );
    search.click();
    search.focus();
    for (let i = 0; i < contactName.length; i++) {
      await page.keyboard.press(contactName[i]);
    }
    await page.waitForTimeout(1000);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1000);
    // amount of message you want to send
    // loops through cycle of sending message
    for (let i = 0; i < Number(quantity); i++) {
      await page.evaluate(() => {
        const message =
          "𐎟 𝐌⃗𝐀̐ྃ͢𝐆͢𝐑⃗𝐎ྃ͢𝐅⃗𝐏͢𝐒 𐎟𐎟 𝐌⃗𝐀̐ྃ͢𝐆͢𝐑⃗𝐎ྃ͢𝐅⃗𝐏͢𝐒 𐎟𐎟 𝐌⃗𝐀̐ྃ͢𝐆͢𝐑⃗𝐎ྃ͢𝐅⃗𝐏͢𝐒 𐎟𐎟 𝐌⃗𝐀̐ྃ͢𝐆͢𝐑⃗𝐎ྃ͢𝐅⃗𝐏͢𝐒 𐎟𐎟 𝐌⃗𝐀̐ྃ͢𝐆͢𝐑⃗𝐎ྃ͢𝐅⃗𝐏͢𝐒 𐎟";
        document.execCommand("insertText", false, message);
      });
      await page.click("span[data-testid='send']");
      await delay(delayMessage);
    }
  } catch (err) {
    console.error(err);
  }
})(contactName, quantity, delayMessage);

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
