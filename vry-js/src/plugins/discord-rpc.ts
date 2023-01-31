import {
	OnStateInGame,
	OnStateMenus,
	OnStatePreGame,
	TablePlugin,
} from "../table/types/plugin.js";
const clientId = "997597381455519796";
import DiscordRPC from "discord-rpc";
const client = new DiscordRPC.Client({ transport: 'ipc' });
DiscordRPC.register(clientId);

var rpc = {
    details: "Test1",
    state: "Test2",
    startTimestamp: Date.now(),
    largeImageKey: "icon",
    largeImageText: "VALORANT",
    smallImageKey: "icon",
    smallImageText: "Test4",
    buttons: [
        {
            label: "What's This? 👀",
            url: "https://github.com/tanishqmanuja/valo-kit"
        },
    ]
};

client.on("ready", async() =>{
    updateActivity();
    setInterval(() => {
        updateActivity();
    }, 15 * 1000)
})

client.login({ clientId }).catch(err => console.error(err));

function updateActivity() {
    if(!client) return;
    client.setActivity({
        details: rpc.details,
        state: rpc.state,
        startTimestamp: rpc.startTimestamp,
        largeImageKey: rpc.largeImageKey,
        largeImageText: rpc.largeImageText,
        smallImageKey: rpc.smallImageKey,
        smallImageText: rpc.smallImageText,
        buttons: rpc.buttons
    })
}

export default class DiscordRpcPlugin
	extends TablePlugin
	implements OnStateMenus, OnStatePreGame, OnStateInGame
{
	static id = "discord-rpc";
	name = "Discord Rich Presence";


    async onStateMenus() {
        const { api, presences } = this.table.context;
		const players = api.helpers.getMyPartyPlayersPresences(presences);
        const host = players[0];
        rpc.largeImageText = "VALORANT - " + "STATE"
        if(host.private.partyAccessibility == 'CLOSED'){
            rpc.state = "Closed Party (" + host.private.partySize + " of " + host.private.maxPartySize + ")"
        } else {
            rpc.state = "Not Closed"
        }
        updateActivity();
    }

	async onStatePreGame() {
		
	}

	async onStateInGame() {
		
	}

}
