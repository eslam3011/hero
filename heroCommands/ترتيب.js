export default {
  keywords: ['ترتيب'],
  age: 17,
  Developer: 'khir',
  name: 'khir salh',
  onStart: async function ({ api, event, args, message }) {
    const words = [
      "كمبيوتر", "مدرسة", "مستشفى", "مطعم", "مكتبة", "جامعة", "سيارة", "طائرة", "قطار", "باص",
      "كتاب", "قلم", "ورقة", "طاولة", "كرسي", "نافذة", "باب", "مفتاح", "هاتف", "ساعة",
      "شمس", "قمر", "نجمة", "سماء", "أرض", "بحر", "نهر", "جبل", "شجرة", "وردة",
      "طعام", "ماء", "خبز", "لحم", "سمك", "فاكهة", "خضار", "حليب", "عسل", "سكر",
      "أحمر", "أزرق", "أخضر", "أصفر", "أسود", "أبيض", "بنفسجي", "برتقالي", "وردي", "رمادي",
      "كبير", "صغير", "طويل", "قصير", "عريض", "ضيق", "سريع", "بطيء", "قوي", "ضعيف",
      "سعيد", "حزين", "غاضب", "خائف", "متعب", "نشيط", "هادئ", "متوتر", "محب", "كاره",
      "صباح", "مساء", "ليل", "نهار", "أمس", "اليوم", "غدا", "أسبوع", "شهر", "سنة",
      "بيت", "غرفة", "مطبخ", "حمام", "صالة", "شرفة", "حديقة", "سطح", "قبو", "مرآب",
      "طبيب", "معلم", "مهندس", "محامي", "طباخ", "خباز", "نجار", "كهربائي", "سباك", "بائع",
      "نار", "نور", "باب", "بيت", "ماء", "نهر", "بحر", "شمس", "قمر", "قلم",
      "ورق", "ملف", "درس", "كتب", "نوم", "نفس", "هوى", "قلب", "حجر", "ذهب",
      "فضة", "حديد", "نحاس", "وقت", "ليل", "صبح", "رمل", "ثلج", "ريح", "صيف",
      "شتا", "برد", "حرب", "سلم", "ملح", "دلو", "حبل", "خيط", "لعب", "طفل",
      "كيس", "طبق", "كوب", "موز", "تفاح", "عنق", "نمل", "ورد", "حوت", "ثوب"
    ];

    function shuffleWord(word) {
      const chars = word.split('');
      for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
      }
      return chars.join('');
    }

    if (!global.wordGames) global.wordGames = new Map();
    const threadID = event.threadID;

    if (global.wordGames.has(threadID)) {
      const existingGame = global.wordGames.get(threadID);
      if (typeof existingGame.stopListening === 'function') {
        try {
          existingGame.stopListening();
        } catch (e) {
          console.error("خطأ في إيقاف اللعبة السابقة:", e);
        }
      }
      global.wordGames.delete(threadID);
    }

    const getRandomWord = () => {
      const originalWord = words[Math.floor(Math.random() * words.length)];
      let shuffledWord = shuffleWord(originalWord);
      while (shuffledWord === originalWord) {
        shuffledWord = shuffleWord(originalWord);
      }
      return { original: originalWord, shuffled: shuffledWord };
    };

    const gameState = {
      currentWord: getRandomWord(),
      threadID,
      isActive: true,
      stopListening: null
    };

    global.wordGames.set(threadID, gameState);

    try {
      await message.reply(`🔤 رتب هذه الأحرف لتكوين كلمة صحيحة!\n\n🎯 الأحرف: ${gameState.currentWord.shuffled}\n\n💡 اكتب الكلمة مرتبة!`);

      gameState.stopListening = api.listenMqtt((err, incomingEvent) => {
        if (
          err || !incomingEvent || incomingEvent.type !== "message" ||
          !incomingEvent.body || incomingEvent.threadID !== threadID ||
          !gameState.isActive || !global.wordGames.has(threadID)
        ) return;

        try {
          const userMessage = incomingEvent.body.trim();
          const cleanUserMessage = userMessage.replace(/\s+/g, '');
          const cleanAnswer = gameState.currentWord.original.replace(/\s+/g, '');

          if (cleanUserMessage === cleanAnswer) {
            api.getUserInfo(incomingEvent.senderID, (err, info) => {
              const winnerName = info?.[incomingEvent.senderID]?.name || "لاعب مجهول";

              message.send(
                `🎉 مبروك! ${winnerName} كتب الكلمة الصحيحة: ${gameState.currentWord.original}\n\n💡 اكتب "ترتيب" للعب مرة أخرى!`
              ).then(() => {
                gameState.isActive = false;
                if (typeof gameState.stopListening === 'function') {
                  try {
                    gameState.stopListening();
                  } catch (e) {
                    console.error("خطأ في إيقاف الاستماع بعد الفوز:", e);
                  }
                }
                global.wordGames.delete(threadID);
              }).catch(e => console.error("خطأ في إرسال الفوز:", e));
            });

          } else if (userMessage.toLowerCase() === "ترتيب") {
            gameState.isActive = false;
            if (typeof gameState.stopListening === 'function') {
              try {
                gameState.stopListening();
              } catch (e) {
                console.error("خطأ في إيقاف الاستماع:", e);
              }
            }
            global.wordGames.delete(threadID);
          }

        } catch (err) {
          console.error("خطأ أثناء التحقق من الإجابة:", err);
        }
      });

    } catch (err) {
      console.error("خطأ في تشغيل اللعبة:", err);
      await message.reply("❌ حدث خطأ أثناء تشغيل اللعبة.");
      global.wordGames.delete(threadID);
    }
  }
};