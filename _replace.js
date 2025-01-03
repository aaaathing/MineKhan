
const fs=require("fs")

update()

async function update(){
/*
replace old blockStates
add all blocks & items
	item models
craft
models rotate (v.x, v.y, entity)
add custom blockStates and shapes for them
	fern, wall carpet, etc.
add all entities
	fix some textures (sheep)
	posEntity
	particle don't use entityIds
animated textures
semi transparent textures
new save format using block names and block state names
sounds
*/
	// CUBE|SLAB|STAIR|CROSS|TALLCROSS|DOOR|TORCH|LANTERN|LANTERNHANG|BEACON|CACTUS|PANE|PORTAL|WALLFLAT|TRAPDOOR|TRAPDOOROPEN|FENCE|WALLPOST|BUTTON|CHAIN|POT|POTCROSS|CORNERSTAIRIN|CORNERSTAIROUT|VERTICALSLAB|LAYER1|LAYER2|LAYER3|LAYER4|LAYER5|LAYER6|LAYER7|LAYER8|FLIP|NORTH|SOUTH|EAST|WEST|ROTATION|isCube|isState
	// name:.*?wall
	var esprima = require('esprima')

	async function getMCData(path){
		//return await fs.promises.readFile(require.resolve("minecraft-data/minecraft-data/data/"+path))
		return await fetch("https://raw.githack.com/PrismarineJS/minecraft-data/master/data/"+path).then(r=>r.json())
		return await fetch("https://github.com/PrismarineJS/minecraft-data/raw/refs/heads/master/data/"+path).then(r=>r.json())
	}

	const materialToCategory = { //see https://github.com/PrismarineJS/minecraft-data/blob/master/data/pc/1.21.3/materials.json
		"mineable/pickaxe":"build",
		"incorrect_for_wooden_tool":"build",
		"mineable/shovel":"nature",
		"ground":"nature",
		"plant":"nature",
		"leaves":"nature"
	}

	let str=fs.readFileSync("public/minekhan/beta/allupdate/_mksrc10test-world.js","utf-8")
	let nbd=await getMCData("pc/1.21.3/blocks.json")
	let nitem=await getMCData("pc/1.21.3/items.json")
	let nfd=await getMCData("pc/1.21.3/foods.json")
	let start=str.indexOf('const blockData')
	let end=str.indexOf('const BLOCK_COUNT')
	let bstr=str.slice(start,end)

	let bdstatement=esprima.parseScript(bstr, {range:true}).body[0]
	let bd = bdstatement.declarations[0].init.elements
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
	let suffixs={}
	function addSuffix(s){
		let o=suffixs
		let a=s.split("_").reverse()
		for(let i=0;i<a.length;i++){
			if(!o[a[i]]) o[a[i]] = {}
			o=o[a[i]]
			if(i===a.length-1)o._this=s
		}
	}
	function findSuffix(s){
		let o=suffixs
		let a=s.split("_").reverse()
		for(let i=0;i<a.length;i++){
			if(!o[a[i]]){
				if(!i)return
				break
			}
			o=o[a[i]]
		}
		return recurse(o).next().value
	}
	function* recurse(o){
		for(let i in o){
			if(typeof o[i]==="object")yield*recurse(o[i])
			else yield o[i]
		}
	}
	let bid={},bidn={},copiesProps={}
	for(let i=0;i<bd.length;i++){
		let n=getProp(bd[i],"name"), nm=getProp(bd[i],"nameMcd")||n
		if(nm in bid) return console.error("duplicate nameMcd", nm)
		if(n in bidn) return console.error("duplicate name", n)
		bid[nm]=i
		bidn[n]=i
		let copyProp=getProp(bd[i],"copyPropertiesHere")
		if(copyProp)copiesProps[copyProp]=true
	}
	for(let i=0;i<bd.length;i++){
		let n=getProp(bd[i],"name"), nm=getProp(bd[i],"nameMcd")||n
		if(copiesProps[n])addSuffix(nm)
	}

	let bdBeforeEnd = bd[bd.length-1].range[1]
	let prevBs={}/*prev block states*/, prevHto={}
	let replace=[]
	let notitem = {}
	let it=0
	function replaceProp(o,key,val,space, after, prevs=null){
		if(prevs){
			if(prevs[val]) val = JSON.stringify(prevs[val])
			else prevs[val] = getProp(o,"name")
		}
		let pos = getPropValPos(o,key)
		if(pos){
			if(bstr.slice(pos[0],pos[1]) !== val+"") replace.push([pos[0],pos[1],val, o.addnewIdx||0])
		}else{
			let i
			for(let a of after){
				i=getPropValPos(o,a)
				if(i)break
			}
			replace.push([i[1],i[1], ","+space+key+": "+val, o.addnewIdx||0])
		}
	}

	let addnewIdx = 0
	// ----------------------------------
	//todo: put loop for adding new ones before the loop below (so blockIds is correct)
	for(let nb of nbd){//new block
		let b=bd[bid[nb.name]] //block
		notitem[nb.name]=true
		let isnew=false
		if(!b){
			isnew=true
			let nameMcd = nb.name, name = camelCase(nameMcd)
			b = {properties:[{key:{name:"name"},value:{value:name,range:[bdBeforeEnd,bdBeforeEnd]}}],range:[bdBeforeEnd,bdBeforeEnd]}
			let str = ",\n\t{\n\t\tname:"+JSON.stringify(name)
			if(name !== nameMcd) str += ",\n\t\tnameMcd:"+JSON.stringify(nameMcd)
			str += ",\n\t\tName:"+JSON.stringify(nb.displayName)
			let similar=bd[bid[findSuffix(nb.name)]] //,snext
			if(similar) str += ",\n\t\tcopyPropertiesHere:"+JSON.stringify(getProp(similar,"name"))
			replace.push([bdBeforeEnd,bdBeforeEnd, str, addnewIdx])
			b.addnewIdx = addnewIdx
			bid[nameMcd]=bd.length,bd.push(b)
		}
		const space = isnew || bstr.slice(...b.range).includes("\n") ? "\n\t\t":" "
		b.space = space
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
		if(nb.material && !getProp(b,"category"))for(let m of nb.material.split(";")){
			if(materialToCategory[m]) replaceProp(b,"category",JSON.stringify(materialToCategory[m]),space,["Name","nameMcd","name"])
		}
		if(nb.stackSize !== 64) replaceProp(b,"stackSize",nb.stackSize,space,["Name","nameMcd","name"])
		if(nb.harvestTools) replaceProp(b,"harvestToolsNames",JSON.stringify(Object.keys(nb.harvestTools).map(r=>getProp(bd[bid[nitem[r].name]],"name"))),space,["Name","nameMcd","name"], prevHto)
		//if(nbs){it++;if(it>5)break}
		if(isnew){
			replace.push([bdBeforeEnd,bdBeforeEnd, "\n\t}", addnewIdx+=100])
		}
	}
	// ----------------------------------

	for(let nb of nitem){
		let b=bd[bid[nb.name]] //block
		let isnew=false
		if(!b){
			isnew=true
			let nameMcd = nb.name, name = camelCase(nameMcd)
			b = {properties:[{key:{name:"name"},value:{value:name,range:[bdBeforeEnd,bdBeforeEnd]}}],range:[bdBeforeEnd,bdBeforeEnd]}
			let str = ",\n\t{"
			str += " name:"+JSON.stringify(name)+","
			if(name !== nameMcd) str += " nameMcd:"+JSON.stringify(nameMcd)+","
			str += " Name:"+JSON.stringify(nb.displayName)
			replace.push([bdBeforeEnd,bdBeforeEnd, str, addnewIdx])
			b.addnewIdx = addnewIdx
			bid[nameMcd]=bd.length,bd.push(b)
		}
		const space = isnew ? " " : ("space" in b) ? b.space : bstr.slice(...b.range).includes("\n") ? "\n\t\t":" "
		b.space = space
		//if(nb.texture) replaceProp(b,"textures",nb.texture,space,["Name","nameMcd","name"])
		if(!notitem[nb.name]){
			replaceProp(b,"item","true",space,["Name","nameMcd","name"])
			if(nb.stackSize !== 64) replaceProp(b,"stackSize",nb.stackSize,space,["Name","nameMcd","name"])
			if(nb.maxDurability) replaceProp(b,"durability",nb.maxDurability,space,["Name","nameMcd","name"])
		}
		if(isnew){
			replace.push([bdBeforeEnd,bdBeforeEnd, " }", addnewIdx+=100])
		}
	}
	// ----------------------------------
	for(let nb of nfd){//food
		let b=bd[bid[nb.name]] //block
		if(!b)continue
		const space = b.space
		replaceProp(b,"edible","true",space,["Name","nameMcd","name"])
		replaceProp(b,"food",nb.foodPoints,space,["Name","nameMcd","name"])
		replaceProp(b,"saturation",nb.saturation,space,["Name","nameMcd","name"])
	}
	// ----------------------------------

	console.log("replacing",replace.length)
	replace.sort((a,b) => (a[0]-b[0])||(a[3]-b[3])||0)
	let nbstr="",previ=0
	for(let i of replace){
		nbstr+=bstr.slice(previ,i[0])
		nbstr+=i[2]
		previ=i[1]
	}
	nbstr+=bstr.slice(previ)
	str=str.slice(0,start)+nbstr+str.slice(end)

	// ----------------------------------
	// entity
	console.log("doing")
	let ned=await getMCData("pc/1.20.5/entities.json")
	start=str.indexOf('const entityData')
	end=str.indexOf('win.entityData = entityData')
	bstr=str.slice(start,end)
	let edstatement=esprima.parseScript(bstr, {range:true}).body[0]
	let ed = edstatement.declarations[0].init.elements

	let eid={}
	for(let i=0;i<ed.length;i++){
		let n=getProp(ed[i],"name"), nm=getProp(ed[i],"nameMcd")||n
		if(nm in eid) return console.error("duplicate nameMcd", nm)
		eid[nm]=i
	}
	let edBeforeEnd = ed[ed.length-1].range[1]
	let prevMd={}/*prev metadata*/
	replace=[]

	for(let ne of ned){
		let b=ed[eid[ne.name]]
		let isnew=false
		if(!b){
			isnew=true
			let nameMcd = ne.name, name = camelCase(nameMcd)
			b = {properties:[{key:{name:"name"},value:{value:name,range:[edBeforeEnd,edBeforeEnd]}}],range:[edBeforeEnd,edBeforeEnd]}
			let str = ",\n\t{"
			str += "\n\t\tname:"+JSON.stringify(name)+","
			if(name !== nameMcd) str += "\n\t\tnameMcd:"+JSON.stringify(nameMcd)+","
			str += "\n\t\tName:"+JSON.stringify(ne.displayName)
			replace.push([edBeforeEnd,edBeforeEnd, str, addnewIdx])
			b.addnewIdx = addnewIdx
			bid[nameMcd]=bd.length,bd.push(b)
		}
		const space = "\n\t\t"
		b.space = space
		replaceProp(b,"type",JSON.stringify(ne.type),space,["Name","nameMcd","name"])
		replaceProp(b,"width",ne.width,space,["Name","nameMcd","name"])
		replaceProp(b,"height",ne.height,space,["Name","nameMcd","name"])
		replaceProp(b,"depth",ne.length??ne.width,space,["Name","nameMcd","name"])
		replaceProp(b,"metadata",JSON.stringify(ne.metadataKeys),space,["Name","nameMcd","name"], prevMd)
		if(isnew){
			replace.push([edBeforeEnd,edBeforeEnd, "\n\t}", addnewIdx+=100])
		}
	}


	console.log("replacing",replace.length)
	replace.sort((a,b) => (a[0]-b[0])||(a[3]-b[3])||0)
	nbstr="",previ=0
	for(let i of replace){
		nbstr+=bstr.slice(previ,i[0])
		nbstr+=i[2]
		previ=i[1]
	}
	nbstr+=bstr.slice(previ)
	str=str.slice(0,start)+nbstr+str.slice(end)

	fs.writeFileSync("public/minekhan/beta/allupdate/_mksrc10test-world.js",str)
}
function camelCase(s) {
	return s.replace(/([-_][a-z])/ig, c => c.toUpperCase().replace(/-|_/, ''))
}
function titleCase(s) {
	return s.replace(/(^[a-z]|[-_][a-z])/ig, c => c.toUpperCase().replace(/-|_/, ' '))
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