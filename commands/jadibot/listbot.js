module.exports = {
    name: 'listbot',
    cmd: ['listbot', 'listjadibot'],
    category: 'jadibot',
    desc: 'Menampilkan list jadibot',
    async handler(m, {conn}){
        if(Object.keys(conns) == '') return m.reply('Tidak ada client bot')
        const array = Object.values(conns)
        let jbot = `*LIST JADIBOT*\n`
        jbot += `${shp} Total : ${array.length}\n\n`
        for(let i of array){
            jbot += `${shp} Name:  ${i.user.name}\n`
            jbot += `${shp} No : @${i.user.id.split(':')[0]}\n\n`
        }
        m.reply(jbot, {withTag: true})
    }
}