import fs from 'fs';
import path from 'path';

export default {
  keywords: ['ملف'],
  age: 17,
  Developer: 'khir',
  name: 'khir salh',

  onStart: async function ({ args, message }) {
    const command = args[0];
    const fileName = args[1];

    if (!command) {
      return message.reply("❌ من فضلك اختر الأمر: ارسل / اكتب / حذف / السري");
    }

    if (command === 'ارسل') {
      if (!fileName) return message.reply("❌ حدد اسم الملف لإرساله");
      const filePath = path.join(__dirname, `${fileName}.js`);

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return message.reply("❌ لم يتم العثور على الملف أو حدث خطأ.");
        message.reply(data);
      });

    } else if (command === 'اكتب') {
      if (!fileName) return message.reply("❌ حدد اسم الملف للكتابة فيه");
      const script = args.slice(2).join(' ');
      if (!script) return message.reply("❌ لا يوجد محتوى لكتابته");

      const filePath = path.join(__dirname, `${fileName}.js`);

      fs.writeFile(filePath, script, (err) => {
        if (err) return message.reply("❌ حدث خطأ أثناء الحفظ");
        message.reply("✅ تم حفظ التغييرات. أعد تشغيل البوت لتطبيقها.");
      });

    } else if (command === 'السري') {
      const filePath = path.join(__dirname, '..', '..', 'account.txt');
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return message.reply("❌ لا يمكن قراءة الملف السري.");
        message.reply(data);
      });

    } else if (command === 'حذف') {
      if (!fileName) return message.reply("❌ حدد اسم الملف الذي تريد حذفه");
      const filePath = path.join(__dirname, '..', `${fileName}.js`);

      fs.unlink(filePath, (err) => {
        if (err) return message.reply("❌ فشل في حذف الملف أو الملف غير موجود.");
        message.reply("🗑️ تم حذف الملف بنجاح.");
      });

    } else {
      return message.reply("❌ الأمر غير معروف. استخدم: ارسل / اكتب / حذف / السري");
    }
  }
};