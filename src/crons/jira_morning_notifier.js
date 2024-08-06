const schedule = require("node-schedule");
const timeZone = "America/Sao_Paulo";
const { send_message_in_channel } = require("../send_message_in_channel");
const { WORKFLOW_ROLE_ID, SCRUM_CHANNEL_ID } = require("../variables");

const workflowRole = `<@&${WORKFLOW_ROLE_ID}>`;

const jira_morning_notifier = (client) => {
  schedule.scheduleJob(
    { hour: 13, minute: 30, dayOfWeek: new schedule.Range(1, 5), tz: timeZone },
    () => {
      send_message_in_channel(
        client,
        SCRUM_CHANNEL_ID,
        `${workflowRole} não se esqueçam de adicionar o registro de trabalho no Jira 9h - 12h com a descrição do que foi feito ✅`
      );
    }
  );
};

module.exports = {
  jira_morning_notifier,
};
