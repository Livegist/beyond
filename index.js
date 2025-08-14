import express from "express";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL;
const PORT = process.env.PORT || 3000;
const OWNER_CHAT_ID = process.env.OWNER_CHAT_ID; // <-- Your personal Telegram ID

// Telegram bot (webhook mode)
const bot = new TelegramBot(BOT_TOKEN, { polling: false });

// Endpoint for Telegram webhook
app.post(`/bot${BOT_TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Handle /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Welcome to Beyond Bot 🎉", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Open BeYond App", web_app: { url: WEBAPP_URL } }]
            ]
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Mini App running at http://localhost:${PORT}`);

    // Send test message when bot starts
    if (OWNER_CHAT_ID) {
        bot.sendMessage(OWNER_CHAT_ID, "🚀 Bot is Live and Running ✅");
    } else {
        console.log("⚠️ OWNER_CHAT_ID not set — no startup message sent.");
    }
});
