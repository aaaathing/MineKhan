const html=`
<!doctype html>
<meta charset="utf-8">
<script>
const base256CharSet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEF!#$%&L(MNO)*+,-./:;<=WSTR>Q?@[]P^_{|}~ÀÁÂÃUVÄÅÆÇÈÉÊËÌÍKÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãGäåæçèéêHëìíîXïðñIòóôõö÷øùúJûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦYħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťZ'

const base256DecodeMap = new Map()
for (let i = 0; i < 256; i++) base256DecodeMap.set(base256CharSet[i], i)
function encodeByte(num, pad = 1) {
    let str = ""
    while (num) {
        str = base256CharSet[num & 255] + str
        num >>>= 8
    }
    return str.padStart(pad, "0")
}
function decodeByte(str) {
    let num = 0
    for (let char of str) {
        num <<= 8
        num += base256DecodeMap.get(char)
    }
    return num
}

function getPixels(str, r = 255, g = 255, b = 255) {
	const width = decodeByte(str.substr(0, 2))
	const height = decodeByte(str.substr(2, 2))
	const colorCount = decodeByte(str.substr(4, 1))
	const colors = []
	const pixels = new Uint8ClampedArray(width * height * 4)
	let pixi = 0

	for (let i = 0; i < colorCount; i++) {
		const num = decodeByte(str.substr(5 + i * 3, 3))

		let alpha = (num & 63) << 2
		let blue  = (num >>> 6 & 63) << 2
		let green = (num >>> 12 & 63) << 2
		let red   = (num >>> 18 & 63) << 2
		if (alpha >= 240) alpha = 255 // Make sure we didn't accidentally make the texture transparent

		if (red === blue && red === green) {
			red = red / 252 * r | 0
			green = green / 252 * g | 0
			blue = blue / 252 * b | 0
		}
		colors.push([ red, green, blue, alpha ])
	}

	// Special case for a texture filled with 1 pixel color
	if (colorCount === 1) {
		while (pixi < pixels.length) {
			pixels[pixi + 0] = colors[0][0]
			pixels[pixi + 1] = colors[0][1]
			pixels[pixi + 2] = colors[0][2]
			pixels[pixi + 3] = colors[0][3]
			pixi += 4
		}
		return pixels
	}

	let bytes = []
	for (let i = 5 + colorCount * 3; i < str.length; i++) { // Load the bit-packed index array
		const byte = decodeByte(str[i])
		bytes.push(byte)
	}

	const bits = Math.ceil(Math.log2(colorCount))
	const bitMask = (1 << bits) - 1
	let filledBits = 8
	let byte = bytes.shift()
	while (bytes.length || filledBits) {
		let num = 0
		if (filledBits >= bits) { // The entire number is inside the byte
			num = byte >> (filledBits - bits) & bitMask
			if (filledBits === bits && bytes.length) {
				byte = bytes.shift()
				filledBits = 8
			}
			else filledBits -= bits
		}
		else {
			num = byte << (bits - filledBits) & bitMask // Only part of the number is in the byte
			byte = bytes.shift() // Load in the next byte
			num |= byte >> (8 - bits + filledBits) // Apply the rest of the number from this byte
			filledBits += 8 - bits
		}

		pixels[pixi + 0] = colors[num][0]
		pixels[pixi + 1] = colors[num][1]
		pixels[pixi + 2] = colors[num][2]
		pixels[pixi + 3] = colors[num][3]
		pixi += 4
	}
	return pixels
}

function encodeImage(data, width, height, quality = 1) {
	// Generate pixel array
	let pix = []
	for (var i = 0; i < data.length; i++) {
		// if (i === 1024) break

		const colorChannel = i & 3 // 0 = red, 1 = green, 2 = blue, 3 = alpha
		let colorValue = data[i] >> 2 // Delete 2 bits from every color
    if(quality !== 1) colorValue = Math.max(Math.ceil(colorValue/quality)*quality,255)

		if (colorChannel === 0) { // new color
			pix.push(0)
		}

		const pixel = i >> 2
		var b = pix[pixel]
		pix[pixel] |= colorValue << ((3 - colorChannel) * 6) // Each channel is 6 bits, so pack them in in RGBA order.
	}

	// Generate string in the format \`{2 char width}{2 char height}{1 char color count}{3 chars each colors}{1 char each color index}\`
	let colorSet = Array.from(new Set(pix))
	if (colorSet.length > 256){
		console.log(\`\${colorSet.length} unique colors found in this image. It's going to break.\`)
		if(quality !== 1) throw new Error()
		return encodeImage(data,width,height, Math.ceil(colorSet.length/256))
	}
	let str = ""
	str += encodeByte(width, 2)
	str += encodeByte(height, 2)
	str += encodeByte(colorSet.length)
	for (let colorValue of colorSet) {
		str += encodeByte(colorValue, 3)
	}

	let indeces = []

	let byte = 0
	let filledBits = 0
	const bits = Math.ceil(Math.log2(colorSet.length))
	for (let colorValue of pix) {
		let num = colorSet.indexOf(colorValue)
		indeces.push(num)
		let openBits = 8 - filledBits
		let extra = 0
		if (openBits >= bits) num <<= openBits - bits // if there's room in the byte for the whole number
		else {
			extra = (num & (1 << (bits - openBits)) - 1) << (8 - (bits - openBits)) // Save the bits before we chop them off
			num >>= bits - openBits
		}
		byte |= num

		filledBits += bits
		if (filledBits >= 8) {
			str += encodeByte(byte)
			byte = extra
			filledBits -= 8
		}
	}
	if (filledBits !== 0) str += encodeByte(byte)

	return str
}
let canv=document.createElement("canvas"),ctx=canv.getContext("2d")
function doEncode(str){
	return new Promise((res,rej)=>{
		let img=new Image
		img.onload=()=>{
			canv.width=img.width
			canv.height=img.height
			ctx.drawImage(img,0,0)
			res(encodeImage(ctx.getImageData(0,0,img.width,img.height).data,img.width,img.height))
		}
		img.onerror=()=>{
			console.error(str)
			rej()
		}
		img.src=str
	})
}


(async function() {
const ns="minecraft"

function setProp(path,o,v){
for(let i=0;i<path.length;i++){
if(i===path.length-1)o[path[i]]=v
else if(!o[path[i]]) o[path[i]]={}
o=o[path[i]]
}
}

console.log('bstate')
let bstate=await fetch("/blocks_states.json").then(r=>r.json())
//let bstatestr = ""
//for(let i in bstate) bstatestr += i+":"+JSON.stringify(bstate[i])+",\\n"

console.log('model')
let model=await fetch("/blocks_models.json").then(r=>r.json())
//let modelstr = ""
//for(let i in model) modelstr += i+":"+JSON.stringify(model[i])+",\\n"

/*let tex=await fetch("https://raw.githack.com/PrismarineJS/minecraft-assets/master/data/1.21.1/texture_content.json").then(r=>r.json())
let btex = {}, itex = {}
for(let {name,texture} of tex){
	if(!texture)continue
	let td=await doEncode(texture)
	if(bstate[name]) btex[name] = td
	else itex[name] = td
}*/
console.log('btex')
let btexs=await fetch("/blocks").then(r=>r.json()), btex={}
for(let i of btexs) if(i.endsWith(".png")) btex[i.slice(0,-4)] = await doEncode("blocks/"+i)

console.log('itex')
let itexs=await fetch("/items").then(r=>r.json()), itex={}
for(let i of itexs) if(i.endsWith(".png")) itex[i.slice(0,-4)] = await doEncode("items/"+i)

console.log("ent")
let ent=await fetch("https://raw.githack.com/PrismarineJS/prismarine-viewer/master/viewer/lib/entity/entities.json").then(r=>r.json())

console.log('etex')
/*async function doetex(p){
	let etex={}
	let etexs=await fetch(p).then(r=>r.json()).catch(()=>console.error(p))
	for(let i of etexs){
		if(i.endsWith(".png")) etex[i.slice(0,-4)] = await doEncode(p+"/"+i)
		else if(i.endsWith(".mcmeta")) continue
		else etex[i] = await doetex(p+"/"+i)
	}
	return etex
}
let etex = await doetex("/entity")*/

let etexreplace = {
	"/entity/arrow":"/url/https://raw.githack.com/InventivetalentDev/minecraft-assets/1.21.4/assets/minecraft/textures/entity/projectiles/arrow.png",
	"/entity/fireworks":"url/https://raw.githack.com/InventivetalentDev/minecraft-assets/1.21.4/assets/minecraft/textures/item/firework_rocket.png",
	"/entity/steve":"url/https://raw.githack.com/InventivetalentDev/minecraft-assets/1.21.4/assets/minecraft/textures/entity/player/wide/steve.png",
	"/entity/cape_invisible":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
	"/entity/squid":"url/https://raw.githack.com/InventivetalentDev/minecraft-assets/1.21.4/assets/minecraft/textures/entity/squid/squid.png",
}
let error
let etex = {}
for(let i in ent){
	let entity = ent[i]
	for(let v in entity.textures){
		let path = entity.textures[v].split(":").pop().split("/")
		if(entity.textures[v])
		if(path[0]==="textures"){
			path.shift()
			let img="/"+path.join("/")
			let t
			try{
				t = await doEncode(etexreplace[img] || (img+".png"))
			}catch{
				try{
					t = await doEncode("/be/textures"+img)
				}catch{
				}
			}
			setProp(path,etex, t)
		}
	}
}

console.log("save")
let compress = new LZ77().compress
let data = //await new Response(new Blob([
//]).stream().pipeThrough(new CompressionStream("gzip"))).blob()
new Blob([
\`
\${document.querySelector("#compression").textContent}
let decompress = new LZ77().decompress

export default {
assets:{\${ns}:{
blockstates:JSON.parse(decompress(\${JSON.stringify(compress(JSON.stringify(bstate)))})),
models:{
block:JSON.parse(decompress(\${JSON.stringify(compress(JSON.stringify(model)))}))
},
textures:{
block:\${JSON.stringify(btex)},
item:\${JSON.stringify(itex)}
}
}},
assetsBe:{\${ns}:{
textures:JSON.parse(decompress(\${JSON.stringify(compress(JSON.stringify(etex)))})),
entity:JSON.parse(decompress(\${JSON.stringify(compress(JSON.stringify(ent)))}))
}}
}\`
], {encoding:"UTF-8"})
fetch('/save',{method:"POST",body:data})
})()
</script>

<script id="compression">
/*
 * The MIT License
 * 
 * Copyright (c) 2009 Olle Törnström studiomediatech.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * CREDIT: Initially implemented by Diogo Kollross and made publicly available
 *         on the website http://www.geocities.com/diogok_br/lz77.
 */
 
/**
 * This class provides simple LZ77 compression and decompression. 
 *
 * @author Olle Törnström olle[at]studiomediatech[dot]com
 * @created 2009-02-18 
 */
var LZ77 = function (settings) {

settings = settings || {};	

// PRIVATE

var referencePrefix = "\`";
var referenceIntBase = settings.referenceIntBase || 96;
var referenceIntFloorCode = " ".charCodeAt(0);
var referenceIntCeilCode = referenceIntFloorCode + referenceIntBase - 1;
var maxStringDistance = Math.pow(referenceIntBase, 2) - 1;
var minStringLength = settings.minStringLength || 5;
var maxStringLength = Math.pow(referenceIntBase, 1) - 1 + minStringLength;
var defaultWindowLength = settings.defaultWindowLength || 300;
var maxWindowLength = maxStringDistance + minStringLength;

var encodeReferenceInt = function (value, width) {
	if ((value >= 0) && (value < (Math.pow(referenceIntBase, width) - 1))) {
		var encoded = "";
		while (value > 0) {
			encoded = (String.fromCharCode((value % referenceIntBase) + referenceIntFloorCode)) + encoded;
			value = Math.floor(value / referenceIntBase);
		}
		var missingLength = width - encoded.length;
		for (var i = 0; i < missingLength; i++) {
			encoded = String.fromCharCode(referenceIntFloorCode) + encoded;
		}
		return encoded;
	} else {
		throw "Reference int out of range: " + value + " (width = " + width + ")";
	}
};

var encodeReferenceLength = function (length) {
	return encodeReferenceInt(length - minStringLength, 1);
};

var decodeReferenceInt = function (data, width) {
	var value = 0;
	for (var i = 0; i < width; i++) {
		value *= referenceIntBase;
		var charCode = data.charCodeAt(i);
		if ((charCode >= referenceIntFloorCode) && (charCode <= referenceIntCeilCode)) {
			value += charCode - referenceIntFloorCode;
		} else {
			throw "Invalid char code in reference int: " + charCode;
		}
	}
	return value;
};

var decodeReferenceLength = function (data) {
	return decodeReferenceInt(data, 1) + minStringLength;
};
	
// PUBLIC

/**
 * Compress data using the LZ77 algorithm.
 *
 * @param data
 * @param windowLength
 */
this.compress = function (data, windowLength) {
	windowLength = windowLength || defaultWindowLength;
	if (windowLength > maxWindowLength) {
		throw "Window length too large";
	}
	var compressed = "";
	var pos = 0;
	var lastPos = data.length - minStringLength;
	while (pos < lastPos) {
		var searchStart = Math.max(pos - windowLength, 0);
		var matchLength = minStringLength;
		var foundMatch = false;
		var bestMatch = {distance:maxStringDistance, length:0};
		var newCompressed = null;
		while ((searchStart + matchLength) < pos) {
			var isValidMatch = ((data.substr(searchStart, matchLength) == data.substr(pos, matchLength)) && (matchLength < maxStringLength));
			if (isValidMatch) {
				matchLength++;
				foundMatch = true;
			} else {
				var realMatchLength = matchLength - 1;
				if (foundMatch && (realMatchLength > bestMatch.length)) {
					bestMatch.distance = pos - searchStart - realMatchLength;
					bestMatch.length = realMatchLength;
				}
				matchLength = minStringLength;
				searchStart++;
				foundMatch = false;
			}
		}
		if (bestMatch.length) {
			newCompressed = referencePrefix + encodeReferenceInt(bestMatch.distance, 2) + encodeReferenceLength(bestMatch.length);
			pos += bestMatch.length;
		} else {
			if (data.charAt(pos) != referencePrefix) {
				newCompressed = data.charAt(pos);
			} else {
				newCompressed = referencePrefix + referencePrefix;
			}
			pos++;
		}
		compressed += newCompressed;
	}
	return compressed + data.slice(pos).replace(/\`/g, "\`\`");
};

/**
 * Decompresses LZ77 compressed data.
 *
 * @param data
 */
this.decompress = function (data) {
	var decompressed = "";
	var pos = 0;
	while (pos < data.length) {
		var currentChar = data.charAt(pos);
		if (currentChar != referencePrefix) {
			decompressed += currentChar;
			pos++;
		} else {
			var nextChar = data.charAt(pos + 1);
			if (nextChar != referencePrefix) {
				var distance = decodeReferenceInt(data.substr(pos + 1, 2), 2);
				var length = decodeReferenceLength(data.charAt(pos + 3));
				decompressed += decompressed.substr(decompressed.length - distance - length, length);
				pos += minStringLength - 1;
			} else {
				decompressed += referencePrefix;
				pos += 2;
			}
		}
	}
	return decompressed;
};
};
</script>
`
let datap="/Users/aaron/node_modules/minecraft-assets/minecraft-assets/data/1.21.1"
let datapbe="/Users/aaron/Downloads/Vanilla_Resource_Pack_1.19.10"

var fs=require("fs")
var http=require("http")
let server=http.createServer((req,res)=>{
	if(req.url === "/")return res.end(html)
	else if(req.url.startsWith("/url/")){
		fetch(req.url.replace("/url/","")).then(r=>r.arrayBuffer()).then(r=>res.end(new Uint8Array(r))).catch(r=>res.end("nono"))
		return
	}else if(req.url.startsWith("/be/")){
		fs.createReadStream(datapbe+req.url.replace("/be","")).on("error",()=>res.end("nono")).pipe(res)
		return
	}else if(req.url === "/save"){
		console.log(__dirname)
		req.pipe(fs.createWriteStream(__dirname+"/data.js"))
		res.end("doing")
		return
	}
	
	let dir
	try{
		dir=fs.statSync(datap+req.url)
	}catch{
		return res.end("no")
	}
	if(!dir.isDirectory()){
		fs.createReadStream(datap+req.url).on("error",()=>res.end("nono")).pipe(res)
	}else{
		let f = fs.readdirSync(datap+req.url)
		let i=f.indexOf(".DS_Store")
		if(i!==-1)f.splice(i,1)
		res.end(JSON.stringify(f))
	}
})
server.listen(80)