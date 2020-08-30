const fs = require('fs')
const pkgInfo = require('./package.json')
const SessionClient = require('../node-session-client/session-client.js')

const client = new SessionClient()
if (fs.existsSync('lastHash.txt')) {
  client.lastHash = fs.readFileSync('lastHash.txt').toString()
}
client.loadIdentity({
  seed: fs.existsSync('seed_directory.txt') && fs.readFileSync('seed_directory.txt').toString(),
  displayName: 'Vector0\'s Bot Directory',
  //avatarFile: '5f16f4fd7ca8def05968bbca_Jk79urotkJJtMHZNO3kduoJLgAW6X6kgceEjnbI2VeeOseBujKs6ok_IbYl3OHxaaHLUmtMVRNk.png',
}).then(async() => {
  client.open()
  client.on('updateLastHash', hash => {
    fs.writeFileSync('lastHash.txt', hash)
  })
  client.on('messages', msgs => {
    msgs.forEach(async msg => {
      console.log('msg', msg)
      client.send(msg.source, `
05e39a87f4da2e0a01b381bdcb96090f88a110c7a8bb1b3c09cc1369dbdb6be264 Get list of open groups
05732e0e16b5276c984c1eaeb4e4fe0e11e7868a8c91c88acb438a3e5c4eaacc19 Service Node Bot

If you have a good idea for bot, let Vector0 know:
057c040ac3ec3fc00c3062a6d32f3134b3fd1831080579ad025b3243b7b4aa8366

Development depends on your support
LYCXi1VHyWTDYBRi3NeheGUNRcMZcudXs2PbQc1tj5uSag8vjJoKMSoT4jJ13MZAuTLYHDYVUeijzAnwNATrJMXWM4Vt98y
`)
/*
0534887cb343011d6bf463c89472823edd56b33a9b3e0439eb41e719401c451c33 Contact Vector0
*/
    })
  })

  client.send('05d233c6c8daed63a48dfc872a6602512fd5a18fc764a6d75a08b9b25e7562851a', 'Bot Directory startup', {})
})
