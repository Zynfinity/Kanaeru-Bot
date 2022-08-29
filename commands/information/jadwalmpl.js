module.exports = {
	name: 'jadwalmpl',
	cmd: ['jadwalmpl', 'jadwalmplweek'],
	category: 'information',
	desc: 'Jadwal Mpl Id S10',
	async handler(m, {conn, args}){
		const jadwal = await scrapp.jadwalmplid()
		if(m.command == 'jadwalmpl'){
			const sections = [
				    {
						rows: []
				    }
				]
			for(let i=1; i<=8; i++){
				sections[0].rows.push({title: `${shp} Week ${i}`, rowId: `.jadwalmplweek ${i}`})
			}
			const listMessage = {
				text: `${shp} *Jadwal MPL ID Season 10*`,
				footer: "Klik tombol dibawah untuk melihat>",
				title: "*JADWAL MPL ID*",
				buttonText: "Klik Disini",
				sections: sections
			}
			await conn.sendMessage(m.from, listMessage)
		}
		else{
			const array = jadwal.filter(sc => sc.week == args[0])
			const opt = {
				quoted: m,
				adReply: {
					type: 2,
					title: 'MPL ID SCHEDULE',
					url: 'https://id-mpl.com/schedule'
				}
			}
			await conn.sendFileFromUrl(m.from, 'https://indonesia.postsen.com/content/uploads/2022/08/11/cb6786263b.jpg', {caption: await tool.parseResult(`JADWAL MPL ID WEEK ${args[0]}`, array)}, {...opt})
		}
	}
}