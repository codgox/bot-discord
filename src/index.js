require("dotenv").config();
const { Client } = require("discord.js");
const GatewayIntentBits = require("discord.js").GatewayIntentBits;
const schedule = require("node-schedule");
const { SendMessageInChannel } = require("./send-message-in-channel");
const timeZone = "America/Sao_Paulo";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  // console.log(`Logged in as ${client.user.tag}!`);

  schedule.scheduleJob(
    { hour: 13, minute: 30, dayOfWeek: new schedule.Range(1, 5), tz: timeZone },
    () => {
      SendMessageInChannel(
        client,
        process.env.DISCORD_CHANNEL_ID,
        `${roleMention} não se esqueçam de adicionar o registro de trabalho no Jira com a descrição do que foi feito ✅`
      );
    }
  );

  schedule.scheduleJob(
    { hour: 17, minute: 30, dayOfWeek: new schedule.Range(1, 5), tz: timeZone },
    () => {
      SendMessageInChannel(
        client,
        process.env.DISCORD_CHANNEL_ID,
        `${roleMention} não se esqueçam de adicionar o registro de trabalho no Jira com a descrição do que foi feito ✅`
      );
    }
  );
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

client.login(process.env.DISCORD_TOKEN);
