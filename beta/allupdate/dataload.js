import idata from "./data.js"
export const data = idata

/*
blockStates: {
	snowy:{
		values: [false,true],
		minMult:16,maxMult:32
	},
},
*/
//todo: flat icons for blocks, shape array, animatd texture
function loadNamespaceBlocks(allData, namespace, {
	blockData, BLOCK_COUNT,
	shapes, textures, blockIds,
	compareArr
}){
	let data = allData.assets[namespace]

	//let blockDataMore = allData.blockData[namespace]
	//let blockDataMoreMap = {}
	//for(let i=0; i<blockDataMore.length; i++) blockDataMoreMap[blockDataMore[i].name] = blockDataMore[i]
	
	for(let blockId = 0; blockId < BLOCK_COUNT; blockId++){
		const name = blockData[blockId].nameMcd || blockData[blockId].name
		let bstates = data.blockstates[name]
		if(!bstates) continue
		let baseBlock = blockData[blockId]

		//let more = blockDataMoreMap[baseBlock.name]
		//baseBlock.blockStates = more.states
		
		/*let blockstateValues = {}
		if(bstates.variants){ // find name and values of states
			for(let v in bstates.variants){
				let a = v.split(",")
				for(let i=0; i<a.length; i++){
					let [statename,statevalue] = a[i].split("=")
					if(!blockstateValues[statename]){
						blockstateValues[statename] = []
					}
					if(!blockstateValues[statename].includes(statevalue)) blockstateValues[statename].push(statevalue)
				}
			}
		}
		let blockstatePos = {}, blockstatePosI = 16 // where the block states are
		for(let statename in blockstateValues){
			blockstatePos[statename] = blockstatePosI
			blockstatePosI += Math.ceil(Math.log2(blockstateValues[statename].length))
		}
		baseBlock.blockstateValues = blockstateValues
		baseBlock.blockstatePos = blockstatePos
		blockData[blockId] = baseBlock*/
		if(bstates.variants){
			for(let v in bstates.variants){
				let id = blockId
				let a = v.split(",")
				findIdLoop:for(let i=0; i<a.length; i++){
					let [statename,statevalue] = a[i].split("=")
					let bs = baseBlock.blockStatesMap[statename]
					for(let v=0; v<bs.values.length; v++){
						if(bs.values[v]+"" === statevalue){
							id += v * bs.minMult
							continue findIdLoop
						}
					}
					throw new Error("did not find blockstate "+statename+" "+statevalue)
					// id |= blockstateValues[statename].indexOf(statevalue) << blockstatePos[statename]
				}
				let block = Object.create(baseBlock)
				let variant = bstates.variants[v]
				if(Array.isArray(variant)){
					block.shapeArray = []
					for(let i=0; i<variant.length; i++) block.shapeArray.push(getShapeFromVariant(variant[i]))
					block.shape = block.shapeArray[0]
				}else{
					block.shape = getShapeFromVariant(variant)
				}
				blockData[id] = block
			}
		}
	}
	//return {blockData, shapes, textures, blockIds}

	function getTexture(name, textureSelectors){
		if(name.startsWith("#")){
			return textureSelectors[name.substring(1)]
		}else{
			name = fixResourceLocation(name)
			if(!textures[name]) textures[name] = getFromData(name, "textures/")
		}
		return name
	}
	function addFace(dataFace, shape, side, pos, normal, textureSelectors, texWidth=16, texHeight=16){
		pos = pos.map(c => c / 16 - 0.5)
		let minmax = compareArr(pos, [])
		pos.max = minmax.splice(3, 3)
		pos.min = minmax
		//todo: rotate using element.rotation
		const [tx,ty,tX,tY] = dataFace.uv || [0,0,texWidth,texHeight]
		let tex = [tX,ty, tx,ty, tx,tY, tX,tY]
		for(let i=0; i<tex.length; i+=2){
			tex[i] /= texWidth
			tex[i+1] /= texHeight
		}
		tex.texture = getTexture(dataFace.texture, textureSelectors)
		tex.tintindex = dataFace.tintindex
		shape.verts[side].push(pos)
		shape.texVerts[side].push(tex)
		shape.normal[side].push(normal)
	}
	function makeShape(dataModelName,shape, textureSelectors){
		/** a model (models/ folder) */
		let dataModel = getFromData(dataModelName, "models/")
		if(dataModel.textures){
			for(let i in dataModel.textures){
				textureSelectors[i] = getTexture(dataModel.textures[i], textureSelectors)
			}
		}
		if(dataModel.parent){
			makeShape(dataModel.parent, shape, textureSelectors)
		}
		if(dataModel.elements) for(let i=dataModel.elements.length-1; i>=0; i--){
			const faces = dataModel.elements[i].faces
			const [x,y,z] = dataModel.elements[i].from
			const [X,Y,Z] = dataModel.elements[i].to
			if(faces.down) addFace(faces.down, shape, 0, [x,y,z, X,y,z, X,y,Z, x,y,Z], [0,1,0], textureSelectors), faces.down.cullface !== "down" && (shape.cull.bottom = 0)
			if(faces.up) addFace(faces.up, shape, 1, [x,Y,Z, X,Y,Z, X,Y,z, x,Y,z], [0,-1,0], textureSelectors), faces.up.cullface !== "up" && (shape.cull.top = 0)
			if(faces.north) addFace(faces.north, shape, 2, [X,Y,Z, x,Y,Z, x,y,Z, X,y,Z], [0,0,-1], textureSelectors), faces.north.cullface !== "north" && (shape.cull.north = 0)
			if(faces.south) addFace(faces.south, shape, 3, [x,Y,z, X,Y,z, X,y,z, x,y,z], [0,0,1], textureSelectors), faces.south.cullface !== "south" && (shape.cull.south = 0)
			if(faces.east) addFace(faces.east, shape, 4, [X,Y,z, X,Y,Z, X,y,Z, X,y,z], [-1,0,0], textureSelectors), faces.east.cullface !== "east" && (shape.cull.east = 0)
			if(faces.west) addFace(faces.west, shape, 5, [x,Y,Z, x,Y,z, x,y,z, x,y,Z], [1,0,0], textureSelectors), faces.west.cullface !== "west" && (shape.cull.west = 0)
		}
	}
	function getShapeFromVariant(v){
		let model = fixResourceLocation(v.model)
		if(!shapes[model]){
			let shape = {
				verts:[[],[],[],[],[],[]], cull:{bottom:3,top:3,north:3,south:3,east:3,west:3}, texVerts:[[],[],[],[],[],[]], normal:[[],[],[],[],[],[]], size:0,
				textureSelectors:{}
			}
			makeShape(model,shape, shape.textureSelectors)
			for(let i=0; i<6; i++) shape.size += shape.verts[i].length
			shapes[model] = shape
		}
		return shapes[model]
		//todo: rotation (v.x and v.y)
	}

	function fixResourceLocation(str){
		return str.includes(":") ? str : namespace+":"+str
	}
	function getFromData(ostr, prefix=""){
		let [tnamespace, str] = fixResourceLocation(ostr).split(":")
		str = prefix + str
		let obj = allData.assets[tnamespace]
		let arr = str.split("/")
		for(let i=0; i<arr.length; i++) obj = obj[arr[i]]
		if(!obj) throw new Error(ostr+" not found in "+prefix)
		return obj
	}
}


