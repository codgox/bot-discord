const { SlashCommandBuilder, inlineCode } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Faça sua daily review")
    .addStringOption((option) =>
      option
        .setName("o_que_fiz_ontem")
        .setDescription(
          "Descreva brevemente as principais tarefas concluídas no dia anterior."
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("o_que_farei_hoje")
        .setDescription(
          "Enumere as tarefas ou objetivos planejados para o dia."
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("impedimentos")
        .setDescription(
          "Informe qualquer bloqueio ou desafio que possa afetar o progresso."
        )
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("observações")
        .setDescription(
          "Qualquer informação adicional que possa ser relevante para a equipe."
        )
        .setRequired(false)
    ),
  async execute(interaction) {
    const did = interaction.options.getString("o_que_fiz_ontem");
    const doing = interaction.options.getString("o_que_farei_hoje");
    const impediments = interaction.options.getString("impedimentos");
    const comments = interaction.options.getString("observações");
    let string = "";
    string += "O que fiz ontem: \n";
    string += `${inlineCode(did)} \n`;
    string += `O que farei hoje: \n`;
    string += `${inlineCode(doing)} \n`;
    if (impediments) {
      string += `Impedimentos: \n`;
      string += `${inlineCode(impediments)} \n`;
    }
    if (comments) {
      string += `Observações: \n`;
      string += `${inlineCode(comments)} \n`;
    }
    await interaction.reply(string);
  },
};
