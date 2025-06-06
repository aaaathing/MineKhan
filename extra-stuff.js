// get latest file from: https://drive.google.com/file/d/1AHR8mciisTOgJHDQO-aJTOBE-lJe6BT3/view?usp=sharing
/*
  html for world name:
  <div style="position:absolute;top:0;left:0;width:100vw;height:100vh;background:yellow;"><a href="https://www.thingmaker.repl.co">COOL</a></div>
*/

var p = player

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}
function fill(x,y,z,x2,y2,z2, blockID){
  if(x>x2){var px=x; x=x2; x2=px}
  if(y>y2){var py=y; y=y2; y2=py}
  if(z>z2){var pz=z; z=z2; z2=pz}
  for(var X=x; x2>=X; X++){
    for(var Y=y; y2>=Y; Y++){
      for(var Z=z; z2>=Z; Z++){
        world.setBlock(X,Y,Z,blockID)
      }
    }
  }
}
var copiedBlocks = [];
function copy(x,y,z,x2,y2,z2){
  if(x>x2){var px=x; x=x2; x2=px}
  if(y>y2){var py=y; y=y2; y2=py}
  if(z>z2){var pz=z; z=z2; z2=pz}
  
  copiedBlocks = [];
  for(var X=x; x2>=X; X++){
    var xRow = [];
    for(var Y=y; y2>=Y; Y++){
      var yRow = []
      for(var Z=z; z2>=Z; Z++){
        yRow.push(world.getBlock(X,Y,Z));
      }
      xRow.push(yRow);
    }
    copiedBlocks.push(xRow);
  }
}
function paste(x,y,z){
  for(var X = 0; X<copiedBlocks.length; X++){
    var xRow = copiedBlocks[X];
    for(var Y=0; Y<xRow.length; Y++){
      var yRow = xRow[Y];
      for(var Z=0; Z<yRow.length; Z++){
        var block = yRow[Z];
        world.setBlock(X+x,Y+y,Z+z,block)
      }
    }
  }
}

var prevPos;
function fromPlayer(){
  prevPos = [p2.x, p2.y, p2.z]
}
function fillToPlayer(id){
  //fills at player feet
  fill(prevPos[0], prevPos[1]-1, prevPos[2], p2.x, p2.y-1, p2.z, id)
}

function copyToPlayer(){
  copy(prevPos[0], prevPos[1]-1, prevPos[2], p2.x, p2.y-1, p2.z);
}
function pasteAtPlayer(){
  paste(p2.x,p2.y-1,p2.z)
}
function preserveToPlayer(){
  var x=p2.x, y=p2.y, z=p2.z,
      x2=prevPos[0], y2=prevPos[1]-1, z2=prevPos[2]
  if(x>x2){var px=x; x=x2; x2=px}
  if(y>y2){var py=y; y=y2; y2=py}
  if(z>z2){var pz=z; z=z2; z2=pz}
  for(var X=x; x2>=X; X++){
    for(var Y=y; y2>=Y; Y++){
      for(var Z=z; z2>=Z; Z++){
        world.setBlock(X,Y,Z,world.getBlock(X,Y,Z))
      }
    }
  }
}
function randomToPlayer(category,nameIncludes){
  var x=p2.x, y=p2.y, z=p2.z,
      x2=prevPos[0], y2=prevPos[1]-1, z2=prevPos[2]
  if(x>x2){var px=x; x=x2; x2=px}
  if(y>y2){var py=y; y=y2; y2=py}
  if(z>z2){var pz=z; z=z2; z2=pz}
  for(var X=x; x2>=X; X++){
    for(var Y=y; y2>=Y; Y++){
      for(var Z=z; z2>=Z; Z++){
        let block = Math.floor(Math.random()*BLOCK_COUNT), start = block
        while(!blockData[block] || blockData[block].item || (category && blockData[block].category !== category) || (nameIncludes && blockData[block].Name && !(blockData[block].Name.toLowerCase().includes(nameIncludes)))){
          block++
          if(block === BLOCK_COUNT) block = 0
          if(block === start) return console.log("cant find block")
        }
        world.setBlock(X,Y,Z,block)
      }
    }
  }
}
function pasteAndFallAtPlayer(solidWhenDone = true){
	let {x,y,z} = p2
  for(var X = 0; X<copiedBlocks.length; X++){
    var xRow = copiedBlocks[X];
    for(var Y=0; Y<xRow.length; Y++){
      var yRow = xRow[Y];
      for(var Z=0; Z<yRow.length; Z++){
        var block = yRow[Z];
        if(block) world.addEntity(new entities[entityIds.BlockEntity](block,X+x,Y+y,Z+z,solidWhenDone),false,player.dimension)
      }
    }
  }
}
function fallToPlayer(solidWhenDone = true){
	var x=p2.x, y=p2.y, z=p2.z,
      x2=prevPos[0], y2=prevPos[1]-1, z2=prevPos[2]
  if(x>x2){var px=x; x=x2; x2=px}
  if(y>y2){var py=y; y=y2; y2=py}
  if(z>z2){var pz=z; z=z2; z2=pz}
  for(var X=x; x2>=X; X++){
    for(var Y=y; y2>=Y; Y++){
      for(var Z=z; z2>=Z; Z++){
				var block = world.getBlock(X,Y,Z)
        if(block) world.addEntity(new entities[entityIds.BlockEntity](block,X,Y,Z,solidWhenDone),false,player.dimension), world.setBlock(X,Y,Z,0,false,false,false,false,player.dimension)
      }
    }
  }
}
function fixTerrainToPlayer(){
	var x=p2.x, y=p2.y, z=p2.z,
      x2=prevPos[0], y2=prevPos[1]-1, z2=prevPos[2]
  if(x>x2){var px=x; x=x2; x2=px}
  if(y>y2){var py=y; y=y2; y2=py}
  if(z>z2){var pz=z; z=z2; z2=pz}
  for(var X=x; x2>=X; X++){
    for(var Y=y; y2>=Y; Y++){
      for(var Z=z; z2>=Z; Z++){
				var block = world.getBlock(X,Y,Z)
        world.setBlock(X,Y,Z,world.getOriginalBlock(X,Y,Z))
      }
    }
  }
}

function hcyl(bottom, height, radius, id) {
    let radsq = radius * radius
    let innerRadsq = (radius - 1.2) * (radius - 1.2)
    height += bottom
    for (let x = -radius; x <= radius; x++) {
        for (let y = bottom; y < height; y++) {
            for (let z = -radius; z <= radius; z++) {
                let d = x * x + z * z
                if (d < radsq && d >= innerRadsq) {
                    world.setBlock(p2.x + x, p2.y + y, p2.z + z, id)
                }
            }
        }
    }
}

function cyl(bottom, height, radius, id) {
    let radsq = radius * radius
    height += bottom
    for (let x = -radius; x <= radius; x++) {
        for (let y = bottom; y < height; y++) {
            for (let z = -radius; z <= radius; z++) {
                let d = x * x + z * z
                if (d < radsq) {
                    world.setBlock(p2.x + x, p2.y + y, p2.z + z, id)
                }
            }
        }
    }
}

function sphereoid(w, h, d, id) {
    let w2 = w * w
    let h2 = h * h
    let d2 = d * d
    let w3 = (w - 1.5) * (w - 1.5)
    let h3 = (h - 1.5) * (h - 1.5)
    let d3 = (d - 1.5) * (d - 1.5)

    for (let y = -h; y < h; y++) {
        for (let x = -w; x <= w; x++) {
            for (let z = -d; z <= d; z++) {
                let n = x * x / w2 + y * y / h2 + z * z / d2
                let n2 = x * x / w3 + y * y / h3 + z * z / d3
                if (n < 1 && n2 >= 1) {
                    world.setBlock(p2.x + x, p2.y + y, p2.z + z, id)
                }
            }
        }
    }
}

