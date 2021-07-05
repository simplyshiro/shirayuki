const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'roll',
  description: '',
  usage: '[maximum number]',
  execute(message, args) {
    const roll = Math.floor(Math.random() * (args[0] || 100 - 1) + 1);
    const embed = new MessageEmbed()
      .setTitle('🎲 Roll')
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`You rolled ${roll} points.`);

    if (Number.isNaN(roll)) {
      message.channel.send('⚠️ That isn\'t a valid number.');
    } else {
      message.channel.send(embed);
    }
  },
};
