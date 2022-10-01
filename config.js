const fs = require("fs");
const pathh = require("path");
const syntaxerror = require("syntax-error");
const { Low, JSONFile } = require("./database/lowdb");
const database = new Low(new JSONFile("database/json/database.json"));
const response = {
	id: {
		wait: "Tunggu sebentar, permintaan anda sedang diproses...",
		owner: "Perintah ini hanya untuk owner!",
		admin: "Perintah ini hanya untuk admin group!",
		botadmin: "Bot harus menjadi admin group untuk melakukan perintah ini!",
		group: "Perintah ini hanya dapat dilakukan didalam grup!",
		private: "Perintah ini hanya dapat dilakukan didalam Private Chat",
		error: "Command error, silahkan coba beberapa saat lagi...",
		errorlink: "Mohon masukkan link yang benar",
		limit: "Limit anda sudah habis, silahkan gunakan fitur ini esok hari"
	},
	en: {
		wait: "Wait a minute, your request is being processed...",
		owner: "This command is only for the owner!",
		admin: "This command is only for the group admin!",
		botadmin: "The bot must be a group admin to perform this command!",
		group: "This command can only be done in groups!",
		private: "This command can only be done in private chat!",
		error: "Command error, please try again later...",
		errorlink: "Please enter the correct link!",
		limit: "Your limit has run out, please use this feature tomorrow"
	}
}
class config {
	static botname = "KANAERU - BOT";
	static server = true
	static email = 'fajarihsana15@gmail.com'
	static instagram = 'https://ihsanafajar.blogspot.com'
	static prefixs = "multi"; //set ., #, and etc if you want single prefix example: const prefixs = '.'
	static session = "kanaeru"; //default empty
	static ownername = "Fajar";
	static self = false;
	static packInfo = { packname: "@ihsanafajar", author: "KANAERU - BOT" };
	static namebot = "KANAERU - BOT";
	static limit = 50
	static owner = ["639162506299@s.whatsapp.net", "6289506883380@s.whatsapp.net"];
	static line = {
		owner: 'U8a37ce637bd9c801303b65564db5d48a',
		token: '09mYp/dWJnYgNQltZ8luP29/TGhaURiNwjXfBnCCJSPjBMp2YQYA3bIA6Ag4PXJpoc2WZhKLmzcFyVIt/Jlkwo+WaPTPoc+42nu/BzW6/3xyru2yJbj+NA5dlqiL0Ys4w/p3W2XWZ4jtetl4G3rlRgdB04t89/1O/w1cDnyilFU=',
	}
	static telegram = {
		owner: '1453538702',
		token: '5340742042:AAFtc8_iaBF6JY-xAPyf37x4aRcuWtQFbW8'
	}
}
//reload command/function
let pluginFilter = (filename) => /\.js$/.test(filename);
let pluginFolder = pathh.join(__dirname, "./commands");
global.reload = (path) => {
	path = `./${path.replace(/\\/g, '/')}`
	filename = path.split("/")[3]
	if (pluginFilter(filename)) {
		let dir = pathh.join(pluginFolder, './' + path.split('/')[2] + '/' + path.split('/')[3])
		isi = require(path)
		if (dir in require.cache) {
			delete require.cache[dir];
			if (fs.existsSync(dir)) console.info(`re - require plugin '${path}'`);
			else {
				console.log(`deleted plugin '${path}'`);
				return isi.function
					? delete attr.functions[filename]
					: delete attr.commands[filename];
			}
		} else console.info(`requiring new plugin '${filename}'`);
		let err = syntaxerror(fs.readFileSync(dir), filename);
		if (err) console.log(`syntax error while loading '${filename}'\n${err}`);
		else
			try {
				isi.function
					? (attr.functions[filename] = require(dir))
					: (attr.commands[filename] = require(dir));
			} catch (e) {
				console.log(e);
			} finally {
				isi.function
					? (attr.functions = Object.fromEntries(
							Object.entries(attr.functions).sort(([a], [b]) => a.localeCompare(b))
					  ))
					: (attr.commands = Object.fromEntries(
							Object.entries(attr.commands).sort(([a], [b]) => a.localeCompare(b))
					  ));
			}
	}
};
//globall
global.owner = ["639162506299@s.whatsapp.net", "6289506883380@s.whatsapp.net", "6281990498472@s.whatsapp.net"]; //owner
const bahasa = "en"; // en/id
global.response = response[bahasa];
global.users = JSON.parse(fs.readFileSync('./database/json/user.json'))
global.tool = require("./lib/tools");
global.scrapp = require("./lib/scraper");
const iky = require('ikyy')
global.ig = require('./lib/instagram')
global.line = require('./lib/sosmed').line
global.tele = require('./lib/sosmed').telegram
global.rzky = new iky()
global.shp = "•";
global.db = database;
module.exports = config;
let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log("Update 'config.js'");
	delete require.cache[file];
});
