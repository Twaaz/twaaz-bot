const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./token.json");
const ytdl = require("ytdl-core");
const { setTimeout } = require("timers");


// client on
client.on("ready", async () =>{
    console.log("Le bot est allumé");
    client.user.setStatus("dnd");
    setTimeout(() => {
        client.user.setActivity("By Twaaz");
    }, 100) 
});

// join and autorole
client.on("guildMemberAdd", member => {
    client.channels.cache.get("832596725263892480").send(`Bienvenue sur le serveur ${member}!`);
    member.roles.add("832598917383454760");
});

// clear
client.on("message", message => {
    if(message.member.permissions.has("MANAGE_MESSAGES")){
        if(message.content.startsWith("-clear")){
            let args = message.content.split(" ");

            if(args[1] == undefined){
                message.reply("Nombre de message non ou mal défenit. ");
            }
            else {
                let number = parseInt(args[1]);

                if(isNaN(number)){
                    message.reply("Nombre de message non ou mal defenit. ");
                }
                else {
                    message.channel.bulkDelete(number).then(messages => {
                        console.log("Supression de " + messages.size + " messages réussi !");

                    }).catch(err => {
                        console.log("Erreur de clear :" + err);
                    });
                }
            }
        }
    }
})

// musique
client.on("message", message => {
    if(message.content.startsWith("-play")){
        if(message.member.voice.channel){
            message.member.voice.channel.join().then(connection => {
                let args = message.content.split(" ");
                
                let dispatcher = connection.play(ytdl(args[1], { quality: "highestaudio" }));

                dispatcher.on("finish", () => {
                    dispatcher.destroy();
                    connection.disconnect();
                })

                dispatcher.on("error", err => {
                    console.log("erreur de dispatcher");
                })
            }).catch(err =>{
                message.reply("Erreur lors de la connexion : " + err);
            })
        }
        else {
            message.reply("Vous n'êtes pas connecté en vocal. ");
        }
    }
});

// Ban + Mute Unmute + TempMute "Ban + tempmute bug"
client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(message.member.permissions.has("ADMINISTRATOR")){
        if(message.content.startsWith("-ban")){
            let mention = message.mentions.members.first();

            if(menton == undefined){
                message.reply("Membre non ou mal mentionné. ");
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " a été banni avec succès. ");
                }
                else {
                    message.reply("Impossible de bannir ce membre. ");
                }
            }
        }
        else if(message.content.startsWith("-kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre no ou mal mentionné. ");
            }
            else {
                if(mention.kickable){
                    mention.kick();
                    message.channel.send(mention.displayName +  " a été kick avec succès")
                }
                else {
                    message.reply("Impossible de kick ce membre. ");
                }
            }
        }
        else if(message.content.startsWith("-mute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné. ");
            }
            else {
                mention.roles.add("845635218534432778");
                message.reply(mention.displayName + " a été mute avec succès. ");
            }
        }
        else if (message.content.startsWith("-unmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre mal ou non mentionné. ");
            }
            else {
                mention.roles.remove("845635218534432778");
                message.reply(mention.displayName + " unmute avec succès. ");
            }
        }
        else if(message.content.startsWith("tempmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné. ");
            }
            else {
                let args = message.content.split(" ");

                mention.roles.add("845635218534432778");
                setTimeout(function(){
                    mention.roles.remove("845635218534432778")
                    message.channel.send("<@" + mention.id + "> tu peux désormais parler de nouveau !");
                }, args[2] * 1000); 
            }
        }
    }
});

// Embed help
client.on("message", message => {
    if(message.author.bot) return;


    if(message.content == "-help"){
    var help = new Discord.MessageEmbed()
        .setColor("#A51F07")
        .setTitle("**Liste des Commandes !**")
        .setURL("https://twitter.com/TwaazFx")
        .setAuthor("Twaaz !", "https://imgur.com/gallery/8nLFCVP",  "https://twitter.com/TwaazFx")
        .setDescription("Liste des commandes du bot discord ShacoBot")
        .addField("\u200B", "\u200B", false)
        .addField("🔨-modo", "Commandes moderations")
        .addField("🎵-music", "Commandes musiques")
        .addField("🔗-liens", "Mes réseaux")

    message.channel.send(help);
    }
});
// Embed Modo
client.on("message", message => {
    if(message.author.bot) return;


    if(message.content == "-modo"){
    var help = new Discord.MessageEmbed()
        .setColor("#A51F07")
        .setTitle("**Liste des Commandes !**")
        .setURL("https://twitter.com/TwaazFx")
        .setAuthor("Twaaz !", "https://imgur.com/gallery/8nLFCVP",  "https://twitter.com/TwaazFx")
        .setDescription("Liste des commandes moderation")
        .addField("\u200B", "\u200B", false)
        .addField("🧹-clear", "Efface les message")
        .addField("🔨-ban", "Ban un membre du serveur")
        .addField("🦶-kick", "Expulser un membre du serveur")
        .addField("🔇-mute & -unmute", "Mute ou unmute un membre du serveur")
        .addField("⏱-tempmute", "Mute temporairement un membre du serveur")

    message.channel.send(help);
    }
});
// Embed Music
client.on("message", message => {
    if(message.author.bot) return;


    if(message.content == "-music"){
    var help = new Discord.MessageEmbed()
        .setColor("#A51F07")
        .setTitle("**Liste des Commandes !**")
        .setURL("https://twitter.com/TwaazFx")
        .setAuthor("Twaaz !", "https://imgur.com/gallery/8nLFCVP",  "https://twitter.com/TwaazFx")
        .setDescription("Liste des commandes musique")
        .addField("\u200B", "\u200B", false)
        .addField("🎶-play", "Lancer la musique ")
        .addField("others", "le reste des commandes arrive bientot !")


    message.channel.send(help);
    }
});
// Embed liens
client.on("message", message => {
    if(message.author.bot) return;


    if(message.content == "-liens"){
    var help = new Discord.MessageEmbed()
        .setColor("#A51F07")
        .setTitle("**Liste des Commandes !**")
        .setURL("https://twitter.com/TwaazFx")
        .setAuthor("Twaaz !", "https://imgur.com/gallery/8nLFCVP",  "https://twitter.com/TwaazFx")
        .setDescription("Mes réseaux")
        .addField("\u200B", "\u200B", false)
        .addField("🐦Twitter", "https://twitter.com/TwaazFx")
        .addField("📷Instagram", "https://instagram.com/m")

    message.channel.send(help);
    }
});

client.login(config.token);