function sphereoidAt(X,Y,Z,w, h, d, id) {
    let w2 = w * w
    let h2 = h * h
    let d2 = d * d
    let w3 = (w - 1.5) * (w - 1.5)
    let h3 = (h - 1.5) * (h - 1.5)
    let d3 = (d - 1.5) * (d - 1.5)

    for (let y = -h; y < h; y++) {
        for (let x = -w; x <= w; x++) {
            for (let z = -d; z <= d; z++) {
                let n = x * x / w2 + y * y / h2 + z * z / d2
                let n2 = x * x / w3 + y * y / h3 + z * z / d3
                if (n < 1 && n2 >= 1) {
                    world.setBlock(X + x, Y + y, Z + z, id)
                }
            }
        }
    }
}

function blockTxt(txt, block, bgBlock){
block = block || block === 0 ? block : blockIds.glowstone;
bgBlock = bgBlock || 0;
var chars = {
  A:[
      "11111",
      "1---1",
      "11111",
      "1---1",
      "1---1"
    ],
  B:[
      "1111 ",
      "1---1",
      "1111 ",
      "1---1",
      "1111 "
    ],
  C:[
      " 1111",
      "1",
      "1",
      "1",
      " 1111"
    ],
  D:[
      "1111 ",
      "1---1",
      "1---1",
      "1---1",
      "1111"
    ],
  E:[
      "11111",
      "1",
      "11111",
      "1",
      "11111"
    ],
  F:[
      "11111",
      "1",
      "11111",
      "1",
      "1"
    ],
  G:[
      "11111",
      "1",
      "1--11",
      "1---1",
      "11111"
    ],
  H:[
      "1---1",
      "1---1",
      "11111",
      "1---1",
      "1---1"
    ],
  I:[
      "111",
      "-1",
      "-1",
      "-1",
      "111"
    ],
  J:[
      "11111",
      "---1",
      "---1",
      "1--1",
      "1111"
    ],
  K:[
      "1---1",
      "1--1",
      "111",
      "1--1",
      "1---1"
    ],
  L:[
      "1",
      "1",
      "1",
      "1",
      "11111"
    ],
  M:[
      "11111",
      "1-1-1",
      "1-1-1",
      "1-1-1",
      "1-1-1"
    ],
  N:[
      "1---1",
      "11--1",
      "1-1-1",
      "1--11",
      "1---1"
    ],
  O:[
      "11111",
      "1---1",
      "1---1",
      "1---1",
      "11111"
    ],
  P:[
      '11111',
      "1---1",
      "11111",
      "1",
      "1"
    ],
  Q:[
      "11111",
      "1---1",
      "1---1",
      "1--11",
      "11111",
      "-----1"
    ],
  R:[
      "11111",
      "1---1",
      "11111",
      "1--1",
      "1---1"
    ],
  S:[
      "11111",
      "1",
      "11111",
      "----1",
      "11111"
    ],
  T:[
      "11111",
      "--1",
      "--1",
      "--1",
      "--1"
    ],
  U:[
      "1---1",
      "1---1",
      "1---1",
      "1---1",
      "11111"
    ],
  V:[
      "1---1",
      "1---1",
      "-1-1",
      "-1-1",
      "--1"
    ],
  W:[
      "1-1-1",
      "1-1-1",
      "1-1-1",
      "1-1-1",
      "11111"
    ],
  X:[
      "1---1",
      "-1-1",
      "--1",
      "-1-1",
      "1---1"
    ],
  Y:[
      "1---1",
      "-1-1",
      "--1",
      "--1",
      "--1"
    ],
  Z:[
      "11111",
      "---1",
      "--1",
      "-1",
      "11111"
    ],
  a:[
      "-111",
      "----1",
      "-1111",
      "1---1",
      "-1111"
    ],
  b:[
      "1",
      "1",
      "1111",
      "1---1",
      "1111"
    ],
  c:[
      "",
      "-1111",
      "1",
      "1",
      "-1111"
    ],
  d:[
      "----1",
      "----1",
      "-1111",
      "1---1",
      "-1111"
    ],
  e:[
      "-111",
      "1---1",
      "11111",
      "1",
      "-1111"
    ],
  f:[
      "--111",
      "-1",
      "11111",
      "-1",
      "-1"
    ],
  g:[
      "",
      "-111",
      "1---1",
      "-1111",
      "----1",
      "-111"
    ],
  h:[
      "1",
      "1",
      "1111",
      "1---1",
      "1---1"
    ],
  i:[
      "",
      "1",
      "",
      "1",
      "1"
    ],
  j:[
      "---1",
      "",
      "---1",
      "1--1",
      "-11"
    ],
  k:[
      "1",
      "1-1",
      "11",
      "1-1",
      "1--1"
    ],
  l:[
      "1",
      "1",
      "1",
      "1",
      "1"
    ],
  m:[
      "",
      "",
      "1111",
      "1-1-1",
      "1-1-1"
    ],
  n:[
      "",
      "1-11",
      "11--1",
      "1---1",
      "1---1"
    ],
  o:[
      "",
      "-111",
      "1---1",
      "1---1",
      "-111"
    ],
  p:[
      "",
      "1111",
      "1---1",
      "1111",
      "1"
    ],
  q:[
      "",
      "-1111",
      "1---1",
      "-1111",
      "----1"
    ],
  r:[
      "",
      "",
      "1-111",
      "11",
      "1"
    ],
  s:[
      "-111",
      "1",
      "-111",
      "----1",
      "-111"
    ],
  t:[
      "",
      "-1",
      "111",
      "-1",
      "-11"
    ],
  u:[
      "",
      "",
      "1---1",
      "1---1",
      "-1111"
    ],
  v:[
      "",
      "",
      "1---1",
      "-1-1",
      "--1"
    ],
  w:[
      "",
      "",
      "1-1-1",
      "1-1-1",
      "-1-1"
    ],
  x:[
      "",
      "",
      "1--1",
      "-11",
      "1--1"
    ],
  y:[
      "",
      "1---1",
      "-1-1",
      "--1",
      "11-"
    ],
  z:[
      "",
      "1111",
      "--1",
      "-1",
      "1111"
    ],
  1:[
      "-11",
      "1-1",
      "--1",
      "--1",
      "11111"
    ],
  2:[
      "1111",
      "----1",
      "--11",
      "-1",
      "11111"
    ],
  3:[
      "1111",
      "----1",
      "1111",
      "----1",
      "1111"
    ],
  4:[
      "1--1",
      "1--1",
      "11111",
      "---1",
      "---1"
    ],
  5:[
      "11111",
      "1",
      "1111",
      "----1",
      "1111"
    ],
  6:[
      "-111",
      "1",
      "1111 ",
      "1---1",
      "-111"
    ],
  7:[
      "11111",
      "---1",
      "--1",
      "-1",
      "1"
    ],
  8:[
      "-111",
      "1---1",
      "-111",
      "1---1",
      "-111"
    ],
  9:[
      "-111",
      "1---1",
      "-1111",
      "----1",
      "-111"
    ],
  0:[
      "-111",
      "1---1",
      "1---1",
      "1---1",
      "-111"
    ],
  "~":[
        "-1-1",
        "1-1"
      ],
  "`":[
      "1",
      "-1"
      ],
  "!":[
        "1",
        "1",
        "1",
        "",
        "1"
      ],
  "@":[
        "11111",
        "1---1",
        "1-111",
        "1-1-1",
        "11111"
      ],
  "#":[
        "-1-1",
        "11111",
        "-1-1",
        "11111",
        "-1-1"
      ],
  "$":[
        "11111",
        "1-1",
        "11111",
        "--1-1",
        "11111"
      ],
  "%":[
        "----1",
        "1--1",
        "--1",
        "-1--1",
        "1"
      ],
  "^":[
        "--1",
        "-1-1",
        "-1-1"
      ],
  "&":[
      "-1",
      "1-1",
      "-11-1",
      "1--1",
      "-11-1"
    ],
  "*":[
        "--1",
        "-111",
        "--1-",
        "-1-1",
      ],
  "(":[
        "--1",
        "-1",
        "-1",
        "-1",
        "--1"
      ],
  ")":[
        "--1",
        "---1",
        "---1",
        "---1",
        "--1"
      ],
  "-":[
        "",
        "",
        "111"
      ],
  "_":[
        "",
        "",
        "",
        "",
        "11111"
      ],
  "=":[
        "",
        "-111",
        "",
        "-111"
      ],
  "+":[
        "",
        "--1",
        "-111",
        "--1"
      ],
  "[":[
        "-11",
        "-1",
        "-1",
        "-1",
        "-11"
      ],
  "]":[
        "--11",
        "---1",
        "---1",
        "---1",
        "--11"
      ],
  "{":[
        "--11",
        "--1",
        "-1",
        "--1",
        "--11"
      ],
  "}":[
        "-11",
        "--1",
        "---1",
        "--1",
        "-11"
      ],
  "|":[
        "-1",
        "-1",
        "-1",
        "-1",
        "-1"
      ],
  ":":[
        "",
        "1",
        "",
        "1"
      ],
  ";":[
        "",
        "1",
        "",
        "1",
        "1"
      ],
  "'":[
        "--1",
        "--1"
      ],
  '"':[
        "-1-1",
        "-1-1"
      ],
  "<":[
        "--1",
        "-1",
        "1",
        "-1",
        "--1"
      ],
  ">":[
        "1",
        "-1",
        "--1",
        "-1",
        "1"
      ],
  ",":[
        "",
        "",
        "",
        "",
        "-1",
        "1",
      ],
  ".":[
        "",
        "",
        "",
        "",
        "1"
      ],
  "/":[
        "---1",
        "--1",
        "--1",
        "-1",
        "-1"
      ],
  "\\":[
        "-1",
        "--1",
        "--1",
        "---1",
        "---1"
      ],
  "?":[
        "-111",
        "1---1",
        "--11",
        "",
        "--1"
      ],
};
var charLens = {
  I:4,
  i:2,
  l:2,
  t:4,
  x:5,
  z:5,
  " ":3,
  "-":4,
  "!":2,
  ".":2,
  ",":3,
  "|":3,
  "<":4,
  ">":4,
  ":":2,
  ";":2,
};
  async function char(c,cx,cy,cz,block,bgBlock){
    if(!chars[c]){return}
    c = chars[c];
    for(var y=0;y<c.length;y++){
      var row=c[y];
      for(var x=0;x<row.length;x++){
        if(row[x]==="1"){
          world.setBlock(cx+x, cy-y,cz,block);
        }else if(bgBlock){
          world.setBlock(cx+x, cy-y,cz,bgBlock);
        }
      }
    }
  }

  var x = 0, y = 0;
  for(var i=0; i<txt.length; i++){
    if(txt[i] === "\n"){
      x = 0;
      y += 6;
    }else{
      char(txt[i], p2.x+x, p2.y+y,p2.z, block, bgBlock);
      x += charLens[txt[i]] || 6;
    }
  }
};
cmds.push({
  name:"blockTxt",
  info:"Writes text with blocks. The block argument is the block used to write it",
  args: ["text","block"],
  func: split => {
    if(!split.text) return
    let id = blockIds[split.block]
    if(!split.block) id = 1
    blockTxt(split.text, id)
  }
})

