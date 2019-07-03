import * as Discord from "discord.js";
import * as ConfigFile from "./config";
import { IBotCommand } from "./api";



const client: Discord.Client = new Discord.Client();


let commands: IBotCommand[] = [];


loadCommands(`${__dirname}/commands`);


client.on("ready", () => {
    console.log("Ready")
    client.user.setActivity("How much patience I have towards the world", { type: "WATCHING" });
});
client.on("guildMemberAdd", member => {

    let welcomeChannel = member.guild.channels.find(channel => channel.name === "welcome") as Discord.TextChannel;
    welcomeChannel.send(`Welcome ${member.displayName}!`);

    let memberRole = member.guild.roles.find(role => role.id == "");
    member.addRole(memberRole);

    member.send("Sup");
});
client.on("guildMemberRemove", member => {

    let welcomeChannel = member.guild.channels.find(channel => channel.name === "welcome") as Discord.TextChannel;
    welcomeChannel.send(`Bye, ${member.displayName}`);
});

client.on("message", msg => {
    if (msg.author.bot) { return; }
    if (!msg.content.startsWith(ConfigFile.config.prefix)) { return; }
    if (msg.channel.type == "dm") { return; }

    handleCommand(msg);
});

async function handleCommand(msg: Discord.Message) {
    let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "").toLowerCase();
    let args = msg.content.split(" ").slice(1);

    for (const commandClass of commands) {

        try {

            if (!commandClass.isThisCommand(command)) {
                continue;
            }

            await commandClass.runCommand(args, msg, client);
        }
        catch (exception) {
            console.log(exception);
        }
    }
}

function loadCommands(commandsPath: string) {
    if (!ConfigFile.config || (ConfigFile.config.commands as string[]).length === 0) { return; }

    for (const commandName of ConfigFile.config.commands as string[]) {
        const commandClass = require(`${commandsPath}/${commandName}`).default;

        const command = new commandClass() as IBotCommand;

        commands.push(command);
    }
}

client.login(ConfigFile.config.token).catch(console.error);