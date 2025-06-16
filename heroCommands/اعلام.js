export default {
  keywords: ['اعلام'],
  age: 17,
  Developer: 'khir',
  name: 'khir salh',
  onStart: async function ({ api, event, message }) {
    const flags = [
      { question: "مصر", answer: "🇪🇬" },
      { question: "السعودية", answer: "🇸🇦" },
      { question: "الإمارات", answer: "🇦🇪" },
      { question: "الكويت", answer: "🇰🇼" },
      { question: "قطر", answer: "🇶🇦" },
      { question: "البحرين", answer: "🇧🇭" },
      { question: "عمان", answer: "🇴🇲" },
      { question: "الأردن", answer: "🇯🇴" },
      { question: "لبنان", answer: "🇱🇧" },
      { question: "سوريا", answer: "🇸🇾" },
      { question: "العراق", answer: "🇮🇶" },
      { question: "اليمن", answer: "🇾🇪" },
      { question: "المغرب", answer: "🇲🇦" },
      { question: "الجزائر", answer: "🇩🇿" },
      { question: "تونس", answer: "🇹🇳" },
      { question: "ليبيا", answer: "🇱🇾" },
      { question: "السودان", answer: "🇸🇩" },
      { question: "فلسطين", answer: "🇵🇸" },
      { question: "فرنسا", answer: "🇫🇷" },
      { question: "إيطاليا", answer: "🇮🇹" },
      { question: "ألمانيا", answer: "🇩🇪" },
      { question: "إسبانيا", answer: "🇪🇸" },
      { question: "البرتغال", answer: "🇵🇹" },
      { question: "إنجلترا", answer: "🇬🇧" },
      { question: "هولندا", answer: "🇳🇱" },
      { question: "بلجيكا", answer: "🇧🇪" },
      { question: "سويسرا", answer: "🇨🇭" },
      { question: "النمسا", answer: "🇦🇹" },
      { question: "روسيا", answer: "🇷🇺" },
      { question: "الصين", answer: "🇨🇳" },
      { question: "اليابان", answer: "🇯🇵" },
      { question: "كوريا الجنوبية", answer: "🇰🇷" },
      { question: "الهند", answer: "🇮🇳" },
      { question: "باكستان", answer: "🇵🇰" },
      { question: "تركيا", answer: "🇹🇷" },
      { question: "أمريكا", answer: "🇺🇸" },
      { question: "كندا", answer: "🇨🇦" },
      { question: "أستراليا", answer: "🇦🇺" }
    ];

    if (!global.flagGame) global.flagGame = new Map();
    const threadID = event.threadID;

    if (global.flagGame.has(threadID)) {
      const existingGame = global.flagGame.get(threadID);
      if (typeof existingGame.stopListening === 'function') {
        try {
          existingGame.stopListening();
        } catch (e) {
          console.error("فشل في إنهاء اللعبة السابقة:", e);
        }
      }
      global.flagGame.delete(threadID);
    }

    const selected = flags[Math.floor(Math.random() * flags.length)];

    const game = {
      correctFlag: selected.answer,
      threadID,
      isActive: true,
      stopListening: null
    };

    global.flagGame.set(threadID, game);

    await message.reply(`🇨🇳 أرسل علم هذه الدولة: [ ${selected.question} ]\n🕹️ أول من يرسل العلم الصحيح يفوز!`);

    game.stopListening = api.listenMqtt((err, eventMsg) => {
      if (
        err || !eventMsg || eventMsg.type !== "message" ||
        !eventMsg.body || eventMsg.threadID !== threadID ||
        !game.isActive
      ) return;

      const userInput = eventMsg.body.trim();

      if (userInput === game.correctFlag) {
        api.getUserInfo(eventMsg.senderID, (err, info) => {
          const name = info?.[eventMsg.senderID]?.name || "لاعب مجهول";
          message.send(`🎉 مبروك! ${name} أرسل العلم الصحيح: ${game.correctFlag}`);
          game.isActive = false;

          if (typeof game.stopListening === 'function') {
            try { game.stopListening(); } catch (e) {}
          }

          global.flagGame.delete(threadID);
        });
      }
    });
  }
};