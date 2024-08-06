const schedule = require("node-schedule");
const timeZone = "America/Sao_Paulo";
const { send_message_in_channel } = require("../send_message_in_channel");
const { WORKFLOW_ROLE_ID, SCRUM_CHANNEL_ID } = require("../variables");

const workflowRole = `<@&${WORKFLOW_ROLE_ID}>`;

const daily_notifier = (client) => {
  schedule.scheduleJob(
    { hour: 10, minute: 0, dayOfWeek: new schedule.Range(1, 5), tz: timeZone },
    () => {
      send_message_in_channel(
        client,
        SCRUM_CHANNEL_ID,
        `Bom dia ${workflowRole}, relembrando nossa daily hoje ás 10:30, por favor use o comando /daily para reportar de antemão e acelerar nossa daily!`
      );
    }
  );
};

module.exports = {
  daily_notifier,
};
