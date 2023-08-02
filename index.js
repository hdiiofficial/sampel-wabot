const { Client, Location, List, Buttons, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox'],
  }
})

client.initialize()

client.on('loading_screen', (percent, message) => {
  console.log('Loading..', percent, message)
})

client.on('qr', qr => {
  qrcode.generate(qr, {small: true})
})

client.on('authenticated', () => {
  console.log('Diauntentikasi')
})

client.on('auth_failure', msg => {
  console.error('Gagal Autentikasi ', msg)
})

client.on('ready', () => {
  console.log('Client Ready')
})

client.on('message', async (mseg) => {
  if(mseg.body === '!tagall') {
    const chat = await mseg.getChat()

    let teks = mseg.body.split(' ').slice(0, 1).join(' ')
    let mentions = []

    for(let participant of chat.participant) {
      const contact = await client.getContactById(participant.id._serialized)

      mentions.push(contact)
    }

    await chat.sendMessage(teks, { mentions })
  }
})
  


