const SendMessageInChannel = (client, channel_id, message) => {
  const channel = client.channels.cache.get(channel_id);
  if (channel) {
    channel.send(message).catch(console.error);
  }
};

module.exports = {
  SendMessageInChannel,
};
