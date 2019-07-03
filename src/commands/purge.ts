import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class purge implements IBotCommand {

    private readonly _command = "purge";

    help(): string {
        return "(Admin Only) Deletes the desired number of messages from the channel";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        msgObject.delete(0).catch(console.error);

        if(!msgObject.member.hasPermission("ADMINISTRATOR")){
            msgObject.channel.send(`${msgObject.author.username}, This command is for Admins only`)
            .then(msg => {
                (msg as Discord.Message).delete(5000).catch(console.error);
            });
            return;
        }
        if(!args[0]){
            msgObject.channel.send(`${msgObject.author.username}, Specify the number of messages to delete`)
            .then(msg => {
                (msg as Discord.Message).delete(5000).catch(console.error);
            });
            return;
        }
        let numberOfMessagesToDelete = Number(args[0]);
        if(isNaN(numberOfMessagesToDelete)){
            msgObject.channel.send(`${msgObject.author.username}, That isn't a valid number`)
            .then(msg => {
                (msg as Discord.Message).delete(5000).catch(console.error);
            });
            return; 
        }
        numberOfMessagesToDelete = Math.round(numberOfMessagesToDelete + 1);

        msgObject.channel.bulkDelete(numberOfMessagesToDelete).catch(console.error);
    }


}