import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class poll implements IBotCommand{

    private readonly _command = "poll";

    help(): string {
        return "Creates a poll";
    }   

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        

    }
}