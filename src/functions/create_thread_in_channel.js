const create_thread_in_channel = async (
  client,
  channel_id,
  topic_name,
  topic_reason = "",
  duration = 4320
) => {
  try {
    const channel = await client.channels.fetch(channel_id);

    if (channel) {
      await channel.threads.create({
        name: topic_name,
        reason: topic_reason,
        autoArchiveDuration: duration,
      });
    }
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = {
  create_thread_in_channel,
};
