const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'avatar',
  description: '',
  usage: '[mention]',
  execute(message) {
    const mention = message.mentions.users.first() || message.author;
    const embed = new MessageEmbed()
      .setTitle(`👤 ${mention.username}'s avatar`)
      .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
      .setImage(mention.displayAvatarURL({ dynamic: true, size: 512 }));

    message.channel.send(embed);
  },
};
