import * as Discord from "discord.js";
import { IBotCommand } from "../api";

const request = require('snekfetch');
const url = 'http://inspirobot.me/api?generateFlow=1&sessionID=';
let server:any = [];
async function putarray(){
    await request.get(url).then((res: any) => {
        let mp3 = JSON.parse(res.text);
        let filesound1 = mp3.mp3;
        console.log(filesound1);
        server.push(filesound1)

        
    }).catch(console.error());
}

async function Play(msgObject: Discord.Message, connection: Discord.VoiceConnection) {
    await putarray();
    const dispatcher = connection.playArbitraryInput(server[0]);
    console.log(server);
    

        dispatcher.on("end", (end: any) => {
            server.shift();
            Play(msgObject, connection);
        });
}

export default class play implements IBotCommand {

    private readonly _command = "play";

    help(): string {
        return "Plays audio in your voice channel";
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        if (!msgObject.member.voiceChannel) {
            msgObject.reply("You Have to be in a Voice Channel");
            return;
        }

        if (!msgObject.guild.voiceConnection) {
            msgObject.member.voiceChannel.join().then(connection => {
                Play(msgObject, connection);
                
            });

        }
    }


}
