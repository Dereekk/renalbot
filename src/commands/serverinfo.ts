import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class serverinfo implements IBotCommand{

    private readonly _command = "serverinfo";

    help(): string {
        return "This command does nothing";
    }   

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        let embed = new Discord.RichEmbed()
                        .setColor('RANDOM')
                        .setTitle("Server Info")
                        .setFooter("This is pretty cool, right")
                        .setImage(client.user.avatarURL)
                        .addField("Server Cound: ", `${msgObject.guild.memberCount}`)
                        .setDescription("Welcome")
                         

        msgObject.channel.send(embed).then(console.log).catch(console.error);
    }


}