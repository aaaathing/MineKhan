import idata from "./data.js"
export const data = idata

export function loadNamespace(data){
	let blockData = [], shapes = {}
	for(let name in data.blockstates){
		let bstates = data.blockstates[name]
		if(!bstates.minekhanId) throw new Error("missing id")
		let possibleStates = {}
		if(bstates.variants){ // find name and values of states
			for(let v in bstates.variants){
				let a = v.split(",")
				for(let i=0; i<a.length; i++){
					let [statename,statevalue] = a[i].split("=")
					if(!possibleStates[statename]){
						possibleStates[statename] = []
					}
					if(!possibleStates[statename].includes(statevalue)) possibleStates[statename].push(statevalue)
				}
			}
		}
		let tagBits = {}, tagBitsI = 0 // use tags for states
		for(let statename in possibleStates){
			tagBits[statename] = [tagBitsI, possibleStates[statename].length]
			tagBitsI += Math.ceil(Math.log2(possibleStates[statename].length))
		}
		let blockstatesShapes = []
		if(bstates.variants){
			for(let v in bstates.variants){
				let id = 0
				let a = v.split(",")
				for(let i=0; i<a.length; i++){
					let [statename,statevalue] = a[i].split("=")
					id |= possibleStates[statename].indexOf(statevalue) << tagBits[statename][0]
				}
				blockstatesShapes[id] = getShapeFromVariant(bstates.variants[v])
			}
		}
		blockData[bstates.minekhanId] = {
			name,
			blockstates:possibleStates,
			blockstatesShapes,
			blockStatesShapesMask: (1<<tagBitsI)-1,
			tagBits
		}
	}
	return {blockData, shapes}

	function addFace(dataFace, shape, side, pos, normal, textureSelectors){
		pos = pos.map(c => c / 16 - 0.5)
		const [tx,ty,tX,tY] = dataFace.uv
		let tex = [tX,ty, tx,ty, tx,tY, tX,tY]
		let t = dataFace.texture
		tex.texture = t.startsWith("#") ? textureSelectors[t.substring(1)] : t
		shape.verts[side].push(pos)
		shape.texVerts.push(tex)
		shape.normal[side].push(normal)
	}
	function makeShape(dataModelName,shape, textureSelectors={}){
		/** a model (models/ folder) */
		let dataModel = getDeep(data.models, dataModelName.split(":").pop())
		if(dataModel.textures){
			for(let i in dataModel.textures){
				let t = dataModel.textures[i]
				textureSelectors[i] = t.startsWith("#") ? textureSelectors[t.substring(1)] : t
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
}

function getDeep(obj,str){
	let arr = str.split("/")
	for(let i=0; i<arr.length; i++) obj = obj[arr[i]]
	return obj
}