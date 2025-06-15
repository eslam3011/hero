import https from 'https';

export default {
  keywords: ['زكسل'],
  age: 17,
  Developer: 'khir',
  name: 'khir salh',
  onStart: async function ({ api, event, args, message }) {
    const inputText = args.join(' ');

    if (inputText !== '') {
      const encodedInput = encodeURIComponent(inputText);
      const url = `https://www.smfahim.xyz/chatfun?question=${encodedInput}`;

      https.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (parsed.gptfun) {
              message.reply(parsed.gptfun);
            } else {
              message.reply("لم أتمكن من فهم الرد من الخادم.");
            }
          } catch (e) {
            console.error("خطأ في تحليل الرد:", e.message);
            message.reply("حدث خطأ أثناء قراءة الرد.");
          }
        });
      }).on('error', (error) => {
        console.error(`حدث خطأ في الطلب: ${error.message}`);
        message.reply("حدث خطأ في الاتصال بالخادم.");
      });
    } else {
      message.reply("زكسل تحت خدمتك، اسأل أي سؤال.");
    }
  },
};