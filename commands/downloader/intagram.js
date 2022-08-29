module.exports = {
    name: "instagram",
    param: "<url>",
    cmd: ["instagram", "ig"],
    category: "downloader",
    desc: "Download media dari instagram",
    query: true,
    url: true,
    async handler(m, {conn,text}) {
        if (!/instagram/.test(text) || /stories/.test(text)) return m.reply(response.errorlink);
        await m.reply(response.wait);
        const igg = await ig.instagramdl3(text);
        if (!igg.status) return m.reply('No media found');
        const media = igg.result
        const many = media.length > 1 ? true : false;
        if (m.isGroup && many) await m.reply("Jumlah media lebih dari 1, media akan dikirim lewat private chat (PC)\nSilahkan cek chat dari bot><!");
        for (let i of media) {
            await conn.sendFileFromUrl(many ? m.sender : m.from, i, {}, {quoted: m});
        }
    },
};
