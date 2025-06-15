
export default {
  keywords: ['عواصم'],
  age: 17,
  Developer: 'khir',
  name: 'khir salh',
  onStart: async function ({
    api,
    event,
    args,
    message,
  }) {
    const questions = [
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

    // استخدام متغير global لتخزين حالة اللعبة لكل مجموعة
    if (!global.capitalGames) {
      global.capitalGames = new Map();
    }

    const threadID = event.threadID;

    // التحقق من وجود لعبة نشطة في هذه المجموعة
    if (global.capitalGames.has(threadID)) {
      const existingGame = global.capitalGames.get(threadID);

      // إيقاف الاستماع السابق
      if (existingGame.stopListening && typeof existingGame.stopListening === 'function') {
        try {
          existingGame.stopListening();
        } catch (e) {
          console.error("خطأ في إيقاف الاستماع السابق:", e);
        }
      }

      // حذف اللعبة السابقة
      global.capitalGames.delete(threadID);
    }

    // دالة لاختيار سؤال عشوائي
    const getRandomQuestion = () => {
      const randomIndex = Math.floor(Math.random() * questions.length);
      return { ...questions[randomIndex] };
    };

    // إنشاء لعبة جديدة
    const gameState = {
      currentQuestion: getRandomQuestion(),
      threadID: threadID,
      isActive: true,
      stopListening: null
    };

    // حفظ اللعبة في الذاكرة العامة
    global.capitalGames.set(threadID, gameState);

    try {
      // إرسال السؤال الأول
      const initialMessage = "🌍 ما هي عاصمة هذا البلد؟\n\n📍 البلد: " + gameState.currentQuestion.question + "\n\n💡 اكتب اسم العاصمة!";
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
            !global.capitalGames.has(threadID)) {
          return;
        }

        try {
          const userMessage = incomingEvent.body.trim();

          // التحقق من الإجابة الصحيحة
          const cleanUserMessage = userMessage.replace(/\s+/g, '').trim().toLowerCase();
          const cleanAnswer = gameState.currentQuestion.answer.replace(/\s+/g, '').trim().toLowerCase();
          
          console.log(`مقارنة العواصم: "${cleanUserMessage}" مع "${cleanAnswer}"`);
          
          if (cleanUserMessage === cleanAnswer || userMessage.toLowerCase() === gameState.currentQuestion.answer.toLowerCase()) {
            const winnerName = incomingEvent.senderName || "اللاعب";
            const winMessage = `🎉 مبروك! قام ${winnerName} بكتابة الإجابة الصحيحة: ${gameState.currentQuestion.answer}\n\n💡 اكتب "عواصم" للعب مرة أخرى!`;

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
                global.capitalGames.delete(threadID);
              })
              .catch(error => console.error("خطأ في إرسال رسالة الفوز:", error));
          }
          // التحقق من طلب لعبة جديدة
          else if (userMessage === "عواصم") {
            // إيقاف اللعبة الحالية فوراً
            gameState.isActive = false;
            if (gameState.stopListening && typeof gameState.stopListening === 'function') {
              try {
                gameState.stopListening();
              } catch (e) {
                console.error("خطأ في إيقاف الاستماع عند طلب لعبة جديدة:", e);
              }
            }
            global.capitalGames.delete(threadID);
            
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
      if (global.capitalGames.has(threadID)) {
        global.capitalGames.delete(threadID);
      }
    }
  }
};
