const querystring = require('querystring');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { trim } = require('../../util/trim');

module.exports = {
  name: 'urban',
  description: '',
  args: true,
  usage: '<term>',
  execute: async (message, args) => {
    const query = querystring.stringify({ term: args.join(' ') });
    const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`)
      .then((resp) => resp.json());

    if (!list.length) message.channel.send(`⚠️ **No results found for \`${args.join(' ')}\`.**`);

    const [answer] = list;

    const embed = new MessageEmbed()
      .setTitle(`📗 ${answer.word}`)
      .setURL(answer.permalink)
      .addFields(
        { name: '📖 Definition', value: trim(answer.definition, 1024) },
        { name: '💬 Example', value: trim(answer.example, 1024) },
      );

    message.channel.send(embed);
  },
};
