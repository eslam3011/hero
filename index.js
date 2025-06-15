import fs from "fs-extra";
import {
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
} from './modules.js';
import { gradientText } from './style.js';

// تشغيل نص متدرج الألوان
gradientText();

import login from "priyanshu-fca";
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// إعدادات Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// مجلد الأوامر
const heroCommands = path.join(__dirname, 'heroCommands');
let commands = [];

// صفحة الويب الرئيسية
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hero Bot 2025</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Arial', sans-serif;
          color: white;
        }
        .container {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          border: 1px solid rgba(255, 255, 255, 0.18);
          max-width: 600px;
          width: 90%;
        }
        .title {
          font-size: 3rem;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient 3s ease infinite;
          margin-bottom: 30px;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .info {
          font-size: 1.2rem;
          line-height: 1.8;
          margin-bottom: 15px;
        }
        .year {
          font-size: 2rem;
          color: #ffd700;
          font-weight: bold;
          margin-top: 20px;
        }
        .links {
          margin-top: 30px;
        }
        .link {
          display: inline-block;
          margin: 10px;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          text-decoration: none;
          color: white;
          transition: all 0.3s ease;
        }
        .link:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="title">Hero Bot</h1>
        <div class="info">الاسم: خير صالح</div>
        <div class="info">المطور: ملك الجحيم</div>
        <div class="info">العمر: 17</div>
        <div class="info">البلد: مصر</div>
        <div class="year">2025 ✨</div>
        <div class="links">
          <a href="https://www.facebook.com/profile.php?id=100065172561645" class="link">Facebook</a>
          <a href="https://wa.me/201119558517" class="link">WhatsApp</a>
        </div>
      </div>
    </body>
    </html>
  `);
});

// معالجة الأخطاء العامة
process.on('uncaughtException', (err) => {
  console.error('🚨 Uncaught Exception:', err.message);
  console.error('Stack:', err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
});

// تحميل الأوامر
async function loadCommands() {
  try {
    const files = await fs.readdir(heroCommands);
    commands = [];

    for (const file of files) {
      if (path.extname(file) === '.js') {
        try {
          // استخدام dynamic import مع timestamp لتجنب الكاش
          const commandPath = new URL(path.join(heroCommands, file), import.meta.url).href + '?t=' + Date.now();
          const command = await import(commandPath);
          commands.push(command.default || command);
          console.log(`✅ [${commands.length}] تم تحميل الأمر: ${file}`);
        } catch (err) {
          console.error(`❌ خطأ في تحميل الأمر ${file}:`, err.message);
        }
      }
    }

    console.log(`🎉 تم تحميل ${commands.length} أمر بنجاح!`);
  } catch (err) {
    console.error('❌ خطأ في قراءة مجلد الأوامر:', err.message);
  }
}

// تشغيل البوت
async function startBot() {
  try {
    console.log('🚀 بدء تشغيل Hero Bot 2025...');

    // تحميل الأوامر
    await loadCommands();

    // قراءة حالة التطبيق
    const appState = JSON.parse(await fs.readFile('appstate.json', 'utf8'));

    // تسجيل الدخول
    login({ appState }, async (err, api) => {
      if (err) {
        console.error('❌ خطأ في تسجيل الدخول:', err);
        return;
      }

      console.log('✅ تم تسجيل الدخول بنجاح!');

      // إعدادات API
      api.setOptions({
        listenEvents: true,
        logLevel: "silent",
        updatePresence: true,
        forceLogin: true
      });

      // الاستماع للرسائل
      api.listenMqtt(async (err, event) => {
        if (err) {
          console.error('❌ خطأ في الاستماع:', err);
          return;
        }

        try {
          await handleEvent(api, event);
        } catch (error) {
          console.error('❌ خطأ في معالجة الحدث:', error);
        }
      });

      console.log('👂 البوت يستمع للرسائل...');
    });

  } catch (error) {
    console.error('❌ خطأ في بدء تشغيل البوت:', error);
  }
}

// معالجة الأحداث
async function handleEvent(api, event) {
  switch (event.type) {
    case "message":
      if (event.body && typeof event.body === 'string') {
        const word = event.body.trim().split(" ")[0];
        const args = event.body.trim().split(" ").slice(1);

        // البحث عن الأمر المناسب
        const matchedCommand = commands.find(command => 
          command.keywords && command.keywords.includes(word)
        );

        if (matchedCommand) {
          try {
            const cmd = matchedCommand.default || matchedCommand;
            await cmd.onStart({
              api: api,
              event: event,
              args: args,
              message: message(api, event),
              convertTime,
              defaultStderrClearLine,
              enableStderrClearLine,
              getExtFromAttachmentType,
              getExtFromMimeType,
              getExtFromUrl,
              getPrefix,
              getTime,
              jsonStringifyColor,
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
            });
          } catch (error) {
            console.error(`❌ خطأ في تنفيذ الأمر ${word}:`, error);
            await message(api, event).err(error);
          }
        }
      }
      break;

    case "event":
      // معالجة أحداث المجموعة
      if (event.logMessageType) {
        console.log(`📝 حدث في المجموعة: ${event.logMessageType}`);
      }
      break;

    default:
      // أحداث أخرى
      break;
  }
}

// بدء الخادم
app.listen(port, '0.0.0.0', () => {
  console.log(`🌐 الخادم يعمل على المنفذ: ${port}`);
  console.log(`🔗 الرابط: http://localhost:${port}`);
});

// بدء تشغيل البوت
startBot();

// إعادة تحميل الأوامر كل 5 دقائق
setInterval(async () => {
  console.log('🔄 إعادة تحميل الأوامر...');
  await loadCommands();
}, 5 * 60 * 1000);