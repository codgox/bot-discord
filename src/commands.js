require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");

(async () => {
  const commands = [
    {
      name: "ping",
      description: "Replies with Pong!",
    },
  ];

  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

  try {
    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
      body: commands,
    });
  } catch (error) {
    console.error(error);
  }
})();
