const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('Aleyküm selam,  hoş geldin ^_^'); 
		} else {
		msg.reply('Aleyküm selam, hoş geldin ^_^');
		}
	}
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'naber') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('Gelmedi senden bi haber ^_^'); 
		} else {
		msg.reply('Gelmedi senden bi haber ^_^');
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'bb') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('Nereye daha karpuz kesecektik ^_^'); 
		} else {
		msg.reply('Nereye daha karpuz kesecektik ^_^');
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'görüşürüz') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('Nereye daha karpuz kesecektik ^_^'); 
		} else {
		msg.reply('Nereye daha karpuz kesecektik ^_^');
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '.') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('Nokta mı ?? Burda her zaman son noktayı ben koyarım .'); 
		} else {
		msg.reply('Nokta mı ?? Burda her zaman son noktayı ben koyarım .');
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === ':') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('İki nokta mı ?? Burda her zaman iki noktayı ben koyarım :'); 
		} else {
		msg.reply('İki nokta mı ?? Burda her zaman iki noktayı ben koyarım :');
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === ',') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('Virgül mü ?? Burda her zaman son virgülü ben koyarım ,'); 
		} else {
		msg.reply('Virgül mü ?? Burda her zaman son virgülü ben koyarım ,');
		}
	}
});



client.on('message', msg => {
  if (msg.content.toLowerCase() === ';') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('Noktalı virgül mü ?? Burda her zaman son noktalı virgülü ben koyarım ;'); 
		} else {
		msg.reply('Noktalı virgül mü ?? Burda her zaman son noktalı virgülü ben koyarım ;');
		}
	}
});


client.on('message', msg => {
  if (msg.content.toLowerCase() === '?') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('Soru işareti mi ?? Burda her zaman son soru işaretini ben koyarım ?'); 
		} else {
		msg.reply('Soru işareti mi ?? Burda her zaman son soru işaretini ben koyarım ?');
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '!') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('Ünlem mi ?? Burda her zaman son ünlem i ben koyarım !'); 
		} else {
		msg.reply('Ünlem mi ?? Burda her zaman son ünlem i ben koyarım !');
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'kes') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('Sen kes düdük...'); 
		} else {
		msg.reply('Sen kes düdük...!');
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'hayırdır') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('Hayırsa bacağını ayır!'); 
		} else {
		msg.reply('Hayırsa bacağını ayır!');
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'lan') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('Lan deme lan babam kızıyor!'); 
		} else {
		msg.reply('Lan deme lan babam kızıyor!');
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'mal') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('Koyim de altında kal xd'); 
		} else {
		msg.reply('Koyim de altında kal xd');
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'kerim') {
		if (!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
			msg.author.sendMessage('Kerim e ulaşmak için özelden mesaj göndermelisin'); 
		} else {
		msg.reply('Kerim e ulaşmak için özelden mesaj göndermelisin');
		}
	}
});

client.on('message', msg => {
  if (msg.content === 'discord.gg') {
   msg.delete(30)
    msg.reply('**Reklam Engellendi**');
  }
});

client.on('message', msg => {
  if (msg.content === 'amk') {
   msg.delete(30)
    msg.reply('**Küfür engellendi!**');
  }
});

client.on('message', msg => {
  if (msg.content === 'sik') {
   msg.delete(30)
    msg.reply('**Küfür engellendi!**');
  }
});

client.on('message', msg => {
  if (msg.content === 'sikiş') {
   msg.delete(30)
    msg.reply('**Küfür engellendi!**');
  }
});

client.on('message', msg => {
  if (msg.content === 'oç') {
   msg.delete(30)
    msg.reply('**Küfür engellendi!**');
  }
});

client.on('message', msg => {
  if (msg.content === 'mk') {
   msg.delete(30)
    msg.reply('**Küfür engellendi!**');
  }
});

client.on('message', msg => {
  if (msg.content === 'amcık') {
   msg.delete(30)
    msg.reply('**Küfür engellendi!**');
  }
});

client.on('message', msg => {
  if (msg.content === 'ananı') {
   msg.delete(30)
    msg.reply('**Küfür engellendi!**');
  }
});

client.on('message', msg => {
  if (msg.content === 'piç') {
   msg.delete(30)
    msg.reply('**Küfür engellendi!**');
  }
});

client.on('message', msg => {
  if (msg.content === '0ç') {
   msg.delete(30)
    msg.reply('**Küfür engellendi!**');
  }
});

client.on('message', msg => {
  if (msg.content === 'http://') {
   msg.delete(30)
    msg.reply('**Reklam Engellendi**');
  }
});