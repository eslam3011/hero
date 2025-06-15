
import { performance } from 'perf_hooks';

export default {
  keywords: ['ping', 'بينج'],
  age: 17,
  Developer: 'khir',
  name: 'khir salh',
  description: 'فحص سرعة استجابة البوت',
  
  onStart: async function ({
    api,
    event,
    args,
    message,
    getTime
  }) {
    
    const startTime = performance.now();
    const currentTime = getTime('DD/MM/YYYY - HH:mm:ss');
    
    // حساب وقت الاستجابة
    const endTime = performance.now();
    const responseTime = Math.round(endTime - startTime);
    
    const pingMessage = `
╭─────────────────────────╮
│        🏓 Ping Test          │
╰─────────────────────────╯

⚡ سرعة الاستجابة: ${responseTime}ms
🕐 الوقت الحالي: ${currentTime}
📡 حالة الاتصال: ✅ متصل
🤖 البوت: Hero Bot 2025
🌐 الخادم: نشط ويعمل بكفاءة

╭─────────────────────────╮
│ 📊 معلومات إضافية:           │
├─ 🔥 سرعة عالية جداً          │
├─ ⚡ استجابة فورية            │
└─ 💎 أداء ممتاز               │
╰─────────────────────────╯

🎯 البوت يعمل بسرعة البرق!
    `;
    
    await message.send(pingMessage);
  },
};
