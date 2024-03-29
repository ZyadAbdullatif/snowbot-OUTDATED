const Discord = require('discord.js');
const moment = require("moment");  
const fs = require("fs");      
const dateFormat = require('dateformat');
const client = new Discord.Client(); 
const Canvas = require("canvas"); //npm i canvas
const prefix = "." // برفكس
let profile = JSON.parse(fs.readFileSync("profile.json", "utf8"))

// Snow Bot By: Zy4d.js#0149
client.on('ready', () => {
    client.user.setGame(`.help | Credit Maintance`, 'https://twitch.tv/Snow-Bot');
    console.log('Always Ready To Help!');
});
	client.on('message', message => {//Servers
     if (message.content === ".servers") {
     let embed = new Discord.RichEmbed()
  .setColor("#0000FF")
  .addField("**Server: **" , client.guilds.size)
  message.channel.sendEmbed(embed);
    }
	});
client.on('message', message => {
    if (message.content === ".top5") {
        const top = client.guilds.sort((a, b) => a.memberCount - b.memberCount).array().reverse()
     let tl = "";
      for (let i=0;i<=5;i++) {
          if (!top[i]) continue;
         tl += i+" - "+top[i].name+" : "+top[i].memberCount+"\n"
      }
      message.channel.send(tl)
    }
});
client.on('message', message => {
    if (message.content === ".Top5") {
        const top = client.guilds.sort((a, b) => a.memberCount - b.memberCount).array().reverse()
     let tl = "";
      for (let i=0;i<=5;i++) {
          if (!top[i]) continue;
         tl += i+" - "+top[i].name+" : "+top[i].memberCount+"\n"
      }
      message.channel.send(tl)
    }
});
client.on("message", (message) => {
   if (message.content.startsWith(".new")) {     
        const reason = message.content.split(" ").slice(1).join(" ");     
        if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
        if (message.guild.channels.exists("name", "ticket-{message.author.id}" + message.author.id)) return message.channel.send(`You already have a ticket open.`);    
        message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
            let role = message.guild.roles.find("name", "Support Team");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });    
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            message.channel.send(`:white_check_mark: **تم إنشاء تذكرتك ، #${c.name}.**`);
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .addField(`مرحباّ ${message.author.username}!`, `يرجى محاولة شرح سبب فتح هذه التذكرة بأكبر قدر ممكن من التفاصيل. سيكون فريق الدعم لدينا قريبا للمساعدة.`)
                .setTimestamp();
            c.send({
                embed: embed
            });
        }).catch(console.error);
    }
 
 
  if (message.content.startsWith(".close")) {
        if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
 
        message.channel.send(`هل أنت متأكد؟ بعد التأكيد ، لا يمكنك عكس هذا الإجراء!\n للتأكيد ، اكتب\`.confirm\`. سيؤدي ذلك إلى مهلة زمنية في غضون 10 ثوانٍ وإلغائها`)
            .then((m) => {
                message.channel.awaitMessages(response => response.content === '.confirm', {
                        max: 1,
                        time: 10000,
                        errors: ['time'],
                    })   
                    .then((collected) => {
                        message.channel.delete();
                    })    
                    .catch(() => {
                        m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
                            m2.delete();
                        }, 3000);
                    });
            });
    }
 
});
client.on('message', msg => {//Invite
    if (msg.content === '.invite') {
        msg.reply('[ https://discordapp.com/api/oauth2/authorize?client_id=556104007702020109&permissions=8&scope=bot ]');
    }
});
client.on('message', msg => {//Invite
    if (msg.content === '.support') {
        msg.reply('[ https://discord.gg/n23HUZk ]');
    }
});
client.on("message", message => {//Ping
    if (message.content === ".ping") {
        const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .addField('**Ping:**', `${Date.now() - message.createdTimestamp}` + ' ms')
        message.channel.sendEmbed(embed);
        
    }
});
client.on('message', message => {//help
    if (message.author.bot) return;
     if (message.content === ".help") {
         message.react("✅")




        message.author.sendMessage(`
**:snowflake:Snow Bot Commands List:snowflake:**
 
__**Member Commands**__
 
❖**.invite** - رابط دعوة البوت
❖**.support** - رابط سيرفر المساعدة للبوت
❖**.ping** - يضهرلك بنقك
❖**.servers** - Snow Bot يضهرلك عدد السيرفرات التي اضافت 
❖**.id** - يضهرلك معلومات حسابك
❖**.about** - يضهرلك معلومات السيرفر
❖**.new** - انشاء تذكرة
❖**.close** - اغلاق التذكرة
❖**.credit** - معرفة عدد الكريدت الخاص بك
❖**.daily** - الحصول على عدد معين من الكريدت ما بين فترة و فترة
❖**.trans** - ارسال عدد من الكريدت الى اي شخص انت تحدده
❖**.top5** - Snow Bot اكثر خمسة سيرفرات فيها اعضاء ضايفة 

__**Admin Commands**__
❖**.bc** -  (امر البرود كاست (ارسال رسالة لجميع اعضاء السيرفر 
❖**.pbc** -  (امر البرود كاست بشكل مطور (ارسال رسالة لجميع اعضاء السيرفر 
❖**.clear** - (امر الكلير (حذف جميع الرسايل في الروم الذي كتب فيه الامر
❖**.ban** - (امر الباند (طرد شخص من السيرفر
❖**.kick** - (امر الكيك (طرد شخص من السيرفر
  `);
      message.delete(1500);

  }
  });
	client.on("message", message => {//chatclear
    var prefix = ".";
 
            var args = message.content.substring(prefix.length).split(" ");
            if (message.content.startsWith(prefix + "clear")) {
   if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
   message.react("✅")
        var msg;
        msg = parseInt();
      
      message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
            message.delete(1500);
                          }

     
});
var Prefix = ".";
client.on('message', message => {//about
    if(message.content == prefix + 'about') {
		var servername = message.guild.name
        var اونر = message.guild.owner
        var اعضاء = message.guild.memberCount
        var بلدالسيرفر = message.guild.region
        var الرومات = message.guild.channels.size
        var الرتب = message.guild.roles
        var عمل = message.guild.createdAt
        var الروم = message.guild.defaultChannel
        var server = new Discord.RichEmbed()
        .setThumbnail(message.guild.iconURL)
        .addField('اسم السيرفر', servername)
        .addField('أعضاء السيرفر', اعضاء)
        .addField('رومات السيرفر', الرومات)
        .addField('صاحب السيرفر', اونر)
        .addField('تاريخ افتتاح السيرفر', عمل)
        .setColor('RANDOM')

        message.channel.sendEmbed(server)
    }
});
client.on('message', message => {//Probc
              if(!message.channel.guild) return;
    if(message.content.startsWith('.pbc')) {
    if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
  if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`' );
    let args = message.content.split(" ").join(" ").slice(3 + prefix.length);
    let copy = "Snow Bot";
    let request = `Requested By ${message.author.username}`;
    if (!args) return message.reply('**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**');message.channel.send(`**هل أنت متأكد من إرسالك البرودكاست؟ \nمحتوى البرودكاست:** \` ${args}\``).then(msg => {
    msg.react('✅')
    .then(() => msg.react('❌'))
    .then(() =>msg.react('✅'))
    
    let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
    let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
	      let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 20000 });
    let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 20000 });
    reaction1.on("collect", r => {
    message.channel.send(`تم ارسال البرودكاست الى ${message.guild.members.size} عضو | ✅`).then(m => m.delete(5000));
    message.guild.members.forEach(m => {
    var pbc = new
       Discord.RichEmbed()
       .setColor('RANDOM')
       .setTitle('Broadcast')
       .addField('Server', message.guild.name)
       .addField('Sender', message.author.username)
       .addField('Message', args)
       .setThumbnail(message.author.avatarURL)
       .setFooter(copy, client.user.avatarURL);
    m.send({ embed: pbc })
    msg.delete();
    })
    })
    reaction2.on("collect", r => {
    message.channel.send(`**Broadcast Canceled.**`).then(m => m.delete(5000));
    msg.delete();
    })
    })
    }
    });
