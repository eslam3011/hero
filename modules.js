import axios from "axios";
import fs from "fs-extra";
import path from "path";
import qs from "qs";
import moment from "moment-timezone";
import mimeDB from "mime-db";
import _ from "lodash";
import { google } from "googleapis";

const word = [
	'A', 'Á', 'À', 'Ả', 'Ã', 'Ạ', 'a', 'á', 'à', 'ả', 'ã', 'ạ',
	'Ă', 'Ắ', 'Ằ', 'Ẳ', 'Ẵ', 'Ặ', 'ă', 'ắ', 'ằ', 'ẳ', 'ẵ', 'ặ',
	'Â', 'Ấ', 'Ầ', 'Ẩ', 'Ẫ', 'Ậ', 'â', 'ấ', 'ầ', 'ẩ', 'ẫ', 'ậ',
	'B', 'b',
	'C', 'c',
	'D', 'Đ', 'd', 'đ',
	'E', 'É', 'È', 'Ẻ', 'Ẽ', 'Ẹ', 'e', 'é', 'è', 'ẻ', 'ẽ', 'ẹ',
	'Ê', 'Ế', 'Ề', 'Ể', 'Ễ', 'Ệ', 'ê', 'ế', 'ề', 'ể', 'ễ', 'ệ',
	'F', 'f',
	'G', 'g',
	'H', 'h',
	'I', 'Í', 'Ì', 'Ỉ', 'Ĩ', 'Ị', 'i', 'í', 'ì', 'ỉ', 'ĩ', 'ị',
	'J', 'j',
	'K', 'k',
	'L', 'l',
	'M', 'm',
	'N', 'n',
	'O', 'Ó', 'Ò', 'Ỏ', 'Õ', 'Ọ', 'o', 'ó', 'ò', 'ỏ', 'õ', 'ọ',
	'Ô', 'Ố', 'Ồ', 'Ổ', 'Ỗ', 'Ộ', 'ô', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ',
	'Ơ', 'Ớ', 'Ờ', 'Ở', 'Ỡ', 'Ợ', 'ơ', 'ớ', 'ờ', 'ở', 'ỡ', 'ợ',
	'P', 'p',
	'Q', 'q',
	'R', 'r',
	'S', 's',
	'T', 't',
	'U', 'Ú', 'Ù', 'Ủ', 'Ũ', 'Ụ', 'u', 'ú', 'ù', 'ủ', 'ũ', 'ụ',
	'Ư', 'Ứ', 'Ừ', 'Ử', 'Ữ', 'Ự', 'ư', 'ứ', 'ừ', 'ử', 'ữ', 'ự',
	'V', 'v',
	'W', 'w',
	'X', 'x',
	'Y', 'Ý', 'Ỳ', 'Ỷ', 'Ỹ', 'Ỵ', 'y', 'ý', 'ỳ', 'ỷ', 'ỹ', 'ỵ',
	'Z', 'z',
	' '
];

function lengthWhiteSpacesEndLine(text) {
	let length = 0;
	for (let i = text.length - 1; i >= 0; i--) {
		if (text[i] == ' ')
			length++;
		else
			break;
	}
	return length;
}

function lengthWhiteSpacesStartLine(text) {
	let length = 0;
	for (let i = 0; i < text.length; i++) {
		if (text[i] == ' ')
			length++;
		else
			break;
	}
	return length;
}

function setErrorUptime() {
	global.statusAccountBot = 'block spam';
	global.responseUptimeCurrent = global.responseUptimeError;
}
const defaultStderrClearLine = process.stderr.clearLine;


function convertTime(miliSeconds, replaceSeconds = "s", replaceMinutes = "m", replaceHours = "h", replaceDays = "d", replaceMonths = "M", replaceYears = "y", notShowZero = false) {
	if (typeof replaceSeconds == 'boolean') {
		notShowZero = replaceSeconds;
		replaceSeconds = "s";
	}
	const second = Math.floor(miliSeconds / 1000 % 60);
	const minute = Math.floor(miliSeconds / 1000 / 60 % 60);
	const hour = Math.floor(miliSeconds / 1000 / 60 / 60 % 24);
	const day = Math.floor(miliSeconds / 1000 / 60 / 60 / 24 % 30);
	const month = Math.floor(miliSeconds / 1000 / 60 / 60 / 24 / 30 % 12);
	const year = Math.floor(miliSeconds / 1000 / 60 / 60 / 24 / 30 / 12);
	let formattedDate = '';

	const dateParts = [
		{ value: year, replace: replaceYears },
		{ value: month, replace: replaceMonths },
		{ value: day, replace: replaceDays },
		{ value: hour, replace: replaceHours },
		{ value: minute, replace: replaceMinutes },
		{ value: second, replace: replaceSeconds }
	];

	for (let i = 0; i < dateParts.length; i++) {
		const datePart = dateParts[i];
		if (datePart.value)
			formattedDate += datePart.value + datePart.replace;
		else if (formattedDate != '')
			formattedDate += '00' + datePart.replace;
		else if (i == dateParts.length - 1)
			formattedDate += '0' + datePart.replace;
	}

	if (formattedDate == '')
		formattedDate = '0' + replaceSeconds;

	if (notShowZero)
		formattedDate = formattedDate.replace(/00\w+/g, '');
		
	return formattedDate;
}


