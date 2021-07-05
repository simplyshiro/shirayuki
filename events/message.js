const { Collection } = require('discord.js');

const { PREFIX } = process.env;

module.exports = {
  name: 'message',
  execute(message) {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = message.client.commands.get(commandName)
    || message.client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.args && !args.length) {
      let reply = '⚠️ **You didn\'t provide any arguments.**';

      if (command.usage) reply += `**The proper usage would be: \`${PREFIX}${command.name} ${command.usage}\`**`;

      message.channel.send(reply);
    }

    if (command.guildOnly && message.channel.type === 'dm') message.channel.send(`⚠️ **\`${command.name}\` is only usable in guilds.**`);

    if (command.ownerOnly && !message.author.id === '507444679500103691') message.channel.send('⚠️ **You don\'t have permissions to do that!**');

    if (command.permissions) {
      const authorPerms = message.channel.permissionsFor(message.author);

      if (!authorPerms || !authorPerms.has(command.permissions)) message.channel.send('⚠️ **You don\'t have permissions to do that.**');
    }

    const { cooldowns } = message.client;

    if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) * 1000;

        message.channel.send(`⏱️ **Please wait ${timeLeft.toFixed(1)} more seconds before reusing the \`${command.name}\` command.**`);
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.channel.send('🛑 **Something went wrong trying to execute that command.**');
    }
  },
};
