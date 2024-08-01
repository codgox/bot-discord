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

const workflowChannel = process.env.WORKFLOW_CHANNEL_ID;
const scrumChannel = process.env.SCRUM_CHANNEL_ID;

const developmentRole = `<@&${process.env.DEVELOPMENT_ROLE_ID}>`;
const workflowRole = `<@&${process.env.WORKFLOW_ROLE_ID}>`;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Notificar sobre as nossas dailys.
  schedule.scheduleJob(
    { hour: 10, dayOfWeek: new schedule.Range(1, 5), tz: timeZone },
    () => {
      SendMessageInChannel(
        client,
        workflowChannel,
        `Bom dia ${developmentRole}, relembrando nossa daily hoje ás 10:30`
      );
    }
  );

  // Notificar sobre as reuniões com a Sinqia.
  schedule.scheduleJob(
    { hour: 13, minute: 45, dayOfWeek: [1, 3, 5], tz: timeZone },
    () => {
      SendMessageInChannel(
        client,
        workflowChannel,
        `Bom dia ${developmentRole}, relembrando nossa reunião com a Sinqia hoje ás 14:15`
      );
    }
  );

  // Notificar sobre os registro de trabalho no Jira as 13:30 e 17:30.
  schedule.scheduleJob(
    { hour: 13, minute: 30, dayOfWeek: new schedule.Range(1, 5), tz: timeZone },
    () => {
      SendMessageInChannel(
        client,
        workflowChannel,
        `${developmentRole} não se esqueçam de adicionar o registro de trabalho no Jira com a descrição do que foi feito ✅`
      );
    }
  );

  schedule.scheduleJob(
    { hour: 17, minute: 30, dayOfWeek: new schedule.Range(1, 5), tz: timeZone },
    () => {
      SendMessageInChannel(
        client,
        workflowChannel,
        `${developmentRole} não se esqueçam de adicionar o registro de trabalho no Jira com a descrição do que foi feito ✅`
      );
    }
  );
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }

  if (interaction.commandName === "daily") {
    //  await interaction.
  }
});

client.login(process.env.DISCORD_TOKEN);
