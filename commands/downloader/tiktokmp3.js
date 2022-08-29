module.exports = {
    name: "tiktokmp3",
    param: "<url>",
    cmd: ["tiktokmp3"],
    category: "downloader",
    desc: "Download audio from tiktok",
    query: true,
    url: true,
    async handler(m, {
        conn,
        text
    }) {
        await m.reply(response.wait);
        const down = await scrapp.musicaldown(text);
        if (!down.status) return m.reply(down)
        await conn.sendMessage(
            m.from, {
                audio: {
                    url: down.audio.link1
                },
                mimetype: "audio/mpeg"
            }, {
                quoted: m
            }
        );
    },
};