client.on("message", (message) => {//Ban
    if (message.content.startsWith(".ban ")) {
      if(!message.member.hasPermission('BAN_MEMBERS')) return;
	  message.delete(1500);
        var member= message.mentions.members.first();
        member.ban().then((member) => {
            message.channel.send(member.displayName + "لقد التبنيد بنجاح :ok_hand: ");
        }).catch(() => {
            message.channel.send(":x: هناك خطاء حاول مره أخرى:x: ");
        });
    }
});
client.on("message", (message) => {//Kick
    if (message.content.startsWith(".kick ")) {
      if(!message.member.hasPermission('KICK_MEMBERS')) return;
	  message.delete(1500);
        var member= message.mentions.members.first();
        member.kick().then((member) => {
            message.channel.send(member.displayName + " لقد تم طرده بنجاح :ok_hand: ");
        }).catch(() => {
            message.channel.send(":x: هناك خطاء حاول مره أخرى:x: ");
        });
    }
});
client.on('message', message => {//Broadcast
if (message.content.split(' ')[0] == '.bc')
 message.guild.members.forEach( member => {
         if (!message.member.hasPermission("ADMINISTRATOR"))  return;
		 message.react("✅")
member.send( `${member}, ` + message.content.substr(3));
                                                            message.delete(1500);
															
});
});
client.on('message', message => {//ID
     if (message.content === ".id") {
     let embed = new Discord.RichEmbed()
  .setThumbnail(message.author.avatarURL) 
  .setColor("#9B59B6")
  .addField("اســـم الحســاب", `${message.author.username}`)
  .addField('كود الحساب الخاص', message.author.discriminator)
  .addField("الرقـــم الشـــخصي", message.author.id)
  .addField("تاريخ التسجيل", message.author.createdAt)
     
     
  message.channel.sendEmbed(embed);
    }
});

client.login(process.env.BOT_TOKEN);
