const {
	fetchLatestBaileysVersion,
	makeInMemoryStore,
	default: Baileys,
	useSingleFileAuthState,
	jidDecode,
	DisconnectReason,
	delay,
	default: makeWASocket,
} = require("@adiwajshing/baileys");
const pino = require("pino");
const chokidar = require('chokidar');
const fs = require("fs");
const path = require("path");
const { Boom } = require("@hapi/boom");
const syntaxerror = require("syntax-error");
const config = require("./config");
try{
	var { state, saveState } = useSingleFileAuthState(`./${config.session ? config.session : "session"}.json`);
}catch{
  fs.unlinkSync(`./${config.session ? config.session : "session"}.json`)
  var { state, saveState } = useSingleFileAuthState(`./${config.session ? config.session : "session"}.json`);
}
require('./lib/proto')
//attribute
global.attr = {};
global.game = {}
global.game.akinator = {}
global.conns = {}
attr.commands = new Map();
attr.functions = new Map();
attr.isSelf = config.self;

// store
/*global.store = makeInMemoryStore({
	logger: pino().child({ level: "silent", stream: "store" }),
});*/
global.store = makeInMemoryStore({ })
store.readFromFile('./baileys_store.json')
setInterval(() => {
    store.writeToFile('./baileys_store.json')
}, 10_000)
//readcmd
const ReadFitur = () => {
	let pathdir = path.join(__dirname, "./commands");
	let fitur = fs.readdirSync(pathdir);
	for (let fold of fitur) {
		for (let filename of fs.readdirSync(__dirname + `/commands/${fold}`)) {
			plugins = require(path.join(__dirname + `/commands/${fold}`, filename));
			plugins.function ? (attr.functions[filename] = plugins) : (attr.commands[filename] = plugins);
		}
	}
	console.log("Command loaded successfully");
};
ReadFitur();
const connect = async () => {
	let { version, isLatest } = await fetchLatestBaileysVersion();
	console.log(`Using: ${version}, newer: ${isLatest}`);
	const conn = makeWASocket({
		printQRInTerminal: true,
		auth: state,
		browser: [config.botname, "Chrome", "1.0.0"],
		logger: pino({ level: "silent" }),
		version,
	});
	if(config.server) require("./lib/http-server")(conn);
	conn.mess = [];
	conn.cooldown = {}
	global.decodeJid = (jid) => {
		if (/:\d+@/gi.test(jid)) {
			const decode = jidDecode(jid) || {};
			return (
				(decode.user && decode.server && decode.user + "@" + decode.server) ||
				jid
			).trim();
		} else return jid.trim();
	};
	store.bind(conn.ev);
	conn.ev.on("creds.update", saveState);
	conn.ev.on("connection.update", async (up) => {
		const { lastDisconnect, connection } = up;
		if (connection == "connecting") console.log("Connecting to the WhatsApp bot...");
		if (connection) {
			if (connection != "connecting") console.log("Connection: " + connection);
		}
		if (connection == "open") console.log("Successfully connected to whatsapp");
		if (connection === "close") {
			let reason = new Boom(lastDisconnect.error).output.statusCode;
			console.log(reason)
			if (reason === DisconnectReason.badSession) {
				console.log(`Bad Session File, Please Delete ${config.session} and Scan Again`);
				connect();
			} else if (reason === DisconnectReason.connectionClosed) {
				console.log("Connection closed, reconnecting....");
				connect();
			} else if (reason === DisconnectReason.connectionLost) {
				console.log("Connection Lost from Server, reconnecting...");
				connect();
			} else if (reason === DisconnectReason.connectionReplaced) {
				console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
				conn.logout();
			} else if (reason === DisconnectReason.loggedOut) {
				console.log(`Device Logged Out, Please Delete ${config.session} and Scan Again.`);
				conn.logout();
			} else if (reason === DisconnectReason.restartRequired) {
				console.log("Restart Required, Restarting...");
				connect();
			} else if (reason === DisconnectReason.timedOut) {
				console.log("Connection TimedOut, Reconnecting...");
				connect();
			} else {
				conn.end(`Unknown DisconnectReason: ${reason}|${lastDisconnect.error}`);
				connect()
			}
		}
	});
	//anticall
	conn.ws.on("CB:call", async (json) => {
		require("./event/call")(json, conn);
	});
	//contact update
	conn.ev.on("contacts.update", (m) => {
		for (let kontak of m) {
			let jid = decodeJid(kontak.id);
			if (store && store.contacts)
				store.contacts[jid] = { jid, name: kontak.notify };
		}
	});
	//antidelete
	conn.ev.on("message.delete", async (json) => {
		require("./event/antidelete")(json, conn);
	});
	// detect group update
	conn.ev.on("groups.update", async (json) => {
		const res = json[0];
		require("./event/group_update")(res, conn);
	});
	//greetings
	conn.ev.on("group-participants.update", async (json) => {
		require("./event/greetings")(json, conn);
	});
	// messages.upsert
	conn.ev.on("messages.upsert", async (m) => {
		const msg = m.messages[0];
		const type = msg.message ? Object.keys(msg.message)[0] : "";
		if (msg && type == "protocolMessage") conn.ev.emit("message.delete", msg.message.protocolMessage.key);
		await require("./lib/handler")(conn, m);
	});
};
connect();
let file = require.resolve(__filename);
Object.freeze(global.reload)
var watcher = chokidar.watch('./commands', {ignored: /^\./, persistent: true});
watcher
.on('error', function(error) {console.error('Error happened', error);})
  .on('add', function(path) {global.reload(path)})
  .on('change', function(path) {global.reload(path)})
  .on('unlink', function(path) {global.reload(path)})
process.on("uncaughtException", function (err) {
	console.error(err);
});