import idata from "./data.js"
export const data = idata

export function loadNamespace(allData, namespace){
	let data = allData[namespace]
	let blockData = [], shapes = {}, textures = {}
	for(let name in data.blockstates){
		let bstates = data.blockstates[name]
		if(!bstates.minekhanId) throw new Error("missing id")
		let blockstateValues = {}
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
		let baseBlock = {
			name,
			blockstateValues,
			blockstatePos,
			//blockStatesShapesMask: (1<<tagBitsI)-1
		}
		blockData[bstates.minekhanId] = baseBlock
		if(bstates.variants){
			for(let v in bstates.variants){
				let id = bstates.minekhanId
				let a = v.split(",")
				for(let i=0; i<a.length; i++){
					let [statename,statevalue] = a[i].split("=")
					id |= blockstateValues[statename].indexOf(statevalue) << blockstatePos[statename]
				}
				let block = Object.create(baseBlock)
				block.shape = getShapeFromVariant(bstates.variants[v])
				blockData[id] = block
			}
		}
	}
	return {blockData, shapes, textures}

	function getTexture(name, textureSelectors){
		if(name.startsWith("#")){
			return textureSelectors[name.substring(1)]
		}else if(!textures[name]){
			textures[name] = getFromData(name, "textures/")
		}
		return name
	}
	function addFace(dataFace, shape, side, pos, normal, textureSelectors){
		pos = pos.map(c => c / 16 - 0.5)
		const [tx,ty,tX,tY] = dataFace.uv
		let tex = [tX,ty, tx,ty, tx,tY, tX,tY]
		tex.texture = getTexture(dataFace.texture, textureSelectors)
		shape.verts[side].push(pos)
		shape.texVerts.push(tex)
		shape.normal[side].push(normal)
	}
	function makeShape(dataModelName,shape, textureSelectors={}){
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
		if(dataModel.elements) for(let i=0; i<dataModel.elements.length; i++){
			const faces = dataModel.elements[i].faces
			const [x,y,z] = dataModel.elements[i].from
			const [X,Y,Z] = dataModel.elements[i].to
			addFace(faces.down, shape, 0, [x,y,z, X,y,z, X,y,Z, x,y,Z], [0,1,0], textureSelectors)
			addFace(faces.up, shape, 1, [x,y,z, X,y,Z, X,y,z, x,y,z], [0,-1,0], textureSelectors)
			addFace(faces.north, shape, 2, [X,Y,z, x,Y,z, x,y,z, X,y,z], [0,0,-1], textureSelectors)
			addFace(faces.south, shape, 3, [x,Y,z, X,Y,z, X,y,z, x,y,z], [0,0,1], textureSelectors)
			addFace(faces.east, shape, 4, [x,Y,z, x,Y,Z, x,y,Z, x,y,z], [-1,0,0], textureSelectors)
			addFace(faces.west, shape, 5, [x,Y,Z, x,Y,z, x,y,z, x,y,Z], [1,0,0], textureSelectors)
		}
	}
	function getShapeFromVariant(v){
		if(!shapes[v.model]){
			let shape = {verts:[[],[],[],[],[],[]], cull:{/*todo*/}, texVerts:[], normal:[[],[],[],[],[],[]]}
			makeShape(v.model,shape)
			shapes[v.model] = shape
		}
		return shapes[v.model]
		//todo: rotation (v.x and v.y)
	}

	function getFromData(ostr, prefix=""){
		let [namespace, str] = ostr.split(":")
		str = prefix + str
		let obj = allData[namespace]
		let arr = str.split("/")
		for(let i=0; i<arr.length; i++) obj = obj[arr[i]]
		if(!obj) throw new Error(ostr+" not found in "+prefix)
		return obj
	}
}