export function loadNamespaceEntityBe(allData, namespace, {
	entityData,
	shapes, textures,
	compareArr
}){
	const elemFaces = {
		up: {
			dir: [0, 1, 0],
			u0: [0, 0, 1],
			v0: [0, 0, 0],
			u1: [1, 0, 1],
			v1: [0, 0, 1],
			corners: [
				[0, 1, 1, 0, 0],
				[1, 1, 1, 1, 0],
				[1, 1, 0, 1, 1],
				[0, 1, 0, 0, 1],
			]
		},
		down: {
			dir: [0, -1, 0],
			u0: [1, 0, 1],
			v0: [0, 0, 0],
			u1: [2, 0, 1],
			v1: [0, 0, 1],
			corners: [
				[1, 0, 1, 0, 0],
				[0, 0, 1, 1, 0],
				[0, 0, 0, 1, 1],
				[1, 0, 0, 0, 1],
			]
		},
		east: {
			dir: [1, 0, 0],
			u0: [0, 0, 0],
			v0: [0, 0, 1],
			u1: [0, 0, 1],
			v1: [0, 1, 1],
			corners: [
				[1, 1, 1, 0, 0],
				[1, 0, 1, 0, 1],
				[1, 0, 0, 1, 1],
				[1, 1, 0, 1, 0],
			]
		},
		west: {
			dir: [-1, 0, 0],
			u0: [1, 0, 1],
			v0: [0, 0, 1],
			u1: [1, 0, 2],
			v1: [0, 1, 1],
			corners: [
				[0, 1, 0, 0, 0],
				[0, 0, 0, 0, 1],
				[0, 0, 1, 1, 1],
				[0, 1, 1, 1, 0],
			]
		},
		north: {
			dir: [0, 0, -1],
			u0: [0, 0, 1],
			v0: [0, 0, 1],
			u1: [1, 0, 1],
			v1: [0, 1, 1],
			corners: [
				[1, 0, 0, 0, 1],
				[0, 0, 0, 1, 1],
				[0, 1, 0, 1, 0],
				[1, 1, 0, 0, 0],
			]
		},
		south: {
			dir: [0, 0, 1],
			u0: [1, 0, 2],
			v0: [0, 0, 1],
			u1: [2, 0, 2],
			v1: [0, 1, 1],
			corners: [
				[0, 0, 1, 0, 1],
				[1, 0, 1, 1, 1],
				[1, 1, 1, 1, 0],
				[0, 1, 1, 0, 0],
			]
		}
	}
	
	let data = allData.assetsBe[namespace]
	for(let i=0; i<entityData.length; i++){
		let name = entityData[i].nameMcd || entityData[i].name
		let entity = data.entity[name]
		if(!entity) continue
		let variantsBones = {}
		for(let v in entity.geometry){
			variantsBones[v] = getShapeForVariant(shapes, fixResourceLocation(name)+":"+v, entity.geometry[v], entity.textures[v])
		}
		entityData[i].variantsBones = variantsBones
	}

	function getTexture(name){
		name = fixResourceLocation(name)
		if(!textures[name]) textures[name] = getFromData(name, "")
		return name
	}
	function dot (a, b) {
		return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
	}
	function addFace(cube, shape, side, faceMult, texture, texWidth=16, texHeight=16){
		let pos = [], tex = []
		const { dir, corners, u0, v0, u1, v1 } = faceMult
		let normal = [-dir[0],-dir[1],-dir[2]]
		// loop from https://github.com/PrismarineJS/prismarine-viewer/blob/master/viewer/lib/entity/Entity.js
		for (const cpos of corners) {
      const u = (cube.uv[0] + dot(cpos[3] ? u1 : u0, cube.size)) / texWidth
      const v = (cube.uv[1] + dot(cpos[4] ? v1 : v0, cube.size)) / texHeight
			tex.push(u,v)

      const inflate = cube.inflate ? cube.inflate : 0
      pos.push(
        (cube.origin[0] + cpos[0] * cube.size[0] + (cpos[0] ? inflate : -inflate)) / 16,
        (cube.origin[1] + cpos[1] * cube.size[1] + (cpos[1] ? inflate : -inflate)) / 16,
        (cube.origin[2] + cpos[2] * cube.size[2] + (cpos[2] ? inflate : -inflate)) / 16
      )
			//todo rotate bone.rotation, cubeRotation
		}
		let minmax = compareArr(pos, [])
		pos.max = minmax.splice(3, 3)
		pos.min = minmax
		tex.texture = texture
		shape.verts[side].push(pos)
		shape.texVerts[side].push(tex)
		shape.normal[side].push(normal)
	}
	function getShapeForVariant(shapes, shapePrefix, model, texture){
		let bones = {}
		texture = getTexture(texture)
		for(let i=0; i<model.bones.length; i++){
			let bone = model.bones[i]
			let shape = {
				verts:[[],[],[],[],[],[]], texVerts:[[],[],[],[],[],[]], normal:[[],[],[],[],[],[]], size:0,
				pivot: bone.pivot ? [bone.pivot[0]/16,bone.pivot[1]/16,bone.pivot[2]/16] : null,
				boneName: bone.name,
				attachChain: [], attached: bone.parent
			}
			let rot = bone.bind_pose_rotation || bone.rotation
			let boneRotation = rot ? [rot[0]*Math.PI/180, rot[1]*Math.PI/180, rot[2]*Math.PI/180] : [0,0,0]
			if(bone.cubes) for(let i=0; i<bone.cubes.length; i++){
				let cube = bone.cubes[i]
				addFace(cube, shape, 0, elemFaces.down, texture, model.texturewidth, model.textureheight)
				addFace(cube, shape, 1, elemFaces.up, texture, model.texturewidth, model.textureheight)
				addFace(cube, shape, 2, elemFaces.north, texture, model.texturewidth, model.textureheight)
				addFace(cube, shape, 3, elemFaces.south, texture, model.texturewidth, model.textureheight)
				addFace(cube, shape, 4, elemFaces.east, texture, model.texturewidth, model.textureheight)
				addFace(cube, shape, 5, elemFaces.west, texture, model.texturewidth, model.textureheight)
			}
			for(let i=0; i<6; i++) shape.size += shape.verts[i].length
			bones[bone.name] = shape
			shapes[shapePrefix+":"+bone.name] = shape
		}
		for(let i in bones){
			let bone = bones[i]
			if(bone.parent){
				let bone2 = bone
				while(bone2.parent){
					bone2 = bones[bone2.parent]
					bone.attachChain.push(bone2.name)
				}
				bone.attachChain.reverse()
			}
		}
		return bones
	}
	function fixResourceLocation(str){
		return str.includes(":") ? str : namespace+":"+str
	}
	function getFromData(ostr, prefix=""){
		let [tnamespace, str] = fixResourceLocation(ostr).split(":")
		str = prefix + str
		let obj = allData.assetsBe[tnamespace]
		let arr = str.split("/")
		for(let i=0; i<arr.length; i++) obj = obj[arr[i]]
		if(!obj) throw new Error(ostr+" not found in "+prefix)
		return obj
	}
}


export function loadNamespace(allData, namespace, options){
	loadNamespaceBlocks(allData,namespace,options)
	loadNamespaceEntityBe(allData,namespace,options)
}