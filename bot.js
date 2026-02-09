const express = require("express");
const { Telegraf, Markup } = require("telegraf");

const bot = new Telegraf("7272627383:AAFYkvzCrIDgmejz2wcFuoMPwBr1fNS0R2s");
const app = express();

bot.start(async (ctx) => {
  const message = await ctx.reply("⏳ Loading...");

  const frames = [
    "✨ Welcome to RJ King Bot",
    "✨ Welcome to RJ King Bot 👑",
    "✨ Welcome to RJ King Bot 👑🔥",
    "🚀 Welcome to RJ King Official Bot 👑🔥"
  ];

  for (let text of frames) {
    await new Promise(res => setTimeout(res, 700));
    await ctx.telegram.editMessageText(
      ctx.chat.id,
      message.message_id,
      null,
      text,
      {
        reply_markup: Markup.inlineKeyboard([
          [Markup.button.url("💬 Chat with Admin", "https://t.me/rj4king")]
        ]).reply_markup
      }
    );
  }
});

app.get("/", (req, res) => {
  res.send("Bot is running 🚀");
});

bot.launch();
app.listen(3000, () => console.log("Server running"));
