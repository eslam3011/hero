
export default {
  keywords: ['الاوامر', 'اوامر', 'commands', 'help'],
  age: 17,
  Developer: 'khir',
  name: 'khir salh',
  description: 'عرض قائمة بجميع الأوامر المتاحة',
  
  onStart: async function ({
    api,
    event,
    args,
    message,
    convertTime,
    getTime
  }) {
    
    const currentTime = getTime('DD/MM/YYYY - HH:mm:ss');
    
    const helpMessage = `
╭─────────────────────────╮
│        🤖 Hero Bot 2025        │
╰─────────────────────────╯

🎯 الأوامر المتاحة:

🧠 أوامر الذكاء الاصطناعي:
├─ بارد 〖 سؤالك 〗
├─ ping 〖 للتحقق من سرعة الاستجابة 〗
└─ زكسل 〖 سؤالك 〗

📷 أوامر الصور:
├─ صورة 〖 وصف الصورة 〗
└─ تحليل 〖 مع رد على صورة 〗

💬 أوامر التفاعل:
├─ شات 〖 للمحادثة 〗
├─ ترجم 〖 النص 〗
└─ طقس 〖 اسم المدينة 〗

ℹ️ معلومات البوت:
├─ المطور
├─ الوقت
└─ معلومات

╭─────────────────────────╮
│ 📊 إحصائيات البوت:           │
├─ 🕐 الوقت: ${currentTime}    │
├─ 🤖 الإصدار: 2025 v3.0     │
├─ ⚡ الحالة: نشط              │
└─ 👨‍💻 المطور: ملك الجحيم        │
╰─────────────────────────╯


    `;
    
    await message.send(helpMessage);
  },
};
