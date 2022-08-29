module.exports = {
    name: 'loker',
    param: '<query>',
    cmd: ['loker', 'infoloker'],
    category: 'search',
    desc: ['Mencari loker di jobstreet.com'],
    query: 'Example : .loker network engineer',
    async handler(m, {conn, text}){
        await m.reply(response.wait)
        const loker = await scrapp.jobstreet(text)
        if(!loker.status) return m.reply(loker)
        await m.reply(await tool.parseResult(`Hasil Pencarian Loker : ${text}`, loker.result))
    }
}