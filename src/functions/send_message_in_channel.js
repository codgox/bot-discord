const send_message_in_channel = async (client, channel_id, message) => {
  try {
    const channel = await client.channels.fetch(channel_id);

    if (channel) {
      await channel.send(message);
    }
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = {
  send_message_in_channel,
};
