const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
const token = '1876944874:AAHVFZxw2hlQIYDD_SCIuURkvxkgK8HRknY';
const bot = new TelegramBot(token, {polling: true});

bot.onText(/^\/start/, function(msg){
	var chatId = msg.chat.id;
	var username = msg.from.username;

	bot.sendMessage(chatId, "Hola, " + username + " soy tu papi translate.");
});

const translater = (msg) => {
	const body = new URLSearchParams();
	body.append('q', msg);
	body.append('source', 'es');
	body.append('target', 'en');

	return fetch("https://google-translate1.p.rapidapi.com/language/translate/v2", {
		"method": "POST",
		"headers": {
			"content-type": "application/x-www-form-urlencoded",
			"accept-encoding": "application/gzip",
			"x-rapidapi-key": "6019499ec0mshae562dea2972ed2p174093jsnab99910b2076",
			"x-rapidapi-host": "google-translate1.p.rapidapi.com"
		},
		"body": body.toString()
	})
	.then(res => res.json())
	.then(response => {
		return response.data.translations[0].translatedText;
	})
	.catch(err => {
		console.error(err);
	});
}

bot.on('message', async function(msg){
	var chatId = msg.chat.id;
	const translation = await translater(msg.text);

	bot.sendMessage(chatId, translation);
});