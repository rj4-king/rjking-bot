const express = require("express");
const { Telegraf, Markup } = require("telegraf");

const bot = new Telegraf("7272627383:AAFYkvzCrIDgmejz2wcFuoMPwBr1fNS0R2s");
const app = express();

const CHANNEL_USERNAME = "@stake_rj4king";

// START
bot.start(async (ctx) => {
  await ctx.reply(
    "🔒 Access Locked!\n\nJoin our official channel to unlock premium tools.",
    Markup.inlineKeyboard([
      [Markup.button.url("📢 Subscribe Channel", "https://t.me/stake_rj4king")],
      [Markup.button.callback("✅ Unlock Access", "check_join")]
    ])
  );
});

// CHECK JOIN
bot.action("check_join", async (ctx) => {
  try {
    const member = await ctx.telegram.getChatMember(CHANNEL_USERNAME, ctx.from.id);

    if (member.status === "left") {
      return ctx.answerCbQuery("❌ Please join the channel first!", { show_alert: true });
    }

    const loadingMsg = await ctx.reply("🔄 Verifying Access...\n\n[░░░░░░░░░░] 0%");

    let progress = 0;

    const interval = setInterval(async () => {
      progress += 10;

      const filled = "█".repeat(progress / 10);
      const empty = "░".repeat(10 - progress / 10);

      try {
        await ctx.telegram.editMessageText(
          ctx.chat.id,
          loadingMsg.message_id,
          null,
          `🔄 Verifying Access...\n\n[${filled}${empty}] ${progress}%`
        );
      } catch (e) {}

      if (progress >= 100) {
        clearInterval(interval);

        setTimeout(async () => {
          await ctx.telegram.editMessageText(
            ctx.chat.id,
            loadingMsg.message_id,
            null,
            "🎉 Access Granted!\n\n👑 Welcome to RJ King Premium System"
          );

          await ctx.reply(
            "🔥 Select an option below:",
            Markup.inlineKeyboard([
              [Markup.button.url("🤖 Free Telegram Bot", "https://t.me/rj4king")],
              [Markup.button.url("🎰 Stake Pro Panel", "https://yourpanelwebsite.com")],
              [Markup.button.url("🛡 Level Verification", "https://yourverificationlink.com")],
              [Markup.button.url("📞 Contact Us", "https://t.me/rj4king")]
            ])
          );
        }, 800);
      }

    }, 300);

  } catch (err) {
    console.log(err);
    ctx.reply("⚠️ Bot must be admin in channel.");
  }
});

// WEB SERVER (Render 24H)
app.get("/", (req, res) => {
  res.send("Bot Running 🚀");
});

bot.launch();
app.listen(3000, () => console.log("Server started"));
