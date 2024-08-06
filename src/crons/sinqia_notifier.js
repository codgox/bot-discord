const schedule = require("node-schedule");
const timeZone = "America/Sao_Paulo";
const { send_message_in_channel } = require("../send_message_in_channel");
const { hyperlink } = require("discord.js");
const { DEVELOPMENT_ROLE_ID, SCRUM_CHANNEL_ID } = require("../variables");

const role = `<@&${DEVELOPMENT_ROLE_ID}>`;

const url = "https://meet.google.com/tkq-fecp-mqs";

const sinqia_notifier = (client) => {
  schedule.scheduleJob(
    { hour: 13, minute: 45, dayOfWeek: [1, 3, 5], tz: timeZone },
    () => {
      send_message_in_channel(
        client,
        SCRUM_CHANNEL_ID,
        `Boa tarde ${role}, relembrando nossa reunião com a Sinqia hoje ás 14:15 no ${hyperlink(
          "meet de sempre!",
          url
        )}`
      );
    }
  );
};

module.exports = {
  sinqia_notifier,
};
