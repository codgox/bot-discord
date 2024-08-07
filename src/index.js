require("dotenv").config();

const { Client, Events, GatewayIntentBits } = require("discord.js");

const { daily_notifier } = require("./crons/daily_notifier");
const { sinqia_notifier } = require("./crons/sinqia_notifier");
const { jira_morning_notifier } = require("./crons/jira_morning_notifier");
const { jira_evening_notifier } = require("./crons/jira_evening_notifier");

const { execute_command } = require("./utils/execute_command");
const { load_commands } = require("./utils/load_commands");
const { sync_commands } = require("./utils/sync_commands");
const {
  daily_sinqia_delphi_notifier,
} = require("./crons/daily_sinqia_delphi_notifier");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}!`);

  // test_notifier(readyClient);

  daily_notifier(readyClient);
  sinqia_notifier(readyClient);
  jira_morning_notifier(readyClient);
  jira_evening_notifier(readyClient);
  daily_sinqia_delphi_notifier(readyClient);
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

client.login(process.env.DISCORD_TOKEN);
