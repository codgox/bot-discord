const schedule = require("node-schedule");
const timeZone = "America/Sao_Paulo";
const { send_message_in_channel } = require("../send_message_in_channel");

const developmentRole = `<@&${process.env.DEVELOPMENT_ROLE_ID}>`;
const workflowRole = `<@&${process.env.WORKFLOW_ROLE_ID}>`;

const jira_evening_notifier = (client) => {
  schedule.scheduleJob(
    { hour: 17, minute: 30, dayOfWeek: new schedule.Range(1, 5), tz: timeZone },
    () => {
      send_message_in_channel(
        client,
        process.env.SCRUM_CHANNEL_ID,
        `${workflowRole} não se esqueçam de adicionar o registro de trabalho no Jira 13h - 18h com a descrição do que foi feito ✅`
      );
    }
  );
};

module.exports = {
  jira_evening_notifier,
};
