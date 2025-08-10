import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import TelegramBot from "node-telegram-bot-api";

// =================== CONFIG ===================
const BOT_TOKEN ='7234887632:AAHpcFvHDMmAZc7himbEohBBCPRAoig9NdE'; // <- Replace with your bot token
const WEBAPP_URL = "https://your-deployed-url.com"; // <- Replace with deployed URL
// ===============================================

// Get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Init Express app
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public")));

// Serve the welcome page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Mini App + Bot server running at http://localhost:${PORT}`);
});

// =================== TELEGRAM BOT ===================
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "🚀 Beyond! Tap below to launch the app:", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Open Mini App",
            web_app: { url: WEBAPP_URL } // This opens the mini app inside Telegram
          }
        ]
      ],
      resize_keyboard: true
    }
  });
});
