const send_message_in_channel = (client, channel_id, message) => {
  const channel = client.channels.cache.get(channel_id);
  if (channel) {
    channel.send(message).catch(console.error);
  }
};

module.exports = {
  send_message_in_channel,
};
