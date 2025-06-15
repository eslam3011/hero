// متغير عام لحفظ حالة اللعبة
let currentGame = null;

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
      { question: "فندق", answer: "🏨" }
    ];

    // اختيار سؤال عشوائي
    const random_index = Math.floor(Math.random() * questions.length);
    const random_question = questions[random_index];

    // حفظ اللعبة الحالية
    currentGame = {
      threadID: event.threadID,
      question: random_question.question,
      answer: random_question.answer,
      active: true
    };

    const gameMessage = `
╭─────────────────────────╮
│        🎯 لعبة الايموجي      │
╰─────────────────────────╯

📝 السؤال: ${random_question.question}

🏆 أول من يرسل الإيموجي الصحيح يفوز!
⭐ المكافأة: 5 نقاط

╭─────────────────────────╮
│ 💡 لبدء لعبة جديدة اكتب "ايموجي" │
╰─────────────────────────╯
    `;

    await message.reply(gameMessage);
  }
};

// دالة للتحقق من الإجابة (ستُستخدم في event handler)
export function checkEmojiAnswer(event, message) {
  return new Promise(async (resolve) => {
    if (!currentGame || currentGame.threadID !== event.threadID || !currentGame.active) {
      resolve(false);
      return;
    }

    if (event.body === currentGame.answer) {
      try {
        const winMessage = `
╭─────────────────────────╮
│        🎉 مبروك!             │
╰─────────────────────────╯

🏆 أجبت إجابة صحيحة!
⭐ حصلت على: 5 نقاط
🎯 الإجابة الصحيحة: ${currentGame.answer}

╭─────────────────────────╮
│ 🎮 العب مرة أخرى! اكتب "ايموجي" │
╰─────────────────────────╯
        `;

        await message.reply(winMessage);
        currentGame.active = false; // إنهاء اللعبة
        resolve(true);
      } catch (error) {
        console.error('خطأ في إرسال رسالة الفوز:', error);
        resolve(false);
      }
    } else {
      resolve(false);
    }
  });
}