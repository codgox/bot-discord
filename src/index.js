require("dotenv").config();
const express = require("express");
const { Client, Events, GatewayIntentBits, REST } = require("discord.js");
const schedule = require("node-schedule");
const { SendMessageInChannel } = require("./send-message-in-channel");
const timeZone = "America/Sao_Paulo";

const { execute_command } = require("./utils/execute_command");
const { load_commands } = require("./utils/load_commands");
const { sync_commands } = require("./utils/sync_commands");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const app = express(client);
app.listen();

app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Pingou às ${ping.getUTCHours()}:${ping.getUTCMinutes()}`);
  response.sendStatus(200);
});

const workflowChannel = process.env.WORKFLOW_CHANNEL_ID;
const scrumChannel = process.env.SCRUM_CHANNEL_ID;

const developmentRole = `<@&${process.env.DEVELOPMENT_ROLE_ID}>`;
const workflowRole = `<@&${process.env.WORKFLOW_ROLE_ID}>`;

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

load_commands(client);
sync_commands();

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  execute_command(command, interaction);
});

client.on(Events.InteractionCreate, (readyClient) => {
  // Notificar sobre as nossas dailys.
  schedule.scheduleJob(
    { hour: 10, dayOfWeek: new schedule.Range(1, 5), tz: timeZone },
    () => {
      SendMessageInChannel(
        readyClient,
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
        readyClient,
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
        readyClient,
        workflowChannel,
        `${developmentRole} não se esqueçam de adicionar o registro de trabalho no Jira com a descrição do que foi feito ✅`
      );
    }
  );

  schedule.scheduleJob(
    { hour: 17, minute: 30, dayOfWeek: new schedule.Range(1, 5), tz: timeZone },
    () => {
      SendMessageInChannel(
        readyClient,
        workflowChannel,
        `${developmentRole} não se esqueçam de adicionar o registro de trabalho no Jira com a descrição do que foi feito ✅`
      );
    }
  );
});

client.login(process.env.DISCORD_TOKEN);
