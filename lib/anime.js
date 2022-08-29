const axios = require('axios')
const cheerio = require('cheerio')
const author = '@ihsanafajar'
class neonime{
	static search = async(query, page = 1) => {
		return new Promise(async(resolve) => {
			try{
				const {data} = await axios.get(`https://neonime.watch/page/${page}/?s=${query}`)
				const $ = cheerio.load(data)
				const result = []
				$('#contenedor').find('div.item_1.items > div').each(function(){
					result.push({
						title: $(this).find('a > div > span').text(),
						episode: $(this).find('div.fixyear > h2').text(),
						url: $(this).find('a').attr('href')
					})
				})
				const filter = result.filter(p => p.title && p.episode.includes('Episode'))
				resolve(filter != '' ? {
					status: true,
					author,
					query,
					page,
					result: filter
				} : {
					status: false,
					author,
					query,
					page,
					message: 'not found'
				})
			}catch(e){
				resolve({
					status: 404,
					query,
					page,
					message: 'Page not found!'
				})
			}
		})
	}
	static ongoing = async(page = 1) => {
		return new Promise((resolve) => {
			if(!page) page = 1
			axios.get(`https://neonime.watch/episode/page/${page}/`).then(({data}) => {
				const $ = cheerio.load(data)
				const result = []
				$('#episodes > table > tbody > tr').each(function(){
					let episode = $(this).find('td.bb > a > span').text().trim()
					result.push({
						title: $(this).find('td.bb > a').text().split(episode)[0].trim(),
						episode,
						upload_date: $(this).find('td.dd').text(),
						url: $(this).find('td.bb > a').attr('href')
					})
				})
				resolve(result != '' ? {
					status: true,
					author,
					page,
					result: result
				} : {
					status: false
				})
			}).catch(e => resolve({status: false, message: 'unknown error'}))
		})
	}
	static getData = async(url) => {
		return new Promise(async(resolve) => {
			const {data} = await axios.get(url)
			const $ = cheerio.load(data)
			const result = {}
			$('#info > div').each(function(){
				let param = $(this).find('b').text().replace(/ /g, '_').toLowerCase()
				if(param) result[param] = $(this).find('span').text()
			})
			result.download = {}
			$('#series > div.ladoB > div.central > div > ul > ul').each(function(){
				$(this).find('li').each(function(a, b){
					$(b).find('a').each(function(){
						let name = $(b).find('label').text().replace(/ /g, '_').toLowerCase().trim()
						if(Object.keys(result.download).length <= 10) result.download[name] ? result.download[name] : result.download[name] = {name: $(b).find('label').text()}
						result.download[name][$(this).text().toLowerCase().trim()] = $(this).attr('href')
					})
				})
			})
			resolve(result)
		})
	}
}
class otakudesu{
	static search = async(query) => {
		return new Promise((resolve) => {
			axios.get(`https://otakudesu.watch/?s=${query}&post_type=anime`).then(({data}) => {
				const $ = cheerio.load(data)
				const result = []
				$('#venkonten > div > div.venser > div > div > ul > li').each(function(){
					result.push({
						title: $(this).find('h2 > a').text(),
						url : $(this).find('h2 > a').attr('href')
					})
				})
				resolve(result != '' ? {status: true, query, result: result} : {status: false, message: 'anime not found'})
			}).catch(e => resolve({status: 404, message: 'page not found'}))
		})
	}
	static getData = async(url) => {
		return new Promise((resolve) => {
			axios.get(url).then(({data}) => {
				const $ = cheerio.load(data)
				const result = {}
				$('#venkonten > div.venser > div.fotoanime > div.infozin > div > p').each(function(){
					result[$(this).find('span').text().split(':')[0].toLowerCase().replace(/ /g, '_')] = $(this).find('span').text().split(':')[1].trim()
				})
				result.episode = []
				$('#venkonten > div.venser > div:nth-child(8) > ul > li').each(function(){
					result.episode.push({
						title: $(this).find('span:nth-child(1) > a').text(),
						url: $(this).find('span:nth-child(1) > a').attr('href')
					})
				})
				resolve(result.judul ? {
					status: true,
					...result
				} : {
					status: false,
					message: 'episode not found'
				})
			}).catch(e => resolve({status: false, message: 'error'}))
		})
	}
	static download = async(url) => {
		return new Promise((resolve) => {
			axios.get(url).then(({data}) => {
				const $ = cheerio.load(data)
				const result = {}
				result.title = $('#venkonten > div.venser > div.venutama > div.download > h4').text()
				result.download = {}
				$('#venkonten > div.venser > div.venutama > div.download > ul > li').each(function(a, b){
					let quality = $(b).find('strong').text().split(' ').find(s => s.endsWith('p'))
					result.download['q_' + quality] = {}
					$(b).find('a').each(function(){
						result.download['q_' + quality].name ? result.download['q_' + quality] : result.download['q_' + quality].name = quality
						result.download['q_' + quality][$(this).text().toLowerCase().trim()] = $(this).attr('href')
					})
				})
				resolve(result)
			}).catch(e => console.log(e))
		})
	}
}
module.exports = {
	neonime,
	otakudesu
}