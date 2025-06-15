export default {
  keywords: ['ايموجي'],
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
      // الوجوه والمشاعر
      { question: "وجه مبتسم", answer: "😊" },
      { question: "وجه حزين", answer: "😢" },
      { question: "وجه غاضب", answer: "😠" },
      { question: "وجه خائف", answer: "😨" },
      { question: "وجه مفاجئ", answer: "😮" },
      { question: "وجه يضحك بقوة", answer: "😂" },
      { question: "وجه يبكي من الضحك", answer: "😭" },
      { question: "وجه بعيون قلوب", answer: "😍" },
      { question: "وجه يرمش", answer: "😉" },
      { question: "وجه محرج", answer: "😳" },
      { question: "وجه نائم", answer: "😴" },
      { question: "وجه يفكر", answer: "🤔" },
      { question: "وجه يقبل", answer: "😘" },
      { question: "وجه مريض", answer: "🤒" },
      { question: "وجه مجنون", answer: "🤪" },
      
      // الأشخاص والأنشطة
      { question: "رجل يرفع يده", answer: "🙋‍♂️" },
      { question: "امرأة ترفع يدها", answer: "🙋‍♀️" },
      { question: "شخص يرقص", answer: "💃" },
      { question: "رجل يجري", answer: "🏃‍♂️" },
      { question: "امرأة تجري", answer: "🏃‍♀️" },
      { question: "شخص يسبح", answer: "🏊" },
      { question: "شخص يمشي", answer: "🚶" },
      { question: "شخص يركب دراجة", answer: "🚴" },
      { question: "طفل", answer: "👶" },
      { question: "رجل عجوز", answer: "👴" },
      { question: "امرأة عجوز", answer: "👵" },
      { question: "طبيب", answer: "👨‍⚕️" },
      { question: "طباخ", answer: "👨‍🍳" },
      { question: "معلم", answer: "👨‍🏫" },
      { question: "شرطي", answer: "👮" },
      
      // القلوب والحب
      { question: "قلب احمر", answer: "❤️" },
      { question: "قلب اصفر", answer: "💛" },
      { question: "قلب ازرق", answer: "💙" },
      { question: "قلب اخضر", answer: "💚" },
      { question: "قلب بنفسجي", answer: "💜" },
      { question: "قلب اسود", answer: "🖤" },
      { question: "قلب مكسور", answer: "💔" },
      { question: "قلبان", answer: "💕" },
      { question: "قلب ينبض", answer: "💓" },
      { question: "قلب مع نجمة", answer: "💖" },
      
      // الحيوانات
      { question: "قطة", answer: "🐱" },
      { question: "كلب", answer: "🐶" },
      { question: "فأر", answer: "🐭" },
      { question: "دب", answer: "🐻" },
      { question: "أسد", answer: "🦁" },
      { question: "نمر", answer: "🐯" },
      { question: "فيل", answer: "🐘" },
      { question: "قرد", answer: "🐵" },
      { question: "خروف", answer: "🐑" },
      { question: "بقرة", answer: "🐄" },
      { question: "خنزير", answer: "🐷" },
      { question: "حصان", answer: "🐴" },
      { question: "دجاجة", answer: "🐔" },
      { question: "طائر", answer: "🐦" },
      { question: "سمكة", answer: "🐠" },
      { question: "فراشة", answer: "🦋" },
      { question: "نحلة", answer: "🐝" },
      { question: "عنكبوت", answer: "🕷️" },
      { question: "ثعبان", answer: "🐍" },
      { question: "تمساح", answer: "🐊" },
      
      // الطعام والشراب
      { question: "تفاحة", answer: "🍎" },
      { question: "موزة", answer: "🍌" },
      { question: "برتقالة", answer: "🍊" },
      { question: "فراولة", answer: "🍓" },
      { question: "عنب", answer: "🍇" },
      { question: "بطيخ", answer: "🍉" },
      { question: "اناناس", answer: "🍍" },
      { question: "خبز", answer: "🍞" },
      { question: "بيتزا", answer: "🍕" },
      { question: "همبرجر", answer: "🍔" },
      { question: "كيك", answer: "🎂" },
      { question: "آيس كريم", answer: "🍦" },
      { question: "شوكولاتة", answer: "🍫" },
      { question: "قهوة", answer: "☕" },
      { question: "شاي", answer: "🍵" },
      { question: "عصير", answer: "🧃" },
      { question: "ماء", answer: "💧" },
      { question: "لحم", answer: "🥩" },
      { question: "دجاج", answer: "🍗" },
      { question: "سمك", answer: "🐟" },
      
      // الطبيعة والطقس
      { question: "شمس", answer: "☀️" },
      { question: "قمر", answer: "🌙" },
      { question: "نجمة", answer: "⭐" },
      { question: "غيمة", answer: "☁️" },
      { question: "مطر", answer: "🌧️" },
      { question: "ثلج", answer: "❄️" },
      { question: "برق", answer: "⚡" },
      { question: "قوس قزح", answer: "🌈" },
      { question: "شجرة", answer: "🌳" },
      { question: "وردة", answer: "🌹" },
      { question: "عشب", answer: "🌱" },
      { question: "جبل", answer: "⛰️" },
      { question: "بحر", answer: "🌊" },
      { question: "نار", answer: "🔥" },
      { question: "زهرة", answer: "🌸" },
      
      // المواصلات
      { question: "سيارة", answer: "🚗" },
      { question: "باص", answer: "🚌" },
      { question: "قطار", answer: "🚂" },
      { question: "طائرة", answer: "✈️" },
      { question: "دراجة", answer: "🚲" },
      { question: "سفينة", answer: "🚢" },
      { question: "دراجة نارية", answer: "🏍️" },
      { question: "تاكسي", answer: "🚕" },
      { question: "شاحنة", answer: "🚚" },
      { question: "اسعاف", answer: "🚑" },
      { question: "اطفائية", answer: "🚒" },
      { question: "شرطة", answer: "🚓" },
      
      // الرياضة والألعاب
      { question: "كرة قدم", answer: "⚽" },
      { question: "كرة سلة", answer: "🏀" },
      { question: "كرة تنس", answer: "🎾" },
      { question: "بيسبول", answer: "⚾" },
      { question: "سباحة", answer: "🏊" },
      { question: "ركض", answer: "🏃" },
      { question: "رقص", answer: "💃" },
      { question: "لعبة", answer: "🎮" },
      { question: "كارت", answer: "🎴" },
      { question: "نرد", answer: "🎲" },
      
      // الأشياء والأدوات
      { question: "هاتف", answer: "📱" },
      { question: "كمبيوتر", answer: "💻" },
      { question: "ساعة", answer: "⌚" },
      { question: "كاميرا", answer: "📷" },
      { question: "مفتاح", answer: "🔑" },
      { question: "قلم", answer: "✏️" },
      { question: "كتاب", answer: "📚" },
      { question: "نظارة", answer: "👓" },
      { question: "حقيبة", answer: "🎒" },
      { question: "مظلة", answer: "☂️" },
      { question: "إبرة", answer: "📌" },
      { question: "مقص", answer: "✂️" },
      { question: "مطرقة", answer: "🔨" },
      { question: "مفك", answer: "🔧" },
      { question: "سكين", answer: "🔪" },
      
      // المباني والأماكن
      { question: "بيت", answer: "🏠" },
      { question: "مدرسة", answer: "🏫" },
      { question: "مستشفى", answer: "🏥" },
      { question: "مطعم", answer: "🍽️" },
      { question: "كنيسة", answer: "⛪" },
      { question: "قلعة", answer: "🏰" },
      { question: "خيمة", answer: "⛺" },
      { question: "جسر", answer: "🌉" },
      { question: "مكتب", answer: "🏢" },
      { question: "فندق", answer: "🏨" },
      
      // الإيماءات والأيدي
      { question: "يد ترحب", answer: "👋" },
      { question: "يد تصفق", answer: "👏" },
      { question: "اصبع يشير", answer: "👉" },
      { question: "قبضة", answer: "✊" },
      { question: "سلام", answer: "✌️" },
      { question: "موافق", answer: "👌" },
      { question: "ابهام لأعلى", answer: "👍" },
      { question: "ابهام لأسفل", answer: "👎" },
      { question: "صلاة", answer: "🙏" },
      { question: "عضلات", answer: "💪" },
      
      // الملابس والإكسسوارات
      { question: "قميص", answer: "👕" },
      { question: "فستان", answer: "👗" },
      { question: "حذاء", answer: "👞" },
      { question: "قبعة", answer: "👒" },
      { question: "تاج", answer: "👑" },
      { question: "خاتم", answer: "💍" },
      { question: "قلادة", answer: "📿" },
      { question: "جوارب", answer: "🧦" },
      { question: "قفازات", answer: "🧤" },
      { question: "وشاح", answer: "🧣" },
      
      // الموسيقى والفن
      { question: "ملاحظة موسيقية", answer: "🎵" },
      { question: "جيتار", answer: "🎸" },
      { question: "بيانو", answer: "🎹" },
      { question: "طبل", answer: "🥁" },
      { question: "فرشاة رسم", answer: "🖌️" },
      { question: "صورة", answer: "🖼️" },
      { question: "مسرح", answer: "🎭" },
      { question: "ميكروفون", answer: "🎤" },
      { question: "سماعات", answer: "🎧" },
      { question: "فيلم", answer: "🎬" },
      
      // العلم والتكنولوجيا
      { question: "صاروخ", answer: "🚀" },
      { question: "قمر صناعي", answer: "🛰️" },
      { question: "مجهر", answer: "🔬" },
      { question: "تلسكوب", answer: "🔭" },
      { question: "حاسوب", answer: "💻" },
      { question: "روبوت", answer: "🤖" },
      { question: "بطارية", answer: "🔋" },
      { question: "مصباح", answer: "💡" },
      { question: "مغناطيس", answer: "🧲" },
      { question: "جزيئة", answer: "⚛️" },
      
      // الاحتفالات والأعياد
      { question: "هدية", answer: "🎁" },
      { question: "بالونات", answer: "🎈" },
      { question: "كعكة عيد ميلاد", answer: "🎂" },
      { question: "شمعة", answer: "🕯️" },
      { question: "ألعاب نارية", answer: "🎆" },
      { question: "كريسماس", answer: "🎄" },
      { question: "بابا نويل", answer: "🎅" },
      { question: "جاك اوليترن", answer: "🎃" },
      { question: "أرنب عيد الفصح", answer: "🐰" },
      { question: "بيضة ملونة", answer: "🥚" },
      
      // الصحة والطب
      { question: "قرص دواء", answer: "💊" },
      { question: "حقنة", answer: "💉" },
      { question: "ميزان حرارة", answer: "🌡️" },
      { question: "فيتامين", answer: "🧪" },
      { question: "قناع طبي", answer: "😷" },
      { question: "سماعة طبيب", answer: "🩺" },
      { question: "عكاز", answer: "🦯" },
      { question: "كرسي متحرك", answer: "♿" },
      { question: "لصقة", answer: "🩹" },
      { question: "اسعاف", answer: "⚕️" }
    ];

    // اختيار سؤال عشوائي
    const random_index = Math.floor(Math.random() * questions.length);
    const random_question = questions[random_index];
    random_question.threadID = event.threadID;
    
    // إرسال السؤال العشوائي
    await message.reply("🎯 أول من يرسل هذا الإيموجي يفوز!\n\n📝 السؤال: " + random_question.question);
    
    // دالة لبدء لعبة جديدة
    const startNewGame = async () => {
      try {
        const new_random_index = Math.floor(Math.random() * questions.length);
        const new_random_question = questions[new_random_index];
        await api.sendMessage("🎯 لعبة جديدة! أول من يرسل هذا الإيموجي يفوز!\n\n📝 السؤال: " + new_random_question.question, event.threadID);
        return new_random_question;
      } catch (error) {
        console.error("خطأ في بدء لعبة جديدة:", error);
        throw error;
      }
    };
    
    let currentQuestion = random_question;
    let stopListening = null;
    
    // دالة الاستماع
    const setupListener = () => {
      try {
        // إيقاف الاستماع السابق إن وجد
        if (stopListening && typeof stopListening === 'function') {
          stopListening();
        }
        
        stopListening = api.listenMqtt((err, event) => {
          if (err) {
            console.error("خطأ في الاستماع:", err);
            return;
          }
          
          if (event.type === "message" && event.body && event.threadID === currentQuestion.threadID) {
            try {
              // التحقق من الإجابة الصحيحة
              if (event.body.trim() === currentQuestion.answer) {
                api.sendMessage("🎉 مبروك! قام " + (event.senderName || "اللاعب") + " بكتابة الإجابة الصحيحة: " + currentQuestion.answer, event.threadID);
                if (stopListening && typeof stopListening === 'function') {
                  stopListening(); // إيقاف الاستماع
                }
              }
              // التحقق من طلب لعبة جديدة
              else if (event.body.trim() === "ايموجي") {
                if (stopListening && typeof stopListening === 'function') {
                  stopListening(); // إيقاف الاستماع الحالي
                }
                // بدء لعبة جديدة
                startNewGame().then((newQuestion) => {
                  currentQuestion = newQuestion;
                  currentQuestion.threadID = event.threadID;
                  setupListener(); // إعداد استماع جديد
                }).catch((error) => {
                  console.error("خطأ في إعداد لعبة جديدة:", error);
                });
              }
            
            } catch (messageError) {
              console.error("خطأ في معالجة الرسالة:", messageError);
            }
          }
        });
      } catch (listenerError) {
        console.error("خطأ في إعداد الاستماع:", listenerError);
      }
    };
    
    // بدء الاستماع الأول
    setupListener();
  }
};