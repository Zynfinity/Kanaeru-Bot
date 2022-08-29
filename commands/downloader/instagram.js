module.exports = {
    name: "instagram",
    param: "<url>",
    cmd: ["instagram", "ig"],
    category: "downloader",
    desc: "Download media dari instagram",
    query: `*[ INSTAGRAM DOWNLOADER ]*\n\nReply This Message And Send Url Insta !\n(post, reel, tv, stories)`,
    url: true,
    async handler(m, {conn,text}) {
        await m.reply(response.wait)
        try {
            let links = await ig.instagramdl4(text)
            if(!links.status) return m.reply('no media found!')
            const media =  links.media
if(media.length == 1) return await conn.sendFileFromUrl(m.from, media[0].url, {caption: `${shp} Type : ${media[0].type}`}, {quoted: m})
            const listPost = []
            listnyd = 1
            for (let i of media) {
                listPost.push({
                    title: `Result ${listnyd++}`, rowId: `.getmedia ${i.url}`, description: `${shp} Type : ${i.type}`
                })
            }
            const sections = [
                {
                    title: `Hasil Yg Ditemukan`,
                    rows: listPost
                }
            ]
            teskd = `Click To View Result And Get Media !`
            const listMessage = {
                title: 'INSTAGRAM DOWNLOADER',
                text: teskd,
                footer: config.botname,
                buttonText: "Click Here",
                sections
            }
            await conn.sendMessage(m.from, listMessage, {quoted: m})
        } catch {
            const igg = await ig.instagramdl3(text);
            if (!igg.status) return m.reply('No media found');
            const medis = igg.result
            for (let i of medis) {
                await conn.sendFileFromUrl(m.from, i, {}, {quoted: m});
            }
        }
    }
}