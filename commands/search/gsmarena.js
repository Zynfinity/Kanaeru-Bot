module.exports = {
    name: 'gsmarena',
    param: '<query>',
    cmd: ['gsmarena'],
    category: 'search',
    desc: 'Search spesification smartphone',
    query: true,
    async handler(m, {conn, text}){
        await m.reply(response.wait)
        const opt = {
            quoted: m,
            adReply: {
                type: 2,
                title: 'Gsm Arena Search : ' + text
            }
        }
        try{
            const gsm = await scrapp.gsmarena(text)
            await conn.sendFileFromUrl(m.from, gsm.thumbnail, {caption: await tool.parseResult('GSM ARENA', gsm, {delete: ['thumbnail']})}, {...opt})
        }catch{
            m.reply('Content not found!')
        }
    }
}