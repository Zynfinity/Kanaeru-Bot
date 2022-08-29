module.exports = {
    name: 'surah',
    param: '<no surah>',
    cmd: ['surah','surat'],
    category: 'religi',
    desc: 'display the surah of the quran',
    query: true,
    async handler(m, {conn, args}){
        if (isNaN(args[0])) return await m.reply("Input harus berupa nomor!");
        if (args[0] > 114) return await m.reply("surat al-quran hanya berjumlah 114!");
        const list = await scrapp.listsurat();
        const filt = await list.filter((res) => res.no == args[0]);
        const res = await scrapp.surat(filt[0].surah);
        teks = shp + ` *Surah ${res.surat} Ayat 1 - ${res.result.length}\n\n`;
        num = 1;
        for (let i of res.result) {
            teks += num + ".  " + i.arabic + "\n\n";
            teks += "_Artinya : " + i.arti + "_\n\n------------------------------\n\n";
            num += 1;
        }
        m.reply(teks);
    }
}
