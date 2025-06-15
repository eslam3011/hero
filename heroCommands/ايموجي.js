let answer = 'gggfffddd';

export default {
  keywords: ['ايموجي'],
  age: 17,
  Developer: 'khir',
  name: 'khir salh',


  onStart: async function ({ api, args, message, event, threadsData, usersData, dashBoardData, globalData, threadModel, userModel, dashBoardModel, globalModel, role, commandName, getLang }) {
 let questions = [
 {
 question: "وجه مبتسم ",
 answer: "😃"
 },
 {
 question: "رجل زو شعر ابيض",
 answer: "👨‍🦳"
 },
 {
 question: "رجل يرفع يدو",
 answer: "🙋‍♂️"
 },
 {
 question: "لسان ",
 answer: "👅"
 }, {
 question: "قبعة",
 answer: "🧢"
 }, {
 question: "رجل زومبي ",
 answer: "🧟‍♂️"
 }, {
 question: "وجه غاضب",
 answer: "😡"
 }, {
 question: "وجه يضح بدموع",
 answer: "😂"
 }, {
 question: "وجه حزين",
 answer: "😔"
 }, {
 question: "رجل مبرمج",
 answer: "👨‍💻"
 }, {
 question: "رجل طباخ",
 answer: "👨‍🍳"
 }, {
 question: "شرطي",
 answer: "👨‍✈️"
 }, {
 question: "ايموجي في عينيه الحب",
 answer: "😍"
 }, {
 question: "يلقي تحية الشرطي",
 answer: "🫡"
 },{
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
 let randomIndex = Math.floor(Math.random() * questions.length);
 let randomQuestion = questions[randomIndex].question;
 let ans = questions[randomIndex].answer;


 
		answer = ans
 message.reply("من يرسل ايموجي هاذا الوصف يفوز "+randomQuestion)

	},


 onChat: async function ({ api, args, message, event, threadsData, usersData, dashBoardData, globalData, threadModel, userModel, dashBoardModel, globalModel, role, commandName, getLang }) {

		if (event.body === answer){
 const userName = await usersData.getName(event.senderID);
 const userData = await usersData.get(event.senderID)
 
 if (userData.data && userData.data.games && userData.data.games.points) {
 
 let pointsCount = userData.data.games.points
 pointsCount += 5
		await usersData.set(event.senderID, { points: pointsCount }, "data.games");
 message.reply('قام '+userName+' بكتابة الاجابة الصحيحة وحصل علي 5 نقطة ')
 answer = 'gggfffddd'
 
 }else{
 await usersData.set(event.senderID, { points: 1 }, "data.games");
 message.reply('قام '+userName+' بكتابة الاجابة الصحيحة وحصل علي 5 نقطة ')
 answer = 'gggfffddd'
 }
 
 
}



	},
  
    
};
