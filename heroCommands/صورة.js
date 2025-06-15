
import axios from 'axios';

export default {
  keywords: ['صورة'],
  age: 17,
  Developer: 'khir',
  name: 'khir salh',
  onStart: async function ({api,event,args,
  convertTime,defaultStderrClearLine,
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
getStreamFromURL,
  }) {

const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${args.join(" ")}`;

axios.get(apiUrl)
  .then(async (response) => {
    const translation = response.data[0][0][0];

    const axiosInstance = axios.create();
    const numberOfResponses = 5;
    const requests = [];

    for (let i = 0; i < numberOfResponses; i++) {
      const url = `https://api-dien.kira1011.repl.co/pinterest?search=${translation}`;

      requests.push(
        axiosInstance.get(url)
          .then(async (response) => {
            console.log('رمز الاستجابة:', response.status);
            let img = response.data.data[i];
            
            message.send({
              attachment: await getStreamFromURL(img)
            });
          })
          .catch((error) => {
            console.error('حدث خطأ:', error.message); 
          })
      );
    }

    await Promise.all(requests);

  })
  .catch((error) => {
    console.error('حدث خطأ أثناء جلب الترجمة:', error);
  });
  
  },
};
