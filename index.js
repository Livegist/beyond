//import express from "express";
//import TelegramBot from "node-telegram-bot-api";
//import dotenv from "dotenv";

//dotenv.config();

//const app = express();
//app.use(express.json());
//app.use(express.static("public"));

//const BOT_TOKEN = process.env.BOT_TOKEN;
//const WEBAPP_URL = process.env.WEBAPP_URL;
//const PORT = process.env.PORT || 3000;
//const OWNER_CHAT_ID = process.env.OWNER_CHAT_ID; // <-- Your personal Telegram ID

// Telegram bot (webhook mode)
//const bot = new TelegramBot(BOT_TOKEN, { polling: false });

// Endpoint for Telegram webhook
//app.post(`/bot${process.env.BOT_TOKEN}`, (req, res) => {   
 //bot.processUpdate(req.body);
   // res.sendStatus(200);
//});

// Handle /start
//bot.onText(/\/start/, (msg) => {
  //  const chatId = msg.chat.id;
    //bot.sendMessage(chatId, "Welcome to Beyond Bot 🎉", {
      //  reply_markup: {
        //    inline_keyboard: [
          //      [{ text: "Open BeYond App", web_app: { url: WEBAPP_URL } }]
            //]
       // }
    //});
//});

// Start server
//app.listen(PORT, () => {
  //  console.log(`✅ Mini App running at http://localhost:${PORT}`);

    // Send test message when bot starts
    //if (OWNER_CHAT_ID) {
      //  bot.sendMessage(OWNER_CHAT_ID, "🚀 Bot is Live and Running ✅");
    //} else {
      //  console.log("⚠️ OWNER_CHAT_ID not set — no startup message sent.");
   // }
//});
import express from "express";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { webHook: true });

bot.setWebHook(`https://beyond-boy.onrender.com/bot${TOKEN}`);

// parse incoming requests from Telegram
app.use(express.json());

app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Example bot response
bot.on("message", (msg) => {
  bot.sendMessage(msg.chat.id, "✅ I received your message instantly!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Bot server running on port ${PORT}`);
});
