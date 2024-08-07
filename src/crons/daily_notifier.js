const schedule = require("node-schedule");
const timeZone = "America/Sao_Paulo";
const {
  send_message_in_channel,
} = require("../functions/send_message_in_channel");
const {
  create_thread_in_channel,
} = require("../functions/create_thread_in_channel");
const { WORKFLOW_ROLE_ID, SCRUM_CHANNEL_ID } = require("../variables");

const role = `<@&${WORKFLOW_ROLE_ID}>`;

const daily_notifier = (client) => {
  schedule.scheduleJob(
    { hour: 10, minute: 0, dayOfWeek: new schedule.Range(1, 5), tz: timeZone },
    async () => {
      const today = new Date();
      await create_thread_in_channel(
        client,
        SCRUM_CHANNEL_ID,
        today.toLocaleDateString("pt-BR")
      );

      await send_message_in_channel(
        client,
        SCRUM_CHANNEL_ID,
        `Bom dia ${role}, relembrando nossa daily hoje ás 10:30, por favor use o comando /daily no tópico criado acima para reportar de antemão e acelerar nossa daily!`
      );
    }
  );
};

module.exports = {
  daily_notifier,
};
