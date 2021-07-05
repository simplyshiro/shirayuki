const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'waifu',
  description: '',
  args: true,
  usage: '<sfw | nsfw> <waifu | neko | shinobu | megumin | bully | cuddle | cry | hug | awoo | kiss | lick | pat | smug | bonk | yeet | blush | smile | wave | highfive | handhold | nom | bite | glomp | slap | kill | kick | happy | wink | poke | dance | cringe>',
  execute: async (message, args) => {
    const { url } = await fetch(`https://api.waifu.pics/${args[0]}/${args[1]}`)
      .then((resp) => resp.json());
    const embed = new MessageEmbed()
      .setTitle('🖼️ Waifu.pics')
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setImage(url);

    if (args[0] === 'nsfw' && !message.channel.nsfw) {
      message.channel.send('⚠️ **Go to horny jail.**');
    } else {
      message.channel.send(embed);
    }
  },
};
