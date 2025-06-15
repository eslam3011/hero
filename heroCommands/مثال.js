import fs from 'fs';
const responsible = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const ad = responsible.ADMINBOT;
export default {
  keywords: ['انا'],
  age: 17,
  Developer: 'khir',
  name: 'khir salh',
  onStart: async function ({api,event,args,  convertTime,defaultStderrClearLine,enableStderrClearLine,getExtFromAttachmentType,getExtFromMimeType,getExtFromUrl,getPrefix,getTime,jsonStringifyColor,message,randomString,randomNumber,removeHomeDir,splitPage,translateAPI,downloadFile,findUid,getStreamsFromAttachment,translate,shortenURL,getStreamFromURL,}) 
{
  
  if (event.senderID === ad){
    function output(msg) {
			if (typeof msg == "number" || typeof msg == "boolean" || typeof msg == "function")
				msg = msg.toString();
			else if (msg instanceof Map) {
				let text = `Map(${msg.size}) `;
				text += JSON.stringify(mapToObj(msg), null, 2);
				msg = text;
			}
			else if (typeof msg == "object")
				msg = JSON.stringify(msg, null, 2);
			else if (typeof msg == "undefined")
				msg = "undefined";

			message.reply(msg);
		}
		function out(msg) {
			output(msg);
		}
		function mapToObj(map) {
			const obj = {};
			map.forEach(function (v, k) {
				obj[k] = v;
			});
			return obj;
		}
		const cmd = `
		(async () => {
			try {
				${args.join(" ")}
			}
			catch(err) {
				log.err("eval command", err);
				message.send(
					"${getLang("error")}\\n" +
					(err.stack ?
						removeHomeDir(err.stack) :
						removeHomeDir(JSON.stringify(err, null, 2))
					)
				);
			}
		})()`;
		eval(cmd);
  }
  else {
    
  }
  
  },};
