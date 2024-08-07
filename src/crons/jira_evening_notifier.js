const schedule = require("node-schedule");
const timeZone = "America/Sao_Paulo";
const {
  send_message_in_channel,
} = require("../functions/send_message_in_channel");
const { WORKFLOW_ROLE_ID, SCRUM_CHANNEL_ID } = require("../variables");

const role = `<@&${WORKFLOW_ROLE_ID}>`;

const jira_evening_notifier = (client) => {
  schedule.scheduleJob(
    { hour: 17, minute: 30, dayOfWeek: new schedule.Range(1, 5), tz: timeZone },
    async () => {
      await send_message_in_channel(
        client,
        SCRUM_CHANNEL_ID,
        `${role} não se esqueçam de adicionar o registro de trabalho no Jira 13:00 - 18:00 com a descrição do que foi feito ✅`
      );
    }
  );
};

module.exports = {
  jira_evening_notifier,
};
