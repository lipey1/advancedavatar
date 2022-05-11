const { MessageAttachment } = require("discord.js");
const { profileImage } = require("discord-arts");
const userCooldowns = new Map();
const config = require('../../config.json')
const Discord = require('discord.js')


module.exports = {
    name: 'perfil',
    aliases: ["usuário", "avatar", "foto", "user"],
    author: 'lipey',



    run: async (client, message, args) => {

        let ChannelID = message.channel.id  
        if(ChannelID !== config.canalcomandos ){
            let embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true}) })
            .setDescription(`> **Alerta**\n\n> Não é **permitido** o uso de comandos nesse canal\n\n> Utilize o canal <#${config.canalcomandos}>`)
            .setTimestamp();
            
             message.reply({embeds: [embed]}).then(msg => {
                message.delete()
                setTimeout(() => msg.delete(), 5000) 
             });
             return
        }
             

    const userCooldown = userCooldowns.get(message.author.id);

    const remainingTime = Math.floor((userCooldown - Date.now()) / 1000);


    if(userCooldown) {
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`> **Avatar**\n\n> Você usou este comando **recentemente**\n> Tente novamente em **${remainingTime}s** `)
        message.reply({ embeds: [embed] });
        return

      } else {

            if(message.author.bot) return;
    
            const discordUser = message.mentions.users.first() || message.author;
            const bufferImg = await profileImage(discordUser);
            const imgAttachment = new MessageAttachment(bufferImg, "profile.png");
    
            message.channel.send({ files: [imgAttachment] });
        
        


userCooldowns.set(message.author.id, Date.now() + 30000);
setTimeout(() => userCooldowns.delete(message.author.id), 30000);
      }}}
