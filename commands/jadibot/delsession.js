module.exports = {
    name: 'delsessionbot',
    cmd: ['delsessionbot'],
    ignored: true,
    private: true,
    async handler(m, {conn}){
        if(!conns[m.sender]) return m.reply('Tidak ada sesi berlangsung!')
        delete conns[m.sender]
        m.reply('Berhasil menghapus sesi')
    }
}