function enableStderrClearLine(isEnable = true) {
	process.stderr.clearLine = isEnable ? defaultStderrClearLine : () => { };
}

function getExtFromAttachmentType(type) {
	switch (type) {
		case "photo":
			return 'png';
		case "animated_image":
			return "gif";
		case "video":
			return "mp4";
		case "audio":
			return "mp3";
		default:
			return "txt";
	}
}

function getExtFromMimeType(mimeType = "") {
	return mimeDB[mimeType] ? (mimeDB[mimeType].extensions || [])[0] || "unknow" : "unknow";
}

function getExtFromUrl(url = "") {
	if (!url || typeof url !== "string")
		throw new Error('The first argument (url) must be a string');
	const reg = /(?<=https:\/\/cdn.fbsbx.com\/v\/.*?\/|https:\/\/video.xx.fbcdn.net\/v\/.*?\/|https:\/\/scontent.xx.fbcdn.net\/v\/.*?\/).*?(\/|\?)/g;
	const fileName = url.match(reg)[0].slice(0, -1);
	return fileName.slice(fileName.lastIndexOf(".") + 1);
}

function getPrefix(threadID) {
	if (!threadID || isNaN(threadID))
		throw new Error('The first argument (threadID) must be a number');
	threadID = String(threadID);
	let prefix = global.GoatBot.config.prefix;
	const threadData = global.db.allThreadData.find(t => t.threadID == threadID);
	threadData ? prefix = threadData.data.prefix || prefix : "";
	return prefix;
}

function getTime(timestamps, format) {
	if (!format && typeof timestamps == 'string') {
		format = timestamps;
		timestamps = undefined;
	}
	return moment(timestamps).tz(global.config?.timeZone || 'Africa/Cairo').format(format);
}

function jsonStringifyColor(obj, filter, indent, level) {
	// source: https://www.npmjs.com/package/node-json-color-stringify
	indent = indent || 0;
	level = level || 0;
	let output = '';

	// تعريف ألوان بسيطة
	const colors = {
		green: (text) => `\x1b[32m${text}\x1b[0m`,
		yellow: (text) => `\x1b[33m${text}\x1b[0m`,
		gray: (text) => `\x1b[90m${text}\x1b[0m`
	};

	if (typeof obj === 'string')
		output += colors.green(`"${obj}"`);
	else if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null)
		output += colors.yellow(obj);
	else if (obj === undefined)
		output += colors.gray('undefined');
	else if (obj !== undefined && typeof obj !== 'function')
		if (!Array.isArray(obj)) {
			if (Object.keys(obj).length === 0)
				output += '{}';
			else {
				output += colors.gray('{\n');
				Object.keys(obj).forEach(key => {
					let value = obj[key];

					if (filter) {
						if (typeof filter === 'function')
							value = filter(key, value);
						else if (typeof filter === 'object' && filter.length !== undefined)
							if (filter.indexOf(key) < 0)
								return;
					}

					// if (value === undefined)
					// 	return;
					if (!isNaN(key[0]) || key.match(/[^a-zA-Z0-9_]/))
						key = colors.green(JSON.stringify(key));

					output += ' '.repeat(indent + level * indent) + `${key}:${indent ? ' ' : ''}`;
					output += jsonStringifyColor(value, filter, indent, level + 1) + ',\n';
				});

				output = output.replace(/,\n$/, '\n');
				output += ' '.repeat(level * indent) + colors.gray('}');
			}
		}
		else {
			if (obj.length === 0)
				output += '[]';
			else {
				output += colors.gray('[\n');
				obj.forEach(subObj => {
					output += ' '.repeat(indent + level * indent) + jsonStringifyColor(subObj, filter, indent, level + 1) + ',\n';
				});

				output = output.replace(/,\n$/, '\n');
				output += ' '.repeat(level * indent) + colors.gray(']');
			}
		}
	else if (typeof obj === 'function')
		output += colors.green(obj.toString());

	output = output.replace(/,$/gm, colors.gray(','));
	if (indent === 0)
		return output.replace(/\n/g, '');

	return output;
}

