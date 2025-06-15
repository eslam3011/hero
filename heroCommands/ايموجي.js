
let currentGame = null;

export default {
  keywords: ['ايموجي'],
  age: 17,
  Developer: 'khir',
  name: 'khir salh',
  description: 'لعبة تخمين الايموجي',

  onStart: async function ({ api, args, message, event }) {
    const questions = [
      {
        question: "وجه مبتسم ",
        answer: "😃"
      },
      {
        question: "رجل ذو شعر ابيض",
        answer: "👨‍🦳"
      },
      {
        question: "رجل يرفع يدو",
        answer: "🙋‍♂️"
      },
      {
        question: "لسان ",
        answer: "👅"
      },
      {
        question: "قبعة",
        answer: "🧢"
      },
      {
        question: "رجل زومبي ",
        answer: "🧟‍♂️"
      },
      {
        question: "وجه غاضب",
        answer: "😡"
      },
      {
        question: "وجه يضحك بدموع",
        answer: "😂"
      },
      {
        question: "وجه حزين",
        answer: "😔"
      },
      {
        question: "رجل مبرمج",
        answer: "👨‍💻"
      },
      {
        question: "رجل طباخ",
        answer: "👨‍🍳"
      },
      {
        question: "شرطي",
        answer: "👨‍✈️"
      },
      {
        question: "ايموجي في عينيه الحب",
        answer: "😍"
      },
      {
        question: "يلقي تحية الشرطي",
        answer: "🫡"
      },
      {
        question: "شخص يسبح",
        answer: "🏊‍♂️"
      },
      {
        question: "مركبة فضائية",
        answer: "🚀"
      },
      {
        question: " كتاب",
        answer: "📖"
      },
      {
        question: "شخص يرتدي نظارات شمسية",
        answer: "😎"
      },
      {
        question: "كوكب زحل",
        answer: "🪐"
      },
      {
        question: "حقيبة سفر",
        answer: "🧳"
      },
      {
        question: "سمكة ذهبية",
        answer: "🐠"
      },
      {
        question: " مكبر صوت",
        answer: "📢"
      },
      {
        question: "شخص يركب دراجة هوائية",
        answer: "🚴‍♂️"
      },
      {
        question: "صندوق هدايا",
        answer: "🎁"
      }
    ];

    // اختيار سؤال عشوائي
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];

    // حفظ اللعبة الحالية
    currentGame = {
      threadID: event.threadID,
      answer: randomQuestion.answer,
      timestamp: Date.now()
    };

    const gameMessage = `
╭─────────────────────────╮
│        🎮 لعبة الايموجي        │
╰─────────────────────────╯

❓ السؤال: ${randomQuestion.question}

🎯 ارسل الايموجي المناسب للفوز!
⭐ الجائزة: 5 نقاط
⏰ لديك دقيقة واحدة للإجابة

╭─────────────────────────╮
│ 🏆 بالتوفيق!                │
╰─────────────────────────╯
    `;

    await message.send(gameMessage);

    // إزالة اللعبة بعد دقيقة واحدة
    setTimeout(() => {
      if (currentGame && currentGame.threadID === event.threadID) {
        currentGame = null;
      }
    }, 60000);
  }
};

// دالة للتحقق من الإجابة (ستُستخدم في event handler)
export function checkEmojiAnswer(event, message, usersData) {
  return new Promise(async (resolve) => {
    if (!currentGame || currentGame.threadID !== event.threadID) {
      resolve(false);
      return;
    }

    if (event.body === currentGame.answer) {
      try {
        const userName = await usersData.getName(event.senderID);
        const userData = await usersData.get(event.senderID);

        let pointsCount = 5;
        if (userData.data && userData.data.games && userData.data.games.points) {
          pointsCount = userData.data.games.points + 5;
        }

        await usersData.set(event.senderID, { points: pointsCount }, "data.games");

        const winMessage = `
╭─────────────────────────╮
│        🎉 مبروك!             │
╰─────────────────────────╯

🏆 ${userName} أجاب إجابة صحيحة!
⭐ حصلت على: 5 نقاط
📊 إجمالي نقاطك: ${pointsCount}

${currentGame.answer} ← الإجابة الصحيحة
        `;

        await message.reply(winMessage);
        currentGame = null;
        resolve(true);
      } catch (error) {
        console.error('خطأ في حفظ النقاط:', error);
        resolve(false);
      }
    } else {
      resolve(false);
    }
  });
}
