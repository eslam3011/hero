const fs = require("fs-extra");
const {
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
  translate,
  shortenURL,
getStreamFromURL
} = require('./modules');
const { gradientText } = require('./style')

gradientText() 



const login = require("fb-chat-api-temp");
const path = require('path');
const readline = require('readline');
const heroCommands = path.join(__dirname, 'heroCommands')
let commands = []
const express = require('express');
const app = express();
const port = 3000; // يمكنك تغيير رقم المنفذ إذا كان مستخدمًا

app.get('/', (req, res) => {
  res.send(`<body style = "box-shadow: 0 0 10px 20px rgba(255, 0, 0, 0.5); 
background:black;
border-radius: 25px; 
"> 

<center>
  <div style = "
  height:100%;
  width: 80%; 
  border: 1px solid white ;
  background:white;
  border-radius: 25px; 
  box-shadow: 0 0 10px 10px rgba(255, 255, 255, 0.5); 

 ">
  <div style = "font-size: 90px;
background: linear-gradient(black,blue);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
">
  khir salh 
  </div>
    
  <br>
    <br>
      <br>
      <h2 style ="font-size:45px;">
      the name : khir salh
      <br>
        <br>  <br>
      developer: ملك الجحيم 
        <br>  <br>  
      the age: 17
        <br>  <br>  
      Facebook :https://www.facebook.com/profile.php?id=100065172561645
        <br>  <br>  
      WhatsApp :+201119558517
      </h2>
      </div>
  </center>
  </body>`);
});


process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Handle the error gracefully or perform any necessary cleanup
});

function loadCommands() {
  fs.readdir(heroCommands, (err, files) => {
    if (err) {
      console.error(err); // log the error
    } else {
      files.forEach(file => {
        if (path.extname(file) === '.js') { // check if the file is a js file
          try {
            const command = require(path.join(heroCommands, file)); // import the module
            commands.push(command); // push it to the array
  
          console.log(`\x1b[32m[✓] ${commands.length} command loaded succesfully [∆]\x1b[0m`)

          } catch (err) {
            console.error(err); // log the error
          }
        }
      });
    }
  });
}
loadCommands()


login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);

    api.setOptions({listenEvents: true});

    var listenEmitter = api.listen((err, event) => {
        if(err) return console.error(err);

        switch (event.type) {
            case "message":
               if(event.body){
                 try{
                   
                   const word = event.body.split(" ")[0]
                   const args = event.body.split(" ").slice(1)
                   commands.forEach((command)=>{
                   if (command.keywords.includes(word)){
command.onStart({
  api: api,
  event: event,
  args: args,
  message: message(api, event),
  convertTime: convertTime,
  defaultStderrClearLine: defaultStderrClearLine,
  enableStderrClearLine: enableStderrClearLine,
  getExtFromAttachmentType: getExtFromAttachmentType,
  getExtFromMimeType: getExtFromMimeType,
  getExtFromUrl: getExtFromUrl,
  getPrefix: getPrefix,
  getTime: getTime,
  jsonStringifyColor: jsonStringifyColor,
  randomString: randomString,
  randomNumber: randomNumber,
  removeHomeDir: removeHomeDir,
  splitPage: splitPage,
  translateAPI: translateAPI,
  downloadFile: downloadFile,
  findUid: findUid,
  getStreamsFromAttachment: getStreamsFromAttachment,
  translate: translate,
  shortenURL: shortenURL,
  getStreamFromURL:getStreamFromURL
});




  
                   }
                 })
                 }catch (err){
                console.error(err)
                 }
               }
                break;
            case "event":
                console.log(event);
                break;
        }
    });
});

app.listen(port, () => {
  
});