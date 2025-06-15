
export default {
  keywords: ['اعلام'],
  age: 17,
  Developer: 'khir',
  name: 'khir salh',
  onStart: async function ({
    api,
    event,
    args,
    message,
  }) {
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
      { question: "كوريا الشمالية", answer: "🇰🇵" },
      { question: "الهند", answer: "🇮🇳" },
      { question: "باكستان", answer: "🇵🇰" },
      { question: "بنغلاديش", answer: "🇧🇩" },
      { question: "تايلاند", answer: "🇹🇭" },
      { question: "فيتنام", answer: "🇻🇳" },
      { question: "تركيا", answer: "🇹🇷" },
      { question: "إيران", answer: "🇮🇷" },
      { question: "أفغانستان", answer: "🇦🇫" },
      { question: "البرازيل", answer: "🇧🇷" },
      { question: "الأرجنتين", answer: "🇦🇷" },
      { question: "تشيلي", answer: "🇨🇱" },
      { question: "أمريكا", answer: "🇺🇸" },
      { question: "كندا", answer: "🇨🇦" },
      { question: "المكسيك", answer: "🇲🇽" },
      { question: "أستراليا", answer: "🇦🇺" },
      { question: "نيوزيلندا", answer: "🇳🇿" },
      { question: "جنوب أفريقيا", answer: "🇿🇦" },
      { question: "نيجيريا", answer: "🇳🇬" },
      { question: "كينيا", answer: "🇰🇪" },
      { question: "إثيوبيا", answer: "🇪🇹" },
      { question: "غانا", answer: "🇬🇭" },
      { question: "المغرب", answer: "🇲🇦" },
      { question: "أوكرانيا", answer: "🇺🇦" },
      { question: "بولندا", answer: "🇵🇱" },
      { question: "التشيك", answer: "🇨🇿" },
      { question: "المجر", answer: "🇭🇺" },
      { question: "رومانيا", answer: "🇷🇴" },
      { question: "بلغاريا", answer: "🇧🇬" },
      { question: "اليونان", answer: "🇬🇷" },
      { question: "النرويج", answer: "🇳🇴" },
      { question: "السويد", answer: "🇸🇪" },
      { question: "فنلندا", answer: "🇫🇮" },
      { question: "الدنمارك", answer: "🇩🇰" },
      { question: "أيسلندا", answer: "🇮🇸" },
      { question: "أيرلندا", answer: "🇮🇪" },
      { question: "إسرائيل", answer: "🇮🇱" },
      { question: "سنغافورة", answer: "🇸🇬" },
      { question: "ماليزيا", answer: "🇲🇾" },
      { question: "إندونيسيا", answer: "🇮🇩" },
      { question: "الفلبين", answer: "🇵🇭" }
    ];

    // استخدام متغير global لتخزين حالة اللعبة لكل مجموعة
    if (!global.flagGames) {
      global.flagGames = new Map();
    }

    const threadID = event.threadID;

    // التحقق من وجود لعبة نشطة في هذه المجموعة
    if (global.flagGames.has(threadID)) {
      const existingGame = global.flagGames.get(threadID);

      // إيقاف الاستماع السابق
      if (existingGame.stopListening && typeof existingGame.stopListening === 'function') {
        try {
          existingGame.stopListening();
        } catch (e) {
          console.error("خطأ في إيقاف الاستماع السابق:", e);
        }
      }

      // حذف اللعبة السابقة
      global.flagGames.delete(threadID);
    }

    // دالة لاختيار سؤال عشوائي
    const getRandomQuestion = () => {
      const randomIndex = Math.floor(Math.random() * flags.length);
      return { ...flags[randomIndex] };
    };

    // إنشاء لعبة جديدة
    const gameState = {
      currentQuestion: getRandomQuestion(),
      threadID: threadID,
      isActive: true,
      stopListening: null
    };

    // حفظ اللعبة في الذاكرة العامة
    global.flagGames.set(threadID, gameState);

    try {
      // إرسال السؤال الأول
      const initialMessage = "🏳️ أرسل علم هذا البلد!\n\n🌍 البلد: " + gameState.currentQuestion.question + "\n\n💡 أرسل إيموجي العلم!";
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
            !global.flagGames.has(threadID)) {
          return;
        }

        try {
          const userMessage = incomingEvent.body.trim();

          // التحقق من الإجابة الصحيحة
          const cleanUserMessage = userMessage.replace(/\s+/g, '').trim();
          const cleanAnswer = gameState.currentQuestion.answer.replace(/\s+/g, '').trim();
          
          console.log(`مقارنة الأعلام: "${cleanUserMessage}" مع "${cleanAnswer}"`);
          
          if (cleanUserMessage === cleanAnswer || userMessage === gameState.currentQuestion.answer) {
            const winnerName = incomingEvent.senderName || "اللاعب";
            const winMessage = `🎉 مبروك! قام ${winnerName} بكتابة الإجابة الصحيحة: ${gameState.currentQuestion.answer}\n\n💡 اكتب "اعلام" للعب مرة أخرى!`;

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
                global.flagGames.delete(threadID);
              })
              .catch(error => console.error("خطأ في إرسال رسالة الفوز:", error));
          }
          // التحقق من طلب لعبة جديدة
          else if (userMessage === "اعلام") {
            // إيقاف اللعبة الحالية فوراً
            gameState.isActive = false;
            if (gameState.stopListening && typeof gameState.stopListening === 'function') {
              try {
                gameState.stopListening();
              } catch (e) {
                console.error("خطأ في إيقاف الاستماع عند طلب لعبة جديدة:", e);
              }
            }
            global.flagGames.delete(threadID);
            
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
      if (global.flagGames.has(threadID)) {
        global.flagGames.delete(threadID);
      }
    }
  }
};
