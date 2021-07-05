const fs = require('fs');

module.exports = {
  name: 'reload',
  description: '',
  args: true,
  ownerOnly: true,
  usage: '<command>',
  execute(message, args) {
    const commandName = args[0].toLowerCase();
    const command = message.client.commands.get(commandName)
      || message.client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) message.channel.send(`⚠️ **\`${commandName}\` doesn't exist.**`);

    const commandFolders = fs.readdirSync('./commands');
    const folderName = commandFolders.find((folder) => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));

    delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

    try {
      const newCommand = require(`../${folderName}/${commandName}.js`);

      message.client.commands.set(newCommand.name, newCommand);
      message.channel.send(`✅ **\`${command.name}\` was reloaded successfuly.**`);
    } catch (error) {
      console.error(error);
      message.channel.send(`🛑 **Something went wrong trying to reload \`${command.name}\`:** \`${error.message}\``);
    }
  },
};
