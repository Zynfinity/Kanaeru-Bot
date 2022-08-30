module.exports = {
	name: 'menfesfc',
	function: true,
	async handler(m, {conn}){
		if(m.isGroup) return
		const find = Object.values(db.data.menfes).find(id => [id.to, id.id].includes(m.sender))
		if(!find) return
		const to = m.sender == find.id ? find.to : find.id
		await conn.copyNForward(to, m, true)
	}
}