import qrcode from 'qrcode-terminal';
import { Client, Buttons, LocalAuth } from 'whatsapp-web.js';

const Adinda = new Client({
  authStrategy: new LocalAuth({
    dataPath: 'session',
    clientUd: 'new session'
  }),
  playwright: {
    headless: false,
    args: ['--no-sandbox']
  },
  markOnlineAvailable: false,
  qrMaxRetries: 3
});

Adinda.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

Adinda.on("ready", () => {
  console.log("Dah Siap!");
});

Adinda.on("message", async (msg) => {
  if (msg.body == "Assalamualaikum") {
    msg.reply("Waalaikumsalam");
  }
  if (msg.body == "!testbuton") {
    let button = new Buttons('Button Name', [{ body: 'bt1' }, { body: 'bt2' }, { body: 'bt3' }], 'title', 'footer');
    Adinda.sendMessage(msg.from, button);
  }
  if (msg.body == "bt1") {
    msg.reply("sukses");
  }
});

Adinda.initialize();
