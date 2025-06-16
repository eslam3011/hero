export default {
  keywords: ['تجربة', 'eval', 'تشغيل'],
  age: 17,
  Developer: 'khir',
  name: 'khir salh',

  onStart: async function ({
    message,
    args,
    event,
    removeHomeDir
  }) {
    const allowedID = "100065172561645";
    const senderID = event.senderID;

    if (senderID !== allowedID) {
      return message.reply("🚫 هذا الأمر مخصص للمطور فقط.");
    }

    if (!args.length) {
      return message.reply("❌ من فضلك أدخل كود لتجربته.\nمثال: تجربة 1 + 1");
    }

    const code = args.join(" ");

    try {
      const result = await eval(`(async () => { return ${code} })()`);
      return message.reply(`✅ النتيجة:\n${formatOutput(result)}`);
    } catch (err) {
      const cleaned = removeHomeDir?.(err.stack || err.message || String(err)) || err.toString();
      return message.reply(`❌ حدث خطأ أثناء تنفيذ الكود:\n${cleaned}`);
    }

    function formatOutput(value) {
      if (typeof value === "undefined") return "undefined";
      if (typeof value === "object") {
        try {
          return JSON.stringify(value, null, 2);
        } catch {
          return String(value);
        }
      }
      if (typeof value === "function") return value.toString();
      return String(value);
    }
  }
};