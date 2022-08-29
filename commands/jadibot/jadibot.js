const pino = require("pino");
const { Boom } = require("@hapi/boom");
module.exports = {
	name: 'jadibot',
	cmd: ['jadibot'],
category: 'jadibot',
	private: true,
	async handler(m, {conn}){
		const {
			makeInMemoryStore,
			default: Baileys,
			BufferJSON,
			useMultiFileAuthState,
			jidDecode,
			DisconnectReason,
			delay,
			default: makeWASocket,
		} = require("@adiwajshing/baileys");
        if(conns[m.sender]) return m.reply('Anda sudah menjadi bot sebelumnya!')
		if((Object.keys(conns)).length >= 2) return m.reply('Client bot sudah mencapai maksimal (2)')
		const session = `./jadibot/${m.sender}`
		const { state, saveCreds } = await useMultiFileAuthState(session)
		const connect = async() => {	
			conns[m.sender] = await makeWASocket({
				auth: state,
				browser: [`${await conn.getName(m.sender)} - Jadibot`, "Chrome", "1.0.0"],
				logger: pino({ level: "silent" })
			})
			conns[m.sender].id = m.sender
			await m.reply('Connecting To Whatsapp Bot Using Jadibot'.bolds().italic())
			const con = conns[m.sender]
			con.store = makeInMemoryStore({logger: pino().child({ level: "silent", stream: "store" })});
			con.mess = []
			con.store.bind(con.ev);
			con.isConnected = false
			con.try = 1
			con.ev.on('creds.update', saveCreds)
			con.ev.on("connection.update", async (up) => {
				if(up.qr){
					qr = 'Scan QR ini untuk jadi bot sementara\n\n1. Klik titik tiga di pojok kanan atas\n2. Ketuk WhatsApp Web\n3. Scan QR ini'
					await conn.sendMessage(m.from, {image: await Buffer.from((await require('qrcode').toDataURL(up.qr)).replace('data:image/png;base64,', ''), 'base64'), caption: qr}, {quoted: m}).then(async del => {
						con.try == 1 ? await tool.sleep(60000) : await tool.sleep(20000)
						conn.sendMessage(m.from, {delete: del.key})						
					})
					con.try++
				}
				const { lastDisconnect, connection } = up;
				if (connection) {
					if (connection != "connecting") console.info("Jadibot : Connection: " + connection);
				}
				if (connection == "open") {
					m.reply(await tool.parseResult('Succsessfully Connected Using Jadibot', con.user));
				}
				if(connection == 'close'){
					let reason = new Boom(lastDisconnect.error).output.statusCode;
					if (reason === DisconnectReason.restartRequired) {
						m.reply('Restart Required, Restarting...'.bolds().italic());
						connect();
					}
					else if(reason === DisconnectReason.loggedOut){
						await m.reply('Device logout\nketik .jadibot, dan scan kembali')
						con.end()
					}
					else if (reason === DisconnectReason.timedOut) {
						let notconn = `Connection Timeout\n\n`
						notconn += `Cobalah ketik .jadibot sekali lagi\n`
						notconn += 'Jika Bot tidak mau tersambung, ketik .deljadibot, lalu ketik .jadibot, dan scan kembali\n\n'
						notconn += 'Terima Kasih'
						await m.reply(notconn)
                        con.end()
						//await require('fs').unlinkSync(session)
						//connect();
					}
					delete con
				}
			})
			con.ev.on("messages.upsert", async (m) => {
				const msg = m.messages[0];
				//console.log(con)
				const type = msg.message ? Object.keys(msg.message)[0] : "";
				if (msg && type == "protocolMessage") con.ev.emit("message.delete", msg.message.protocolMessage.key);
				await require("../../lib/handler")(con, m);
			});
		}
		connect()
	}
}