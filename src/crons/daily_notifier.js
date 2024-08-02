const schedule = require("node-schedule");
const timeZone = "America/Sao_Paulo";
const { send_message_in_channel } = require("../send_message_in_channel");

const developmentRole = `<@&${process.env.DEVELOPMENT_ROLE_ID}>`;
const workflowRole = `<@&${process.env.WORKFLOW_ROLE_ID}>`;

const daily_notifier = (client) => {
  schedule.scheduleJob(
    { hour: 10, minute: 0, dayOfWeek: new schedule.Range(1, 5), tz: timeZone },
    () => {
      send_message_in_channel(
        client,
        process.env.WORKFLOW_CHANNEL_ID,
        `Bom dia ${developmentRole}, relembrando nossa daily hoje ás 10:30`
      );
    }
  );
};

module.exports = {
  daily_notifier,
};
