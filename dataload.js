import idata from "./data.js"
export const data = idata

export function loadNamespace(allData, namespace, {
	blockData,
	shapes, textures, blockIds,
	compareArr
}){
	let data = allData[namespace]
	for(let name in data.blockstates){
		let bstates = data.blockstates[name]
		const blockId = blockIds[name]
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
		let baseBlock = blockData[blockId]
		baseBlock.blockstateValues = blockstateValues
		baseBlock.blockstatePos = blockstatePos
		blockData[blockId] = baseBlock
		if(bstates.variants){
			for(let v in bstates.variants){
				let id = blockId
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
	//return {blockData, shapes, textures, blockIds}

	function getTexture(name, textureSelectors){
		if(name.startsWith("#")){
			return textureSelectors[name.substring(1)]
		}else if(!textures[name]){
			textures[name] = getFromData(name, "textures/")
		}
		return name
	}
	function addFace(dataFace, shape, side, pos, normal, textureSelectors, texWidth=16, texHeight=16){
		pos = pos.map(c => c / 16 - 0.5)
		let minmax = compareArr(pos, [])
		pos.max = minmax.splice(3, 3)
		pos.min = minmax
		const [tx,ty,tX,tY] = dataFace.uv
		let tex = [tX,ty, tx,ty, tx,tY, tX,tY]
		for(let i=0; i<tex.length; i+=2){
			tex[i] /= texWidth
			tex[i+1] /= texHeight
		}
		tex.texture = getTexture(dataFace.texture, textureSelectors)
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
		if(dataModel.elements) for(let i=0; i<dataModel.elements.length; i++){
			const faces = dataModel.elements[i].faces
			const [x,y,z] = dataModel.elements[i].from
			const [X,Y,Z] = dataModel.elements[i].to
			addFace(faces.down, shape, 0, [x,y,z, X,y,z, X,y,Z, x,y,Z], [0,1,0], textureSelectors)
			addFace(faces.up, shape, 1, [x,Y,Z, X,Y,Z, X,Y,z, x,Y,z], [0,-1,0], textureSelectors)
			addFace(faces.north, shape, 2, [X,Y,Z, x,Y,Z, x,y,Z, X,y,Z], [0,0,-1], textureSelectors)
			addFace(faces.south, shape, 3, [x,Y,z, X,Y,z, X,y,z, x,y,z], [0,0,1], textureSelectors)
			addFace(faces.east, shape, 4, [X,Y,z, X,Y,Z, X,y,Z, X,y,z], [-1,0,0], textureSelectors)
			addFace(faces.west, shape, 5, [x,Y,Z, x,Y,z, x,y,z, x,y,Z], [1,0,0], textureSelectors)
		}
	}
	function getShapeFromVariant(v){
		if(!shapes[v.model]){
			let shape = {verts:[[],[],[],[],[],[]], cull:{/*todo*/}, texVerts:[[],[],[],[],[],[]], normal:[[],[],[],[],[],[]], textureSelectors:{}}
			makeShape(v.model,shape, shape.textureSelectors)
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