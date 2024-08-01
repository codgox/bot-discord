const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Use para ver se o bot responde pong"),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};
