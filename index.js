import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files (HTML, CSS, JS) from 'public'
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

// Telegram bot setup
const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL; // Example: https://your-service-name.onrender.com

if (!BOT_TOKEN || !WEBAPP_URL) {
  console.error('❌ BOT_TOKEN or WEBAPP_URL is missing in environment variables.');
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// When user sends /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "👋 Welcome! Click below to launch the mini app:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🚀 Launch Mini App", web_app: { url: WEBAPP_URL } }]
      ]
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Mini App running at http://localhost:${PORT}`);
});
