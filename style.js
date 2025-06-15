
import chalk from 'chalk';

function gradientText() {
  const logo = `
  ╔═══════════════════════════════════════════════════════════════╗
  ║                                                               ║
  ║      🤖 HERO BOT 2025 - Next Generation AI Assistant 🤖      ║
  ║                                                               ║
  ║  ██╗  ██╗███████╗██████╗  ██████╗     ██████╗  ██████╗ ████████╗ ║
  ║  ██║  ██║██╔════╝██╔══██╗██╔═══██╗    ██╔══██╗██╔═══██╗╚══██╔══╝ ║
  ║  ███████║█████╗  ██████╔╝██║   ██║    ██████╔╝██║   ██║   ██║    ║
  ║  ██╔══██║██╔══╝  ██╔══██╗██║   ██║    ██╔══██╗██║   ██║   ██║    ║
  ║  ██║  ██║███████╗██║  ██║╚██████╔╝    ██████╔╝╚██████╔╝   ██║    ║
  ║  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝     ╚═════╝  ╚═════╝    ╚═╝    ║
  ║                                                               ║
  ║                        🚀 Version 3.0                        ║
  ║                    💎 Premium AI Experience                  ║
  ║                                                               ║
  ╚═══════════════════════════════════════════════════════════════╝
  `;

  const info = `
  ┌─────────────────────────────────────────────────────────────┐
  │                    📊 System Information                    │
  ├─────────────────────────────────────────────────────────────┤
  │ 👨‍💻 Developer: Khir Salh (ملك الجحيم)                        │
  │ 🎂 Age: 17 Years Old                                       │
  │ 🌍 Country: Egypt (مصر)                                    │
  │ 📅 Year: 2025                                              │
  │ ⚡ Status: Active & Running                                │
  │ 🔧 Technology: Node.js + AI Integration                    │
  │ 🌐 Platform: Facebook Messenger Bot                        │
  └─────────────────────────────────────────────────────────────┘
  `;

  const features = `
  ┌─────────────────────────────────────────────────────────────┐
  │                       🎯 Features 2025                     │
  ├─────────────────────────────────────────────────────────────┤
  │ 🧠 Advanced AI Chat (Bard, Bing, ChatGPT)                 │
  │ 🖼️  AI Image Generation                                    │
  │ 🌍 Real-time Translation                                   │
  │ 🎨 Modern UI/UX Design                                     │
  │ ⚡ Lightning Fast Response                                 │
  │ 🔒 Secure & Private                                        │
  │ 📱 Multi-platform Support                                  │
  │ 🤖 Smart Auto Commands                                     │
  └─────────────────────────────────────────────────────────────┘
  `;

  console.log(chalk.cyan(logo));
  console.log(chalk.green(info));
  console.log(chalk.yellow(features));
  
  console.log(chalk.magenta.bold('\n🎉 Hero Bot 2025 Started Successfully! 🎉\n'));
  console.log(chalk.blue('📞 Contact: https://wa.me/201119558517'));
  console.log(chalk.blue('🌐 Facebook: https://facebook.com/profile.php?id=100065172561645'));
  console.log(chalk.red('━'.repeat(70)));
}

export { gradientText };
