
export default {
  keywords: ['ترتيب'],
  age: 17,
  Developer: 'khir',
  name: 'khir salh',
  onStart: async function ({
    api,
    event,
    args,
    message,
  }) {
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
      "طبيب", "معلم", "مهندس", "محامي", "طباخ", "خباز", "نجار", "كهربائي", "سباك", "بائع"
    ];

    // دالة لخلط حروف الكلمة
    function shuffleWord(word) {
      const chars = word.split('');
      for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
      }
      return chars.join('');
    }

    // استخدام متغير global لتخزين حالة اللعبة لكل مجموعة
    if (!global.wordGames) {
      global.wordGames = new Map();
    }

    const threadID = event.threadID;

    // التحقق من وجود لعبة نشطة في هذه المجموعة
    if (global.wordGames.has(threadID)) {
      const existingGame = global.wordGames.get(threadID);

      // إيقاف الاستماع السابق
      if (existingGame.stopListening && typeof existingGame.stopListening === 'function') {
        try {
          existingGame.stopListening();
        } catch (e) {
          console.error("خطأ في إيقاف الاستماع السابق:", e);
        }
      }

      // حذف اللعبة السابقة
      global.wordGames.delete(threadID);
    }

    // دالة لاختيار كلمة عشوائية
    const getRandomWord = () => {
      const randomIndex = Math.floor(Math.random() * words.length);
      const originalWord = words[randomIndex];
      let shuffledWord = shuffleWord(originalWord);
      
      // التأكد من أن الكلمة مخلوطة وليست مثل الأصل
      while (shuffledWord === originalWord) {
        shuffledWord = shuffleWord(originalWord);
      }
      
      return {
        original: originalWord,
        shuffled: shuffledWord
      };
    };

    // إنشاء لعبة جديدة
    const gameState = {
      currentWord: getRandomWord(),
      threadID: threadID,
      isActive: true,
      stopListening: null
    };

    // حفظ اللعبة في الذاكرة العامة
    global.wordGames.set(threadID, gameState);

    try {
      // إرسال السؤال الأول
      const initialMessage = "🔤 رتب هذه الأحرف لتكوين كلمة صحيحة!\n\n🎯 الأحرف: " + gameState.currentWord.shuffled + "\n\n💡 اكتب الكلمة مرتبة!";
      await message.reply(initialMessage);

      // إعداد الاستماع
      gameState.stopListening = api.listenMqtt((err, incomingEvent) => {
        if (err) {
          console.error("خطأ في الاستماع:", err);
          return;
        }

        // التحقق من صحة البيانات والتأكد من أن اللعبة لا تزال نشطة
        if (!incomingEvent || 
            incomingEvent.type !== "message" || 
            !incomingEvent.body || 
            incomingEvent.threadID !== threadID ||
            !gameState.isActive ||
            !global.wordGames.has(threadID)) {
          return;
        }

        try {
          const userMessage = incomingEvent.body.trim();

          // التحقق من الإجابة الصحيحة
          const cleanUserMessage = userMessage.replace(/\s+/g, '').trim();
          const cleanAnswer = gameState.currentWord.original.replace(/\s+/g, '').trim();
          
          console.log(`مقارنة الكلمات: "${cleanUserMessage}" مع "${cleanAnswer}"`);
          
          if (cleanUserMessage === cleanAnswer || userMessage === gameState.currentWord.original) {
            const winnerName = incomingEvent.senderName || "اللاعب";
            const winMessage = `🎉 مبروك! قام ${winnerName} بكتابة الإجابة الصحيحة: ${gameState.currentWord.original}\n\n💡 اكتب "ترتيب" للعب مرة أخرى!`;

            api.sendMessage(winMessage, threadID)
              .then(() => {
                // إيقاف اللعبة وحذفها
                gameState.isActive = false;
                if (gameState.stopListening && typeof gameState.stopListening === 'function') {
                  try {
                    gameState.stopListening();
                  } catch (e) {
                    console.error("خطأ في إيقاف الاستماع بعد الفوز:", e);
                  }
                }
                global.wordGames.delete(threadID);
              })
              .catch(error => console.error("خطأ في إرسال رسالة الفوز:", error));
          }
          // التحقق من طلب لعبة جديدة
          else if (userMessage === "ترتيب") {
            // إيقاف اللعبة الحالية فوراً
            gameState.isActive = false;
            if (gameState.stopListening && typeof gameState.stopListening === 'function') {
              try {
                gameState.stopListening();
              } catch (e) {
                console.error("خطأ في إيقاف الاستماع عند طلب لعبة جديدة:", e);
              }
            }
            global.wordGames.delete(threadID);
            
            // إرسال رسالة تأكيد إيقاف اللعبة القديمة
            api.sendMessage("⏹️ تم إيقاف اللعبة السابقة. سيتم بدء لعبة جديدة...", threadID)
              .catch(error => console.error("خطأ في إرسال رسالة الإيقاف:", error));
            
            return;
          }

        } catch (messageError) {
          console.error("خطأ في معالجة الرسالة:", messageError);
        }
      });

    } catch (error) {
      console.error("خطأ في تشغيل اللعبة:", error);
      await message.reply("❌ حدث خطأ في تشغيل اللعبة");

      // حذف اللعبة في حالة الخطأ
      if (global.wordGames.has(threadID)) {
        global.wordGames.delete(threadID);
      }
    }
  }
};
