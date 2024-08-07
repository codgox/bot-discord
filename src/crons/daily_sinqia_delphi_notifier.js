const schedule = require("node-schedule");
const timeZone = "America/Sao_Paulo";
const {
  send_message_in_channel,
} = require("../functions/send_message_in_channel");
const { SINQIA_DELPHI_ROLE_ID, SCRUM_CHANNEL_ID } = require("../variables");

const role = `<@&${SINQIA_DELPHI_ROLE_ID}>`;

const daily_sinqia_delphi_notifier = (client) => {
  schedule.scheduleJob(
    { hour: 8, minute: 30, dayOfWeek: new schedule.Range(1, 5), tz: timeZone },
    async () => {
      await send_message_in_channel(
        client,
        SCRUM_CHANNEL_ID,
        `Bom dia ${role}, relembrando nossa daily hoje ás 09:00, por favor use o comando /daily para reportar de antemão e acelerar nossa daily!`
      );
    }
  );
};

module.exports = {
  daily_sinqia_delphi_notifier,
};
