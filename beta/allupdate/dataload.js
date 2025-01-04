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
	shapes, textures, blockIds
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
				let ignoredBlockStates = Object.keys(baseBlock.blockStatesMap)
				if(v){
					let a = v.split(",")
					findIdLoop:for(let i=0; i<a.length; i++){
						let [statename,statevalue] = a[i].split("=")
						let bs = baseBlock.blockStatesMap[statename]
						ignoredBlockStates.splice(ignoredBlockStates.indexOf(statename),1) // it was used, not ignored
						for(let v=0; v<bs.values.length; v++){
							if(bs.values[v]+"" === statevalue){
								id += v * bs.minMult
								continue findIdLoop
							}
						}
						throw new Error("did not find blockstate "+statename+" "+statevalue)
						// id |= blockstateValues[statename].indexOf(statevalue) << blockstatePos[statename]
					}
				}
				let block = blockData[id]
				let variant = bstates.variants[v]
				if(Array.isArray(variant)){
					block.shapeArray = []
					for(let i=0; i<variant.length; i++) block.shapeArray.push(getShapeFromVariant(variant[i]))
					block.shape = block.shapeArray[0]
				}else{
					block.shape = getShapeFromVariant(variant)
					block.shapeArray = null
				}
				if(block.shadow === undefined) block.shadow = block.shape.shadow
				if(ignoredBlockStates.length){
					fillBlockStates(ignoredBlockStates,0, block,blockData, id)
				}
			}
		}
	}
	function fillBlockStates(arr,arri,block,blockData, id){
		let {values, minMult} = block.blockStatesMap[arr[arri]]
		for(let i=0; i<values.length; i++){
			if(arri === arr.length-1){ // deepest loop, fill in blocks
				let finalId = id + i*minMult
				let other = blockData[finalId]
				if(!other.hasOwnProperty("shape")){
					other.shape = block.shape
					other.shapeArray = block.shapeArray
					other.shadow = block.shadow
				}
			}else{ // go to deeper loop
				fillBlockStates(arr,arri+1,block,blockData, id + i*minMult)
			}
		}
	}
	const getShapeFunc = function(x,y,z,world,block){

	}
	//return {blockData, shapes, textures, blockIds}

	function getTexture(name, textureSelectors){
		if(name.startsWith("#")){
			return textureSelectors[name.substring(1)]
		}else if(textureSelectors[name]){
			return textureSelectors[name]
		}else{
			name = fixResourceLocation(name)
			if(!textures[name]) textures[name] = getFromData(name, "textures/")
		}
		return name
	}
	function addFace(dataFace, shape, side, pos, normal, textureSelectors, rotation, texWidth=16, texHeight=16){
		pos = pos.map(c => roundBits(c / 16 - 0.5))
		if(rotation) rotateVerts[rotation.axis](pos, normal, [rotation.origin[0]/16-0.5, rotation.origin[1]/16-0.5, rotation.origin[2]/16-0.5], rotation.angle*Math.PI/180, rotation.rescale)
		let minmax = compareArr(pos)
		pos.max = minmax[1]
		pos.min = minmax[0]
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
			let element = dataModel.elements[i]
			const faces = element.faces
			const [x,y,z] = element.from
			const [X,Y,Z] = element.to
			if(faces.down) addFace(faces.down, shape, 0, [x,y,z, X,y,z, X,y,Z, x,y,Z], [0,1,0], textureSelectors, element.rotation), faces.down.cullface !== "down" && (shape.cull.bottom = 0)
			if(faces.up) addFace(faces.up, shape, 1, [x,Y,Z, X,Y,Z, X,Y,z, x,Y,z], [0,-1,0], textureSelectors, element.rotation), faces.up.cullface !== "up" && (shape.cull.top = 0)
			if(faces.north) addFace(faces.north, shape, 2, [X,Y,Z, x,Y,Z, x,y,Z, X,y,Z], [0,0,-1], textureSelectors, element.rotation), faces.north.cullface !== "north" && (shape.cull.north = 0)
			if(faces.south) addFace(faces.south, shape, 3, [x,Y,z, X,Y,z, X,y,z, x,y,z], [0,0,1], textureSelectors, element.rotation), faces.south.cullface !== "south" && (shape.cull.south = 0)
			if(faces.east) addFace(faces.east, shape, 4, [X,Y,z, X,Y,Z, X,y,Z, X,y,z], [-1,0,0], textureSelectors, element.rotation), faces.east.cullface !== "east" && (shape.cull.east = 0)
			if(faces.west) addFace(faces.west, shape, 5, [x,Y,Z, x,Y,z, x,y,z, x,y,Z], [1,0,0], textureSelectors, element.rotation), faces.west.cullface !== "west" && (shape.cull.west = 0)
		}
	}
	function getShapeFromVariant(v){
		let model = fixResourceLocation(v.model)
		let shape = shapes[model]
		if(!shape){
			let dataModel = getFromData(model, "models/")
			shape = {
				verts:[[],[],[],[],[],[]], cull:{bottom:3,top:3,north:3,south:3,east:3,west:3}, texVerts:[[],[],[],[],[],[]], normal:[[],[],[],[],[],[]], size:0,
				textureSelectors:{},
				shadow: dataModel.ambientocclusion === undefined ? true : dataModel.ambientocclusion,
			}
			makeShape(model,shape, shape.textureSelectors)
			for(let i=0; i<6; i++) shape.size += shape.verts[i].length
			shapes[model] = shape
		}
		if(v.x || v.y){
			shape = rotateShape(shape, (v.x||0)*Math.PI/180, (v.y||0)*Math.PI/180)
		}
		return shape
	}
	function roundBits(number) {
		return Math.round(number * 100000) / 100000
	}
	function rotateShape(shape, rotX, rotY) {
		let verts = shape.verts
		let texVerts = shape.texVerts
		let cull = shape.cull
		let pos = []
		let normal = []
		let tex = []
		let sx = sin(rotX), cx = cos(rotX)
		let sy = sin(rotY), cy = cos(rotY)
		let rotX90 = Math.round(rotX/Math.PI*2) + (rotX<0 ? Math.PI*2 : 0)
		let rotY90 = Math.round(rotY/Math.PI*2) + (rotY<0 ? Math.PI*2 : 0)
		let t
		for (let i = 0; i < verts.length; i++) {
			let side = verts[i]
			pos[i] = [], tex[i] = [], normal[i] = []
			for (let j = 0; j < side.length; j++) {
				let face = side[j].slice()
				pos[i][j] = face
				for (let k = 0; k < face.length; k += 3) {
					t = face[k+1]
					face[k+1] = roundBits(t * cx + face[k + 2] * -sx)
					face[k+2] = roundBits(t * sx + face[k + 2] * cx)
					t = face[k+0]
					face[k+0] = roundBits(t * cy + face[k + 2] * sy)
					face[k+2] = roundBits(t * -sy + face[k + 2] * cy)
				}
				
				tex[i][j] = texVerts[i][j].slice() // Copy texture verts exactly
				tex[i][j].texture = texVerts[i][j].texture

				let minmax = compareArr(face)
				face.max = minmax[1], face.min = minmax[0]

				normal[i][j] = shape.normal[i][j].slice()
				t = normal[i][j][1]
				normal[i][j][1] = t * cx + normal[i][j][2] * sx
				normal[i][j][2] = t * -sx + normal[i][j][2] * cx
				t = normal[i][j][0]
				normal[i][j][0] = t * cy + normal[i][j][2] * sy
				normal[i][j][2] = t * -sy + normal[i][j][2] * cy
			}
		}

		let newCull = {...cull}
		for(let i=0; i<rotX90; i++){
			t = newCull.top, newCull.top = newCull.north, newCull.north = newCull.bottom, newCull.bottom = newCull.south, newCull.south = t
			t = tex[1]
			tex[1] = tex[2], tex[2] = tex[0], tex[0] = tex[3], tex[3] = t
			t = pos[1]
			pos[1] = pos[2], pos[2] = pos[0], pos[0] = pos[3], pos[3] = t
			t = normal[1]
			normal[1] = normal[2], normal[2] = normal[0], normal[0] = normal[3], normal[3] = t
			for(let j=0; j<pos[2].length; j++) pos[2][j].push(...pos[2][j].splice(0, 6)), tex[2][j].push(...tex[2][j].splice(0, 4)) //flip them (because it went from top to side)
			for(let j=0; j<pos[3].length; j++) pos[3][j].push(...pos[3][j].splice(0, 6)), tex[3][j].push(...tex[3][j].splice(0, 4)) //flip them (because it went from bottom to side)
			for(let j=0; j<pos[4].length; j++) pos[4][j].push(...pos[4][j].splice(0, 3)), tex[4][j].push(...tex[4][j].splice(0, 2))
			for(let j=0; j<pos[5].length; j++) pos[5][j].unshift(...pos[5][j].splice(-3, 3)), tex[5][j].unshift(...tex[5][j].splice(-2, 2))
		}
		for(let i=0; i<rotY90; i++){
			t = newCull.north, newCull.north = newCull.west, newCull.west = newCull.south, newCull.south = newCull.east, newCull.east = t
			t = tex[2]
			tex[2] = tex[5], tex[5] = tex[3], tex[3] = tex[4], tex[4] = t
			t = pos[2]
			pos[2] = pos[5], pos[5] = pos[3], pos[3] = pos[4], pos[4] = t
			t = normal[2]
			normal[2] = normal[5], normal[5] = normal[3], normal[3] = normal[4], normal[4] = t
			for(let j=0; j<pos[0].length; j++) pos[0][j].push(...pos[0][j].splice(0, 3)), tex[0][j].push(...tex[0][j].splice(0, 2))
			for(let j=0; j<pos[1].length; j++) pos[1][j].unshift(...pos[1][j].splice(-3, 3)), tex[1][j].unshift(...tex[1][j].splice(-2, 2))
		}

		return {
			...shape,
			verts: pos, texVerts: tex, normal,
			cull: newCull,
		}
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
function compareArr(arr) {
	let minX = 1000
	let maxX = -1000
	let minY = 1000
	let maxY = -1000
	let minZ = 1000
	let maxZ = -1000
	let num = 0
	for (let i = 0; i < arr.length; i += 3) {
		num = arr[i]
		minX = minX > num ? num : minX
		maxX = maxX < num ? num : maxX
		num = arr[i + 1]
		minY = minY > num ? num : minY
		maxY = maxY < num ? num : maxY
		num = arr[i + 2]
		minZ = minZ > num ? num : minZ
		maxZ = maxZ < num ? num : maxZ
	}
	return [[minX,minY,minZ],[maxX,maxY,maxZ]]
}

export function loadNamespaceEntityBe(allData, namespace, {
	entityData,
	shapes, textures
}){
	const nullOrigin = [0,0,0]
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
		if(!entityData[i]) continue
		let name = entityData[i].nameMcd || entityData[i].name
		let entity = data.entity[name]
		if(!entity) continue
		let variantsBones = {}
		let allTextures =Object.keys(entity.textures)
		allTextures.idx = 0
		for(let v in entity.textures){
			let g = entity.geometry[v] || entity.geometry.default
			if(g) variantsBones[v] = getShapeForVariant(shapes, fixResourceLocation(name)+":"+v, g, entity.textures[v], allTextures)
			allTextures.idx++
		}
		entityData[i].variantsBones = variantsBones
	}

	function getTexture(name){
		name = fixResourceLocation(name)
		if(!textures[name]){
			try{
				textures[name] = getFromData(name, "")
			}catch(e){
				return "error"
			}
		}
		return name
	}
	function dot (a, b) {
		return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
	}
	function addFace(cube, shape, sideName, side, faceMult, texture, boneRot, allTextures, texWidth=64, texHeight=32){
		let uv = cube.uv && cube.uv[sideName] ? cube.uv[sideName].uv : cube.uv
		if(!uv) return
		let pos = [], tex = []
		const { dir, corners, u0, v0, u1, v1 } = faceMult
		let normal = [-dir[0],-dir[1],-dir[2]]
		// loop from https://github.com/PrismarineJS/prismarine-viewer/blob/master/viewer/lib/entity/Entity.js
		for (const cpos of corners) {
      let u = (uv[0] + dot(cpos[3] ? u1 : u0, cube.size)) / texWidth
      let v = (uv[1] + dot(cpos[4] ? v1 : v0, cube.size)) / texHeight - Math.floor(uv[1] / texHeight)
			tex.push(u,v)

      const inflate = cube.inflate ? cube.inflate : 0
      pos.push(
        (cube.origin[0] + cpos[0] * cube.size[0] + (cpos[0] ? inflate : -inflate)) / 16,
        (cube.origin[1] + cpos[1] * cube.size[1] + (cpos[1] ? inflate : -inflate)) / 16,
        (cube.origin[2] + cpos[2] * cube.size[2] + (cpos[2] ? inflate : -inflate)) / 16
      )
		}
		if(cube.rotation){
			let origin = cube.origin ? [(cube.origin[0]+cube.size[0]/2)/16,(cube.origin[1]+cube.size[1]/2)/16,(cube.origin[2]+cube.size[2]/2)/16] : nullOrigin
			if(cube.rotation[0]) rotateVerts.x(pos,normal,origin,cube.rotation[0]*Math.PI/180)
			if(cube.rotation[1]) rotateVerts.y(pos,normal,origin,cube.rotation[1]*Math.PI/180)
			if(cube.rotation[2]) rotateVerts.z(pos,normal,origin,cube.rotation[2]*Math.PI/180)
		}
		if(boneRot){
			let origin = shape.pivot||nullOrigin
			if(boneRot[0]) rotateVerts.x(pos,normal,origin,boneRot[0]*Math.PI/180)
			if(boneRot[1]) rotateVerts.y(pos,normal,origin,boneRot[1]*Math.PI/180)
			if(boneRot[2]) rotateVerts.z(pos,normal,origin,boneRot[2]*Math.PI/180)
		}
		let minmax = compareArr(pos)
		pos.max = minmax[1]
		pos.min = minmax[0]
		tex.texture = texture
		shape.verts[side].push(pos)
		shape.texVerts[side].push(tex)
		shape.normal[side].push(normal)
	}
	function getShapeForVariant(shapes, shapePrefix, model, texture, allTextures){
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
			if(bone.cubes) for(let i=0; i<bone.cubes.length; i++){
				let cube = bone.cubes[i]
				addFace(cube, shape, "down", 0, elemFaces.down, texture, rot, allTextures, model.texturewidth, model.textureheight)
				addFace(cube, shape, "up", 1, elemFaces.up, texture, rot, allTextures, model.texturewidth, model.textureheight)
				addFace(cube, shape, "north", 2, elemFaces.north, texture, rot, allTextures, model.texturewidth, model.textureheight)
				addFace(cube, shape, "south", 3, elemFaces.south, texture, rot, allTextures, model.texturewidth, model.textureheight)
				addFace(cube, shape, "east", 4, elemFaces.east, texture, rot, allTextures, model.texturewidth, model.textureheight)
				addFace(cube, shape, "west", 5, elemFaces.west, texture, rot, allTextures, model.texturewidth, model.textureheight)
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

let {sin,cos,max,min,abs} = Math
const rotateVerts = {
	x:function(pos,normal,origin,rot,stretch){
		let s = sin(rot), c = cos(rot)
		let a = 1/max(abs(s),abs(c))
		for(let i=0; i<pos.length; i+=3){
			let t1 = pos[i+1]-origin[1], t2 = pos[i+2]-origin[2]
			if(stretch) t1 *= a, t2 *= a
			pos[i+1] = t1 * c + t2 * s + origin[1]
			pos[i+2] = t1 * -s + t2 * c + origin[2]
		}
		let t1 = normal[1], t2 = normal[2]
		normal[1] = t1 * c + t2 * s
		normal[2] = t1 * -s + t2 * c
	},
	y:function(pos,normal,origin,rot,stretch){
		let s = sin(rot), c = cos(rot)
		let a = 1/max(abs(s),abs(c))
		for(let i=0; i<pos.length; i+=3){
			let t1 = pos[i+0]-origin[0], t2 = pos[i+2]-origin[2]
			if(stretch) t1 *= a, t2 *= a
			pos[i+0] = t1 * c + t2 * -s + origin[0]
			pos[i+2] = t1 * s + t2 * c + origin[2]
		}
		let t1 = normal[0], t2 = normal[2]
		normal[0] = t1 * c + t2 * -s
		normal[2] = t1 * s + t2 * c
	},
	z:function(pos,normal,origin,rot,stretch){
		let s = sin(rot), c = cos(rot)
		let a = 1/max(abs(s),abs(c))
		for(let i=0; i<pos.length; i+=3){
			let t1 = pos[i+0]-origin[0], t2 = pos[i+1]-origin[1]
			if(stretch) t1 *= a, t2 *= a
			pos[i+0] = t1 * c + t2 * s + origin[0]
			pos[i+1] = t1 * -s + t2 * c + origin[1]
		}
		let t1 = normal[0], t2 = normal[1]
		normal[0] = t1 * c + t2 * s
		normal[1] = t1 * -s + t2 * c
	},
}


export function loadNamespace(allData, namespace, options){
	loadNamespaceBlocks(allData,namespace,options)
	loadNamespaceEntityBe(allData,namespace,options)
}