function message(api, event) {
	async function sendMessageError(err) {
		if (typeof err === "object" && !err.stack)
			err = removeHomeDir(JSON.stringify(err, null, 2));
		else
			err = removeHomeDir(`${err.name || err.error}: ${err.message}`);
		return await api.sendMessage(`❌ حدث خطأ: ${err}`, event.threadID, event.messageID);
	}
	return {
		send: async (form, callback) => {
			try {
				global.statusAccountBot = 'good';
				return await api.sendMessage(form, event.threadID, callback);
			}
			catch (err) {
				if (JSON.stringify(err).includes('spam')) {
					setErrorUptime();
					throw err;
				}
			}
		},
		reply: async (form, callback) => {
			try {
				global.statusAccountBot = 'good';
				return await api.sendMessage(form, event.threadID, callback, event.messageID);
			}
			catch (err) {
				if (JSON.stringify(err).includes('spam')) {
					setErrorUptime();
					throw err;
				}
			}
		},
		unsend: async (messageID, callback) => await api.unsendMessage(messageID, callback),
		reaction: async (emoji, messageID, callback) => {
			try {
				global.statusAccountBot = 'good';
				return await api.setMessageReaction(emoji, messageID, callback, true);
			}
			catch (err) {
				if (JSON.stringify(err).includes('spam')) {
					setErrorUptime();
					throw err;
				}
			}
		},
		err: async (err) => await sendMessageError(err),
		error: async (err) => await sendMessageError(err)
	};
}

function randomString(max, onlyOnce = false, possible) {
	if (!max || isNaN(max))
		max = 10;
	let text = "";
	possible = possible || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < max; i++) {
		let random = Math.floor(Math.random() * possible.length);
		if (onlyOnce) {
			while (text.includes(possible[random]))
				random = Math.floor(Math.random() * possible.length);
		}
		text += possible[random];
	}
	return text;
}

