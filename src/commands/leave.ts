import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class leave implements IBotCommand{

    private readonly _command = "leave";

    help(): string {
        return "Leaves your voice channel";
    }   

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        if(!msgObject.guild.voiceConnection){
            msgObject.reply("Not connected to a Channel");
        }
        msgObject.guild.voiceConnection.disconnect();
    }


}