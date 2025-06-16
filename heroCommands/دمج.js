import axios from "axios";

export default {
  keywords: ['دمج'],
  name: "دمج إيموجيين",
  age: 17,
  Developer: "khir",
  onStart: async function ({ message, args }) {
    const emoji1 = args[0];
    const emoji2 = args[1];
    const size = 256; // حجم الصورة

    if (!emoji1 || !emoji2) {
      return message.reply("❌ يجب إدخال إيموجيين مفصولين بمسافة.\nمثال: دمج 😍 🫡");
    }

    try {
      const imageUrl = `https://emojik.vercel.app/s/${emoji1}_${emoji2}?size=${size}`;

      const { data: imageStream } = await axios.get(imageUrl, {
        responseType: "stream"
      });

      imageStream.path = `emojimix_${Date.now()}.png`;

      await message.reply({
        body: `✅ تم دمج ${emoji1} و ${emoji2} بنجاح`,
        attachment: imageStream
      });

    } catch (err) {
      console.error(err);
      return message.reply(`❌ حدث خطأ أثناء محاولة دمج ${emoji1} مع ${emoji2}`);
    }
  }
};