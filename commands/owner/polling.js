const biley = require('@adiwajshing/baileys')
module.exports = {
    name: 'polling',
    param: '<title|opt1|opt2>',
    cmd: ['polling'],
    category: 'group',
    desc: 'Membuat Kolom Voting di Group',
    query: 'Polling Message\nExample: .polling Test|Yes|No',
    group: true,
    admin: true,
    botAdmin: true,
    disabled: true,
    async handler(m, {conn, text}){
        const array = text.split('|')
        if(array.length < 3) return m.reply('Minimal 2 Pilihan!')
        const msg = {
            pollCreationMessage: {
            options: [],
            name: array[0],
            selectableOptionsCount: 0
            }
        }
        for(let i=1; i<=array.length - 1; i++){
            msg.pollCreationMessage.options.push({optionName: array[i]})
        }
        const gen = await biley.generateWAMessageFromContent(m.from, msg, {})
        await conn.relayMessage(m.from, gen.message, {messageId: gen.key.id})
    }
}