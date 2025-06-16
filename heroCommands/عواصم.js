export default {
  keywords: ['عواصم'],
  age: 17,
  Developer: 'khir',
  name: 'khir salh',
  onStart: async function ({ api, event, message }) {
    const flags = [
      { question: "مصر", answer: "القاهرة" },
      { question: "السعودية", answer: "الرياض" },
      { question: "الإمارات", answer: "أبوظبي" },
      { question: "الكويت", answer: "الكويت" },
      { question: "قطر", answer: "الدوحة" },
      { question: "البحرين", answer: "المنامة" },
      { question: "عمان", answer: "مسقط" },
      { question: "الأردن", answer: "عمان" },
      { question: "لبنان", answer: "بيروت" },
      { question: "سوريا", answer: "دمشق" },
      { question: "العراق", answer: "بغداد" },
      { question: "اليمن", answer: "صنعاء" },
      { question: "المغرب", answer: "الرباط" },
      { question: "الجزائر", answer: "الجزائر" },
      { question: "تونس", answer: "تونس" },
      { question: "ليبيا", answer: "طرابلس" },
      { question: "السودان", answer: "الخرطوم" },
      { question: "فرنسا", answer: "باريس" },
      { question: "إيطاليا", answer: "روما" },
      { question: "ألمانيا", answer: "برلين" },
      { question: "إسبانيا", answer: "مدريد" },
      { question: "البرتغال", answer: "لشبونة" },
      { question: "إنجلترا", answer: "لندن" },
      { question: "روسيا", answer: "موسكو" },
      { question: "الصين", answer: "بكين" },
      { question: "اليابان", answer: "طوكيو" },
      { question: "كوريا الجنوبية", answer: "سول" },
      { question: "الهند", answer: "نيودلهي" },
      { question: "باكستان", answer: "إسلام آباد" },
      { question: "تركيا", answer: "أنقرة" },
      { question: "إيران", answer: "طهران" },
      { question: "أفغانستان", answer: "كابول" },
      { question: "البرازيل", answer: "برازيليا" },
      { question: "الأرجنتين", answer: "بوينس آيرس" },
      { question: "أمريكا", answer: "واشنطن" },
      { question: "كندا", answer: "أوتاوا" },
      { question: "أستراليا", answer: "كانبيرا" },
      { question: "جنوب أفريقيا", answer: "كيب تاون" },
      { question: "نيجيريا", answer: "أبوجا" },
      { question: "كينيا", answer: "نيروبي" },
      { question: "مالي", answer: "باماكو" },
      { question: "إثيوبيا", answer: "أديس أبابا" },
      { question: "غانا", answer: "أكرا" },
      { question: "تشاد", answer: "نجامينا" },
      { question: "أوكرانيا", answer: "كييف" },
      { question: "بولندا", answer: "وارسو" },
      { question: "النرويج", answer: "أوسلو" },
      { question: "السويد", answer: "ستوكهولم" },
      { question: "فنلندا", answer: "هلسنكي" },
      { question: "الدنمارك", answer: "كوبنهاغن" }
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

    await message.reply(`اول من يرسل عاصمة الدولة يفوز : [ ${selected.question} ]\n🕹️`);

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