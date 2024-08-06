const schedule = require("node-schedule");
const timeZone = "America/Sao_Paulo";
const { send_message_in_channel } = require("../send_message_in_channel");
const { DEVELOPMENT_ROLE_ID, SCRUM_CHANNEL_ID } = require("../variables");

const developmentRole = `<@&${DEVELOPMENT_ROLE_ID}>`;

const test_notifier = (client) => {
  schedule.scheduleJob(
    { hour: 16, minute: 22, dayOfWeek: [1], tz: timeZone },
    () => {
      send_message_in_channel(
        client,
        SCRUM_CHANNEL_ID,
        `Bom dia ${developmentRole} ${workflowRole}, estamos apenas testando o bot, ótima sexta para você!`
      );
    }
  );
};

module.exports = {
  test_notifier,
};
