export default {
  keywords: ['اسمي'],
  age: 17,
  Developer: 'khir',
  name: 'khir salh',

  onStart: async function ({
    api,
    event,
    message,
  }) {

    
    const userID = event.senderID;

    api.getUserInfo(userID, (err, info) => {
      if (err) {
        console.error("❌ خطأ أثناء جلب الاسم:", err);
        return message.reply("حدث خطأ أثناء جلب اسمك.");
      }

      const name = info[userID]?.name || "غير معروف";
      message.reply(`👤 اسمك هو: ${name}`);
    });


    
  },
};