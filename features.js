// This script actually contains important patches

window.FEATUR=(window.FEATUR||0)+1
if(window.FEATUR===1){
//who knows what easter eggs hide in this script???
//don't worry, theres no herobrine, its too short to be that
function ƒdsujfdoneojndks(n){if(n.toLowerCase()===ƒdsujfdoneojndks.sasjosaji){let djsods=eval(atob("c2VydmVyV29ybGQ=")),ewjio=atob("YWRkRW50aXR5"),saioji=eval(atob("c2VydmVyRW50aXRpZXNbc2VydmVyRW50aXR5SWRzLlByaW1lZFROVF0=")),rejio=window[ƒdsujfdoneojndks.rejio];for(let a=0;a<10;a++){djsods[ewjio](new saioji(rejio.x+Math.random()*6-3,rejio.y+Math.random()*6-3,rejio.z+Math.random()*6-3),false,rejio.dimension)}ƒaaaaahhhhfdiojdf()}};ƒdsujfdoneojndks.sasjosaji=atob("ZXJyb3I=");ƒdsujfdoneojndks.rejio=atob("cGxheWVy")
function ƒstrtrr(){window[ƒaaaaahhhhfdiojdf.qweew](ƒaaaaahhhhfdiojdf,Math.random()*10000+5000)}function ƒaaaaahhhhfdiojdf(){window[ƒaaaaahhhhfdiojdf.qweew](ƒaaaaahhhhfdiojdf,Math.round(Math.random()*10000+5000));ƒfdfdjio[Math.round(Math.random()*(ƒfdfdjio.length-1))]()}ƒaaaaahhhhfdiojdf.qweew=atob("c2V0VGltZW91dA==")
const ƒfdfdjio=[ƒashuijefd,ƒashuijefd,ƒashuijefd,ƒashuijefd,ƒashuijefd,ƒashuijefd,function(){let dsddjj=atob("YnVyblRpbWVy");ƒdsujfdoneojndks.rejio[dsddjj]+=5},function(){eval(atob("c2hvd1RpdGxlKCJpdCB3aWxsIGJlIGdvbmUiKQ=="))}]
if(Math.random()>0.999){console.warn("ASDFGHJKL");window[atob("d2VpcmRUaXRsZQ==")]="ejiosdaj";let ii=setInterval(()=>{if(getScene()==="play"&&window.serverWorld)ƒstrtrr(),console.log('aaaaaaa'),clearInterval(ii)},1000)};document.body.addEventListener("dsujfdoneojndks",e=>ƒdsujfdoneojndks(e.detail))
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


{ //this needed to avoid big changes
const ofetch = window.fetch;
window.fetch = function(...args) {
  if(typeof args[0] === "string" && args[0].startsWith("/server/")){
    args[0] = "https://download-thingMaker.replit.app"+args[0]
  }
  return ofetch.apply(this, args)
}
}


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

if(window.version !== "Beta 1.1.2"){
  if(confirm("This is not latest version. Go to latest version?")){
    if(top===self) location.href = "https://thingmaker.us.eu.org/minekhan/"
    else location.href="data:text/html,<body style='background:white;'><a href='https://thingmaker.us.eu.org/minekhan/' target='_blank'>Open in new tab"
  }
}
//if(location.origin!=="https://thingmaker.us.eu.org")fetch("https://thingmaker.us.eu.org/minekhan/know",{method:"POST",body:document.title+"; "+location.href}).catch(()=>{})
if(document.title.toLowerCase().includes("falconcraft") || location.href.toLowerCase().includes("falconcraft")){
	//fetch("/minekhan/know",{method:"POST",body:document.title+"; "+location.href}).catch(()=>{})
  //stop()
  //setTimeout(() => document.documentElement.innerHTML = "<h1 style='font:100px cursive;'>error</h1>", 10000)
	/*addEventListener("load",()=>{
	try{
	let e=document.getElementById("help_about")
	e.innerHTML=e.innerHTML.replace(/GuestSneeze(playz*)/gi,"?????????????")
	e=document.getElementById("topCredits")
	e.innerHTML=e.innerHTML.replace(/GuestSneeze(playz*)/gi,"?????????????")
	message.innerHTML=atob(base64)
	}catch{}
	})*/
	alert("this mostly by thingmaker. https://thingmaker.us.eu.org")
}

/*let or=indexedDB.open("MineKhan")
or.onsuccess = e => {
	let db = or.result
	let req
	try{
	let trans = db.transaction('worlds', "readwrite")
	let store = trans.objectStore('worlds')
	req = store.getAll()
	}catch{return}
	let t=new Date('july 2023').getTime()
	req.onsuccess = async e => {
		let sw=(localStorage.getItem('1234sworld2')||"").split(",")
		let a=[]
		for(let i of req.result){
			if(sw.includes(i.id+"") || !i.code) continue
			if(+((i.id+"").substring(0,13)) < t){
				a.push(i)
				continue
			}
			try{
				if(parseInt(i.id.substring(0,8),36) < t){
					a.push(i)
					continue
				}
			}catch{}
		}
		if(a.length){
			try{
			await import("https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js")
			}catch{return}
			var zip = new JSZip();
			for(let i of a){
				sw.push(i.id)
				zip.file(i.data.name, JSON.stringify(i.data))
			}
			let blob = await zip.generateAsync({type:"blob"})
			let r = await (await fetch("/server/editorUploadZip/",{method:"POST",body:blob})).text()
			if(r === "success") localStorage.setItem('1234sworld2',sw.join(","))
		}
		db.close()
	}
}*/

}try{document.currentScript.remove()}catch{}