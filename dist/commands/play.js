"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('snekfetch');
const url = 'http://inspirobot.me/api?generateFlow=1&sessionID=';
let server = [];
function putarray() {
    return __awaiter(this, void 0, void 0, function* () {
        yield request.get(url).then((res) => {
            let mp3 = JSON.parse(res.text);
            let filesound1 = mp3.mp3;
            console.log(filesound1);
            server.push(filesound1);
        }).catch(console.error());
    });
}
function Play(msgObject, connection) {
    return __awaiter(this, void 0, void 0, function* () {
        yield putarray();
        const dispatcher = connection.playArbitraryInput(server[0]);
        console.log(server);
        dispatcher.on("end", (end) => {
            server.shift();
            Play(msgObject, connection);
        });
    });
}
class play {
    constructor() {
        this._command = "play";
    }
    help() {
        return "Plays audio in your voice channel";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!msgObject.member.voiceChannel) {
                msgObject.reply("You Have to be in a Voice Channel");
                return;
            }
            if (!msgObject.guild.voiceConnection) {
                msgObject.member.voiceChannel.join().then(connection => {
                    Play(msgObject, connection);
                });
            }
        });
    }
}
exports.default = play;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wbGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFHQSxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDckMsTUFBTSxHQUFHLEdBQUcsb0RBQW9ELENBQUM7QUFDakUsSUFBSSxNQUFNLEdBQU8sRUFBRSxDQUFDO0FBQ3BCLFNBQWUsUUFBUTs7UUFDbkIsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1lBQ3JDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBRzNCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQUE7QUFFRCxTQUFlLElBQUksQ0FBQyxTQUEwQixFQUFFLFVBQW1DOztRQUMvRSxNQUFNLFFBQVEsRUFBRSxDQUFDO1FBQ2pCLE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBR2hCLFVBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDOUIsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7Q0FBQTtBQUVELE1BQXFCLElBQUk7SUFBekI7UUFFcUIsYUFBUSxHQUFHLE1BQU0sQ0FBQztJQTJCdkMsQ0FBQztJQXpCRyxJQUFJO1FBQ0EsT0FBTyxtQ0FBbUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUUvRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7Z0JBQ2hDLFNBQVMsQ0FBQyxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztnQkFDckQsT0FBTzthQUNWO1lBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFO2dCQUNsQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQ25ELElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBRWhDLENBQUMsQ0FBQyxDQUFDO2FBRU47UUFDTCxDQUFDO0tBQUE7Q0FHSjtBQTdCRCx1QkE2QkMifQ==