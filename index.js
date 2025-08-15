import express from "express";
import { Telegraf } from "telegraf";

const app = express();
app.use(express.static("public"));

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply("Welcome to Beyond 🚀", {
        reply_markup: {
            inline_keyboard: [[
                { text: "Open Beyond App", web_app: { url: process.env.WEBAPP_URL } }
            ]]
        }
    });
});

bot.launch();
app.listen(3000, () => console.log("🚀 Beyond Mini App running on port 3000"));
