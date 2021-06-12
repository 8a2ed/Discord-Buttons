const discord = require('discord.js');
const client = new discord.Client();
const db = require("quick.db")
const disbut = require('discord-buttons')
disbut(client);
///
const prefix = 'PREFIX'; ////// !!!!!!!!!!
client.login('TOKEN'); ////// !!!!!!!!!!
///
/// READY ///
client.on('ready', () => {
    console.log(`${client.user.tag}`);
    client.user.setActivity(`Buttons`);
});
///
client.on('message', message => {
    if (message.content.startsWith(prefix + "set")) {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`${message.author.username},  You do not have \`MANAGE_CHANNELS\``);
        let ch = message.mentions.channels.first();
        if (!ch) return message.channel.send(`I can't find this channel`);
        db.set(`channel_${message.guild.id}`, ch.id);
        message.channel.send(`The channel has been set to ${ch}.`)
    }
});
///
client.on('clickButton', async (button) => {
    if (button.id === "click_to_function") {
        button.channel.send(`Agree`)
    } else if (button.id === "click_to_functionn") {
        button.channel.send(`Disagree`);
    }
});
///
client.on('message', async message => {
    if (message.content.startsWith(prefix + "send")) {
        if (message.author.bot) return;
        if (message.channel.type === "dm") return;
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`${message.author.username},  You do not have \`MANAGE_CHANNELS\``);
        const cc = db.get(`channel_${message.guild.id}`);
        const channel = message.guild.channels.cache.get(cc)
        if (cc != null && channel.id === cc) {
            let button = new disbut.MessageButton()
                .setStyle('green')
                .setLabel('I agree')
                .setID('click_to_function')
            let button2 = new disbut.MessageButton()
                .setLabel("I don't agree")
                .setStyle("red")
                .setID("click_to_functionn")

            let buttonRow = new disbut.MessageActionRow()
                .addComponent(button)
                .addComponent(button2)
            channel.send('Follow the rules !', buttonRow);


        } else {
            message.channel.send(`Invalid channel`)
        }
    }
})
