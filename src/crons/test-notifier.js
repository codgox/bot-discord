const schedule = require("node-schedule");
const timeZone = "America/Sao_Paulo";
const { send_message_in_channel } = require("../send_message_in_channel");

const developmentRole = `<@&${process.env.DEVELOPMENT_ROLE_ID}>`;
const workflowRole = `<@&${process.env.WORKFLOW_ROLE_ID}>`;

const test_notifier = (client) => {
  schedule.scheduleJob({ hour: 16, minute: 20, tz: timeZone }, () => {
    send_message_in_channel(
      client,
      process.env.SCRUM_CHANNEL_ID,
      `Bom dia ${developmentRole} ${workflowRole}, estamos apenas testando o bot, ótima sexta para você!`
    );
  });
};

module.exports = {
  test_notifier,
};
