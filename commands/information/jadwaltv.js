module.exports = {
    name: 'jadwaltv',
    param: '<channel>',
    cmd: ['jadwaltv'],
    category: 'information',
    query: true,
    async handler(m, {conn, text}){
        await m.reply(response.wait)
        const jtv = await scrapp.jadwaltv(text)
        if(!jtv.status) return m.reply(jtv)
        m.reply(await tool.parseResult(`JADWAL TV : ${jtv.channel}`, jtv.result))
    }
}