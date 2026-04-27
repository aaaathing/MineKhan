// Use both tcp and no tcp, they are both reliable
window.iceServers = [
	{'urls': 'stun:stun.l.google.com:19302'},
	{ urls: "stun:stun.nextcloud.com:443" },
	{urls: "turn:turn.jami.net",username: "ring",credential: "ring"},
	{urls:"turn:stun.ppzhilian.com",username:"bshu",credential:"bshu1211"},
	{urls:"turn:turn.wildfirechat.net:3478",username:"wfchat",credential:"wfchatpwd"},
	{urls: ["turn:turn.evan-brass.net","turn:turn.evan-brass.net?transport=tcp","turns:turn.evan-brass.net:443?transport=tcp"],username: "guest",credential: "password"},
	{"urls":"turn:turn.fsharechat.cn:3478","username":"comsince","credential":"comsince"},
	{"urls":"turn:api.crossdesk.cn:3478","username":"crossdesk","credential":"crossdeskpw"},
	{"urls":"turn:gitclone.com:3478","username":"webrtc","credential":"Webrtc987123654"},
]

// see for more servers and code to connect: https://github.com/dmotz/trystero

window.signalingServers = {
	"achex":{
		// connect(isHost, myId, messageCallback) => {send(recipient,data), sendAll(data), ws, close()}
		// isHost: join hub and receive offers; !isHost: get user list for world discovery
		// send: host uses session id (toS), client uses user id (to)
		// sendAll: broadcast to hub
		connect:function({id,onopen,onmessage,onclose,onerror,onlist}){
			if(!onerror) onerror = onclose
			let ws=new WebSocket("wss://cloud.achex.ca")
			const rawSend=d=>ws.send(JSON.stringify(d))
			ws.onopen=()=>{
				rawSend({auth:id})
				rawSend({joinHub:"minekhan"})
				if(onopen) onopen()
			}
			ws.onmessage=msg=>{
				if(typeof msg.data !== "string") return
				let data = JSON.parse(msg.data)
				if(data.auth === "FAILED"){
					return onerror("connection failed: "+data.REASON)
				}else if(data.users){
					for(let i of data.users){
						if(onlist && i.hub === "minekhan") onlist(i.username)
					}
				}
				onmessage(data)
			}
			ws.onclose=onclose
			ws.onerror=onerror
			return{
				send:(data,to)=>rawSend({...data,to}),
				sendAll:data=>rawSend({...data,toH:"minekhan"}),
				list:()=>rawSend({serverstat:true}),
				close:()=>ws.close()
			}
		}
	},
	"mosquitto":{
		name:"mosquitto", url:"wss://test.mosquitto.org:8081", connect:connectMQTT
	},
	"shift":{
		name:"shift", url:"wss://public:public@public.cloud.shiftr.io", connect:connectMQTT
	}
}
function connectMQTT({id, onopen, onmessage, onclose, onerror}){
	// Uses mqtt.js over WSS. Topics: minekhan/hub (broadcast), minekhan/direct/<id> (direct)
	// FROM field is included in payload since MQTT doesn't add it automatically
	if(!onerror) onerror = onclose
	let client, endClient
	;(async()=>{
		let mqtt
		try{ mqtt = await import("https://cdn.jsdelivr.net/npm/mqtt@5/dist/mqtt.esm.js") }
		catch(e){ return onerror("Failed to load mqtt: "+e) }
		if(!mqtt) return onerror("mqtt undefined")
		mqtt = mqtt.default
		if(endClient) return
		client = mqtt.connect(this.url, {clientId:id, reconnectPeriod:0})
		client.on("connect", ()=>{
			client.subscribe(["mk/i/"+id, "mk/a"], err=>{
				if(err) return onerror(this.name+" subscribe failed: "+err)
				if(onopen) onopen()
			})
		})
		client.on("message", (topic, msg)=>{
			let data
			try{ data = JSON.parse(msg.toString()) }
			catch(e){ console.error(this.name+" parse error",e) }
			if(data) onmessage(data)
		})
		if(onclose) client.on("close", onclose)
		client.on("error", e=>onerror(this.name+" error: "+e))
	})()
	const pub = (topic, data)=>client.publish(topic, JSON.stringify({...data, FROM:id}))
	return{
		send:(data, to)=>pub("mk/i/"+to, data),
		sendAll:data=>pub("mk/a", data),
		close:()=>{if(client){client.end()}else{endClient=true}}
	}
}
