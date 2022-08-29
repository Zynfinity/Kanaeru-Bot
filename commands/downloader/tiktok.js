module.exports = {
    name: "tiktok",
    param: "<url>",
    cmd: ["tiktok"],
    category: "downloader",
    desc: "Download video from tiktok",
    query: true,
    url: true,
    async handler(m, {
        conn,
        text
    }) {
        await m.reply(response.wait);
        try {
            const down = await rzky.downloader.tiktok(text);
            down.audio_name = down.result.audio.audio_name
            await conn.sendButtonVideoV2(
                m.from,
                await tool.getBuffer(down.result.video.nowm.video_url),
                await tool.parseResult('TIKTOK DOWNLOADER', down, {
                    delete: ['creator', 'thumbnail', 'result']
                }),
                "Click Button below if u want mp3 format!",
                ["AUDIO"],
                [`.tiktokmp3 ${text}`], {
                    quoted: m
                }
            );
        } catch {
            const down = await scrapp.musicaldown(text)
            if (!down.status) return m.reply(down)
            await conn.sendButtonVideoV2(
                m.from,
                await tool.getBuffer(down.video.link1),
                'Done',
                "Click Button below if u want mp3 format!",
                ["AUDIO"],
                [`.tiktokmp3 ${text}`], {
                    quoted: m
                }
            );
        }
    },
};
