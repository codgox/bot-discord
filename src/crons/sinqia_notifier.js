const schedule = require("node-schedule");
const timeZone = "America/Sao_Paulo";
const { send_message_in_channel } = require("../send_message_in_channel");

const developmentRole = `<@&${process.env.DEVELOPMENT_ROLE_ID}>`;
const workflowRole = `<@&${process.env.WORKFLOW_ROLE_ID}>`;

const sinqia_notifier = (client) => {
  schedule.scheduleJob(
    { hour: 13, minute: 45, dayOfWeek: [1, 3, 5], tz: timeZone },
    () => {
      send_message_in_channel(
        client,
        process.env.WORKFLOW_CHANNEL_ID,
        `Boa tarde ${developmentRole}, relembrando nossa reunião com a Sinqia hoje ás 14:15`
      );
    }
  );
};

module.exports = {
  sinqia_notifier,
};
