import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class kick implements IBotCommand {

    private readonly _command = "kick";

    help(): string {
        return "(Admin Only) Kicks the Mentioned user";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        let mentionUser = msgObject.mentions.users.first();
        let suppliedReasons = args.slice(1).join(" ") || "";
        let kickLog = `${msgObject.author.username}: ${suppliedReasons}`;

        msgObject.delete(0).catch(console.error);

        if (!msgObject.member.hasPermission("ADMINISTRATOR")) {
            msgObject.channel.send(`${msgObject.author.username}, you don't have permission!`)
                .then(msg => {
                    (msg as Discord.Message).delete(5000).catch(console.error);
                });
            return;
        }
        if (!mentionUser) {
            msgObject.channel.send(`${msgObject.author.username}, I couldn't find that user`)
                .then(msg => {
                    (msg as Discord.Message).delete(5000).catch(console.error);
                });
            return;
        }



        msgObject.guild.member(mentionUser).kick(kickLog).then(console.log).catch(console.error)
    }


}