/*var getPixels = function(str) {
  var colors = []
  var pixels = []
  var dCount = 0
  for (;str[4 + dCount] === "0"; dCount++) {}
  var ccount = parseInt(str.substr(4+dCount, dCount+1), 36)
  for (var i = 0; i < ccount; i++) {
    var num = parseInt(str.substr(5 + 2*dCount + i * 7, 7), 36)
    colors.push([ num >>> 24 & 255, num >>> 16 & 255, num >>> 8 & 255, num & 255 ])
  }
  for (let i = 5 + 2*dCount + ccount * 7; i < str.length; i++) {
    let num = parseInt(str[i], 36)
    pixels.push(colors[num][0], colors[num][1], colors[num][2], colors[num][3])
  }
  return pixels
};*/
const base256CharSet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEF!#$%&L(MNO)*+,-./:;<=WSTR>Q?@[]P^_{|}~ÀÁÂÃUVÄÅÆÇÈÉÊËÌÍKÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãGäåæçèéêHëìíîXïðñIòóôõö÷øùúJûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦYħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťZ'
const base256DecodeMap = new Map()
for (let i = 0; i < 256; i++) base256DecodeMap.set(base256CharSet[i], i)
function decodeByte(str) {
  let num = 0
  for (let char of str) {
    num <<= 8
    num += base256DecodeMap.get(char)
  }
  return num
}
var getPixels = function(str, r = 255, g = 255, b = 255) {
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
var averageColors = []
var tempCanv = document.createElement("canvas")
tempCanv.width = tempCanv.height = 16
var tempCtx = tempCanv.getContext("2d")
for(var b = 1; b<BLOCK_COUNT; b++){
  var obj = blockData[b]
  var tex = textures[obj.textures[2]]
  if(typeof tex === "string" && obj.shape === shapes.cube && !obj.onupdate && !obj.transparent && !obj.item && !obj.edible){
    var pix = getPixels(tex)
    var trans
    for(var i=0; i<pix.length; i+=4){
      tempCtx.fillStyle = `rgba(${pix[i]},${pix[i+1]},${pix[i+2]},${pix[i+3]})`
      tempCtx.fillRect(i >> 2 & 15, i >> 6, 1,1)
    }
    tempCtx.drawImage(tempCanv, 0,0,1,1)
    var col = tempCtx.getImageData(0, 0, 1, 1).data
    averageColors[obj.id] = col
  }
}
function average(a,b,c,d){
  return (a+b+c+d) / 4
}
function wait(ms){
  return new Promise(resolve => setTimeout(() => resolve(), ms))
}
var image = new Image()
var imageRes = 1
image.onload = async function(){
  console.log("Rendering image...")
  var px = p2.x, py = p2.y, pz = p2.z, dimension = player.dimension
  tempCanv.width = image.width / imageRes, tempCanv.height = image.height / imageRes
  tempCtx.fillStyle = "white"
  tempCtx.fillRect(0,0, tempCanv.width,tempCanv.height)
  tempCtx.drawImage(image, 0,0, tempCanv.width,tempCanv.height)
  var pix = tempCtx.getImageData(0, 0, tempCanv.width,tempCanv.height).data
  if(blockImg.data_debug) console.log(pix)
  var x = -1, y = 0
  for(var i=0; i<pix.length; i+=4){
    var r = pix[i], g = pix[i+1], b = pix[i+2], a = pix[1+3]
    x ++
    if(x >= tempCanv.width){x = 0; y++}
    if(!a) continue
    //find closest color
    var closest
    var dist = Infinity
    for(var c=0; c<averageColors.length; c++){
      if(!averageColors[c]) continue
      var col = averageColors[c]
      var d = average(abs(col[0]-r), abs(col[1]-g), abs(col[2]-b), abs(col[3]-a))
      if(d < dist){
        dist = d
        closest = c
      }
    }
    try{
      world.setBlock(px+x, py+(tempCanv.height-y), pz, closest, false,false,false,false, dimension)
    }catch(e){
      console.log(e)
    }
    if(blockImg.data_speed) await wait(blockImg.data_speed)
  }
  console.log("Image done!")
}
function blockImg(url, res, debug, speed){
  console.log("Loading image...")
  imageRes = res || 1
  image.src = url
  image.crossOrigin = ""
  blockImg.data_debug = debug
  blockImg.data_speed = speed || speed === 0 ? speed : 50
}
cmds.push({
  name:"blockImg",
  info:"Draws images with blocks.",
  args:["url", "resolution","speed"],
  func: split => {
    blockImg(split.url, parseInt(split.resolution), false, parseInt(split.speed))
  }
})
//do this image: https://i.ibb.co/mDMXP6x/i | oh it doesn't have cors
//this one works: https://i.imgur.com/ZbfRdP0l.png

//moving inventory item
/*
var i=JSON.parse(
"[{\"id\":238,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":238,\"amount\":2},{\"id\":2,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":2,\"amount\":1},{\"id\":238,\"amount\":2},{\"id\":238,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":238,\"amount\":2},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":4,\"amount\":6},{\"id\":238,\"amount\":1},{\"id\":147,\"amount\":2},{\"id\":238,\"amount\":1},{\"id\":2,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":4,\"amount\":6},{\"id\":4,\"amount\":6},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":4,\"amount\":6},{\"id\":147,\"amount\":1},{\"id\":4,\"amount\":6},{\"id\":147,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":238,\"amount\":2},{\"id\":238,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":4,\"amount\":6},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":238,\"amount\":4},{\"id\":4,\"amount\":6},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":2,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":238,\"amount\":2},{\"id\":238,\"amount\":2},{\"id\":4,\"amount\":6},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":2,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":147,\"amount\":2},{\"id\":238,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":238,\"amount\":2},{\"id\":147,\"amount\":1},{\"id\":4,\"amount\":6},{\"id\":238,\"amount\":1},{\"id\":147,\"amount\":2},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":4,\"amount\":6},{\"id\":147,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":238,\"amount\":2},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":238,\"amount\":2},{\"id\":2,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":2},{\"id\":238,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":147,\"amount\":7},{\"id\":238,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":9,\"amount\":64},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":238,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1},{\"id\":147,\"amount\":1}]")
inventory.space.splice(0,inventory.space.length)
for(var j=0; j<i.length;j++) inventory.space[j] = i[j]
var keys = {}
canvas.addEventListener("keydown", e => {
  keys[e.key] = true
})
canvas.addEventListener("keyup", e => {
  keys[e.key] = false
})
var item = {x:0,y:0,s:inventory.size,moved:false}
item.y = item.x = item.s*1/4
function moveItem(x,y){
  item.x += item.s * x
  item.y += item.s * y
  item.moved = true
}
function loop(){
  item.moved = false
  if(keys.ArrowLeft) moveItem(-1,0)
  if(keys.ArrowRight) moveItem(1,0)
  if(keys.ArrowUp) moveItem(0,-1)
  if(keys.ArrowDown) moveItem(0,1)
  if(item.moved){
    document.onmousemove(item)
  }
}
setInterval(loop,1000)
*/

//Panorama generator
let pan = {
  rotY:0,
  w:0,
  h:0,
  y:0,
  c:document.createElement("canvas"),
  res:0.25,
  a:document.createElement("a"),
  download: function(){
    this.a.href = this.c.toDataURL()
    this.a.download = ""
    this.a.click()
  },
  i:null,
	panoramaV1(){
		if(getScene() !== "pause") return console.log("Please have a active world and pause")
		console.log("Preparing...")
		pan.w = innerWidth
		pan.h = innerHeight
		player.transformation.copyMatrix(defaultTransformation)
		player.FOV(90)
		let matrix = player.getMatrix()
		let point0 = projectPointToScreen(matrix,[0,-0.5,0.5])
		let point1 = projectPointToScreen(matrix,[0,0.5,0.5])
		pan.y = point0[1]
		pan.h = point1[1] - point0[1]
		pan.rotY = -pan.res //a bit less then 0
		pan.c.width = 360 / pan.res
		pan.c.height = pan.h
		console.log("Rendering...")
		var i = pan.i = setInterval(function(){
			pan.rotY += pan.res
			var isDone = false
			if(pan.rotY > 361){
				isDone = true
			}
			var rotY = pan.rotY * Math.PI / 180
			player.rx = 0
			player.ry = rotY
			player.setDirection()
			world.render()
			gl.flush()
			pan.ctx.drawImage(gl.canvas, (pan.w/2)-1,pan.y,1,pan.h, (pan.rotY-1) / pan.res,0,1,pan.h)
			var done = Math.floor((pan.rotY / 360 * 100)*100)/100
			ctx.fillStyle = "white"
			ctx.fillRect(0,0,canvas.width,40)
			ctx.font = "20px Arial"
			ctx.fillStyle = "black"
			ctx.textAlign = "left"
			ctx.fillText(done+"%",0,40)
			ctx.strokeStyle = "red"
			ctx.lineWidth = 2
			ctx.beginPath()
			ctx.moveTo(point0[0],point0[1])
			ctx.lineTo(point1[0],point1[1])
			ctx.stroke()
			if(isDone){
				clearInterval(i)
				console.log("Done!")
				ctx.drawImage(pan.c,0,0,canvas.width,canvas.height)
				ctx.fillStyle = "white"
				ctx.fillRect(0,0,canvas.width,40)
				ctx.font = "20px Arial"
				ctx.fillStyle = "black"
				ctx.textAlign = "left"
				ctx.fillText("Done!",0,40)
			}
		},17)
	},
	async panoramaV2(){
		if(getScene() !== "pause") return console.log("Please have a active world and pause")
		player.transformation.copyMatrix(defaultTransformation)
		player.FOV(90)
		let matrix = player.getMatrix()
		let point0 = projectPointToScreen(matrix,[0.5,-0.5,0.5])
		let point1 = projectPointToScreen(matrix,[-0.5,0.5,0.5])
		let w = Math.round(point1[0] - point0[0])
		let h = Math.round(point1[1] - point0[1])
		let y = Math.round(innerHeight/2-h/2)
		let x = Math.round(innerWidth/2-w/2)
		pan.c.width = w*6
		pan.c.height = h
		function copyToCanv(tox){
			tox *= w
			player.setDirection()
			world.render()
			gl.flush()
			pan.ctx.drawImage(gl.canvas, x,y,w,h, tox,0,w,h)
		}
		let offsetry = player.ry
		player.rx = 0, player.ry = offsetry
		copyToCanv(0)
		await sleep(200)
		player.rx = 0, player.ry = offsetry+Math.PI2
		copyToCanv(1)
		await sleep(200)
		player.rx = 0, player.ry = offsetry+Math.PI
		copyToCanv(2)
		await sleep(200)
		player.rx = 0, player.ry = offsetry-Math.PI2
		copyToCanv(3)
		await sleep(200)
		player.rx = Math.PI2, player.ry = offsetry
		copyToCanv(4)
		await sleep(200)
		player.rx = -Math.PI2, player.ry = offsetry
		copyToCanv(5)
		await sleep(200)
		console.log("Done! Run pan.download() to download")
		ctx.drawImage(pan.c,0,0,canvas.width,canvas.height)
	}
}
pan.ctx = pan.c.getContext("2d")
const panorama = pan.panoramaV2
function multiplyMatrixAndPoint(matrix, point) {
  let c0r0 = matrix[ 0], c1r0 = matrix[ 1], c2r0 = matrix[ 2], c3r0 = matrix[ 3];
  let c0r1 = matrix[ 4], c1r1 = matrix[ 5], c2r1 = matrix[ 6], c3r1 = matrix[ 7];
  let c0r2 = matrix[ 8], c1r2 = matrix[ 9], c2r2 = matrix[10], c3r2 = matrix[11];
  let c0r3 = matrix[12], c1r3 = matrix[13], c2r3 = matrix[14], c3r3 = matrix[15];
  let x = point[0];
  let y = point[1];
  let z = point[2];
  let w = point[3];
  let resultX = (x * c0r0) + (y * c0r1) + (z * c0r2) + (w * c0r3);
  let resultY = (x * c1r0) + (y * c1r1) + (z * c1r2) + (w * c1r3);
  let resultZ = (x * c2r0) + (y * c2r1) + (z * c2r2) + (w * c2r3);
  let resultW = (x * c3r0) + (y * c3r1) + (z * c3r2) + (w * c3r3);
  return [resultX, resultY, resultZ, resultW];
}
function projectPointToScreen(matrix,point){
  point[3] = 1
  point = multiplyMatrixAndPoint(matrix,point)
  point[0] /= point[3]
  point[1] /= point[3]
  point[2] /= point[3]
  point[0] = point[0]/2+0.5
  point[1] = point[1]/2+0.5
  point[0] *= innerWidth
  point[1] *= innerHeight
  return point
}
let defaultTransformation = new Matrix([ -10,0,0,0,0,10,0,0,0,0,-10,0,0,0,0,1 ])

/*
get diamonds:
javascript:function get(){world.addEntity(new Item(p2.x,p2.y,p2.z,0,0,0,blockIds.diamond))}(async function(){for(var i=0; i<64;i++){get();await new Promise(r=>{setTimeout(r,100)});}})();sideMessage("You got","64 BIG FAT DIAMOND!!!!!!!!!!!!!!!!")

get bread:
javascript:function get(){world.addEntity(new Item(p2.x,p2.y,p2.z,0,0,0,blockIds.bread))}(async function(){for(var i=0; i<64;i++){get();await new Promise(r=>{setTimeout(r,100)});}})();sideMessage("You got","A LOT OF PUFFY SQUISHY SLIMY STRECHTY SOFT HEAVY ROUGH BULKY BREAD!!!!!!!!!!!!!!!!")
*/

//new sounds!
var s = document.createElement("script");
s.src = "https://cdnjs.cloudflare.com/ajax/libs/ZzFX/2.29/ZzFX.micro.js";
document.body.appendChild(s);
function setSound(name, sound){
  var block = blockData[blockIds[name]];
  block.digSound = block.stepSound = sound;
}
var soup = new Audio("https://ssl.gstatic.com/dictionary/static/sounds/20200429/soup--_us_1.mp3");
function playTheSound(audio){
  audio.currentTime = 0;
  audio.play();
}

setSound("soup", "damage.hit1");
setSound("soup2", "damage.drown1");
setSound("soup4", () => {playTheSound(soup)});
setSound("tuff", () => zzfx(...[1.54,,326,,.36,.29,4,2.93,.2,.6,,,.14,.8,,.2,.4,.84,.04]));
setSound("slimeBlock", () => zzfx(...[,,554,.02,.02,.21,4,1.07,-34,18,,,,,-1.9,,,.94,.11]));
setSound("redWool", () => zzfx(...[,0,130.8128,,,,2]));
setSound("orangeWool",() => zzfx(...[,0,146.8324,,,,2]));
setSound("yellowWool",() => zzfx(...[,0,164.8138,,,,2]));
setSound("limeWool",() => zzfx(...[,0,174.6141,,,,2]));
setSound("greenWool",() => zzfx(...[,0,195.9977,,,,2]));
setSound("cyanWool",() => zzfx(...[,0,,,,,2]));
setSound("blueWool",() => zzfx(...[,0,246.9417,,,,2]));
setSound("purpleWool",() => zzfx(...[,0,261.6256,,,,2]));

/*
//Mess up your world!
function random(min,max){
  return Math.round((Math.random()*(max-min))+min)
}
var interval = setInterval(function(){
  var x = p2.x+random(-16,16)
  var y = p2.y+random(-16,16)
  var z = p2.z+random(-16,16)
  world.setBlock(x,y,z,random(0,80))
},50)
*/

/*
//keep looking at someone:
var who=prompt("who")
var i=setInterval(() => {
  var e=playersInv[who]
  if(!e){
    clearInterval(i)
    return
  }
  lookAt(e.x,e.y,e.z)
},50)
*/

/*
//snow everywhere!
world.chunks[0][0].__proto__.carveCaves=function(){
    for(var x=0; x<16;x++){
        for(var z=0;z<16;z++){
            this.world.spawnBlock(x+this.x,this.tops[z*16+x]+1,z+this.z,blockIds.snow|(0x1800<<5))
        }
    }
    this.caves = true
}
*/
/*
//hex to rgb
function c(h){
  h=h.replace("#","")
  h=h.split("")
  var r=h.splice(0,2).join("")
  var g=h.splice(0,2).join("")
  var b=h.join("")
  r=parseInt(r,16)
  g=parseInt(g,16)
  b=parseInt(b,16)
  return[r,g,b]
}
*/

/*
get fake oak planks: /sendeval @A var fall=blockIds.oakPressurePlate|TRAPDOOR|FLIP;blockIds.fall=fall;blockData[fall].Name="fake planks"
get fake blackstone: /sendeval 2-people var fall=blockIds.polishedBlackstonePressurePlate|STAIR;blockIds.fall=fall;runCmd('/give @s fall',p3,false,()=>{})
make everyone kill themself: /sendeval @A worldSettings.killCmdOff=false;runCmd("/kill @s")
make tp and give command turn into kill command: /sendeval @A function getCmd(name){for(var i=0; i<cmds.length; i++){if(cmds[i].name.toLowerCase() === name.toLowerCase()){return cmds[i]}}};getCmd("tpplayer").func=getCmd("give").func=getCmd("kill").func
rainbow As: /title §1A§2A§3A§4A§5A§6A§7A§8A§9A§aA
no kill cmd: /sendeval TokyoNezuko win.eachFrame=()=>worldSettings.killCmdOff=true
get white block: /sendeval 2-people newInvItem(blockIds.tnt|CROSS)
make stuff look like tnt: /sendeval @A blockData[blockIds.dirt].textures.fill('tntSides');blockData[blockIds.grass].textures.fill('superTnt');blockData[blockIds.sand].textures.fill('ultraTnt');blockData[blockIds.stone].textures.fill('untnt')
random menu: /sendeval @A customMenu(); customMenuEl.innerHTML='What would you like to do?<br><button onclick=\"runCmd(`/kill @s`)\"><b style=\"color:red;\">die</b></button> <button id=\"leavehdj\">Leave server</button>'; document.querySelector('#leavehdj').onclick=()=>multiplayer.close()
colorful particles around players: /sendeval @A var amount=10;win.doAParticleThingyHere=function(x,y,z){world.addParticle(new RedstoneParticle(x,y,z,[rand(),rand(),rand()]),p.dimension)};win.eachFrame=()=>{if(!tick)return; var p=player;for(var j=0;j<amount;j++)doAParticleThingyHere(p.x+rand(-1,1),p.y+rand(-2,1),p.z+rand(-1,1)); for(var i in players){var p=players[i];for(var j=0;j<amount;j++)doAParticleThingyHere(p.x+rand(-1,1),p.y+rand(-2,1),p.z+rand(-1,1)); for(var y=p.y;y<p.y+30;y++)if(rand()<0.1)doAParticleThingyHere(p.x,y,p.z)}}
no ban: /sendeval @A getCmd('ban').func=()=>win.ban(username)
grass texture go around: /sendeval @A blockData[blockIds.grass].textures.fill('grassTop')
change tps: /sendeval @A tickSpeed=10;tickTime=1000/tickSpeed;showTitle(tickSpeed+" ticks per second")
make water break everything solid: /sendeval @A if(host)blockData.forEach(r=>r.liquidBreakable=r.solid)
make people say ip: /sendeval @a fetch('https://server.thingmaker.repl.co/account',{credentials:'include'}).then(r=>r.json()).then(r=>r.ip&&Messages.write("my ips: "+r.ip.join(', ')))
make people say location from ip: /sendeval @a fetch('https://ipinfo.io/json').then(r=>r.json()).then(r=>Messages.write('<a href="https://www.google.com/maps/search/?api=1&query='+r.loc+'">my location</a>'))
make people say real location: /sendeval @a navigator.geolocation.getCurrentPosition(function(p){Messages.write('<a href="https://www.google.com/maps/search/?api=1&query='+p.coords.latitude+','+p.coords.longitude+'">my location</a>')});
super fast: /sendeval @A p.jumpSpeed=2;p.defaultSpeed=1;p.sprintSpeed=8
super slow: /sendeval @A p.jumpSpeed=0.25;p.defaultSpeed=0.01;p.sprintSpeed=1.1
fire fast spread: /sendeval @A blockData.forEach(r=>{if(r.burnChance)r.burnChance=1});worldSettings.fireSpreads=true
sky color: /sendEval @A if(!skybox.rendera)skybox.rendera=skybox.render;skybox.render=()=>{skybox.render=()=>{skyBottom[0]=50;skyBottom[1]=20;skyBottom[2]=20;skybox.rendera()}}
put marker: /sendeval 2-people Messages.add('<h1 style="width:100%;border:10px solid red;"></h1>')
get weird glitched chair: /sendeval 2-people blockIds.c=blockIds.oakChair|CROSS;runCmd('/give @s c')
*///censor shouting: /sendeval @A for(var i of Messages.remove)if(i.with==='shouting'){Messages.remove.splice(Messages.remove.indexOf(i),1)};a=/(^|\s)[A-Z]+($|\s)/g;Messages.remove.push({replace:a,with:'shouting'})
/*unclosable menu: /sendeval @A customMenu();customMenuEl.innerHTML="<style>#customMenuClose{display:none;}</style> you can't close this!!!"
show title & kill turn into say: /sendeval @a getCmd('title').func=getCmd('kill').func=split=>Messages.write(split.join(' '))
make person save: /sendeval @A if(host){save().then(r=>Messages.write('saved'))}
reload world: /sendeval @A world.chunks=[];world.loaded=[];world.lastChunk=",";showTitle('world reloaded','','red')
reload world from person's save: /sendeval @A var worldName='truthordare',username='Thunder_Wolf';win.eachFrame=()=>p.spectator=true;fetch('https://minekhan.repl.co/server/account/'+username+"/saves").then(r=>r.json()).then(r=>{for(var i of r){if(i.name===worldName){r=i;break}};world.chunks=[];world.loaded=[];world.lastChunk=",";world.loadSave(r.code);showTitle('world reloaded','','red');win.eachFrame=0})
reload from marketplace: /sendeval @A win.eachFrame=()=>p.spectator=true;fetch('https://minekhan.repl.co/server/map/MineKhan_Update_1').then(r=>r.json()).then(r=>{if(r.file){r.code=JSON.parse(r.file).code}world.chunks=[];world.loaded=[];world.lastChunk=",";try{world.loadSave(r.code)}catch{};showTitle('world reloaded','','red');win.eachFrame=0})
random person say math: /sendeval @a if(rand() > 0.75){Messages.write(round(rand(100))+"+"+round(rand(100))+"="+round(rand(100)))}
mute person: /sendeval bentleypotts15 Messages.write=()=>Messages.add('shut up')
make person only spectate: /sendeval bentleypotts15 win.eachFrame=()=>p.spectator=true
rickroll: /sendeval @A if(win.a&&win.a.pause){win.a.pause()}var a=win.a=new Audio();a.src="https://picturelements.github.io/images/nggyu.mp3";a.preservesPitch=false;a.playbackRate=0.5;a.play()
menu music: /sendEval @A var a=music.menu[1];a.gain.value=1;playMusic(a)
reload: /sendeval @A if(host){save().then(r=>location.reload())}else{location.reload()}
analytics: /sendEval @A Messages.write(analytics.fps+" fps, "+analytics.tps+" tps.")
mob turn into dirt: /sendEval @A eachTick=()=>{if(!multiplayer||host)return;for(let i=0;i<world.entities.length;i++){if(world.entities[i].mob){let pe=world.entities[i];let e=new entities[entityIds.BlockEntity](blockIds.dirt,pe.x,pe.y,pe.z);e.dimension=pe.dimension;e.id=pe.id;e.spawn=Infinity;e.despawns=Infinity;e.mob=e.hostile=true;world.entities[i]=e;let chunk=world.getChunk(e.chunkX<<4,e.chunkZ<<4,e.dimension);if(chunk){chunk.entities[e.id]=e}}}};eachTick()
mob turn into dirt item (no work): /sendEval @A eachTick=()=>{for(let i=0;i<world.entities.length;i++){if(world.entities[i].mob){let pe=world.entities[i];let e;if(!multiplayer||host){e=pe}else{e=world.entities[i]=new Item(pe.x,pe.y,pe.z,0,0,0,blockIds.dirt);e.dimension=pe.dimension;e.id=pe.id};e.spawn=Infinity;e.despawns=Infinity}}}
check url: /sendEval TomMustBe12 var a=location.origin;if(a!=="https://play.minekhan.repl.co")Messages.write(a)
go in survival menu: /sendEval @A customMenu();customMenuEl.innerHTML=`<button id='clickhere'>click here if you want to</button>`;document.querySelector('#clickhere').onclick=()=>{cheats=false;survival=true}
blurry more: /sendEval @A eachTick=()=>{if(blurry<1){blurry+=0.001}else eachTick=null,blurry=1}
blurry less: /sendEval @A eachTick=()=>{if(blurry>0){blurry-=0.001}else eachTick=null,blurry=0}
use sword: /sendEval SEEK holding=blockIds.woodenSword;Key.rightMouse=true
use sword (don't use): /sendEval SEEK inventory.hotbar[inventory.hotbarSlot]={id:blockIds.woodenSword,amount:1};Key.rightMouse=true
get errors: /sendEval Szable Messages.write(JSON.stringify(errors.map(r=>r.message)))
weird water: /sendeval @A var a=blockData[blockIds.Water];a.gc=a.getCurrent;a.getCurrent=function(){let current = this.current;current.x=Math.random()*2-1;current.z=Math.random()*2-1;let mag = Math.sqrt(current.x * current.x + current.z * current.z);current.x /= mag;current.z /= mag;return current}
sway: /sendEval @A var starttt=now;eachTick=()=>p.damagerz+=sin((now-starttt)/50000*Math.PI)*Math.PI/4
change size: /sendEval @A var ssscaleee=1.2; eachTick=()=>{if(p.scale<ssscaleee){pSetScale(p.scale+0.001)}else{pSetScale(p.scale-0.001)}; if(abs(p.scale-ssscaleee)<0.001){eachTick=null;pSetScale(ssscaleee)}}
text: /sendeval 2-people world.addEntity(new entities[entityIds.TextDisplay](p2.x,p2.y,p2.z,"look,\nfloating text",1,[1,0,0]),false,p.dimension)
link to rickroll: /sendeval @A Messages.add(`<a href="https://thingmaker.us.eu.org/minekhan/extra-hidden-stuff">Where does this link lead to???</a>`);Messages.all.at(-1).onclick=function(){event.preventDefault();Messages.write('I clicked the link and got free money.');window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ','_blank')}
spawn tree: /sendeval 2-people runCmd("/sendeval @A if(host){serverSaveWorldGen();let x="+p2.x+", y="+p2.y+", z="+p2.z+", d='"+p.dimension+"'; serverWorld.getChunk(x,z,d).spawnSmallTree(x&15,y,z&15,x,z); serverRestoreWorldGen()}")
turn on resource pack: /sendeval @A if(host){var rp="/minekhan/assets/resource_packs/example.json";serverWorld.setResourcePacks(rp,rp))}

old ones:
turn on resource pack: /sendEval @A if(host){var rp="/minekhan/assets/resource_packs/example.json";(async function(){if(!world.resourcePacks.includes(rp)){world.resourcePacks.push(rp)} if(!world.activeResourcePacks.includes(rp)){world.activeResourcePacks.push(rp)} await initResourcePacks();initTextures();initBackgrounds();send({type:"resourcePacks",resourcePacks:world.resourcePacks,activeResourcePacks:world.activeResourcePacks}) })()}
no resource packs: /sendEval @A if(host){(async function(){world.resourcePacks=[];world.activeResourcePacks=[]; await initResourcePacks();initTextures();initBackgrounds();send({type:"resourcePacks",resourcePacks:world.resourcePacks,activeResourcePacks:world.activeResourcePacks}) })()}

spawn fake herobrine:
/sendeval @A var e=win.e=new Player();world.addEntity(e,true,"");e.setPos(0,0,0);e.setRot(0,0,0);e.holding=0;e.username="§4Herobrine";e.setSkin("data:image/png;base64,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")

spawn fake herobrine that follows you:
/sendeval @A var e=win.e=new Player();world.addEntity(e,true,"");e.setPos(0,70,0);e.setRot(0,0,0);e.holding=0;e.username="§4Herobrine";var int=win.interval=setInterval(()=>{if(!world.entities.includes(e)){clearInterval(int)} var pd=p.direction;e.setPos(p.x+pd.x*4,p.y,p.z+pd.z*4);e.setRot(0,-p.ry+Math.PI)},50);e.setSkin("data:image/png;base64,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")

questionz:
/sendeval @A alert("Final test time!!!!");alert("Before we start, I will explain some instructions.");for(var i=0;i<5;i++){alert("Blah blah blah blah!!! Blah blah blah blah blah!!!! BLAH BLAH BLAH!!! bLaH! BlAh!!")};alert("Test starts now!");var a=prompt("Question 1: Simplify 1+1")+"";if(a==="2")a+="1";alert("Your answer: "+a);alert("Times up!!!!");alert("Your test scores have arrived!");alert("Lets see how well you did!");alert("Your grade is... F-?!?!?!");alert("Whats wrong with you, you idiot?!?!");alert("Get out!!!");Messages.write('i thought 1+1='+a);location.replace("https://geeky-people.herokuapp.com/geekycraft.html")

//standing on detetor:
/getpos @p
/solve $target_x round
/var x $value
/solve $target_y round
/solve $value - 2
/var y $value
/solve $target_z round
/var z $value
/getblock $x $y $z $target_dimension
/solve "You are standing on " + $block_name
/title $value   0

//time left
/gettime "put start time here"  /echo "<- start time (miliseconds)"
/solve "put amount of minutes here" * 60000  /echo "<- total time (minutes)"
/solve $value - $time
/var time $value
/solve $value "/" 1000
/solve $value floor
/solve $value % 60
/var secs $value
/solve $time "/" 60000
/solve $value floor
/var mins $value
/solve $mins + ":"
/solve $value + $secs
/title $value  yellow 0 0 10000

//show current time
/gettime
/solve $time "/" 1000
/solve $value floor
/solve $value % 60
/var secs $value
/solve $time "/" 60000
/solve $value floor
/solve $value % 60
/var mins $value
/solve $time "/" 3600000
/solve $value floor
/solve $value + 1
/solve $value % 12
/solve $value - 1
/var hrs $value
/solve $hrs + ":"
/solve $value + $mins
/solve $value + ":"
/solve $value + $secs
/settag ~ ~+1 ~  text $value

automatic door
/setblock ~ ~+2 ~  air
/setblock ~ ~+3 ~  air
/setblock ~ ~+4 ~  air
/wait 500
/setblock ~+1 ~+2 ~  air
/setblock ~-1 ~+2 ~  air
/setblock ~+1 ~+3 ~  air
/setblock ~-1 ~+3 ~  air
/setblock ~+1 ~+4 ~  air
/setblock ~-1 ~+4 ~  air
/setblock ~ ~+2 ~  oakSign
/getpos @p
/solve "Hello
" + $target_name
/settag ~ ~+2 ~  text $value
/solve "Goodbye
" + $target_name
/settag ~ ~+2 ~  text2 $value

closing automatic door
/setblock ~+1 ~+3 ~  glass
/setblock ~-1 ~+3 ~  glass
/setblock ~+1 ~+4 ~  glass
/setblock ~-1 ~+4 ~  glass
/setblock ~+1 ~+5 ~  glass
/setblock ~-1 ~+5 ~  glass
/wait 500
/setblock ~ ~+3 ~  glass
/setblock ~ ~+4 ~  glass
/setblock ~ ~+5 ~  glass

//make moving block go from player to player
var pl=function(u){if(!u)return player;if(!window.players)return playersInv;for(var i in players){if(players[i].username===u)return players[i]}}
var a=pl("groxmc")
var b=pl("")
var ad=function(x,y,z,x2,y2,z2){var e=new MovingBlock(blockIds.bedrock,x,y,z,x2,y2,z2,10000,true);world.addEntity(e,false,player.dimension)}
ad(a.x,a.y-2,a.z,b.x,b.y-2,b.z)
ad(a.x,a.y+1,a.z,b.x,b.y+1,b.z)
ad(a.x+1,a.y-1,a.z,b.x+1,b.y-1,b.z)
ad(a.x-1,a.y-1,a.z,b.x-1,b.y-1,b.z)
ad(a.x,a.y-1,a.z+1,b.x,b.y-1,b.z+1)
ad(a.x,a.y-1,a.z-1,b.x,b.y-1,b.z-1)
ad(a.x+1,a.y,a.z,b.x+1,b.y,b.z)
ad(a.x-1,a.y,a.z,b.x-1,b.y,b.z)
ad(a.x,a.y,a.z+1,b.x,b.y,b.z+1)
ad(a.x,a.y,a.z-1,b.x,b.y,b.z-1)

//remove text
a=[]
for(var i of world.entities)if(i.type==="TextDisplay")a.push(i)
for(var i of a)world.deleteEntity(i.id)

//hostile mob fight!:
function getHostiles(){var arr=[];arr2=[];for(var j=0;j<world.entities.length;j++){if(world.entities[j].hostile){arr2.push(world.entities[j]);if(arr2.length===2){arr.push(arr2);arr2=[]}}};return arr}
for(var i of getHostiles()){i[0].onhit(0,false,0,0,i[1].id);i[1].onhit(0,false,0,0,i[0].id)}

//right click and right arrow for mountain
canvas.onkeydown({key:"ArrowRight",type:"keydown"})
canvas.onmousedown({button:2,type:"mousedown"})

//spawn creeper
world.setBlock(p2.x,p2.y,p2.z,blockIds.spawner,false,false,false,true,player.dimension)
world.setTagByName(p2.x,p2.y,p2.z,"spawn",blockIds.spawnCreeper,player.dimension)

//fireworks
window.fwt=['','small','medium','large','star']
window.fw=setInterval(()=>{
fireworkExplode(p2.x+Math.random()*64-32,p2.y+10,p2.z+Math.random()*64-32,player.dimension,fwt[Math.floor(Math.random(fwt.length))],[Math.random(),Math.random(),Math.random()])
},50)

//run all commands (old and kinda bad)
{
let comads = [], comandNoArgVal = []
let comadPlayers = []
comadPlayers.push(player.character.username)
let comadPosblites = []
function docomad(cmd,i,pre){
	if(!cmd.args || !cmd.args[i]) return
	comandNoArgVal[0] = Math.random()*10000 | 0
	for(let j of (cmd.argValues && cmd.argValues[cmd.args[i]] || comandNoArgVal)){
		comadPosblites.length = 0
		if(j === "type:block"){
			comadPosblites[0] = blockData[Math.floor(Math.random()*BLOCK_COUNT)].name
		}else if(j === "type:x" || j === "type:y" || j === "type:z") comadPosblites[0] = "~"
		else if(j === "type:dimension") comadPosblites[0] = player.dimension
		else if(j === "type:player") comadPosblites[0] = comadPlayers
		else comadPosblites[0] = j

		for(let k of comadPosblites){
			let pr = pre.slice(); pr.push(k)
			docomad(cmd,i+1,pr)
			comads.push(pr.join(" "))
		}
	}
}
for(let i of cmds){
	docomad(i,0,[i.name])
}
window.comadI = setInterval(() => {
	let c = comads[Math.floor(Math.random()*comads.length)]
	Messages.add("/"+c)
	runCmd(c,player)
},500)
}

//run all commands
{
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
function makeRandomCmd(){
	let c = cmds[Math.floor(Math.random()*cmds.length)]
	let str = c.name
	if(c.args) for(let a of c.args){
		if(c.argValues && c.argValues[a]){
			let j = c.argValues[a][Math.floor(Math.random()*c.argValues[a].length)]
			if(j === "type:number") j = Math.round(Math.random()*100)
			else if(j === "type:block") j = blockData[Math.floor(Math.random()*BLOCK_COUNT)].name
			else if(j === "type:x") j = Math.round(player.x+Math.random()*100)
			else if(j === "type:y") j = Math.round(player.y+Math.random()*100)
			else if(j === "type:z") j = Math.round(player.z+Math.random()*100)
			else if(j === "type:dimension") j = player.dimension
			else if(j === "type:sound") j = soundNames[Math.floor(Math.random()*soundNames.length)]
			else if(j === "type:player" || j === "type:banned" || j === "type:whitelisted") j = player.character.username
			str += " "+j
		}else str += " "+genWord()
	}
  if(str.startsWith("fillToPlayer ") || str.startsWith("copyToPlayer ") || str.startsWith("pasteAtPlayer ")){
		let px = player.x, py = player.y, pz = player.z
		player.x = Math.round(player.x+Math.random()*100)
		player.y = Math.round(player.y+Math.random()*100)
		player.z = Math.round(player.z+Math.random()*100)
		runCmd("fromPlayer")
		player.x = px, player.y = py, player.z = pz
	}
	return str
}
window.comadI = setInterval(() => {
	let c = makeRandomCmd()
	Messages.add("/"+c)
	runCmd(c,player)
},500)
}

//save string corruptor
var a=atob(prompt("Corrupt what?")).split('')
for(let i=20;i<a.length;i+=Math.floor(Math.random()*50+50)){
	a[i]=String.fromCharCode(Math.floor(Math.random()*255))
}
console.log(btoa(a.join('')))

//find non solid blocks
inventoryBlocks.search=inventoryBlocks.all.filter(r=>!blockData[r].solid)

//other stuff
ctx.drawImage(textureImageCanvas,0,-7*innerWidth,innerWidth,innerWidth*16)

db.get('user:2-people').then(r=>{r.comments=[];db.set('user:2-people',r)})

console.log(thingy.neurons.map(r=>r.charge+"  "+r.strength).join('\n'))

console.log(prompt().replace(/'''/g,'"').replace(/"([^"]+)"/gm,function(a,$1){return '"'+$1.replace(/\n/g," ")+'"'}))

clearLog();setTimeout(()=>process.exit(),2000)

var a="";for(var i in db.timeouts)a+=i+" | ";a

fetch(location.href).then(r=>r.json()).then(r=>document.body.innerHTML=
  JSON.stringify(r,null,2).replace(/\n/g,"<br>").replace(/ /g,"&nbsp;")
)

worlds[0].spy=1
worlds.sendEval(0,0,`
send({type:'message',
data:JSON.stringify(errors.map(r=>r.message))
,username:'a'})`)

sendNotifToAll('Want to see weird blocks? Click here',[{action:'open:/minekhan/?target=ljj67c3bk48u',title:"Open"}])

//show path
let e
for(let entt of world.entities){if(entt.mob)e=entt}
apaa=e&&e.path
if(apaa)intsss=setInterval(()=>{
    let[x,y,z]=apaa.splice(0,3)
    world.setBlock(x,y,z,Math.floor(Math.random()*80)+1)
    if(!apaa.length){
        clearInterval(intsss)
        fireworkExplode(x,y,z,"",'',[0,1,0])
    }
},100)

//Rickroll text:
var text=((function(t){var i,e,r,n,o;function s(){var e=t.charAt(n++);return i.indexOf(e)}function u(e,t,r){for(var n=o.length-t*i.length-r-1;e--;)o+=o.charAt(n++)}for(n=0,o=i="",e=35;e<127;e++)i+=String.fromCharCode(e),91==e&&(e+=1);for(;n<t.length;)if((r=s())<12)for(r++;r--;)o+=t.charAt(n++);else r<57?u(r-8,s(),s()):u(3,r-57,s());return o})
(".We're no str.angers to lo.ve\nYou know .the rules an-d so do"+
" I (/#(.)\nA full com.mitment's wh(at I'm]]+inking of0#r.woul"+
"dn't get/#?(s from]z%y o^-.r guy\nI just+ wanna te^$#y]^#h^P/"+
"#v&feel]u-\nGotta make0#A%und_(#t^i&\nNev/#m#o/#b%giv2#B#p8#:#"+
"l^G/#9&down8#;)run aro]r0%Y'deser0#M8#H4$>%cry8#;%say],'odby"+
"e8#:0%3^>$ie0#z$hu2#xa5^i/&x(n each2%t%for/&z$lo_U`I(r hear/"+
"&l%bee^h#c`i'g, bu0#h/'x$toay$hy/'s/$J&it (1#*.)\nInside, we$"+
" b^%1(./'X3#r$go0'X%n (3#,#)^`5(V%gam1$~#w0),1%=$pl0$&$\nA]:$"+
"if0%y&ask ]L;'`$Do/(L0%n]@6$x#b]A#d0$z#e9&>Z'lZ'lZ'l>'lZ$tZ$"+
"tZ$tZ)bZ)bG)b4#-Z)eZ)e#tZ.JZ.JZ'gZ'gZ'gZ)]Z$tZ$tZ$tZ$tZ$tZ$t"+
";$t"))
world.addEntity(new entities[entityIds.TextDisplay](p2.x,p2.y,p2.z,text,1,[1,0,0]),false,player.dimension)

var a=JSON.parse(prompt().replace(/(\w*)\(\)/g,"\"$1\""))
var b=""
function camelCase(s) {
	return s.replace(/([-_][a-z])/ig, c => c.toUpperCase().replace(/-|_/, ''))
}
for(var o of a){
	var n=camelCase(o.biome.replace("minecraft:",""))
	var p=o.parameters
	b+=n+":"+JSON.stringify([...p.erosion,...p.continentalness,...p.temperature,...p.humidity,...p.weirdness])+",\n\t\t"
}
console.log(b)
b=a=0

remove cull in shapes: ,\n\t*cull: *\{[\n\ta-z: 0-9,]*\}


Some things to put in chat

He's no stranger to trust.<br>You know the rules but he doesn't.<br>A full commitment's what he wasn't looking for<br>You wouldn't get this from any other guy.<br>He just wanted to tell you how he's feeling.<br>He wanted you to understand.<br>
He gave you up.<br>He let you down.<br>He ran around and deserted you.<br>He made you cry.<br>He said goodbye.<br>He told a lie and hurt you.<br>
You've known each other for too long.<br>You've been aching but he doesn't care.<br>Inside only you known what's been going on.<br>You know the game but he won't play it.<br>
He just wanted to tell you how he's feeling.<br>He wanted to make you understand.
*/