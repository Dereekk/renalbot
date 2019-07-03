import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class join implements IBotCommand{

    private readonly _command = "join";

    help(): string {
        return "Joins your voice channel";
    }   

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        if(!msgObject.member.voiceChannel){
            msgObject.reply(msgObject.author.id);
            return;
        }
        if(!msgObject.guild.voiceConnection){
            msgObject.member.voiceChannel.join()
                    .then(connection => {
                        msgObject.reply(msgObject.member.voiceChannel.id);
                    })
        }
    }


}