function randomNumber(min, max) {
	if (!max) {
		max = min;
		min = 0;
	}
	if (min == null || min == undefined || isNaN(min))
		throw new Error('The first argument (min) must be a number');
	if (max == null || max == undefined || isNaN(max))
		throw new Error('The second argument (max) must be a number');
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function removeHomeDir(fullPath) {
	if (!fullPath || typeof fullPath !== "string")
		throw new Error('The first argument (fullPath) must be a string');
	while (fullPath.includes(process.cwd()))
		fullPath = fullPath.replace(process.cwd(), "");
	return fullPath;
}

function splitPage(arr, limit) {
	const allPage = _.chunk(arr, limit);
	return {
		totalPage: allPage.length,
		allPage
	};
}

function translateAPI(text, lang) {
	return new Promise((resolve, reject) => {
		axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`)
			.then(res => {
				resolve(res.data[0][0][0]);
			})
			.catch(err => {
				reject(err);
			});
	});
}

async function downloadFile(url = "", path = "") {
	if (!url || typeof url !== "string")
		throw new Error(`The first argument (url) must be a string`);
	if (!path || typeof path !== "string")
		throw new Error(`The second argument (path) must be a string`);
	const getFile = await axios.get(url, {
		responseType: "arraybuffer"
	});
	fs.writeFileSync(path, Buffer.from(getFile.data));
	return path;
}

async function findUid(link) {
	const response = await axios.post("https://id.traodoisub.com/api.php", qs.stringify({ link }));
	const uid = response.data.id;
	if (!uid) {
		const err = new Error(response.data.error);
		for (const key in response.data)
			err[key] = response.data[key];
		if (err.error == "Vui lòng thao tác chậm lại") {
			err.name = "SlowDown";
			err.error = "Please wait a few seconds";
		}
		else if (err.error == "Vui lòng nhập đúng link facebook") {
			err.name = "InvalidLink";
			err.error = "Please enter the correct facebook link";
		}
		else if (err.error == "Không thể lấy được dữ liệu vui lòng báo admin!!!") {
			err.name = "CannotGetData";
			err.error = "Unable to get data, please report to admin!!!";
		}
		else if (err.error == "Link không tồn tại hoặc chưa để chế độ công khai!") {
			err.name = "LinkNotExist";
			err.error = "Link does not exist or is not set to public!";
		}
		throw err;
	}
	return uid;
}

async function getStreamsFromAttachment(attachments) {
	const streams = [];
	for (const attachment of attachments) {
		const url = attachment.url;
		const ext = utils.getExtFromUrl(url);
		const fileName = `${utils.randomString(10)}.${ext}`;
		streams.push({
			pending: axios({
				url,
				method: "GET",
				responseType: "stream"
			}),
			fileName
		});
	}
	for (let i = 0; i < streams.length; i++) {
		const stream = await streams[i].pending;
		stream.data.path = streams[i].fileName;
		streams[i] = stream.data;
	}
	return streams;
}

async function getStreamFromURL(url = "", pathName = "", options = {}) {
	if (!options && typeof pathName === "object") {
		options = pathName;
		pathName = "";
	}
	try {
		if (!url || typeof url !== "string")
			throw new Error(`The first argument (url) must be a string`);
		const response = await axios({
			url,
			method: "GET",
			responseType: "stream",
			...options
		});
		if (!pathName)
			pathName = utils.randomString(10) + (response.headers["content-type"] ? '.' + utils.getExtFromMimeType(response.headers["content-type"]) : ".noext");
		response.data.path = pathName;
		return response.data;
	}
	catch (err) {
		throw err;
	}
}

async function translate(text, lang) {
	if (typeof text !== "string")
		throw new Error(`The first argument (text) must be a string`);
	if (!lang)
		lang = 'en';
	if (typeof lang !== "string")
		throw new Error(`The second argument (lang) must be a string`);
	const wordTranslate = [''];
	const wordNoTranslate = [''];
	const wordTransAfter = [];
	let lastPosition = 'wordTranslate';

	if (word.indexOf(text.charAt(0)) == -1)
		wordTranslate.push('');
	else
		wordNoTranslate.splice(0, 1);

	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		if (word.indexOf(char) !== -1) { // is word
			const lengWordNoTranslate = wordNoTranslate.length - 1;
			if (wordNoTranslate[lengWordNoTranslate] && wordNoTranslate[lengWordNoTranslate].includes('{') && !wordNoTranslate[lengWordNoTranslate].includes('}')) {
				wordNoTranslate[lengWordNoTranslate] += char;
				continue;
			}
			const lengWordTranslate = wordTranslate.length - 1;
			if (lastPosition == 'wordTranslate') {
				wordTranslate[lengWordTranslate] += char;
			}
			else {
				wordTranslate.push(char);
				lastPosition = 'wordTranslate';
			}
		}
		else { // is no word
			const lengWordNoTranslate = wordNoTranslate.length - 1;
			const twoWordLast = wordNoTranslate[lengWordNoTranslate]?.slice(-2) || '';
			if (lastPosition == 'wordNoTranslate') {
				if (twoWordLast == '}}') {
					wordTranslate.push("");
					wordNoTranslate.push(char);
				}
				else
					wordNoTranslate[lengWordNoTranslate] += char;
			}
			else {
				wordNoTranslate.push(char);
				lastPosition = 'wordNoTranslate';
			}
		}
	}

	for (let i = 0; i < wordTranslate.length; i++) {
		const text = wordTranslate[i];
		if (!text.match(/[^\s]+/))
			wordTransAfter.push(text);
		else
			wordTransAfter.push(utils.translateAPI(text, lang));
	}

	let output = '';

	for (let i = 0; i < wordTransAfter.length; i++) {
		let wordTrans = (await wordTransAfter[i]);
		if (wordTrans.trim().length === 0) {
			output += wordTrans;
			if (wordNoTranslate[i] != undefined)
				output += wordNoTranslate[i];
			continue;
		}

		wordTrans = wordTrans.trim();
		const numberStartSpace = lengthWhiteSpacesStartLine(wordTranslate[i]);
		const numberEndSpace = lengthWhiteSpacesEndLine(wordTranslate[i]);

		wordTrans = ' '.repeat(numberStartSpace) + wordTrans.trim() + ' '.repeat(numberEndSpace);

		output += wordTrans;
		if (wordNoTranslate[i] != undefined)
			output += wordNoTranslate[i];
	}
	return output;
}

async function shortenURL(url) {
	try {
		const result = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
		return result.data;
	}
	catch (err) {
		throw new Error('Error when shortening URL');
	}
}


export {
	convertTime,
	defaultStderrClearLine,
	enableStderrClearLine,
	getExtFromAttachmentType,
	getExtFromMimeType,
	getExtFromUrl,
	getPrefix,
	getTime,
	jsonStringifyColor,
	message,
	randomString,
	randomNumber,
	removeHomeDir,
	splitPage,
	translateAPI,
	downloadFile,
	findUid,
	getStreamsFromAttachment,
	getStreamFromURL,
	translate,
	shortenURL
};