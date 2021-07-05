const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ping',
  description: '',
  execute(message) {
    const embed = new MessageEmbed()
      .setTitle('🏓 Ping')
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .addField('💓 WebSocket Heartbeat', `${message.client.ws.ping}ms`);

    message.channel.send(embed).then((sent) => {
      sent.edit(embed.addField('🌐 Roundtrip Latency', `${sent.createdTimestamp - message.createdTimestamp}ms`));
    });
  },
};
