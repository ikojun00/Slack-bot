require("dotenv").config();
require("dotenv").config({ path: ".env.local", override: true });
const { App } = require("@slack/bolt");
const sheets = require("./sheets");
const matcher = require("./matcher");
const composer = require("./composer");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000,
});

app.message(async ({ message, say }) => {
  try {
    const text = message.text.toLowerCase();

    if (text === "refresh") {
      sheets.refreshCache();
      await say(`:arrows_counterclockwise: Cache refreshed!`);
      return;
    }

    const items = await sheets.getItems();
    const likelyItems = matcher.getLikelyItems(items, text);
    const response = composer.getMessageForOptions(likelyItems, text);

    await say({
      text: response,
      mrkdwn: true,
    });
  } catch (error) {
    console.error("Error handling message:", error);
    await say(":warning: An error occurred while processing your request");
  }
});

(async () => {
  await app.start();
  app.logger.info("⚡️ Bolt app is running!");
})();
