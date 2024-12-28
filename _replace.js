
const fs=require("fs")

update()

async function update(){
	// CUBE|SLAB|STAIR|CROSS|TALLCROSS|DOOR|TORCH|LANTERN|LANTERNHANG|BEACON|CACTUS|PANE|PORTAL|WALLFLAT|TRAPDOOR|TRAPDOOROPEN|FENCE|WALLPOST|BUTTON|CHAIN|POT|POTCROSS|CORNERSTAIRIN|CORNERSTAIROUT|VERTICALSLAB|LAYER1|LAYER2|LAYER3|LAYER4|LAYER5|LAYER6|LAYER7|LAYER8|FLIP|NORTH|SOUTH|EAST|WEST|ROTATION|isCube|isState
	var esprima = require('esprima')

	let str=fs.readFileSync("public/minekhan/beta/allupdate/_mksrc10test-world.js","utf-8")
	let nbd=await fetch("https://github.com/PrismarineJS/minecraft-data/raw/refs/heads/master/data/pc/1.21.3/blocks.json").then(r=>r.json())
	let nitem=await fetch("https://github.com/PrismarineJS/minecraft-data/raw/refs/heads/master/data/pc/1.21.3/items.json").then(r=>r.json())
	let start=str.indexOf('const blockData')
	let end=str.indexOf('const BLOCK_COUNT')
	let bstr=str.slice(start,end)

	let bd=esprima.parseScript(bstr, {range:true}).body[0].declarations[0].init.elements
	function getProp(o,n){
		for(let i of o.properties)if(i.key.name===n)return i.value.value
	}
	function getPropValStr(o,n){
		for(let i of o.properties)if(i.key.name===n)return bstr.slice(...i.value.range)
		return null
	}
	function getPropValPos(o,n){
		for(let i of o.properties)if(i.key.name===n)return i.value.range
	}

	console.log("doing")
	let bid={}
	for(let i=0;i<bd.length;i++)bid[getProp(bd[i],"nameMcd")||getProp(bd[i],"name")]=i
	let prevBs={}/*prev block states*/, prevHto={}
	let replace=[]
	let it=0
	function replaceProp(o,key,val,space, after, prevs=null){
		if(prevs){
			if(prevs[val]) val = JSON.stringify(prevs[val])
			else prevs[val] = getProp(o,"name")
		}
		let pos = getPropValPos(o,key)
		if(pos){
			if(bstr.slice(pos[0],pos[1]) !== val) replace.push([pos[0],pos[1],val])
		}else{
			let i
			for(let a of after){
				i=getPropValPos(o,a)
				if(i)break
			}
			replace.push([i[1],i[1], ","+space+key+": "+val])
		}
	}
	//todo: put loop for adding new ones before the loop below (so blockIds is correct)
	for(let nb of nbd){//new block
		let b=bd[bid[nb.name]] //block
		if(!b)continue
		const space=bstr.slice(...b.range).includes("\n")?"\n\t\t":" "
		for(let s of nb.states){
			if(s.type === "bool")s.values=[false,true]
			delete s.num_values;delete s.type
		}
		if(nb.states.length) replaceProp(b,"blockStates",JSON.stringify(nb.states),space,["Name","nameMcd","name"], prevBs)
		if(nb.emitLight) replaceProp(b,"lightLevel",nb.emitLight,space,["Name","nameMcd","name"])
		if(nb.filterLight && nb.transparent) replaceProp(b,"decreaseLight",nb.filterLight,space,["Name","nameMcd","name"])
		if(nb.transparent) replaceProp(b,"transparent",nb.transparent,space,["Name","nameMcd","name"])
		if(nb.boundingBox === "empty") replaceProp(b,"solid","false",space,["Name","nameMcd","name"])
		if(nb.hardness) replaceProp(b,"hardness",nb.hardness===-1?"Infinity":nb.hardness,space,["Name","nameMcd","name"])
		if(nb.resistance) replaceProp(b,"blastResistance",nb.resistance,space,["Name","nameMcd","name"])
		if(nb.material !== "default") replaceProp(b,"material",JSON.stringify(nb.material),space,["Name","nameMcd","name"])
		if(nb.stackSize !== 64) replaceProp(b,"stackSize",nb.stackSize,space,["Name","nameMcd","name"])
		if(nb.harvestTools) replaceProp(b,"harvestToolsNames",JSON.stringify(Object.keys(nb.harvestTools).map(r=>getProp(bd[bid[nitem[r].name]],"name"))),space,["Name","nameMcd","name"], prevHto)
		//if(nbs){it++;if(it>5)break}
	}
	console.log("replacing",replace.length)
	replace.sort((a,b)=>a[0]-b[0])
	let nbstr="",previ=0
	for(let i of replace){
		nbstr+=bstr.slice(previ,i[0])
		nbstr+=i[2]
		previ=i[1]
	}
	nbstr+=bstr.slice(previ)
	str=str.slice(0,start)+nbstr+str.slice(end)
	fs.writeFileSync("public/minekhan/beta/allupdate/_mksrc10test-world.js",str)
}

async function addName(){
let str=fs.readFileSync("public/minekhan/_mksrc10test-world.js","utf-8")

let d= await fetch("https://github.com/PrismarineJS/minecraft-assets/raw/refs/heads/master/data/1.21.1/texture_content.json").then(r=>r.json())
let dmap={};for(let i of d)dmap[i.name]=1

//let replaced={}
let start=str.indexOf('const blockData')
let end=str.indexOf('const BLOCK_COUNT')
str=str.slice(0,start)+str.slice(start,end).replace(/\{\s*name: *"(.*?)"/g, ($1,s)=>{
	let ns = s.replace(/[A-Z]/g, l=>"_"+l.toLowerCase())
	if(ns===s)return $1
	if(!dmap[ns] || s.match(/[^a-zA-Z_]/)){console.log(s)
		return $1
	}
	//replaced[s]=ns
	return $1+","+($1.includes("\n")?"\n\t\t":" ")+"nameMcd:\""+ns+"\""
})+str.slice(end)

/*for(let i in replaced){
	str=str.replace(new RegExp("\\b"+i+"\\b","g"), replaced[i])
}*/

fs.writeFileSync("public/minekhan/_mksrc10test-world.js",str)

/*str=fs.readFileSync("public/minekhan/_mksrc10test.html","utf-8")
for(let i in replaced){
	str=str.replace(new RegExp("\\b"+i+"\\b","g"), replaced[i])
}
fs.writeFileSync("public/minekhan/_mksrc10test.html",str)*/

}