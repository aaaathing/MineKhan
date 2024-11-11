"use strict"
const version = "Beta 1.1.0"
let win, isNode = false
try{
win = window
}catch{
win = module.exports
isNode = true
}
let workerCount, workerURL
if(isNode){
workerCount = require("os").cpus()
workerURL = __dirname+"/worker.js"
}else{
workerCount = navigator.hardwareConcurrency
workerURL = URL.createObjectURL(new Blob([document.querySelector("#workerCode").text], { type: "text/javascript" }))
}
workerCount = (workerCount || 4) - 1 || 1
{
// I'm throwing stuff in the window scope since I can't be bothered to figure out how all this fancy import export stuff works
win.workers = []
win.parent.allWorkers = win.allWorkers = []
let waitingJobs = [], waitingMsgs = []
for (let i = 0, count = workerCount; i < count; i++) { // Generate between 1 and (processors - 1) workers.
let worker = new win.Worker(workerURL)
worker.id = i
worker.onmessage = e => {
let [promise, resolve, onProgress] = worker.theJob
if(e.data.progress){
return onProgress(e.data.progress)
}
resolve(e.data)
win.workers.push(worker)
if(waitingMsgs[worker.id].length){
waitingMsgs[worker.id].shift()()
}else if(waitingJobs.length){
waitingJobs.shift()()
}
}
win.workers.push(worker)
win.allWorkers.push(worker)
waitingMsgs.push([])
}
win.doWork = function(data,onProgress) {
let job = []
let promise = new Promise(resolve => {
job[1] = resolve
let worker = win.workers.shift()
if(!worker){
waitingJobs.push(() => {
worker = win.workers.shift()
worker.theJob = job
worker.postMessage(data)
})
}else{
worker.theJob = job
worker.postMessage(data)
}
})
job[0] = promise
job[2] = onProgress
return promise
}
function sendMsg(data,id){
let job = []
let promise = new Promise(resolve => {
job[1] = resolve
let worker = allWorkers[id]
if(!workers.includes(worker)){
waitingMsgs[id].push(() => {
worker = allWorkers[id]
workers.splice(workers.indexOf(worker),1)
worker.theJob = job
worker.postMessage(data)
})
}else{
workers.splice(workers.indexOf(worker),1)
worker.theJob = job
worker.postMessage(data)
}
})
job[0] = promise
return promise
}
win.sendAllWorkers = async function(msg){
let p = []
for(let i=0; i<allWorkers.length; i++){
p.push(sendMsg(msg,i))
}
Promise.all(p)
}
}
const { cos, sin, round, floor, ceil, min, max, abs, sqrt, atan, atan2 } = Math;
const rand = function(a,b){
if(arguments.length === 2){
return (Math.random()*(b-a))+a
}else if(arguments.length === 1){
return Math.random()*a
}else return Math.random()
}
const avg = function(){
var res = 0, c = 0
for(var i=0; i<arguments.length; i++){
if(!arguments[i] && arguments[i] !== 0) continue
res += arguments[i]
c++
}
res /= c
return res
}
const divideWithRemainder = function(a,b){
var n=a/b
var f=floor(n)
var r=n-f
n=f
r=floor(r*b)
return {n,r}
}
const mod = function(a,b){
return a - floor(a/b)*b
}
Math.PI2 = Math.PI / 2
Math.PI4 = Math.PI / 4
Math.PId = Math.PI * 2
function xyArrayHas(arr,arr2,x,y,z,arrLen=arr.length,arr2Len=arr2&&arr2.length){
for(var i=0; i<arrLen; i+=4){
if(arr[i] === x && arr[i+1] === y && arr[i+2] === z){
return true
}
}
if(arr2){
for(var i=0; i<arr2Len; i+=4){
if(arr2[i] === x && arr2[i+1] === y && arr2[i+2] === z){
return true
}
}
}
}
function emptyIfNullish(v){
return v||v===0 ? v : ""
}
// Shh don't tell anyone I'm override native objects
String.prototype.hashCode = function() {
var hash = 0, i, chr;
if (this.length === 0) return hash;
for (i = 0; i < this.length; i++) {
chr   = this.charCodeAt(i);
hash  = ((hash << 5) - hash) + chr;
hash |= 0; // Convert to 32bit integer
}
return hash;
}
Uint8Array.prototype.toString = function() {
let str = ""
for (let i = 0; i < this.length; i++) {
str += String.fromCharCode(this[i])
}
return btoa(str)
}
Uint8Array.prototype.toJSON = function(){
return "BitArray("+this.length*8+")"
}
function atoarr(data){
let bytes = atob(data)
let arr = new Uint8Array(bytes.length)
for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i)
return arr
}
function chunkString (str, len) {
const size = Math.ceil(str.length/len)
const r = Array(size)
let offset = 0
for (let i = 0; i < size; i++) {
r[i] = str.substr(offset, len)
offset += len
}
return r
}
function chunkArray(array,chunkSize){
let chunks = []
for (let i = 0; i < array.length; i += chunkSize) {
const chunk = array.slice(i, i + chunkSize);
chunks.push(chunk)
}
return chunks
}
function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms))
}
const generateID = () => "" + Date.now().toString(36) + (Math.random() * 1000000 | 0).toString(36)
function map(v, min, max, min2, max2){
return min2 + (max2 - min2) * ((v - min) / (max - min));
}
function mapClamped(v, min, max){
return Math.min(Math.max(((v - min) / (max - min)),0),1);
}
function lerp(t, a, b) {
return a + t * (b - a);
}
function dist2(x,y,x2,y2){
let xDist = x - x2
let yDist = y - y2
return sqrt((xDist*xDist)+(yDist*yDist))
}
function dist3(x,y,z,x2,y2,z2){
let xDist = x - x2
let yDist = y - y2
let zDist = z - z2
return sqrt((xDist*xDist)+(yDist*yDist)+(zDist*zDist))
}
function mag(x,y,z) {
return sqrt(x * x + y * y + z * z)
}
function line3D(endX, endY, endZ, startX, startY, startZ, array){
var x1 = Math.round(endX), y1 = Math.round(endY), z1 = Math.round(endZ), x0 = Math.round(startX), y0 = Math.round(startY), z0 = Math.round(startZ);
var dx = Math.abs(x1 - x0);
var dy = Math.abs(y1 - y0);
var dz = Math.abs(z1 - z0);
var stepX = x0 < x1 ? 1 : -1;
var stepY = y0 < y1 ? 1 : -1;
var stepZ = z0 < z1 ? 1 : -1;
var hypotenuse = Math.sqrt(dx*dx + dy*dy + dz*dz);
var tMaxX = hypotenuse*0.5 / dx;
var tMaxY = hypotenuse*0.5 / dy;
var tMaxZ = hypotenuse*0.5 / dz;
var tDeltaX = hypotenuse / dx;
var tDeltaY = hypotenuse / dy;
var tDeltaZ = hypotenuse / dz;
while (x0 !== x1 || y0 !== y1 || z0 !== z1){
if (tMaxX < tMaxY) {
if (tMaxX < tMaxZ) {
x0 = x0 + stepX;
tMaxX = tMaxX + tDeltaX;
} else if (tMaxX > tMaxZ){
z0 = z0 + stepZ;
tMaxZ = tMaxZ + tDeltaZ;
} else{
x0 = x0 + stepX;
tMaxX = tMaxX + tDeltaX;
z0 = z0 + stepZ;
tMaxZ = tMaxZ + tDeltaZ;
}
} else if (tMaxX > tMaxY){
if (tMaxY < tMaxZ) {
y0 = y0 + stepY;
tMaxY = tMaxY + tDeltaY;
} else if (tMaxY > tMaxZ){
z0 = z0 + stepZ;
tMaxZ = tMaxZ + tDeltaZ;
} else{
y0 = y0 + stepY;
tMaxY = tMaxY + tDeltaY;
z0 = z0 + stepZ;
tMaxZ = tMaxZ + tDeltaZ;
}
} else{
if (tMaxY < tMaxZ) {
y0 = y0 + stepY;
tMaxY = tMaxY + tDeltaY;
x0 = x0 + stepX;
tMaxX = tMaxX + tDeltaX;
} else if (tMaxY > tMaxZ){
z0 = z0 + stepZ;
tMaxZ = tMaxZ + tDeltaZ;
} else{
x0 = x0 + stepX;
tMaxX = tMaxX + tDeltaX;
y0 = y0 + stepY;
tMaxY = tMaxY + tDeltaY;
z0 = z0 + stepZ;
tMaxZ = tMaxZ + tDeltaZ;
}
}
array.push(x0, y0, z0);
}
}
// await window.yieldThread() will pause the current task until the event loop is cleared
{
const channel = new MessageChannel()
let toYield = {}, toYieldId = 0
channel.port1.onmessage = e => {
toYield[e.data]()
delete toYield[e.data]
}
win.yieldThread = function() {
return new Promise(resolve => {
let id = toYieldId++
toYield[id] = resolve
channel.port2.postMessage(id)
})
}
}
{//Begin
let tickSpeed = 20
let tickTime = 1000/tickSpeed
function fillTextureArray(textures){
if (textures.length === 3) {
textures[3] = textures[2];
textures[4] = textures[2];
textures[5] = textures[2];
} else if (textures.length === 2) {
// Top and bottom are the first texture, sides are the second.
textures[2] = textures[1];
textures[3] = textures[2];
textures[4] = textures[2];
textures[5] = textures[2];
textures[1] = textures[0];
}else if(textures.length === 4){
textures[4] = textures[5] = textures[3]
textures[3] = textures[2]
}
return textures
}
let sit
let generator = {
height: 80, // Height of the hills
smooth: 0.01, // Smoothness of the terrain
extra: 30, // Extra height added to the world.
caveSize: 0.00, // Redefined right above where it's used
biomeSmooth: 0.007, // Smoothness of biomes
}
win.generator = generator //for mods
const maxHeight = 255
const minHeight = -64
const minEntityY = minHeight-40
const netherHeight = 127
const blockData = [
{
name: "air",
id: 0,
textures: new Array(6).fill("none"),
transparent: true,
shadow: false,
hidden: true
},
{
name: "grass",
Name: "Grass Block",
textures: [ "dirt", "grassTop", "grassSide" ],
breakTime: 0.9,
blastResistance:0.6,
drop:"dirt",
type:"ground",
grassSound: true,
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
var top = world.getBlock(x,y+1,z,dimension)
var isSnow = blockData[top].name === "snow" || blockData[top].name === "snowBlock"
if(b === blockIds.grass && isSnow){
world.setBlock(x,y,z,blockIds.grass | CROSS,false,false,false,false,dimension)
}else if(b === (blockIds.grass | CROSS) && !isSnow){
world.setBlock(x,y,z,blockIds.grass,false,false,false,false,dimension)
}
},
compostChance:0.3,
category:"nature"
},
{ name: "dirt", Name:"Dirt", breakTime:0.75, blastResistance:0.5, type:"ground",category:"nature",
digSound: ["block.dirt.dig1", "block.dirt.dig2", "block.dirt.dig3", "block.dirt.dig4"],
stepSound: ["block.dirt.step1", "block.dirt.step2","block.dirt.step3","block.dirt.step4"]
},
{ name: "stone", Name:"Stone", drop:"cobblestone", type:"rock1",category:"nature", breakTime:7.5, blastResistance:6, stoneSound:true},
{ name: "bedrock", Name:"Bedrock", category:"nature", breakTime:89000000, blastResistance:3600000, stoneSound:true, pistonPush:false, pistonPull:false},
{ name: "sand", Name:"Sand", breakTime:0.75, blastResistance:0.5,fallingDust:[212/255, 195/255, 148/255], category:"nature",
onupdate: function(x,y,z,b,world,sx,sy,sz,dimension){
fall(x,y,z,b,world,false,dimension)
},
ongetexploded:function(x,y,z,b,world,dimension){
fall(x,y,z,b,world,true,dimension)
},
digSound: ["block.sand.dig1", "block.sand.dig2", "block.sand.dig3", "block.sand.dig4"],
stepSound: ["block.sand.step1", "block.sand.step2","block.sand.step3","block.sand.step4","block.sand.step5"]},
{ name: "gravel", Name:"Gravel", breakTime:0.9, blastResistance:0.6, type:"ground",category:"nature",fallingDust:[132/255, 126/255, 124/255],
onupdate: function(x,y,z,b,world,sx,sy,sz,dimension){
fall(x,y,z,b,world,false,dimension)
},
ongetexploded:function(x,y,z,b,world,dimension){
fall(x,y,z,b,world,true,dimension)
},
drop: function(){
if(round(random(10)) === 1) return "flint"
else return "gravel"
},
digSound: ["block.gravel.dig1", "block.gravel.dig2", "block.gravel.dig3", "block.gravel.dig4"],
stepSound: ["block.gravel.step1", "block.gravel.step2","block.gravel.step3","block.gravel.step4"]},
{
name: "leaves",
Name: "Leaves",
transparent: true,
cullFace:"never",
breakTime: 0.3,
blastResistance:0.2,
type:"plant2",
category:"nature",
drop: function(){
if(rand() > 0.8){
let r = floor(rand(3))
if(r === 0) return "stick"
else if(r === 1) return "oakSapling"
else return "apple"
}
},
dropSelfWhenSheared:true,
shearBreakTime:0.05,
burnChance: 0.2,
burnTime: 30,
compostChance:0.3,
grassSound: true
},
{
name: "glass",
Name:"Glass",
transparent: true,
shadow: false,
breakTime: 0.45,
blastResistance:0.3,
type: "glass",
category:"build",
glassSound: true
},
{ name: "cobblestone", Name:"Cobblestone", breakTime:10, blastResistance:6, type:"rock1",category:"build", stoneSound:true},
{ name: "mossyCobble", Name:"Mossy Cobblestone", breakTime:10, blastResistance:6, type:"rock1",category:"build", stoneSound:true},
{ name: "stoneBricks", Name:"Stone Bricks", breakTime:7.5, type:"rock1",category:"build", stoneSound:true},
{ name: "mossyStoneBricks", Name:"Mossy Stone Bricks", breakTime:7.5, type:"rock1",category:"build", stoneSound:true},
{ name: "bricks", Name:"Bricks", breakTime:10, type:"rock1",category:"build", stoneSound:true},
{ name: "coalOre", Name:"Coal Ore", breakTime:15, type:"rock1",category:"nature", drop:"coal", stoneSound:true, experience:0.1},
{ name: "ironOre", Name:"Iron Ore", breakTime:15, type:"rock2",category:"nature", drop:"rawIron", stoneSound:true},
{ name: "goldOre", Name:"Gold Ore", breakTime:15, type:"rock3",category:"nature", drop:"rawGold", stoneSound:true},
{ name: "diamondOre", Name:"Diamond Ore", breakTime:15, type:"rock3",category:"nature", drop:"diamond", stoneSound:true, experience:1},
{ name: "redstoneOre", Name:"Redstone Ore", breakTime:15, type:"rock3",category:"nature", stoneSound:true, drop:"redstone", dropAmount:[4,5], experience:0.3},
{ name: "lapisOre", Name:"Lapis Lazuli Ore", breakTime:15, type:"rock2",category:"nature", drop:"lapisLazuli", stoneSound:true, experience:0.5},
{ name: "emeraldOre", Name:"Emerald Ore", breakTime:15, type:"rock3",category:"nature", drop:"emerald", stoneSound:true, experience:1.5},
{ name: "coalBlock", Name:"Block of Coal", breakTime:25, type:"rock1",category:"build", stoneSound:true, burnChance:0.4, burnTime:50},
{ name: "ironBlock", Name:"Block of Iron", breakTime:25, type:"metal2",category:"build", stoneSound:true},
{ name: "goldBlock", Name:"Block of Gold", breakTime:15, type:"metal3",category:"build", stoneSound:true},
{ name: "diamondBlock", Name:"Block of Diamond", breakTime:25, type:"metal3",category:"build", stoneSound:true},
{
name: "redstoneBlock", Name:"Block of Redstone", breakTime:25, type:"metal1",category:"redstone", stoneSound:true,
onset:function(x,y,z,dimension,world){
world.setPower(x,y,z,16,false,dimension)
world.spreadPower(x,y,z, 16,dimension)
},
ondelete: function(x,y,z,prevTags,prev,dimension,world){
world.setPower(x,y,z,0,false,dimension)
world.unspreadPower(x,y,z, 16,false,dimension)
},
damage:1,
dieMessage: () => username+" died from radiation from block of redstone."
},
{ name: "lapisBlock", Name:"Block of Lapis Lazuli", breakTime:15, type:"metal2",category:"build", stoneSound:true},
{ name: "emeraldBlock", Name:"Block of Emerald", breakTime:25, type:"metal3",category:"build", stoneSound:true},
{ name: "oakPlanks", Name:"Oak Planks", type:"wood",category:"build", breakTime:3, woodSound:true, burnChance:0.1, burnTime:40},
{
name: "oakLog",
Name:"Oak Log",
textures: [ "logTop", "logSide" ],
breakTime:3,
woodSound:true,
type:"wood",
category:"nature",
burnChance:0.1,
burnTime:50,
log:true
},
{ name: "acaciaPlanks", Name:"Acacia Planks", type:"wood",category:"build", breakTime:3, woodSound:true, burnChance:0.1, burnTime:40},
{
name: "acaciaLog",
Name:"Acacia Log",
textures: [ "acaciaLogTop", "acaciaLogSide" ],
breakTime:3,
woodSound:true,
type:"wood",
category:"nature",
burnChance:0.1,
burnTime:50,
log:true
},
{ name: "birchPlanks", Name:"Birch Planks", type:"wood",category:"build", breakTime:3, woodSound:true, burnChance:0.1, burnTime:40},
{
name: "birchLog",
Name:"Birch Log",
textures: [ "birchLogTop", "birchLogSide" ],
breakTime:3,
woodSound:true,
type:"wood",
category:"nature",
burnChance:0.1,
burnTime:50,
log:true
},
{ name: "darkOakPlanks", Name:"Dark Oak Planks", type:"wood",category:"build", breakTime:3, woodSound:true, burnChance:0.1, burnTime:40},
{
name: "darkOakLog",
Name:"Dark Oak Log",
textures: [ "darkOakLogTop", "darkOakLogSide" ],
breakTime:3,
woodSound:true,
type:"wood",
category:"nature",
burnChance:0.1,
burnTime:50,
log:true
},
{ name: "junglePlanks", Name:"Jungle Planks", type:"wood",category:"build", breakTime:3,woodSound:true, burnChance:0.1, burnTime:40},
{
name: "jungleLog",
Name:"Jungle Log",
textures: [ "jungleLogTop", "jungleLogSide" ],
breakTime:3,
woodSound:true,
type:"wood",
category:"nature",
burnChance:0.1,
burnTime:50,
log:true
},
{ name: "sprucePlanks", Name:"Spruce Planks", type:"wood",category:"build", breakTime:3, woodSound:true, burnChance:0.1, burnTime:40},
{
name: "spruceLog",
Name:"Spruce Log",
textures: [ "spruceLogTop", "spruceLogSide" ],
breakTime:3,
woodSound:true,
type:"wood",
category:"nature",
burnChance:0.1,
burnTime:50,
log:true
},
{ name: "whiteWool", Name:"White Wool",breakTime:1.2, clothSound:true, shearBreakTime:0.2, type:"wool",category:"build", burnChance: 0.2, burnTime: 30},
{ name: "orangeWool", Name:"Orange Wool",breakTime:1.2, clothSound:true, shearBreakTime:0.2, type:"wool",category:"build", burnChance: 0.2, burnTime: 30},
{ name: "magentaWool", Name:"Magenta Wool",breakTime:1.2, clothSound:true, shearBreakTime:0.2, type:"wool",category:"build", burnChance: 0.2, burnTime: 30},
{ name: "lightBlueWool", Name:"Light Blue Wool",breakTime:1.2, clothSound:true, shearBreakTime:0.2, type:"wool",category:"build", burnChance: 0.2, burnTime: 30},
{ name: "yellowWool", Name:"Yellow Wool",breakTime:1.2, clothSound:true, shearBreakTime:0.2, type:"wool",category:"build", burnChance: 0.2, burnTime: 30},
{ name: "limeWool", Name:"Lime Wool",breakTime:1.2, clothSound:true, shearBreakTime:0.2, type:"wool",category:"build", burnChance: 0.2, burnTime: 30},
{ name: "pinkWool", Name:"Pink Wool",breakTime:1.2, clothSound:true, shearBreakTime:0.2, type:"wool",category:"build", burnChance: 0.2, burnTime: 30},
{ name: "grayWool", Name:"Gray Wool",breakTime:1.2, clothSound:true, shearBreakTime:0.2, type:"wool",category:"build", burnChance: 0.2, burnTime: 30},
{ name: "lightGrayWool", Name:"Light Gray Wool",breakTime:1.2, clothSound:true, shearBreakTime:0.2, type:"wool",category:"build", burnChance: 0.2, burnTime: 30},
{ name: "cyanWool", Name:"Cyan Wool",breakTime:1.2, clothSound:true, shearBreakTime:0.2, type:"wool",category:"build", burnChance: 0.2, burnTime: 30},
{ name: "purpleWool", Name:"Purple Wool",breakTime:1.2, clothSound:true, shearBreakTime:0.2, type:"wool",category:"build", burnChance: 0.2, burnTime: 30},
{ name: "blueWool", Name:"Blue Wool",breakTime:1.2, clothSound:true, shearBreakTime:0.2, type:"wool",category:"build", burnChance: 0.2, burnTime: 30},
{ name: "brownWool", Name:"Brown Wool",breakTime:1.2, clothSound:true, shearBreakTime:0.2, type:"wool",category:"build", burnChance: 0.2, burnTime: 30},
{ name: "greenWool", Name:"Green Wool",breakTime:1.2, clothSound:true, shearBreakTime:0.2, type:"wool",category:"build", burnChance: 0.2, burnTime: 30},
{ name: "redWool", Name:"Red Wool",breakTime:1.2, clothSound:true, shearBreakTime:0.2, type:"wool",category:"build", burnChance: 0.2, burnTime: 30},
{ name: "blackWool", Name:"Black Wool",breakTime:1.2, clothSound:true, shearBreakTime:0.2, type:"wool",category:"build", burnChance: 0.2, burnTime: 30},
{ name: "whiteConcrete", Name:"White Concrete",breakTime:9, type:"rock1",category:"build", stoneSound:true},
{ name: "orangeConcrete", Name:"Orange Concrete",breakTime:9, type:"rock1",category:"build", stoneSound:true},
{ name: "magentaConcrete", Name:"Magenta Concrete",breakTime:9, type:"rock1",category:"build", stoneSound:true},
{ name: "lightBlueConcrete", Name:"Light Blue Concrete",breakTime:9, type:"rock1",category:"build", stoneSound:true},
{ name: "yellowConcrete", Name:"Yellow Concrete",breakTime:9, type:"rock1",category:"build", stoneSound:true},
{ name: "limeConcrete", Name:"Lime Concrete",breakTime:9, type:"rock1",category:"build", stoneSound:true},
{ name: "pinkConcrete", Name:"Pink Concrete",breakTime:9, type:"rock1",category:"build", stoneSound:true},
{ name: "grayConcrete", Name:"Gray Concrete",breakTime:9, type:"rock1",category:"build", stoneSound:true},
{ name: "lightGrayConcrete", Name:"Light Gray Concrete",breakTime:9, type:"rock1",category:"build", stoneSound:true},
{ name: "cyanConcrete", Name:"Cyan Concrete",breakTime:9, type:"rock1",category:"build", stoneSound:true},
{ name: "purpleConcrete", Name:"Purple Concrete",breakTime:9, type:"rock1",category:"build", stoneSound:true},
{ name: "blueConcrete", Name:"Blue Concrete",breakTime:9, type:"rock1",category:"build", stoneSound:true},
{ name: "brownConcrete", Name:"Brown Concrete",breakTime:9, type:"rock1",category:"build", stoneSound:true},
{ name: "greenConcrete", Name:"Green Concrete",breakTime:9, type:"rock1",category:"build", stoneSound:true},
{ name: "redConcrete", Name:"Red Concrete",breakTime:9, type:"rock1",category:"build", stoneSound:true},
{ name: "blackConcrete", Name:"Black Concrete",breakTime:9, type:"rock1",category:"build", stoneSound:true},
{
name: "bookshelf",
Name:"Bookshelf",
textures: [ "oakPlanks", "bookshelf" ],
stoneSound: true,
type:"wood",
category:"decoration",
burnChance:0.4,
burnTime:30
},
{ name: "netherrack",
Name:"Netherrack",
breakTime:2,
type:"rock1",
category:"nature",
burnTime:Infinity,
digSound: ["block.netherrack.dig1", "block.netherrack.dig2", "block.netherrack.dig3", "block.netherrack.dig4", "block.netherrack.dig5", "block.netherrack.dig6"],
stepSound: ["block.netherrack.step1", "block.netherrack.step2","block.netherrack.step3","block.netherrack.step4","block.netherrack.step5","block.netherrack.step6"],
randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{ name: "soulSand",
Name:"Soul Sand",
category:"nature",
speedFactor: 0.5,
canHaveSoulFire: true,
digSound: ["block.soul_sand.dig1", "block.soul_sand.dig2", "block.soul_sand.dig3", "block.soul_sand.dig4", "block.soul_sand.dig5", "block.soul_sand.dig6","block.soul_sand.step7","block.soul_sand.step8","block.soul_sand.step9"],
stepSound: ["block.soul_sand.step1", "block.soul_sand.step2","block.soul_sand.step3","block.soul_sand.step4","block.soul_sand.step5","block.soul_sand.step6"],
randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name: "glowstone",
Name:"Glowstone",
breakTime:0.45,
type:"rock1",
category:"decoration",
lightLevel: 15,
glassSound: true,
shadow:false,
randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{ name: "netherBricks",
Name:"Nether Bricks",
category:"build",
digSound: ["block.nether_bricks.dig1", "block.nether_bricks.dig2", "block.nether_bricks.dig3", "block.nether_bricks.dig4", "block.nether_bricks.dig5", "block.nether_bricks.dig6"],
stepSound: ["block.nether_bricks.step1", "block.nether_bricks.step2","block.nether_bricks.step3","block.nether_bricks.step4","block.nether_bricks.step5","block.nether_bricks.step6"]},
{ name: "redNetherBricks",
Name:"Red Nether Bricks",
category:"build",
digSound: ["block.nether_bricks.dig1", "block.nether_bricks.dig2", "block.nether_bricks.dig3", "block.nether_bricks.dig4", "block.nether_bricks.dig5", "block.nether_bricks.dig6"],
stepSound: ["block.nether_bricks.step1", "block.nether_bricks.step2","block.nether_bricks.step3","block.nether_bricks.step4","block.nether_bricks.step5","block.nether_bricks.step6"]},
{
name: "netherQuartzOre", 
Name:"Nether Quartz Ore",
category:"nature",
digSound: ["block.nether_ore.dig1", "block.nether_ore.dig2", "block.nether_ore.dig3", "block.nether_ore.dig4"],
stepSound: ["block.nether_ore.step1", "block.nether_ore.step2","block.nether_ore.step3","block.nether_ore.step4","block.nether_ore.step5"],
drop: "quartz",
dropAmount: [1,2],
randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name: "quartzBlock",
Name:"Block of Quartz",
category:"build",
textures: ["quartzBlockBottom", "quartzBlockTop", "quartzBlockSide"],
stoneSound: true
},
{
name: "quartzPillar",
Name:"Pillar",
category:"build",
textures: ["quartzPillarTop", "quartzPillar"],
stoneSound: true
},
{
name: "chiseledQuartzBlock",
Name:"Chiseled Quartz Block",
category:"build",
textures: ["chiseledQuartzBlockTop", "chiseledQuartzBlock"],
stoneSound: true
},
{ name: "chiseledStoneBricks", Name:"Chiseled Stone Bricks",category:"build", stoneSound:true},
{ name: "smoothStone", Name:"Smooth Stone",category:"build", stoneSound:true, randomRotate:"flip",randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true,},
{ name: "andesite", Name:"Andesite", stoneSound:true,category:"nature", randomRotate:"flip",randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true},
{ name: "polishedAndesite", Name:"Polished Andesite",category:"build", stoneSound:true},
{ name: "diorite", Name:"Diorite", stoneSound:true,category:"nature", randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true},
{ name: "polishedDiorite", Name:"Polished Diorite",category:"build", stoneSound:true},
{ name: "granite", Name:"Granite", stoneSound:true,category:"nature", randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true},
{ name: "polishedGranite", Name:"Polished Granite",category:"build", stoneSound:true},
{ // I swear, if y'all don't stop asking about TNT every 5 minutes!
name: "tnt",
Name:"TNT",
textures: ["tntBottom", "tntTop", "tntSides"],
superTntTextures: ["superTntBottom","superTntTop","superTnt"],
ultraTntTextures: ["ultraTntBottom","ultraTntTop","ultraTnt"],
//onupdate: function(x,y,z){
//  explode(x,y,z,5)
//}, flint and steel explodes it
explode: function(x,y,z, how,dimension,world){
world.setBlock(x,y,z,0,false,false,false,false,dimension)
var e = new entities[entityIds.PrimedTNT](x,y,z)
world.addEntity(e,false,dimension)
world.playSound(x,y,z, "entity.tnt.fuse")
switch(how){
case "explosion":
e.timeLimit = rand(10,30)
}
},
superTntExplode: function(x,y,z,dimension,world){
world.setBlock(x,y,z,0,false,false,false,false,dimension)
var e = new entities[entityIds.PrimedSuperTNT](x,y,z)
world.addEntity(e,false,dimension)
world.playSound(x,y,z, "entity.tnt.fuse")
},
ultraTntExplode: function(x,y,z,dimension,world){
world.setBlock(x,y,z,0,false,false,false,false,dimension)
var e = new entities[entityIds.PrimedUltraTNT](x,y,z)
world.addEntity(e,false,dimension)
world.playSound(x,y,z, "entity.tnt.fuse")
},
onpowerupdate:function(x,y,z,sx,sy,sz,blockPowerChanged,dimension,world){
var power = world.getRedstonePower(x,y,z,dimension)
if(power > 0) this.explode(x,y,z,null,dimension,world)
},
onset:function(x,y,z,dimension,world){
var power = world.getRedstonePower(x,y,z,dimension)
if(power > 0) this.explode(x,y,z,null,dimension,world)
},
burnChance:0.6,
onburn:function(x,y,z,dimension,world){
this.explode(x,y,z,null,dimension,world)
},
category:"redstone",
grassSound: true
},
{
name: "portal",
solid:false,
shadow: false,
portal: true,
transparent:true,
cullFace:"same",
lightLevel: 11,
flatIcon:true,
drop:"air",
ontouch: function(){
if(!thisSceneCurrent) return
touchingPortal = true
portalEffect += 2.5
if(portalEffect >= 100 && portalFadeOutEffect <= 0){
portalFadeOutEffect = 100
if(p.dimension === ""){
p.x /= 8, p.z /= 8
}else{
p.x *= 8, p.z *= 8
}
goToDimension(p.dimension === "nether" ? "" : "nether")
playSound("block.portal.travel")
send({type:"playSound", data:"block.portal.travel", x:p.x,y:p.y,z:p.z})
achievment("Into the Nether")
}
},
glassSound: true,
ambientSound:"block.portal.portal",
pistonPush:false,
pistonPull:false,
hidden:true,
searchForPortal:function(x,y,z,dimension){
for(let x2=0; x2<128; x2++) for(let y2=0; y2<128; y2++) for(let z2=0; z2<128; z2++) {
let x3 = x+((x2%2)?-(x2+1)/2:x2/2)//alternate back and forth, example: 0, -1, 1, -2, 2
let y3 = y+((y2%2)?-(y2+1)/2:y2/2)
let z3 = z+((z2%2)?-(z2+1)/2:z2/2)
if(blockData[world.getBlock(x3,y3,z3,dimension)].name === "portal") return [x3,y3,z3]
}
},
doneLoading:function(){
let portal = this.searchForPortal(round(p.x),round(p.y),round(p.z),p.dimension)
if(portal){
p.x = portal[0]
p.y = portal[1]+p.bottomH
p.z = portal[2]
p.lastY = 0
}else{
let portalFill = 0, px = round(p.x), py = round(p.y), pz = round(p.z) //cant use p2 because just finished loading
let dy = 32
mainLoop:for(let y = 32; y<128; y++){
for(let x=px-2; x<px+2; x++) for(let z=pz-2; z<pz+2; z++){
if(blockData[world.getBlock(x,y,z,p.dimension)].solid){
portalFill = 0
continue mainLoop
}
}
portalFill++, dy = y
if(portalFill === 6) break mainLoop
}
if(portalFill === 6){
let x = px, z = pz, y = dy
if(rand() > 0.5){
world.setBlock(x-2,y-5,z,blockIds.obsidian,false,false,false,false,p.dimension)
world.setBlock(x-1,y-5,z,blockIds.obsidian,false,false,false,false,p.dimension)
world.setBlock(x,y-5,z,blockIds.obsidian,false,false,false,false,p.dimension)
world.setBlock(x+1,y-5,z,blockIds.obsidian,false,false,false,false,p.dimension)
//layer2
world.setBlock(x-2,y-4,z,blockIds.obsidian,false,false,false,false,p.dimension)
world.setBlock(x-1,y-4,z,blockIds.portal|PORTAL|NORTH,false,false,false,false,p.dimension)
world.setBlock(x,y-4,z,blockIds.portal|PORTAL|NORTH,false,false,false,false,p.dimension)
world.setBlock(x+1,y-4,z,blockIds.obsidian,false,false,false,false,p.dimension)
world.setBlock(x-2,y-3,z,blockIds.obsidian,false,false,false,false,p.dimension)
world.setBlock(x-1,y-3,z,blockIds.portal|PORTAL|NORTH,false,false,false,false,p.dimension)
world.setBlock(x,y-3,z,blockIds.portal|PORTAL|NORTH,false,false,false,false,p.dimension)
world.setBlock(x+1,y-3,z,blockIds.obsidian,false,false,false,false,p.dimension)
world.setBlock(x-2,y-2,z,blockIds.obsidian,false,false,false,false,p.dimension)
world.setBlock(x-1,y-2,z,blockIds.portal|PORTAL|NORTH,false,false,false,false,p.dimension)
world.setBlock(x,y-2,z,blockIds.portal|PORTAL|NORTH,false,false,false,false,p.dimension)
world.setBlock(x+1,y-2,z,blockIds.obsidian,false,false,false,false,p.dimension)
//layer5
world.setBlock(x-2,y-1,z,blockIds.obsidian,false,false,false,false,p.dimension)
world.setBlock(x-1,y-1,z,blockIds.obsidian,false,false,false,false,p.dimension)
world.setBlock(x,y-1,z,blockIds.obsidian,false,false,false,false,p.dimension)
world.setBlock(x+1,y-1,z,blockIds.obsidian,false,false,false,false,p.dimension)
}else{
world.setBlock(x,y-5,z-2,blockIds.obsidian,false,false,false,false,p.dimension)
world.setBlock(x,y-5,z-1,blockIds.obsidian,false,false,false,false,p.dimension)
world.setBlock(x,y-5,z,blockIds.obsidian,false,false,false,false,p.dimension)
world.setBlock(x,y-5,z+1,blockIds.obsidian,false,false,false,false,p.dimension)
//layer2
world.setBlock(x,y-4,z-2,blockIds.obsidian,false,false,false,false,p.dimension)
world.setBlock(x,y-4,z-1,blockIds.portal|PORTAL|EAST,false,false,false,false,p.dimension)
world.setBlock(x,y-4,z,blockIds.portal|PORTAL|EAST,false,false,false,false,p.dimension)
world.setBlock(x,y-4,z+1,blockIds.obsidian,false,false,false,false,p.dimension)
world.setBlock(x,y-3,z-2,blockIds.obsidian,false,false,false,false,p.dimension)
world.setBlock(x,y-3,z-1,blockIds.portal|PORTAL|EAST,false,false,false,false,p.dimension)
world.setBlock(x,y-3,z,blockIds.portal|PORTAL|EAST,false,false,false,false,p.dimension)
world.setBlock(x,y-3,z+1,blockIds.obsidian,false,false,false,false,p.dimension)
world.setBlock(x,y-2,z-2,blockIds.obsidian,false,false,false,false,p.dimension)
world.setBlock(x,y-2,z-1,blockIds.portal|PORTAL|EAST,false,false,false,false,p.dimension)
world.setBlock(x,y-2,z,blockIds.portal|PORTAL|EAST,false,false,false,false,p.dimension)
world.setBlock(x,y-2,z+1,blockIds.obsidian,false,false,false,false,p.dimension)
//layer5
world.setBlock(x,y-1,z-2,blockIds.obsidian,false,false,false,false,p.dimension)
world.setBlock(x,y-1,z-1,blockIds.obsidian,false,false,false,false,p.dimension)
world.setBlock(x,y-1,z,blockIds.obsidian,false,false,false,false,p.dimension)
world.setBlock(x,y-1,z+1,blockIds.obsidian,false,false,false,false,p.dimension)
}
p.y = dy-5+p.bottomH, p.x - x, p.z = z
p.lastY = 0
}else console.log("no portal")
}
}
},
{ name: "obsidian", Name:"Obsidian", stoneSound:true, type:"rock4",category:"nature", breakTime:250, blastResistance:1200, pistonPush:false, pistonPull:false, randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true},
//the old redstone dust added before this version of minekhan was public (early 2021)
/*{
name:"redstoneDust",
onupdate: function(x,y,z){
var neigbors = [
world.getBlock(x+1,y,z),
world.getBlock(x-1,y,z),
world.getBlock(x,y,z+1),
world.getBlock(x,y,z-1),
world.getBlock(x,y+1,z),
world.getBlock(x,y-1,z)
];
if(neigbors.includes(blockIds.redstoneBlock) || neigbors.includes(blockIds.redstoneDustOn)){
world.setBlock(x,y,z, blockIds.redstoneDustOn, false, true)
}
}
},
{
name:"redstoneDustOn",
hidden: true,
onupdate: function(x,y,z){
var checked = []
function touchingSource(x,y,z, t){
t = t || 0;
t ++;
var neighbors = [
[x+1,y,z],
[x-1,y,z],
[x,y,z+1],
[x,y,z-1],
[x,y+1,z],
[x,y-1,z]
];
for(var i=0; i<neighbors.length; i++){
var value = neighbors[i];
var block = world.getBlock(value[0], value[1], value[2])
if(block === blockIds.redstoneBlock){
return true;
}
if(t<10){
if( !(checked.includes[value]) && (block === blockIds.redstoneDust || block === blockIds.buffer) && touchingSource(value[0], value[1], value[2], t)){
checked.push(value);
return true
};
}
}
return false;
}
if(!touchingSource(x,y,z)){
world.setBlock(x,y,z, blockIds.redstoneDust);
}
//world.setBlock(x,y,z, blockIds.redstoneDust);
}
},*/
{
name:"redstone",
Name:"Redstone Dust",
item:true,
useAs:"redstoneDust",
category:"redstone",
},
{
name:"redstoneDust",
textures:"redstoneDustDot",
shadow:false,
transparent:true,
solid:false,
hidden:true,
smoothLight:false,
damage:(x,y,z,dimension) => world.getPower(x,y,z,dimension)/15,
dieMessage: () => username+" died from radiation from redstone dust.",
drop: "redstone",
tagBits:{
north:[0,1],
south:[1,1],
east:[2,1],
west:[3,1],
northUp:[4,1],
southUp:[5,1],
eastUp:[6,1],
westUp:[7,1],
northDown:[8,1],
southDown:[9,1],
eastDown:[10,1],
westDown:[11,1],
up:[12,1],
down:[13,1]
},
onupdate: function(x,y,z,b,world,sx,sy,sz,dimension){
let tags = world.getTags(x,y,z,dimension)
let north, south, east, west
let northUp = getTagBits(tags,"northUp",this.id), southUp = getTagBits(tags,"southUp",this.id), eastUp = getTagBits(tags,"eastUp",this.id), westUp = getTagBits(tags,"westUp",this.id)
let northDown = getTagBits(tags,"northDown",this.id), southDown = getTagBits(tags,"southDown",this.id), eastDown = getTagBits(tags,"eastDown",this.id), westDown = getTagBits(tags,"westDown",this.id)
let up, down
let pnorthUp = northUp, psouthUp = southUp, peastUp = eastUp, pwestUp = westUp,
pnorthDown = northDown, psouthDown = southDown, peastDown = eastDown, pwestDown = westDown
let above = world.getBlock(x,y+1,z)
if(above && !blockData[above].transparent){
westUp = eastUp = southUp = northUp = up = false
}else{
westUp = this.connectable(x+1,y+1,z,"westUp",dimension,b,world)
eastUp = this.connectable(x-1,y+1,z,"eastUp",dimension,b,world)
southUp = this.connectable(x,y+1,z-1,"southUp",dimension,b,world)
northUp = this.connectable(x,y+1,z+1,"northUp",dimension,b,world)
up = this.connectable(x,y+1,z,"up",dimension,b,world)
}
westDown = this.connectable(x+1,y-1,z,"westDown",dimension,b,world)
eastDown = this.connectable(x-1,y-1,z,"eastDown",dimension,b,world)
southDown = this.connectable(x,y-1,z-1,"southDown",dimension,b,world)
northDown = this.connectable(x,y-1,z+1,"northDown",dimension,b,world)
down = this.connectable(x,y-1,z,"down",dimension,b,world)
west = westUp || westDown || this.connectable(x+1,y,z,"west",dimension,b,world)
east = eastUp || eastDown || this.connectable(x-1,y,z,"east",dimension,b,world)
south = southUp || southDown || this.connectable(x,y,z-1,"south",dimension,b,world)
north = northUp || northDown || this.connectable(x,y,z+1,"north",dimension,b,world)
if(north + south + east + west === 1){
//make it a line. it can't be half of a line
if(north) south = true
if(south) north = true
if(east) west = true
if(west) east = true
}
if(up || down){
north = south = east = west = true
}
world.setTagByName(x,y,z,"north",north,true,dimension,true)
world.setTagByName(x,y,z,"south",south,true,dimension,true)
world.setTagByName(x,y,z,"east",east,true,dimension,true)
world.setTagByName(x,y,z,"west",west,true,dimension,true)
world.setTagByName(x,y,z,"northUp",northUp,true,dimension,true)
world.setTagByName(x,y,z,"southUp",southUp,true,dimension,true)
world.setTagByName(x,y,z,"eastUp",eastUp,true,dimension,true)
world.setTagByName(x,y,z,"westUp",westUp,true,dimension,true)
world.setTagByName(x,y,z,"northDown",northDown,true,dimension,true)
world.setTagByName(x,y,z,"southDown",southDown,true,dimension,true)
world.setTagByName(x,y,z,"eastDown",eastDown,true,dimension,true)
world.setTagByName(x,y,z,"westDown",westDown,true,dimension,true)
world.setTagByName(x,y,z,"up",up,true,dimension,true)
world.setTagByName(x,y,z,"down",down,false,dimension,false)//notice last one not lazy and not remote
//set texture and stuff
let sum = north + south + east + west
let block = this.id //dot
if(sum === 2){
if(north && west) block = this.id | STAIR | EAST
else if(west && south) block = this.id | STAIR | SOUTH
else if(south && east) block = this.id | STAIR | WEST
else if(east && north) block = this.id | STAIR | NORTH
else{
if(north || south) block = this.id | SLAB | NORTH
if(east || west) block = this.id | SLAB | EAST
}
}else if(sum === 3){
if(east && west){
if(north) block = this.id | DOOR | NORTH
else block = this.id | DOOR | SOUTH
}else if(north && south){
if(east) block = this.id | DOOR | WEST
else block = this.id | DOOR | EAST
}
}else if(sum === 4) block = this.id | PANE
if((b & FLIP) === FLIP) block |= FLIP //blue redstone
if(world.getBlock(x,y,z,dimension) !== block){
world.setBlock(x,y,z,block,false,false,false,true,dimension)
//world.updateBlock(x,y,z,false,false,null,null,null,dimension)
}
if(pnorthUp != northUp) world.updateBlock(x,y+1,z+1,false,false,null,null,null,dimension), world.unspreadPower(x,y+1,z+1,world.getPower(x,y+1,z+1,dimension), true,dimension)
if(psouthUp != southUp) world.updateBlock(x,y+1,z-1,false,false,null,null,null,dimension), world.unspreadPower(x,y+1,z-1,world.getPower(x,y+1,z-1,dimension), true,dimension)
if(pwestUp != westUp) world.updateBlock(x+1,y+1,z,false,false,null,null,null,dimension), world.unspreadPower(x+1,y+1,z,world.getPower(x+1,y+1,z,dimension), true,dimension)
if(peastUp != eastUp) world.updateBlock(x-1,y+1,z,false,false,null,null,null,dimension), world.unspreadPower(x-1,y+1,z,world.getPower(x-1,y+1,z,dimension), true,dimension)
if(pnorthDown != northDown) world.updateBlock(x,y-1,z+1,false,false,null,null,null,dimension), world.unspreadPower(x,y-1,z+1,world.getPower(x,y-1,z+1,dimension), true,dimension)
if(psouthDown != southDown) world.updateBlock(x,y-1,z-1,false,false,null,null,null,dimension), world.unspreadPower(x,y-1,z-1,world.getPower(x,y-1,z-1,dimension), true,dimension)
if(pwestDown != westDown) world.updateBlock(x+1,y-1,z,false,false,null,null,null,dimension), world.unspreadPower(x+1,y-1,z,world.getPower(x+1,y-1,z,dimension), true,dimension)
if(peastDown != eastDown) world.updateBlock(x-1,y-1,z,false,false,null,null,null,dimension), world.unspreadPower(x-1,y-1,z,world.getPower(x-1,y-1,z,dimension), true,dimension)
//above: number != boolean
this.onpowerupdate(x,y,z,x,y,z,false,dimension,world)
},
onset:function(x,y,z,dimension,world){
//this.onupdate(x,y,z,null,null,null,null,null,dimension)
let power = world.getRedstoneWirePower(x,y,z,dimension)
var strong = world.getSurroundingBlockPower(x,y,z,dimension) === "strong"
if(strong) power = 15
world.setTagByName(x,y,z,"power",power,false,dimension)
if(power) world.spreadPower(x,y,z,power,dimension)
},
ondelete:function(x,y,z,tags,prev,dimension,world){
const power = getTagBits(tags,"power",this.id)
if(power) world.unspreadPower(x,y,z,power,false,dimension)
if(getTagBits(tags,"north",this.id)){
var block = world.getBlock(x,y,z+1,dimension)
if(block && !blockData[block].transparent){
world.setBlockPower(x,y,z+1, null, "south",dimension)
}
}
if(getTagBits(tags,"south",this.id)){
var block = world.getBlock(x,y,z-1,dimension)
if(block && !blockData[block].transparent){
world.setBlockPower(x,y,z-1, null, "north",dimension)
}
}
if(getTagBits(tags,"west",this.id)){
var block = world.getBlock(x+1,y,z,dimension)
if(block && !blockData[block].transparent){
world.setBlockPower(x+1,y,z, null, "east",dimension)
}
}
if(getTagBits(tags,"east",this.id)){
var block = world.getBlock(x-1,y,z,dimension)
if(block && !blockData[block].transparent){
world.setBlockPower(x-1,y,z, null, "west",dimension)
}
}
var block = world.getBlock(x,y-1,z,dimension)
if(block && !blockData[block].transparent){
world.setBlockPower(x,y-1,z, null, "top",dimension)
}
//update the diagnolly connecting redstone
if(getTagBits(tags,"northUp",this.id)) world.updateBlock(x,y+1,z+1,false,false,null,null,null,dimension), world.unspreadPower(x,y+1,z+1,world.getPower(x,y+1,z+1,dimension), true,dimension)
if(getTagBits(tags,"southUp",this.id)) world.updateBlock(x,y+1,z-1,false,false,null,null,null,dimension), world.unspreadPower(x,y+1,z-1,world.getPower(x,y+1,z-1,dimension), true,dimension)
if(getTagBits(tags,"westUp",this.id)) world.updateBlock(x+1,y+1,z,false,false,null,null,null,dimension), world.unspreadPower(x+1,y+1,z,world.getPower(x+1,y+1,z,dimension), true,dimension)
if(getTagBits(tags,"eastUp",this.id)) world.updateBlock(x-1,y+1,z,false,false,null,null,null,dimension), world.unspreadPower(x-1,y+1,z,world.getPower(x-1,y+1,z,dimension), true,dimension)
if(getTagBits(tags,"northDown",this.id)) world.updateBlock(x,y-1,z+1,false,false,null,null,null,dimension), world.unspreadPower(x,y-1,z+1,world.getPower(x,y-1,z+1,dimension), true,dimension)
if(getTagBits(tags,"southDown",this.id)) world.updateBlock(x,y-1,z-1,false,false,null,null,null,dimension), world.unspreadPower(x,y-1,z-1,world.getPower(x,y-1,z-1,dimension), true,dimension)
if(getTagBits(tags,"westDown",this.id)) world.updateBlock(x+1,y-1,z,false,false,null,null,null,dimension), world.unspreadPower(x+1,y-1,z,world.getPower(x+1,y-1,z,dimension), true,dimension)
if(getTagBits(tags,"eastDown",this.id)) world.updateBlock(x-1,y-1,z,false,false,null,null,null,dimension), world.unspreadPower(x-1,y-1,z,world.getPower(x-1,y-1,z,dimension), true,dimension)
},
onpowerupdate:function(x,y,z,sx,sy,sz,blockPowerChanged,dimension,world){
if(x===sx && y===sy && z===sz && !blockPowerChanged){
var tags = world.getTags(x,y,z,dimension)
if(getTagBits(tags,"power",this.id)){
if(getTagBits(tags,"north",this.id) && world.getBlockPower(x,y,z+1, "south",dimension) !== "weak"){
var block = world.getBlock(x,y,z+1,dimension)
if(block && !blockData[block].transparent){
world.setBlockPower(x,y,z+1, "weak", "south",dimension)
}
}
if(getTagBits(tags,"south",this.id) && world.getBlockPower(x,y,z-1, "north",dimension) !== "weak"){
var block = world.getBlock(x,y,z-1,dimension)
if(block && !blockData[block].transparent){
world.setBlockPower(x,y,z-1, "weak", "north",dimension)
}
}
if(getTagBits(tags,"west",this.id) && world.getBlockPower(x+1,y,z, "east",dimension) !== "weak"){
var block = world.getBlock(x+1,y,z,dimension)
if(block && !blockData[block].transparent){
world.setBlockPower(x+1,y,z, "weak", "east",dimension)
}
}
if(getTagBits(tags,"east",this.id) && world.getBlockPower(x-1,y,z, "west",dimension) !== "weak"){
var block = world.getBlock(x-1,y,z,dimension)
if(block && !blockData[block].transparent){
world.setBlockPower(x-1,y,z, "weak", "west",dimension)
}
}
}else{
if(world.getBlockPower(x,y,z+1, "south",dimension)){
var block = world.getBlock(x,y,z+1,dimension)
if(block && !blockData[block].transparent){
world.setBlockPower(x,y,z+1, null, "south",dimension)
}
}
if(world.getBlockPower(x,y,z-1, "north",dimension)){
block = world.getBlock(x,y,z-1,dimension)
if(block && !blockData[block].transparent){
world.setBlockPower(x,y,z-1, null, "north",dimension)
}
}
if(world.getBlockPower(x+1,y,z, "east",dimension)){
block = world.getBlock(x+1,y,z,dimension)
if(block && !blockData[block].transparent){
world.setBlockPower(x+1,y,z, null, "east",dimension)
}
}
if(world.getBlockPower(x-1,y,z, "west",dimension)){
block = world.getBlock(x-1,y,z,dimension)
if(block && !blockData[block].transparent){
world.setBlockPower(x-1,y,z, null, "west",dimension)
}
}
}
var target = getTagBits(tags,"power",this.id) ? "weak" : null
if(target !== world.getBlockPower(x,y-1,z, "top",dimension)){
var block = world.getBlock(x,y-1,z,dimension)
if(block && !blockData[block].transparent){
world.setBlockPower(x,y-1,z, target, "top",dimension)
}
}
}else if(blockPowerChanged){
var shouldBeOn = /*world.getRedstoneWirePower(x,y,z) || */world.getSurroundingBlockPower(x,y,z,dimension) === "strong"
var power = world.getPower(x,y,z,dimension)
if(shouldBeOn && !power){
world.setPower(x,y,z,15,false,dimension)
world.spreadPower(x,y,z,15,dimension)
}else if(!shouldBeOn && power){
world.unspreadPower(x,y,z,15,true,dimension)
}
}
},
connectables: ["redstoneBlock", "redstoneLamp", "tnt", "redstoneTorch", "lever", "redstoneConnector","is:button", "piston","pistonSticky","is:pressurePlate","dropper","dispenser","target","redRedstoneLamp","yellowRedstoneLamp","greenRedstoneLamp","blueRedstoneLamp","noteBlock", "daylightDetector","is:commandBlock"],
connectable: function(x,y,z, d,dimension, b,world) {
var id = world.getBlock(x,y,z,dimension)
if(!id) return false
var up = false, down = false
switch(d){
case "northUp":
case "southUp":
case "eastUp":
case "westUp":
case "up":
up = true
break
case "northDown":
case "southDown":
case "eastDown":
case "westDown":
case "down":
down = true
break
}
if(down && d !== "down"){
var block = world.getBlock(x,y+1,z,dimension)
if(block && !blockData[block].transparent) return false
}
if(up || down) return blockData[id].name === "redstoneDust" && (id & FLIP) === (b & FLIP)
if(blockData[id].name === "redstoneDust" && (id & FLIP) === (b & FLIP)) return true
if(this.connectables.includes(blockData[id].name)) return true
for(var i of this.connectables){
if(i.startsWith("is:")){
if(blockData[id][i.replace("is:","")]) return true
}
}
if(blockData[id].name === "repeater" || blockData[id].name === "notGate"){
var canIt = false
var facing = blockData[id].getFacing(x,y,z,dimension,world)
switch(facing){
case "north":
case "south":
canIt = d === "north" || d === "south"
break
case "east":
case "west":
canIt = d === "east" || d === "west"
}
return canIt
}else if(blockData[id].name === "observer"){
var facing = blockData[id].getFacing(x,y,z,dimension,world)
switch(facing){
case "east":
return d === "east"
case "west":
return d === "west"
case "north":
return d === "south"
case "south":
return d === "north"
}
}else if(blockData[id].logicGate){
var facing = blockData[id].getFacing(x,y,z,dimension,world)
switch(facing){
case "east":
return d === "east" || d === "north" || d === "south"
case "west":
return d === "west" || d === "north" || d === "south"
case "north":
return d === "south" || d === "east" || d === "west"
case "south":
return d === "north" || d === "east" || d === "west"
}
}else if(blockData[id].name === "comparator"){
var facing = blockData[id].getFacing(x,y,z,dimension,world)
var canIt
switch(facing){
case "east":
canIt = canIt || d === "east" || d === "north" || d === "south"
case "west":
canIt = canIt || d === "west" || d === "north" || d === "south"
case "north":
canIt = canIt || d === "south" || d === "east" || d === "west"
case "south":
canIt = canIt || d === "north" || d === "east" || d === "west"
}
switch(facing){
case "north":
case "south":
canIt = canIt || d === "north" || d === "south"
break
case "east":
case "west":
canIt = canIt || d === "east" || d === "west"
}
return canIt
}
return false
}
},
/*{
name: "buffer",
textures: ["bufferTop", "bufferMiddle"],
category:"redstone",
onupdate: function(x,y,z){
setTimeout(() => {
var isOn = world.getBlock(x,y+1,z);
isOn = isOn === blockIds.redstoneDustOn || isOn === blockIds.redstoneBlock;
if(isOn && world.getBlock(x,y-1,z) === blockIds.redstoneDust ){
setTimeout(function(){world.setBlock(x,y-1,z, blockIds.redstoneDustOn)}, 500);
}
}, 10)
}
},*/
{
name:"blueRedstone",
Name:"Blue Redstone Dust",
item:true,
useAs:() => blockIds.redstoneDust | FLIP,
category:"redstone",
},
{ name: "soup",category:"food"},
{ name: "soup2",category:"food"},
{
name: "soup3",
transparent:true,
category:"food"
},
{ name: "soup4",category:"food"},
{ name: "randomSoup",category:"food"},
{
name: "redStain",
transparent: true,
},
{
name:"poision potion",
transparent:true,
crossShape:true,
},
{
name: "light",
textures: "none",
transparent:true,
lightLevel: 15,
solid: false,
iconTexture: "light_15",
flatIcon: true,
shadow: false,
noHitbox:true,
pistonPush:false,
pistonPull:false,
rarity:"epic"
},
{
name: "autumnLeaves",
transparent: true,
cullFace:"never",
burnChance: 0.2,
burnTime: 30,
category:"nature"
},
{
name: "darkLeaves",
transparent: true,
cullFace:"never",
burnChance: 0.2,
burnTime: 30,
category:"nature"
},
{
name: "redBerryLeaves",
transparent: true,
cullFace:"never",
burnChance: 0.2,
burnTime: 30,
category:"nature"
},
{
name: "blueBerryLeaves",
transparent: true,
cullFace:"never",
burnChance: 0.2,
burnTime: 30,
category:"nature"
},
{
name: "pinkLeaves",
transparent: true,
cullFace:"never",
burnChance: 0.2,
burnTime: 30,
category:"nature"
},
{ name: "lilyOftheValley",
Name:"Lily of The Valley",
solid: false,
transparent: true,
shadow: false,
potCross: true,
crossShape: true,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature"
},
{ name: "poppy",
Name:"Poppy",
solid: false,
transparent: true,
shadow: false,
potCross: true,
crossShape: true,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature"
},
{ name: "dandelion",
Name:"Dandelion",
solid: false,
transparent: true,
shadow: false,
potCross: true,
crossShape: true,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature"
},
{ name: "blueOrchid",
Name:"Blue Orchid",
solid: false,
transparent: true,
shadow: false,
crossShape: true,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature"
},
{ name: "pinkTulip",
Name:"Pink Tulip",
solid: false,
transparent: true,
shadow: false,
potCross: true,
crossShape: true,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature"
},
{ name: "orangeTulip",
Name:"Orange Tulip",
solid: false,
transparent: true,
shadow: false,
potCross: true,
crossShape: true,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature"
},
{ name: "redTulip",
Name:"Red Tulip",
solid: false,
transparent: true,
shadow: false,
potCross: true,
crossShape: true,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature"
},
{ name: "whiteTulip",
Name:"White Tulip",
solid: false,
transparent: true,
shadow: false,
potCross: true,
crossShape: true,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature"
},
{ name: "azureBluet",
Name:"Azure Bluet",
solid: false,
transparent: true,
shadow: false,
potCross: true,
crossShape: true,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature"
},
{ name: "cornFlower",
Name:"Cornflower",
solid: false,
transparent: true,
shadow: false,
potCross: true,
crossShape: true,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature"
},
{ name: "purpleFlower",
Name:"Purple Flower (i don't think this exsists in minecraft)",
solid: false,
transparent: true,
shadow: false,
potCross: true,
crossShape: true,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature"
},
{ name: "allium",
Name:"Allium",
solid: false,
transparent: true,
shadow: false,
potCross: true,
crossShape: true,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature"
},
{ name: "oxeyeDaisy",
Name:"Oxeye Daisy",
solid: false,
transparent: true,
shadow: false,
potCross: true,
crossShape: true,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature"
},
{ name: "lilac",
Name:"Lilac",
solid: false,
transparent: true,
shadow: false,
textures: "lilacTop",
tallcrossShape: true,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature"
},
{ name: "roseBush",
Name:"Rose Bush",
solid: false,
transparent: true,
shadow: false,
textures: "roseBushTop",
tallcrossShape: true,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature"
},
{ name: "peony",
Name:"Peony",
solid: false,
transparent: true,
shadow: false,
textures: "peonyTop",
tallcrossShape: true,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature"
},
{ name: "witherRose",
Name:"Wither Rose",
solid: false,
transparent: true,
shadow: false,
potCross: true,
crossShape: true,
ontouch: () => {witherEffect = 120; witherDamage = 1; witherTime = 2000},
compostChance:0.65,
liquidBreakable:"drop",
category:"nature"
},
{
name: "TallGrass",
Name:"Grass",
solid: false,
transparent: true,
shadow: false,
crossShape: true,
drop: "wheatSeeds",
dropAmount:[0,1],
dropSelfWhenSheared:true,
shearDropAmount:1,
shade:false,
compostChance:0.5,
liquidBreakable:"drop",
category:"nature",
randomHeight:true
},
{ 
name: "oakDoor",
Name:"Oak Door",
transparent: true,
shadow: false,
textures: "oakDoorBottom",
door:true,
woodSound:true,
breakTime:4.5,
type:"wood",
category:"build"
},
{
name: "spruceDoor",
Name:"Spruce Door",
transparent: true,
shadow: false,
textures:"spruceDoorBottom",
door:true,
woodSound:true,
breakTime:4.5,
type:"wood",
category:"build"
},
{
name: "ironDoor",
Name:"Iron Door",
transparent: true,
shadow: false,
textures:"ironDoorBottom",
door:true,
stoneSound:true,
breakTime:4.5,
type:"wood",
category:"build"
},
{
name: "darkOakDoor",
Name:"Dark Oak Door",
transparent: true,
shadow: false,
textures:"darkOakDoorBottom",
door:true,
woodSound:true,
breakTime:4.5,
type:"wood",
category:"build"
},
{
name: "birchDoor",
Name:"Birch Door",
transparent: true,
shadow: false,
textures:"birchDoorBottom",
door:true,
woodSound:true,
breakTime:4.5,
type:"wood",
category:"build"
},
{
name: "jungleDoor",
Name:"Jungle Door",
transparent: true,
shadow: false,
textures:"jungleDoorBottom",
door:true,
woodSound:true,
breakTime:4.5,
type:"wood",
category:"build"
},
{
name: "acaciaDoor",
Name:"Acacia Door",
transparent: true,
shadow: false,
textures:"acaciaDoorBottom",
door:true,
woodSound:true,
breakTime:4.5,
type:"wood",
category:"build"
},
{
name: "warpedDoor",
Name:"Warped Door",
transparent: true,
shadow: false,
textures:"warpedDoorBottom",
door:true,
woodSound:true,
breakTime:4.5,
type:"wood",
category:"build"
},
{
name: "crimsonDoor",
Name:"Crimson Door",
transparent: true,
shadow: false,
textures:"crimsonDoorBottom",
door:true,
woodSound:true,
breakTime:4.5,
type:"wood",
category:"build"
},
{
name: "torch",
Name:"Torch",
transparent: true,
shadow: false,
torch: true,
lightLevel: 13,
woodSound:true,
solid:false,
category:"decoration"
},
{
name: "soulTorch",
Name:"Soul Torch",
transparent: true,
shadow: false,
torch: true,
lightLevel: 10,
woodSound:true,
solid:false,
category:"decoration"
},
{
name: "lantern",
Name:"Lantern",
transparent: true,
shadow: false,
lightLevel: 13,
iconTexture: "lanternIcon",
lantern: true,
category:"decoration",
digSound: ["block.lantern.dig1", "block.lantern.dig2", "block.lantern.dig3", "block.lantern.dig4", "block.lantern.dig5", "block.lantern.dig6"],
placeSound: ["block.lantern.place1", "block.lantern.place2","block.lantern.place3","block.lantern.place4","block.lantern.place5","block.lantern.place6"]
},
{
name: "soulLantern",
Name:"Soul Lantern",
transparent: true,
shadow: false,
lightLevel: 10,
iconTexture:"soulLanternIcon",
lantern: true,
category:"decoration",
digSound: ["block.lantern.dig1", "block.lantern.dig2", "block.lantern.dig3", "block.lantern.dig4", "block.lantern.dig5", "block.lantern.dig6"],
placeSound: ["block.lantern.place1", "block.lantern.place2","block.lantern.place3","block.lantern.place4","block.lantern.place5","block.lantern.place6"]
},
{
name: "beacon",
Name:"Beacon",
breakTime:4.5,
transparent: true,
shadow: false,
beacon: true,
lightLevel: 15,
glassSound: true,
pistonPush:false,
pistonPull:false,
category:"decoration",
rarity:"rare",
tagBits:null,
beaconBlocks:["ironBlock","goldBlock","emeraldBlock","diamondBlock","netheriteBlock"],
getSize:function(x,y,z,dimension,world){
let minSize
sizeLoop:for(let size=1; size<4; size++){
for(let x2=x-size; x2<=x+size; x2++) for(let z2=z-size; z2<=z+size; z2++){
let block2 = world.getBlock(x2,y-size,z2)
if(!this.beaconBlocks.includes(blockData[block2].name)) break sizeLoop
}
minSize = size
}
return minSize
},
update: function(x,y,z,dimension,world){
let minSize = this.getSize(x,y,z,dimension,world), block = world.getBlock(x,y,z,dimension)
if(minSize){
if(block !== (this.id | BEACON)){
world.setBlock(x,y,z,this.id|BEACON,false,false,false,true,dimension)
this.set(x,y,z,dimension,world)
}
}else if(block !== this.id) world.setBlock(x,y,z,this.id,false,false,false,true,dimension)
return minSize
},
onplace: function(x,y,z, dimension, player,world){
this.update(x,y,z,dimension,world)
}
},
{
name: "cactus",
Name:"Cactus",
textures: ["cactusBottom", "cactusTop", "cactusSide"],
transparent: true,
cactus: true,
damage: 1,
potCross: true,
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
needsSupportingBlocks(x,y,z,b,world,dimension)
},
compostChance:0.5,
liquidBreakable:"drop",
category:"nature"
},
{
name: "glassPane",
Name:"Glass Pane",
transparent: true,
shadow: false,
breakTime: 60,
pane:true,
textures: ["glassPaneTop","glassPaneTop","glass","glass","glassPaneSide","glassPaneSide"],
glassSound: true,
category:"build"
},
{
name: "ladder",
Name:"Ladder",
transparent: true,
shadow: false,
wallFlat: true,ladder:true,
breakTime:0.6,
type:"wood",
category:"decoration"
},
{
name: "vine",
Name:"Vine",
transparent: true,
shadow: false,
wallFlat: true,ladder:true,
drop:"air",
dropSelfWhenSheared:true,
shearBreakTime:0.35,
liquidBreakable:"drop",
solid:false,
shade:false,
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
var fx = x, fz = z
switch(b){
case this.id | WALLFLAT | NORTH:
fz++
break
case this.id | WALLFLAT | SOUTH:
fz--
break
case this.id | WALLFLAT | EAST:
fx++
break
case this.id | WALLFLAT | WEST:
fx--
break
}
var block = world.getBlock(fx,y,fz,dimension)
var above = world.getBlock(x,y+1,z,dimension)
if(!world.settings.blocksFall || block && blockData[block].solid || above === b) return
world.setTimeout(function(){
var block = world.getBlock(fx,y,fz,dimension)
var above = world.getBlock(x,y+1,z,dimension)
if(block && blockData[block].solid || above === b) return
world.setBlock(x,y,z, 0,false,false,false,false,dimension)
world.addItems(x,y,z,dimension,0,0,0,b,true)
world.blockParticles(b,x,y,z,30, "break",dimension)
world.blockSound(b, "dig", x,y,z)
},tickTime,x,y,z,dimension)
},
compostChance:0.5,
category:"nature"
},
{
name: "Water",
textures:["Water","waterFlow"],
transparent: true,
liquid: true,
wet:true,
solid:false,
shadow: false,
semiTrans: true,
cullFace:"never",
blastResistance:100,
hidden:true,
dripThroughBlocks:[43/255, 63/255, 213/255],
getLevelDifference:function(level){return level-1},
canDuplicate:true,
drop:"air",
density:1,
inLiquid:1,
flowSound:"liquid.water",
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
var block = world.getBlock(x,y+1,z,dimension)
if (block && blockData[block].name === "Lava") {
return world.setBlock(x,y,z,blockIds.stone,false,false,false,false,dimension)
}
var n = world.getBlock(x,y,z+1,dimension)
var s = world.getBlock(x,y,z-1,dimension)
var e = world.getBlock(x+1,y,z,dimension)
var w = world.getBlock(x-1,y,z,dimension)
if (n && blockData[n].name === "Lava" || s && blockData[s].name === "Lava" || e && blockData[e].name === "Lava" || w && blockData[w].name === "Lava") {
return world.setBlock(x,y,z,blockIds.cobblestone,false,false,false,false,dimension)
}
if(!world.settings.blocksFall) return
var me = this
world.setTimeout(() => me.flow(x,y,z,dimension,world), tickTime*5, x,y,z,dimension)
},
getY:function(x,y,z,dimension){
var block = world.getBlock(x,y,z,dimension)
return (min((this.getLevel(block) || (block ? 8 : 0))*2,14.5)/16)-0.5
}
},
{
name: "Lava",
textures:["Lava","lavaFlow"],
transparent: true,
liquid: true,
solid:false,
lightLevel:15,
damage:4,
burnEnt:true,
dieMessage: () => username+" tried to swim in lava.",
shadow: false,
blastResistance:100,
hidden:true,
temperature:25,
dripThroughBlocks:[210/255, 59/255, 17/255],
drop:"air",
density:2,
inLiquid:2,
flowSound:"liquid.lava",
getLevelDifference:function(level,dimension){return dimension === "nether" ? level-1 : level-2},
tick:function(x,y,z,dimension,world){
blockData[blockIds.fire].spread(x,y,z,dimension,world)
},
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
let block = world.getBlock(x,y+1,z,dimension)
if (block && blockData[block].name === "Water") {
return world.setBlock(x,y,z,blockIds.obsidian,false,false,false,false,dimension)
}
const under = world.getBlock(x,y-1,z,dimension)
const n = world.getBlock(x,y,z+1,dimension)
const s = world.getBlock(x,y,z-1,dimension)
const e = world.getBlock(x+1,y,z,dimension)
const w = world.getBlock(x-1,y,z,dimension)
if(blockData[under].name === "soulSoil"){
if (blockData[n].name === "ice" || blockData[n].name === "packedIce" || blockData[n].name === "blueIce" || blockData[s].name === "ice" || blockData[s].name === "packedIce" || blockData[s].name === "blueIce" || blockData[e].name === "ice" || blockData[e].name === "packedIce" || blockData[e].name === "blueIce" || blockData[w].name === "ice" || blockData[w].name === "packedIce" || blockData[w].name === "blueIce") {
return world.setBlock(x,y,z,blockIds.basalt,false,false,false,false,dimension)
}
}
if(blockData[under].name === "honeyBlock" || blockData[n].name === "honeyBlock" || blockData[s].name === "honeyBlock" || blockData[e].name === "honeyBlock" || blockData[w].name === "honeyBlock"){
return world.setBlock(x,y,z,blockIds.limestone,false,false,false,false,dimension)
}
if(!world.settings.blocksFall) return
var me = this
world.setTimeout(() => me.flow(x,y,z,dimension,world), tickTime*(dimension === "nether" ? 10 : 30), x,y,z,dimension)
},
getY:function(x,y,z,dimension){
var block = world.getBlock(x,y,z,dimension)
return (min((this.getLevel(block))*2,14.5)/16)-0.5
}
},
{
name: "craftingTable",
Name:"Crafting Table",
textures: ["oakPlanks","craftingTableTop","craftingTableFront","craftingTableSide"],
onclientclick: () => {changeScene("crafting"); releasePointer()},
woodSound: true,
breakTime:3.75,
type:"wood",
category:"items"
},
{
name: "crimsonNylium",
Name:"Crimson Nylium",
textures: ["netherrack", "crimsonNyliumTop", "crimsonNyliumSide"],
nyliumSound: true,
category:"nature",
randomRotate:true,randomRotateTop:true,randomRotateBottom:true
},
{
name: "warpedNylium",
Name:"Warped Nylium",
textures: ["netherrack", "warpedNyliumTop", "warpedNyliumSide"],
nyliumSound: true,
category:"nature",
randomRotate:true,randomRotateTop:true,randomRotateBottom:true
},
{
name: "crimsonStem",
Name:"Crimson Stem",
textures: ["crimsonStemTop", "crimsonStemSide"],
stemSound: true,
type:"wood",
category:"nature"
},
{
name: "warpedStem",
Name:"Warped Stem",
textures: ["warpedStemTop", "warpedStemSide"],
stemSound: true,
type:"wood",
category:"nature"
},
{ name: "netherWartBlock",
Name:"Nether Wart Block",breaktime:1.5,compostChance:0.85,category:"nature",
digSound: ["block.netherwart.dig1", "block.netherwart.dig2", "block.netherwart.dig3", "block.netherwart.dig4", "block.netherwart.dig5", "block.netherwart.dig6"],
stepSound: ["block.netherwart.step1", "block.netherwart.step2","block.netherwart.step3","block.netherwart.step4","block.netherwart.step5"],
randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{ name: "warpedWartBlock",
Name:"Warped Wart Block",breaktime:1.5,compostChance:0.85,category:"nature",
digSound: ["block.netherwart.dig1", "block.netherwart.dig2", "block.netherwart.dig3", "block.netherwart.dig4", "block.netherwart.dig5", "block.netherwart.dig6"],
stepSound: ["block.netherwart.step1", "block.netherwart.step2","block.netherwart.step3","block.netherwart.step4","block.netherwart.step5"],
randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{ name: "shroomlight", lightLevel:15,Name:"Shroomlight",breaktime:1.5,compostChance:0.65,category:"nature",
digSound: ["block.shroomlight.dig1", "block.shroomlight.dig2", "block.shroomlight.dig3", "block.shroomlight.dig4", "block.shroomlight.dig5"],
stepSound: ["block.shroomlight.step1", "block.shroomlight.step2","block.shroomlight.step3","block.shroomlight.step4","block.shroomlight.step5","block.shroomlight.step6"]},
{ 
name: "warpedFungus",
Name:"Warped Fungus",
solid: false,
shadow: false,
transparent: true,
crossShape: true,
potCross: true,
compostChance:0.65,
category:"nature",
digSound: ["block.fungus.dig1", "block.fungus.dig2", "block.fungus.dig3", "block.fungus.dig4", "block.fungus.dig5", "block.fungus.dig6"]
},
{
name: "blackstone",
Name:"Blackstone",
textures: ["blackstoneTop", "blackstone" ],
stoneSound: true,
category:"nature",
randomRotate:true,randomRotateTop:true,randomRotateBottom:true
},
{ name: "gildedBlackstone", Name:"Gilded Blackstone", category:"nature",stoneSound: true, randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true},
{ name: "polishedBlackstoneBricks", Name:"Polished Blackstone Bricks", category:"build",stoneSound: true},
{ name: "chiseledPolishedBlackstone", Name:"Chiseled Polished Blackstone", category:"build",stoneSound: true},
{
name: "netheriteBlock",
Name:"Netherite Block",
type:"rock4",
category:"build",
breakTime:250,
blastResistance:1200,
digSound: ["block.netherite.dig1", "block.netherite.dig2", "block.netherite.dig3", "block.netherite.dig4"],
stepSound: ["block.netherite.step1", "block.netherite.step2","block.netherite.step3","block.netherite.step4","block.netherite.step5","block.netherite.step6"]
},
{
name: "basalt",
Name: "Basalt",
category:"nature",
textures: [ "basaltTop", "basaltSide" ],
basaltSound: true
},
{
name: "polishedBasalt",
Name: "Polished Basalt",
category:"build",
textures: [ "polishedBasaltTop", "polishedBasaltSide" ],
basaltSound: true
},
{ name: "chain", Name:"Chain", category:"build",transparent:true, shadow:false, chain:true, iconTexture:"chainIcon",
digSound: ["block.chain.dig1", "block.chain.dig2", "block.chain.dig3", "block.chain.dig4"],
stepSound: ["block.chain.step1", "block.chain.step2","block.chain.step3","block.chain.step4","block.chain.step5","block.chain.step6"]},
{ name: "warpedPlanks", Name:"Warped Planks", breakTime:3, type:"wood",category:"build", woodSound:true},
{ 
name: "warpedTrapdoor",
Name: "Warped Trapdoor",
transparent: true,
shadow: false,
trapdoor: true,
woodSound:true,
category:"build"
},
{
name: "magma", Name:"Magma Block", lightLevel:15,breakTime:10, type:"rock1",
damage:1,
dieMessage: () => username+" discovered the floor was lava.",
burnTime:Infinity,
category:"nature",
randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name: "crimsonFungus",
Name: "Crimson Fungus",
solid: false,
shadow: false,
transparent: true,
crossShape: true,
potCross: true,
compostChance:0.65,
category:"nature",
digSound: ["block.fungus.dig1", "block.fungus.dig2", "block.fungus.dig3", "block.fungus.dig4", "block.fungus.dig5", "block.fungus.dig6"]
},
{ 
name: "warpedRoots",
Name: "Warped Roots",
transparent: true,
solid: false,
shadow: false,
crossShape: true,
rootSound: true,
compostChance:0.65,
category:"nature",
},
{ 
name: "crimsonRoots",
Name: "Crimson Roots",
transparent: true,
solid: false,
shadow: false,
crossShape: true,
rootSound: true,
compostChance:0.65,
category:"nature"
},
{ 
name: "twistingVines",
transparent: true,
solid: false,
shadow: false,
transparent: true,
crossShape: true,
ladder:true,
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
var top = world.getBlock(x,y+1,z,dimension)
var isIt = blockData[top].name === "twistingVines" || blockData[top].name === "twistingVinesPlant"
if(isIt){
world.setBlock(x,y,z,blockIds.twistingVinesPlant | CROSS,false,false,false,false,dimension)
}
},
hidden:true,
drop:"twistinVinesPlant"
},
{
name: "twistingVinesPlant",
Name: "Twisting Vines",
transparent: true,
solid: false,
shadow: false,
transparent: true,
crossShape: true,
ladder:true,
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
var top = world.getBlock(x,y+1,z,dimension)
var isIt = blockData[top].name === "twistingVines" || blockData[top].name === "twistingVinesPlant"
if(!isIt){
world.setBlock(x,y,z,blockIds.twistingVines | CROSS,false,false,false,false,dimension)
}
},
category:"nature",
},
{
name: "weepingVines",
transparent: true,
solid: false,
shadow: false,
crossShape: true,
ladder:true,
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
var top = world.getBlock(x,y-1,z,dimension)
var isIt = blockData[top].name === "weepingVines" || blockData[top].name === "weepingVinesPlant"
if(isIt){
world.setBlock(x,y,z,blockIds.weepingVinesPlant | CROSS,false,false,false,false,dimension)
}
},
hidden:true,
drop:"weepingVinesPlant"
},
{
name: "weepingVinesPlant",
Name:"Weeping Vines",
transparent: true,
solid: false,
shadow: false,
crossShape: true,
ladder:true,
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
var top = world.getBlock(x,y-1,z,dimension)
var isIt = blockData[top].name === "weepingVines" || blockData[top].name === "weepingVinesPlant"
if(!isIt){
world.setBlock(x,y,z,blockIds.weepingVines | CROSS,false,false,false,false,dimension)
}
},
category:"nature"
},
{ 
name: "netherSprouts",
Name: "Nether Sprouts",
solid: false,
shadow: false,
transparent: true,
crossShape: true,
compostChance:0.5,
category:"nature",
digSound: ["block.nether_sprouts.dig1", "block.nether_sprouts.dig2", "block.nether_sprouts.dig3", "block.nether_sprouts.dig4"],
stepSound: ["block.nether_sprouts.step1", "block.nether_sprouts.step2","block.nether_sprouts.step3","block.nether_sprouts.step4","block.nether_sprouts.step5"]
},
{ name: "stoneButton", Name:"Stone Button", textures:"stone", category:"redstone",button:true, transparent: true, shadow:false, stone:true },
{ 
name: "RespawnAnchorOff",
category:"items",
textures: ["respawnAnchorBottom", "respawnAnchorTopOff", "respawnAnchorSide0"],
//onupdate: (x,y,z) => {if(world.type !== "nether"){explode(x,y,z,2)}}
},
{ 
name: "RespawnAnchor1",
textures: ["respawnAnchorBottom", "respawnAnchorTop1", "respawnAnchorSide1"],
hidden: true
},
{ 
name: "RespawnAnchor2",
textures: ["respawnAnchorBottom", "respawnAnchorTop2", "respawnAnchorSide2"],
hidden: true
},
{ 
name: "RespawnAnchor3",
textures: ["respawnAnchorBottom", "respawnAnchorTop3", "respawnAnchorSide3"],
hidden: true
},
{ 
name: "RespawnAnchor",
textures: ["respawnAnchorBottom", "respawnAnchorTop", "respawnAnchorSide4"],
hidden: true
},
{
name:"redBed",
Name:"Red Bed",
textures: "bedbottom",
iconTexture: "bedIcon",
flatIcon: true,
onclientclick: (x,y,z,dimension) => {
clickBed(x,y,z,dimension)
},
transparent: true,
bed: true,
bounciness: 0.6,
category:"items"
},
{
name: "flintAndSteel",
Name:"Flint & Steel",
textures: "flintAndSteel",
item: true,
onuse: (x,y,z, block, replaceItem, useDurability, minusOne, dimension) => {
if(block === blockIds.tnt){
blockData[blockIds.tnt].explode(x,y,z,null,dimension,world)
}else if(block === (blockIds.tnt | SLAB)){
blockData[blockIds.tnt].superTntExplode(x,y,z,dimension,world)
}else if(block === (blockIds.tnt | STAIR)){
blockData[blockIds.tnt].ultraTntExplode(x,y,z,dimension,world)
}else if(block === blockIds.untnt){
blockData[blockIds.untnt].explode(x,y,z,null,dimension,world)
}else if(block === (blockData[block].id | SLAB)){
world.setBlock(x,y,z,blockData[block].id,false,false,false,false,dimension)
}else{
var attached = world.getBlock(hitBox.pos[0],hitBox.pos[1],hitBox.pos[2],dimension)
var pos = getPosition()
if(block === blockIds.obsidian && blockData[blockIds.fire].tryCreatePortal(pos[0],pos[1],pos[2],dimension)) return
var b = blockIds.fire
if(attached && blockData[attached].canHaveSoulFire) b = blockIds.soulFire
switch(hitBox.face){
case "bottom":
b |= STAIR
break
case "north":
b |= SLAB | SOUTH
break
case "south":
b |= SLAB | NORTH
break
case "east":
b |= SLAB | WEST
break
case "west":
b |= SLAB | EAST
break
}
world.setBlock(pos[0],pos[1],pos[2],b,false,false,false,false,dimension)
useDurability(1)
world.playSound(x,y,z, "block.fire.ignite")
}
},
onentityuse: (ent) => {
if(ent.type === "Creeper"){
ent.forceExplode()
}
},
durability:64,
stackSize:1,
category:"items"
},
{
name: "barrier",
Name:"That Invisible Block with a 🚫 Icon",
textures: "none",
iconTexture: "barrier",
flatIcon:true,
transparent:true,
breakTime:Infinity,
pistonPush:false,
pistonPull:false,
category:"items",
rarity:"epic"
},
{
name: "oakSapling",
Name:"Oak Sapling",
crossShape: true,
potCross: true,
transparent: true,
solid: false,
shadow:false,
liquidBreakable:"drop",
grow: function(wx,wy,wz,dimension,world){
wy--
let i=wx, j=wy, k=wz
var ground = wy//this.chunk.tops[i * 16 + k]
var top = ground + floor(4.5 + (Math.random()*2.5) )
var rand = floor(Math.random()*4096)
let tree = blockIds.oakLog
let leaf = blockIds.oakLeaves
let groundBlock = blockIds.dirt
//Center
for (let j = ground + 1; j <= top; j++) {
world.setBlock(i, j, k, tree, false,false,false,false,dimension)
}
world.setBlock(i, top + 1, k, leaf, false,false,false,false,dimension)
world.setBlock(i, ground, k, groundBlock, false,false,false,false,dimension)
//Bottom leaves
for (let x = -2; x <= 2; x++) {
for (let z = -2; z <= 2; z++) {
if (x || z) {
if ((x * z & 7) === 4) {
place = rand & 1
rand >>>= 1
if (place) {
world.setBlock(wx + x, top - 2, wz + z, leaf, false,false,false,false,dimension)
}
} else {
world.setBlock(wx + x, top - 2, wz + z, leaf, false,false,false,false,dimension)
}
}
}
}
//2nd layer leaves
for (let x = -2; x <= 2; x++) {
for (let z = -2; z <= 2; z++) {
if (x || z) {
if ((x * z & 7) === 4) {
place = rand & 1
rand >>>= 1
if (place) {
world.setBlock(wx + x, top - 1, wz + z, leaf, false,false,false,false,dimension)
}
} else {
world.setBlock(wx + x, top - 1, wz + z, leaf, false,false,false,false,dimension)
}
}
}
}
//3rd layer leaves
for (let x = -1; x <= 1; x++) {
for (let z = -1; z <= 1; z++) {
if (x || z) {
if (x & z) {
place = rand & 1
rand >>>= 1
if (place) {
world.setBlock(wx + x, top, wz + z, leaf, false,false,false,false,dimension)
}
} else {
world.setBlock(wx + x, top, wz + z, leaf, false,false,false,false,dimension)
}
}
}
}
//Top leaves
world.setBlock(wx + 1, top + 1, wz, leaf, false,false,false,false,dimension)
world.setBlock(wx, top + 1, wz - 1, leaf, false,false,false,false,dimension)
world.setBlock(wx, top + 1, wz + 1, leaf, false,false,false,false,dimension)
world.setBlock(wx - 1, top + 1, wz, leaf, false,false,false,false,dimension)
},
compostChance:0.3,
category:"nature"
},
{ 
name: "crimsonTrapdoor",
Name:"Crimson Trapdoor",
transparent: true,
trapdoor: true,
woodSound: true,
category:"build"
},
{ 
name: "oakTrapdoor",
Name:"Oak Trapdoor",
transparent: true,
trapdoor: true,
woodSound: true,
category:"build"
},
{ 
name: "spruceTrapdoor",
Name:"Spruce Trapdoor",
transparent: true,
trapdoor: true,
woodSound: true,
category:"build"
},
{ 
name: "darkOakTrapdoor",
Name:"Dark Oak Trapdoor",
transparent: true,
trapdoor: true,
woodSound: true,
category:"build"
},
{ 
name: "birchTrapdoor",
Name:"Birck Trapdoor",
transparent: true,
trapdoor: true,
woodSound: true,
category:"build"
},
{ 
name: "jungleTrapdoor",
Name:"Jungle Trapdoor",
transparent: true,
trapdoor: true,
woodSound: true,
category:"build"
},
{ 
name: "acaciaTrapdoor",
Name:"Acaica Trapdoor",
transparent: true,
trapdoor: true,
woodSound: true,
category:"build"
},
{ 
name: "ironTrapdoor",
Name:"Iron Trapdoor",
transparent: true,
trapdoor: true,
stoneSound: true,
category:"build"
},
{ 
name: "cryingObsidian",
Name:"Obsidian: 😢",
shadow: false,
lightLevel: 10,
stoneSound:true,
type:"rock4",
breakTime:250,
blastResistance:1200,
pistonPush:false,
pistonPull:false,
drip:[106/255, 6/255, 187/255],
category:"nature",
randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{ name: "netherGoldOre",
Name:"Nether Gold Ore",
digSound: ["block.nether_ore.dig1", "block.nether_ore.dig2", "block.nether_ore.dig3", "block.nether_ore.dig4"],
stepSound: ["block.nether_ore.step1", "block.nether_ore.step2","block.nether_ore.step3","block.nether_ore.step4","block.nether_ore.step5"],
drop: "goldNugget",
dropAmount: [1,3],
category:"nature",
randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name: "flowerPot",
Name:"Flower Pot",
transparent: true,
shadow: false,
pot: true,
iconTexture:"flowerPotIcon",
flatIcon:true,
category:"decoration",
liquidBreakable:"drop"
},
{
name: "acaciaSapling",
Name:"Acacia Sapling",
transparent: true,
shadow: false,
solid: false,
crossShape: true,
potCross: true,
compostChance:0.3,
category:"nature",
liquidBreakable:"drop"
},
{
name: "birchSapling",
Name:"Birch Sapling",
transparent: true,
shadow: false,
solid: false,
crossShape: true,
potCross: true,
category:"nature",
liquidBreakable:"drop",
grow:function(wx,wy,wz,dimension,world){
wy--
let i=wx, j=wy, k=wz
var ground = wy//this.chunk.tops[i * 16 + k]
var top = ground + floor(4.5 + (Math.random()*2.5) )
var rand = floor(Math.random()*4096)
let tree = blockIds.birchLog
let leaf = blockIds.birchLeaves
let groundBlock = blockIds.dirt
//Center
for (let j = ground + 1; j <= top; j++) {
world.setBlock(i, j, k, tree, false,false,false,false,dimension)
}
world.setBlock(i, top + 1, k, leaf, false,false,false,false,dimension)
world.setBlock(i, ground, k, groundBlock, false,false,false,false,dimension)
//Bottom leaves
for (let x = -2; x <= 2; x++) {
for (let z = -2; z <= 2; z++) {
if (x || z) {
if ((x * z & 7) === 4) {
place = rand & 1
rand >>>= 1
if (place) {
world.setBlock(wx + x, top - 2, wz + z, leaf, false,false,false,false,dimension)
}
} else {
world.setBlock(wx + x, top - 2, wz + z, leaf, false,false,false,false,dimension)
}
}
}
}
//2nd layer leaves
for (let x = -2; x <= 2; x++) {
for (let z = -2; z <= 2; z++) {
if (x || z) {
if ((x * z & 7) === 4) {
place = rand & 1
rand >>>= 1
if (place) {
world.setBlock(wx + x, top - 1, wz + z, leaf, false,false,false,false,dimension)
}
} else {
world.setBlock(wx + x, top - 1, wz + z, leaf, false,false,false,false,dimension)
}
}
}
}
//3rd layer leaves
for (let x = -1; x <= 1; x++) {
for (let z = -1; z <= 1; z++) {
if (x || z) {
if (x & z) {
place = rand & 1
rand >>>= 1
if (place) {
world.setBlock(wx + x, top, wz + z, leaf, false,false,false,false,dimension)
}
} else {
world.setBlock(wx + x, top, wz + z, leaf, false,false,false,false,dimension)
}
}
}
}
//Top leaves
world.setBlock(wx + 1, top + 1, wz, leaf, false,false,false,false,dimension)
world.setBlock(wx, top + 1, wz - 1, leaf, false,false,false,false,dimension)
world.setBlock(wx, top + 1, wz + 1, leaf, false,false,false,false,dimension)
world.setBlock(wx - 1, top + 1, wz, leaf, false,false,false,false,dimension)
},
compostChance:0.3
},
{
name: "darkOakSapling",
Name:"Dark Oak Sapling",
transparent: true,
shadow: false,
solid: false,
crossShape: true,
potCross: true,
compostChance:0.3,
category:"nature",
liquidBreakable:"drop"
},
{
name: "jungleSapling",
Name:"Jungle Sapling",
transparent: true,
shadow: false,
solid: false,
crossShape: true,
potCross: true,
compostChance:0.3,
category:"nature",
liquidBreakable:"drop",
grow:function(wx,wy,wz,dimension,world){
wy--
let i=wx, j=wy, k=wz
let ground = wy
let rand = floor(Math.random()*4096)
let tall = floor(5 + Math.random()*5) //5 to 10
let top = ground + tall
let tree = blockIds.jungleLog
let leaf = blockIds.jungleLeaves
//Center
for (let j = ground + 1; j <= top; j++) {
world.setBlock(i, j, k, tree, false,false,false,false,dimension)
}
world.setBlock(i, top + 1, k, leaf, false,false,false,false,dimension)
world.setBlock(i, ground, k, blockIds.dirt, false,false,false,false,dimension)
//Bottom leaves
for (let x = -2; x <= 2; x++) {
for (let z = -2; z <= 2; z++) {
if (x || z) {
if ((x * z & 7) === 4) {
place = rand & 1
rand >>>= 1
if (place) {
world.setBlock(wx + x, top - 2, wz + z, leaf, false,false,false,false,dimension)
}
} else {
world.setBlock(wx + x, top - 2, wz + z, leaf, false,false,false,false,dimension)
}
}
}
}
//2nd layer leaves
for (let x = -2; x <= 2; x++) {
for (let z = -2; z <= 2; z++) {
if (x || z) {
if ((x * z & 7) === 4) {
place = rand & 1
rand >>>= 1
if (place) {
world.setBlock(wx + x, top - 1, wz + z, leaf, false,false,false,false,dimension)
}
} else {
world.setBlock(wx + x, top - 1, wz + z, leaf, false,false,false,false,dimension)
}
}
}
}
//3rd layer leaves
for (let x = -1; x <= 1; x++) {
for (let z = -1; z <= 1; z++) {
if (x || z) {
if (x & z) {
place = rand & 1
rand >>>= 1
if (place) {
world.setBlock(wx + x, top, wz + z, leaf, false,false,false,false,dimension)
}
} else {
world.setBlock(wx + x, top, wz + z, leaf, false,false,false,false,dimension)
}
}
}
}
//Top leaves
world.setBlock(wx + 1, top + 1, wz, leaf, false,false,false,false,dimension)
world.setBlock(wx, top + 1, wz - 1, leaf, false,false,false,false,dimension)
world.setBlock(wx, top + 1, wz + 1, leaf, false,false,false,false,dimension)
world.setBlock(wx - 1, top + 1, wz, leaf, false,false,false,false,dimension)
}
},
{
name: "spruceSapling",
Name:"Spruce Sapling",
transparent: true,
shadow: false,
solid: false,
crossShape: true,
potCross: true,
compostChance:0.3,
category:"nature",
liquidBreakable:"drop"
},
{
name: "blueOrchidPot",
transparent: true,
shadow: false,
solid: false,
potCross: true,
hidden:true,
drop:"blueOrchid",
liquidBreakable:"drop"
},
{
name: "warpedRootsPot",
transparent: true,
shadow: false,
solid: false,
potCross: true,
hidden:true,
drop:"warpedRoots",
liquidBreakable:"drop"
},
{
name: "crimsonRootsPot",
transparent: true,
shadow: false,
solid: false,
potCross: true,
hidden:true,
drop:"crimsonRoots",
liquidBreakable:"drop"
},
{ name: "whiteCarpet", Name: "White Carpet", textures: "whiteWool", category:"decoration",carpet: true, clothSound:true},
{ name: "orangeCarpet", Name: "Orange Carpet", textures: "orangeWool", category:"decoration",carpet: true, clothSound:true},
{ name: "magentaCarpet", Name: "Magenta Carpet", textures: "magentaWool", category:"decoration",carpet: true, clothSound:true},
{ name: "lightBlueCarpet", Name: "Light Blue Carpet", textures: "lightBlueWool", category:"decoration",carpet: true, clothSound:true},
{ name: "yellowCarpet", Name: "Yellow Carpet", textures: "yellowWool", category:"decoration",carpet: true, clothSound:true},
{ name: "limeCarpet", Name: "Lime Carpet", textures: "limeWool", category:"decoration",carpet: true, clothSound:true},
{ name: "pinkCarpet", Name: "Pink Carpet", textures: "pinkWool", category:"decoration",carpet: true, clothSound:true},
{ name: "grayCarpet", Name: "Gray Carpet", textures: "grayWool", category:"decoration",carpet: true, clothSound:true},
{ name: "lightGrayCarpet", Name: "Light Gray Carpet", textures: "lightGrayWool", category:"decoration",carpet: true, clothSound:true},
{ name: "cyanCarpet", Name: "Cyan Carpet", textures: "cyanWool", category:"decoration",carpet: true, clothSound:true},
{ name: "purpleCarpet", Name: "Purple Carpet", textures: "purpleWool", category:"decoration",carpet: true, clothSound:true},
{ name: "blueCarpet", Name: "Blue Carpet", textures: "blueWool", category:"decoration",carpet: true, clothSound:true},
{ name: "brownCarpet", Name: "Brown Carpet", textures: "brownWool", category:"decoration",carpet: true, clothSound:true},
{ name: "greenCarpet", Name: "Green Carpet", textures: "greenWool", category:"decoration",carpet: true, clothSound:true},
{ name: "redCarpet", Name: "Red Carpet", textures: "redWool", category:"decoration",carpet: true, clothSound:true},
{ name: "blackCarpet", Name: "Black Carpet", textures: "blackWool", category:"decoration",carpet: true, clothSound:true},
{ name: "polishedBlackstone", Name: "Polished Blackstone", category:"build",stoneSound:true},
{ name: "chiseledNetherBricks",
Name: "Chiseled Nether Bricks",
category:"build",
digSound: ["block.nether_bricks.dig1", "block.nether_bricks.dig2", "block.nether_bricks.dig3", "block.nether_bricks.dig4", "block.nether_bricks.dig5", "block.nether_bricks.dig6"],
stepSound: ["block.nether_bricks.step1", "block.nether_bricks.step2","block.nether_bricks.step3","block.nether_bricks.step4","block.nether_bricks.step5","block.nether_bricks.step6"]},
{ name: "crackedNetherBricks",
Name:"Cracked Nether Bricks",
category:"build",
digSound: ["block.nether_bricks.dig1", "block.nether_bricks.dig2", "block.nether_bricks.dig3", "block.nether_bricks.dig4", "block.nether_bricks.dig5", "block.nether_bricks.dig6"],
stepSound: ["block.nether_bricks.step1", "block.nether_bricks.step2","block.nether_bricks.step3","block.nether_bricks.step4","block.nether_bricks.step5","block.nether_bricks.step6"]},
{ name: "smoothBasalt", Name: "Smooth Basalt", basaltSound: true},
{
name: "oakLogSW",
textures: ["logSide","logSide","logTop","oakLogSW"],
rotate: true, woodSound:true, hidden:true
},
{
name: "acaciaLogSW",
textures: ["acaciaLogSide","acaciaLogSide","acaciaLogTop","acaciaLogSW"],
rotate: true, woodSound:true, hidden:true
},
{
name: "birchLogSW",
textures: ["birchLogSide","birchLogSide","birchLogTop","birchLogSW"],
rotate: true, woodSound:true, hidden:true
},
{
name: "darkOakLogSW",
textures: ["darkOakLogSide","darkOakLogSide","darkOakLogTop","darkOakLogSW"],
rotate: true, woodSound:true, hidden:true
},
{
name: "jungleLogSW",
textures: ["jungleLogSide","jungleLogSide","jungleLogTop","jungleLogSW"],
rotate: true, woodSound:true, hidden:true
},
{
name: "spruceLogSW",
textures: ["spruceLogSide","spruceLogSide","spruceLogTop","spruceLogSW"],
rotate: true, woodSound:true, hidden:true
},
{
name: "crimsonStemSW",
textures: ["crimsonStemSide","crimsonStemSide","crimsonStemTop","crimsonStemSW"],
rotate: true, stemSound:true, hidden:true
},
{
name: "warpedStemSW",
textures: ["warpedStemSide","warpedStemSide","warpedStemTop","warpedStemSW"],
rotate: true, stemSound:true, hidden:true
},
{
name: "basaltSW",
textures: ["basaltSide","basaltSide","basaltTop","basaltSideSW"],
rotate: true, basaltSound:true, hidden:true
},
{
name: "polishedBasaltSW",
textures: ["polishedBasaltSide","polishedBasaltSide","polishedBasaltTop","polishedBasaltSideSW"],
rotate: true, basaltSound: true, hidden:true
},
{ name:"crimsonPlanks", Name: "Crimson Planks", woodSound:true, breakTime:3, type:"wood",category:"build" },
{
name:"deadBush",
Name:"Dead Bush",
solid: false,
transparent: true,
shadow: false,
potCross: true,
crossShape: true,
drop: "stick",
dropAmount: [0,2],
dropSelfWhenSheared:true,
shearDropAmount:1,
liquidBreakable:"drop",
category:"nature",
},
{ name:"stick", Name:"Stick", category:"items",item:true },
{ name:"coal", Name:"Coal", category:"items",item:true },
{ name:"ironIngot", Name:"Iron Ingot", category:"items",item:true },
{ name:"copperIngot", Name:"Copper Ingot", category:"items",item:true },
{ name:"goldIngot", Name:"Gold Ingot", category:"items",item:true },
{ name:"diamond", Name:"Diamond", category:"items",item:true },
{ name:"lapisLazuli", Name:"Lapis Lazuli", category:"items",item:true },
{ name:"emerald", Name:"Emerald", category:"items",item:true },
{ name:"copperOre", Name:"Copper Ore", breakTime:15, drop:"rawCopper", dropAmount:[2,5], type:"rock2",category:"nature", stoneSound:true },
{ name:"rawIron", Name:"Raw Iron", category:"items",item:true },
{ name:"rawCopper", Name:"Raw Copper", category:"items",item:true },
{ name:"rawGold", Name:"Raw Gold", category:"items",item:true },
{
name: "netherWart",
Name:"Nether Wart",
transparent: true,
shadow: false,
solid: false,
crop: true,
flatIcon:true,
iconTexture:"netherWartIcon",
compostChance:0.65,
category:"nature",
},
{
name: "wheat",
Name:"Wheat",
transparent: true,
shadow: false,
solid: false,
crop: true,
flatIcon:true,
iconTexture:"wheatIcon",
fullDrop:["wheat","wheatSeeds"],
drop:"wheatSeeds",
liquidBreakable:"drop",
textures:new Array(6).fill('wheatStage0'),
textures1:new Array(6).fill('wheatStage1'),
textures2:new Array(6).fill('wheatStage2'),
textures3:new Array(6).fill('wheatStage3'),
textures4:new Array(6).fill('wheatStage4'),
textures5:new Array(6).fill('wheatStage5'),
textures6:new Array(6).fill('wheatStage6'),
textures7:new Array(6).fill('wheat'),
compostChance:0.65,
category:"nature",
},
{
name: "lodestone",
Name:"Lodestone",
textures: ["lodestoneTop", "lodestoneSide"]
},
{
name: "anvil",
Name:"Anvil",
transparent: true,
anvil: true,
digSound: "block.anvil.land",
stepSound: ["block.stone.step1", "block.stone.step2","block.stone.step3","block.stone.step4","block.stone.step5","block.stone.step6"],
onclientclick:function(x,y,z,dimension){
changeScene("anvil")
releasePointer()
},
onupdate: function(x,y,z,b,world,sx,sy,sz,dimension){
fall(x,y,z,b,world,false,dimension)
},
ongetexploded:function(x,y,z,b,world,dimension){
fall(x,y,z,b,world,true,dimension)
},
category:"items",
},
{
name: "slimeBlock",
Name:"Slime Block",
transparent: true,
shadow: false,
bounciness: 0.9,
speedFactor: 0.5,
shapeName:"slimeBlock",
category:"build",
sticky:true
},
{ 
name:"soulSoil",
Name:"Soul Soil",
speedFactor: 0.5,
canHaveSoulFire: true,
category:"nature",
},
{ name:"blueIce", Name:"Blue Ice", category:"nature",slide:0.9, glassSound: true, temperature:3},
{ name:"ice", Name:"Ice", category:"nature",transparent:true, shadow:false, slide:0.9, glassSound: true, temperature:3, semiTrans: true},
{ name:"packedIce", Name:"Packed Ice", category:"nature",slide:0.9, glassSound: true, temperature:3},
{ name:"calcite", Name:"Calcite", category:"nature" },
{
name:"furnace",
Name:"Furnace",
textures: ["furnaceTop","furnaceTop","furnaceSide","furnaceFront","furnaceSide","furnaceSide"],
rotate: true,
tagBits: null,
setContents: function(x,y,z,dimension,world){
var data = {furnace:true, input:0, fuel:0, output:0, smeltStart:0, burnStart:0, canBurn:false, smelting:false, xp:0}
world.setTags(x, y, z, data,false,dimension)
return data
},
onclientclick: (x,y,z,dimension) => {
containerData.x = x
containerData.y = y
containerData.z = z
containerData.dimension = dimension
changeScene("furnace")
releasePointer()
},
stoneSound:true,
category:"items",
},
{
name:"blastFurnace",
Name:"Blast Furnace",
textures: ["blastFurnaceTop","blastFurnaceTop","blastFurnaceSide","blastFurnaceFront","blastFurnaceSide","blastFurnaceSide"],
rotate: true,
category:"items",
},
{
name:"smoker",
Name:"Smoker",
textures: ["smokerBottom","smokerTop","smokerSide","smokerFront","smokerSide","smokerSide"],
rotate: true,
category:"items",
},
{
name:"noteBlock",
Name:"Note Block",
tagBits:{
on:[0,1],
note:[1,5]
},
onclick:function(x,y,z,dimension,world){
var note = world.getTagByName(x,y,z,"note",dimension)
if(!note && note !== 0) note = -1
note ++
if(note >= 24) note = 0
world.setTagByName(x,y,z,"note",note,false,dimension)
blockData[blockIds.noteBlock].playNote(x,y,z,dimension,world)
},
onpowerupdate:function(x,y,z,sx,sy,sz,blockPowerChanged,dimension,world){
var power = world.getRedstonePower(x,y,z,dimension) || world.getSurroundingBlockPower(x,y,z,dimension) ? true : false
var on = world.getTagByName(x,y,z,"on",dimension) || false
if(power !== on) {
world.setTagByName(x,y,z,"on",power,false,dimension)
if(power){
this.playNote(x,y,z,dimension,world)
}
}
},
playNote:function(x,y,z,dimension,world){
var note = world.getTagByName(x,y,z,"note",dimension) || 0
if(!note && note !== 0) return
var pitch = 2**((note-12)/12)
var instrument = "harp"
var block = world.getBlock(x,y-1,z,dimension)
if(block && this.noteTypes[blockData[block].name]) instrument = this.noteTypes[blockData[block].name]
if(block){
for(var i in this.noteTypes){
if(i.startsWith("type:") && i.replace("type:","") === blockData[block].type){
instrument = this.noteTypes[i]
}
}
}
world.playSound(x,y,z, "note."+instrument, 1, pitch)
world.sendAll({
type:"particles", particleType:"NoteParticle",
x,y:y+0.5,z, dimension, data:note
})
},
noteTypes:(function(obj){
var obj2 = {}
for(var i in obj){
if(typeof obj[i] === "string"){
obj2[obj[i]] = i
}else{
for(var i2 of obj[i]){
obj2[i2] = i
}
}
}
return obj2
})({
bass:"type:wood",
snare:["sand","gravel"],
hat:["glass","seaLantern","beacon"],
bd: ['type:rock1', 'type:rock2', 'type:rock3'],
bell: "goldBlock",
flute: ["clay", "honeycombBlock"],
icechime: ["packedIce"],
guitar: "type:wool",
xylobone: ["boneBlock","boneBlockSW"],
iron_xylophone: ["ironBlock"],
cow_bell: "soulSand",
didgeridoo: "pumpkin",
bit: "emeraldBlock",
banjo: ["hayBlock", "hayBlockSW"],
pling: "glowstone"
}),
category:"redstone",
},
{
name:"jukebox",
Name:"Jukebox",
textures: ["jukeboxTop","jukeboxSide"],
category:"items"
},
{
name:"loom",
Name:"Loom",
textures: ["loomBottom","loomTop","loomFront","loomSide","loomSide","loomSide"],
rotate: true,
category:"items"
},
{
name:"sandstone",
Name:"Sandstone",
textures: ["sandstoneBottom", "sandstoneTop", "sandstone"],
category:"nature",
randomRotate:true,randomRotateTop:true,randomRotateBottom:true
},
{ name:"chiseledSandstone",
Name:"Chiseled Sandstone",
textures: ["sandstoneBottom", "sandstoneTop","chiseledSandstone"],
category:"build",
randomRotate:true,randomRotateTop:true,randomRotateBottom:true
},
{ name:"cutSandstone",
Name:"Cut Sandstone",
textures: ["sandstoneBottom", "sandstoneTop","cutSandstone"],
category:"build",
randomRotate:true,randomRotateTop:true,randomRotateBottom:true
},
{ name:"smoothSandstone", Name:"Smooth Sandstone", textures:"sandstoneTop", category:"nature",randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true },
{
name: "DoubleTallGrass",
Name:"Tall Grass",
solid: false,
transparent: true,
shadow: false,
textures: "tallGrassTop",
tallcrossShape: true,
drop:function(){
var r = rand()
if(r > 0.9){
return "tomatoSeeds"
}else if(r > 0.5){
return "wheatSeeds"
}
},
shade:false,
compostChance:0.3,
liquidBreakable:"drop",
category:"nature",
randomHeight:true
},
{
name:"apple",
Name:"Apple",
item:true,
edible: true,
eatWhenFull: false,
food: 4,
saturation: 2.4,
eatResult: "appleCore",
compostChance:0.65,
category:"food",
},
{
name:"woodenPickaxe",
Name:"Wooden Pickaxe",
item: true,
pickaxe: true,
mineSpeed: 2,
durability: 59,
attackDamage: 2,
category:"tools",
},
{
name:"stonePickaxe",
Name:"Stone Pickaxe",
item: true,
pickaxe: true,
mineSpeed: 4,
durability: 131,
attackDamage: 2,
material:"cobblestone",
category:"tools",
},
{
name:"ironPickaxe",
Name:"Iron Pickaxe",
item: true,
pickaxe: true,
mineSpeed: 6,
durability: 250,
attackDamage: 3,
material:"ironIngot",
category:"tools",
},
{
name:"goldenPickaxe",
Name:"Golden Pickaxe",
item: true,
pickaxe: true,
mineSpeed: 12,
durability: 32,
attackDamage: 4,
material:"goldIngot",
category:"tools",
},
{
name:"diamondPickaxe",
Name:"Diamond Pickaxe",
item: true,
pickaxe: true,
mineSpeed: 8,
durability: 1561,
attackDamage: 5,
material:"diamond",
category:"tools",
},
{ name:"flint", Name:"Flint", item:true, category:"items" },
{
name:"mossBlock",
Name: "Moss Block",
breakTime:0.15,
type: "plant2",
compostChance:0.65,
category:"nature"
},
{
name:"mossCarpet",
Name: "Moss Carpet",
textures: "mossBlock",
breakTime:0.15,
carpet: true,
compostChance:0.3,
liquidBreakable:"drop",
category:"nature"
},
{
name: "caveVines",
Name:"Cave Vines",
solid: false,
transparent: true,
shadow: false,
crossShape: true,
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
var top = world.getBlock(x,y-1,z,dimension)
var isIt = blockData[top].name === "caveVines" || blockData[top].name === "caveVinesPlant" || blockData[top].name === "caveVinesLit" || blockData[top].name === "caveVinesPlantLit"
if(isIt){
world.setBlock(x,y,z,blockIds.caveVinesPlant | CROSS,false,false,false,false,dimension)
}
},
liquidBreakable:"drop",
category:"nature"
},
{
name: "caveVinesPlant",
solid: false,
transparent: true,
shadow: false,
crossShape: true,
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
var top = world.getBlock(x,y-1,z,dimension)
var isIt = blockData[top].name === "caveVines" || blockData[top].name === "caveVinesPlant" || blockData[top].name === "caveVinesLit" || blockData[top].name === "caveVinesPlantLit"
if(!isIt){
world.setBlock(x,y,z,blockIds.caveVines | CROSS,false,false,false,false,dimension)
}
},
hidden:true,
drop:"caveVines",
liquidBreakable:"drop"
},
{
name: "caveVinesLit",
Name: "Cave Vines With Glow Berries",
solid: false,
transparent: true,
shadow: false,
crossShape: true,
lightLevel: 14,
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
var top = world.getBlock(x,y-1,z,dimension)
var isIt = blockData[top].name === "caveVines" || blockData[top].name === "caveVinesPlant" || blockData[top].name === "caveVinesLit" || blockData[top].name === "caveVinesPlantLit"
if(isIt){
world.setBlock(x,y,z,blockIds.caveVinesPlantLit | CROSS,false,false,false,false,dimension)
}
},
liquidBreakable:"drop",
category:"nature"
},
{
name: "caveVinesPlantLit",
solid: false,
transparent: true,
shadow: false,
crossShape: true,
lightLevel: 14,
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
var top = world.getBlock(x,y-1,z,dimension)
var isIt = blockData[top].name === "caveVines" || blockData[top].name === "caveVinesPlant" || blockData[top].name === "caveVinesLit" || blockData[top].name === "caveVinesPlantLit"
if(!isIt){
world.setBlock(x,y,z,blockIds.caveVinesLit | CROSS,false,false,false,false,dimension)
}
},
hidden:true,
liquidBreakable:"drop"
},
{
name:"sporeBlossom",
Name:"Spore Blossom",
sporeBlossom: true,
shadow:false,
transparent: true,
compostChance:0.65,
category:"nature"
},
{
name: "rootedDirt",
Name: "Rooted Dirt",
category:"nature",
randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name: "hangingRoots",
Name: "Hanging Roots",
solid: false,
transparent: true,
shadow: false,
crossShape: true,
compostChance:0.3,
liquidBreakable:"drop",
category:"nature"
},
{
name:"azalea",
Name:"Azalea",
textures: ["azaleaTop", "azaleaSide"],
potTex:["pottedAzaleaBushTop","pottedAzaleaBushSide"],
azalea: true,
transparent: true,
potCross:true,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature"
},
{
name:"floweringAzalea",
Name:"Flowering Azalea",
textures: ["floweringAzaleaTop","floweringAzaleaSide"],
potTex:["pottedFloweringAzaleaBushTop","pottedFloweringAzaleaBushSide"],
azalea: true,
transparent: true,
potCross:true,
compostChance:0.85,
liquidBreakable:"drop",
category:"nature",
lightLevel:10//make lush caves brighter
},
{
name:"sunflower",
Name:"Sunflower",
textures:["sunflowerBack","sunflowerFront","sunflowerTop"],
sunflower: true,
transparent:true,
shadow:false,
iconTexture: "sunflowerFront",
solid:false,
category:"nature"
},
{
name: "bucket",
Name:"Bucket",
item: true,
onuse: (x,y,z, block, replaceItem,useDurability,minusOne,dimension) => {
if(block === blockIds.Water){
replaceItem(blockIds.waterBucket)
world.setBlock(x,y,z,0,false,false,false,false,dimension)
}
if(block === blockIds.Lava){
replaceItem(blockIds.lavaBucket)
world.setBlock(x,y,z,0,false,false,false,false,dimension)
}
if(block === blockIds.powderSnow){
replaceItem(blockIds.powderSnowBucket)
world.setBlock(x,y,z,0,false,false,false,false,dimension)
}
if(block === blockIds.oil){
replaceItem(blockIds.oilBucket)
world.setBlock(x,y,z,0,false,false,false,false,dimension)
}
},
onentityuse: (ent,replaceItem,useDurability,minusOne) => {
if(ent.type === "Cow"){
replaceItem(blockIds.milkBucket)
}else return true
},
stackSize: 1,
allHitbox: true,
category:"items"
},
{
name: "waterBucket",
Name:"Water Bucket",
item: true,
onuse: (x,y,z, block, replaceItem,useDurability,minusOne,dimension) => {
if(survival)replaceItem(blockIds.bucket)
var pos = getPosition()
world.setBlock(pos[0],pos[1],pos[2],blockIds.Water,false,false,false,false,dimension)
},
stackSize: 1,
category:"items"
},
{
name: "lavaBucket",
Name:"Lava Bucket",
item: true,
onuse: (x,y,z, block, replaceItem,useDurability,minusOne,dimension) => {
if(survival)replaceItem(blockIds.bucket)
var pos = getPosition()
world.setBlock(pos[0],pos[1],pos[2],blockIds.Lava,false,false,false,false,dimension)
},
stackSize: 1,
category:"items"
},
{
name: "spawnCow",
item: true,
onuse: (x,y,z, block, replaceItem,useDurability,minusOne,dimension,holding) => {
var pos = getPosition()
let ent = new entities[entityIds.Cow](pos[0],pos[1],pos[2])
if(holding.customName) ent.name = holding.customName
world.addEntity(ent,false,dimension)
},
spawnMob: function(x,y,z,dimension,world){
world.addEntity(new entities[entityIds.Cow](x,y,z),false,dimension)
},
minusOnUse:true,
category:"items"
},
{
name:"sugarCane",
Name:"Sugar Cane",
iconTexture: "sugarCaneIcon",
flatIcon: true,
solid: false,
transparent: true,
shadow: false,
compostChance:0.5,
category:"nature",
shade:false,
smoothLight:false,
},
{
name:"woodenSword",
Name:"Wooden Swords aren't even sharp!",
item: true,
sword: true,
durability: 59,
attackDamage: 4,
category:"tools"
},
{
name:"stoneSword",
Name:"Stone Sword",
item: true,
sword: true,
durability: 131,
attackDamage: 5,
material:"cobblestone",
category:"tools"
},
{
name:"ironSword",
Name:"Iron Sword",
item: true,
sword: true,
durability: 250,
attackDamage: 6,
material:"ironIngot",
category:"tools"
},
{
name:"goldenSword",
Name:"Golden Sword",
item: true,
sword: true,
durability: 32,
attackDamage: 4,
material:"goldIngot",
category:"tools"
},
{
name:"diamondSword",
Name:"Diamond Sword",
item: true,
sword: true,
durability: 1561,
attackDamage: 7,
material:"diamond",
category:"tools"
},
{ name:"azaleaLeaves",
Name:"Azalea Leaves",
transparent: true,
cullFace:"never",
breakTime: 0,
type:"plant2",
drop: function(){
if(rand() > 0.05){
let r = floor(rand(2))
if(r === 0) return "azalea"
else return "floweringAzalea"
}
},
burnChance: 0.2,
burnTime: 30,
compostChance:0.3,
category:"nature",
grassSound: true
},
{ name:"floweringAzaleaLeaves",
Name:"Flowering Azalea Leaves",
transparent: true,
cullFace:"never",
breakTime: 0,
type:"plant2",
drop: function(){
if(rand() > 0.05){
let r = floor(rand(2))
if(r === 0) return "azalea"
else return "floweringAzalea"
}
},
burnChance: 0.2,
burnTime: 30,
compostChance:0.5,
category:"nature",
grassSound: true
},
{
name: "spawnPig",
item: true,
onuse: (x,y,z, block, replaceItem,useDurability,minusOne,dimension,holding) => {
var pos = getPosition()
let ent = new entities[entityIds.Pig](pos[0],pos[1],pos[2])
if(holding.customName) ent.name = holding.customName
world.addEntity(ent,false,dimension)
},
spawnMob: function(x,y,z,dimension,world){
world.addEntity(new entities[entityIds.Pig](x,y,z),false,dimension)
},
minusOnUse:true,
category:"items"
},
{name:"tuff",Name:"Tuff",category:"nature",breakTime:1.5},
{name:"deepslate", Name:"Deepslate", textures:["deepslateTop","deepslate"],category:"nature",breakTime:3,deepslateSound:true, randomRotate:"flip",randomRotateTop:true,randomRotateBottom:true},
{name:"cobbledDeepslate", Name:"Cobbled Deepslate",deepslateSound:true,category:"nature", randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true},
{name:"chiseledDeepslate", Name:"Chiseled Deepslate",category:"build",breakTime:3.5,deepslateSound:true},
{name:"polishedDeepslate",Name:"Polished Deepslate",category:"build",breakTime:3.5,deepslateSound:true},
{name:"deepslateTiles",Name:"Deepslate Tiles",category:"build",breakTime:3.5,deepslateSound:true},
{name:"deepslateBricks",Name:"Deepslate Bricks",category:"build",breakTime:3.5,deepslateBricksSound:true},
{name:"crackedDeepslateTiles",Name:"Cracked Deepslate Tiles",category:"build",deepslateSound:true},
{name:"crackedDeepslateBricks",Name:"Cracked Deepslate Bricks",category:"build",deepslateBricksSound:true},
{name:"deepslateCoalOre",Name:"Deepslate Coal Ore",category:"nature",breakTime:22.5,deepslateSound:true},
{name:"deepslateIronOre",Name:"Deepslate Iron Ore",category:"nature",breakTime:22.5,deepslateSound:true},
{name:"deepslateCopperOre",Name:"Deepslate Copper Ore",category:"nature",breakTime:22.5,deepslateSound:true},
{name:"deepslateGoldOre",Name:"Deepslate Gold Ore",category:"nature",breakTime:22.5,deepslateSound:true},
{name:"deepslateDiamondOre",Name:"Deepslate Diamond Ore",category:"nature",breakTime:22.5,deepslateSound:true},
{name:"deepslateRedstoneOre",Name:"Deepslate Redstone Ore",category:"nature",breakTime:22.5,deepslateSound:true},
{name:"deepslateEmeraldOre",Name:"Deepslate Emerald Ore",category:"nature",breakTime:22.5,deepslateSound:true},
{name:"deepslateLapisOre",Name:"Deepslate Lapis Lazuli Ore",category:"nature",breakTime:22.5,deepslateSound:true},
{name:"amethystBlock",Name:"Amethyst Block", category:"nature",amethystSound: true},
{name:"amethystShard",Name:"Amythest Shard",category:"items",item:true},
{name:"buddingAmethyst",Name:"Budding Amethyst", category:"nature",amethystSound: true},
{name:"smallAmethystBud",Name:"Small Amethyst Bud",category:"nature",sideCross:true,
solid: false,
transparent: true,
shadow: false,
amethystClusterSound: true,
lightLevel:1
},
{name:"mediumAmethystBud",Name:"Medium Amethyst Bud",category:"nature",sideCross:true,
solid: false,
transparent: true,
shadow: false,
amethystClusterSound: true,
lightLevel:2
},
{name:"largeAmethystBud",Name:"Large Amethyst Bud",category:"nature",sideCross:true,
solid: false,
transparent: true,
shadow: false,
amethystClusterSound: true,
lightLevel:4
},
{name:"amethystCluster",Name:"Amethyst Cluster",category:"nature",sideCross:true,
solid: false,
transparent: true,
shadow: false,
amethystClusterSound: true,
drop: "amethystShard",
lightLevel:5
},
{
name:"snowBlock",
Name:"Block of Snow",
textures:"snow",
breakTime: 1,
drop:"snowball",
dropAmount: 4,
temperature:5,
category:"nature",
randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name:"snow",
Name:"Snow Layer",
layers: true,
transparent:true,
drop:"snowball",
breakTime: 0.5,
fallingDust:[248/255, 253/255, 253/255],
onupdate: function(x,y,z,b,world,sx,sy,sz,dimension){
fall(x,y,z,b,world,false,dimension)
},
ongetexploded:function(x,y,z,b,world,dimension){
fall(x,y,z,b,world,true,dimension)
},
temperature:5,
liquidBreakable:"drop",
category:"nature",
randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name:"powderSnow",
Name:"Powder Snow",
solid:false,
powder: true,
breakTime: 0.4,
drop:"air",
transparent:true,
temperature:5,
category:"nature",
},
{
name:"snowball",
Name:"Snowball",
item: true,
onuse:function(x,y,z,b,replaceItem,useDurability,minusOne,dimension){
var pd = p.direction
world.addEntity(new entities[entityIds.Snowball](p.x+pd.x,p.y+pd.y,p.z+pd.z, pd.x*0.8, pd.y*0.8, pd.z*0.8),false,dimension)
},
minusOnUse:true,
useAnywhere:true,
category:"items",
},
{
name:"powderSnowBucket",
Name:"Powder Snow Bucket",
item:true,
onuse: (x,y,z, block, replaceItem,useDurability,minusOne,dimension) => {
if(survival)replaceItem(blockIds.bucket)
var pos = getPosition()
world.setBlock(pos[0],pos[1],pos[2],blockIds.powderSnow,false,false,false,false,dimension)
},
stackSize: 1,
category:"items",
},
{
name:"bread",
Name:"Bread",
edible: true,
item:true,
eatWhenFull: false,
food: 6,
saturation: 11,
compostChance:0.85,
category:"food",
},
{
name:"boneBlock",
Name:"Bone Block",
textures:["boneBlockTop","boneBlockSide"],
category:"nature",
},
{
name:"farmland",
Name:"Farmland",
textures:["dirt","farmland","dirt"],
_1PixLower: true,
category:"nature",
tick:function(block,x,y,z,dimension,world){
var target = this.id
for(var X=x-4;X<=x+4;X++){
for(var Z=z-4;Z<=z+4;Z++){
var b = world.getBlock(X,y,Z,dimension), a = world.getBlock(X,y+1,Z,dimension)
if(b && blockData[b].name === "Water" || a && blockData[a].name === "Water") target = this.id|SLAB
}
}
if(block !== target) world.setBlock(x,y,z,target,false,false,false,false,dimension)
}
},
{
name:"glowBerries",
Name:"Glow Berries",
edible: true,
item:true,
eatWhenFull: false,
food: 2,
saturation: 0.4,
compostChance:0.3,
category:"food",
},
{
name:"hayBlock",
Name:"Hay Bale",
textures:["hayBlockTop","hayBlockSide"],
type:"plant2",
damageResistance:0.8,
burnChance: 0.2,
burnTime: 20,
category:"decoration",
},
{
name:"hayBlockSW",
textures: ["hayBlockSide","hayBlockSide","hayBlockTop","hayBlockSW"],
rotate: true,
type:"plant2",
damageResistance:0.8,
compostChance:0.85,
hidden:true
},
{
name:"woodenShovel",
Name:"Wooden Shovel",
item: true,
shovel: true,
durability: 59,
mineSpeed:2,
attackDamage: 2,
category:"tools"
},
{
name:"stoneShovel",
Name:"Stone Shovel",
item: true,
shovel: true,
durability: 131,
mineSpeed:3.6,
attackDamage: 4,
material:"cobblestone",
category:"tools"
},
{
name:"ironShovel",
Name:"Iron Shovel",
item: true,
shovel: true,
durability: 250,
mineSpeed:6,
attackDamage: 4,
material:"ironIngot",
category:"tools"
},
{
name:"goldenShovel",
Name:"Golden Shovel",
item: true,
shovel: true,
durability: 32,
mineSpeed:12,
attackDamage: 2,
material:"goldIngot",
category:"tools"
},
{
name:"diamondShovel",
Name:"Diamond Shovel",
item: true,
shovel: true,
durability: 1561,
mineSpeed:8,
attackDamage: 5,
material:"diamond",
category:"tools"
},
{
name:"woodenAxe",
Name:"Wooden Axe",
item: true,
axe: true,
durability: 59,
mineSpeed:2,
attackDamage: 7,
attackSpeed:0.8,
category:"tools"
},
{
name:"stoneAxe",
Name:"Stone Axe",
item: true,
axe: true,
durability: 131,
mineSpeed:4,
attackDamage: 9,
attackSpeed:0.8,
material:"cobblestone",
category:"tools"
},
{
name:"ironAxe",
Name:"Iron Axe",
item: true,
axe: true,
durability: 250,
mineSpeed:6,
attackDamage: 9,
attackSpeed:0.9,
material:"ironIngot",
category:"tools"
},
{
name:"goldenAxe",
Name:"Golden Axe",
item: true,
axe: true,
durability: 32,
mineSpeed:12,
attackDamage: 7,
attackSpeed:1,
material:"goldIngot",
category:"tools"
},
{
name:"diamondAxe",
Name:"Diamond Axe",
item: true,
axe: true,
durability: 1561,
mineSpeed:8,
attackDamage: 9,
attackSpeed:1,
material:"diamond",
category:"tools"
},
{
name: "strippedOakLog",
Name: "Stripped Oak Log",
textures: ["strippedOakLogTop", "strippedOakLog"],
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"build",
log:true
},
{
name: "strippedOakLogSW",
textures: ["strippedOakLog", "strippedOakLog", "strippedOakLogTop","strippedOakLogSW"],
woodSound:true,
rotate:true,
hidden:true
},
{
name: "strippedBirchLog",
Name: "Stripped Birch Log",
textures: ["strippedBirchLogTop", "strippedBirchLog"],
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"build",
log:true
},
{
name: "strippedBirchLogSW",
textures: ["strippedBirchLog", "strippedBirchLog", "strippedBirchLogTop","strippedBirchLogSW"],
woodSound:true,
rotate:true,
hidden:true
},
{
name: "strippedAcaciaLog",
Name: "Stripped Acacia Log",
textures: ["strippedAcaciaLogTop", "strippedAcaciaLog"],
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"build",
log:true
},
{
name: "strippedAcaciaLogSW",
textures: ["strippedAcaciaLog", "strippedAcaciaLog", "strippedAcaciaLogTop","strippedAcaciaLogSW"],
woodSound:true,
rotate:true,
hidden:true
},
{
name: "strippedJungleLog",
Name: "Stripped Jungle Log",
textures: ["strippedJungleLogTop", "strippedJungleLog"],
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"build",
log:true
},
{
name: "strippedJungleLogSW",
textures: ["strippedJungleLog", "strippedJungleLog", "strippedJungleLogTop","strippedJungleLogSW"],
woodSound:true,
rotate:true,
hidden:true
},
{
name: "strippedSpruceLog",
Name: "Stripped Spruce Log",
textures: ["strippedSpruceLogTop", "strippedSpruceLog"],
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"build",
log:true
},
{
name: "strippedSpruceLogSW",
textures: ["strippedSpruceLog", "strippedSpruceLog", "strippedSpruceLogTop","strippedSpruceLogSW"],
woodSound:true,
rotate:true,
hidden:true
},
{
name: "strippedDarkOakLog",
Name: "Stripped Dark Oak Log",
textures: ["strippedDarkOakLogTop", "strippedDarkOakLog"],
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"build",
log:true
},
{
name: "strippedDarkOakLogSW",
textures: ["strippedDarkOakLog", "strippedDarkOakLog", "strippedDarkOakLogTop","strippedDarkOakLogSW"],
woodSound:true,
rotate:true,
hidden:true
},
{
name:"boneBlockSW",
textures:["boneBlockSide","boneBlockSide","boneBlockTop","boneBlockSW"],
rotate:true,
hidden:true
},
{
name:"redMushroom",
Name:"Red Mushroom",
solid: false,
transparent: true,
shadow: false,
potCross: true,
crossShape: true,
lightLevel:1,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature"
},
{
name:"brownMushroom",
Name:"Brown Mushroom",
solid: false,
transparent: true,
shadow: false,
potCross: true,
crossShape: true,
lightLevel:1,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature"
},
{
name:"mushroomStem",
Name: "Mushroom Stem",
mushroomBlock:true,
compostChance:0.65,
category:"nature"
},
{
name:"redMushroomBlock",
Name: "Red Mushroom Block",
mushroomBlock:true,
compostChance:0.85,
category:"nature"
},
{
name:"brownMushroomBlock",
Name: "Brown Mushroom Block",
mushroomBlock:true,
compostChance:0.85,
category:"nature"
},
{
name:"mycelium",
Name:"Mycelium",
textures:["dirt","myceliumTop","myceliumSide"],
type:"ground",
category:"nature",
randomRotate:true,randomRotateTop:true,randomRotateBottom:true
},
{
name:"terracotta",
Name:"Terracotta",
category:"build"
},
{
name:"redTerracotta",
Name:"Terracotta with watermelon juice",
category:"build"
},
{
name:"blueTerracotta",
Name:"Terracotta with blueberry juice",
category:"build"
},
{
name:"cyanTerracotta",
Name:"Terracotta with cyan colored fruit punch",
category:"build"
},
{
name:"grayTerracotta",
Name:"Dusty Terracotta",
category:"build"
},
{
name:"limeTerracotta",
Name:"Terracotta with leaf juice",
category:"build"
},
{
name:"pinkTerracotta",
Name:"Terracotta with fruit punch",
category:"build"
},
{
name:"blackTerracotta",
Name:"Terracotta painted black",
category:"build"
},
{
name:"brownTerracotta",
Name:"Dirty Terracotta",
category:"build"
},
{
name:"greenTerracotta",
Name:"Terracotta with some other leaf juice",
category:"build"
},
{
name:"whiteTerracotta",
Name:"Terracotta with flour",
category:"build"
},
{
name:"orangeTerracotta",
Name:"Orange Terracotta",
category:"build"
},
{
name:"purpleTerracotta",
Name:"Purple Terracotta",
category:"build"
},
{
name:"yellowTerracotta",
Name:"Terracotta with lemon juice",
category:"build"
},
{
name:"magentaTerracotta",
Name:"Magenta Terracotta",
category:"build"
},
{
name:"lightBlueTerracotta",
Name:"Light Blue Terracotta",
category:"build"
},
{
name:"lightGrayTerracotta",
Name:"Light Gray Terracotta",
category:"build"
},
{
name:"redGlazedTerracotta",
Name:"Watermelon Swirl",
category:"build",
pistonPush:false,
pistonPull:false,
randomRotate:"pattern",randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name:"blueGlazedTerracotta",
Name:"Blue Fan",
category:"build",
pistonPush:false,
pistonPull:false,
randomRotate:"pattern",randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name:"cyanGlazedTerracotta",
Name:"Creeper in the skies",
category:"build",
pistonPush:false,
pistonPull:false,
randomRotate:"pattern",randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name:"grayGlazedTerracotta",
Name:"Bunch of Dust",
category:"build",
pistonPush:false,
pistonPull:false,
randomRotate:"pattern",randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name:"limeGlazedTerracotta",
Name:"Overlapping lilies",
category:"build",
pistonPush:false,
pistonPull:false,
randomRotate:"pattern",randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name:"pinkGlazedTerracotta",
Name:"Pink turtle shell",
category:"build",
pistonPush:false,
pistonPull:false,
randomRotate:"pattern",randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name:"blackGlazedTerracotta",
Name:"Red monster",
category:"build",
pistonPush:false,
pistonPull:false,
randomRotate:"pattern",randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name:"brownGlazedTerracotta",
Name:"Mudslide in the ocean",
category:"build",
pistonPush:false,
pistonPull:false,
randomRotate:"pattern",randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name:"greenGlazedTerracotta",
Name:"Camouflaged monster",
category:"build",
pistonPush:false,
pistonPull:false,
randomRotate:"pattern",randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name:"whiteGlazedTerracotta",
Name:"Sun & clouds",
category:"build",
pistonPush:false,
pistonPull:false,
randomRotate:"pattern",randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name:"orangeGlazedTerracotta",
Name:"Flower Monster",
category:"build",
pistonPush:false,
pistonPull:false,
randomRotate:"pattern",randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name:"purpleGlazedTerracotta",
Name:"Sword & pickaxe monster",
category:"build",
pistonPush:false,
pistonPull:false,
randomRotate:"pattern",randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name:"yellowGlazedTerracotta",
Name:"Some kind of bug",
category:"build",
pistonPush:false,
pistonPull:false,
randomRotate:"pattern",randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name:"magentaGlazedTerracotta",
Name:"Arrow",
category:"build",
pistonPush:false,
pistonPull:false,
randomRotate:"pattern",randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name:"lightBlueGlazedTerracotta",
Name:"Monster sticking out tongue and eyes facing opposite direction",
category:"build",
pistonPush:false,
pistonPull:false,
randomRotate:"pattern",randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name:"lightGrayGlazedTerracotta",
Name:"Monster with blue eyes and mouth",
category:"build",
pistonPush:false,
pistonPull:false,
randomRotate:"pattern",randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name:"ancientDebris",
Name:"Ancient Debris",
textures:["ancientDebrisTop","ancientDebrisSide"],
breakTime:150,
type:"rock4",
category:"nature",
},
{
name:"wheatSeeds",
Name:"Seeds",
item:true,
useAs:function(x,y,z,block,face){
if(!block) return
if(face === "top" && blockData[block].name === "farmland") return "wheat"
},
compostChance:0.3,
category:"items"
},
{
name:"yellowStainedGlass",
Name: "Yellow Stained Glass",
transparent: true,
shadow: false,
breakTime: 0.3,
type:"glass",
glassSound: true,
category:"build"
},
{
name:"whiteStainedGlass",
Name: "White Stained Glass",
transparent: true,
shadow: false,
breakTime: 0.3,
type:"glass",
glassSound: true,
category:"build"
},
{
name:"redStainedGlass",
Name: "Red Stained Glass",
transparent: true,
shadow: false,
breakTime: 0.3,
type:"glass",
glassSound: true,
category:"build"
},
{
name:"purpleStainedGlass",
Name: "Purple Stained Glass",
transparent: true,
shadow: false,
breakTime: 0.3,
type:"glass",
glassSound: true,
category:"build"
},
{
name:"pinkStainedGlass",
Name: "Pink Stained Glass",
transparent: true,
shadow: false,
breakTime: 0.3,
type:"glass",
glassSound: true,
category:"build"
},
{
name:"orangeStainedGlass",
Name: "Orange Stained Glass",
transparent: true,
shadow: false,
breakTime: 0.3,
type:"glass",
glassSound: true,
category:"build"
},
{
name:"magentaStainedGlass",
Name: "Magenta Stained Glass",
transparent: true,
shadow: false,
breakTime: 0.3,
type:"glass",
glassSound: true,
category:"build"
},
{
name:"limeStainedGlass",
Name: "Lime Stained Glass",
transparent: true,
shadow: false,
breakTime: 0.3,
type:"glass",
glassSound: true,
category:"build"
},
{
name:"lightGrayStainedGlass",
Name: "Light Gray Stained Glass",
transparent: true,
shadow: false,
breakTime: 0.3,
type:"glass",
glassSound: true,
category:"build"
},
{
name:"lightBlueStainedGlass",
Name: "Light Blue Stained Glass",
transparent: true,
shadow: false,
breakTime: 0.3,
type:"glass",
glassSound: true,
category:"build"
},
{
name:"greenStainedGlass",
Name: "Green Stained Glass",
transparent: true,
shadow: false,
breakTime: 0.3,
type:"glass",
glassSound: true,
category:"build"
},
{
name:"grayStainedGlass",
Name: "Gray Stained Glass",
transparent: true,
shadow: false,
breakTime: 0.3,
type:"glass",
glassSound: true,
category:"build"
},
{
name:"cyanStainedGlass",
Name: "Cyan Stained Glass",
transparent: true,
shadow: false,
breakTime: 0.3,
type:"glass",
glassSound: true,
category:"build"
},
{
name:"brownStainedGlass",
Name: "Brown Stained Glass",
transparent: true,
shadow: false,
breakTime: 0.3,
type:"glass",
glassSound: true,
category:"build"
},
{
name:"blueStainedGlass",
Name: "Blue Stained Glass",
transparent: true,
shadow: false,
breakTime: 0.3,
type:"glass",
glassSound: true,
category:"build"
},
{
name:"blackStainedGlass",
Name: "Black Stained Glass",
transparent: true,
shadow: false,
breakTime: 0.3,
type:"glass",
glassSound: true,
category:"build"
},
{
name: "yellowStainedGlassPane",
Name: "Yellow Stained Glass Pane",
transparent: true,
shadow: false,
breakTime: 0.3,
pane:true,
textures: ["yellowStainedGlassPaneTop","yellowStainedGlassPaneTop","yellowStainedGlass","yellowStainedGlass","yellowStainedGlassPaneSide","yellowStainedGlassPaneSide"],
glassSound: true,
category:"build"
},
{
name: "whiteStainedGlassPane",
Name: "White Stained Glass Pane",
transparent: true,
shadow: false,
breakTime: 0.3,
pane:true,
textures: ["whiteStainedGlassPaneTop","whiteStainedGlassPaneTop","whiteStainedGlass","whiteStainedGlass","whiteStainedGlassPaneSide","whiteStainedGlassPaneSide"],
glassSound: true,
category:"build"
},
{
name: "redStainedGlassPane",
Name: "Red Stained Glass Pane",
transparent: true,
shadow: false,
breakTime: 0.3,
pane:true,
textures: ["redStainedGlassPaneTop","redStainedGlassPaneTop","redStainedGlass","redStainedGlass","redStainedGlassPaneSide","redStainedGlassPaneSide"],
glassSound: true,
category:"build"
},
{
name: "purpleStainedGlassPane",
Name: "Purple Stained Glass Pane",
transparent: true,
shadow: false,
breakTime: 0.3,
pane:true,
textures: ["purpleStainedGlassPaneTop","purpleStainedGlassPaneTop","purpleStainedGlass","purpleStainedGlass","purpleStainedGlassPaneSide","purpleStainedGlassPaneSide"],
glassSound: true,
category:"build"
},
{
name: "pinkStainedGlassPane",
Name: "Pink Stained Glass Pane",
transparent: true,
shadow: false,
breakTime: 0.3,
pane:true,
textures: ["pinkStainedGlassPaneTop","pinkStainedGlassPaneTop","pinkStainedGlass","pinkStainedGlass","pinkStainedGlassPaneSide","pinkStainedGlassPaneSide"],
glassSound: true,
category:"build"
},
{
name: "orangeStainedGlassPane",
Name: "Orange Stained Glass Pane",
transparent: true,
shadow: false,
breakTime: 0.3,
pane:true,
textures: ["orangeStainedGlassPaneTop","orangeStainedGlassPaneTop","orangeStainedGlass","orangeStainedGlass","orangeStainedGlassPaneSide","orangeStainedGlassPaneSide"],
glassSound: true,
category:"build"
},
{
name: "magentaStainedGlassPane",
Name: "Magenta Stained Glass Pane",
transparent: true,
shadow: false,
breakTime: 0.3,
pane:true,
textures: ["magentaStainedGlassPaneTop","magentaStainedGlassPaneTop","magentaStainedGlass","magentaStainedGlass","magentaStainedGlassPaneSide","magentaStainedGlassPaneSide"],
glassSound: true,
category:"build"
},
{
name: "limeStainedGlassPane",
Name: "Lime Stained Glass Pane",
transparent: true,
shadow: false,
breakTime: 0.3,
pane:true,
textures: ["limeStainedGlassPaneTop","limeStainedGlassPaneTop","limeStainedGlass","limeStainedGlass","limeStainedGlassPaneSide","limeStainedGlassPaneSide"],
glassSound: true,
category:"build"
},
{
name: "lightGrayStainedGlassPane",
Name: "Light Gray Stained Glass Pane",
transparent: true,
shadow: false,
breakTime: 0.3,
pane:true,
textures: ["lightGrayStainedGlassPaneTop","lightGrayStainedGlassPaneTop","lightGrayStainedGlass","lightGrayStainedGlass","lightGrayStainedGlassPaneSide","lightGrayStainedGlassPaneSide"],
glassSound: true,
category:"build"
},
{
name: "lightBlueStainedGlassPane",
Name: "Light Blue Stained Glass Pane",
transparent: true,
shadow: false,
breakTime: 0.3,
pane:true,
textures: ["lightBlueStainedGlassPaneTop","lightBlueStainedGlassPaneTop","lightBlueStainedGlass","lightBlueStainedGlass","lightBlueStainedGlassPaneSide","lightBlueStainedGlassPaneSide"],
glassSound: true,
category:"build"
},
{
name: "greenStainedGlassPane",
Name: "Green Stained Glass Pane",
transparent: true,
shadow: false,
breakTime: 0.3,
pane:true,
textures: ["greenStainedGlassPaneTop","greenStainedGlassPaneTop","greenStainedGlass","greenStainedGlass","greenStainedGlassPaneSide","greenStainedGlassPaneSide"],
glassSound: true,
category:"build"
},
{
name: "grayStainedGlassPane",
Name: "Gray Stained Glass Pane",
transparent: true,
shadow: false,
breakTime: 0.3,
pane:true,
textures: ["grayStainedGlassPaneTop","grayStainedGlassPaneTop","grayStainedGlass","grayStainedGlass","grayStainedGlassPaneSide","grayStainedGlassPaneSide"],
glassSound: true,
category:"build"
},
{
name: "cyanStainedGlassPane",
Name: "Cyan Stained Glass Pane",
transparent: true,
shadow: false,
breakTime: 0.3,
pane:true,
textures: ["cyanStainedGlassPaneTop","cyanStainedGlassPaneTop","cyanStainedGlass","cyanStainedGlass","cyanStainedGlassPaneSide","cyanStainedGlassPaneSide"],
glassSound: true,
category:"build"
},
{
name: "brownStainedGlassPane",
Name: "Brown Stained Glass Pane",
transparent: true,
shadow: false,
breakTime: 0.3,
pane:true,
textures: ["brownStainedGlassPaneTop","brownStainedGlassPaneTop","brownStainedGlass","brownStainedGlass","brownStainedGlassPaneSide","brownStainedGlassPaneSide"],
glassSound: true,
category:"build"
},
{
name: "blueStainedGlassPane",
Name: "Blue Stained Glass Pane",
transparent: true,
shadow: false,
breakTime: 0.3,
pane:true,
textures: ["blueStainedGlassPaneTop","blueStainedGlassPaneTop","blueStainedGlass","blueStainedGlass","blueStainedGlassPaneSide","blueStainedGlassPaneSide"],
glassSound: true,
category:"build"
},
{
name: "blackStainedGlassPane",
Name: "Black Stained Glass Pane",
transparent: true,
shadow: false,
breakTime: 0.3,
pane:true,
textures: ["blackStainedGlassPaneTop","blackStainedGlassPaneTop","blackStainedGlass","blackStainedGlass","blackStainedGlassPaneSide","blackStainedGlassPaneSide"],
glassSound: true,
category:"build"
},
{
name: "cobweb",
Name:"Cobweb",
solid: false,
transparent: true,
shadow: false,
crossShape: true,
breakTime:20,
drop:"air",
dropSelfWhenSheared:true,
shearBreakTime:0.4,
liquidBreakable:"drop",
category:"decoration"
},
{
name: "strippedCrimsonStem",
Name: "Stripped Crimson Stem",
textures: ["strippedCrimsonStemTop", "strippedCrimsonStem"],
breakTime:2,
stemSound:true,
category:"build"
},
{
name: "strippedCrimsonStemSW",
textures: ["strippedCrimsonStem", "strippedCrimsonStem", "strippedCrimsonStemTop","strippedCrimsonStemSW"],
breakTime:2,
stemSound:true,
rotate:true,
hidden:true
},
{
name: "strippedWarpedStem",
Name: "Stripped Warped Stem",
textures: ["strippedWarpedStemTop", "strippedWarpedStem"],
breakTime:2,
stemSound:true,
category:"build"
},
{
name: "strippedWarpedStemSW",
textures: ["strippedWarpedStem", "strippedWarpedStem", "strippedWarpedStemTop","strippedWarpedStemSW"],
breakTime:2,
stemSound:true,
rotate:true,
hidden:true
},
{
name: "oakPressurePlate",
Name: "Oak Pressure Plate",
textures: "oakPlanks",
pressurePlate: true,
breakTime:0.75,
type:"wood",
category:"redstone"
},
{
name: "birchPressurePlate",
Name: "Birch Pressure Plate",
textures: "birchPlanks",
pressurePlate: true,
breakTime:0.75,
type:"wood",
category:"redstone"
},
{
name: "sprucePressurePlate",
Name: "Spruce Pressure Plate",
textures: "sprucePlanks",
pressurePlate: true,
breakTime:0.75,
type:"wood",
category:"redstone"
},
{
name: "junglePressurePlate",
Name: "Jungle Pressure Plate",
textures: "junglePlanks",
pressurePlate: true,
breakTime:0.75,
type:"wood",
category:"redstone"
},
{
name: "acaciaPressurePlate",
Name: "Acacia Pressure Plate",
textures: "acaciaPlanks",
pressurePlate: true,
breakTime:0.75,
type:"wood",
category:"redstone"
},
{
name:"darkOakPressurePlate",
Name: "Dark Oak Pressure Plate",
textures: "darkOakPlanks",
pressurePlate: true,
breakTime:0.75,
type:"wood",
category:"redstone"
},
{
name: "warpedPressurePlate",
Name: "Warped Pressure Plate",
textures: "warpedPlanks",
pressurePlate: true,
breakTime:0.75,
type:"wood",
category:"redstone"
},
{
name: "crimsonPressurePlate",
Name: "Crimson Pressure Plate",
textures: "crimsonPlanks",
pressurePlate: true,
breakTime:0.75,
type:"wood",
category:"redstone"
},
{
name: "stonePressurePlate",
Name: "Stone Pressure Plate",
textures: "stone",
pressurePlate: true,
type:"stone",
breakTime:2.5,
category:"redstone"
},
{
name: "polishedBlackstonePressurePlate",
textures: "polishedBlackstone",
pressurePlate: true,
type:"stone",
breakTime:2.5,
category:"redstone"
},
{
name: "lightWeightedPressurePlate",
textures: "goldBlock",
pressurePlate: true,
type:"stone",
breakTime:2.5,
lightWeighted:true,
category:"redstone"
},
{
name: "heavyWeightedPressurePlate",
textures: "ironBlock",
pressurePlate: true,
type:"stone",
breakTime:2.5,
heavyWeighted:true,
category:"redstone"
},
{
name:"oakButton",
Name: "Oak Button",
textures:"oakPlanks",
button:true,
transparent: true,
shadow:false,
category:"redstone"
},
{
name:"birchButton",
Name: "Birch Button",
textures:"birchPlanks",
button:true,
transparent: true,
shadow:false,
category:"redstone"
},
{
name:"acaciaButton",
Name: "Acacia Button",
textures:"acaciaPlanks",
button:true,
transparent: true,
shadow:false,
category:"redstone"
},
{
name:"darkOakButton",
Name: "Dark Oak Button",
textures:"darkOakPlanks",
button:true,
transparent: true,
shadow:false,
category:"redstone"
},
{
name:"jungleButton",
Name: "Jungle Button",
textures:"junglePlanks",
button:true,
transparent: true,
shadow:false,
category:"redstone"
},
{
name:"spruceButton",
Name: "Spruce Button",
textures:"sprucePlanks",
button:true,
transparent: true,
shadow:false,
category:"redstone"
},
{
name:"warpedButton",
Name: "Warped Button",
textures:"warpedPlanks",
button:true,
transparent: true,
shadow:false,
category:"redstone"
},
{
name:"crimsonButton",
Name: "Crimson Button",
textures:"crimsonPlanks",
button:true,
transparent: true,
shadow:false,
category:"redstone"
},
{
name:"polishedBlackstoneButton",
Name: "Polished Blackstone Button",
textures:"polishedBlackstone",
button:true,
transparent:true,
shadow:false,
stone:true,
category:"redstone"
},
{
name:"copperBlock",
Name:"Block of Copper",
category:"build"
},
{
name:"crackedPolishedBlackstoneBricks",
Name:"Cracked Polished Blackstone Bricks",
category:"build"
},
{
name:"crackedStoneBricks",
Name:"Cracked Stone Bricks",
category:"build"
},
{
name:"woodenHoe",
Name:"Wooden Hoe",
item: true,
hoe: true,
durability: 59,
mineSpeed:2,
attackDamage: 1,
attackSpeed:1,
category:"tools"
},
{
name:"stoneHoe",
Name:"Stone Hoe",
item: true,
hoe: true,
durability: 131,
mineSpeed:4,
attackDamage: 1,
attackSpeed:2,
material:"cobblestone",
category:"tools"
},
{
name:"ironHoe",
Name:"Iron Hoe",
item: true,
hoe: true,
durability: 250,
mineSpeed:6,
attackDamage: 1,
attackSpeed:3,
material:"ironIngot",
category:"tools"
},
{
name:"goldenHoe",
Name:"Golden Hoe",
item: true,
hoe: true,
durability: 32,
mineSpeed:12,
attackDamage: 1,
attackSpeed:1,
material:"goldIngot",
category:"tools"
},
{
name:"diamondHoe",
Name:"Diamond Hoe",
item: true,
hoe: true,
durability: 1561,
mineSpeed:8,
attackDamage: 1,
attackSpeed:4,
material:"diamond",
category:"tools"
},
{
name:"podzol",
Name:"Podzol",
textures:["dirt","podzolTop","podzolSide"],
category:"nature",
breakTime:0.75,
blastResistance:0.5,
type:"ground",
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
let top = world.getBlock(x,y+1,z,dimension)
let isSnow = blockData[top].name === "snow" || blockData[top].name === "snowBlock"
if(b === blockIds.podzol && isSnow){
world.setBlock(x,y,z,blockIds.podzol | CROSS,false,false,false,false,dimension)
}else if(b === (blockIds.podzol | CROSS) && !isSnow){
world.setBlock(x,y,z,blockIds.podzol,false,false,false,false,dimension)
}
},
compostChance:0.3,
randomRotate:true,randomRotateTop:true,randomRotateBottom:true,
digSound: ["block.dirt.dig1", "block.dirt.dig2", "block.dirt.dig3", "block.dirt.dig4"],
stepSound: ["block.dirt.step1", "block.dirt.step2","block.dirt.step3","block.dirt.step4"]
},
{
name:"rawIronBlock",
Name:"Block of Raw Iron",
type:"rock2",
breakTime:25,
category:"build"
},
{
name:"rawGoldBlock",
Name:"Block of Raw Gold",
type:"rock3",
breakTime:25,
category:"build"
},
{
name:"rawCopperBlock",
Name:"Block of Raw Copper",
type:"rock2",
breakTime:25,
category:"build"
},
{
name:"netheriteScrap",
Name:"Netherite Scrap",
item:true,
category:"items"
},
{
name:"netheriteIngot",
Name:"Netherite Ingot",
item:true,
category:"items"
},
{
name:"netheritePickaxe",
Name:"Netherite Pickaxe",
item: true,
pickaxe: true,
mineSpeed: 9,
durability: 2031,
attackDamage: 6,
material:"netheriteIngot",
category:"tools"
},
{
name:"netheriteSword",
Name:"Netherite Sword",
item: true,
sword: true,
durability: 2031,
attackDamage: 8,
material:"netheriteIngot",
category:"tools"
},
{
name:"netheriteAxe",
Name:"Netherite Axe",
item: true,
axe: true,
durability: 2031,
mineSpeed:9,
attackDamage: 10,
attackSpeed:1,
material:"netheriteIngot",
category:"tools"
},
{
name:"netheriteShovel",
Name:"Netherite Shovel",
item: true,
shovel: true,
durability: 2031,
mineSpeed:9,
attackDamage: 6,
material:"netheriteIngot",
category:"tools"
},
{
name:"netheriteHoe",
Name:"Nethrite Hoe",
item: true,
hoe: true,
durability: 2031,
mineSpeed:9,
attackDamage: 1,
attackSpeed:4,
material:"netheriteIngot",
category:"tools"
},
{
name:"cartographyTable",
Name:"Cartograpgy Table",
textures: ["cartographyTableSide3","cartographyTableTop","cartographyTableSide3","cartographyTableSide1","cartographyTableSide2","cartographyTableSide3"],
rotate:true,
category:"items"
},
{
name:"cake",
Name:"Cake",
textures:["cakeBottom","cakeTop","cakeSide"],
cake:true,
transparent:true,
flatIcon:true,
iconTexture:"cake",
compostChance:1,
category:"food"
},
{
name:"smithingTable",
Name:"Smithing Table",
textures:["smithingTableBottom","smithingTableTop","smithingTableFront","smithingTableSide"],
category:"items"
},
{
name:"stonecutter",
Name:"Stonecutter",
textures:["stonecutterBottom","stonecutterTop","stonecutterSide"],
transparent:true,
stonecutter:true,
category:"items"
},
{
name:"itemFrame",
Name:"Item Frame",
transparent:true,
itemFrame:true,
flatIcon:true,
iconTexture:"itemFrameIcon",
category:"items"
},
{
name:"enderPearl",
Name:"Ender Pearl",
item:true,
onuse:function(x,y,z, block, replaceItem,useDurability,minusOne,dimension){
world.addEntity(new entities[entityIds.EnderPearl](p.x,p.y,p.z, p.direction.x, p.direction.y, p.direction.z),false,dimension)
},
minusOnUse:true,
useAnywhere:true,
category:"items"
},
{
name:"ironNugget",
Name:"Iron Nugget",
item:true,
category:"items"
},
{
name:"goldNugget",
Name:"Gold Nugget",
item:true,
category:"items"
},
{
name:"pumpkin",
Name:"Pumpkin",
textures:["pumpkinSide","pumpkinTop","pumpkinSide"],
compostChance:0.65,
category:"nature"
},
{
name:"carvedPumpkin",
Name:"Carved Pumpkin",
textures:["pumpkinSide","pumpkinTop","pumpkinSide","carvedPumpkin","pumpkinSide","pumpkinSide"],
rotate:true,
compostChance:0.65,
category:"nature"
},
{
name:"jackOLantern",
Name:"Jack o'Lantern",
textures:["pumpkinSide","pumpkinTop","pumpkinSide","jackOLantern","pumpkinSide","pumpkinSide"],
lightLevel:15,
rotate:true,
compostChance:0.65,
category:"nature"
},
{
name:"shears",
Name:"Shears",
item:true,
shears:true,
category:"items",
onentityuse:function(ent,replaceItem,useDurability,minusOne){
if(ent.type === "Sheep") ent.shear()
}
},
{
name:"pumpkinSeeds",
Name:"Pumpkin Seeds",
item:true,
compostChance:0.3,
category:"items"
},
{
name:"melonSeeds",
Name:"Watermelon Seeds",
item:true,
compostChance:0.3,
category:"items"
},
{
name:"melon",
Name:"Watermelon",
textures:["melonSide","melonTop","melonSide"],
breakTime:1.5,
drop:"melonSlice",
dropAmount:[3,7],
compostChance:0.65,
category:"nature"
},
{
name:"melonSlice",
Name:"Slice of Watermelon",
item:true,
edible: true,
food: 2,
saturation: 1.2,
compostChance:0.5,
category:"nature"
},
{
name:"redstoneLamp",
Name:"Redstone Lamp",
//if you chang this, change colored lamps too
onpowerupdate:function(x,y,z,sx,sy,sz,blockPowerChanged,dimension,world){
var power = world.getRedstonePower(x,y,z,dimension) || world.getSurroundingBlockPower(x,y,z,dimension)
var block = this.id
if(power){
block = this.id | SLAB
}
if(world.getBlock(x,y,z,dimension) !== block) world.setBlock(x,y,z,block,false,false,false,false,dimension)
},
onset:function(x,y,z,dimension,world){
this.onpowerupdate(x,y,z,null,null,null,null,dimension,world)
},
category:"redstone"
},
{
name:"glowstoneDust",
Name:"Glowstone Dust",
item:true,
category:"items"
},
{
name:"quartz",
Name:"Quartz",
item:true,
category:"items"
},
{
name: "endPortalFrame", 
Name:"End Portal Frame",
textures: ["endStone", "endPortalFrameTop", "endPortalFrameSide"],
category:"items",
blastResistance:3600000,
breakTime:Infinity,
lightLevel:1,
glassSound: true,
eyeplace:function(x,y,z,dimension,world){
this.findFullFrame(x+1,y,z,dimension,world)
this.findFullFrame(x-1,y,z,dimension,world)
this.findFullFrame(x,y,z+1,dimension,world)
this.findFullFrame(x,y,z-1,dimension,world)
},
findFullFrame:function(x,y,z,dimension,world){
if(blockData[world.getBlock(x,y,z)].solid) return
let spread = [], spreadAt = [x,y,z,0]
let minX = x, minZ = z
let maxX = x, maxZ = z
while(spreadAt.length){
let [sx,sy,sz] = spreadAt
if(Math.max(Math.abs(x-sx),Math.abs(y-sy),Math.abs(z-sz)) > 2) return //portal area isn't that big
minX = Math.min(minX,sx), minZ = Math.min(minZ,sz)
maxX = Math.max(maxX,sx), maxZ = Math.max(maxZ,sz)
if(!xyArrayHas(spread,spreadAt,sx,sy,sz+1)){
let b = world.getBlock(sx,sy,sz+1,dimension)
if(!blockData[b].solid) spreadAt.push(sx,sy,sz+1,0)
else if(blockData[b].name !== this.name) return
}
if(!xyArrayHas(spread,spreadAt,sx,sy,sz-1)){
let b = world.getBlock(sx,sy,sz-1,dimension)
if(!blockData[b].solid) spreadAt.push(sx,sy,sz-1,0)
else if(blockData[b].name !== this.name) return
}
if(!xyArrayHas(spread,spreadAt,sx+1,sy,sz)){
let b = world.getBlock(sx+1,sy,sz,dimension)
if(!blockData[b].solid) spreadAt.push(sx+1,sy,sz,0)
else if(blockData[b].name !== this.name) return
}
if(!xyArrayHas(spread,spreadAt,sx-1,sy,sz)){
let b = world.getBlock(sx-1,sy,sz,dimension)
if(!blockData[b].solid) spreadAt.push(sx-1,sy,sz,0)
else if(blockData[b].name !== this.name) return
}
spread.push(...spreadAt.splice(0,4))
}
//check if frame is correct
x = minX-1, z = minZ-1
if(world.getBlock(x+1,y,z,dimension) !== (this.id | SLAB | SOUTH)) return
if(world.getBlock(x+2,y,z,dimension) !== (this.id | SLAB | SOUTH)) return
if(world.getBlock(x+3,y,z,dimension) !== (this.id | SLAB | SOUTH)) return
if(world.getBlock(x+4,y,z+1,dimension) !== (this.id | SLAB | EAST)) return
if(world.getBlock(x+4,y,z+2,dimension) !== (this.id | SLAB | EAST)) return
if(world.getBlock(x+4,y,z+3,dimension) !== (this.id | SLAB | EAST)) return
if(world.getBlock(x+1,y,z+4,dimension) !== (this.id | SLAB | NORTH)) return
if(world.getBlock(x+2,y,z+4,dimension) !== (this.id | SLAB | NORTH)) return
if(world.getBlock(x+3,y,z+4,dimension) !== (this.id | SLAB | NORTH)) return
if(world.getBlock(x,y,z+1,dimension) !== (this.id | SLAB | WEST)) return
if(world.getBlock(x,y,z+2,dimension) !== (this.id | SLAB | WEST)) return
if(world.getBlock(x,y,z+3,dimension) !== (this.id | SLAB | WEST)) return
//place the frame
world.setBlock(x+1,y,z+1,blockIds.endPortal,false,false,false,false,dimension)
world.setBlock(x+2,y,z+1,blockIds.endPortal,false,false,false,false,dimension)
world.setBlock(x+3,y,z+1,blockIds.endPortal,false,false,false,false,dimension)
world.setBlock(x+1,y,z+2,blockIds.endPortal,false,false,false,false,dimension)
world.setBlock(x+2,y,z+2,blockIds.endPortal,false,false,false,false,dimension)
world.setBlock(x+3,y,z+2,blockIds.endPortal,false,false,false,false,dimension)
world.setBlock(x+1,y,z+3,blockIds.endPortal,false,false,false,false,dimension)
world.setBlock(x+2,y,z+3,blockIds.endPortal,false,false,false,false,dimension)
world.setBlock(x+3,y,z+3,blockIds.endPortal,false,false,false,false,dimension)
world.playSound(x+2,y,z+2,"block.end_portal.endportal")
}
},
{
name: "eyeOfEnder",
Name:"Eye of Ender",
flatIcon:true,
item:true,
placeSound:["block.end_portal.eyeplace1","block.end_portal.eyeplace2","block.end_portal.eyeplace3"],
category:"items"
},
{
name:"endStone",
Name:"End Stone",
category:"nature",
randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name:"redSand",
Name:"Red Sand",
breakTime:0.75,
fallingDust:[178/255, 94/255, 26/255],
onupdate: function(x,y,z,b,world,sx,sy,sz,dimension){
fall(x,y,z,b,world,false,dimension)
},
ongetexploded:function(x,y,z,b,world,dimension){
fall(x,y,z,b,world,true,dimension)
},
category:"nature",
digSound: ["block.sand.dig1", "block.sand.dig2", "block.sand.dig3", "block.sand.dig4"],
stepSound: ["block.sand.step1", "block.sand.step2","block.sand.step3","block.sand.step4","block.sand.step5"]
},
{
name:"redSandstone",
Name:"Red Sandstone",
textures: ["redSandstoneBottom", "redSandstoneTop", "redSandstone"],
category:"nature",
randomRotate:true,randomRotateTop:true,randomRotateBottom:true
},
{ name:"chiseledRedSandstone",
Name:"Chiseled Red Sandstone",
textures: ["redSandstoneBottom", "redSandstoneTop","chiseledRedSandstone"],
category:"build",
randomRotate:true,randomRotateTop:true,randomRotateBottom:true
},
{ name:"cutRedSandstone",
Name:"Cut Red Sandstone",
textures: ["redSandstoneBottom", "redSandstoneTop","cutRedSandstone"],
category:"build",
randomRotate:true,randomRotateTop:true,randomRotateBottom:true
},
{ name:"smoothRedSandstone", Name:"Smooth Red Sandstone", textures:"redSandstoneTop", category:"nature", randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true },
{
name:"purpurBlock",
Name:"Purpur Block",
category:"build"
},
{
name:"purpurPillar",
Name:"Purpur Pillar",
textures:["purpurPillarTop","purpurPillar"],
category:"build"
},
{
name:"purpurPillarSW",
textures:["purpurPillar","purpurPillar","purpurPillarTop","purpurPillarSW"],
rotate:true,
hidden:true
},
{
name:"prismarine",
Name:"Prismarine",
category:"build"
},
{
name:"prismarineBricks",
Name:"Prismarine Bricks",
category:"build"
},
{
name:"darkPrismarine",
Name:"Dark Prismarine",
category:"build"
},
{
name:"prismarineCrystals",
Name:"Prismarine Crystals",
category:"items",
item:true
},
{
name:"prismarineShard",
Name:"Prismarine Shard",
item:true,
category:"items"
},
{
name:"seaLantern",
Name:"Sea Lantern",
lightLevel:15,
breakTime:0.45,
category:"decoration"
},
{
name:"oakLeaves",
Name: "Oak Leaves",
transparent: true,
cullFace:"never",
breakTime: 0.3,
type:"plant2",
leaves:true,
drop: function(){
if(rand() > 0.8){
let r = floor(rand(3))
if(r === 0) return "stick"
else if(r === 1) return "oakSapling"
else{
return rand() > 0.8 ? "orange" : "apple"
}
}
},
dropSelfWhenSheared:true,
shearBreakTime:0.05,
burnChance: 0.2,
burnTime: 30,
compostChance:0.3,
grassSound: true,
category:"nature"
},
{
name: "acaciaLeaves",
Name:"Acacia Leaves",
transparent: true,
cullFace:"never",
breakTime: 0.3,
type:"plant2",
leaves:true,
drop: function(){
if(rand() > 0.8){
let r = floor(rand(3))
if(r === 0) return "stick"
else if(r === 1) return "acaciaSapling"
}
},
dropSelfWhenSheared:true,
shearBreakTime:0.05,
burnChance: 0.2,
burnTime: 30,
compostChance:0.3,
grassSound: true,
category:"nature"
},
{
name: "birchLeaves",
Name:"Birch Leaves",
transparent: true,
cullFace:"never",
breakTime: 0.3,
type:"plant2",
leaves:true,
drop: function(){
if(rand() > 0.8){
let r = floor(rand(3))
if(r === 0) return "stick"
else if(r === 1) return "birchSapling"
}
},
dropSelfWhenSheared:true,
shearBreakTime:0.05,
burnChance: 0.2,
burnTime: 30,
compostChance:0.3,
grassSound: true,
category:"nature"
},
{
name: "darkOakLeaves",
Name:"Dark Oak Leaves",
transparent: true,
cullFace:"never",
breakTime: 0.3,
type:"plant2",
leaves:true,
drop: function(){
if(rand() > 0.8){
let r = floor(rand(3))
if(r === 0) return "stick"
else if(r === 1) return "darkOakSapling"
else return "apple"
}
},
dropSelfWhenSheared:true,
shearBreakTime:0.05,
burnChance: 0.2,
burnTime: 30,
compostChance:0.3,
grassSound: true,
category:"nature"
},
{
name: "jungleLeaves",
Name:"Jungle Leaves",
transparent: true,
cullFace:"never",
breakTime: 0.3,
type:"plant2",
leaves:true,
drop: function(){
if(rand() > 0.8){
let r = floor(rand(3))
if(r === 0) return "stick"
else if(r === 1) return "jungleSapling"
}
},
dropSelfWhenSheared:true,
shearBreakTime:0.05,
burnChance: 0.2,
burnTime: 30,
compostChance:0.3,
grassSound: true,
category:"nature"
},
{
name: "spruceLeaves",
Name:"Spruce Leaves",
transparent: true,
cullFace:"never",
breakTime: 0.3,
type:"plant2",
leaves:true,
drop: function(){
if(rand() > 0.8){
let r = floor(rand(3))
if(r === 0) return "stick"
else if(r === 1) return "spruceSapling"
}
},
dropSelfWhenSheared:true,
shearBreakTime:0.05,
burnChance: 0.2,
burnTime: 30,
compostChance:0.3,
grassSound: true,
category:"nature"
},
{
name:"spyglass",
Name:"Spyglass",
textures:"spyglassModel",
iconTexture:"spyglass",
item:true,
spyglass:true,
category:"items"
},
{
name:"egg",
Name:"Egg",
item:true,
onuse:function(x,y,z,b,replaceItem,useDurability,minusOne,dimension){
var pd = p.direction
world.addEntity(new entities[entityIds.Egg](p.x+pd.x,p.y+pd.y,p.z+pd.z, pd.x*0.8, pd.y*0.8, pd.z*0.8),false,dimension)
},
minusOnUse:true,
useAnywhere:true,
category:"items"
},
{
name:"noodles",
Name:"Noodles",
item:true,
category:"food",
hidden:true
},
{
name:"bowl",
Name:"Bowl",
item:true,
category:"items"
},
{
name:"mushroomStew",
Name:"Mushroom Stew",
edible: true,
item:true,
eatWhenFull: false,
food: 6,
saturation: 7.2,
eatResult:"bowl",
category:"food"
},
{
name:"ramen",
Name:"Ramen! Yum!",
edible: true,
item:true,
eatWhenFull: true,
food: 8,
saturation: 10,
eatResult:"bowl",
category:"food",
hidden:true
},
{
name:"orange",
Name:"Orange",
edible: true,
item:true,
eatWhenFull: false,
food: 4,
saturation: 2.4,
category:"food"
},
{
name:"fern",
Name:"Fern",
solid: false,
transparent: true,
shadow: false,
crossShape: true,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature",
randomHeight:true
},
{
name: "largeFern",
Name:"Large Fern",
solid: false,
transparent: true,
shadow: false,
textures: "largeFernTop",
tallcrossShape: true,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature",
randomHeight:true
},
{
name:"fire",
fire:true,
damage:1,
burnEnt:true,
transparent:true,
shadow:false,
solid:false,
lightLevel:15,
ambientSound:"block.fire.fire",
temperature:20,
shade:false,
smoothLight:false,
hidden:true,
liquidBreakable:true,
noHitbox:true,
tagBits:{
age:[0,8]
},
getAttached:function(x,y,z,block,dimension,getBlockOnly,world){
var ax = x, ay = y, az = z
switch(block){
case this.id:
ay--
break
case this.id | STAIR:
ay++
break
case this.id | SLAB | NORTH:
az++
break
case this.id | SLAB | SOUTH:
az--
break
case this.id | SLAB | EAST:
ax++
break
case this.id | SLAB | WEST:
ax--
break
}
var attached = world.getBlock(ax,ay,az,dimension)
if(getBlockOnly) return attached
else return [attached,ax,ay,az]
},
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
var block = this.getAttached(x,y,z,b,dimension,true,world)
if(!block || !blockData[block].solid && !blockData[block].liquid) world.setBlock(x,y,z,0,false,false,false,false,dimension)
},
tick:function(x,y,z,dimension,world){
var block = world.getBlock(x,y,z,dimension)
var attached = this.getAttached(x,y,z,block,dimension,false,world)
var ax = attached[1], ay = attached[2], az = attached[3]
attached = attached[0]
var age = world.getTagByName(x,y,z,"age",dimension)
if(!age) age = 0
age += rand(10,11)
//finish burning
if(age >= 15 && (!attached || !blockData[attached].burnTime)){
return world.setBlock(x,y,z,0,false,false,false,false,dimension)
}
if(attached && blockData[attached].burnTime && age > blockData[attached].burnTime){
world.setBlock(x,y,z,0,false,false,false,false,dimension)
world.setBlock(ax,ay,az,0,false,false,false,false,dimension)
return
}
if(age > 255) age = 255
world.setTagByName(x,y,z,"age",age,false,dimension)
if(world.weather === "rain" && world.weatherAmount > 0.5){
let top = world.getSolidTop(x,z,dimension)
if(y > top) world.setBlock(x,y,z,0,false,false,false,false,dimension) //rain extinguish
}
this.spread(x,y,z,dimension,world)
},
spread:function(x,y,z,dimension,world){
for(var i=x-1; i<=x+1; i++){
for(var j=y-1; j<=y+4; j++){
for(var k=z-1; k<=z+1; k++){
var block = world.getBlock(i,j,k,dimension)
if(block && blockData[block].burnChance && rand() < blockData[block].burnChance){
if(blockData[block].onburn) blockData[block].onburn(i,j,k,dimension,world)
var block
let rx, ry, rz
//find a place where the fire can go
for(var t=0; t<6; t++){
rx = i, ry = j, rz = k
switch(floor(rand(6))){
case 0:
block = this.id
ry++
break
case 1:
block = this.id | STAIR
ry--
break
case 2:
block = this.id | SLAB | NORTH
rz--
break
case 3:
block = this.id | SLAB | SOUTH
rz++
break
case 4:
block = this.id | SLAB | EAST
rx--
break
case 5:
block = this.id | SLAB | WEST
rx++
break
}
if(!world.getBlock(rx,ry,rz,dimension)) break
}
if(!world.getBlock(rx,ry,rz,dimension)) world.setBlock(rx,ry,rz,block,false,false,false,false,dimension)
}
}
}
}
},
tryCreatePortalZ:function(x,y,z,dimension){ //weird portals are allowed
let spread = [], spreadAt = [x,y,z,0], maxSpread = 23, block
while(spreadAt.length){
let [sx,sy,sz,i] = spreadAt.splice(0,4)
spread.push(sx,sy,sz,i)
if(max(abs(sx-x),abs(sy-y),abs(sz-z)) > maxSpread) return
block = world.getBlock(sx,sy,sz+1,dimension)
if(!xyArrayHas(spread,spreadAt,sx,sy,sz+1)){
if(!blockData[block].solid) spreadAt.push(sx,sy,sz+1,i+1)
else if(block !== blockIds.obsidian) return
}
block = world.getBlock(sx,sy,sz-1,dimension)
if(!xyArrayHas(spread,spreadAt,sx,sy,sz-1)){
if(!blockData[block].solid) spreadAt.push(sx,sy,sz-1,i+1)
else if(block !== blockIds.obsidian) return
}
block = world.getBlock(sx,sy+1,sz,dimension)
if(!xyArrayHas(spread,spreadAt,sx,sy+1,sz)){
if(!blockData[block].solid) spreadAt.push(sx,sy+1,sz,i+1)
else if(block !== blockIds.obsidian) return
}
block = world.getBlock(sx,sy-1,sz,dimension)
if(!xyArrayHas(spread,spreadAt,sx,sy-1,sz)){
if(!blockData[block].solid) spreadAt.push(sx,sy-1,sz,i+1)
else if(block !== blockIds.obsidian) return
}
}
for(let i=0; i<spread.length; i+=4){
world.setBlock(spread[i],spread[i+1],spread[i+2],blockIds.portal|PORTAL|EAST,false,false,false,false,dimension)
}
return true
},
tryCreatePortalX:function(x,y,z,dimension){ //weird portals are allowed
let spread = [], spreadAt = [x,y,z,0], maxSpread = 23, block
while(spreadAt.length){
let [sx,sy,sz,i] = spreadAt.splice(0,4)
spread.push(sx,sy,sz,i)
if(max(abs(sx-x),abs(sy-y),abs(sz-z)) > maxSpread) return
block = world.getBlock(sx+1,sy,sz,dimension)
if(!xyArrayHas(spread,spreadAt,sx+1,sy,sz)){
if(!blockData[block].solid) spreadAt.push(sx+1,sy,sz,i+1)
else if(block !== blockIds.obsidian) return
}
block = world.getBlock(sx-1,sy,sz,dimension)
if(!xyArrayHas(spread,spreadAt,sx-1,sy,sz)){
if(!blockData[block].solid) spreadAt.push(sx-1,sy,sz,i+1)
else if(block !== blockIds.obsidian) return
}
block = world.getBlock(sx,sy+1,sz,dimension)
if(!xyArrayHas(spread,spreadAt,sx,sy+1,sz)){
if(!blockData[block].solid) spreadAt.push(sx,sy+1,sz,i+1)
else if(block !== blockIds.obsidian) return
}
block = world.getBlock(sx,sy-1,sz,dimension)
if(!xyArrayHas(spread,spreadAt,sx,sy-1,sz)){
if(!blockData[block].solid) spreadAt.push(sx,sy-1,sz,i+1)
else if(block !== blockIds.obsidian) return
}
}
for(let i=0; i<spread.length; i+=4){
world.setBlock(spread[i],spread[i+1],spread[i+2],blockIds.portal|PORTAL|NORTH,false,false,false,false,dimension)
}
return true
},
tryCreatePortal:function(x,y,z,dimension){
return this.tryCreatePortalZ(x,y,z,dimension) || this.tryCreatePortalX(x,y,z,dimension)
}
},
{
name: "endRod",
Name:"End Rod",
transparent: true,
shadow: false,
lightLevel: 15,
category:"decoration"
},
{
name: "oakWood",
Name:"Oak Wood",
textures: "logSide",
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"nature",
log:true
},
{
name: "acaciaWood",
Name:"Acacia Wood",
textures: "acaciaLogSide",
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"nature",
log:true
},
{
name: "birchWood",
Name:"Birch Wood",
textures: "birchLogSide",
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"nature",
log:true
},
{
name: "darkOakWood",
Name:"Dark Oak Wood",
textures: "darkOakLogSide",
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"nature",
log:true
},
{
name: "jungleWood",
Name:"Jungle Wood",
textures: "jungleLogSide",
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"nature",
log:true
},
{
name: "spruceWood",
Name:"Spruce Wood",
textures: "spruceLogSide",
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"nature",
log:true
},
{
name: "crimsonHyphae",
textures: "crimsonStemSide",
stemSound: true,
breakTime:2,
type:"wood",
category:"nature"
},
{
name: "warpedHyphae",
textures: "warpedStemSide",
stemSound: true,
breakTime:2,
type:"wood",
category:"nature"
},
{
name: "strippedOakWood",
Name:"Stripped Oak Wood",
textures: "strippedOakLog",
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"build"
},
{
name: "strippedAcaciaWood",
Name:"Stripped Acacia Wood",
textures: "strippedAcaciaLog",
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"build"
},
{
name: "strippedBirchWood",
Name:"Stripped Birch Wood",
textures: "strippedBirchLog",
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"build"
},
{
name: "strippedDarkOakWood",
Name:"Stripped Dark Oak Wood",
textures: "strippedDarkOakLog",
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"build"
},
{
name: "strippedJungleWood",
Name:"Stripped Jungle Wood",
textures: "strippedJungleLog",
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"build"
},
{
name: "strippedSpruceWood",
Name:"Stripped Spruce Wood",
textures: "strippedSpruceLog",
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"build"
},
{
name: "strippedCrimsonHyphae",
textures: "strippedCrimsonStem",
stemSound: true,
breakTime:2,
type:"wood",
category:"build"
},
{
name: "strippedWarpedHyphae",
textures: "strippedWarpedStem",
stemSound: true,
breakTime:2,
type:"wood",
category:"build"
},
{
name:"oakFenceGate",
Name:"Oak Fence Gate",
textures:"oakPlanks",
fenceGate:true,
breakTime:3,
woodSound:true,
type:"wood",
category:"build"
},
{
name:"acaciaFenceGate",
Name:"Acacia Fence Gate",
textures:"acaciaPlanks",
fenceGate:true,
breakTime:3,
woodSound:true,
type:"wood",
category:"build"
},
{
name:"birchFenceGate",
Name:"Birch Fence Gate",
textures:"birchPlanks",
fenceGate:true,
breakTime:3,
woodSound:true,
type:"wood",
category:"build"
},
{
name:"darkOakFenceGate",
Name:"Dark Oak Fence Gate",
textures:"darkOakPlanks",
fenceGate:true,
breakTime:3,
woodSound:true,
type:"wood",
category:"build"
},
{
name:"jungleFenceGate",
Name:"Jungle Fence Gate",
textures:"junglePlanks",
fenceGate:true,
breakTime:3,
woodSound:true,
type:"wood",
category:"build"
},
{
name:"spruceFenceGate",
Name:"Spruce Fence Gate",
textures:"sprucePlanks",
fenceGate:true,
breakTime:3,
woodSound:true,
type:"wood",
category:"build"
},
{
name:"crimsonFenceGate",
Name:"Crimson Fence Gate",
textures:"crimsonPlanks",
fenceGate:true,
breakTime:3,
woodSound:true,
type:"wood",
category:"build"
},
{
name:"warpedFenceGate",
Name:"Warped Fence Gate",
textures:"warpedPlanks",
fenceGate:true,
breakTime:3,
woodSound:true,
type:"wood",
category:"build"
},
{ 
name: "kelp",
Name:"Kelp",
flatIcon:true,
iconTexture:"kelpIcon",
transparent: true,
solid: false,
shadow: false,
crossShape: true,
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
var top = world.getBlock(x,y+1,z,dimension)
var isIt = blockData[top].name === "kelp" || blockData[top].name === "kelpPlant"
if(isIt){
world.setBlock(x,y,z,blockIds.kelpPlant | CROSS,false,false,false,false,dimension)
}
},
category:"nature"
},
{ 
name: "kelpPlant",
transparent: true,
solid: false,
shadow: false,
crossShape: true,
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
var top = world.getBlock(x,y+1,z,dimension)
var isIt = blockData[top].name === "kelp" || blockData[top].name === "kelpPlant"
if(!isIt){
world.setBlock(x,y,z,blockIds.kelp | CROSS,false,false,false,false,dimension)
}
},
hidden:true
},
{
name:"seagrass",
Name:"Seagrass",
iconTexture:"seagrassIcon",
transparent: true,
solid: false,
shadow: false,
crop:true,
category:"nature"
},
{
name:"tallSeagrass",
Name:"Tall Seagrass",
textures:"tallSeagrassTop",
transparent: true,
solid: false,
shadow: false,
tallCrop:true,
category:"nature"
},
{
name:"barrel",
Name:"Barrel",
textures:["barrelBottom","barrelTop","barrelSide"],
texturesOpen:fillTextureArray(["barrelBottom","barrelTopOpen","barrelSide"]),
texturesSW:fillTextureArray(["barrelSide","barrelSide","barrelTop","barrelSW"]),
texturesSWOpen:fillTextureArray(["barrelSide","barrelSide","barrelTopOpen","barrelSW"]),
texturesDown:fillTextureArray(["barrelTop","barrelBottom","barrelSide"]),
texturesDownOpen:fillTextureArray(["barrelTopOpen","barrelBottom","barrelSide"]),
woodSound:true,
barrel:true,
category:"items",
tagBits: null,
setContents:function(x,y,z,dimension,world){
let data = {chest:true, contents:new Array(27).fill(0)}
world.setTags(x, y, z, data,false,dimension)
return data
},
onclientclick:function(x,y,z,dimension){
containerData.x = x
containerData.y = y
containerData.z = z
containerData.dimension = dimension
changeScene("chest")
releasePointer()
},
onbreak:function(x,y,z, block, data,dimension,world){
if(!(data && data.chest && data.contents)) return
data = data.contents
for(var i=0; i<data.length; i++){
if(data[i] && data[i].id){
world.addItems(x,y,z,dimension,0,0,0,data[i].id, true, data[i].amount, data[i].durability, data[i].customName)
}
}
},
},
{
name:"endStoneBricks",
Name:"End Stone Bricks",
stoneSound:true,
category:"build"
},
{
name:"beeNest",
Name:"Bee Nest",
textures:["beeNestBottom","beeNestTop","beeNestSide","beeNestFront","beeNestSide","beeNestSide"],
texturesHoney:["beeNestBottom","beeNestTop","beeNestSide","beeNestFrontHoney","beeNestSide","beeNestSide"],
rotate:true,
category:"nature"
},
{
name:"beehive",
Name:"Beehive",
textures:["beehiveEnd","beehiveEnd","beehiveSide","beehiveFront","beehiveSide","beehiveSide"],
texturesHoney:["beehiveEnd","beehiveEnd","beehiveSide","beehiveFrontHoney","beehiveSide","beehiveSide"],
rotate:true,
category:"items"
},
{
name:"honeyBlock",
Name:"Block of Honey",
textures:"honeyBlockBottom",
transparent:true,
shapeName:"honeyBlock",
damageResistance:0.8,
category:"build",
sticky:true
},
{
name:"honeycomb",
Name:"Honeycomb",
item:true,
category:"items"
},
{
name:"honeycombBlock",
Name:"Honeycomb Block",
category:"build"
},
{
name:"coarseDirt",
Name:"Coarse Dirt",
breakTime:1.5,
type:"ground",
category:"nature",
randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name:"inkSac",
Name:"Ink Sac",
item:true,
category:"items"
},
{
name:"glowInkSac",
Name:"Glow Ink Sac",
item:true,
category:"items"
},
{
name:"glowItemFrame",
Name:"Glow Item Frame",
transparent:true,
itemFrame:true,
flatIcon:true,
iconTexture:"glowItemFrameIcon",
category:"items"
},
{
name:"glowLichen",
Name:"Glow Lichen",
transparent: true,
shadow: false,
wallFlat: true,
flatIcon:true,
lightLevel:7,
compostChance:0.5,
category:"nature"
},
{
name:"sponge",
Name:"Sponge",
wetTexture:new Array(6).fill("wetSponge"),
category:"items",
randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true
},
{
name:"cutCopper",
Name:"Cut Copper",
category:"build"
},
{
name:"exposedCopper",
Name:"Exposed Block of Copper",
category:"build"
},
{
name:"exposedCutCopper",
Name:"Exposed Cut Copper",
category:"build"
},
{
name:"weatheredCopper",
Name:"Weathered Block of Copper",
category:"build"
},
{
name:"weatheredCutCopper",
Name:"Weathered Cut Copper",
category:"build"
},
{
name:"oxidizedCopper",
Name:"Oxidized Block of Copper",
category:"build"
},
{
name:"oxidizedCutCopper",
Name:"Oxidized Cut Copper",
category:"build"
},
{
name:"quartzBricks",
Name:"Quartz Bricks",
stoneSound:true,
category:"build"
},
{
name:"campfire",
Name:"Campfire",
flatIcon:true,
iconTexture:"campfire",
textures: "campfireLogLit",
campfire:true,
shadow:false,
lightLevel:15,
transparent:true,
woodSound:true,
drop:"campfire",
category:"items",
damageUp:2,
burnEnt:true,
smoothLight:false,
activate:function(x,y,z,dimension,block,ent){
if(ent.burning && block === (this.id | SLAB) && onBoxEnt(x,y,z,1,1,1,ent)){
world.setBlock(x,y,z,this.id,false,false,false,false,dimension)
}
}
},
{
name:"soulCampfire",
Name:"Soul Campfire",
flatIcon:true,
iconTexture:"soulCampfire",
textures: "soulCampfireLogLit",
campfire:true,
shadow:false,
lightLevel:10,
transparent:true,
woodSound:true,
drop:"soulCampfire",
category:"items",
damageUp:4,
burnEnt:true,
smoothLight:false,
activate:function(x,y,z,dimension,block,ent){
if(ent.burning && block === (this.id | SLAB) && onBoxEnt(x,y,z,1,1,1,ent)){
world.setBlock(x,y,z,this.id,false,false,false,false,dimension)
}
}
},
{
name:"bambooShoot",
Name:"Bamboo Shoot",
textures:"bambooStage0",
solid: false,
transparent: true,
shadow: false,
crossShape: true,
liquidBreakable:"drop",
category:"nature"
},
{
name:"bambooStalk",
Name:"Bamboo",
iconTexture:"bamboo",
flatIcon:true,
bamboo:true,
shadow: false,
potCross:true,
transparent:true,
drop:"bambooStalk",
breakTime:1.5,
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
needsSupportingBlocks(x,y,z,b,world,dimension)
},
liquidBreakable:"drop",
category:"nature"
},
{
name:"chest",
Name:"Chest",
textures:/*"christmasChestSide",//*/"chestFront",//christmas
transparent:true,
chest:true,
tagBits: null,
setContents:function(x,y,z,dimension,world){
let data = {chest:true, contents:new Array(27).fill(0)}
world.setTags(x, y, z, data,false,dimension)
return data
},
onclientclick:function(x,y,z,dimension){
containerData.x = x
containerData.y = y
containerData.z = z
containerData.dimension = dimension
changeScene("chest")
releasePointer()
},
onbreak:function(x,y,z, block, data,dimension,world){
if(!(data && data.chest && data.contents)) return
data = data.contents
for(var i=0; i<data.length; i++){
if(data[i] && data[i].id){
world.addItems(x,y,z,dimension,0,0,0,data[i].id, true, data[i].amount, data[i].durability, data[i].customName)
}
}
},
category:"items"
},
{
name:"boneMeal",
Name:"Bone \"Meal\"",
item:true,
onuse:function(x,y,z, block, replaceItem, useDurability, minusOne,dimension){
if(blockData[block].grow){
blockData[block].grow(x,y,z,dimension,world)
minusOne()
}else if(blockData[block].name === "wheat"){
world.setBlock(x,y,z, blockIds.wheat|LANTERN,false,false,false,false,dimension)
}else if(blockData[block].name === "tomatoPlant"){
world.setBlock(x,y,z, blockIds.tomatoPlant|TALLCROSS,false,false,false,false,dimension)
}else if(blockData[block].name === "beetroots"){
world.setBlock(x,y,z, blockIds.beetroots|CROSS,false,false,false,false,dimension)
}else if(blockData[block].name === "carrots"){
world.setBlock(x,y,z, blockIds.carrots|CROSS,false,false,false,false,dimension)
}else if(blockData[block].name === "potatoes"){
world.setBlock(x,y,z, blockIds.potatoes|CROSS,false,false,false,false,dimension)
}else return
glint(x,y,z,dimension)
},
minusOnUse:true,
category:"items"
},
{
name:"clay",
Name:"Clay",
breakTime:0.9,
type:"ground",
digSound: ["block.dirt.dig1", "block.dirt.dig2", "block.dirt.dig3", "block.dirt.dig4"],
stepSound: ["block.dirt.step1", "block.dirt.step2","block.dirt.step3","block.dirt.step4"],
drop:"clayBall",
dropAmount:4,
category:"nature"
},
{
name:"clayBall",
Name:"Clay Ball",
item:true,
category:"items"
},
{
name:"brick",
Name:"Brick",
item:true,
category:"items"
},
{
name:"charcoal",
Name:"Charcoal",
item:true,
category:"items"
},
{
name:"appleCore",
Name:"Apple Core",
item:true,
category:"items"
},
{
name:"tintedGlass",
Name:"Tinted Glass",
transparent: true,
shadow: true,
breakTime: 0.45,
type: "glass",
glassSound: true,
category:"build"
},
{
name:"tomato",
Name:"Tomato",
item:true,
edible:true,
eatWhenFull: false,
food: 3,
saturation: 2,
eatResult:"tomatoSeeds",
category:"nature"
},
{
name:"tomatoPlant",
Name:"Tomato Plant",
textures:new Array(6).fill("tomatoPlantStage0"),
textures1:new Array(6).fill("tomatoPlantStage1"),
textures2:new Array(6).fill("tomatoPlantStage2"),
textures3:new Array(6).fill("tomatoPlantStage3"),
textures4:new Array(6).fill("tomatoPlantStage4"),
iconTexture:"tomatoPlantStage3",
flatIcon:true,
shadow:false,
transparent:true,
solid:false,
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
needsSupportingBlocks(x,y,z,b,world,dimension)
},
category:"nature",
liquidBreakable:"drop"
},
{
name:"tomatoSeeds",
Name:"Tomato Seeds",
item:true,
useAs:function(x,y,z,block,face){
if(!block) return
if(face === "top" && blockData[block].name === "farmland"){
return "tomatoPlant"
}else{
Messages.write("tomato seeds need to be planted on farmland")
p.lastPlace = Date.now()
}
},
category:"nature"
},
{
name:"newCactusFruit",
Name:"New Cactus Fruit",
solid: false,
transparent: true,
shadow: false,
crossShape: true,
cactusFruit:true,
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
needsSupportingBlocks(x,y,z,b,world,dimension)
},
compostChance:0.3,
liquidBreakable:true,
category:"nature"
},
{
name:"greenCactusFruit",
Name:"Green Cactus Fruit",
solid: false,
transparent: true,
shadow: false,
crossShape: true,
cactusFruit:true,
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
needsSupportingBlocks(x,y,z,b,world,dimension)
},
compostChance:0.4,
liquidBreakable:true,
category:"nature"
},
{
name:"redCactusFruit",
Name:"Red Cactus Fruit",
solid: false,
transparent: true,
shadow: false,
crossShape: true,
edible: true,
eatWhenFull: false,
food: 2,
saturation: 1,
cactusFruit:true,
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
needsSupportingBlocks(x,y,z,b,world,dimension)
},
compostChance:0.5,
liquidBreakable:true,
category:"food"
},
{
name:"purpleCactusFruit",
Name:"Purple Cactus Fruit",
solid: false,
transparent: true,
shadow: false,
crossShape: true,
edible: true,
eatWhenFull: false,
food: 3,
saturation: 2,
cactusFruit:true,
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
needsSupportingBlocks(x,y,z,b,world,dimension)
},
compostChance:0.6,
liquidBreakable:true,
category:"food"
},
{
name:"cherry",
Name:"Cherry",
item:true,
edible:true,
eatWhenFull: false,
food: 1,
saturation: 1,
compostChance:0.5,
category:"food"
},
{
name:"cherryLog",
Name:"Cherry Log",
textures:["cherryLogTop","cherryLog"],
woodSound:true,
breakTime:3,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"nature",
log:true
},
{
name:"cherryLogSW",
textures: ["cherryLog","cherryLog","cherryLogTop","cherryLogSW"],
rotate: true,
woodSound:true,
hidden:true
},
{
name:"greenCherryLeaves", //Before minecraft 1.20 update
Name:"Green Cherry Leaves",
transparent: true,
cullFace:"never",
breakTime: 0.3,
type:"plant2",
leaves:true,
drop: function(){
if(rand() > 0.8){
let r = floor(rand(3))
if(r === 0) return "stick"
else if(r === 1) return "cherrySapling"
else return "cherry"
}
},
dropSelfWhenSheared:true,
shearBreakTime:0.05,
burnChance: 0.2,
burnTime: 30,
grassSound: true,
category:"nature",
hidden:true
},
{
name:"cherryLeaves",
Name:"Cherry Leaves",
transparent: true,
cullFace:"never",
breakTime: 0.3,
type:"plant2",
drop: function(){
if(rand() > 0.8){
let r = floor(rand(3))
if(r === 0) return "stick"
else if(r === 1) return "cherrySapling"
else if(rand() > 0.5) return "cherry"
}
},
dropSelfWhenSheared:true,
shearBreakTime:0.05,
burnChance: 0.2,
burnTime: 30,
grassSound: true,
category:"nature"
},
{
name:"cherrySapling",
Name:"Cherry Sapling",
transparent: true,
shadow: false,
solid: false,
crossShape: true,
potCross: true,
category:"nature"
},
{
name:"cherryWood",
Name:"Cherry Wood",
textures: "cherryLog",
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"nature",
log:true
},
/*{
name:"gun",
Name:"gun: something dangerous you should never use",
flatIcon:true,
onuse: function(){
dieMessage = username+" died because he used a gun backwards. guns are dangerous and stuff"
die()
},
useAnywhere:true
},*/
{
name:"slingshot",
Name:"Slingshot",
item:true,
onuse: function(x,y,z, block, replaceItem, useDurability, minusOne,dimension){
var pd = p.direction
world.addEntity(new entities[entityIds.SlingshotShot](p.x,p.y,p.z,pd.x,pd.y,pd.z),false,dimension)
},
useAnywhere:true,
stackSize:1,
category:"tools"
},
{
name:"redstoneTorch",
Name:"Redstone Torch",
transparent: true,
shadow: false,
redstoneTorch: true,
lightLevel: 7,
woodSound:true,
solid:false,
flatIcon:true,
onupdate: function(x,y,z,b,world,sx,sy,sz,dimension){
this.onpowerupdate(x,y,z,null,null,null,null,dimension,world)
if(world.getPower(x,y,z,dimension) === 16){ //is torch on?
var b = world.getBlock(x,y+1,z,dimension)
if(b && !blockData[b].transparent){
world.setBlockPower(x,y+1,z, "strong", "bottom",dimension) //torch is under this block
}
b = world.getBlock(x,y-1,z,dimension)
if(b && blockData[b].name === "redstoneDust"){
world.setPower(x,y-1,z,15,false,dimension)
world.spreadPower(x,y-1,z,15,dimension)
}
}
},
onpowerupdate: function(x,y,z,sx,sy,sz,blockPowerChanged,dimension,world){
var that = this
world.setTimeout(function(){
//find block it's attached to
var me = world.getBlock(x,y,z,dimension)
var ax=x,ay=y,az=z
var wall = that.id | SLAB
var wallOff = that.id | STAIR
switch(me){
case wall | NORTH:
case wallOff | NORTH:
az++
break
case wall | SOUTH:
case wallOff | SOUTH:
az--
break
case wall | EAST:
case wallOff | EAST:
ax++
break
case wall | WEST:
case wallOff | WEST:
ax--
break
default:
ay--
}
var block = world.getBlock(ax,ay,az,dimension)
//see if the torch should be on of off
var on = world.getPower(ax,ay,az,dimension) || world.getBlockPower(ax,ay,az,null,dimension) ? false : true
var target = me
if(on){
switch(me){
case wallOff | NORTH:
target = wall | NORTH
break
case wallOff | SOUTH:
target = wall | SOUTH
break
case wallOff | EAST:
target = wall | EAST
break
case wallOff | WEST:
target = wall | WEST
break
case that.id | CROSS:
target = that.id
}
}else{
switch(me){
case wall | NORTH:
target = wallOff | NORTH
break
case wall | SOUTH:
target = wallOff | SOUTH
break
case wall | EAST:
target = wallOff | EAST
break
case wall | WEST:
target = wallOff | WEST
break
case that.id:
target = that.id | CROSS
}
}
//set it
if(me !== target) {
world.setBlock(x,y,z,target,false,false,false,false,dimension)
if(on){
world.setPower(x,y,z,16,false,dimension)
world.spreadPower(x,y,z,16,dimension)
}else{
world.setPower(x,y,z,0,false,dimension)
world.unspreadPower(x,y,z,16,false,dimension)
}
var b = world.getBlock(x,y+1,z,dimension)
if(b && !blockData[b].transparent){
world.setBlockPower(x,y+1,z, on ? "strong" : null, "bottom",dimension) //torch is under this block
}
b = world.getBlock(x,y-1,z,dimension)
if(b && blockData[b].name === "redstoneDust"){
if(on){
world.setPower(x,y-1,z,15,false,dimension)
world.spreadPower(x,y-1,z,15,dimension)
}else{
world.unspreadPower(x,y-1,z,15,true,dimension)
}
}
}
},tickTime*2, x,y,z,dimension)
},
onset:function(x,y,z,dimension,world){
world.setPower(x,y,z,16,false,dimension)
world.spreadPower(x,y,z,16,dimension)
},
ondelete:function(x,y,z,prevTags,prev,dimension,world){
world.setPower(x,y,z,0,false,dimension)
world.unspreadPower(x,y,z,16,false,dimension)
var b = world.getBlock(x,y+1,z,dimension)
if(b && !blockData[b].transparent){
world.setBlockPower(x,y+1,z, null, "bottom",dimension) //torch is under this block
}
b = world.getBlock(x,y-1,z,dimension)
if(b && blockData[b].name === "redstoneDust"){
world.unspreadPower(x,y-1,z,15,true,dimension)
}
},
category:"redstone"
},
{
name:"redstoneConnector",
Name:"Block That Redstone Dust Connects To",
stoneSound:true,
category:"redstone"
},
{
name:"lever",
Name:"Lever",
transparent:true,
shadow:false,
solid:false,
lever:true,
flatIcon:true,
onclick:function(x,y,z,dimension,world){
var block = world.getBlock(x,y,z,dimension)
var me = blockData[blockIds.lever]
var wall = me.id
var wallOn = me.id | SLAB
var ax = x, ay = y, az = z
var dir
switch(block){
case wall | NORTH:
case wallOn | NORTH:
az++
dir = "south"
break
case wall | SOUTH:
case wallOn | SOUTH:
az--
dir = "north"
break
case wall | EAST:
case wallOn | EAST:
ax++
dir = "east"
break
case wall | WEST:
case wallOn | WEST:
ax--
dir = "west"
break
case me.id | STAIR:
case me.id | CROSS:
ay --
dir = "top"
break
case me.id | TALLCROSS:
case me.id | DOOR:
ay ++
dir = "bottom"
break
}
var target, on
switch(block){
case wall | NORTH:
on = true
target = wallOn | NORTH
break
case wall | SOUTH:
on = true
target = wallOn | SOUTH
break
case wall | EAST:
on = true
target = wallOn | EAST
break
case wall | WEST:
on = true
target = wallOn | WEST
break
case wallOn | NORTH:
on = false
target = wall | NORTH
break
case wallOn | SOUTH:
on = false
target = wall | SOUTH
break
case wallOn | EAST:
on = false
target = wall | EAST
break
case wallOn | WEST:
on = false
target = wall | WEST
break
case me.id | STAIR:
on = true
target = me.id | CROSS
break
case me.id | CROSS:
on = false
target = me.id | STAIR
break
case me.id | TALLCROSS:
on = true
target = me.id | DOOR
break
case me.id | DOOR:
on = false
target = me.id | TALLCROSS
break
}
world.setBlock(x,y,z,target,false,false,false,false,dimension)
if(on){
world.setPower(x,y,z,16,false,dimension)
world.spreadPower(x,y,z,15,dimension)
}else{
world.setPower(x,y,z,0,false,dimension)
world.unspreadPower(x,y,z,16,false,dimension)
}
var a = world.getBlock(ax,ay,az,dimension)
if(a && !blockData[a].transparent){
world.setBlockPower(ax,ay,az,on ? "strong" : null,dir,dimension)
}
},
ondelete:function(x,y,z,prevTags,prevBlock,dimension,world){
if(getTagBits(prevTags,"power",this.id)){
world.unspreadPower(x,y,z,16,false,dimension)
var block = prevBlock
var me = blockData[blockIds.lever]
var wall = me.id
var wallOn = me.id | SLAB
var ax = x, ay = y, az = z
var dir
switch(block){
case wall | NORTH:
case wallOn | NORTH:
az++
dir = "south"
break
case wall | SOUTH:
case wallOn | SOUTH:
az--
dir = "north"
break
case wall | EAST:
case wallOn | EAST:
ax++
dir = "east"
break
case wall | WEST:
case wallOn | WEST:
ax--
dir = "west"
break
case me.id | STAIR:
case me.id | CROSS:
ay --
dir = "top"
break
case me.id | TALLCROSS:
case me.id | DOOR:
ay ++
dir = "bottom"
break
}
var a = world.getBlock(ax,ay,az,dimension)
if(a && !blockData[a].transparent){
world.setBlockPower(ax,ay,az,null,dir,dimension)
}
}
},
category:"redstone"
},
{
name:"repeater",
Name:"Redstone Repeater",
flatIcon:true,
iconTexture:"repeaterIcon",
repeater:true,
transparent:true,
onupdate:function(x,y,z,b,w,sx,sy,sz,dimension){
this.onpowerupdate(x,y,z,null,null,null,null,dimension,w)
},
ondelete:function(x,y,z,prevTags,prevBlock,dimension,world){
world.unspreadPower(x,y,z,16,false,dimension)
world.setBlockPower(x,y,z+1,null,"south",dimension)
world.setBlockPower(x,y,z-1,null,"north",dimension)
world.setBlockPower(x+1,y,z,null,"east",dimension)
world.setBlockPower(x-1,y,z,null,"west",dimension)
},
onpowerupdate:function(x,y,z,sx,sy,sz,blockPowerChanged,dimension,world){
var fx = x, fy = y, fz = z //from
var tx = x, ty = y, tz = z //pointing to
var side //side of block it's pointing to
var block = world.getBlock(x,y,z,dimension)
var d1 = this.id, d2 = this.id | SLAB, d3 = this.id | STAIR, d4 = this.id | DOOR //delay
var D1 = this.id | PANE, D2 = this.id | PORTAL, D3 = this.id | WALLFLAT, D4 = this.id | TRAPDOOROPEN //delay for on repeaters
switch(block){
case d1 | NORTH:
case d2 | NORTH:
case d3 | NORTH:
case d4 | NORTH:
case D1 | NORTH:
case D2 | NORTH:
case D3 | NORTH:
case D4 | NORTH:
fz--
tz++
side = "south"
break
case d1 | SOUTH:
case d2 | SOUTH:
case d3 | SOUTH:
case d4 | SOUTH:
case D1 | SOUTH:
case D2 | SOUTH:
case D3 | SOUTH:
case D4 | SOUTH:
fz++
tz--
side = "north"
break
case d1 | EAST:
case d2 | EAST:
case d3 | EAST:
case d4 | EAST:
case D1 | EAST:
case D2 | EAST:
case D3 | EAST:
case D4 | EAST:
fx--
tx++
side = "east"
break
case d1 | WEST:
case d2 | WEST:
case d3 | WEST:
case d4 | WEST:
case D1 | WEST:
case D2 | WEST:
case D3 | WEST:
case D4 | WEST:
fx++
tx--
side = "west"
break
}
if(fx === x && fy === y && fz === z) return console.log("doesn't match up") //doesn't match up
var delay
switch(block){
case d1 | NORTH:
case d1 | SOUTH:
case d1 | EAST:
case d1 | WEST:
case D1 | NORTH:
case D1 | SOUTH:
case D1 | EAST:
case D1 | WEST:
delay = 1
break
case d2 | NORTH:
case d2 | SOUTH:
case d2 | EAST:
case d2 | WEST:
case D2 | NORTH:
case D2 | SOUTH:
case D2 | EAST:
case D2 | WEST:
delay = 2
break
case d3 | NORTH:
case d3 | SOUTH:
case d3 | EAST:
case d3 | WEST:
case D3 | NORTH:
case D3 | SOUTH:
case D3 | EAST:
case D3 | WEST:
delay = 3
break
case d4 | NORTH:
case d4 | SOUTH:
case d4 | EAST:
case d4 | WEST:
case D4 | NORTH:
case D4 | SOUTH:
case D4 | EAST:
case D4 | WEST:
delay = 4
break
}
if(!delay) return console.log("delay hasn't been set")
var on = false
switch(block){ //todo: make it an if loop
case D1 | NORTH:
case D2 | NORTH:
case D3 | NORTH:
case D4 | NORTH:
case D1 | SOUTH:
case D2 | SOUTH:
case D3 | SOUTH:
case D4 | SOUTH:
case D1 | EAST:
case D2 | EAST:
case D3 | EAST:
case D4 | EAST:
case D1 | WEST:
case D2 | WEST:
case D3 | WEST:
case D4 | WEST:
on = true
}
var tblock = world.getBlock(tx,ty,tz,dimension)
if(tblock && blockData[tblock].name === "redstoneDust"){
if(on){
if(world.getPower(tx,ty,tz,dimension) !== 15){
world.setPower(tx,ty,tz,15,false,dimension)
world.spreadPower(tx,ty,tz,15,dimension)
}
}
}else if(tblock && !blockData[tblock].transparent){
if(on){
world.setBlockPower(tx,ty,tz,"strong",side,dimension)
}else{
world.setBlockPower(tx,ty,tz,null,side,dimension)
}
}
var shouldBeOn = world.getRepeaterPower(x,y,z,fx,fy,fz,dimension) || world.getBlockPower(fx,fy,fz,null,dimension) ? true : false
if(on === shouldBeOn) return
var t = function(){
block = world.getBlock(x,y,z,dimension)
var on = world.getRepeaterPower(x,y,z,fx,fy,fz,dimension) || world.getBlockPower(fx,fy,fz,null,dimension) ? true : false //should it be on?
var isOn = false
switch(block){ //todo: make it an if loop
case D1 | NORTH:
case D2 | NORTH:
case D3 | NORTH:
case D4 | NORTH:
case D1 | SOUTH:
case D2 | SOUTH:
case D3 | SOUTH:
case D4 | SOUTH:
case D1 | EAST:
case D2 | EAST:
case D3 | EAST:
case D4 | EAST:
case D1 | WEST:
case D2 | WEST:
case D3 | WEST:
case D4 | WEST:
isOn = true
}
if(on !== isOn) {
var target
var f = "north"
switch(block){
case d1 | NORTH:
target = D1
break
case d2 | NORTH:
target = D2
break
case d3 | NORTH:
target = D3
break
case d4 | NORTH:
target = D4
break
case D1 | NORTH:
target = d1
break
case D2 | NORTH:
target = d2
break
case D3 | NORTH:
target = d3
break
case D4 | NORTH:
target = d4
break
case d1 | SOUTH:
target = D1, f = "south"
break
case d2 | SOUTH:
target = D2, f = "south"
break
case d3 | SOUTH:
target = D3, f = "south"
break
case d4 | SOUTH:
target = D4, f = "south"
break
case D1 | SOUTH:
target = d1, f = "south"
break
case D2 | SOUTH:
target = d2, f = "south"
break
case D3 | SOUTH:
target = d3, f = "south"
break
case D4 | SOUTH:
target = d4, f = "south"
break
case d1 | EAST:
target = D1, f = "east"
break
case d2 | EAST:
target = D2, f = "east"
break
case d3 | EAST:
target = D3, f = "east"
break
case d4 | EAST:
target = D4, f = "east"
break
case D1 | EAST:
target = d1, f = "east"
break
case D2 | EAST:
target = d2, f = "east"
break
case D3 | EAST:
target = d3, f = "east"
break
case D4 | EAST:
target = d4, f = "east"
break
case d1 | WEST:
target = D1, f = "west"
break
case d2 | WEST:
target = D2, f = "west"
break
case d3 | WEST:
target = D3, f = "west"
break
case d4 | WEST:
target = D4, f = "west"
break
case D1 | WEST:
target = d1, f = "west"
break
case D2 | WEST:
target = d2, f = "west"
break
case D3 | WEST:
target = d3, f = "west"
break
case D4 | WEST:
target = d4, f = "west"
break
}
switch(f){
case "north":
break
case "south":
target |= SOUTH
break
case "east":
target |= EAST
break
case "west":
target |= WEST
}
if(block !== target) world.setBlock(x,y,z,target,false,false,false,false,dimension)
var tblock = world.getBlock(tx,ty,tz,dimension)
if(on){
if(tblock && blockData[tblock].name === "redstoneDust"){
if(world.getPower(tx,ty,tz,dimension) !== 15){
world.setPower(tx,ty,tz,15,false,dimension)
world.spreadPower(tx,ty,tz,15,dimension)
}
}else if(tblock && !blockData[tblock].transparent){
world.setBlockPower(tx,ty,tz,"strong",side,dimension)
}
}else{
if(tblock && blockData[tblock].name === "redstoneDust"){
world.unspreadPower(tx,ty,tz,15,true,dimension)
}else if(tblock && !blockData[tblock].transparent){
world.setBlockPower(tx,ty,tz,null,side,dimension)
}
}
}//end if repeater power changed
}
world.setTimeout(t,tickTime*delay*2, x,y,z,dimension)
},
onclick:function(x,y,z,dimension){
var me = blockData[blockIds.repeater]
var block = world.getBlock(x,y,z,dimension)
var d1 = me.id, d2 = me.id | SLAB, d3 = me.id | STAIR, d4 = me.id | DOOR //delay
var D1 = me.id | PANE, D2 = me.id | PORTAL, D3 = me.id | WALLFLAT, D4 = me.id | TRAPDOOROPEN //delay for on repeaters
var target
switch(block){
case d1 | NORTH:
target = d2 | NORTH
break
case d2 | NORTH:
target = d3 | NORTH
break
case d3 | NORTH:
target = d4 | NORTH
break
case d4 | NORTH:
target = d1 | NORTH
break
case D1 | NORTH:
target = D2 | NORTH
break
case D2 | NORTH:
target = D3 | NORTH
break
case D3 | NORTH:
target = D4 | NORTH
break
case D4 | NORTH:
target = D1 | NORTH
break
case d1 | SOUTH:
target = d2 | SOUTH
break
case d2 | SOUTH:
target = d3 | SOUTH
break
case d3 | SOUTH:
target = d4 | SOUTH
break
case d4 | SOUTH:
target = d1 | SOUTH
break
case D1 | SOUTH:
target = D2 | SOUTH
break
case D2 | SOUTH:
target = D3 | SOUTH
break
case D3 | SOUTH:
target = D4 | SOUTH
break
case D4 | SOUTH:
target = D1 | SOUTH
break
case d1 | EAST:
target = d2 | EAST
break
case d2 | EAST:
target = d3 | EAST
break
case d3 | EAST:
target = d4 | EAST
break
case d4 | EAST:
target = d1 | EAST
break
case D1 | EAST:
target = D2 | EAST
break
case D2 | EAST:
target = D3 | EAST
break
case D3 | EAST:
target = D4 | EAST
break
case D4 | EAST:
target = D1 | EAST
break
case d1 | WEST:
target = d2 | WEST
break
case d2 | WEST:
target = d3 | WEST
break
case d3 | WEST:
target = d4 | WEST
break
case d4 | WEST:
target = d1 | WEST
break
case D1 | WEST:
target = D2 | WEST
break
case D2 | WEST:
target = D3 | WEST
break
case D3 | WEST:
target = D4 | WEST
break
case D4 | WEST:
target = D1 | WEST
break
}
world.setBlock(x,y,z,target,false,false,false,false,dimension)
},
getFacing:function(x,y,z,dimension,world){
var block = world.getBlock(x,y,z,dimension)
var d1 = this.id, d2 = this.id | SLAB, d3 = this.id | STAIR, d4 = this.id | DOOR //delay
var D1 = this.id | PANE, D2 = this.id | PORTAL, D3 = this.id | WALLFLAT, D4 = this.id | TRAPDOOROPEN //delay for on repeaters
var f
switch(block){
case d1 | NORTH:
case d2 | NORTH:
case d3 | NORTH:
case d4 | NORTH:
case D1 | NORTH:
case D2 | NORTH:
case D3 | NORTH:
case D4 | NORTH:
f = "north"
break
case d1 | SOUTH:
case d2 | SOUTH:
case d3 | SOUTH:
case d4 | SOUTH:
case D1 | SOUTH:
case D2 | SOUTH:
case D3 | SOUTH:
case D4 | SOUTH:
f = "south"
break
case d1 | EAST:
case d2 | EAST:
case d3 | EAST:
case d4 | EAST:
case D1 | EAST:
case D2 | EAST:
case D3 | EAST:
case D4 | EAST:
f = "east"
break
case d1 | WEST:
case d2 | WEST:
case d3 | WEST:
case d4 | WEST:
case D1 | WEST:
case D2 | WEST:
case D3 | WEST:
case D4 | WEST:
f = "west"
break
}
return f
},
canHavePower:function(/*repeater*/rx,ry,rz,/*other thing*/x,y,z,dimension,world){
var tx = rx, ty = ry, tz = rz
var block = world.getBlock(rx,ry,rz,dimension)
var d1 = this.id, d2 = this.id | SLAB, d3 = this.id | STAIR, d4 = this.id | DOOR //delay
var D1 = this.id | PANE, D2 = this.id | PORTAL, D3 = this.id | WALLFLAT, D4 = this.id | TRAPDOOROPEN //delay for on repeaters
switch(block){
case d1 | NORTH:
case d2 | NORTH:
case d3 | NORTH:
case d4 | NORTH:
case D1 | NORTH:
case D2 | NORTH:
case D3 | NORTH:
case D4 | NORTH:
tz++
break
case d1 | SOUTH:
case d2 | SOUTH:
case d3 | SOUTH:
case d4 | SOUTH:
case D1 | SOUTH:
case D2 | SOUTH:
case D3 | SOUTH:
case D4 | SOUTH:
tz--
break
case d1 | EAST:
case d2 | EAST:
case d3 | EAST:
case d4 | EAST:
case D1 | EAST:
case D2 | EAST:
case D3 | EAST:
case D4 | EAST:
tx++
break
case d1 | WEST:
case d2 | WEST:
case d3 | WEST:
case d4 | WEST:
case D1 | WEST:
case D2 | WEST:
case D3 | WEST:
case D4 | WEST:
tx--
break
}
var on = false
switch(block){ //todo: make it an if loop
case D1 | NORTH:
case D2 | NORTH:
case D3 | NORTH:
case D4 | NORTH:
case D1 | SOUTH:
case D2 | SOUTH:
case D3 | SOUTH:
case D4 | SOUTH:
case D1 | EAST:
case D2 | EAST:
case D3 | EAST:
case D4 | EAST:
case D1 | WEST:
case D2 | WEST:
case D3 | WEST:
case D4 | WEST:
on = true
}
if(on && tx === x && ty === y && tz === z){
return 15
}
return 0
},
category:"redstone"
},
{
name:"piston",
Name:"Piston",
textures:["pistonBack","pistonFront","pistonSide"],
piston:true,
headSideTexture:"pistonHeadSide",
frontOpenTexture:"pistonFrontOpen",
headBackTexture:"pistonFront",
onpowerupdate: function(x,y,z,sx,sy,sz,blockPowerChanged,dimension,world){
var block = world.getBlock(x,y,z,dimension)
var extended = false, facing, attachedHead = false
switch(block){
case this.id:
facing = "top"
break
case this.id | FLIP:
facing = "bottom"
break
case this.id | SLAB | NORTH:
facing = "north"
break
case this.id | SLAB | SOUTH:
facing = "south"
break
case this.id | SLAB | EAST:
facing = "east"
break
case this.id | SLAB | WEST:
facing = "west"
break
case this.id | TALLCROSS:
facing = "top"
extended = true
break
case this.id | TALLCROSS | FLIP:
facing = "bottom"
extended = true
break
case this.id | PORTAL | NORTH:
facing = "north"
extended = true
break
case this.id | PORTAL | SOUTH:
facing = "south"
extended = true
break
case this.id | PORTAL | EAST:
facing = "east"
extended = true
break
case this.id | PORTAL | WEST:
facing = "west"
extended = true
break
default:
return //parts like piston heads shouldn't do the calculations when power changes
}
if(extended){
switch(facing){
case "top":
if(world.getBlock(x,y+1,z,dimension) === (this.id | STAIR)) attachedHead = true
break
case "bottom":
if(world.getBlock(x,y-1,z,dimension) === (this.id | STAIR | FLIP)) attachedHead = true
break
case "north":
if(world.getBlock(x,y,z-1,dimension) === (this.id | DOOR | NORTH)) attachedHead = true
break
case "south":
if(world.getBlock(x,y,z+1,dimension) === (this.id | DOOR | SOUTH)) attachedHead = true
break
case "east":
if(world.getBlock(x-1,y,z,dimension) === (this.id | DOOR | EAST)) attachedHead = true
break
case "west":
if(world.getBlock(x+1,y,z,dimension) === (this.id | DOOR | WEST)) attachedHead = true
break
}
}
var power = world.getRedstonePower(x,y,z,dimension) || world.getSurroundingBlockPower(x,y,z,dimension)
if(power && !extended){
this.extend(x,y,z,facing,dimension,world)
}else if(!power && extended && attachedHead){
this.retract(x,y,z,facing,dimension,world)
}
},
onupdate:function(x,y,z,b,w,sx,sy,sz,dimension){ //onupdate is run when placed
this.onpowerupdate(x,y,z,null,null,null,null,dimension,w)
},
onbreak:function(x,y,z, prevBlock, prevTags,dimension,world){
//dissapear if it isn't connected (it = piston heads and piston open)
let tx = x, ty = y, tz = z
switch(prevBlock){
case this.id | TALLCROSS:
case this.id | STAIR | FLIP:
ty++
break
case this.id | TALLCROSS | FLIP:
case this.id | STAIR:
ty--
break
case this.id | PORTAL | NORTH:
case this.id | DOOR | SOUTH:
tz--
break
case this.id | PORTAL | SOUTH:
case this.id | DOOR | NORTH:
tz++
break
case this.id | PORTAL | EAST:
case this.id | DOOR | WEST:
tx--
break
case this.id | PORTAL | WEST:
case this.id | DOOR | EAST:
tx++
break
default:
return //unextended pistons
}
world.setBlock(tx,ty,tz,0,false,false,false,false,dimension)
},
extend:function(x,y,z, facing,dimension,world){
var tx = x, ty = y, tz = z, mx = 0, my = 0, mz = 0
var head, headCut, open
switch(facing){
case "top":
open = this.id | TALLCROSS
head = this.id | STAIR
headCut = this.id | CROSS
ty ++
my = 1
break
case "bottom":
open = this.id | TALLCROSS | FLIP
head = this.id | STAIR | FLIP
headCut = this.id | CROSS | FLIP
ty --
my = -1
break
case "north":
open = this.id | PORTAL | NORTH
head = this.id | DOOR | NORTH
headCut = this.id | PANE | NORTH
tz --
mz = -1
break
case "south":
open = this.id | PORTAL | SOUTH
head = this.id | DOOR | SOUTH
headCut = this.id | PANE | SOUTH
tz ++
mz = 1
break
case "east":
open = this.id | PORTAL | EAST
head = this.id | DOOR | EAST
headCut = this.id | PANE | EAST
tx --
mx = -1
break
case "west":
open = this.id | PORTAL | WEST
head = this.id | DOOR | WEST
headCut = this.id | PANE | WEST
tx ++
mx = 1
break
default:
return console.log("oh no! piston isn't facing anywhere")
}
var push = getPistonPushedBlocks(x,y,z,mx,my,mz,dimension,world)
if(push === false) return
world.setBlock(x,y,z,open,false,false,false,false,dimension)
var e = new entities[entityIds.MovingBlock](headCut,x,y,z,tx,ty,tz, tickTime*2, true)
e.endAs = head
world.addEntity(e,false,dimension)
world.setTimeout(function(){
e.changeBlock(head)
}, tickTime*1.5)
for(var i=0; i<push.length; i+=4){
var bx = push[i], by = push[i+1], bz = push[i+2]
var tags = world.getTags(bx,by,bz,dimension)
world.setBlock(bx,by,bz,0,false,false,false,false,dimension)
world.addEntity(new entities[entityIds.MovingBlock](push[i+3],bx,by,bz,bx+mx,by+my,bz+mz, tickTime*2, true, tags),false,dimension)
}
},
retract:function(x,y,z, facing,dimension,world){
var tx = x, ty = y, tz = z
var head, headCut, body
switch(facing){
case "top":
body = this.id
head = this.id | STAIR
headCut = this.id | CROSS
ty ++
break
case "bottom":
body = this.id | FLIP
head = this.id | STAIR | FLIP
headCut = this.id | CROSS | FLIP
ty --
break
case "north":
body = this.id | SLAB | NORTH
head = this.id | DOOR | NORTH
headCut = this.id | PANE | NORTH
tz --
break
case "south":
body = this.id | SLAB | SOUTH
head = this.id | DOOR | SOUTH
headCut = this.id | PANE | SOUTH
tz ++
break
case "east":
body = this.id | SLAB | EAST
head = this.id | DOOR | EAST
headCut = this.id | PANE | EAST
tx --
break
case "west":
body = this.id | SLAB | WEST
head = this.id | DOOR | WEST
headCut = this.id | PANE | WEST
tx ++
break
default:
return console.log("oh no! piston isn't facing anywhere")
}
world.setBlock(tx,ty,tz,0,false,false,false,false,dimension)
var e = new entities[entityIds.MovingBlock](head,tx,ty,tz,x,y,z, tickTime*2)
world.addEntity(e,false,dimension)
world.setTimeout(function(){
e.changeBlock(headCut)
}, tickTime*0.5)
world.setTimeout(function(){
world.setBlock(x,y,z,body,false,false,false,false,dimension)
}, tickTime*2)
},
category:"redstone"
},
{
name:"smoothQuartz",
Name:"Smooth Quartz Block",
textures:"quartzBlockBottom",
stoneSound:true,
category:"build"
},
{
name:"pistonSticky",
Name:"Sticky Piston",
textures:["pistonBack","pistonFrontSticky","pistonSide"],
piston:true,
headSideTexture:"pistonHeadSide",
frontOpenTexture:"pistonFrontOpen",
headBackTexture:"pistonFront",
category:"redstone",
onpowerupdate: function(x,y,z,sx,sy,sz,blockPowerChanged,dimension,world){
var block = world.getBlock(x,y,z,dimension)
var extended = false, facing, attachedHead = false
switch(block){
case this.id:
facing = "top"
break
case this.id | FLIP:
facing = "bottom"
break
case this.id | SLAB | NORTH:
facing = "north"
break
case this.id | SLAB | SOUTH:
facing = "south"
break
case this.id | SLAB | EAST:
facing = "east"
break
case this.id | SLAB | WEST:
facing = "west"
break
case this.id | TALLCROSS:
facing = "top"
extended = true
break
case this.id | TALLCROSS | FLIP:
facing = "bottom"
extended = true
break
case this.id | PORTAL | NORTH:
facing = "north"
extended = true
break
case this.id | PORTAL | SOUTH:
facing = "south"
extended = true
break
case this.id | PORTAL | EAST:
facing = "east"
extended = true
break
case this.id | PORTAL | WEST:
facing = "west"
extended = true
break
default:
return //parts like piston heads shouldn't do the calculations when power changes
}
if(extended){
switch(facing){
case "top":
if(world.getBlock(x,y+1,z,dimension) === (this.id | STAIR)) attachedHead = true
break
case "bottom":
if(world.getBlock(x,y-1,z,dimension) === (this.id | STAIR | FLIP)) attachedHead = true
break
case "north":
if(world.getBlock(x,y,z-1,dimension) === (this.id | DOOR | NORTH)) attachedHead = true
break
case "south":
if(world.getBlock(x,y,z+1,dimension) === (this.id | DOOR | SOUTH)) attachedHead = true
break
case "east":
if(world.getBlock(x-1,y,z,dimension) === (this.id | DOOR | EAST)) attachedHead = true
break
case "west":
if(world.getBlock(x+1,y,z,dimension) === (this.id | DOOR | WEST)) attachedHead = true
break
}
}
var power = world.getRedstonePower(x,y,z,dimension) || world.getSurroundingBlockPower(x,y,z,dimension)
if(power && !extended){
this.extend(x,y,z,facing,dimension,world)
}else if(!power && extended && attachedHead){
this.retract(x,y,z,facing,dimension,world)
}
},
onupdate:function(x,y,z,b,w,sx,sy,sz,dimension){ //onupdate is run when placed
this.onpowerupdate(x,y,z,null,null,null,null,dimension,w)
},
onbreak:function(x,y,z, prevBlock, prevTags,dimension,world){
//dissapear if it isn't connected (it = piston heads and piston open)
let tx = x, ty = y, tz = z
switch(prevBlock){
case this.id | TALLCROSS:
case this.id | STAIR | FLIP:
ty++
break
case this.id | TALLCROSS | FLIP:
case this.id | STAIR:
ty--
break
case this.id | PORTAL | NORTH:
case this.id | DOOR | SOUTH:
tz--
break
case this.id | PORTAL | SOUTH:
case this.id | DOOR | NORTH:
tz++
break
case this.id | PORTAL | EAST:
case this.id | DOOR | WEST:
tx--
break
case this.id | PORTAL | WEST:
case this.id | DOOR | EAST:
tx++
break
default:
return //unextended pistons
}
world.setBlock(tx,ty,tz,0,false,false,false,false,dimension)
},
extend:function(x,y,z, facing,dimension,world){
var tx = x, ty = y, tz = z, mx = 0, my = 0, mz = 0
var head, headCut, open
switch(facing){
case "top":
open = this.id | TALLCROSS
head = this.id | STAIR
headCut = this.id | CROSS
ty ++
my = 1
break
case "bottom":
open = this.id | TALLCROSS | FLIP
head = this.id | STAIR | FLIP
headCut = this.id | CROSS | FLIP
ty --
my = -1
break
case "north":
open = this.id | PORTAL | NORTH
head = this.id | DOOR | NORTH
headCut = this.id | PANE | NORTH
tz --
mz = -1
break
case "south":
open = this.id | PORTAL | SOUTH
head = this.id | DOOR | SOUTH
headCut = this.id | PANE | SOUTH
tz ++
mz = 1
break
case "east":
open = this.id | PORTAL | EAST
head = this.id | DOOR | EAST
headCut = this.id | PANE | EAST
tx --
mx = -1
break
case "west":
open = this.id | PORTAL | WEST
head = this.id | DOOR | WEST
headCut = this.id | PANE | WEST
tx ++
mx = 1
break
default:
return console.log("oh no! piston isn't facing anywhere")
}
var push = getPistonPushedBlocks(x,y,z,mx,my,mz,dimension,world)
if(push === false) return
world.setBlock(x,y,z,open,false,false,false,false,dimension)
var e = new entities[entityIds.MovingBlock](headCut,x,y,z,tx,ty,tz, tickTime*2, true)
for(var i=0; i<push.length; i+=4){
var bx = push[i], by = push[i+1], bz = push[i+2]
var tags = world.getTags(bx,by,bz,dimension)
world.setBlock(bx,by,bz,0,false,false,false,false,dimension)
world.addEntity(new entities[entityIds.MovingBlock](push[i+3],bx,by,bz,bx+mx,by+my,bz+mz, tickTime*2, true, tags),false,dimension)
}
e.endAs = head
world.addEntity(e,false,dimension)
world.setTimeout(function(){
e.changeBlock(head)
}, tickTime*1.5)
},
retract:function(x,y,z, facing,dimension,world){
var tx = x, ty = y, tz = z, mx = 0, my = 0, mz = 0
var head, headCut, body
switch(facing){
case "top":
body = this.id
head = this.id | STAIR
headCut = this.id | CROSS
ty ++
my = 1
break
case "bottom":
body = this.id | FLIP
head = this.id | STAIR | FLIP
headCut = this.id | CROSS | FLIP
ty --
my = -1
break
case "north":
body = this.id | SLAB | NORTH
head = this.id | DOOR | NORTH
headCut = this.id | PANE | NORTH
tz --
mz = -1
break
case "south":
body = this.id | SLAB | SOUTH
head = this.id | DOOR | SOUTH
headCut = this.id | PANE | SOUTH
tz ++
mz = 1
break
case "east":
body = this.id | SLAB | EAST
head = this.id | DOOR | EAST
headCut = this.id | PANE | EAST
tx --
mx = -1
break
case "west":
body = this.id | SLAB | WEST
head = this.id | DOOR | WEST
headCut = this.id | PANE | WEST
tx ++
mx = 1
break
default:
return console.log("oh no! piston isn't facing anywhere")
}
world.setBlock(tx,ty,tz,0,false,false,false,false,dimension)
var e = new entities[entityIds.MovingBlock](head,tx,ty,tz,x,y,z, tickTime*2)
world.addEntity(e,false,dimension)
world.setTimeout(function(){
e.changeBlock(headCut)
}, tickTime*0.5)
world.setTimeout(function(){
world.setBlock(x,y,z,body,false,false,false,false,dimension)
}, tickTime*2)
var pull = getPistonPulledBlocks(x,y,z,mx,my,mz,dimension,world)
if(pull){
for(var i=0; i<pull.length; i+=4){
var bx = pull[i], by = pull[i+1], bz = pull[i+2]
var tags = world.getTags(bx,by,bz,dimension)
world.setBlock(bx,by,bz,0,false,false,false,false,dimension)
world.addEntity(new entities[entityIds.MovingBlock](pull[i+3],bx,by,bz,bx-mx,by-my,bz-mz, tickTime*2, true, tags),false,dimension)
}
}
}
},
{
name:"observer",
Name:"Observer",
textures:["observerTop","observerTop","observerBack","observerFront","observerSide","observerSide"],
blastResistance:3.5,
breakTime:17.5,
getFacing:function(x,y,z,dimension,world){
var block = world.getBlock(x,y,z,dimension)
var facing
switch(block){
case this.id | NORTH:
case this.id | STAIR | NORTH:
facing = "north"
break
case this.id | SOUTH:
case this.id | STAIR | SOUTH:
facing = "south"
break
case this.id | EAST:
case this.id | STAIR | EAST:
facing = "east"
break
case this.id | WEST:
case this.id | STAIR | WEST:
facing = "west"
break
case this.id | SLAB:
case this.id | CROSS:
facing = "bottom"
break
case this.id | SLAB | FLIP:
case this.id | CROSS | FLIP:
facing = "top"
break
default:
return
}
return facing
},
detected:function(x,y,z,sx,sy,sz,world, detected = false,dimension){ //if detected is true, it will send a signal no matter what
var block = world.getBlock(x,y,z,dimension)
var facing, tx = 0, ty = 0, tz = 0, onBlock
switch(block){
case this.id | NORTH:
facing = "north"
tz = -1
onBlock = this.id | STAIR | NORTH
break
case this.id | SOUTH:
facing = "south"
tz = 1
onBlock = this.id | STAIR | SOUTH
break
case this.id | EAST:
facing = "east"
tx = -1
onBlock = this.id | STAIR | EAST
break
case this.id | WEST:
facing = "west"
tx = 1
onBlock = this.id | STAIR | WEST
break
case this.id | SLAB:
facing = "bottom"
ty = -1
onBlock = this.id | CROSS
break
case this.id | SLAB | FLIP:
facing = "top"
ty = 1
onBlock = this.id | CROSS | FLIP
break
default:
return
}
if(!(x+tx === sx && y+ty === sy && z+tz === sz) && !detected) return
world.setTimeout(function(){
var curBlock = world.getBlock(x,y,z,dimension)
if(!(curBlock && blockData[curBlock].name === "observer")) return
world.setBlock(x,y,z,onBlock, false,true,false,false,dimension)
var blockBehind = world.getBlock(x-tx,y-ty,z-tz,dimension)
if(blockBehind && blockData[blockBehind].name === "redstoneDust"){
world.setPower(x-tx,y-ty,z-tz, 15,false,dimension)
world.spreadPower(x-tx,y-ty,z-tz, 15,dimension)
}
world.setTimeout(function(){
var curBlock = world.getBlock(x,y,z,dimension)
if(!(curBlock && blockData[curBlock].name === "observer")) return
world.setBlock(x,y,z,block, false,true,false,false,dimension)
world.unspreadPower(x-tx,y-ty,z-tz, 15, true,dimension)
}, tickTime*2)
}, tickTime, x,y,z,dimension)
},
onupdate:function(x,y,z,block,world,sx,sy,sz,dimension){
this.detected(x,y,z,sx,sy,sz,world,false,dimension)
},
onset:function(x,y,z,dimension,world){
this.detected(x,y,z,x,y,z,world,true,dimension)
},
canHavePower:function(rx,ry,rz, x,y,z, dimension,world){
var block = world.getBlock(rx,ry,rz,dimension)
var tx = 0, ty = 0, tz = 0
switch(block){
case this.id | STAIR | NORTH:
tz = -1
break
case this.id | STAIR | SOUTH:
tz = 1
break
case this.id | STAIR | EAST:
tx = -1
break
case this.id | STAIR | WEST:
tx = 1
break
case this.id | CROSS:
ty = -1
break
case this.id | CROSS | FLIP:
ty = 1
break
default:
return
}
if(rx-tx === x && ry-ty === y && rz-tz === z) return 15
return 0
},
category:"redstone"
},
{
name:"string",
Name:"String",
item:true,
category:"items"
},
{
name:"redDye",
Name:"Red Dye",
item:true,
dye:"red",
category:"items"
},
{
name:"lightGrayDye",
Name:"Light Gray Dye",
item:true,
dye:"lightGray",
category:"items"
},
{
name:"lightBlueDye",
Name:"Light Blue Dye",
item:true,
dye:"lightBlue",
category:"items"
},
{
name:"magentaDye",
Name:"Magenta Dye",
item:true,
dye:"magenta",
category:"items"
},
{
name:"yellowDye",
Name:"Yellow Dye",
item:true,
dye:"yellow",
category:"items"
},
{
name:"purpleDye",
Name:"Purple Dye",
item:true,
dye:"purple",
category:"items"
},
{
name:"orangeDye",
Name:"Orange Dye",
item:true,
dye:"orange",
category:"items"
},
{
name:"whiteDye",
Name:"White Dye",
item:true,
dye:"white",
category:"items"
},
{
name:"greenDye",
Name:"Green Dye",
item:true,
dye:"green",
category:"items"
},
{
name:"brownDye",
Name:"Brown Dye",
item:true,
dye:"brown",
category:"items"
},
{
name:"blackDye",
Name:"Black Dye",
item:true,
dye:"black",
category:"items"
},
{
name:"pinkDye",
Name:"Pink Dye",
item:true,
dye:"pink",
category:"items"
},
{
name:"limeDye",
Name:"Lime Dye",
item:true,
dye:"lime",
category:"items"
},
{
name:"grayDye",
Name:"Gray Dye",
item:true,
dye:"gray",
category:"items"
},
{
name:"cyanDye",
Name:"Cyan Dye",
item:true,
dye:"cyan",
category:"items"
},
{
name:"blueDye",
Name:"Blue Dye",
item:true,
dye:"blue",
category:"items"
},
{
name:"endPortal",
flatIcon:true,
solid:false,
transparent:true,
blastResistance: 3600000,
lightLevel:15,
pistonPush:false,
pistonPull:false,
hidden:true,
drop:"air",
ontouch: function(){
if(!thisSceneCurrent) return
if(p.dimension === ""){
let x = round(rand(-64,64))
let z = round(rand(-64,64))
p.x = x
p.z = z
}else{
p.x = world.spawnPoint.x
p.y = world.spawnPoint.y
p.z = world.spawnPoint.z
}
fromEndPortal = true
goToDimension(p.dimension === "end" ? "" : "end")
playSound("block.portal.travel")
if(multiplayer) send({type:"playSound", data:"block.portal.travel", x:p.x,y:p.y,z:p.z})
achievment("Into the End")
if(p.dimension === "" && !didEndPoem && !cheats){
doEndPoem = didEndPoem = true
changeScene("endPoem")
releasePointer()
endPoemVideo.classList.remove("hidden")
endPoemVideo.currentTime = 0
endPoemVideo.onended = () => {
doEndPoem = false
endPoemVideo.classList.add("hidden")
endPoemVideo.pause()
}
endPoemVideo.play()
}
},
doneLoading:function(){
fromEndPortal = false
if(p.dimension === "end"){
p.y = world.getTop(p.x,p.z,p.dimension)+p.bottomH
if(p.y < 25) p.y = 25
if(!world.getBlock(p.x,floor(p.y-p.bottomH),p.z,p.dimension)){
world.setBlock(p.x,floor(p.y-p.bottomH),p.z,blockIds.obsidian,false,false,false,false,p.dimension)
}
let top = world.getTop(0,0,"end")
//pillar
world.setBlock(0,top+1,0,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(0,top+2,0,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(0,top+3,0,blockIds.bedrock,false,false,false,false,"end")
//torches
world.setBlock(0,top+2,-1,blockIds.torch|SLAB|NORTH,false,false,false,false,"end")
world.setBlock(0,top+2,1,blockIds.torch|SLAB|SOUTH,false,false,false,false,"end")
world.setBlock(-1,top+2,0,blockIds.torch|SLAB|EAST,false,false,false,false,"end")
world.setBlock(1,top+2,0,blockIds.torch|SLAB|WEST,false,false,false,false,"end")
//base
world.setBlock(-1,top,-1,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(-1,top,0,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(-1,top,1,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(0,top,-1,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(0,top,0,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(0,top,1,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(1,top,-1,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(1,top,0,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(1,top,1,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(-1,top,-2,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(0,top,-2,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(1,top,-2,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(-1,top,2,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(0,top,2,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(1,top,2,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(2,top,-1,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(2,top,0,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(2,top,1,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(-2,top,-1,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(-2,top,0,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(-2,top,1,blockIds.bedrock,false,false,false,false,"end")
//side
world.setBlock(-1,top+1,-3,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(0,top+1,-3,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(1,top+1,-3,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(-1,top+1,3,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(0,top+1,3,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(1,top+1,3,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(-3,top+1,-1,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(-3,top+1,0,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(-3,top+1,1,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(3,top+1,-1,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(3,top+1,0,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(3,top+1,1,blockIds.bedrock,false,false,false,false,"end")
//side corners
world.setBlock(-2,top+1,-2,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(2,top+1,-2,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(-2,top+1,2,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(2,top+1,2,blockIds.bedrock,false,false,false,false,"end")
world.setBlock(0,top+4,0,blockIds.oakSign,false,false,false,false,"end")
const text = atob("QmV3YXJlIHRoZQpvbmUgdGhhdApyb2xscy4=")
world.setTags(0, top+4, 0, {rot:0,text,text2:text}, false, "end")
}
}
},
{
name:"thatch",
Name:"Thatch",
type:"plant2",
burnChance: 0.2,
burnTime: 20,
compostChance:0.85,
category:"build"
},
{
name:"pearlescentFroglight",
Name:"Pearlescent Froglight",
textures:["pearlescentFroglightTop","pearlescentFroglightSide"],
lightLevel:15,
shadow:false,
category:"nature"
},
{
name:"verdantFroglight",
Name:"Verdant Froglight",
textures:["verdantFroglightTop","verdantFroglightSide"],
lightLevel:15,
shadow:false,
category:"nature"
},
{
name:"ochreFroglight",
Name:"Ochre Froglight",
textures:["ochreFroglightTop","ochreFroglightSide"],
lightLevel:15,
shadow:false,
category:"nature"
},
{
name:"mangroveLeaves",
Name:"Mangrove Leaves",
transparent: true,
cullFace:"never",
breakTime: 0.3,
type:"plant2",
leaves:true,
drop: function(){
if(rand() > 0.8){
let r = floor(rand(3))
if(r === 0) return "stick"
else if(r === 1) return ""//mangrove propagule here
}
},
dropSelfWhenSheared:true,
shearBreakTime:0.05,
burnChance: 0.2,
burnTime: 30,
grassSound: true,
category:"nature"
},
{
name:"mangroveLog",
Name:"Mangrove Log",
textures:["mangroveLogTop","mangroveLog"],
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"nature",
log:true
},
{
name:"strippedMangroveLog",
Name:"Stripped Mangrove Log",
textures:["strippedMangroveLogTop","strippedMangroveLog"],
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"build",
log:true
},
{
name:"mangroveLogSW",
textures: ["mangroveLog","mangroveLog","mangroveLogTop","mangroveLogSW"],
rotate: true, woodSound:true, hidden:true
},
{
name:"strippedMangroveLogSW",
textures: ["strippedMangroveLog","strippedMangroveLog","strippedMangroveLogTop","strippedMangroveLogSW"],
rotate: true, woodSound:true, hidden:true
},
{name:"mangrovePlanks", Name:"Mangrove Planks", type:"wood", category:"build",breakTime:3, woodSound:true, burnChance:0.1, burnTime:40},
{ 
name: "mangroveDoor",
Name:"Mangrove Door",
transparent: true,
shadow: false,
textures: "mangroveDoorBottom",
door:true,
woodSound:true,
breakTime:4.5,
type:"wood",
category:"build"
},
{ 
name: "mangroveTrapdoor",
Name:"Mangrove Trapdoor",
transparent: true,
trapdoor: true,
woodSound: true,
category:"build"
},
{
name:"mangroveButton",
Name: "Mangrove Button",
textures:"mangrovePlanks",
button:true,
transparent: true,
shadow:false,
category:"redstone"
},
{
name: "mangrovePressurePlate",
Name: "Mangrove Pressure Plate",
textures: "mangrovePlanks",
pressurePlate: true,
breakTime:0.75,
type:"wood",
category:"redstone"
},
{
name:"mangroveFenceGate",
Name:"Mangrove Fence Gate",
textures:"mangrovePlanks",
fenceGate:true,
breakTime:3,
woodSound:true,
type:"wood",
category:"build"
},
{
name:"mangroveRoots",
textures:["mangroveRootsTop","mangroveRootsSide"],
transparent:true,
type:"wood",
breakTime:1.05,
blastResistance:0.7,
cullFace:"never",
compostChance:0.3,
category:"nature"
},
{
name:"muddyMangroveRoots",
textures:["muddyMangroveRootsTop","muddyMangroveRootsSide"],
type:"wood",
breakTime:1.05,
blastResistance:0.7,
category:"nature"
},
{
name: "mangroveWood",
Name:"Mangrove Wood",
textures: "mangroveLog",
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"nature",
log:true
},
{
name: "strippedMangroveWood",
Name:"Stripped Mangrove Wood",
textures: "strippedMangroveLog",
breakTime:3,
woodSound:true,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"build"
},
{
name:"mud",
Name:"Mud",
breakTime:0.75,
blastResistance:0.5,
type:"ground",
digSound: ["block.mud.break1", "block.mud.break2", "block.mud.break3", "block.mud.break4", "block.mud.break5", "block.mud.break6"],
stepSound: ["block.mud.step1", "block.mud.step2","block.mud.step3","block.mud.step4","block.mud.step5","block.mud.step6"],
category:"nature"
},
{
name:"mudBricks",
Name:"Mud Bricks",
category:"build"
},
{
name:"packedMud",
Name:"Packed Mud",
randomRotate:true,randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true,
category:"build"
},
{
name:"reinforcedDeepslate",
textures:["reinforcedDeepslateBottom","reinforcedDeepslateTop","reinforcedDeepslateSide"],
blastResistance:1200,
breakTime:82.5,
pistonPush:false,
pistonPull:false,
category:"build"
},
{
name:"redRedstoneLamp",
Name:"Red Redstone Lamp",
textures:"redstoneLamp",
onpowerupdate:function(x,y,z,sx,sy,sz,blockPowerChanged,dimension,world){
var power = world.getRedstonePower(x,y,z,dimension) || world.getSurroundingBlockPower(x,y,z,dimension)
var block = this.id
if(power){
block = this.id | SLAB
}
if(world.getBlock(x,y,z,dimension) !== block) world.setBlock(x,y,z,block,false,false,false,false,dimension)
},
onset:function(x,y,z,dimension,world){
this.onpowerupdate(x,y,z,null,null,null,null,dimension,world)
},
coloredRedstoneLamp:true,
category:"redstone"
},
{
name:"yellowRedstoneLamp",
Name:"Yellow Redstone Lamp",
textures:"redstoneLamp",
onpowerupdate:function(x,y,z,sx,sy,sz,blockPowerChanged,dimension,world){
var power = world.getRedstonePower(x,y,z,dimension) || world.getSurroundingBlockPower(x,y,z,dimension)
var block = this.id
if(power){
block = this.id | SLAB
}
if(world.getBlock(x,y,z,dimension) !== block) world.setBlock(x,y,z,block,false,false,false,false,dimension)
},
onset:function(x,y,z,dimension,world){
this.onpowerupdate(x,y,z,null,null,null,null,dimension,world)
},
coloredRedstoneLamp:true,
category:"redstone"
},
{
name:"greenRedstoneLamp",
Name:"Green Redstone Lamp",
textures:"redstoneLamp",
onpowerupdate:function(x,y,z,sx,sy,sz,blockPowerChanged,dimension,world){
var power = world.getRedstonePower(x,y,z,dimension) || world.getSurroundingBlockPower(x,y,z,dimension)
var block = this.id
if(power){
block = this.id | SLAB
}
if(world.getBlock(x,y,z,dimension) !== block) world.setBlock(x,y,z,block,false,false,false,false,dimension)
},
onset:function(x,y,z,dimension,world){
this.onpowerupdate(x,y,z,null,null,null,null,dimension,world)
},
coloredRedstoneLamp:true,
category:"redstone"
},
{
name:"blueRedstoneLamp",
Name:"Blue Redstone Lamp",
textures:"redstoneLamp",
onpowerupdate:function(x,y,z,sx,sy,sz,blockPowerChanged,dimension,world){
var power = world.getRedstonePower(x,y,z,dimension) || world.getSurroundingBlockPower(x,y,z,dimension)
var block = this.id
if(power){
block = this.id | SLAB
}
if(world.getBlock(x,y,z,dimension) !== block) world.setBlock(x,y,z,block,false,false,false,false,dimension)
},
onset:function(x,y,z,dimension,world){
this.onpowerupdate(x,y,z,null,null,null,null,dimension,world)
},
coloredRedstoneLamp:true,
category:"redstone"
},
{
name:"soulFire",
fire:true,
damage:2,
burnEnt:true,
transparent:true,
shadow:false,
solid:false,
lightLevel:15,
ambientSound:"block.fire.fire",
temperature:20,
shade:false,
smoothLight:false,
hidden:true,
noHitbox:true,
getAttached:function(x,y,z,block,dimension,getBlockOnly,world){
var ax = x, ay = y, az = z
switch(block){
case this.id:
ay--
break
case this.id | STAIR:
ay++
break
case this.id | SLAB | NORTH:
az++
break
case this.id | SLAB | SOUTH:
az--
break
case this.id | SLAB | EAST:
ax++
break
case this.id | SLAB | WEST:
ax--
break
}
var attached = world.getBlock(ax,ay,az,dimension)
if(getBlockOnly) return attached
else return [attached,ax,ay,az]
},
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
var block = this.getAttached(x,y,z,b,dimension,true,world)
if(!block || !blockData[block].canHaveSoulFire) world.setBlock(x,y,z,0,false,false,false,false,dimension)
},
},
{
name:"sweetBerries",
Name:"Sweet Berries (they're spiky)",
item:true,
edible:true,
food:4,
saturation: 1.2,
eatResult: "stick",
useAs: "sweetBerryBush",
compostChance:0.3,
category:"food"
},
{
name:"sweetBerryBush",
textures:"sweetBerryBushStage0",
textures1:new Array(6).fill("sweetBerryBushStage1"),
textures2:new Array(6).fill("sweetBerryBushStage2"),
textures3:new Array(6).fill("sweetBerryBushStage3"),
flatIcon:true,
solid: false,
transparent: true,
shadow: false,
smoothLight:false,
hidden:true,
drop:"sweetBerries",
liquidBreakable:"drop",
category:"nature"
},
{
name:"smallDripleaf",
Name:"Small Dripleaf",
textures:"smallDripleafStemBottom",
shapeName:"smallDripleaf",
solid: false,
transparent: true,
shadow: false,
smoothLight:false,
liquidBreakable:"drop",
category:"nature"
},
{
name:"bigDripleaf",
Name:"Big Dripleaf",
textures:"bigDripleafStem",
shapeName:"bigDripleaf",
crossShape:true,
transparent: true,
shadow: false,
smoothLight:false,
liquidBreakable:"drop",
onupdate:function(x,y,z,block,world,sx,sy,sz,dimension){
var me = blockIds.bigDripleaf
var top = world.getBlock(x,y+1,z,dimension)
var isIt = top === me || top === (me | CROSS)
if(block === me && isIt){
world.setBlock(x,y,z,me | CROSS,false,false,false,false,dimension)
}else if(block === (me | CROSS) && !isIt){
world.setBlock(x,y,z,me,false,false,false,false,dimension)
}
},
category:"nature"
},
{
name:"orGate",
Name:"OR Gate",
textures:["smoothStone","orGate","repeaterSide"],
shapeName:"logicGate",
transparent: true,
shadow: false,
logicGate:true,
shouldBeOn:function(x,y,z,dimension,px,pz,world){
return (world.getRepeaterPower(x,y,z,x-pz,y,z-px,dimension) || world.getBlockPower(x-pz,y,z-px,null,dimension)
|| world.getRepeaterPower(x,y,z,x+pz,y,z+px,dimension) || world.getBlockPower(x+pz,y,z+px,null,dimension)) ? true : false
},
category:"redstone"
},
{
name:"andGate",
Name:"AND Gate",
textures:["smoothStone","andGate","repeaterSide"],
shapeName:"logicGate",
transparent: true,
shadow: false,
logicGate:true,
shouldBeOn:function(x,y,z,dimension,px,pz,world){
return ((world.getRepeaterPower(x,y,z,x-pz,y,z-px,dimension) || world.getBlockPower(x-pz,y,z-px,null,dimension))
&& (world.getRepeaterPower(x,y,z,x+pz,y,z+px,dimension) || world.getBlockPower(x+pz,y,z+px,null,dimension))) ? true : false
},
category:"redstone"
},
{
name:"notGate",
Name:"NOT Gate",
textures:["smoothStone","notGate","repeaterSide"],
shapeName:"logicGate",
transparent: true,
shadow: false,
logicGate:true,
shouldBeOn:function(x,y,z,dimension,px,pz,world){
return !(world.getRepeaterPower(x,y,z,x-px,y,z-pz,dimension) || world.getBlockPower(x-px,y,z-pz,null,dimension)) ? true : false
},
category:"redstone"
},
{
name:"xorGate",
Name:"XOR Gate",
textures:["smoothStone","xorGate","repeaterSide"],
shapeName:"logicGate",
transparent: true,
shadow: false,
logicGate:true,
shouldBeOn:function(x,y,z,dimension,px,pz,world){
var a = world.getRepeaterPower(x,y,z,x-pz,y,z-px,dimension) || world.getBlockPower(x-pz,y,z-px,null,dimension)
var b = world.getRepeaterPower(x,y,z,x+pz,y,z+px,dimension) || world.getBlockPower(x+pz,y,z+px,null,dimension)
return ((a||b)&&!(a&&b)) ? true : false
},
category:"redstone"
},
{
name:"dripstoneBlock",
Name:"Dripstone Block",
type:"rock1",
breakTime:7.5,
blastResistance:1,
randomRotate:"flip",randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true,
category:"nature"
},
{
name:"pointedDripstone",
Name:"Sharp Dripstone",
flatIcon:true,
iconTexture:"pointedDripstone",
transparent: true,
shadow: false,
breakTime:2.25,
blastResistance:3,
type:"rock1",
drop:"pointedDripstone",
pointing:function(x,y,z,d,world){
var b = world.getBlock(x,y,z,d)
if(blockData[b].name === this.name) return (b & FLIP) === FLIP ? -1 : 1
},
onupdate:function(x,y,z,block,world,sx,sy,sz,dimension){
var down = (block & FLIP) === FLIP
var pointing = down ? -1 : 1
if(down){
var attached = world.getBlock(x,y+1,z,dimension)
if(world.settings.blocksFall && (!attached || !blockData[attached].solid)){
world.setBlock(x,y,z, 0, false,false,false,false,dimension)
world.addEntity(new entities[entityIds.BlockEntity](block, x,y,z),false,dimension)
return
}
}else{
if(needsSupportingBlocks(x,y,z, this.id,world,dimension)) return
}
var target = down ? this.id | FLIP : this.id
if(this.pointing(x,y+pointing,z,dimension,world) === pointing && this.pointing(x,y+pointing*2,z,dimension,world) !== pointing) target |= CROSS //frustum
else if(this.pointing(x,y+pointing,z,dimension,world) === pointing && !this.pointing(x,y-pointing,z,dimension,world)) target |= SLAB //base
else if(this.pointing(x,y+pointing,z,dimension,world) === pointing) target |= STAIR //middle
else if(this.pointing(x,y+pointing,z,dimension,world) === -pointing) target |= TALLCROSS //tip merge
if(block !== target) world.setBlock(x,y,z,target,false,false,false,false,dimension)
},
spawnUpdate:function(x,y,z,block,world,dimension){
let down = (block & FLIP) === FLIP
let pointing = down ? -1 : 1
let target = down ? this.id | FLIP : this.id
if(this.pointing(x,y+pointing,z,dimension,world) === pointing && this.pointing(x,y+pointing*2,z,dimension,world) !== pointing) target |= CROSS //frustum
else if(this.pointing(x,y+pointing,z,dimension,world) === pointing && !this.pointing(x,y-pointing,z,dimension,world)) target |= SLAB //base
else if(this.pointing(x,y+pointing,z,dimension,world) === pointing) target |= STAIR //middle
else if(this.pointing(x,y+pointing,z,dimension,world) === -pointing) target |= TALLCROSS //tip merge
if(block !== target) world.spawnBlock(x,y,z,target,dimension, true)
},
category:"nature"
},
{
name:"oakSign",
Name:"Oak sign",
textures:"oakPlanks",
poleTop:"logTop",
poleSide:"logSide",
iconTexture:"oakSign",
flatIcon:true,
sign:true,
breakTime:1.5,
woodSound:true,
type:"wood",
category:"decoration"
},
{
name:"birchSign",
Name:"Birch Sign",
textures:"birchPlanks",
poleTop:"birchLogTop",
poleSide:"birchLogSide",
iconTexture:"birchSign",
flatIcon:true,
sign:true,
breakTime:1.5,
woodSound:true,
type:"wood",
category:"decoration"
},
{
name:"acaciaSign",
Name:"Acacia Sign",
textures:"acaciaPlanks",
poleTop:"acaciaLogTop",
poleSide:"acaciaLogSide",
iconTexture:"acaciaSign",
flatIcon:true,
sign:true,
breakTime:1.5,
woodSound:true,
type:"wood",
category:"decoration"
},
{
name:"jungleSign",
Name:"Jungle Sign",
textures:"junglePlanks",
poleTop:"jungleLogTop",
poleSide:"jungleLogSide",
iconTexture:"jungleSign",
flatIcon:true,
sign:true,
breakTime:1.5,
woodSound:true,
type:"wood",
category:"decoration"
},
{
name:"spruceSign",
Name:"Spruce Sign",
textures:"sprucePlanks",
poleTop:"spruceLogTop",
poleSide:"spruceLogSide",
iconTexture:"spruceSign",
flatIcon:true,
sign:true,
breakTime:1.5,
woodSound:true,
type:"wood",
category:"decoration"
},
{
name:"darkOakSign",
Name:"Dark Oak Sign",
textures:"darkOakPlanks",
poleTop:"darkOakLogTop",
poleSide:"darkOakLogSide",
iconTexture:"darkOakSign",
flatIcon:true,
sign:true,
breakTime:1.5,
woodSound:true,
type:"wood",
color:[0.85,0.7,0.2],
category:"decoration"
},
{
name:"mangroveSign",
Name:"Mangrove Sign",
textures:"mangrovePlanks",
poleTop:"mangroveLogTop",
poleSide:"mangroveLog",
iconTexture:"mangroveSign",
flatIcon:true,
sign:true,
breakTime:1.5,
woodSound:true,
type:"wood",
category:"decoration"
},
{
name:"composter",
Name:"Make bonemeal",
textures:"composterCompost",
transparent:true,
blastResistance:0.6,
breakTime:0.9,
woodSound:true,
type:"wood",
getLevel:function(block){
var id = this.id
switch(block){
case id:
return 0
case id | SLAB:
return 1
case id | STAIR:
return 2
case id | CROSS:
return 3
case id | TALLCROSS:
return 4
case id | DOOR:
return 5
case id | TORCH:
return 6
case id | LANTERN:
return 7
}
},
category:"items"
},
{
name:"cocoaBeans",
Name:"Cocoa Beans",
item:true,
useAs:"cocoa",
category:"items"
},
{
name:"cocoa",
textures:"cocoaStage0",
breakTime:0.3,
blastResistance:3,
transparent:true,
shadow:false,
drop:"cocoaBeans",
woodSound:true,
hidden:true,
liquidBreakable:"drop"
},
{
name:"cookie",
Name:"Cookie",
item:true,
edible: true,
food: 2,
saturation: 0.4,
compostChance:0.85,
category:"food"
},
{
name:"pumpkinPie",
Name:"Pumpkin Pie",
item:true,
edible: true,
food: 8,
saturation: 4.8,
compostChance:1,
category:"food"
},
{
name:"rawChicken",
Name:"Raw Chicken",
item:true,
edible: true,
food: 2,
saturation: 1.2,
category:"food"
},
{
name:"cookedChicken",
Name:"Cooked Chicken",
item:true,
edible: true,
food: 6,
saturation: 7.2,
category:"food"
},
{
name:"rawCod",
Name:"Raw Cod",
item:true,
edible: true,
food: 2,
saturation: 0.4,
category:"food"
},
{
name:"cookedCod",
Name:"Cooked Cod",
item:true,
edible: true,
food: 5,
saturation: 6,
category:"food"
},
{
name:"rawMutton",
Name:"Raw Mutton",
item:true,
edible: true,
food: 2,
saturation: 1.2,
category:"food"
},
{
name:"cookedMutton",
Name:"Cooked Mutton",
item:true,
edible: true,
food: 6,
saturation: 9.6,
category:"food"
},
{
name:"rawPorkchop",
Name:"Raw Porkchop",
item:true,
edible: true,
food: 3,
saturation: 1.8,
category:"food"
},
{
name:"cookedPorkchop",
Name:"Stupido",
item:true,
edible: true,
food: 8,
saturation: 12.8,
category:"food"
},
{
name:"rawRabbit",
Name:"Raw Rabbit",
item:true,
edible: true,
food: 3,
saturation: 1.8,
category:"food"
},
{
name:"cookedRabbit",
Name:"Cooked Rabbit",
item:true,
edible: true,
food: 5,
saturation: 6,
category:"food"
},
{
name:"rawSalmon",
Name:"Raw Salmon",
item:true,
edible: true,
food: 2,
saturation: 0.4,
category:"food"
},
{
name:"cookedSalmon",
Name:"Cooked Salmon",
item:true,
edible: true,
food: 6,
saturation: 9.6,
category:"food"
},
{
name:"tropicalFish",
Name:"Tropical Fish",
item:true,
edible: true,
food: 1,
saturation: 0.2,
category:"food"
},
{
name:"beetroot",
Name:"Beetroot",
item:true,
edible: true,
food: 1,
saturation: 1.2,
compostChance:0.65,
category:"food"
},
{
name:"beetrootSoup",
Name:"Beetroot Soup",
item:true,
edible: true,
food: 7.2,
saturation: 13.2,
eatResult:"bowl",
category:"food"
},
{
name:"carrot",
Name:"Carrot",
item:true,
edible: true,
food: 3,
saturation: 3.6,
compostChance:0.65,
useAs:function(x,y,z,block,face){
if(!block) return
if(face === "top" && blockData[block].name === "farmland") return "carrots"
},
category:"food"
},
{
name:"goldenCarrot",
Name:"Golden Carrot",
item:true,
edible: true,
food: 6,
saturation: 14.4,
category:"food"
},
{
name:"rabbitStew",
Name:"Rabbit Stew",
item:true,
edible: true,
food: 10,
saturation: 12,
category:"food"
},
{
name:"goldenApple",
Name:"Golden Apple",
item:true,
edible: true,
food: 4,
saturation: 9.6,
category:"food",
rarity:"rare"
},
{
name:"rawBeef",
Name:"Raw Beef",
item:true,
edible: true,
food: 3,
saturation: 1.8,
category:"food"
},
{
name:"cookedBeef",
Name:"stake cooked befe",
item:true,
edible: true,
food: 8,
saturation: 12.8,
category:"food"
},
{
name:"potato",
Name:"Potato",
item:true,
edible: true,
food: 1,
saturation: 0.6,
compostChance:0.85,
useAs:function(x,y,z,block,face){
if(!block) return
if(face === "top" && blockData[block].name === "farmland") return "potatoes"
},
category:"food"
},
{
name:"bakedPotato",
Name:"Baked Potato",
item:true,
edible: true,
food: 5,
saturation: 6,
compostChance:0.85,
category:"food"
},
{
name:"sugar",
Name:"Sugar",
item:true,
category:"items"
},
{
name:"milkBucket",
Name:"Milk Bucket",
item:true,
category:"items"
},
{
name:"beetrootSeeds",
Name:"Beetroot Seeds",
item:true,
useAs:function(x,y,z,block,face){
if(!block) return
if(face === "top" && blockData[block].name === "farmland") return "beetroots"
},
category:"items"
},
{
name:"beetroots",
textures:"beetrootsStage0",
textures1:new Array(6).fill("beetrootsStage1"),
textures2:new Array(6).fill("beetrootsStage2"),
textures3:new Array(6).fill("beetrootsStage3"),
transparent: true,
shadow: false,
solid: false,
crop: true,
drop:"beetrootSeeds",
hidden:true,
liquidBreakable:"drop"
},
{
name:"potatoes",
textures:"potatoesStage0",
textures1:new Array(6).fill("potatoesStage1"),
textures2:new Array(6).fill("potatoesStage2"),
textures3:new Array(6).fill("potatoesStage3"),
transparent: true,
shadow: false,
solid: false,
crop: true,
drop:"potato",
hidden:true,
liquidBreakable:"drop"
},
{
name:"carrots",
textures:"carrotsStage0",
textures1:new Array(6).fill("carrotsStage1"),
textures2:new Array(6).fill("carrotsStage2"),
textures3:new Array(6).fill("carrotsStage3"),
transparent: true,
shadow: false,
solid: false,
crop: true,
drop:"carrot",
hidden:true,
liquidBreakable:"drop"
},
{
name:"mudPie",
Name:"Mud Pie",
item:true,
edible: true,
food: 1,
saturation: 1,
category:"food"
},
{
name:"purpleGrapes",
Name:"Purple Grapes",
item:true,
edible: true,
food: 3,
saturation: 3,
category:"food"
},
{
name:"greenGrapes",
Name:"Green Grapes",
item:true,
edible: true,
food: 3,
saturation: 3,
category:"food"
},
{
name:"oakChair",
Name:"Oak Chair",
textures:"oakPlanks",
shapeName:"chair",
transparent:true,
shadow:false,
onclientclick:sit,
category:"items"
},
{
name:"lightGrayBed",
Name:"Light Gray Bed",
textures: "lightGrayBedbottom",
iconTexture: "lightGrayBedIcon",
flatIcon: true,
onclientclick: (x,y,z,dimension) => {
clickBed(x,y,z,dimension)
},
transparent: true,
bed: true,
bounciness: 0.6,
category:"items"
},
{
name:"lightBlueBed",
Name:"Light Blue Bed",
textures: "lightBlueBedbottom",
iconTexture: "lightBlueBedIcon",
flatIcon: true,
onclientclick: (x,y,z,dimension) => {
clickBed(x,y,z,dimension)
},
transparent: true,
bed: true,
bounciness: 0.6,
category:"items"
},
{
name:"magentaBed",
Name:"Magenta Bed",
textures: "magentaBedbottom",
iconTexture: "magentaBedIcon",
flatIcon: true,
onclientclick: (x,y,z,dimension) => {
clickBed(x,y,z,dimension)
},
transparent: true,
bed: true,
bounciness: 0.6,
category:"items"
},
{
name:"yellowBed",
Name:"Yellow Bed",
textures: "yellowBedbottom",
iconTexture: "yellowBedIcon",
flatIcon: true,
onclientclick: (x,y,z,dimension) => {
clickBed(x,y,z,dimension)
},
transparent: true,
bed: true,
bounciness: 0.6,
category:"items"
},
{
name:"purpleBed",
Name:"Purple Bed",
textures: "purpleBedbottom",
iconTexture: "purpleBedIcon",
flatIcon: true,
onclientclick: (x,y,z,dimension) => {
clickBed(x,y,z,dimension)
},
transparent: true,
bed: true,
bounciness: 0.6,
category:"items"
},
{
name:"orangeBed",
Name:"Orange Bed",
textures: "orangeBedbottom",
iconTexture: "orangeBedIcon",
flatIcon: true,
onclientclick: (x,y,z,dimension) => {
clickBed(x,y,z,dimension)
},
transparent: true,
bed: true,
bounciness: 0.6,
category:"items"
},
{
name:"whiteBed",
Name:"White Bed",
textures: "whiteBedbottom",
iconTexture: "whiteBedIcon",
flatIcon: true,
onclientclick: (x,y,z,dimension) => {
clickBed(x,y,z,dimension)
},
transparent: true,
bed: true,
bounciness: 0.6,
category:"items"
},
{
name:"greenBed",
Name:"Green Bed",
textures: "greenBedbottom",
iconTexture: "greenBedIcon",
flatIcon: true,
onclientclick: (x,y,z,dimension) => {
clickBed(x,y,z,dimension)
},
transparent: true,
bed: true,
bounciness: 0.6,
category:"items"
},
{
name:"brownBed",
Name:"Brown Bed",
textures: "brownBedbottom",
iconTexture: "brownBedIcon",
flatIcon: true,
onclientclick: (x,y,z,dimension) => {
clickBed(x,y,z,dimension)
},
transparent: true,
bed: true,
bounciness: 0.6,
category:"items"
},
{
name:"blackBed",
Name:"Black Bed",
textures: "blackBedbottom",
iconTexture: "blackBedIcon",
flatIcon: true,
onclientclick: (x,y,z,dimension) => {
clickBed(x,y,z,dimension)
},
transparent: true,
bed: true,
bounciness: 0.6,
category:"items"
},
{
name:"pinkBed",
Name:"Pink Bed",
textures: "pinkBedbottom",
iconTexture: "pinkBedIcon",
flatIcon: true,
onclientclick: (x,y,z,dimension) => {
clickBed(x,y,z,dimension)
},
transparent: true,
bed: true,
bounciness: 0.6,
category:"items"
},
{
name:"limeBed",
Name:"Lime Bed",
textures: "limeBedbottom",
iconTexture: "limeBedIcon",
flatIcon: true,
onclientclick: (x,y,z,dimension) => {
clickBed(x,y,z,dimension)
},
transparent: true,
bed: true,
bounciness: 0.6,
category:"items"
},
{
name:"grayBed",
Name:"Gray Bed",
textures: "grayBedbottom",
iconTexture: "grayBedIcon",
flatIcon: true,
onclientclick: (x,y,z,dimension) => {
clickBed(x,y,z,dimension)
},
transparent: true,
bed: true,
bounciness: 0.6,
category:"items"
},
{
name:"cyanBed",
Name:"Cyan Bed",
textures: "cyanBedbottom",
iconTexture: "cyanBedIcon",
flatIcon: true,
onclientclick: (x,y,z,dimension) => {
clickBed(x,y,z,dimension)
},
transparent: true,
bed: true,
bounciness: 0.6,
category:"items"
},
{
name:"blueBed",
Name:"Blue Bed",
textures: "blueBedbottom",
iconTexture: "blueBedIcon",
flatIcon: true,
onclientclick: (x,y,z,dimension) => {
clickBed(x,y,z,dimension)
},
transparent: true,
bed: true,
bounciness: 0.6,
category:"items"
},
{
name:"quicksand",
Name:"Quicksand",
quicksand:true,
solid:false,
category:"nature"
},
{
name:"bow",
Name:"Bow",
pullTextures:["bow","bowPulling0","bowPulling1","bowPulling2"],
onrelease: function(x,y,z, dimension, item){
if(!item.pulling) return true
if(minusOneItem(blockIds.arrow)){
var pd = p.direction
var i = item.pulling / 3
world.addEntity(new entities[entityIds.Arrow](p.x+pd.x,p.y+pd.y,p.z+pd.z,pd.x*i,pd.y*i,pd.z*i,userId),false,dimension)
}
delete item.pulling
delete item.pullStart
item.id = this.id
holding = inventory.hotbar[inventory.hotbarSlot].id
updateHUD = true
},
useAnywhere:true,
canPlace:() => false,
stackSize:1,
category:"tools"
},
{
name:"arrow",
Name:"Arrow",
textures:"arrowIcon",
item:true,
category:"items"
},
{
name:"glisteringMelonSlice",
Name:"Slice of Watermelon With Unedible Gold",
item:true,
category:"items"
},
{
name:"untnt",
Name:"UnTNT",
textures:["untntBottom","untntTop","untnt"],
explode:function(x,y,z,how,dimension,world){
world.setBlock(x,y,z,0,false,false,false,false,dimension)
var e = new entities[entityIds.PrimedUnTNT](x,y,z)
world.addEntity(e,false,dimension)
world.playSound(x,y,z, "entity.tnt.fuse")
switch(how){
case "explosion":
e.timeLimit = rand(10,30)
}
},
burnChance:0.6,
onburn:function(x,y,z,dimension,world){
this.explode(x,y,z,null,dimension,world)
},
category:"redstone"
},
{
name:"crimsonSign",
Name:"Crimson Sign",
textures:"crimsonPlanks",
poleTop:"crimsonStemTop",
poleSide:"crimsonStemSide",
iconTexture:"crimsonSign",
flatIcon:true,
sign:true,
breakTime:1.5,
woodSound:true,
type:"wood",
category:"decoration"
},
{
name:"warpedSign",
Name:"Warped Sign",
textures:"warpedPlanks",
poleTop:"warpedStemTop",
poleSide:"warpedStemSide",
iconTexture:"warpedSign",
flatIcon:true,
sign:true,
breakTime:1.5,
woodSound:true,
type:"wood",
category:"decoration"
},
{
name:"dropper",
Name:"Dropper",
textures:["furnaceTop","furnaceTop","furnaceSide","dropperFront","furnaceSide","furnaceSide"],
upTextures:fillTextureArray(["furnaceTop","dropperFrontVertical","furnaceTop"]),
downTextures:fillTextureArray(["dropperFrontVertical","furnaceTop","furnaceTop"]),
stoneSound:true,
category:"redstone",
tagBits: null,
setContents:function(x,y,z,dimension,world){
let data = {dispenser:true, contents:new Array(9).fill(0)}
world.setTags(x, y, z, data,false,dimension)
return data
},
onclientclick:function(x,y,z,dimension){
containerData.x = x
containerData.y = y
containerData.z = z
containerData.dimension = dimension
changeScene("dispenser")
releasePointer()
},
onbreak:function(x,y,z, block, data,dimension,world){
if(!(data && data.dispenser && data.contents)) return
data = data.contents
for(var i=0; i<data.length; i++){
if(data[i] && data[i].id){
world.addItems(x,y,z,dimension,0,0,0,data[i].id, true, data[i].amount, data[i].durability, data[i].customName)
}
}
},
onpowerupdate:function(x,y,z,sx,sy,sz,blockPowerChanged,dimension,world){
var block = world.getBlock(x,y,z,dimension)
var power = world.getRedstonePower(x,y,z,dimension) || world.getSurroundingBlockPower(x,y,z,dimension)
var tags = world.getTags(x,y,z,dimension)
var on = tags && tags.on || false
if(power !== on) {
world.setTagByName(x,y,z,"on",power,false,dimension)
if(power){
var me = this
world.setTimeout(function(){
world.playSound(x,y,z, "click")
if(!tags || !tags.contents) return
var items = tags.contents.filter(r => r && r.id)
var idx = floor(rand(items.length))
if(!items[idx] || !items[idx].id) return
idx = tags.contents.indexOf(items[idx]), items = tags.contents
var vx = 0, vy = 0, vz = 0, ix = x, iy = y, iz = z, tx = x, ty = y, tz = z
switch(block){
case me.id | NORTH:
vz = -0.25
iz -= 0.75
tz--
break
case me.id | SOUTH:
vz = 0.25
iz += 0.75
tz++
break
case me.id | EAST:
vx = -0.25
ix -= 0.75
tx--
break
case me.id | WEST:
vx = 0.25
ix += 0.75
tx++
break
case me.id | SLAB:
vy = 0.25
iy += 0.75
ty++
break
case me.id | STAIR:
vy = -0.25
iy -= 0.75
ty--
break
}
if(!putItemInContainer(tx,ty,tz,dimension,items[idx].id,items[idx].durability,items[idx].customName,false,world)){
world.addItems(ix,iy,iz,dimension,vx,vy,vz,items[idx].id, false, 1, items[idx].durability, items[idx].customName)
}
items[idx].amount--
if(items[idx].amount <= 0) items[idx] = 0
world.setTags(x,y,z,tags,false,dimension)
},tickTime*4, x,y,z,dimension)
}
}
},
onset:function(x,y,z,dimension,world){
this.onpowerupdate(x,y,z,null,null,null,null,dimension,world)
},
},
{
name:"dispenser",
Name:"Dispenser",
textures:["furnaceTop","furnaceTop","furnaceSide","dispenserFront","furnaceSide","furnaceSide"],
upTextures:fillTextureArray(["furnaceTop","dispenserFrontVertical","furnaceTop"]),
downTextures:fillTextureArray(["dispenserFrontVertical","furnaceTop","furnaceTop"]),
stoneSound:true,
category:"redstone",
breakTime:17.5,
type:"rock2",
tagBits: null,
setContents:function(x,y,z,dimension,world){
let data = {dispenser:true, contents:new Array(9).fill(0)}
world.setTags(x, y, z, data,false,dimension)
return data
},
onclientclick:function(x,y,z,dimension){
containerData.x = x
containerData.y = y
containerData.z = z
containerData.dimension = dimension
changeScene("dispenser")
releasePointer()
},
onbreak:function(x,y,z, block, data,dimension,world){
if(!(data && data.dispenser && data.contents)) return
data = data.contents
for(var i=0; i<data.length; i++){
if(data[i] && data[i].id){
world.addItems(x,y,z,dimension,0,0,0,data[i].id, true, data[i].amount, data[i].durability, data[i].customName)
}
}
},
onpowerupdate:function(x,y,z,sx,sy,sz,blockPowerChanged,dimension,world){
var block = world.getBlock(x,y,z,dimension)
var power = world.getRedstonePower(x,y,z,dimension) || world.getSurroundingBlockPower(x,y,z,dimension)
var tags = world.getTags(x,y,z,dimension)
var on = tags && tags.on || false
if(power !== on) {
world.setTagByName(x,y,z,"on",power,false,dimension)
if(power){
var me = this
world.setTimeout(function(){
world.playSound(x,y,z, "click")
if(!tags || !tags.contents) return
var items = tags.contents.filter(r => r && r.id)
var idx = floor(rand(items.length))
if(!items[idx] || !items[idx].id) return
idx = tags.contents.indexOf(items[idx]), items = tags.contents
var vx = 0, vy = 0, vz = 0, ix = x, iy = y, iz = z
switch(block){
case me.id | NORTH:
vz = -0.25
iz--
break
case me.id | SOUTH:
vz = 0.25
iz++
break
case me.id | EAST:
vx = -0.25
ix--
break
case me.id | WEST:
vx = 0.25
ix++
break
case me.id | SLAB:
vy = 0.25
iy++
break
case me.id | STAIR:
vy = -0.25
iy--
break
}
var front = world.getBlock(ix,iy,iz,dimension)
if(front && blockData[front].solid) return
var data = blockData[items[idx].id]
var minus = true
if(data.name === "arrow") world.addEntity(new entities[entityIds.Arrow](ix,iy,iz,vx*4,vy*4,vz*4),false,dimension)
else if(data.name === "boneMeal") data.onuse(ix,iy,iz, front, null, null, emptyFunc,dimension)
else if(data.name === "snowball") world.addEntity(new entities[entityIds.Snowball](ix,iy,iz,vx*4,vy*4,vz*4),false,dimension)
else if(data.name === "egg") world.addEntity(new entities[entityIds.Egg](ix,iy,iz,vx*4,vy*4,vz*4),false,dimension)
else if(data.name === "bucket"){
var set = false
if(front === blockIds.Water) set = true, items[idx].id = blockIds.waterBucket
if(front === blockIds.Lava) set = true, items[idx].id = blockIds.lavaBucket
if(front === blockIds.powderSnow) set = true, items[idx].id = blockIds.powderSnowBucket
if(front === blockIds.oil) set = true, items[idx].id = blockIds.oilBucket
world.setBlock(ix,iy,iz,0,false,false,false,false,dimension)
minus = false
}else if(data.name === "waterBucket") world.setBlock(ix,iy,iz,blockIds.Water,false,false,false,false,dimension), items[idx].id = blockIds.bucket, minus = false
else if(data.name === "lavaBucket") world.setBlock(ix,iy,iz,blockIds.Lava,false,false,false,false,dimension), items[idx].id = blockIds.bucket, minus = false
else if(data.name === "powderSnowBucket") world.setBlock(ix,iy,iz,blockIds.powderSnow,false,false,false,false,dimension), items[idx].id = blockIds.bucket, minus = false
else if(data.name === "oilBucket") world.setBlock(ix,iy,iz,blockIds.oil,false,false,false,false,dimension), items[idx].id = blockIds.bucket, minus = false
else if(data.name === "tnt") data.explode(ix,iy,iz,null,dimension,world)
else if(data.item) world.addItems(ix,iy,iz,dimension,vx,vy,vz,items[idx].id, false, 1, items[idx].durability, items[idx].customName)
else world.setBlock(ix,iy,iz,items[idx].id,false,false,false,false,dimension)
if(minus) items[idx].amount--
if(items[idx].amount <= 0) items[idx] = 0
world.setTags(x,y,z,tags,false,dimension)
},tickTime*4, x,y,z,dimension)
}
}
},
onset:function(x,y,z,dimension,world){
this.onpowerupdate(x,y,z,null,null,null,null,dimension,world)
},
},
{
name:"hopper",
Name:"Hopper",
textures:"hopperOutside",
flatIcon:true,
iconTexture:"hopperIcon",
blastResistance:4.8,
transparent:true,
breakTime:15,
type:"metal2",
stoneSound:true,
category:"redstone",
tagBits: null,
setContents:function(x,y,z,dimension,world){
let data = {hopper:true, contents:new Array(5).fill(0)}
world.setTags(x, y, z, data,false,dimension)
return data
},
onclientclick:function(x,y,z,dimension){
containerData.x = x
containerData.y = y
containerData.z = z
containerData.dimension = dimension
changeScene("hopper")
releasePointer()
},
onbreak:function(x,y,z, block, data,dimension,world){
if(!(data && data.hopper && data.contents)) return
data = data.contents
for(var i=0; i<data.length; i++){
if(data[i] && data[i].id){
world.addItems(x,y,z,dimension,0,0,0,data[i].id, true, data[i].amount, data[i].durability, data[i].customName)
}
}
},
pushItem:function(x,y,z,dimension,tags,world){
var tx = x, ty = y, tz = z, top, dx = 0, dy = 0, dz = 0
switch(world.getBlock(x,y,z,dimension)){
case this.id:
ty--
dy = -1
top = true
break
case this.id | SLAB | NORTH:
tz++
dz = 1
break
case this.id | SLAB | SOUTH:
tz--
dz = -1
break
case this.id | SLAB | EAST:
tx++
dx = 1
break
case this.id | SLAB | WEST:
tx--
dx = -1
break
}
var to = world.getBlock(tx,ty,tz,dimension)
for(var i=0; i<tags.contents.length; i++){
var item = tags.contents[i]
if(!item || !item.id) continue
var put
if(!to || !blockData[to].solid){
world.addItems(x+dx*0.625,y+dy*0.625,z+dz*0.625,dimension,dx/8,dy/8,dz/8,item.id, false, 1, item.durability, item.customName)
put = true
}else if(blockData[to].name === "furnace"){
var toTags = world.getTags(tx,ty,tz,dimension), toTagName
if(!toTags) toTags = blockData[to].setContents(tx,ty,tz,dimension,this.world)
if(top) toTagName = "input"
else toTagName = "fuel"
var toTag = toTags[toTagName]
if(!toTag){
toTag = {id:item.id,amount:1,durability:item.durability,customName:item.customName}
put = true
}else if(toTag.id === item.id && (!toTag.customName && !item.customName || toTag.customName === item.customName) && toTag.amount < blockData[toTag.id].stackSize){
toTag.amount++
put = true
}
if(put){
toTags[toTagName] = toTag
world.setTags(tx,ty,tz,toTags,false,dimension)
}
}else if(putItemInContainer(tx,ty,tz,dimension,item.id,item.durability,item.customName,false,world)){
put = true
}
if(put){
item.amount--
if(!item.amount) tags.contents[i] = 0
return true
}
}
},
pullItem:function(x,y,z,dimension,myTags,world){
var block = world.getBlock(x,y+1,z,dimension)
var tags = world.getTags(x,y+1,z,dimension)
if(!tags) return
if(blockData[block].name === "furnace"){
var item = tags.output
if(item && item.id){
if(!putItemInContainer(x,y,z,dimension,item.id,item.durability,item.customName,true,world)) return
item.amount--
if(!item.amount) tags.output = 0
world.tagsChanged(x,y,z,tags,false,dimension)
return true
}
}else if(tags.contents) for(var i=0; i<tags.contents.length; i++){
var item = tags.contents[i]
if(item && item.id){
if(!putItemInContainer(x,y,z,dimension,item.id,item.durability,item.customName,true,world)) return
item.amount--
if(!item.amount) tags.contents[i] = 0
world.tagsChanged(x,y,z,tags,false,dimension)
return true
}
}
},
update:function(x,y,z,dimension,world){
if(this.isLocked(x,y,z,dimension,world)) return
var tags = world.getTags(x,y,z,dimension)
if(!tags) tags = this.setContents(x,y,z,dimension,world)
var u = false
if(this.pushItem(x,y,z,dimension,tags,world)) u = true
if(this.pullItem(x,y,z,dimension,tags,world)) u = true
if(u) world.setTags(x,y,z,tags,false,dimension)
},
onupdate:function(x,y,z,block,world,sx,sy,sz,dimension){
var me = this
var t = () => me.update(x,y,z,dimension,world)
world.setTimeout(t, tickTime*8, x,y,z,dimension)
},
onpowerupdate:function(x,y,z,sx,sy,sz,blockPowerChanged,dimension,world){
this.onupdate(x,y,z,null,world,sx,sy,sz,dimension,world)
},
ontagsupdate:function(x,y,z,dimension,tags,world){
this.onupdate(x,y,z,null,world,null,null,null,dimension,world)
},
isLocked:function(x,y,z,dimension,world){
return world.getRedstonePower(x,y,z,dimension) || world.getSurroundingBlockPower(x,y,z,dimension)
},
itemOnTop(x,y,z,dimension,ent){
let world = ent.world
if(this.isLocked(x,y,z,dimension,world)) return
var amount = ent.amount
while(amount){
if(!putItemInContainer(x,y,z,dimension,ent.block,ent.durability,ent.name,false,world)) break
amount--
}
return amount
}
},
{
name:"target",
Name:"Target",
textures:["targetTop","targetSide"],
breakTime:0.75,
blastResistance:0.5,
burnChance: 0.2,
burnTime: 20,
category:"redstone",
grassSound: true,
type:"plant2",
cornerDist:sqrt(0.75),
sideDist:0.5,
projectileHit:function(x,y,z,dimension,ent){
let world = ent.world
var dist = dist3(ent.x+ent.direction.x/2,ent.y+ent.direction.y/2,ent.z+ent.direction.z/2,x,y,z)
var power = round(map(dist,this.sideDist,this.cornerDist,15,0))
world.setPower(x,y,z,power,false,dimension)
world.spreadPower(x,y,z,power,dimension)
world.setTimeout(function(){
world.setPower(x,y,z,0,false,dimension)
world.unspreadPower(x,y,z,power,false,dimension)
},tickTime*8, x,y,z,dimension)
}
},
{
name:"comparator",
Name:"Redstone Comparator",
textures:["smoothStone","comparator","comparator"],
transparent:true,
flatIcon:true,
iconTexture:"comparatorIcon",
category:"redstone",
tagBits:{
output:[0,4]
},
on:function(x,y,z,dimension,dx,dy,dz,subtract,world){
var fx = x-dx, fy = y-dy, fz = z-dz
var backPower = min(max(world.getRepeaterPower(x,y,z,fx,fy,fz,dimension),ceil((getContainerFullness(fx,fy,fz,dimension,world) || 0)*15)),15)
if(world.getBlockPower(fx,fy,fz,null,dimension)) backPower = 15
var sidePower = min(max(world.getRepeaterPower(x,y,z,x-dz,y-dy,z-dx,dimension),world.getRepeaterPower(x,y,z,x+dz,y-dy,z+dx,dimension)),15)
if(subtract) return max(backPower - sidePower, 0)
else return backPower * (sidePower <= backPower)
},
onupdate:function(x,y,z,b,w,sx,sy,sz,dimension){
this.onpowerupdate(x,y,z,null,null,null,null,dimension,w)
},
ontagsupdate:function(x,y,z,dimension,tags,world){
this.onpowerupdate(x,y,z,null,null,null,null,dimension,world)
},
ondelete:function(x,y,z,prevTags,prevBlock,dimension,world){
world.unspreadPower(x,y,z,16,false,dimension)
world.setBlockPower(x,y,z+1,null,"south",dimension)
world.setBlockPower(x,y,z-1,null,"north",dimension)
world.setBlockPower(x+1,y,z,null,"east",dimension)
world.setBlockPower(x-1,y,z,null,"west",dimension)
},
onpowerupdate:function(x,y,z,sx,sy,sz,blockPowerChanged,dimension,world){
var dx = 0, dy = 0, dz = 0 //direction
var side //side of block it's pointing to
var block = world.getBlock(x,y,z,dimension)
var offCompare = this.id, onCompare = this.id | SLAB, offSubtract = this.id | STAIR, onSubtract = this.id | DOOR
var subtractMode
switch(block){
case offSubtract | NORTH:
case onSubtract | NORTH:
subtractMode = true
case offCompare | NORTH:
case onCompare | NORTH:
dz = 1
side = "south"
break
case offSubtract | SOUTH:
case onSubtract | SOUTH:
subtractMode = true
case offCompare | SOUTH:
case onCompare | SOUTH:
dz = -1
side = "north"
break
case offSubtract | EAST:
case onSubtract | EAST:
subtractMode = true
case offCompare | EAST:
case onCompare | EAST:
dx = 1
side = "east"
break
case offSubtract | WEST:
case onSubtract | WEST:
subtractMode = true
case offCompare | WEST:
case onCompare | WEST:
dx = -1
side = "west"
break
}
if(!dx && !dy && !dz) return console.log("doesn't match up") //doesn't match up
var tx = x+dx, ty = y+dy, tz = z+dz
var output = world.getTagByName(x,y,z,"output",dimension) || 0
var power = this.on(x,y,z,dimension,dx,dy,dz,subtractMode,world)
var tblock = world.getBlock(tx,ty,tz,dimension)
if(tblock && blockData[tblock].name === "redstoneDust"){
if(output){
var frontPower = world.getPower(tx,ty,tz,dimension)
if(output < frontPower){
world.unspreadPower(tx,ty,tz,frontPower,true,dimension)
}else if(output > frontPower){
world.setPower(tx,ty,tz,output,false,dimension)
world.spreadPower(tx,ty,tz,output,dimension)
}
}
}
if(power === output) return
var me = this
var t = function(){
block = world.getBlock(x,y,z,dimension)
power = me.on(x,y,z,dimension,dx,dy,dz,subtractMode,world)
output = world.getTagByName(x,y,z,"output",dimension) || 0
if(power !== output) {
world.setTagByName(x,y,z,"output",power,false,dimension)
var on = false
switch(block){
case onSubtract | NORTH:
case onCompare | NORTH:
case onSubtract | SOUTH:
case onCompare | SOUTH:
case onSubtract | EAST:
case onCompare | EAST:
case onSubtract | WEST:
case onCompare | WEST:
on = true
}
if((power ? true : false) !== on){
var target
switch(block){
case offCompare | NORTH:
target = onCompare | NORTH
break
case onCompare | NORTH:
target = offCompare | NORTH
break
case offSubtract | NORTH:
target = onSubtract | NORTH
break
case onSubtract | NORTH:
target = offSubtract | NORTH
break
case offCompare | SOUTH:
target = onCompare | SOUTH
break
case onCompare | SOUTH:
target = offCompare | SOUTH
break
case offSubtract | SOUTH:
target = onSubtract | SOUTH
break
case onSubtract | SOUTH:
target = offSubtract | SOUTH
break
case offCompare | EAST:
target = onCompare | EAST
break
case onCompare | EAST:
target = offCompare | EAST
break
case offSubtract | EAST:
target = onSubtract | EAST
break
case onSubtract | EAST:
target = offSubtract | EAST
break
case offCompare | WEST:
target = onCompare | WEST
break
case onCompare | WEST:
target = offCompare | WEST
break
case offSubtract | WEST:
target = onSubtract | WEST
break
case onSubtract | WEST:
target = offSubtract | WEST
break
}
if(block !== target) world.setBlock(x,y,z,target,false,false,false,true,dimension)
}
var tblock = world.getBlock(tx,ty,tz,dimension)
if(power){
if(tblock && blockData[tblock].name === "redstoneDust"){
var frontPower = world.getPower(tx,ty,tz,dimension)
if(power < frontPower){
world.unspreadPower(tx,ty,tz,frontPower,true,dimension)
}else if(power > frontPower){
world.setPower(tx,ty,tz,power,false,dimension)
world.spreadPower(tx,ty,tz,power,dimension)
}
}
}else{
if(tblock && blockData[tblock].name === "redstoneDust"){
world.unspreadPower(tx,ty,tz,output,true,dimension)
}
}
}//end if power changed
}
world.setTimeout(t,tickTime*2, x,y,z,dimension)
},
onclick:function(x,y,z,dimension,world){
var me = blockData[blockIds.comparator]
var block = world.getBlock(x,y,z,dimension)
var off = me.id, on = me.id | SLAB, offSubtract = me.id | STAIR, onSubtract = me.id | DOOR
var target
switch(block){
case off | NORTH:
target = offSubtract | NORTH
break
case on | NORTH:
target = onSubtract | NORTH
break
case offSubtract | NORTH:
target = off | NORTH
break
case onSubtract | NORTH:
target = on | NORTH
break
case off | SOUTH:
target = offSubtract | SOUTH
break
case on | SOUTH:
target = onSubtract | SOUTH
break
case offSubtract | SOUTH:
target = off | SOUTH
break
case onSubtract | SOUTH:
target = on | SOUTH
break
case off | EAST:
target = offSubtract | EAST
break
case on | EAST:
target = onSubtract | EAST
break
case offSubtract | EAST:
target = off | EAST
break
case onSubtract | EAST:
target = on | EAST
break
case off | WEST:
target = offSubtract | WEST
break
case on | WEST:
target = onSubtract | WEST
break
case offSubtract | WEST:
target = off | WEST
break
case onSubtract | WEST:
target = on | WEST
break
}
world.setBlock(x,y,z,target,false,false,false,true,dimension)
},
getFacing:function(x,y,z,dimension,world){
var block = world.getBlock(x,y,z,dimension)
var off = this.id, on = this.id | SLAB, offSubtract = this.id | STAIR, onSubtract = this.id | DOOR
var f
switch(block){
case off | NORTH:
case on | NORTH:
case offSubtract | NORTH:
case onSubtract | NORTH:
f = "north"
break
case off | SOUTH:
case on | SOUTH:
case offSubtract | SOUTH:
case onSubtract | SOUTH:
f = "south"
break
case off | EAST:
case on | EAST:
case offSubtract | EAST:
case onSubtract | EAST:
f = "east"
break
case off | WEST:
case on | WEST:
case offSubtract | WEST:
case onSubtract | WEST:
f = "west"
break
}
return f
},
canHavePower:function(/*this*/rx,ry,rz,/*other thing*/x,y,z,dimension,world){
var tx = rx, ty = ry, tz = rz
var block = world.getBlock(rx,ry,rz,dimension)
var off = this.id, on = this.id | SLAB, offSubtract = this.id | STAIR, onSubtract = this.id | DOOR
switch(block){
case offSubtract | NORTH:
case onSubtract | NORTH:
case off | NORTH:
case on | NORTH:
tz++
break
case offSubtract | SOUTH:
case onSubtract | SOUTH:
case off | SOUTH:
case on | SOUTH:
tz--
break
case offSubtract | EAST:
case onSubtract | EAST:
case off | EAST:
case on | EAST:
tx++
break
case offSubtract | WEST:
case onSubtract | WEST:
case off | WEST:
case on | WEST:
tx--
break
}
if(tx === x && ty === y && tz === z){
return world.getTagByName(rx,ry,rz,"output",dimension) || 0
}
return 0
}
},
{
name:"acaciaChair",
Name:"Acacia Chair",
textures:"acaciaPlanks",
shapeName:"chair",
transparent:true,
shadow:false,
onclientclick:sit,
category:"items"
},
{
name:"birchChair",
Name:"Birch Chair",
textures:"birchPlanks",
shapeName:"chair",
transparent:true,
shadow:false,
onclientclick:sit,
category:"items"
},
{
name:"jungleChair",
Name:"Jungle Chair",
textures:"junglePlanks",
shapeName:"chair",
transparent:true,
shadow:false,
onclientclick:sit,
category:"items"
},
{
name:"darkOakChair",
Name:"Dark Oak Chair",
textures:"darkOakPlanks",
shapeName:"chair",
transparent:true,
shadow:false,
onclientclick:sit,
category:"items"
},
{
name:"spruceChair",
Name:"Spruce Chair",
textures:"sprucePlanks",
shapeName:"chair",
transparent:true,
shadow:false,
onclientclick:sit,
category:"items"
},
{
name:"mangroveChair",
Name:"Mangrove Chair",
textures:"mangrovePlanks",
shapeName:"chair",
transparent:true,
shadow:false,
onclientclick:sit,
category:"items"
},
{
name:"crimsonChair",
Name:"Crimson Chair",
textures:"crimsonPlanks",
shapeName:"chair",
transparent:true,
shadow:false,
onclientclick:sit,
category:"items"
},
{
name:"warpedChair",
Name:"Warped Chair",
textures:"warpedPlanks",
shapeName:"chair",
transparent:true,
shadow:false,
onclientclick:sit,
category:"items"
},
{
name:"blackChair",
Name:"Black Chair",
textures:"blackWool",
shapeName:"chair",
transparent:true,
shadow:false,
onclientclick:sit,
category:"items"
},
{
name: "spawnCreeper",
item: true,
onuse: (x,y,z, block, replaceItem,useDurability,minusOne,dimension,holding) => {
var pos = getPosition()
let ent = new entities[entityIds.Creeper](pos[0],pos[1],pos[2])
if(holding.customName) ent.name = holding.customName
world.addEntity(ent,false,dimension)
},
spawnMob: function(x,y,z,dimension,world){
world.addEntity(new entities[entityIds.Creeper](x,y,z),false,dimension)
},
minusOnUse:true,
category:"items"
},
{
name:"gunpowder",
Name:"Gray exploding stuff",
item:true
},
{
name:"rottenFlesh",
Name:"Rotten Flesh",
item:true
},
{
name: "spawnSheep",
item: true,
onuse: (x,y,z, block, replaceItem,useDurability,minusOne,dimension,holding) => {
var pos = getPosition()
let ent = new entities[entityIds.Sheep](pos[0],pos[1],pos[2])
if(holding.customName) ent.name = holding.customName
world.addEntity(ent,false,dimension)
},
spawnMob: function(x,y,z,dimension,world){
world.addEntity(new entities[entityIds.Sheep](x,y,z),false,dimension)
},
minusOnUse:true,
category:"items"
},
{
name: "spawnChicken",
item: true,
onuse: (x,y,z, block, replaceItem,useDurability,minusOne,dimension,holding) => {
var pos = getPosition()
let ent = new entities[entityIds.Chicken](pos[0],pos[1],pos[2])
if(holding.customName) ent.name = holding.customName
world.addEntity(ent,false,dimension)
},
spawnMob: function(x,y,z,dimension,world){
world.addEntity(new entities[entityIds.Chicken](x,y,z),false,dimension)
},
minusOnUse:true,
category:"items"
},
{
name:"feather",
Name:"Feather",
item:true
},
{
name: "spawnZombie",
item: true,
onuse: (x,y,z, block, replaceItem,useDurability,minusOne,dimension,holding) => {
var pos = getPosition()
let ent = new entities[entityIds.Zombie](pos[0],pos[1],pos[2])
if(holding.customName) ent.name = holding.customName
world.addEntity(ent,false,dimension)
},
spawnMob: function(x,y,z,dimension,world){
world.addEntity(new entities[entityIds.Zombie](x,y,z),false,dimension)
},
minusOnUse:true,
category:"items"
},
{
name: "spawnSkeleton",
item: true,
onuse: (x,y,z, block, replaceItem,useDurability,minusOne,dimension,holding) => {
var pos = getPosition()
let ent = new entities[entityIds.Skeleton](pos[0],pos[1],pos[2])
if(holding.customName) ent.name = holding.customName
world.addEntity(ent,false,dimension)
},
spawnMob: function(x,y,z,dimension,world){
world.addEntity(new entities[entityIds.Skeleton](x,y,z),false,dimension)
},
minusOnUse:true,
category:"items"
},
{
name: "bone",
Name: "Bone",
item: true,
category:"items",
onentityuse:function(ent,replaceItem,useDurability,minusOne){
if(ent.type === "Wolf") ent.feed(this.id), minusOne()
}
},
{
name:"spawner",
Name:"Mob Spawner",
transparent:true,
blastResistance:5,
breakTime:25,
drop:"air",
experience:15,
tagBits:null,
tick:function(block,x,y,z,dimension,world){
let spawn = world.getTagByName(x,y,z,"spawn",dimension)
if(spawn){
world.sendAll({
type:"particles", particleType:"flameCube",
x,y,z,dimension, amount: 20
})
for(let i=0; i<10; i++){
let sx = x+round(rand(-4.5,4))
let sy = y+round(rand(-1.5,1.5))
let sz = z+round(rand(-4.5,4))
let block = world.getBlock(sx,sy,sz,dimension)
if(blockData[block].transparent){
blockData[spawn].spawnMob(sx,sy,sz,dimension,world)
break
}
}
}
},
onclientclick:function(x,y,z,dimension){
if(holding && blockData[holding].spawnMob){
world.setTagByName(x,y,z,"spawn",holding,false,dimension)
if(!settings.performanceFast) for(let i=0; i<30; i++){
world.addParticle(new entities[entityIds.FlameParticle](x+rand(-0.6,0.6),y+rand(-0.6,0.6),z+rand(-0.6,0.6)),dimension)
}
if(multiplayer) send({
type:"particles", particleType:"flameCube",
x,y,z,dimension, amount: 30
})
}else return true
}
},
{
name:"daylightDetector",
Name:"Daylight detector",
textures:["daylightDetectorSide","daylightDetectorTop","daylightDetectorSide"],
invertedTextures:fillTextureArray(["daylightDetectorSide","daylightDetectorInvertedTop","daylightDetectorSide"]),
transparent:true,
blastResistance:0.2,
breakTime:0.3,
woodSound:true,
onclick:function(x,y,z,dimension,world){
let block = world.getBlock(x,y,z,dimension)
let me = blockData[blockIds.daylightDetector]
if(block === (me.id | SLAB)) block = me.id
else block = me.id | SLAB
world.setBlock(x,y,z,block,false,false,false,false,dimension)
},
tick:function(block,x,y,z,dimension,world){
let power = round(world.getLight(x, y, z, 0, dimension)*world.skyLight)
if(block === (this.id | SLAB)) power = 15 - power
let prev = world.getPower(x,y,z,dimension)
if(prev !== power){
world.setPower(x,y,z,power,false,dimension)
if(power){
if(power < prev){
world.unspreadPower(x,y,z,prev,false,dimension)
}else if(power > prev){
world.spreadPower(x,y,z,power,dimension)
}
}else{
world.unspreadPower(x,y,z,prev,false,dimension)
}
}
},
onset:function(x,y,z,dimension,world){
this.tick(world.getBlock(x,y,z,dimension),x,y,z,dimension,world)
},
ondelete: function(x,y,z,prevTags,prev,dimension,world){
world.setPower(x,y,z,0,false,dimension)
world.unspreadPower(x,y,z, 16,false,dimension)
},
category:"redstone"
},
{
name:"commandBlock",
Name:"Command Block",
textures:["commandBlockBack",'commandBlockFront','commandBlockSide'],
errorTextures:fillTextureArray(["commandBlockBackError",'commandBlockFrontError','commandBlockSideError']),
sideTextures:["commandBlockSide","commandBlockSide","commandBlockBack","commandBlockFront","commandBlockSide","commandBlockSide"],
sideErrorTextures:["commandBlockSideError","commandBlockSideError","commandBlockBackError","commandBlockFrontError","commandBlockSideError","commandBlockSideError"],
flipTextures:fillTextureArray(["commandBlockFront",'commandBlockBack','commandBlockSide']),
flipErrorTextures:fillTextureArray(["commandBlockFrontError",'commandBlockBackError','commandBlockSideError']),
commandBlock:true,
tagBits: null,
onclientclick:function(x,y,z,dimension){
containerData.x = x
containerData.y = y
containerData.z = z
containerData.dimension = dimension
changeScene("commandBlock")
releasePointer()
},
onpowerupdate:function(x,y,z,sx,sy,sz,blockPowerChanged,dimension,world){
var power = world.getRedstonePower(x,y,z,dimension) || world.getSurroundingBlockPower(x,y,z,dimension) ? true : false
var on = world.getTagByName(x,y,z,"on",dimension) || false
if(power !== on) {
let data = world.getTagByName(x,y,z,"data",dimension)
world.setTagByName(x,y,z,"on",power,false,dimension)
let running = world.getTagByName(x,y,z,"running",dimension)
if(power && data && !running){
world.setTagByName(x,y,z,"running",true,false,dimension)
runCmd(data,{x,y,z,dimension},world,true, output => {
let outputHTML = "none"
outputHTML = ""
for(let i=0; i<output.length; i+=2){
if(i) outputHTML += "<br>"
outputHTML += Messages.format(output[i])
}
world.setTagByName(x,y,z,"output",outputHTML,false,dimension)
let target
let block = world.getBlock(x,y,z,dimension)
switch(block){
case this.id:
case this.id | FLIP:
target = this.id
break
case this.id | SLAB | NORTH:
case this.id | SLAB | FLIP | NORTH:
target = this.id | SLAB | NORTH
break
case this.id | SLAB | SOUTH:
case this.id | SLAB | FLIP | SOUTH:
target = this.id | SLAB | SOUTH
break
case this.id | SLAB | EAST:
case this.id | SLAB | FLIP | EAST:
target = this.id | SLAB | EAST
break
case this.id | SLAB | WEST:
case this.id | SLAB | FLIP | WEST:
target = this.id | SLAB | WEST
break
case this.id | STAIR:
case this.id | STAIR | FLIP:
target = this.id | STAIR
break
}
if(output && output[output.length-1] === "error") target |= FLIP
if(block !== target) world.setBlock(x,y,z,target,false,false,false,true,dimension)
}).then(() => world.setTagByName(x,y,z,"running",false,false,dimension))
}
}
},
rarity:"epic"
},
{
name:"spiderEye",
item:true,
category:"items"
},
{
name: "spawnSpider",
item: true,
onuse: (x,y,z, block, replaceItem,useDurability,minusOne,dimension,holding) => {
var pos = getPosition()
let ent = new entities[entityIds.Spider](pos[0],pos[1],pos[2])
if(holding.customName) ent.name = holding.customName
world.addEntity(ent,false,dimension)
},
spawnMob: function(x,y,z,dimension,world){
world.addEntity(new entities[entityIds.Spider](x,y,z),false,dimension)
},
minusOnUse:true,
category:"items"
},
{
name: "spawnCaveSpider",
item: true,
onuse: (x,y,z, block, replaceItem,useDurability,minusOne,dimension,holding) => {
var pos = getPosition()
let ent = new entities[entityIds.Spider](pos[0],pos[1],pos[2],true)
if(holding.customName) ent.name = holding.customName
world.addEntity(ent,false,dimension)
},
spawnMob: function(x,y,z,dimension,world){
world.addEntity(new entities[entityIds.Spider](x,y,z,true),false,dimension)
},
minusOnUse:true,
category:"items"
},
{
name: "spawnWolf",
item: true,
onuse: (x,y,z, block, replaceItem,useDurability,minusOne,dimension,holding) => {
var pos = getPosition()
let ent = new entities[entityIds.Wolf](pos[0],pos[1],pos[2])
if(holding.customName) ent.name = holding.customName
world.addEntity(ent,false,dimension)
},
spawnMob: function(x,y,z,dimension,world){
world.addEntity(new entities[entityIds.Wolf](x,y,z),false,dimension)
},
minusOnUse:true,
category:"items"
},
{
name:"nameTag",
Name:"Name Tag",
item:true,
onentityuse:function(ent,replaceItem,useDurability,minusOne,holding){
if(ent.mob && holding.customName){
minusOne()
ent.name = holding.customName
if(multiplayer) send({type:"entEvent",event:"name",data:holding.customName,id:ent.id})
dsujfdoneojndks(ent.name)
}
}
},
{
name:"blazeRod",
Name:"Blaze Rod",
item:true
},
{
name:"blazePowder",
Name:"Blaze Powder",
item:true
},
{
name: "spawnBlaze",
item: true,
onuse: (x,y,z, block, replaceItem,useDurability,minusOne,dimension,holding) => {
var pos = getPosition()
let ent = new entities[entityIds.Blaze](pos[0],pos[1],pos[2])
if(holding.customName) ent.name = holding.customName
world.addEntity(ent,false,dimension)
},
spawnMob: function(x,y,z,dimension,world){
world.addEntity(new entities[entityIds.Blaze](x,y,z),false,dimension)
},
minusOnUse:true,
category:"items"
},
{
name:"fireCharge",
item:true
},
{
name: "spawnEnderDragon",
item: true,
onuse: (x,y,z, block, replaceItem,useDurability,minusOne,dimension) => {
var pos = getPosition()
world.addEntity(new entities[entityIds.EnderDragon](pos[0],pos[1],pos[2]),false,dimension)
},
spawnMob: function(x,y,z,dimension,world){
world.addEntity(new entities[entityIds.EnderDragon](x,y,z),false,dimension)
},
minusOnUse:true,
category:"items",
hidden:true
},
{
name:"debugStick",
Name:function(){
let str
if(blockMode === CUBE) str = "Get Tags"
else if(blockMode === SLAB) str = "Change Block State"
else if(blockMode === STAIR) str = "Change Block Rotation"
else str = "No Function"
return str + " - Debug Stick - Press Enter to change mode"
},
item:true,
hidden:true,
onuse: function(x,y,z, block, replaceItem,useDurability,minusOne,dimension){
let me = blockData[blockIds.debugStick]
if(blockMode === CUBE) me.useGetTags(x,y,z, block, dimension)
else if(blockMode === SLAB) me.useChangeBlockState(x,y,z, block, dimension)
else if(blockMode === STAIR) me.useChangeBlockRotation(x,y,z, block, dimension)
},
useGetTags: (x,y,z, block, dimension) => {
let tags = world.getTags(x,y,z,dimension)
let str = "§dDEBUG<br>"
if(block && blockData[block].tagBits){
for(let i in blockData[block].tagBits){
str += i+": "+getTagBits(tags,i,block)+"<br>"
}
}else str += JSON.stringify(tags)
Messages.add(str)
},
useChangeBlockState: (x,y,z, block, dimension) => {
if(!block) return
let base = block&(isCube|ROTATION)
let states = [
CUBE,SLAB,STAIR,CROSS,TALLCROSS,DOOR,TORCH,LANTERN,LANTERNHANG,BEACON,
CACTUS,PANE,PORTAL,WALLFLAT,TRAPDOOR,TRAPDOOROPEN,FENCE,WALLPOST,
BUTTON,CHAIN,POT,POTCROSS,CARPET,CORNERSTAIRIN,CORNERSTAIROUT,VERTICALSLAB
]
let state = block&(~isCube)&(~ROTATION)//remove id and rotation, leaving block state
let idx = states.indexOf(state)
do{
idx++
if(idx >= states.length) idx = 0
state = states[idx]
}while(!blockData[block|state])
world.setBlock(x,y,z,base|state,false,true,false,true,dimension)
},
useChangeBlockRotation: (x,y,z, block, dimension) => {
if(!block) return
let base = block&(~ROTATION)&(~FLIP)
let states = [
NORTH,SOUTH,EAST,WEST,
NORTH|FLIP,SOUTH|FLIP,EAST|FLIP,WEST|FLIP
]
let state = block&(ROTATION|FLIP)
let idx = states.indexOf(state)
do{
idx++
if(idx >= states.length) idx = 0
state = states[idx]
}while(!blockData[block|state])
world.setBlock(x,y,z,base|state,false,true,false,true,dimension)
}
},
{
name: "oil",
textures:"oil",
transparent: true,
liquid: true,
solid:false,
shadow: false,
blastResistance:100,
hidden:true,
drop:"air",
burnChance: 1,
burnTime: 15,
density:0.1,
inLiquid:3,
getLevelDifference:function(level){return level-2},
onupdate:function(x,y,z,b,world,sx,sy,sz,dimension){
if(!world.settings.blocksFall) return
var me = this
world.setTimeout(() => me.flow(x,y,z,dimension,world), tickTime*5, x,y,z,dimension)
},
getY:function(x,y,z,dimension){
var block = world.getBlock(x,y,z,dimension)
return (min((this.getLevel(block) || (block ? 8 : 0))*2,14.5)/16)-0.5
},
},
{
name: "oilBucket",
Name:"Oil Bucket",
item: true,
onuse: (x,y,z, block, replaceItem,useDurability,minusOne,dimension) => {
if(survival)replaceItem(blockIds.bucket)
var pos = getPosition()
world.setBlock(pos[0],pos[1],pos[2],blockIds.oil,false,false,false,false,dimension)
},
stackSize: 1,
category:"items"
},
{ name: "silverBlock", Name:"Block of Silver", breakTime:25, type:"metal2",category:"build", stoneSound:true},
{ name: "limestone", Name:"Limestone", type:"rock1",category:"nature", breakTime:1.875, blastResistance:0.8, stoneSound:true, randomRotate:"flip",randomRotateTop:true,randomRotateBottom:true,randomRotateNorth:true,randomRotateSouth:true,randomRotateEast:true,randomRotateWest:true},
{
name: "spawnEnderman",
item: true,
onuse: (x,y,z, block, replaceItem,useDurability,minusOne,dimension,holding) => {
let pos = getPosition()
let ent = new entities[entityIds.Enderman](pos[0],pos[1],pos[2])
if(holding.customName) ent.name = holding.customName
world.addEntity(ent,false,dimension)
},
spawnMob: function(x,y,z,dimension,world){
world.addEntity(new entities[entityIds.Enderman](x,y,z),false,dimension)
},
minusOnUse:true,
category:"items"
},
{
name:"bambooBlock",
Name:"Block of Bamboo",
textures:["bambooBlockTop","bambooBlock"],
breakTime:3,
woodSound:true,
type:"wood",
category:"nature",
burnChance:0.1,
burnTime:50,
log:true
},
{
name:"bambooBlockSW",
textures: ["bambooBlock","bambooBlock","bambooBlockTop","bambooBlockSW"],
rotate: true, hidden:true
},
{
name:"strippedBambooBlock",
Name:"Stripped Block of Bamboo",
textures:["strippedBambooBlockTop","strippedBambooBlock"],
breakTime:3,
woodSound:true,
type:"wood",
category:"nature",
burnChance:0.1,
burnTime:50,
log:true
},
{
name:"strippedBambooBlockSW",
textures: ["strippedBambooBlock","strippedBambooBlock","strippedBambooBlockTop","strippedBambooBlockSW"],
rotate: true, hidden:true
},
{ name: "bambooPlanks", Name:"Bamboo Planks", type:"wood",category:"build", breakTime:3, woodSound:true, burnChance:0.1, burnTime:40},
{ name: "bambooMosaic", Name:"Bamboo Mosaic", type:"wood",category:"build", breakTime:3, woodSound:true, burnChance:0.1, burnTime:40},
{
name:"bambooButton",
Name: "Bamboo Button",
textures:"bambooPlanks",
button:true,
transparent: true,
shadow:false,
category:"redstone"
},
{ 
name: "bambooDoor",
Name:"Bamboo Door",
transparent: true,
shadow: false,
textures: "bambooDoorBottom",
door:true,
woodSound:true,
breakTime:4.5,
type:"wood",
category:"build"
},
{
name:"bambooFenceGate",
Name:"Bamboo Fence Gate",
textures:"bambooPlanks",
fenceGate:true,
breakTime:3,
woodSound:true,
type:"wood",
category:"build"
},
{
name: "bambooPressurePlate",
Name: "Bamboo Pressure Plate",
textures: "bambooPlanks",
pressurePlate: true,
breakTime:0.75,
type:"wood",
category:"redstone"
},
{
name:"bambooSign",
Name:"Bamboo sign",
textures:"bambooPlanks",
poleTop:"bambooBlockTop",
poleSide:"bambooBlock",
iconTexture:"bambooSign",
flatIcon:true,
sign:true,
breakTime:1.5,
woodSound:true,
type:"wood",
category:"decoration"
},
{ 
name: "bambooTrapdoor",
Name:"Bamboo Trapdoor",
transparent: true,
trapdoor: true,
woodSound: true,
category:"build"
},
{
name:"strippedCherryLog",
Name:"Stripped Cherry Log",
textures:["strippedCherryLogTop","strippedCherryLog"],
woodSound:true,
breakTime:3,
type:"wood",
burnChance:0.1,
burnTime:50,
category:"nature"
},
{
name:"strippedCherryLogSW",
textures: ["strippedCherryLog","strippedCherryLog","strippedCherryLogTop","strippedCherryLogSW"],
rotate: true, hidden:true
},
{ name: "cherryPlanks", Name:"Cherry Planks", type:"wood",category:"build", breakTime:3, woodSound:true, burnChance:0.1, burnTime:40},
{
name:"cherryButton",
Name: "Cherry Button",
textures:"cherryPlanks",
button:true,
transparent: true,
shadow:false,
category:"redstone"
},
{ 
name: "cherryDoor",
Name:"Cherry Door",
transparent: true,
shadow: false,
textures: "cherryDoorBottom",
door:true,
woodSound:true,
breakTime:4.5,
type:"wood",
category:"build"
},
{
name:"cherryFenceGate",
Name:"Cherry Fence Gate",
textures:"cherryPlanks",
fenceGate:true,
breakTime:3,
woodSound:true,
type:"wood",
category:"build"
},
{
name: "cherryPressurePlate",
Name: "Cherry Pressure Plate",
textures: "cherryPlanks",
pressurePlate: true,
breakTime:0.75,
type:"wood",
category:"redstone"
},
{
name:"cherrySign",
Name:"Cherry sign",
textures:"cherryPlanks",
poleTop:"cherryLogTop",
poleSide:"cherryLog",
iconTexture:"cherrySign",
flatIcon:true,
sign:true,
breakTime:1.5,
woodSound:true,
type:"wood",
category:"decoration"
},
{ 
name: "cherryTrapdoor",
Name:"Cherry Trapdoor",
transparent: true,
trapdoor: true,
woodSound: true,
category:"build"
},
{
name:"cherryChair",
Name:"Cherry Chair",
textures:"cherryPlanks",
shapeName:"chair",
transparent:true,
shadow:false,
onclientclick:sit,
category:"items"
},
{
name:"bambooChair",
Name:"Bamboo Chair",
textures:"bambooPlanks",
shapeName:"chair",
transparent:true,
shadow:false,
onclientclick:sit,
category:"items"
},
{
name: "suspicousSand",
Name:"sussy Sand",
textures:"suspiciousSand0",
breakTime:0.75, blastResistance:0.5,
onupdate: function(x,y,z,b,world,sx,sy,sz,dimension){
fall(x,y,z,b,world,false,dimension)
},
ongetexploded:function(x,y,z,b,world,dimension){
fall(x,y,z,b,world,true,dimension)
},
drop:"air"
},
{
name: "suspicousGravel",
Name:"Gravel is sus",
textures:"suspiciousGravel0",
breakTime:0.75, blastResistance:0.5,
onupdate: function(x,y,z,b,world,sx,sy,sz,dimension){
fall(x,y,z,b,world,false,dimension)
},
ongetexploded:function(x,y,z,b,world,dimension){
fall(x,y,z,b,world,true,dimension)
},
drop:"air"
},
{
name:"pitcherPlant",
Name:"Pitcher Plant",
shapeName:"pitcherPlant",
flatIcon:true,
solid: false,
transparent: true,
shadow: false,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature"
},
{
name:"pitcherPod",
Name:"Pitcher Pod",
item:true,
useAs:function(x,y,z,block,face){
if(!block) return
if(face === "top" && blockData[block].name === "farmland") return "pitcherCrop"
},
category:"items"
},
{
name:"pitcherCrop",
textures:"pitcherCropSide",
textures1:new Array(6).fill("pitcherCropBottomStage1"),
textures2:new Array(6).fill("pitcherCropBottomStage2"),
textures3:new Array(6).fill("pitcherCropBottomStage3"),
textures4:new Array(6).fill("pitcherCropBottomStage4"),
transparent: true,
shadow: false,
solid: false,
drop:"pitcherPod",
hidden:true,
liquidBreakable:"drop"
},
{
name: "torchflower",
Name:"\"Torch\" flower",
textures1:new Array(6).fill("torchflowerCropStage0"),
textures2:new Array(6).fill("torchflowerCropStage1"),
drop:"torchflowerSeeds",
solid: false,
transparent: true,
shadow: false,
potCross: true,
crossShape: true,
compostChance:0.65,
liquidBreakable:"drop",
category:"nature"
},
{
name:"torchflowerSeeds",
Name:"Torchflower seeds",
item:true,
useAs:function(x,y,z,block,face){
return blockIds.torchflower|SLAB
},
category:"items"
},
{
name:"driedOakLeaves",
Name:"Dried Oak Leaves",
breakTime:0.15,
drop:"air",
category:"nature",
grassSound: true,
transparent:true,
shadow:false,
solid:false,
driedLeaves:true
},
];
const BLOCK_COUNT = blockData.length
console.log(BLOCK_COUNT," blocks on server side")
win.emptyFunc = function(){}
let blockIds = {}
let generateBlockIds = {
grass:true, dirt:true, stone: true, gravel: true,
snowBlock: true, snow: true, packedIce:true, ice:true,
Water: true, powderSnow: true,
coarseDirt:true, podzol: true,
sand: true, bedrock: true, deepslate: true,
terracotta: true, sandstone: true,
mycelium: true, redSand: true,
redTerracotta: true, orangeTerracotta: true, yellowTerracotta: true, whiteTerracotta: true, lightGrayTerracotta: true, brownTerracotta: true
} //blocks that can be naturally generated
let semiTransBlocks = []
function initBlockData(){
const stoneDigSound = ["block.stone.dig1", "block.stone.dig2", "block.stone.dig3", "block.stone.dig4"],
stoneStepSound = ["block.stone.step1", "block.stone.step2","block.stone.step3","block.stone.step4","block.stone.step5","block.stone.step6"],
woodDigSound = ["block.wood.dig1", "block.wood.dig2", "block.wood.dig3", "block.wood.dig4"],
woodStepSound = ["block.wood.step1", "block.wood.step2","block.wood.step3","block.wood.step4","block.wood.step5","block.wood.step6"],
clothDigSound = ["block.cloth.dig1", "block.cloth.dig2", "block.cloth.dig3", "block.cloth.dig4"],
clothStepSound = ["block.cloth.step1", "block.cloth.step2","block.cloth.step3","block.cloth.step4"],
glassDigSound = ["block.glass.dig1", "block.glass.dig2", "block.glass.dig3"],
nyliumDigSound = ["block.nylium.dig1", "block.nylium.dig2", "block.nylium.dig3", "block.nylium.dig4", "block.nylium.dig5", "block.nylium.dig6"],
nyliumStepSound = ["block.nylium.step1", "block.nylium.step2","block.nylium.step3","block.nylium.step4","block.nylium.step5","block.nylium.step6"],
stemDigSound = ["block.stem.dig1", "block.stem.dig2", "block.stem.dig3", "block.stem.dig4", "block.stem.dig5", "block.stem.dig6"],
stemStepSound = ["block.stem.step1", "block.stem.step2","block.stem.step3","block.stem.step4","block.stem.step5","block.stem.step6"],
basaltDigSound = ["block.basalt.dig1", "block.basalt.dig2", "block.basalt.dig3", "block.basalt.dig4", "block.basalt.dig5"],
basaltStepSound = ["block.basalt.step1", "block.basalt.step2","block.basalt.step3","block.basalt.step4","block.basalt.step5","block.basalt.step6"],
rootDigSound = ["block.roots.dig1", "block.roots.dig2", "block.roots.dig3", "block.roots.dig4", "block.roots.dig5", "block.roots.dig6"],
rootStepSound = ["block.roots.step1", "block.roots.step2","block.roots.step3","block.roots.step4","block.roots.step5","block.roots.step6"],
amethystPlaceSound = ["block.amethyst.place1","block.amethyst.place2","block.amethyst.place3","block.amethyst.place4"],
amethystDigSound = ["block.amethyst.dig1","block.amethyst.dig2","block.amethyst.dig3","block.amethyst.dig4"],
amethystStepSound = (function(){var arr=[]; for(var i=0; i<14; i++){arr.push("block.amethyst.step"+(i+1))};return arr})(),
amethystClusterPlaceSound = ["block.amethyst_cluster.place1", "block.amethyst_cluster.place2", "block.amethyst_cluster.place3", "block.amethyst_cluster.place4"],
amethystClusterDigSound = ["block.amethyst_cluster.dig1", "block.amethyst_cluster.dig2", "block.amethyst_cluster.dig3", "block.amethyst_cluster.dig4"],
deepslatePlaceSound = ["block.deepslate.place1","block.deepslate.place2","block.deepslate.place3","block.deepslate.place4","block.deepslate.place5","block.deepslate.place6"],
deepslateStepSound = ["block.deepslate.step1","block.deepslate.step2","block.deepslate.step3","block.deepslate.step4","block.deepslate.step5","block.deepslate.step6"],
deepslateDigSound = ["block.deepslate.dig1","block.deepslate.dig2","block.deepslate.dig3","block.deepslate.dig4"],
deepslateBricksPlaceSound = [1,2,3,4,5,6].map(v => "block.deepslate_bricks.place"+v),
deepslateBricksStepSound = [1,2,3,4,5].map(v => "block.deepslate_bricks.step"+v),
grassDigSound = ["block.grass.dig1", "block.grass.dig2", "block.grass.dig3", "block.grass.dig4"],
grassStepSound = ["block.grass.step1", "block.grass.step2","block.grass.step3","block.grass.step4","block.grass.step5","block.grass.step6"]
const defaultTagBits = {
power:[15,5], //extra for power level 16 (power sources)
blockPowerNorth:[20,2],
blockPowerSouth:[22,2],
blockPowerEast:[24,2],
blockPowerWest:[26,2],
blockPowerTop:[28,2],
blockPowerBottom:[30,2],
} /*
tag bits have a index and a count
if tagBits is set to null
- it stores it as a properties of an object,
otherwise
- it stores it in specific bits in a number
*/
// Set defaults on blockData
for (let i = 1; i < BLOCK_COUNT; ++i) {
const data = blockData[i];
data.id = i;
if ( !("textures" in data) ) {
data.textures = new Array(6).fill(data.name);
} else if (typeof data.textures === "string") {
data.textures = new Array(6).fill(data.textures);
} else {
const { textures } = data;
if (textures.length === 3) {
textures[3] = textures[2];
textures[4] = textures[2];
textures[5] = textures[2];
} else if (textures.length === 2) {
// Top and bottom are the first texture, sides are the second.
textures[2] = textures[1];
textures[3] = textures[2];
textures[4] = textures[2];
textures[5] = textures[2];
textures[1] = textures[0];
}else if(textures.length === 4){
textures[4] = textures[5] = textures[3]
textures[3] = textures[2]
}
}
data.transparent = data.transparent || false
data.shadow = data.shadow !== undefined ? data.shadow : true
data.shade = data.shade !== undefined ? data.shade : true
data.smoothLight = data.smoothLight !== undefined ? data.smoothLight : true //if smoothLight is false, it also needs to be transparent
data.lightLevel = data.lightLevel || 0
if(data.solid === undefined)data.solid = true
data.breakTime = data.breakTime ? data.breakTime*1000 : 0.05*1000 //time for breaking
if(data.dropAmount === undefined) data.dropAmount = 1
if(data.crossShape || data.tallcrossShape || data.sideCross || data.ladder || data.torch || data.lantern || data.chain || data.sunflower || data.crop || data.tallCrop) data.smoothLight = false
if(data.item){
data.transparent = true
data.shadow = false
}
if(data.liquid) data.noHitbox = true
if(!data.stackSize)data.stackSize = 64
if(data.pickaxe){
data.stackSize = 1
data.attackTime = 20/1.2
}
if(data.sword){
data.stackSize = 1
data.attackTime = 20/1.6
}
if(data.shovel){
data.stackSize = 1
data.attackTime = 20/1
}
if(data.axe || data.hoe){
data.stackSize = 1
}
data.tool = data.tool || data.pickaxe || data.sword || data.shovel || data.axe || data.hoe
if(data.attackSpeed) data.attackTime = 20/data.attackSpeed
if(data.tagBits !== null){
if(data.tagBits) Object.assign(data.tagBits,defaultTagBits)
else data.tagBits = defaultTagBits
}
if(data.stoneSound){
data.digSound = stoneDigSound
data.stepSound = stoneStepSound
}
if(data.woodSound){
data.digSound = woodDigSound
data.stepSound = woodStepSound
}
if(data.clothSound){
data.digSound = clothDigSound
data.stepSound = clothStepSound
}
if(data.glassSound){
data.digSound = glassDigSound
data.placeSound = stoneDigSound
}
if(data.nyliumSound){
data.digSound = nyliumDigSound
data.stepSound = nyliumStepSound
}
if(data.stemSound){
data.digSound = stemDigSound
data.stepSound = stemStepSound
}
if(data.basaltSound){
data.digSound = basaltDigSound
data.stepSound = basaltStepSound
}
if(data.rootSound){
data.digSound = rootDigSound
data.stepSound = rootStepSound
}
if(data.amethystSound){
data.placeSound = amethystPlaceSound
data.digSound = amethystDigSound
data.stepSound = amethystStepSound
}
if(data.amethystClusterSound){
data.placeSound = amethystClusterPlaceSound
data.digSound = amethystClusterDigSound
}
if(data.deepslateSound){
data.placeSound = deepslatePlaceSound
data.digSound = deepslateDigSound
data.stepSound = deepslateStepSound
}
if(data.deepslateBricksSound){
data.placeSound = deepslateBricksPlaceSound
data.stepSound = deepslateBricksStepSound
}
if(data.grassSound){
data.digSound = grassDigSound
data.stepSound = grassStepSound
}
data.Name = data.Name || data.name
data.pistonPush = data.pistonPush !== undefined ? data.pistonPush : true
data.pistonPull = data.pistonPull !== undefined ? data.pistonPull : true
}
blockData.forEach(block => {
blockIds[block.name] = block.id
if(block.rotate && block.name.includes("SW")){
let unSw = block.name.replace("SW",'')
if(blockIds[unSw]){
block.drop = unSw
let obj = blockData[blockIds[unSw]]
block.breakTime = obj.breakTime
block.type = obj.type
block.burnChance = obj.burnChance
block.burnTime = obj.burnTime
block.log = obj.log
obj.swId = block.id
}
}
if(generateBlockIds[block.name]) generateBlockIds[block.name] = block.id
if(block.semiTrans){
semiTransBlocks.push(block.id)
}
})
}
const breakTypes = {
plant: "axe",
wood: "axe",
metal1: "pickaxe",
metal2: ["stonePickaxe","ironPickaxe","diamondPickaxe","netheritePickaxe"],
metal3: ["ironPickaxe","diamondPickaxe","netheritePickaxe"],
metal4: ["diamondPickaxe","netheritePickaxe"],
rock1: "pickaxe",
rock2: ["stonePickaxe","ironPickaxe","diamondPickaxe","netheritePickaxe"],
rock3: ["ironPickaxe","diamondPickaxe","netheritePickaxe"],
rock4: ["diamondPickaxe","netheritePickaxe"],
ground: "shovel",
plant2: "hoe",
wool:"air"
}
var handBreakable = [
"plant","wood","plant2","ground","wool"
]
var allPickaxes = ["woodenPickaxe","stonePickaxe","ironPickaxe","diamondPickaxe","netheritePickaxe","goldenPickaxe"]
var allShovels = ["woodenShovel","stoneShovel","ironShovel","diamondShovel","netheriteShovel","goldenShovel"]
for(var b in breakTypes){
var t = breakTypes[b]
if(t === "pickaxe"){
breakTypes[b] = allPickaxes
}
if(t === "shovel"){
breakTypes[b] = allShovels
}
}
let structures = {
endPortal:{
data:[
`sssssssss
sssssssss
sssssssss
sssssssss
sssssssss
sssssssss
sssssssss
sssssssss
sssssssss
sssssssss
sssssssss
sssssssss
sssssssss
sssssssss`,
`sssssssss
s       s
s sssss s
s sllls s
s sllls s
s sllls s
s sssss s
s  sss  s
s  sss  s
s  ttt  s
s       s
sss   sss
sls   sls
sssssssss`,
`sssssssss
s       s
s       s
s       s
s       s
s       s
s       s
s  sss  s
s  ttt  s
s       s
s       s
s       s
s       s
sssssssss`,
`sssssssss
s       s
s  ---  s
s (   ) s
s (   ) s
s (   ) s
s  ___  s
s  ttt  s
s       s
s       s
s       s
s       s
s       s
sssssssss`,
`sssssssss
s       s
s       s
s       s
s       s
s       s
s       s
s       s
s       s
s       s
s       s
s       s
s       s
sssssssss`,
`sssssssss
s       s
s       s
s       s
s       s
s       s
s       s
s       s
s       s
s       s
s       s
s       s
s       s
sssssssss`,
`sssssssss
sssssssss
sssssssss
sssssssss
sssssssss
sssssssss
sssssssss
sssssssss
sssssssss
sssssssss
sssssssss
sssssssss
sssssssss
sssssssss`,
],
pallete:{
s:"stoneBricks",
"_":(n,e,s,w)=>random()>0.75?blockIds.endPortalFrame|SLAB|e:blockIds.endPortalFrame|e,
"-":(n,e,s,w)=>random()>0.75?blockIds.endPortalFrame|SLAB|w:blockIds.endPortalFrame|w,
"(":(n,e,s,w)=>random()>0.75?blockIds.endPortalFrame|SLAB|s:blockIds.endPortalFrame|s,
")":(n,e,s,w)=>random()>0.75?blockIds.endPortalFrame|SLAB|n:blockIds.endPortalFrame|n,
l:"Lava"," ":"air",
t:(n,e,s,w)=>blockIds.stoneBricks|STAIR|w,
},
getY:(x,z,rnd)=>{
return 10+Math.round(rnd%16)
}
}
}
let structureArr = []
for(let i in structures){
let s = structures[i]
let ss = {pallete:s.pallete,getY:s.getY,data:[]}
let se = {pallete:s.pallete,getY:s.getY,data:[]}
let sw = {pallete:s.pallete,getY:s.getY,data:[]}
let data = []
let w=0, h=s.data.length, d=0
for(let i=0;i<s.data.length;i++){
let rows = s.data[i].split("\n")
w = Math.max(w,rows.length)
for(let j=0;j<rows.length;j++){
let row = rows[j]
d = Math.max(d,row.length)
for(let k=0;k<row.length;k++){
if(s.pallete[row[k]]){
data.push(j,i,k,s.pallete[row[k]])
ss.data.push(rows.length-j,i,row.length-k,s.pallete[row[k]])
se.data.push(k,i,j,s.pallete[row[k]])
sw.data.push(row.length-k,i,rows.length-j,s.pallete[row[k]])
}
}
}
}
s.data = data
s.w = w, s.h = h, s.d = d
ss.w = w, ss.h = h, ss.d = d
se.w = d, se.h = h, se.d = w
sw.w = d, sw.h = h, sw.d = w
s.variants = [s,se,ss,sw]
structureArr.push(i)
}
function objectify(x, y, z, width, height, textureX, textureY, texXFlip,texYFlip,rotateTex,texW,texH,textureName) {
return {
x: x,
y: y,
z: z,
w: width,
h: height,
tx: textureX,
ty: textureY,
txf: texXFlip,
tyf: texYFlip,
rt:rotateTex,
tw:texW || width,
th:texH || height,
t:textureName
}
}
function customFace(x,y,z,x2,y2,z2,x3,y3,z3,x4,y4,z4, tx,ty,tw,th, t){
tw = tw || 16
th = th || 16
return {
x,y,z,x2,y2,z2,x3,y3,z3,x4,y4,z4, tx,ty,tw,th,
t,
custom:true
}
}
function generateItemShape(){
var arr = []
var bottom = [],
top = [],
east = [],
west = []
var i
for(i=0; i<16; i++){
bottom.push(objectify(0,i,7.5,16,1,0,(16-i)-1))
top.push(objectify(0,i+1,8.5,16,1,0,16-i-1))
east.push(objectify(i+1,16,7.5,1,16,(16-i)-1,0))
west.push(objectify(i,16,8.5,1,16,(16-i)-1,0))
}
return [bottom,top,
[objectify(16, 16, 8.5, 16, 16, 0, 0, true)],[objectify( 0, 16,  7.5, 16, 16, 0, 0)],
east,west]
}
function layerShape(h){
return [
[objectify(0,0,0,16,16,0,0)],
[objectify(0,h,16,16,16,0,0)],
[objectify(16, h, 16, 16, h, 0, 16-h)],
[objectify( 0, h,  0, 16, h, 0, 16-h)],
[objectify(16, h,  0, 16, h, 0, 16-h)],
[objectify( 0, h, 16, 16, h, 0, 16-h)]
]
}
function liquidLayerShape(h){
return [
[objectify(0,0,0,16,16,0,0),objectify(16,0,0,-16,16,16,0, false,false,false,null,null, "in")],
[objectify(0,h,16,16,16,0,0),objectify(16,h,16,-16,16,16,0, false,false,false,null,null, "in")],
[objectify(16, h, 16, 16, h, 0, 16-h),objectify( 0, h, 16, -16, h, 16, 16-h, false,false,false,null,null, "in")],
[objectify( 0, h,  0, 16, h, 0, 16-h),objectify(16, h,  0, -16, h, 16, 16-h, false,false,false,null,null, "in")],
[objectify(16, h,  0, 16, h, 0, 16-h),objectify(16, h, 16, -16, h, 16, 16-h, false,false,false,null,null, "in")],
[objectify( 0, h, 16, 16, h, 0, 16-h),objectify( 0, h,  0, -16, h, 16, 16-h, false,false,false,null,null, "in")]
]
}
function generateRepeater(delay = 1, on = false){
on = on ? 16 : 0
var arr = [
[objectify(0,0,0,16,16,-48,0)],
[objectify(0,2,16,16,16,on,0),objectify(7,7,14,2,2,-25+on,6),objectify(7,7,12 - delay*2,2,2,-25+on,6)], //top
[objectify(16,2,16,16,2,-48,14),objectify(9,7,14,2,5,-25+on,6),objectify(9,7,12 - delay*2,2,5,-25+on,6)], //north
[objectify(0,2,0,16,2,-48,14),objectify(7,7,12,2,5,-25+on,6),objectify(7,7,10 - delay*2,2,5,-25+on,6)],  //south
[objectify(16,2,0,16,2,-48,14),objectify(9,7,12,2,5,-25+on,6),objectify(9,7,10 - delay*2,2,5,-25+on,6)], //east
[objectify(0,2,16,16,2,-48,14),objectify(7,7,14,2,5,-25+on,6),objectify(7,7,12 - delay*2,2,5,-25+on,6)] //west
]
if(on){
arr[0].push(objectify(6,7,9 - delay*2,4,4,-10,5))
arr[1].push(objectify(6,5,13 - delay*2,4,4,-10,5))
arr[2].push(objectify(10,8,10 - delay*2,4,4,-10,5))
arr[3].push(objectify(6,8,12 - delay*2,4,4,-10,5))
arr[4].push(objectify(7,8,9 - delay*2,4,4,-10,5))
arr[5].push(objectify(9,8,13 - delay*2,4,4,-10,5))
arr[0].push(objectify(6,7,11,4,4,-10,5))
arr[1].push(objectify(6,5,15,4,4,-10,5))
arr[2].push(objectify(10,8,12,4,4,-10,5))
arr[3].push(objectify(6,8,14,4,4,-10,5))
arr[4].push(objectify(7,8,11,4,4,-10,5))
arr[5].push(objectify(9,8,15,4,4,-10,5))
}
return arr
}
function generateComparator(subtractMode,on){
on = on ? 16 : 0
subtractMode = subtractMode ? 16 : 0
var subtractModeUp = subtractMode ? 1 : 0
var arr = [
[objectify(0,0,0,16,16,0,0)],
[objectify(0,2,16,16,16,0,0),objectify(7,4+subtractModeUp,14,2,2,-41+subtractMode,6),objectify(4,7,5,2,2,-41+on,6),objectify(10,7,5,2,2,-41+on,6)],
[objectify(16,2,16,16,2,-64,2),objectify(9,4+subtractModeUp,14,2,2,-41+subtractMode,6),objectify(6,7,5,2,5,-41+on,6),objectify(12,7,5,2,5,-41+on,6)],
[objectify(0,2,0,16,2,-64,2),objectify(7,4+subtractModeUp,12,2,2,-41+subtractMode,6),objectify(4,7,3,2,5,-41+on,6),objectify(10,7,3,2,5,-41+on,6)],
[objectify(16,2,0,16,2,-64,2),objectify(9,4+subtractModeUp,12,2,2,-41+subtractMode,6),objectify(6,7,3,2,5,-41+on,6),objectify(12,7,3,2,5,-41+on,6)],
[objectify(0,2,16,16,2,-64,2),objectify(7,4+subtractModeUp,14,2,2,-41+subtractMode,6),objectify(4,7,5,2,5,-41+on,6),objectify(10,7,5,2,5,-41+on,6)]
]
if(subtractMode){
arr[0].push(objectify(6,5,11,4,4,-26,5))
arr[1].push(objectify(6,3,15,4,4,-26,5))
arr[2].push(objectify(10,6,12,4,4,-26,5))
arr[3].push(objectify(6,6,14,4,4,-26,5))
arr[4].push(objectify(7,6,11,4,4,-26,5))
arr[5].push(objectify(9,6,15,4,4,-26,5))
}
if(on){
arr[0].push(objectify(3,7,2,4,4,-26,5))
arr[1].push(objectify(3,5,6,4,4,-26,5))
arr[2].push(objectify(7,8,3,4,4,-26,5))
arr[3].push(objectify(3,8,5,4,4,-26,5))
arr[4].push(objectify(4,8,2,4,4,-26,5))
arr[5].push(objectify(6,8,6,4,4,-26,5))
arr[0].push(objectify(9,7,2,4,4,-26,5))
arr[1].push(objectify(9,5,6,4,4,-26,5))
arr[2].push(objectify(13,8,3,4,4,-26,5))
arr[3].push(objectify(9,8,5,4,4,-26,5))
arr[4].push(objectify(10,8,2,4,4,-26,5))
arr[5].push(objectify(12,8,6,4,4,-26,5))
}
return arr
}
function generateRectangleShape(w,h,name){
const offsetX = -w*8
let arr = []
for(let x=0; x<w; x++) for(let y=0; y<h; y++){
if(!textures[name]) continue
let t = name+(x+y*w)
let tex = textureCoords[textureMap[t]]
arr.push(objectify(x*16+offsetX,y*16,8,16,16,0,0,false,false,false,null,null,t))
}
return[[],[],arr,[],[],[]]
}
function generateSpike(verts,x,y,z,tilt,h,t){
verts[2].push(customFace(2+x,y+h,2+tilt+z, 10+x,y+h,2+tilt+z, 10+x,y,4+z, 2+x,y,4+z, 8,0,8,16,t))
verts[3].push(customFace(14+x,y+h,2+tilt+z, 6+x,y+h,2+tilt+z, 6+x,y,0+z, 14+x,y,0+z, 8,0,8,16,t))
verts[4].push(customFace(8+x,y+h,-4+tilt+z, 8+x,y+h,4+tilt+z, 6+x,y,4+z, 6+x,y,-4+z, 8,0,8,16,t))
verts[5].push(customFace(8+x,y+h,6+tilt+z, 8+x,y+h,tilt+z, 10+x,y,0+z, 10+x,y,8+z, 8,0,8,16,t))
}
let shapes = {
/*
[
[(-x, -z), (+x, -z), (+x, +z), (-x, +z)], // minX = 0,  minZ = 2,  maxX = 6, maxZ = 8
[(-x, +z), (+x, +z), (+x, -z), (-x, -z)], // minX = 9,  minZ = 10, maxX = 3, maxZ = 4
[(+x, +y), (-x, +y), (-x, -y), (+x, -y)], // minX = 6,  minY = 7,  maxX = 0, maxY = 1
[(-x, +y), (+x, +y), (+x, -y), (-x, -y)], // minX = 9,  minY = 10, maxX = 3, maxY = 4
[(+y, -z), (+y, +z), (-y, +z), (-y, -z)], // minY = 10, minZ = 11, maxY = 4, maxZ = 5
[(+y, +z), (+y, -z), (-y, -z), (-y, +z)]  // minY = 7,  minZ = 8,  maxY = 1, maxZ = 2
]
*/
cube: {
verts: [
// x, y, z, width, height, textureX, textureY
// 0, 0, 0 is the corner on the top left of the texture
[objectify( 0,  0,  0, 16, 16, 0, 0)], //bottom
[objectify( 0, 16, 16, 16, 16, 0, 0)], //top
[objectify(16, 16, 16, 16, 16, 0, 0)], //north
[objectify( 0, 16,  0, 16, 16, 0, 0)], //south
[objectify(16, 16,  0, 16, 16, 0, 0)], //east
[objectify( 0, 16, 16, 16, 16, 0, 0)]  //west
],
},
rotate: {
verts: [
[objectify( 0,  0,  0, 16, 16, 0, 0)], //bottom
[objectify( 0, 16, 16, 16, 16, 0, 0)], //top
[objectify(16, 16, 16, 16, 16, 0, 0)], //north
[objectify( 0, 16,  0, 16, 16, 0, 0)], //south
[objectify(16, 16,  0, 16, 16, 0, 0)], //east
[objectify( 0, 16, 16, 16, 16, 0, 0)]  //west
],
rotate: true
},
flipped:{
verts: [
[objectify( 0,  0,  0, 16, 16, 0, 0)], //bottom
[objectify( 0, 16, 16, 16, 16, 0, 0)], //top
[objectify(16, 16, 16, 16, 16, 0, 0, false,true)], //north
[objectify( 0, 16,  0, 16, 16, 0, 0, false,true)], //south
[objectify(16, 16,  0, 16, 16, 0, 0, false,true)], //east
[objectify( 0, 16, 16, 16, 16, 0, 0, false,true)]  //west
]
},
SW:{
verts: [
[objectify( 0,  0,  0, 16, 16, 0, 0)], //bottom
[objectify( 0, 16, 16, 16, 16, 0, 0, false,false, 2)], //top
[objectify(16, 16, 16, 16, 16, 0, 0)], //north
[objectify( 0, 16,  0, 16, 16, 0, 0)], //south
[objectify(16, 16,  0, 16, 16, 0, 0, false,false, 1)], //east
[objectify( 0, 16, 16, 16, 16, 0, 0, false,false, -1)]  //west
],
rotate:true
},
rotateSW:{
verts: [
[objectify( 0,  0,  0, 16, 16, 0, 0)], //bottom
[objectify( 0, 16, 16, 16, 16, 0, 0, false,false, 2)], //top
[objectify(16, 16, 16, 16, 16, 0, 0)], //north
[objectify( 0, 16,  0, 16, 16, 0, 0)], //south
[objectify(16, 16,  0, 16, 16, 0, 0, false,false, 1)], //east
[objectify( 0, 16, 16, 16, 16, 0, 0, false,false, -1)]  //west
],
rotate:true
},
_1PixLower:{
verts: [
[objectify( 0,  0,  0, 16, 16, 0, 0)], //bottom
[objectify( 0, 15, 16, 16, 16, 0, 0)], //top
[objectify(16, 15, 16, 16, 15, 0, 1)], //north
[objectify( 0, 15,  0, 16, 15, 0, 1)], //south
[objectify(16, 15,  0, 16, 15, 0, 1)], //east
[objectify( 0, 15, 16, 16, 15, 0, 1)]  //west
],
},
none: {
verts: [[],[],[],[],[],[]],
hitbox:"cube"
},
slab: {
verts: [
[objectify( 0, 0,  0, 16, 16, 0, 0)], //bottom
[objectify( 0, 8, 16, 16, 16, 0, 0)], //top
[objectify(16, 8, 16, 16, 8, 0, 0)], //north
[objectify( 0, 8,  0, 16, 8, 0, 0)], //south
[objectify(16, 8,  0, 16, 8, 0, 0)], //east
[objectify( 0, 8, 16, 16, 8, 0, 0)]  //west
],
flip: true
},
verticalSlab:{
verts:[
[objectify(0,0,8,16,8,0,0)],
[objectify(0,16,16,16,8,0,0)],
[objectify(16,16,16,16,16,0,0)],
[objectify(0,16,8,16,16,0,0)],
[objectify(16,16,8,8,16,0,0)],
[objectify(0,16,16,8,16,0,0)]
],
rotate: true
},
stair: {
verts: [
[objectify( 0, 0,  0, 16, 16, 0, 0)], //bottom
[objectify( 0, 8,  8, 16, 8, 0, 8), objectify( 0, 16,  16, 16, 8, 0, 0)], //top
[objectify(16, 16, 16, 16, 16, 0, 0)], //north
[objectify( 0, 8,  0, 16, 8, 0, 0), objectify( 0, 16,  8, 16, 8, 0, 0)], //south
[objectify(16, 8, 0, 8, 8, 8, 0), objectify(16, 16, 8, 8, 16, 0, 0)], //east
[objectify( 0, 8, 8, 8, 8, 0, 0), objectify( 0, 16, 16, 8, 16, 8, 0)]  //west
],
flip: true,
rotate: true
},
stairCornerOut: {
verts: [
[objectify( 0, 0,  0, 16, 16, 0, 0)], //bottom
[objectify( 0, 8,  16, 16, 16, 0, 0), objectify( 0, 16,  16, 8, 8, 0, 0)], //top
[objectify(8, 16, 16, 8, 8, 0, 0), objectify(16, 8, 16, 16, 8, 0, 0)], //north
[objectify( 0, 8,  0, 16, 8, 0, 0), objectify( 0, 16,  8, 8, 8, 0, 0)], //south
[objectify(16, 8, 0, 16, 8, 0, 0), objectify(8, 16, 8, 8, 16, 0, 0)], //east
[objectify( 0, 8, 8, 8, 8, 0, 0), objectify( 0, 16, 16, 8, 16, 8, 0)]  //west
],
flip: true,
rotate: true
},
stairCornerIn: {
verts: [
[objectify(0,0,0,16,16,0,0)],
[objectify(8,8,8,8,8,0,0),objectify(0,16,16,16,8,0,0),objectify(0,16,8,8,8,0,0)],
[objectify(16,16,16,16,16,0,0)],
[objectify(8,16,8,8,8,0,0),objectify(0,16,0,8,8,0,0),objectify(0,8,0,16,8,0,0)],
[objectify(8,16,0,8,8,0,0),objectify(16,16,8,8,8,0,0),objectify(16,8,0,16,8,0,0)],
[objectify(0,16,16,16,16,0,0)]
],
flip: true,
rotate: true
},
cross: {
verts: [
[], //bottom
[], //top
[customFace(2,16,2, 14,16,14, 14,0,14, 2,0,2, 0,0)], //north
[customFace(14,16,2, 2,16,14, 2,0,14, 14,0,2, 0,0)], //south
[customFace(14,16,14, 2,16,2, 2,0,2, 14,0,14, 0,0)], //east
[customFace(2,16,14, 14,16,2, 14,0,2, 2,0,14, 0,0)]  //west
],
hitbox: "cube"
},
sideCross: {
verts: [
[], //bottom
[], //top
[customFace(2,2,16, 14,14,16, 14,14,0, 2,2,0, 0,16,16,-16)], //north
[customFace(14,2,16, 2,14,16, 2,14,0, 14,2,0, 0,16,16,-16)], //south
[customFace(14,14,16, 2,2,16, 2,2,0, 14,14,0, 0,16,16,-16)], //east
[customFace(2,14,16, 14,2,16, 14,2,0, 2,14,0, 0,16,16,-16)]  //west
],
rotate: true,
hitbox: "cube"
},
bottomCross: {
verts: [
[], //bottom
[], //top
[customFace(2,16,2, 14,16,14, 14,0,14, 2,0,2, 0,16,16,-16)], //north
[customFace(14,16,2, 2,16,14, 2,0,14, 14,0,2, 0,16,16,-16)], //south
[customFace(14,16,14, 2,16,2, 2,0,2, 14,0,14, 0,16,16,-16)], //east
[customFace(2,16,14, 14,16,2, 14,0,2, 2,0,14, 0,16,16,-16)]  //west
],
size: 6,
hitbox: "cube"
},
tallCross: {
verts: [
[], //bottom
[], //top
[customFace(2,16,2, 14,16,14, 14,0,14, 2,0,2, 16,0),customFace(2,32,2, 14,32,14, 14,16,14, 2,16,2, 0,0)], //north
[customFace(14,16,2, 2,16,14, 2,0,14, 14,0,2, 16,0),customFace(14,32,2, 2,32,14, 2,16,14, 14,16,2, 0,0)], //south
[customFace(14,16,14, 2,16,2, 2,0,2, 14,0,14, 16,0),customFace(14,32,14, 2,32,2, 2,16,2, 14,16,14, 0,0)], //east
[customFace(2,16,14, 14,16,2, 14,0,2, 2,0,14, 16,0),customFace(2,32,14, 14,32,2, 14,16,2, 2,16,14, 0,0)]  //west
],
hitbox:"tallCube"
},
door: {
verts: [
[objectify( 0,  0,  0, 16, 3, 0, 0, false,false,false,null,2)], //bottom
[objectify( 0, 16, 3, 16, 3, 0, 0),objectify( 0, 32, 3, 16, 3, -16, 0, false,false,false,null,2)], //top
[objectify(16, 16, 3, 16, 16, 0, 0),objectify(16, 32, 3, 16, 16, -16, 0)], //north
[objectify(0, 32, 0, 16, 16, -16,0, true),objectify(0, 16, 0, 16, 16, 0,0, true)], //south
[objectify(16, 16,  0, 3, 16, 0, 0, false,false,false,2),objectify(16, 32,  0, 3, 16, -16, 0, false,false,false,2)], //east
[objectify( 0, 16, 3, 3, 16, 0, 0, false,false,false,2),objectify( 0, 32, 3, 3, 16, -16, 0, false,false,false,2)]  //west
],
rotate: true
},
torchHitbox:{
verts:[
[objectify( 7,  0,  7, 2, 2, 7, 14)], //bottom
[objectify( 7, 10, 9, 2, 2, 7, 6)], //top
[objectify(9, 10, 9, 2, 10, 7, 6)], //north
[objectify( 7, 10,  7, 2, 10, 7, 6)], //south
[objectify(9, 10,  7, 2, 10, 7, 6)], //east
[objectify( 7, 10, 9, 2, 10, 7, 6)]  //west
],
},
torch: {
verts: [
[objectify( 7,  0,  7, 2, 2, 7, 14)], //bottom
[objectify( 7, 10, 9, 2, 2, 7, 6)], //top
[objectify(16, 16, 9, 16, 16, 0, 0)], //north
[objectify( 0, 16,  7, 16, 16, 0, 0)], //south
[objectify(9, 16,  0, 16, 16, 0, 0)], //east
[objectify( 7, 16, 16, 16, 16, 0, 0)]  //west
],
hitbox:"torchHitbox"
},
wallTorch: {
verts: [
[customFace(9,4,17, 7,4,17, 7,3,15, 9,3,15, 7,14,2,2)],
[customFace(9,13,11, 7,13,11, 7,14,13, 9,14,13, 7,6,2,2)],
[customFace(16,20,10.6, 0,20,10.6, 0,4,17, 16,4,17, 0,0,16,16)], //north
[customFace(0,19,8.6, 16,19,8.6, 16,3,15, 0,3,15, 0,0,16,16)], //south
[customFace(9,15.5,1.6, 9,23.5,17.6, 9,7.5,24, 9,-0.5,8, 0,0,16,16)], //east
[customFace(7,23.5,17.6, 7,15.5,1.6, 7,-0.5,8, 7,7.5,24, 0,0,16,16)]  //west
],
rotate: true
},
lantern: {
verts: [
[objectify(5,  0, 5, 6, 6, 0, 9)], //bottom
[objectify(6, 9, 10, 4, 4, 1, 10),objectify(5, 7, 11, 6, 6, 0, 9)], //top
[objectify(10, 9, 10, 4, 2, 1, 0),objectify(11, 7, 11, 6, 7, 0, 2),objectify(9.5, 11, 8, 3, 2, 11, 10)], //north
[objectify(6, 9, 6, 4, 2, 1, 0),objectify(5, 7, 5, 6, 7, 0, 2),objectify(6.5, 11, 8, 3, 2, 11, 10)], //south
[objectify(10, 9, 6, 4, 2, 1, 0),objectify(11, 7, 5, 6, 7, 0, 2)], //east
[objectify(6, 9, 10, 4, 2, 1, 0),objectify(5, 7, 11, 6, 7, 0, 2)]  //west
],
texVerts: [],
varients: [],
buffer: null,
size: 6,
},
lanternHang: {
verts: [
[objectify(5,  0, 5, 6, 6, 0, 9)], //bottom
[objectify(6, 9, 10, 4, 4, 1, 10),objectify(5, 7, 11, 6, 6, 0, 9)], //top
[objectify(10, 9, 10, 4, 2, 1, 0),objectify(11, 7, 11, 6, 7, 0, 2),objectify(9.5, 11, 8, 3, 2, 11, 10),objectify(9.5, 16, 8, 3, 3, 11, 2)], //north
[objectify(6, 9, 6, 4, 2, 1, 0),objectify(5, 7, 5, 6, 7, 0, 2),objectify(6.5, 11, 8, 3, 2, 11, 10),objectify(6.5, 16, 8, 3, 3, 11, 2)], //south
[objectify(10, 9, 6, 4, 2, 1, 0),objectify(11, 7, 5, 6, 7, 0, 2),objectify(8, 14, 6.5, 3, 4, 11, 1)], //east
[objectify(6, 9, 10, 4, 2, 1, 0),objectify(5, 7, 11, 6, 7, 0, 2),objectify(8, 14, 9.5, 3, 4, 11, 1)]  //west
],
texVerts: [],
varients: [],
buffer: null,
size: 6,
},
beacon: {
verts: [
[objectify( 0, 0,  0, 16, 16, 0, 0,null,null,null,null,null,"glass"),objectify( 2, 0.001, 2, 12, 12, 0, 0,null,null,null,null,null,"obsidian")], //bottom
[objectify( 3, 13, 13, 10, 10, 3, 3),objectify( 0,  16,  16, 16, 16, 0, 0,null,null,null,null,null,"glass"),objectify( 2, 3, 14, 12, 12, 0, 3,null,null,null,null,null,"obsidian")], //top
[objectify(13, 13, 13, 10, 10, 3, 3),objectify( 16, 16,  16, 16, 16, 0, 0,null,null,null,null,null,"glass"),objectify(14, 3, 14, 12, 3,  0, 3,null,null,null,null,null,"obsidian")], //north
[objectify( 3, 13,  3, 10, 10, 3, 3),objectify( 0,  16,  0,  16, 16, 0, 0,null,null,null,null,null,"glass"),objectify(2,  3, 2,  12, 3,  0, 3,null,null,null,null,null,"obsidian")], //south
[objectify(13, 13,  3, 10, 10, 3, 3),objectify( 16, 16,  0,  16, 16, 0, 0,null,null,null,null,null,"glass"),objectify(14, 3, 2,  12, 3,  0, 3,null,null,null,null,null,"obsidian")], //east
[objectify( 3, 13, 13, 10, 10, 3, 3),objectify( 0,  16,  16, 16, 16, 0, 0,null,null,null,null,null,"glass"),objectify(2,  3, 14, 12, 3,  0, 3,null,null,null,null,null,"obsidian")]  //west
],
size: 6,
},
cactus: {
verts: [
[objectify( 0,  0,  0, 16, 16, 0, 0)], //bottom
[objectify( 0, 16, 16, 16, 16, 0, 0)], //top
[objectify(16, 16, 15, 16, 16, 0, 0)], //north
[objectify( 0, 16,  1, 16, 16, 0, 0)], //south
[objectify(15, 16,  0, 16, 16, 0, 0)], //east
[objectify( 1, 16, 16, 16, 16, 0, 0)]  //west
],
hitbox: "cube"
},
pane: {
verts: [
[objectify( 0,  0,  7, 16, 2, 0, 7)], //bottom
[objectify( 0, 16, 9, 16, 2, 0, 7)], //top
[objectify(16, 16, 9, 16, 16, 0, 0)], //north
[objectify( 0, 16,  7, 16, 16, 0, 0)], //south
[objectify(16, 16, 7, 2, 16, 7, 0)], //east
[objectify(0, 16, 9, 2, 16, 7, 0)]  //west
],
rotate: true
},
horizontalPane: {
verts:[
[objectify(0,7,0,16,16,0,0)],
[objectify(0,9,16,16,16,0,0)],
[objectify(16,9,16,16,2,0,7)],
[objectify(0,9,0,16,2,0,7)],
[objectify(16,9,0,16,2,0,7)],
[objectify(0,9,16,16,2,0,7)]
],
},
portal: {
verts: [
[objectify(0, 0, 7, 16, 2, 0, 0)],
[objectify(0, 16, 9, 16, 2, 0, 0)],
[objectify(16, 16, 9, 16, 16, 0, 0)],
[objectify(0, 16, 7, 16, 16, 0, 0)],
[objectify(16, 16, 7, 2, 16, 0, 0)],
[objectify(0, 16, 9, 2, 16, 0, 0)]
],
rotate: true
},
trapdoor: {
verts: [
[objectify(0, 0, 0, 16, 16, 0, 0)], //bottom
[objectify(0, 3, 16, 16, 16, 0, 0)], //top
[objectify(16, 3, 16, 16, 3, 0, 0)], //north
[objectify(0, 3, 0, 16, 3, 0, 0)], //south
[objectify(16, 3, 0, 16, 3, 0, 0)], //east
[objectify(0, 3, 16, 16, 3, 0, 0)]  //west
],
rotate: true,
flip: true
},
trapdoorOpen: {
verts: [
[objectify(0, 0, 13, 16, 3, 0, 0)], //bottom
[objectify(0, 16, 16, 16, 3, 0, 0)], //top
[objectify(16, 16, 16, 16, 16, 0, 0)], //north
[objectify(0, 16, 13, 16, 16, 0, 0)], //south
[objectify(16, 16, 13, 3, 16, 0, 0)], //east
[objectify(0, 16, 16, 3, 16, 0, 0)]  //west
],
size: 6,
rotate: true
},
wallFlat: {
verts: [
// x, y, z, width, height, textureX, textureY
// 0, 0, 0 is the corner on the top left of the texture
[objectify(0, 0, 0, 0, 0, 0, 0)], //bottom
[objectify(0, 16, 16, 0, 0, 0, 0)], //top
[objectify(16, 16, 16, 16, 16, 0, 0)], //north
[objectify(0, 16,  15, 16, 16, 0, 0)], //south
[objectify(0, 0,  0, 0, 0, 0, 0)], //east
[objectify(0, 0, 16, 0, 0, 0, 0)]  //west
],
rotate: true
},
fence: {
verts: [
[objectify(6, 0, 6, 4, 4, 0, 1)], //bottom
[objectify(6, 16, 10, 4, 4, 0, 1)], //top
[objectify(10, 16, 10, 4, 16, 6, 0)], //north
[objectify(6, 16, 6, 4, 16, 6, 0)], //south
[objectify(10, 16, 6, 4, 16, 6, 0)], //east
[objectify(6, 16, 10, 4, 16, 6, 0)]  //west
],
size: 6,
},
wallpost: {
verts: [
// x, y, z, width, height, textureX, textureY
// 0, 0, 0 is the corner on the top left of the texture
[objectify(4, 0, 4, 8, 8, 4, 4)], //bottom
[objectify(4, 16, 12, 8, 8, 4, 4)], //top
[objectify(12, 16, 12, 8, 16, 4, 0)], //north
[objectify(4, 16, 4, 8, 16, 4, 0)], //south
[objectify(12, 16, 4, 8, 16, 4, 0)], //east
[objectify(4, 16, 12, 8, 16, 4, 0)]  //west
],
size: 6
},
wall: {
verts: [
// x, y, z, width, height, textureX, textureY
// 0, 0, 0 is the corner on the top left of the texture
[objectify(4, 0, 4, 8, 8, 4, 4),objectify(5, 0, 12, 6, 4, 5, 10)], //bottom
[objectify(4, 16, 12, 8, 8, 4, 4),objectify(5, 16, 16, 6, 4, 5, 10)], //top
[objectify(12, 16, 12, 8, 16, 4, 0),objectify(11, 16, 16, 6, 16, 5, 0)], //north
[objectify(4, 16, 4, 8, 16, 4, 0)], //south
[objectify(12, 16, 4, 8, 16, 4, 0),objectify(11, 16, 12, 4, 16, 12, 0)], //east
[objectify(4, 16, 12, 8, 16, 4, 0),objectify(5, 16, 16, 4, 16, 12, 0)]  //west
],
rotate: true
},
wallu: {
verts: [
// x, y, z, width, height, textureX, textureY
// 0, 0, 0 is the corner on the top left of the texture
[objectify(4, 0, 4, 8, 8, 4, 4),objectify(5, 0, 12, 6, 4, 5, 10)], //bottom
[objectify(4, 16, 12, 8, 8, 4, 4),objectify(5, 13, 16, 6, 4, 5, 10)], //top
[objectify(12, 16, 12, 8, 16, 4, 0),objectify(11, 13, 16, 6, 13, 5, 3)], //north
[objectify(4, 16, 4, 8, 16, 4, 0)], //south
[objectify(12, 16, 4, 8, 16, 4, 0),objectify(11, 13, 12, 4, 13, 12, 3)], //east
[objectify(4, 16, 12, 8, 16, 4, 0),objectify(5, 13, 16, 4, 13, 12, 3)]  //west
],
rotate: true
},
fencq: {
verts: [
[objectify(6, 0, 6, 4, 4, 0, 1),objectify(10, 12, 7, 6, 2, 0, 2),objectify(10, 6, 7, 6, 2, 0, 2)], //bottom
[objectify(6, 16, 10, 4, 4, 0, 1),objectify(10, 15, 9, 6, 2, 0, 2),objectify(10, 9, 9, 6, 2, 0, 2)], //top
[objectify(10, 16, 10, 4, 16, 6, 0),objectify(16, 15, 9, 6, 3, 6, 0),objectify(16, 9, 9, 6, 3, 6, 0)], //north
[objectify(6, 16, 6, 4, 16, 6, 0),objectify(10, 15, 7, 6, 3, 6, 0),objectify(10, 9, 7, 6, 3, 6, 0)], //south
[objectify(10, 16, 6, 4, 16, 6, 0)], //east
[objectify(6, 16, 10, 4, 16, 6, 0)]  //west
],
rotate: true
},
fench: {
verts:[
[objectify(6,0,6,4,4,0,1),objectify(10,12,7,6,2,0,2),objectify(10,6,7,6,2,0,2),objectify(0,12,7,6,2,0,0),objectify(0,6,7,6,2,0,0)],
[objectify(6,16,10,4,4,0,1),objectify(10,15,9,6,2,0,2),objectify(10,9,9,6,2,0,2),objectify(0,15,9,6,2,0,0),objectify(0,9,9,6,2,0,0)],
[objectify(10,16,10,4,16,6,0),objectify(16,15,9,6,3,6,0),objectify(16,9,9,6,3,6,0),objectify(6,15,9,6,3,0,0),objectify(6,9,9,6,3,0,0)],
[objectify(6,16,6,4,16,6,0),objectify(10,15,7,6,3,6,0),objectify(10,9,7,6,3,6,0),objectify(0,15,7,6,3,0,0),objectify(0,9,7,6,3,0,0)],
[objectify(10,16,6,4,16,6,0)],
[objectify(6,16,10,4,16,6,0)]
],
rotate: true
},
button: {
verts: [
[objectify(5, 6, 14, 6, 2, 5, 6)], //bottom
[objectify(5, 10, 16, 6, 2, 5, 6)], //top
[objectify(11, 10, 16, 6, 4, 5, 6)], //north
[objectify(5, 10, 14, 6, 4, 5, 6)], //south
[objectify(11, 10, 14, 2, 4, 5, 6)], //east
[objectify(5, 10, 16, 2, 4, 5, 6)]  //west
],
rotate: true
},
chain: {
verts: [
[objectify(8, 0, 8, 0.5, 0.5, 0, 0)], //bottom
[objectify(8, 16, 8, 0.5, 0.5, 0, 0)], //top
[objectify(9.5, 16, 8, 3, 16, 3, 0)], //north
[objectify(6.5, 16, 8, 3, 16, 3, 0)], //south
[objectify(8, 16, 6.5, 3, 16, 0, 0)], //east
[objectify(8, 16, 9.5, 3, 16, 0, 0)] //west
],
size: 6,
},
pot: {
verts: [
[objectify(5, 0, 5, 6, 6, 5, 10)], //bottom
[objectify(5, 6, 11, 6, 6, 5, 5), objectify(6, 4, 10, 4, 4, -16, 0)], //top
[objectify(11, 6, 11, 6, 6, 5, 10), objectify(11, 6, 6, 6, 6, 5, 10)], //north
[objectify(5, 6, 5, 6, 6, 5, 10), objectify(5, 6, 10, 6, 6, 5, 10)], //south
[objectify(11, 6, 5, 6, 6, 5, 10), objectify(6, 6, 5, 6, 6, 5, 10)], //east
[objectify(5, 6, 11, 6, 6, 5, 10), objectify(10, 6, 11, 6, 6, 5, 10)]  //west
],
size: 6,
},
potCross: {
verts: [
[], //bottom
[], //top
[customFace(2,4,2, 14,4,14, 14,-12,14, 2,-12,2, 0,0)], //north
[customFace(14,4,2, 2,4,14, 2,-12,14, 14,-12,2, 0,0)], //south
[customFace(14,4,14, 2,4,2, 2,-12,2, 14,-12,14, 0,0)], //east
[customFace(2,4,14, 14,4,2, 14,-12,2, 2,-12,14, 0,0)]  //west
],
size: 6
},
carpet: {
verts: [
[objectify( 0, 0,  0, 16, 16, 0, 0)], //bottom
[objectify( 0, 1, 16, 16, 16, 0, 0)], //top
[objectify(16, 1, 16, 16, 1, 0, 0)], //north
[objectify( 0, 1,  0, 16, 1, 0, 0)], //south
[objectify(16, 1,  0, 16, 1, 0, 0)], //east
[objectify( 0, 1, 16, 16, 1, 0, 0)]  //west
]
},
bed: {
verts: [
[objectify( 0, 3,  0, 16, 16, -16, 0),objectify( 0, 3,  16, 16, 16, -16, 0),
objectify(0, 0, 0, 3,3,  38,0),
objectify(13, 0, 29, 3,3,38,0),
objectify(0, 0, 29, 3,3, 38,0),
objectify(13, 0, 0, 3,3, 38,0)], //bottom
[objectify( 0, 9, 32, 16, 16, 16, 0),objectify( 0, 9, 16, 16, 16, 0, 0)], //top
[objectify(16, 9, 32, 16, 6, 80, 6),
objectify(3, 3, 3, 3,3,  38,3),
objectify(16, 3, 32, 3,3,32,3),
objectify(3, 3, 32, 3,3, 35,3),
objectify(16, 3, 3, 3,3, 41,3)], //north
[objectify( 0, 9,  0, 16, 6, 80, 0),
objectify(0, 3, 0, 3,3,  32,3),
objectify(13, 3, 29, 3,3,38,3),
objectify(0, 3, 29, 3,3, 41,3),
objectify(13, 3, 0, 3,3, 35,3)], //south
[objectify( 16, 9,  0, 16, 6, 48, 0),objectify( 16, 9,  16, 16, 6, 64, 0),
objectify(3, 3, 0, 3,3,  41,3),
objectify(16, 3, 29, 3,3,35,3),
objectify(3, 3, 29, 3,3, 38,3),
objectify(16, 3, 0, 3,3, 32,3)], //east
[objectify( 0, 9, 32, 16, 6, 64, 6),objectify( 0, 9, 16, 16, 6, 48, 6),
objectify(0, 3, 3, 3,3,  35,3),
objectify(13, 3, 32, 3,3,41,3),
objectify(0, 3, 32, 3,3, 32,3),
objectify(13, 3, 3, 3,3, 38,3)]  //west
],
rotate: true
},
cactusPot: {
verts: [
[], //bottom
[objectify( 6, 1, 10, 4,  4, 6, 6)], //top
[objectify(10, 1, 10, 4, 11, 6, 0)], //north
[objectify( 6, 1,  6, 4, 11, 6, 0)], //south
[objectify(10, 1,  6, 4, 11, 6, 0)], //east
[objectify( 6, 1, 10, 4, 11, 6, 0)]  //west
],
size: 6
},
crop: {
verts: [
[objectify(0,0,0,0,0,0,0)],
[objectify(0,0,0,0,0,0,0)],
[objectify(16,16,4,16,16,0,0),objectify(16,16,12,16,16,0,0)],
[objectify(0,16,12,16,16,0,0),objectify(0,16,4,16,16,0,0)],
[objectify(4,16,0,16,16,0,0),objectify(12,16,0,16,16,0,0)],
[objectify(12,16,16,16,16,0,0),objectify(4,16,16,16,16,0,0)]
],
varients: []
},
anvil: {
verts: [
[objectify(2,0,2,12,12,0,0),objectify(0,10,3,16,10,0,0)],
[objectify(2,4,14,12,12,0,0),objectify(3,5,12,10,8,0,0),objectify(0,16,13,16,10,-16,3)],
[objectify(14,4,14,12,4,0,0),objectify(16,16,13,16,6,0,0),objectify(13,5,12,10,1,0,0),objectify(12,10,11,8,5,0,0)],
[objectify(2,4,2,12,4,0,0),objectify(0,16,3,16,6,0,0),objectify(3,5,4,10,1,0,0),objectify(4,10,5,8,5,0,0)],
[objectify(14,4,2,12,4,0,0),objectify(16,16,3,10,6,0,0),objectify(13,5,4,8,1,0,0),objectify(12,10,5,6,5,0,0)],
[objectify(2,4,14,12,4,0,0),objectify(0,16,13,10,6,0,0),objectify(3,5,12,8,1,0,0),objectify(4,10,11,6,5,0,0)]
],
rotate: true
},
/*liquid: {
verts: [
[objectify( 0,  0,  0, 16, 16, 0, 0), objectify(16, 0, 0, -16, 16, 16, 0)], //bottom
[objectify( 0, 16, 16, 16, 16, 0, 0), objectify(16, 16, 16, -16, 16, 16, 0)], //top
[objectify(16, 16, 16, 16, 16, 0, 0), objectify(0, 16, 16, -16, 16, 16, 0)], //north
[objectify( 0, 16,  0, 16, 16, 0, 0), objectify(16, 16, 0, -16, 16, 16, 0)], //south
[objectify(16, 16,  0, 16, 16, 0, 0), objectify(16, 16, 16, -16, 16, 16, 0)], //east
[objectify( 0, 16, 16, 16, 16, 0, 0), objectify(0, 16, 0, -16, 16, 16, 0)]  //west
],
cull: {
top: 3,
bottom: 3,
north: 3,
south: 3,
east: 3,
west: 3
}
},
liquidSurface: {
verts: [
[objectify( 0,    0,  0, 16,   16, 0, 0), objectify(16, 0, 0, -16, 16, 16, 0)], //bottom
[objectify( 0, 14.5, 16, 16,   16, 0, 0), objectify(16, 14.5, 16, -16, 16, 16, 0)], //top
[objectify(16, 14.5, 16, 16, 14.5, 0, 0), objectify(0, 14.5, 16, -16, 14.5, 16, 0)], //north
[objectify( 0, 14.5,  0, 16, 14.5, 0, 0), objectify(16, 14.5, 0, -16, 14.5, 16, 0)], //south
[objectify(16, 14.5,  0, 16, 14.5, 0, 0), objectify(16, 14.5, 16, -16, 14.5, 16, 0)], //east
[objectify( 0, 14.5, 16, 16, 14.5, 0, 0), objectify(0, 14.5, 0, -16, 14.5, 16, 0)]  //west
],
cull: {
top: 0,
bottom: 3,
north: 3,
south: 3,
east: 3,
west: 3
}
},*/
sporeBlossom: {
verts: [
[objectify( 1, 15.9, 1, 14, 14, -15, 1)], //bottom
[objectify( 1, 15.9, 15, 14, 14, -15, 1)], //top
[customFace(0,15.9,8, 16,15.9,8, 16,11.1,-8, 0,11.1,-8, 16,16,-16,-16), customFace(16,15.9,8, 0,15.9,8, 0,11.1,-8, 16,11.1,-8, 16,16,-16,-16)],
[customFace(0,15.9,8, 16,15.9,8, 16,11.1,24, 0,11.1,24, 16,16,-16,-16), customFace(16,15.9,8, 0,15.9,8, 0,11.1,24, 16,11.1,24, 16,16,-16,-16)], //southobjectify( 0, 16,  0, 16, 16, 0, 0)
[customFace(8,15.9,0, 8,15.9,16, -8,11.1,16, -8,11.1,0, 16,16,-16,-16), customFace(8,15.9,16, 8,15.9,0, -8,11.1,0, -8,11.1,16, 16,16,-16,-16)],
[customFace(8,15.9,0, 8,15.9,16, 24,11.1,16, 24,11.1,0, 16,16,-16,-16), customFace(8,15.9,16, 8,15.9,0, 24,11.1,0, 24,11.1,16, 16,16,-16,-16)]
],
},
azalea: {
verts: [
[objectify( 0,  8,  0, 16, 16, 0, 0)], //bottom
[objectify( 0, 16, 16, 16, 16, 0, 0)], //top
[objectify(16, 16, 16, 16, 16, 0, 0),customFace(0,16,0, 16,16,16, 16,0,16, 0,0,0, -32,0)], //north
[objectify( 0, 16,  0, 16, 16, 0, 0),customFace(16,16,0, 0,16,16, 0,0,16, 16,0,0, -32,0)], //south
[objectify(16, 16,  0, 16, 16, 0, 0),customFace(16,16,16, 0,16,0, 0,0,0, 16,0,16, -32,0)], //east
[objectify( 0, 16, 16, 16, 16, 0, 0),customFace(0,16,16, 16,16,0, 16,0,0, 0,0,16, -32,0)]  //west
]
},
azaleaPot: {
verts: [
[objectify( 4,  -7,  4, 8, 8, 4, 4)], //bottom
[objectify( 4, -1, 12, 8, 8, 4, 4)], //top
[objectify(12, -1, 12, 8, 11, 4, 5),customFace(4,-1,4, 12,-1,12, 12,-12,12, 4,-12,4, -12,5,8,11)], //north
[objectify( 4, -1,  4, 8, 11, 4, 5),customFace(12,-1,4, 4,-1,12, 4,-12,12, 12,-12,4, -12,5,8,11)], //south
[objectify(12, -1,  4, 8, 11, 4, 5),customFace(12,-1,12, 4,-1,4, 4,-12,4, 12,-12,12, -12,5,8,11)], //east
[objectify( 4, -1, 12, 8, 11, 4, 5),customFace(4,-1,12, 12,-1,4, 12,-12,4, 4,-12,12, -12,5,8,11)]  //west
],
texVerts: [],
varients: [],
buffer: null,
size: 6
},
sunflower: {
verts: [
[customFace(0,34,7, 16,34,7, 16,18,11, 0,18,11, 0,0)], //bottom
[customFace(16,34,7, 0,34,7, 0,18,11, 16,18,11, 0,0)], //top
[customFace(2,16,2, 14,16,14, 14,0,14, 2,0,2, -16,0),customFace(2,32,2, 14,32,14, 14,16,14, 2,16,2, 0,0)], //north
[customFace(14,16,2, 2,16,14, 2,0,14, 14,0,2, -16,0),customFace(14,32,2, 2,32,14, 2,16,14, 14,16,2, 0,0)], //south
[customFace(14,16,14, 2,16,2, 2,0,2, 14,0,14, -16,0),customFace(14,32,14, 2,32,2, 2,16,2, 14,16,14, 0,0)], //east
[customFace(2,16,14, 14,16,2, 14,0,2, 2,0,14, -16,0),customFace(2,32,14, 14,32,2, 14,16,2, 2,16,14, 0,0)]  //west
]
},
cake:{
verts: [
[objectify(1,0,1,14,14,1,1)],
[objectify(1,8,15,14,14,1,1)],
[objectify(15,8,15,14,8,1,8)],
[objectify(1,8,1,14,8,1,8)],
[objectify(15,8,1,14,8,1,8)],
[objectify(1,8,15,14,8,1,8)]
]
},
stonecutter:{
verts:[
[objectify(0,0,0,16,16,0,0)],
[objectify(0,9,16,16,16,0,0)],
[objectify(16,9,16,16,9,0,7),objectify(16,16,8,16,7,16,9)],
[objectify(0,9,0,16,9,0,7),objectify(0,16,8,16,7,16,9)],
[objectify(16,9,0,16,9,0,7)],
[objectify(0,9,16,16,9,0,7)]
]
},
itemFrame:{
verts: [
[objectify(2,2,15,12,1,-16,0),objectify(3,13,15,10,1,-16,0)],
[objectify(2,14,16,12,1,-16,0),objectify(3,3,16,10,1,-16,0)],
[objectify(14,14,16,12,12,-16,0)],
[objectify(3,13,15.5,10,10,3,3),objectify(2,14,15,11,1,-14,2),objectify(13,14,15,1,11,-3,2),objectify(3,3,15,11,1,-13,13),objectify(2,13,15,1,11,-14,3)],
[objectify(14,14,15,1,12,-16,0),objectify(3,13,15,1,10,-16,0)],
[objectify(2,14,16,1,12,-16,0),objectify(13,13,16,1,10,-16,0)]
],
rotate:true
},
endPortalFrame:{
verts: [
[objectify( 0,  0,  0, 16, 16, 0, 0)], //bottom
[objectify( 0, 13, 16, 16, 16, 0, 0)], //top
[objectify(16, 13, 16, 16, 13, 0, 3)], //north
[objectify( 0, 13,  0, 16, 13, 0, 3)], //south
[objectify(16, 13,  0, 16, 13, 0, 3)], //east
[objectify( 0, 13, 16, 16, 13, 0, 3)]  //west
],
rotate:true
},
endPortalFrameWithEyeOfEnder: {
verts: [
[objectify( 0,  0,  0, 16, 16, 0, 0)], //bottom
[objectify( 0, 13, 16, 16, 16, 0, 0), objectify( 4, 16, 12, 8, 8, 36, 4)], //top
[objectify(16, 13, 16, 16, 13, 0, 3), objectify( 12, 16, 12, 8, 3, 20, 0)], //north
[objectify( 0, 13,  0, 16, 13, 0, 3), objectify( 4, 16, 4, 8, 3, 20, 0)], //south
[objectify(16, 13,  0, 16, 13, 0, 3), objectify( 12, 16, 4, 8, 3, 20, 0)], //east
[objectify( 0, 13, 16, 16, 13, 0, 3), objectify( 4, 16, 12, 8, 3, 20, 0)]  //west
],
rotate: true
},
fire: {
verts: [
[], //bottom
[], //top
[customFace(16,22.4,15.5, 0,22.4,15.5, 0,0,16, 16,0,16, 0,0), customFace(0,22.4,15.5, 16,22.4,15.5, 16,0,16, 0,0,16, 0,0), customFace(0,20,12, 16,20,12, 16,0,0, 0,0,0, 0,0), customFace(16,20,12, 0,20,12, 0,0,0, 16,0,0, 0,0)], //north
[customFace(16,22.4,0.5, 0,22.4,0.5, 0,0,0, 16,0,0, 0,0), customFace(0,22.4,0.5, 16,22.4,0.5, 16,0,0, 0,0,0, 0,0), customFace(16,20,4, 0,20,4, 0,0,16, 16,0,16, 0,0), customFace(0,20,4, 16,20,4, 16,0,16, 0,0,16, 0,0)], //south
[customFace(15.5,22.4,16, 15.5,22.4,0, 16,0,0, 16,0,16, 0,0), customFace(15.5,22.4,0, 15.5,22.4,16, 16,0,16, 16,0,0, 0,0), customFace(12,20,0, 12,20,16, 0,0,16, 0,0,0, 0,0), customFace(12,20,16, 12,20,0, 0,0,0, 0,0,16, 0,0)], //east
[customFace(0.5,22.4,16, 0.5,22.4,0, 0,0,0, 0,0,16, 0,0), customFace(0.5,22.4,0, 0.5,22.4,16, 0,0,16, 0,0,0, 0,0), customFace(4,20,0, 4,20,16, 16,0,16, 16,0,0, 0,0), customFace(4,20,16, 4,20,0, 16,0,0, 16,0,16, 0,0)]  //west
],
hitbox:"cube"
},
sideFire:{
verts:[
[],
[],
[customFace(16,22.4,14, 0,22.4,14, 0,0,16, 16,0,16, 0,0)],
[customFace(0,22.4,14, 16,22.4,14, 16,0,16, 0,0,16, 0,0)],
[],
[]
],
rotate:true,
hitbox:"cube"
},
bottomFire:{
verts:[
[customFace(0,12,0, 16,12,0, 16,16,16, 0,16,16, 0,0),customFace(16,12,16, 0,12,16, 0,16,0, 16,16,0, 0,0), customFace(16,12,0, 16,12,16, 0,16,16, 0,16,0, 0,0),customFace(0,12,16, 0,12,0, 16,16,0, 16,16,16, 0,0)],
[customFace(16,12,0, 0,12,0, 0,16,16, 16,16,16, 0,0),customFace(0,12,16, 16,12,16, 16,16,0, 0,16,0, 0,0), customFace(0,12,0, 0,12,16, 16,16,16, 16,16,0, 0,0),customFace(16,12,16, 16,12,0, 0,16,0, 0,16,16, 0,0)],
[],
[],
[],
[]
],
hitbox:"cube"
},
endRod: {
verts: [
[objectify( 6, 0,  6, 4, 4, 2, 4)], //bottom
[objectify( 7, 16, 9, 2, 2, 2, 0),objectify(6, 1,  10, 4, 4, 2, 4)], //top
[objectify(9, 16, 9, 2, 15, 0, 0),objectify(10, 1, 10, 4, 1, 2, 2)], //north
[objectify(7, 16, 7, 2, 15, 0, 0),objectify(6, 1,  6, 4, 1, 2, 2)], //south
[objectify(9, 16, 7, 2, 15, 0, 0),objectify(10, 1, 6, 4, 1, 2, 2)], //east
[objectify(7, 16, 9, 2, 15, 0, 0),objectify(6, 1, 10, 4, 1, 2, 2)]  //west
],
flip: true,
},
endRodSW: {
verts: [
[objectify(7, 7, 0, 2, 15, 0, 0),objectify(6, 6,  15, 4, 1, 2, 4)], //bottom
[objectify(7, 9, 15, 2, 15, 0, 0),objectify(6, 10, 16, 4, 1, 2, 4)], //top
[objectify(10, 10, 16, 4, 4, 2, 4)], //north
[objectify( 7, 9, 0, 2, 2, 2, 0),objectify(6, 10,  15, 4, 4, 2, 2)], //south
[objectify(9, 9, 0, 15, 2, 16, 14),objectify(10, 10, 15, 1, 4, 2, 2)], //east
[objectify(7, 9, 15, 15, 2, 16, 14),objectify(6, 10, 16, 1, 4, 2, 2)]  //west
],
rotate: true,
},
door2: {
verts: [
[objectify(0,0,13,16,3,0,0, false,false,false,null,2)],
[objectify(0,32,16,16,3,0,0, false,false,false,null,2)],
[objectify(16,32,16,16,16,-16,0),objectify(16,16,16,16,16,0,0)],
[objectify(0,32,13,16,16,-16,0, true),objectify(0,16,13,16,16,0,0, true)],
[objectify(16,32,13,3,16,-3,0, false,false,false,2),objectify(16,16,13,3,16,13,0, false,false,false,2)],
[objectify(0,32,16,3,16,-16,0, false,false,false,2),objectify(0,16,16,3,16,0,0, false,false,false,2)]
],
rotate: true
},
fenceGate: {
verts: [
[objectify(0,5,7,2,2,0,1),objectify(2,12,7,12,2,0,2),objectify(2,6,7,12,2,0,2),objectify(14,5,7,2,2,0,0)],
[objectify(0,16,9,2,2,0,1),objectify(2,15,9,12,2,0,2),objectify(2,9,9,12,2,0,2),objectify(14,16,9,2,2,0,0)],
[objectify(2,16,9,2,11,0,0),objectify(14,15,9,12,3,2,1),objectify(14,9,9,12,3,2,7),objectify(16,16,9,2,11,14,0),objectify(10,12,9,4,3,6,4)],
[objectify(0,16,7,2,11,14,0),objectify(2,15,7,12,3,2,1),objectify(2,9,7,12,3,2,7),objectify(14,16,7,2,11,2,0),objectify(6,12,7,4,3,6,4)],
[objectify(2,16,7,2,11,6,0),objectify(10,12,7,2,3,0,0),objectify(16,16,7,2,11,0,0)],
[objectify(0,16,9,2,11,6,0),objectify(14,16,9,2,11,0,0),objectify(6,12,9,2,3,0,0)]
],
flip: false,
rotate: true
},
fenceGateWall: {
verts: [
[objectify(0,2,7,2,2,0,1),objectify(2,9,7,12,2,0,2),objectify(2,3,7,12,2,0,2),objectify(14,2,7,2,2,0,0)],
[objectify(0,13,9,2,2,0,1),objectify(2,12,9,12,2,0,2),objectify(2,6,9,12,2,0,2),objectify(14,13,9,2,2,0,0)],
[objectify(2,13,9,2,11,0,0),objectify(14,12,9,12,3,2,1),objectify(14,6,9,12,3,2,7),objectify(16,13,9,2,11,14,0),objectify(10,9,9,4,3,6,4)],
[objectify(0,13,7,2,11,14,0),objectify(2,12,7,12,3,2,1),objectify(2,6,7,12,3,2,7),objectify(14,13,7,2,11,2,0),objectify(6,9,7,4,3,6,4)],
[objectify(2,13,7,2,11,6,0),objectify(10,9,7,2,3,0,0),objectify(16,13,7,2,11,0,0)],
[objectify(0,13,9,2,11,6,0),objectify(14,13,9,2,11,0,0),objectify(6,9,9,2,3,0,0)]
],
flip: false,
rotate: true
},
fenceGateOpen: {
verts: [
[objectify(0,5,7,2,2,0,1),objectify(14,12,9,2,6,0,2),objectify(14,6,9,2,6,0,2),objectify(14,5,7,2,2,0,0),objectify(0,12,9,2,6,0,0),objectify(0,6,9,2,6,0,0)],
[objectify(0,16,9,2,2,0,1),objectify(14,15,15,2,6,0,2),objectify(14,9,15,2,6,0,2),objectify(14,16,9,2,2,0,0),objectify(0,15,15,2,6,0,0),objectify(0,9,15,2,6,0,0)],
[objectify(2,16,9,2,11,0,0),objectify(16,15,15,2,9,2,1),objectify(2,15,15,2,9,2,7),objectify(16,16,9,2,11,14,0)],
[objectify(0,16,7,2,11,14,0),objectify(14,12,13,2,3,2,1),objectify(0,12,13,2,3,2,7),objectify(14,16,7,2,11,2,0)],
[objectify(2,16,7,2,11,6,0),objectify(2,12,13,2,3,6,4),objectify(16,16,7,2,11,6,4),objectify(16,12,13,2,3,0,0),objectify(16,15,9,6,3,2,1),objectify(2,15,9,6,3,2,1),objectify(16,9,9,6,3,2,7),objectify(2,9,9,6,3,2,7)],
[objectify(0,16,9,2,11,6,0),objectify(14,16,9,2,11,0,0),objectify(14,12,15,2,3,6,4),objectify(0,12,15,2,3,6,4),objectify(0,15,15,6,3,0,1),objectify(0,9,15,6,3,2,7),objectify(14,15,15,6,3,2,1),objectify(14,9,15,6,3,2,7)]
],
flip: false,
rotate: true
},
fenceGateWallOpen: {
verts: [
[objectify(0,2,7,2,2,0,1),objectify(14,9,9,2,6,0,2),objectify(14,3,9,2,6,0,2),objectify(14,2,7,2,2,0,0),objectify(0,9,9,2,6,0,0),objectify(0,3,9,2,6,0,0)],
[objectify(0,13,9,2,2,0,1),objectify(14,12,15,2,6,0,2),objectify(14,6,15,2,6,0,2),objectify(14,13,9,2,2,0,0),objectify(0,12,15,2,6,0,0),objectify(0,6,15,2,6,0,0)],
[objectify(2,13,9,2,11,0,0),objectify(16,12,15,2,9,2,1),objectify(2,12,15,2,9,2,7),objectify(16,13,9,2,11,14,0)],
[objectify(0,13,7,2,11,14,0),objectify(14,9,13,2,3,2,1),objectify(0,9,13,2,3,2,7),objectify(14,13,7,2,11,2,0)],
[objectify(2,13,7,2,11,6,0),objectify(2,9,13,2,3,6,4),objectify(16,13,7,2,11,6,4),objectify(16,9,13,2,3,0,0),objectify(16,12,9,6,3,2,1),objectify(2,12,9,6,3,2,1),objectify(16,6,9,6,3,2,7),objectify(2,6,9,6,3,2,7)],
[objectify(0,13,9,2,11,6,0),objectify(14,13,9,2,11,0,0),objectify(14,9,15,2,3,6,4),objectify(0,9,15,2,3,6,4),objectify(0,12,15,6,3,0,1),objectify(0,6,15,6,3,2,7),objectify(14,12,15,6,3,2,1),objectify(14,6,15,6,3,2,7)]
],
flip: false,
rotate: true
},
tallCrop: {
verts: [
[],
[],
[objectify(16,32,4,16,16,0,0),objectify(16,32,12,16,16,0,0),objectify(16,16,4,16,16,-16,0),objectify(16,16,12,16,16,-16,0)],
[objectify(0,32,12,16,16,0,0),objectify(0,32,4,16,16,0,0),objectify(0,16,12,16,16,-16,0),objectify(0,16,4,16,16,-16,0)],
[objectify(4,32,0,16,16,0,0),objectify(12,32,0,16,16,0,0),objectify(4,16,0,16,16,-16,0),objectify(12,16,0,16,16,-16,0)],
[objectify(12,32,16,16,16,0,0),objectify(4,32,16,16,16,0,0),objectify(12,16,16,16,16,-16,0),objectify(4,16,16,16,16,-16,0)]
],
varients: []
},
chainSW: {
verts: [
[objectify(6.5,8,0,3,16,0,0)],
[objectify(6.5,8,16,3,16,0,0)],
[],
[],
[objectify(8,9.5,0,16,3,0,3)],
[objectify(8,9.5,16,16,3,0,3)]
],
rotate:true
},
campfire:{
verts: [
[objectify(1,0,0,4,16,60,0),objectify(11,0,0,4,16,60,0),objectify(0,3,1,16,4,0,4),objectify(0,3,11,16,4,0,4),objectify(5,0,0,6,16,48,0)],
[objectify(1,4,16,4,16,60,0),objectify(11,4,16,4,16,60,0),objectify(0,7,5,16,4,16,0),objectify(0,7,15,16,4,16,0),objectify(5,1,16,6,16,64,0)],
[objectify(5,4,16,4,4,16,4),objectify(15,4,16,4,4,16,4),objectify(16,7,5,16,4,0,0),objectify(16,7,15,16,4,0,0),objectify(11,1,16,6,1,0,15), customFace(0,16,0, 16,16,16, 16,0,16, 0,0,0, 32,0)],
[objectify(1,4,0,4,4,16,4),objectify(11,4,0,4,4,16,4),objectify(0,7,1,16,4,0,0),objectify(0,7,11,16,4,0,0),objectify(5,1,0,6,1,0,15), customFace(16,16,0, 0,16,16, 0,0,16, 16,0,0, 32,0)],
[objectify(15,4,0,16,4,16,0),objectify(5,4,0,16,4,0,0),objectify(16,7,1,4,4,16,4),objectify(16,7,11,4,4,16,4), customFace(16,16,16, 0,16,0, 0,0,0, 16,0,16, 32,0)],
[objectify(11,4,16,16,4,0,0),objectify(1,4,16,16,4,16,0),objectify(0,7,5,4,4,16,4),objectify(0,7,15,4,4,16,4), customFace(0,16,16, 16,16,0, 16,0,0, 0,0,16, 32,0)]
],
hitbox:"slab"
},
campfireUnlit:{
verts:[
[objectify(1,0,0,4,16,60,0),objectify(11,0,0,4,16,60,0),objectify(0,3,1,16,4,16,0),objectify(0,3,11,16,4,16,0),objectify(5,0,0,6,16,48,0)],
[objectify(1,4,16,4,16,60,0),objectify(11,4,16,4,16,60,0),objectify(0,7,5,16,4,16,0),objectify(0,7,15,16,4,16,0),objectify(5,1,16,6,16,48,0)],
[objectify(5,4,16,4,4,16,4),objectify(15,4,16,4,4,16,4),objectify(16,7,5,16,4,16,0),objectify(16,7,15,16,4,16,0),objectify(11,1,16,6,1,0,15)],
[objectify(1,4,0,4,4,16,4),objectify(11,4,0,4,4,16,4),objectify(0,7,1,16,4,16,0),objectify(0,7,11,16,4,16,0),objectify(5,1,0,6,1,0,15)],
[objectify(15,4,0,16,4,16,0),objectify(5,4,0,16,4,16,0),objectify(16,7,1,4,4,16,4),objectify(16,7,11,4,4,16,4)],
[objectify(11,4,16,16,4,16,0),objectify(1,4,16,16,4,16,0),objectify(0,7,5,4,4,16,4),objectify(0,7,15,4,4,16,4)]
],
hitbox:"slab"
},
bamboo:{
verts:[
[objectify(6.5,0,6.5,3,3,13,4)],
[objectify(6.5,16,9.5,3,3,13,0)],
[objectify(9.5,16,9.5,3,16,0,0)],
[objectify(6.5,16,6.5,3,16,0,0)],
[objectify(9.5,16,6.5,3,16,0,0)],
[objectify(6.5,16,9.5,3,16,0,0)]
],
},
bambooSmallLeaf:{
verts: [
[objectify(6.5,0,6.5,3,3,13,4)],
[objectify(6.5,16,9.5,3,3,13,0)],
[objectify(9.5,16,9.5,3,16,0,0),objectify(16,16,8,16,16,-64,0)],
[objectify(6.5,16,6.5,3,16,0,0),objectify(0,16,8,16,16,-64,0)],
[objectify(9.5,16,6.5,3,16,0,0),objectify(8,16,0,16,16,-64,0)],
[objectify(6.5,16,9.5,3,16,0,0),objectify(8,16,16,16,16,-64,0)]
],
},
bambooBigLeaf:{
verts:[
[objectify(6.5,0,6.5,3,3,13,4)],
[objectify(6.5,16,9.5,3,3,13,0)],
[objectify(9.5,16,9.5,3,16,0,0),objectify(16,16,8,16,16,-48,0)],
[objectify(6.5,16,6.5,3,16,0,0),objectify(0,16,8,16,16,-48,0)],
[objectify(9.5,16,6.5,3,16,0,0),objectify(8,16,0,16,16,-48,0)],
[objectify(6.5,16,9.5,3,16,0,0),objectify(8,16,16,16,16,-48,0)]
],
},
bambooYoung:{
verts:[
[objectify(7,0,7,2,2,13,4)],
[objectify(7,16,9,2,2,13,0)],
[objectify(9,16,9,2,16,0,0)],
[objectify(7,16,7,2,16,0,0)],
[objectify(9,16,7,2,16,0,0)],
[objectify(7,16,9,2,16,0,0)]
],
},
bambooYoungLeaf:{
verts:[
[objectify(7,0,7,2,2,13,4)],
[objectify(7,16,9,2,2,13,0)],
[objectify(9,16,9,2,16,0,0),objectify(16,16,8,16,16,-64,0)],
[objectify(7,16,7,2,16,0,0),objectify(0,16,8,16,16,-64,0)],
[objectify(9,16,7,2,16,0,0),objectify(8,16,0,16,16,-64,0)],
[objectify(7,16,9,2,16,0,0),objectify(8,16,16,16,16,-64,0)]
],
},
bambooPot:{
verts:[
[],
[objectify(7,0,9,2,2,13,0)],
[objectify(9,0,9,2,16,0,0),objectify(16,0,8,16,16,-32,0)],
[objectify(7,0,7,2,16,0,0),objectify(0,0,8,16,16,-32,0, true)],
[objectify(9,0,7,2,16,0,0)],
[objectify(7,0,9,2,16,0,0)]
],
},
chest:{
verts:[
[objectify(1,0,1,14,14,32,0),objectify(7,7,0,2,1,-13,0)],
[objectify(1,14,15,14,14,32,0),objectify(7,11,1,2,1,-15,0)],
[objectify(15,14,15,14,4,16,0),objectify(15,10,15,14,10,16,5),objectify(9,11,1,2,4,-16,1)],
[objectify(1,14,1,14,4,0,0),objectify(1,10,1,14,10,0,5),objectify(7,11,0,2,4,-14,1)],
[objectify(15,14,1,14,4,16,0),objectify(15,10,1,14,10,16,5),objectify(9,11,0,1,4,-14,1)],
[objectify(1,14,15,14,4,16,0),objectify(1,10,15,14,10,16,5),objectify(7,11,1,1,4,-16,1)]
],
rotate:true
},
christmasChest:{
verts:[
[objectify(1,0,1,14,14,32,0),objectify(7,7,0,2,1,-13,0)],
[objectify(1,14,15,14,14,16,0),objectify(7,11,1,2,1,-15,0)],
[objectify(15,14,15,14,4,0,0),objectify(15,10,15,14,10,0,5),objectify(9,11,1,2,4,-16,1)],
[objectify(1,14,1,14,4,0,0),objectify(1,10,1,14,10,0,5),objectify(7,11,0,2,4,-14,1)],
[objectify(15,14,1,14,4,0,0),objectify(15,10,1,14,10,0,5),objectify(9,11,0,1,4,-14,1)],
[objectify(1,14,15,14,4,0,0),objectify(1,10,15,14,10,0,5),objectify(7,11,1,1,4,-16,1)]
],
rotate:true
},
pressurePlate:{
verts:[
[objectify(1,0,1,14,14,1,1)],
[objectify(1,1,15,14,14,1,1)],
[objectify(15,1,15,14,1,0,0)],
[objectify(1,1,1,14,1,0,0)],
[objectify(15,1,1,14,1,0,0)],
[objectify(1,1,15,14,1,0,0)]
],
},
pressurePlateActive:{
verts:[
[objectify(1,0,1,14,14,1,1)],
[objectify(1,0.5,15,14,14,1,1)],
[objectify(15,0.5,15,14,0.5,0,0)],
[objectify(1,0.5,1,14,0.5,0,0)],
[objectify(15,0.5,1,14,0.5,0,0)],
[objectify(1,0.5,15,14,0.5,0,0)]
]
},
redstoneDust:{
verts:[
[objectify(0,0.25,0,16,16,0,0,false,true)],
[objectify(0,0.25,16,16,16,0,0)],
[objectify(16, 16,  0.25, 16, 16, 0, 0, false,false,false,null,null, "north"), objectify(16, 16,  15.75, 16, 16, 0, 0, false,false,false,null,null, "south")],
[objectify( 0, 16, 15.75, 16, 16, 0, 0, false,false,false,null,null, "south"), objectify( 0, 16, 0.25, 16, 16, 0, 0, false,false,false,null,null, "north")],
[objectify( 0.25, 16,  0, 16, 16, 0, 0, false,false,false,null,null, "east"), objectify( 15.75, 16,  0, 16, 16, 0, 0, false,false,false,null,null, "west")],
[objectify(15.75, 16, 16, 16, 16, 0, 0, false,false,false,null,null, "west"), objectify(0.25, 16, 16, 16, 16, 0, 0, false,false,false,null,null, "east")]
],
hitbox:"carpet"
},
redstoneDustRotate:{
verts:[
[objectify(0,0.25,0,16,16,0,0,false,true)],
[objectify(0,0.25,16,16,16,0,0)],
[objectify(16, 16,  0.25, 16, 16, 0, 0, false,false,false,null,null, "north"), objectify(16, 16,  15.75, 16, 16, 0, 0, false,false,false,null,null, "south")],
[objectify( 0, 16, 15.75, 16, 16, 0, 0, false,false,false,null,null, "south"), objectify( 0, 16, 0.25, 16, 16, 0, 0, false,false,false,null,null, "north")],
[objectify( 0.25, 16,  0, 16, 16, 0, 0, false,false,false,null,null, "east"), objectify( 15.75, 16,  0, 16, 16, 0, 0, false,false,false,null,null, "west")],
[objectify(15.75, 16, 16, 16, 16, 0, 0, false,false,false,null,null, "west"), objectify(0.25, 16, 16, 16, 16, 0, 0, false,false,false,null,null, "east")]
],
rotate:true,
hitbox:"carpet"
},
redstoneTorch:{
verts:[
[objectify(7,0,7,2,2,7,14),objectify(6,10,6,4,4,6,5)],
[objectify(7,10,9,2,2,7,6),objectify(6,8,10,4,4,6,5)],
[objectify(9,10,9,2,10,7,6),objectify(10,11,7,4,4,6,5)],
[objectify(7,10,7,2,10,7,6),objectify(6,11,9,4,4,6,5)],
[objectify(9,10,7,2,10,7,6),objectify(7,11,6,4,4,6,5)],
[objectify(7,10,9,2,10,7,6),objectify(9,11,10,4,4,6,5)]
]
},
redstoneWallTorch:{
verts: [
[customFace(9,4,17, 7,4,17, 7,3,15, 9,3,15, 7,14,2,2),customFace(6,12.5,10, 10,12.5,10, 10,14.5,14, 6,14.5,14, 6,5,4,4)],
[customFace(9,13,11, 7,13,11, 7,14,13, 9,14,13, 7,6,2,2),customFace(10,10.5,10.8, 6,10.5,10.8, 6,12.5,14.8, 10,12.5,14.8, 6,5,4,4)],
[customFace(9,14,13, 7,14,13, 7,4,17, 9,4,17, 7,6,2,10),customFace(10,14,10.6, 6,14,10.6, 6,10,12.2, 10,10,12.2, 6,5,4,4)], //north
[customFace(7,13,11, 9,13,11, 9,3,15, 7,3,15, 7,6,2,10),customFace(6,15,12.6, 10,15,12.6, 10,11,14.2, 6,11,14.2, 6,5,4,4)], //south
[customFace(9,13,11, 9,14,13, 9,4,17, 9,3,15, 7,6,2,10),customFace(7,13.5,9.6, 7,15.5,13.6, 7,11.5,15.2, 7,9.5,11.2, 6,5,4,4)], //east
[customFace(7,14,13, 7,13,11, 7,3,15, 7,4,17, 7,6,2,10),customFace(9,15.5,13.6, 9,13.5,9.6, 9,9.5,11.2, 9,11.5,15.2, 6,5,4,4)]  //west
],
rotate:true
},
leverWall:{
verts:[
[objectify(5,4,13,6,3,0,0,null,null,null,null,null,"cobblestone"), customFace(7,12,7, 9,12,7, 9,8.45,15, 7,8.45,15, 7,6,2,10)],
[objectify(5,12,16,6,3,0,0,null,null,null,null,null,"cobblestone"), customFace(9,13.5,8, 7,13.5,8, 7,10,16, 9,10,16, 7,6,2,10)],
[objectify(11,12,16,6,8,0,0,null,null,null,null,null,"cobblestone")],
[objectify(5,12,13,6,8,0,0,null,null,null,null,null,"cobblestone"), customFace(7,13.5,8, 9,13.5,8, 9,12,7, 7,12,7, 7,6,2,2)],
[objectify(11,12,13,3,8,0,0,null,null,null,null,null,"cobblestone"), customFace(9,12,7, 9,13.5,8, 9,10,16, 9,8.45,15, 7,6,2,10)],
[objectify(5,12,16,3,8,0,0,null,null,null,null,null,"cobblestone"), customFace(7,13.5,8, 7,12,7, 7,8.45,15, 7,10,16, 7,6,2,10)]
],
rotate:true
},
leverWallOn:{
verts:[
[objectify(5,4,13,6,3,0,0,null,null,null,null,null,"cobblestone"), customFace(7,2.5,8, 9,2.5,8, 9,6,16, 7,6,16, 7,6,2,10)],
[objectify(5,12,16,6,3,0,0,null,null,null,null,null,"cobblestone"), customFace(9,4,7, 7,4,7, 7,7.55,15, 9,7.55,15, 7,6,2,10)],
[objectify(11,12,16,6,8,0,0,null,null,null,null,null,"cobblestone")],
[objectify(5,12,13,6,8,0,0,null,null,null,null,null,"cobblestone"), customFace(9,2.5,8, 7,2.5,8, 7,4,7, 9,4,7, 7,6,2,2)],
[objectify(11,12,13,3,8,0,0,null,null,null,null,null,"cobblestone"), customFace(9,2.5,8, 9,4,7, 9,7.55,15, 9,6,16, 7,6,2,10)],
[objectify(5,12,16,3,8,0,0,null,null,null,null,null,"cobblestone"), customFace(7,4,7, 7,2.5,8, 7,6,16, 7,7.55,15, 7,6,2,10)]
],
rotate:true
},
leverFloor:{
verts:[
[objectify(5,0,4,6,8,0,0,null,null,null,null,null,"cobblestone"), customFace(9,8,13.5, 7,8,13.5, 7,0,10, 9,0,10, 7,6,2,10)],
[objectify(5,3,12,6,8,0,0,null,null,null,null,null,"cobblestone"), customFace(7,9,12, 9,9,12, 9,1,8.45, 7,1,8.45, 7,6,2,10)],
[objectify(11,3,12,6,3,0,0,null,null,null,null,null,"cobblestone"), customFace(7,8,13.5, 9,8,13.5, 9,9,12, 7,9,12, 7,6,2,2)],
[objectify(5,3,4,6,3,0,0,null,null,null,null,null,"cobblestone")],
[objectify(11,3,4,8,3,0,0,null,null,null,null,null,"cobblestone"), customFace(9,9,12, 9,8,13.5, 9,0,10, 9,1,8.45, 7,6,2,10)],
[objectify(5,3,12,8,3,0,0,null,null,null,null,null,"cobblestone"), customFace(7,8,13.5, 7,9,12, 7,1,8.45, 7,0,10, 7,6,2,10)]
],
},
leverFloorOn:{
verts:[
[objectify(5,0,4,6,8,0,0,null,null,null,null,null,"cobblestone"), customFace(7,8,2.5, 9,8,2.5, 9,0,6, 7,0,6, 7,6,2,10)],
[objectify(5,3,12,6,8,0,0,null,null,null,null,null,"cobblestone"), customFace(9,9,4, 7,9,4, 7,1,7.55, 9,1,7.55, 7,6,2,10)],
[objectify(11,3,12,6,3,0,0,null,null,null,null,null,"cobblestone")],
[objectify(5,3,4,6,3,0,0,null,null,null,null,null,"cobblestone"), customFace(9,8,2.5, 7,8,2.5, 7,9,4, 9,9,4, 7,6,2,2)],
[objectify(11,3,4,8,3,0,0,null,null,null,null,null,"cobblestone"), customFace(9,8,2.5, 9,9,4, 9,1,7.55, 9,0,6, 7,6,2,10)],
[objectify(5,3,12,8,3,0,0,null,null,null,null,null,"cobblestone"), customFace(7,9,4, 7,8,2.5, 7,0,6, 7,1,7.55, 7,6,2,10)]
],
},
leverCeil:{
verts:[
[objectify(5,13,4,6,8,0,0,null,null,null,null,null,"cobblestone"), customFace(9,7,12, 7,7,12, 7,15,8.45, 9,15,8.45, 7,6,2,10)],
[objectify(5,16,12,6,8,0,0,null,null,null,null,null,"cobblestone"), customFace(7,8,13.5, 9,8,13.5, 9,16,10, 7,16,10, 7,6,2,10)],
[objectify(11,16,12,6,3,0,0,null,null,null,null,null,"cobblestone"), customFace(9,8,13.5, 7,8,13.5, 7,7,12, 9,7,12, 7,6,2,2)],
[objectify(5,16,4,6,3,0,0,null,null,null,null,null,"cobblestone")],
[objectify(11,16,4,8,3,0,0,null,null,null,null,null,"cobblestone"), customFace(9,8,13.5, 9,7,12, 9,15,8.45, 9,16,10, 7,6,2,10)],
[objectify(5,16,12,8,3,0,0,null,null,null,null,null,"cobblestone"), customFace(7,7,12, 7,8,13.5, 7,16,10, 7,15,8.45, 7,6,2,10)]
],
},
leverCeilOn:{
verts:[
[objectify(5,13,4,6,8,0,0,null,null,null,null,null,"cobblestone"), customFace(7,7,4, 9,7,4, 9,15,7.55, 7,15,7.55, 7,6,2,10)],
[objectify(5,16,12,6,8,0,0,null,null,null,null,null,"cobblestone"), customFace(9,8,2.5, 7,8,2.5, 7,16,6, 9,16,6, 7,6,2,10)],
[objectify(11,16,12,6,3,0,0,null,null,null,null,null,"cobblestone")],
[objectify(5,16,4,6,3,0,0,null,null,null,null,null,"cobblestone"), customFace(7,8,2.5, 9,8,2.5, 9,7,4, 7,7,4, 7,6,2,2)],
[objectify(11,16,4,8,3,0,0,null,null,null,null,null,"cobblestone"), customFace(9,7,4, 9,8,2.5, 9,16,6, 9,15,7.55, 7,6,2,10)],
[objectify(5,16,12,8,3,0,0,null,null,null,null,null,"cobblestone"), customFace(7,8,2.5, 7,7,4, 7,15,7.55, 7,16,6, 7,6,2,10)]
],
},
buttonPushed:{
verts:[
[objectify(5,6,15,6,1,5,6)],
[objectify(5,10,16,6,1,5,6)],
[objectify(11,10,16,6,4,5,6)],
[objectify(5,10,15,6,4,5,6)],
[objectify(11,10,15,1,4,5,6)],
[objectify(5,10,16,1,4,5,6)]
],
rotate: true
},
repeater1:{
verts:generateRepeater(),
rotate: true
},
repeater2:{
verts:generateRepeater(2),
rotate: true
},
repeater3:{
verts:generateRepeater(3),
rotate: true
},
repeater4:{
verts:generateRepeater(4),
rotate: true
},
repeaterOn1:{
verts:generateRepeater(1,true),
rotate: true
},
repeaterOn2:{
verts:generateRepeater(2,true),
rotate: true
},
repeaterOn3:{
verts:generateRepeater(3,true),
rotate: true
},
repeaterOn4:{
verts:generateRepeater(4,true),
rotate: true
},
//the piston shapes come from https://minekhan-testing.lukep0wers.repl.co
pistonOpen: {
verts: [
[objectify(0,0,0,16,16,0,0)], //bottom
[objectify(0,12,16,16,16,0,0)], //top
[objectify(16,12,16,16,12,0,4)], //north
[objectify(0,12,0,16,12,0,4)], //south
[objectify(16,12,0,16,12,0,4)], //east
[objectify(0,12,16,16,12,0,4)]  //west
]
},
pistonOpenFlipped: {
verts: [
[objectify(0,4,0,16,16,0,0, false,true)],
[objectify(0,16,16,16,16,0,0, false,true)],
[objectify(16,16,16,16,12,0,4, false,true)],
[objectify(0,16,0,16,12,0,4, false,true)],
[objectify(16,16,0,16,12,0,4, false,true)],
[objectify(0,16,16,16,12,0,4, false,true)]
]
},
pistonOpenSW: {
verts: [
[objectify(0,0,4,16,12,0,4)],
[objectify(0,16,16,16,12,0,4, false,false,2)],
[objectify(16,16,16,16,16,0,0)],
[objectify(0,16,4,16,16,0,0)],
[objectify(16,16,4,12,16,0,4, false,false,1)],
[objectify(0,16,16,12,16,0,4, false,false,-1)]
],
rotate:true
},
pistonHead: {
verts: [
[objectify(0,12,0,16,16,0,0)], //b
[objectify(0,16,16,16,16,0,0)], //t
[objectify(16,16,16,16,4,0,0), objectify(10,12,10,4,12,6,4), objectify(10,0,10,4,4,6,9)], //n
[objectify(0,16,0,16,4,0,0), objectify(6,12,6,4,12,6,4), objectify(6,0,6,4,4,6,9)], //s
[objectify(16,16,0,16,4,0,0), objectify(10,12,6,4,12,6,4), objectify(10,0,6,4,4,6,9)], //e
[objectify(0,16,16,16,4,0,0), objectify(6,12,10,4,12,6,4), objectify(6,0,10,4,4,6,9)] //w
]
},
pistonHeadFlipped: {
verts: [
[objectify(0,0,0,16,16,0,0)], //b
[objectify(0,4,16,16,16,0,0)], //t
[objectify(16,4,16,16,4,0,0), objectify(10,20,10,4,12,6,4), objectify(10,8,10,4,4,6,9)], //n
[objectify(0,4,0,16,4,0,0), objectify(6,20,6,4,12,6,4), objectify(6,8,6,4,4,6,9)], //s
[objectify(16,4,0,16,4,0,0), objectify(10,20,6,4,12,6,4), objectify(10,8,6,4,4,6,9)], //e
[objectify(0,4,16,16,4,0,0), objectify(6,20,10,4,12,6,4), objectify(6,8,10,4,4,6,9)] //w
]
},
pistonHeadSW: {
verts: [
[objectify(0,0,0,16,4,0,0),objectify(6,6,4,4,12,6,4),objectify(6,6,16,4,4,6,9)],
[objectify(0,16,4,16,4,0,0),objectify(6,10,16,4,12,6,4, false,true),objectify(6,10,20,4,4,6,9, false,true)],
[objectify(16,16,4,16,16,0,0)],
[objectify(0,16,0,16,16,0,0)],
[objectify(16,16,0,4,16,0,0, false,false,true),objectify(10,10,4,12,4,6,4, false,false,1),objectify(10,10,16,4,4,6,9, false,false,1)],
[objectify(0,16,4,4,16,0,0, false,false,true),objectify(6,10,16,12,4,6,4, false,false,-1),objectify(6,10,20,4,4,6,9, false,false,-1)]
],
rotate:true
},
pistonHeadCut: {
verts: [
[objectify(0,12,0,16,16,0,0)], //b
[objectify(0,16,16,16,16,0,0)], //t
[objectify(16,16,16,16,4,0,0), objectify(10,12,10,4,12,6,4)], //n
[objectify(0,16,0,16,4,0,0), objectify(6,12,6,4,12,6,4)], //s
[objectify(16,16,0,16,4,0,0), objectify(10,12,6,4,12,6,4)], //e
[objectify(0,16,16,16,4,0,0), objectify(6,12,10,4,12,6,4)] //w
]
},
pistonHeadCutFlipped: {
verts: [
[objectify(0,0,0,16,16,0,0)], //b
[objectify(0,4,16,16,16,0,0)], //t
[objectify(16,4,16,16,4,0,0), objectify(10,16,10,4,12,6,4)], //n
[objectify(0,4,0,16,4,0,0), objectify(6,16,6,4,12,6,4)], //s
[objectify(16,4,0,16,4,0,0), objectify(10,16,6,4,12,6,4)], //e
[objectify(0,4,16,16,4,0,0), objectify(6,16,10,4,12,6,4)] //w
]
},
pistonHeadCutSW: {
verts: [
[objectify(0,0,0,16,4,0,0),objectify(6,6,4,4,12,6,4)],
[objectify(0,16,4,16,4,0,0),objectify(6,10,16,4,12,6,4, false,true)],
[objectify(16,16,4,16,16,0,0)],
[objectify(0,16,0,16,16,0,0)],
[objectify(16,16,0,4,16,0,0, false,false,true),objectify(10,10,4,12,4,6,4, false,false,1)],
[objectify(0,16,4,4,16,0,0, false,false,true),objectify(6,10,16,12,4,6,4, false,false,-1)]
],
rotate:true
},
slimeBlock:{
verts: [
[objectify( 0,  0,  0, 16, 16, 0, 0), objectify( 3,  3,  3, 10, 10, 3, 3)], //bottom
[objectify( 0, 16, 16, 16, 16, 0, 0), objectify( 3, 13, 13, 10, 10, 3, 3)], //top
[objectify(16, 16, 16, 16, 16, 0, 0), objectify(13, 13, 13, 10, 10, 3, 3)], //north
[objectify( 0, 16,  0, 16, 16, 0, 0), objectify( 3, 13,  3, 10, 10, 3, 3)], //south
[objectify(16, 16,  0, 16, 16, 0, 0), objectify(13, 13,  3, 10, 10, 3, 3)], //east
[objectify( 0, 16, 16, 16, 16, 0, 0), objectify( 3, 13, 13, 10, 10, 3, 3)]  //west
],
},
honeyBlock:{
verts: [
[objectify( 0,  0,  0, 16, 16, 0, 0), objectify( 1,  1,  1, 14, 14, 1, 1)], //bottom
[objectify( 0, 16, 16, 16, 16, 0, 0), objectify( 1, 15, 15, 14, 14, -31, 1)], //top
[objectify(16, 16, 16, 16, 16, 0, 0), objectify(15, 15, 15, 14, 14, -15, 1)], //north
[objectify( 0, 16,  0, 16, 16, 0, 0), objectify( 1, 15,  1, 14, 14, -15, 1)], //south
[objectify(16, 16,  0, 16, 16, 0, 0), objectify(15, 15,  1, 14, 14, -15, 1)], //east
[objectify( 0, 16, 16, 16, 16, 0, 0), objectify( 1, 15, 15, 14, 14, -15, 1)]  //west
],
},
stairCornerOut: {
verts: [
[objectify( 0, 0,  0, 16, 16, 0, 0)], //bottom
[objectify( 0, 8,  16, 16, 16, 0, 0), objectify( 0, 16,  16, 8, 8, 0, 0)], //top
[objectify(8, 16, 16, 8, 8, 0, 0), objectify(16, 8, 16, 16, 8, 0, 0)], //north
[objectify( 0, 8,  0, 16, 8, 0, 0), objectify( 0, 16,  8, 8, 8, 0, 0)], //south
[objectify(16, 8, 0, 16, 8, 0, 0), objectify(8, 16, 8, 8, 16, 0, 0)], //east
[objectify( 0, 8, 8, 8, 8, 0, 0), objectify( 0, 16, 16, 8, 16, 8, 0)]  //west
],
flip: true,
rotate: true
},
stairCornerIn: {
verts: [
[objectify(0,0,0,16,16,0,0)],
[objectify(8,8,8,8,8,0,0),objectify(0,16,16,16,8,0,0),objectify(0,16,8,8,8,0,0)],
[objectify(16,16,16,16,16,0,0)],
[objectify(8,16,8,8,8,0,0),objectify(0,16,0,8,8,0,0),objectify(0,8,0,16,8,0,0)],
[objectify(8,16,0,8,8,0,0),objectify(16,16,8,8,8,0,0),objectify(16,8,0,16,8,0,0)],
[objectify(0,16,16,16,16,0,0)]
],
flip: true,
rotate: true
},
endPortal: {
verts: [
[objectify( 0, 8,  0, 16, 16, 0, 0)], //bottom
[objectify( 0, 8, 16, 16, 16, 0, 0)], //top
[], //north
[], //south
[], //east
[]  //west
],
},
smallDripleaf:{
verts:[
[objectify(8,21,8,7,7,48,0,false,false,-1),objectify(1,26,1,7,7,48,0,false,false,1),objectify(1,30,8,7,7,48,0,false,false,2)],
[objectify(8,21,15,7,7,48,0,true,false,-1),objectify(1,26,8,7,7,48,0,true,false,1),objectify(1,30,15,7,7,48,0,true)],
[objectify(15,21,15,7,1,32,0),objectify(8,26,8,7,1,32,0),objectify(8,30,15,7,1,32,0),customFace(2,16,2, 14,16,14, 14,0,14, 2,0,2, 0,0),customFace(2,32,2, 14,32,14, 14,16,14, 2,16,2, 16,0)],
[objectify(8,21,8,7,1,32,0),objectify(1,26,1,7,1,32,0),objectify(1,30,8,7,1,32,0),customFace(14,16,2, 2,16,14, 2,0,14, 14,0,2, 0,0),customFace(14,32,2, 2,32,14, 2,16,14, 14,16,2, 16,0)],
[objectify(15,21,8,7,1,32,0),objectify(8,26,1,7,1,32,0),objectify(8,30,8,7,1,32,0),customFace(14,16,14, 2,16,2, 2,0,2, 14,0,14, 0,0),customFace(14,32,14, 2,32,2, 2,16,2, 14,16,14, 16,0)],
[objectify(8,21,15,7,1,32,0),objectify(1,26,8,7,1,32,0),objectify(1,30,15,7,1,32,0),customFace(2,16,14, 14,16,2, 14,0,2, 2,0,14, 0,0),customFace(2,32,14, 14,32,2, 14,16,2, 2,16,14, 16,0)]
],
rotate:true,
hitbox:"tallCube"
},
bigDripleaf:{
verts:[
[objectify(0,15,0,16,16,32,0)],
[objectify(0,15,16,16,16,32,0,false,true)],
[objectify(16,15,0,16,4,48,0),customFace(2,15,2, 14,15,14, 14,0,14, 2,0,2, 0,0)],
[objectify(0,15,0,16,4,48,0),customFace(14,15,2, 2,15,14, 2,0,14, 14,0,2, 0,0)],
[objectify(0,15,0,16,4,16,0,true),objectify(16,15,0,16,4,16,0),customFace(14,15,14, 2,15,2, 2,0,2, 14,0,14, 0,0)],
[objectify(0,15,16,16,4,16,0),objectify(16,15,16,16,4,16,0),customFace(2,15,14, 14,15,2, 14,0,2, 2,0,14, 0,0)]
],
rotate:true,
hitbox:"cube"
},
logicGate:{
verts:[
[objectify(0,0,0,16,16,0,0)],
[objectify(0,2,16,16,16,0,0)],
[objectify(16,2,16,16,2,0,2)],
[objectify(0,2,0,16,2,0,2)],
[objectify(16,2,0,16,2,0,14)],
[objectify(0,2,16,16,2,0,14)]
],
rotate:true
},
sign:{
verts:[
[objectify(-4,14,7,16,2,0,0),objectify(7,0,7,2,2,7,7, false,false,null,null,null,"poleTop"),objectify(12,14,7,8,2,0,0)],
[objectify(-4,26,9,16,2,0,0),objectify(12,26,9,8,2,0,0)],
[objectify(20,26,9,16,12,0,0),objectify(9,14,9,2,14,0,0, false,false,null,null,null,"poleSide"),objectify(4,26,9,8,12,0,0)],
[objectify(-4,26,7,16,12,0,0),objectify(7,14,7,2,14,0,0, false,false,null,null,null,"poleSide"),objectify(12,26,7,8,12,0,0)],
[objectify(20,26,7,2,12,0,0),objectify(9,14,7,2,14,0,0, false,false,null,null,null,"poleSide")],
[objectify(-4,26,9,2,12,0,0),objectify(7,14,9,2,14,0,0, false,false,null,null,null,"poleSide")]
],
},
wallSign:{
verts:[
[objectify(-4,6,16.7,16,2,0,0),objectify(12,6,16.7,8,2,0,0)],
[objectify(-4,18,18.7,16,2,0,0),objectify(12,18,18.7,8,2,0,0)],
[objectify(20,18,18.7,16,12,0,0),objectify(4,18,18.7,8,12,0,0)],
[objectify(-4,18,16.7,16,12,0,0),objectify(12,18,16.7,8,12,0,0)],
[objectify(20,18,16.7,2,12,0,0)],
[objectify(-4,18,18.7,2,12,0,0)]
],
},
composter:{
verts:[
[objectify(0,0,0,16,16,16,0)],
[objectify(0,2,16,16,16,16,0),objectify(0,16,16,14,2,66,0),objectify(14,16,16,2,14,64,0),objectify(2,16,2,14,2,64,14),objectify(0,16,14,2,14,78,2)],
[objectify(16,16,16,16,16,48,0),objectify(16,16,2,16,16,48,0)],
[objectify(0,16,0,16,16,48,0),objectify(0,16,14,16,16,48,0)],
[objectify(16,16,0,16,16,48,0),objectify(2,16,0,16,16,48,0)],
[objectify(0,16,16,16,16,48,0),objectify(14,16,16,16,16,48,0)]
]
},
composter2:{
verts:[
[objectify(0,0,0,16,16,16,0)],
[objectify(0,4,16,16,16,0,0),objectify(0,16,16,14,2,66,0),objectify(14,16,16,2,14,64,0),objectify(2,16,2,14,2,64,14),objectify(0,16,14,2,14,78,2)],
[objectify(16,16,16,16,16,48,0),objectify(16,16,2,16,16,48,0)],
[objectify(0,16,0,16,16,48,0),objectify(0,16,14,16,16,48,0)],
[objectify(16,16,0,16,16,48,0),objectify(2,16,0,16,16,48,0)],
[objectify(0,16,16,16,16,48,0),objectify(14,16,16,16,16,48,0)]
]
},
composter3:{
verts:[
[objectify(0,0,0,16,16,16,0)],
[objectify(0,6,16,16,16,0,0),objectify(0,16,16,14,2,66,0),objectify(14,16,16,2,14,64,0),objectify(2,16,2,14,2,64,14),objectify(0,16,14,2,14,78,2)],
[objectify(16,16,16,16,16,48,0),objectify(16,16,2,16,16,48,0)],
[objectify(0,16,0,16,16,48,0),objectify(0,16,14,16,16,48,0)],
[objectify(16,16,0,16,16,48,0),objectify(2,16,0,16,16,48,0)],
[objectify(0,16,16,16,16,48,0),objectify(14,16,16,16,16,48,0)]
]
},
composter4:{
verts:[
[objectify(0,0,0,16,16,16,0)],
[objectify(0,8,16,16,16,0,0),objectify(0,16,16,14,2,66,0),objectify(14,16,16,2,14,64,0),objectify(2,16,2,14,2,64,14),objectify(0,16,14,2,14,78,2)],
[objectify(16,16,16,16,16,48,0),objectify(16,16,2,16,16,48,0)],
[objectify(0,16,0,16,16,48,0),objectify(0,16,14,16,16,48,0)],
[objectify(16,16,0,16,16,48,0),objectify(2,16,0,16,16,48,0)],
[objectify(0,16,16,16,16,48,0),objectify(14,16,16,16,16,48,0)]
]
},
composter5:{
verts:[
[objectify(0,0,0,16,16,16,0)],
[objectify(0,10,16,16,16,0,0),objectify(0,16,16,14,2,66,0),objectify(14,16,16,2,14,64,0),objectify(2,16,2,14,2,64,14),objectify(0,16,14,2,14,78,2)],
[objectify(16,16,16,16,16,48,0),objectify(16,16,2,16,16,48,0)],
[objectify(0,16,0,16,16,48,0),objectify(0,16,14,16,16,48,0)],
[objectify(16,16,0,16,16,48,0),objectify(2,16,0,16,16,48,0)],
[objectify(0,16,16,16,16,48,0),objectify(14,16,16,16,16,48,0)]
]
},
composter6:{
verts:[
[objectify(0,0,0,16,16,16,0)],
[objectify(0,12,16,16,16,0,0),objectify(0,16,16,14,2,66,0),objectify(14,16,16,2,14,64,0),objectify(2,16,2,14,2,64,14),objectify(0,16,14,2,14,78,2)],
[objectify(16,16,16,16,16,48,0),objectify(16,16,2,16,16,48,0)],
[objectify(0,16,0,16,16,48,0),objectify(0,16,14,16,16,48,0)],
[objectify(16,16,0,16,16,48,0),objectify(2,16,0,16,16,48,0)],
[objectify(0,16,16,16,16,48,0),objectify(14,16,16,16,16,48,0)]
]
},
composter7:{
verts:[
[objectify(0,0,0,16,16,16,0)],
[objectify(0,14,16,16,16,0,0),objectify(0,16,16,14,2,66,0),objectify(14,16,16,2,14,64,0),objectify(2,16,2,14,2,64,14),objectify(0,16,14,2,14,78,2)],
[objectify(16,16,16,16,16,48,0),objectify(16,16,2,16,16,48,0)],
[objectify(0,16,0,16,16,48,0),objectify(0,16,14,16,16,48,0)],
[objectify(16,16,0,16,16,48,0),objectify(2,16,0,16,16,48,0)],
[objectify(0,16,16,16,16,48,0),objectify(14,16,16,16,16,48,0)]
]
},
composter8:{
verts:[
[objectify(0,0,0,16,16,16,0)],
[objectify(0,15,16,16,16,32,0),objectify(0,16,16,14,2,66,0),objectify(14,16,16,2,14,64,0),objectify(2,16,2,14,2,64,14),objectify(0,16,14,2,14,78,2)],
[objectify(16,16,16,16,16,48,0),objectify(16,16,2,16,16,48,0)],
[objectify(0,16,0,16,16,48,0),objectify(0,16,14,16,16,48,0)],
[objectify(16,16,0,16,16,48,0),objectify(2,16,0,16,16,48,0)],
[objectify(0,16,16,16,16,48,0),objectify(14,16,16,16,16,48,0)]
]
},
cocoaStage0:{
verts:[
[objectify(6,7,11,4,4,0,0)],
[objectify(6,12,15,4,4,0,0)],
[objectify(10,12,15,4,5,11,4)],
[objectify(6,12,11,4,5,11,4)],
[objectify(10,12,11,4,5,11,4),objectify(8,16,12,4,4,12,0,true)],
[objectify(6,12,15,4,5,11,4),objectify(8,16,16,4,4,12,0)]
],
rotate:true
},
cocoaStage1:{
verts:[
[objectify(5,5,9,6,6,0,0)],
[objectify(5,12,15,6,6,0,0)],
[objectify(11,12,15,6,7,9,4)],
[objectify(5,12,9,6,7,9,4)],
[objectify(11,12,9,6,7,9,4),objectify(8,16,12,4,4,12,0,true)],
[objectify(5,12,15,6,7,9,4),objectify(8,16,16,4,4,12,0)]
],
rotate:true
},
cocoaStage2:{
verts:[
[objectify(4,3,7,8,8,0,0)],
[objectify(4,12,15,8,8,0,0)],
[objectify(12,12,15,8,9,8,4)],
[objectify(4,12,7,8,9,8,4)],
[objectify(12,12,7,8,9,8,4),objectify(8,16,12,4,4,12,0,true)],
[objectify(4,12,15,8,9,8,4),objectify(8,16,16,4,4,12,0)]
],
rotate:true
},
chair:{
verts:[
[objectify(3,6,0,10,16,0,0),objectify(3,0,14,2,2,0,0),objectify(11,0,14,2,2,0,0),objectify(3,0,0,2,2,0,0),objectify(11,0,0,2,2,0,0)],
[objectify(3,8,16,10,16,0,0),objectify(3,24,16,10,2,0,0)],
[objectify(13,8,16,10,2,0,0),objectify(5,6,16,2,6,0,0),objectify(13,6,16,2,6,0,0),objectify(5,6,2,2,6,0,0),objectify(13,6,2,2,6,0,0),objectify(13,24,16,10,16,0,0)],
[objectify(3,8,0,10,2,0,0),objectify(3,6,14,2,6,0,0),objectify(11,6,14,2,6,0,0),objectify(3,6,0,2,6,0,0),objectify(11,6,0,2,6,0,0),objectify(3,24,14,10,16,0,0)],
[objectify(13,8,0,16,2,0,0),objectify(5,6,0,2,6,0,0),objectify(13,6,0,2,6,0,0),objectify(5,6,14,2,6,0,0),objectify(13,6,14,2,6,0,0),objectify(13,24,14,2,16,0,0)],
[objectify(3,8,16,16,2,0,0),objectify(3,6,2,2,6,0,0),objectify(3,6,16,2,6,0,0),objectify(11,6,2,2,6,0,0),objectify(11,6,16,2,6,0,0),objectify(3,24,16,2,16,0,0)]
],
rotate:true
},
arrow:{
verts:[
[objectify(5.5,8,0,5,16,0,0, false,false,true)],
[objectify(5.5,8,16,5,16,0,0, false,true,true)],
[],
[objectify(5.5,10.5,1,5,5,0,5)],
[objectify(8,10.5,0,16,5,0,0, true)],
[objectify(8,10.5,16,16,5,0,0)]
]
},
spyglass:{
verts:[
[objectify(6.9,2.4,6.9,2.2,2.2,0,0, false,false,false,2,2)],
[objectify(6.9,8.6,9.1,2.2,2.2,0,5, false,false,false,2,2),objectify(7,13.5,9,2,2,0,13)],
[objectify(9.1,8.6,9.1,2.2,6.2,0,7, false,false,false,2,6),objectify(9,13.5,9,2,5,0,2)],
[objectify(6.9,8.6,6.9,2.2,6.2,0,7, false,false,false,2,6),objectify(7,13.5,7,2,5,0,2)],
[objectify(9.1,8.6,6.9,2.2,6.2,0,7, false,false,false,2,6),objectify(9,13.5,7,2,5,0,2)],
[objectify(6.9,8.6,9.1,2.2,6.2,0,7, false,false,false,2,6),objectify(7,13.5,9,2,5,0,2)]
]
},
hopper:{
verts:[
[objectify(0,10,0,16,16,-16,0),objectify(4,4,4,8,8,-12,4),objectify(6,0,6,4,4,-10,6)],
[objectify(0,16,16,13,3,19,0),objectify(0,10,16,16,16,-16,0),objectify(3,16,3,13,3,16,13),objectify(0,16,13,3,13,29,3),objectify(13,16,16,3,13,16,0)],
[objectify(16,16,16,16,6,0,0),objectify(12,10,12,8,6,4,6),objectify(10,4,10,4,4,6,12),objectify(13,16,3,10,6,3,0)],
[objectify(0,16,0,16,6,0,0),objectify(4,10,4,8,6,4,6),objectify(6,4,6,4,4,6,12),objectify(3,16,13,10,6,3,0)],
[objectify(16,16,0,16,6,0,0),objectify(12,10,4,8,6,4,6),objectify(10,4,6,4,4,6,12),objectify(3,16,3,10,6,3,0)],
[objectify(0,16,16,16,6,0,0),objectify(4,10,12,8,6,4,6),objectify(6,4,10,4,4,6,12),objectify(13,16,13,10,6,3,0)]
]
},
hopperWall:{
verts:[
[objectify(0,10,0,16,16,-16,0),objectify(4,4,4,8,8,-12,4),objectify(6,4,12,4,4,-10,6)],
[objectify(0,16,16,13,3,19,0),objectify(0,10,16,16,16,-16,0),objectify(3,16,3,13,3,16,13),objectify(0,16,13,3,13,29,3),objectify(13,16,16,3,13,16,0),objectify(6,8,16,4,4,6,12)],
[objectify(16,16,16,16,6,0,0),objectify(12,10,12,8,6,4,6),objectify(13,16,3,10,6,3,0),objectify(10,8,16,4,4,6,12)],
[objectify(0,16,0,16,6,0,0),objectify(4,10,4,8,6,4,6),objectify(3,16,13,10,6,3,0)],
[objectify(16,16,0,16,6,0,0),objectify(12,10,4,8,6,4,6),objectify(10,8,12,4,4,6,12),objectify(3,16,3,10,6,3,0)],
[objectify(0,16,16,16,6,0,0),objectify(4,10,12,8,6,4,6),objectify(6,8,16,4,4,6,12),objectify(13,16,13,10,6,3,0)]
],
rotate:true
},
comparator:{
verts:generateComparator(),
rotate:true
},
comparatorOn:{
verts:generateComparator(false,true),
rotate:true
},
comparatorSubtract:{
verts:generateComparator(true),
rotate:true
},
comparatorSubtractOn:{
verts:generateComparator(true,true),
rotate:true
},
daylightDetector:{
verts:[
[objectify(0,0,0,16,16,0,0)],
[objectify(0,6,16,16,16,0,0)],
[objectify(16,6,16,16,6,0,0)],
[objectify(0,6,0,16,6,0,0)],
[objectify(16,6,0,16,6,0,0)],
[objectify(0,6,16,16,6,0,0)]
],
},
pitcherPlant:{
verts:[
[], //bottom
[], //top
[customFace(2,11,2, 14,11,14, 14,-5,14, 2,-5,2, 0,0,16,16,"pitcherCropBottomStage4"),customFace(2,29,2, 14,29,14, 14,11,14, 2,11,2, 0,0,16,16,"pitcherCropTopStage4")], //north
[customFace(14,11,2, 2,11,14, 2,-5,14, 14,-5,2, 0,0,16,16,"pitcherCropBottomStage4"),customFace(14,29,2, 2,29,14, 2,11,14, 14,11,2, 0,0,16,16,"pitcherCropTopStage4")], //south
[customFace(14,11,14, 2,11,2, 2,-5,2, 14,-5,14, 0,0,16,16,"pitcherCropBottomStage4"),customFace(14,29,14, 2,29,2, 2,11,2, 14,11,14, 0,0,16,16,"pitcherCropTopStage4")], //east
[customFace(2,11,14, 14,11,2, 14,-5,2, 2,-5,14, 0,0,16,16,"pitcherCropBottomStage4"),customFace(2,29,14, 14,29,2, 14,11,2, 2,11,14, 0,0,16,16,"pitcherCropTopStage4")]  //west
],
},
pitcherCropStage0:{
verts:[
[objectify(5,0,5,6,6,5,5,null,null,null,null,null,"pitcherCropBottom")],
[objectify(5,4,11,6,6,5,5,null,null,null,null,null,"pitcherCropTop")],
[objectify(11,4,11,6,4,3,10,null,null,null,null,null,"pitcherCropSide")],
[objectify(5,4,5,6,4,3,10,null,null,null,null,null,"pitcherCropSide")],
[objectify(11,4,5,6,4,3,10,null,null,null,null,null,"pitcherCropSide")],
[objectify(5,4,11,6,4,3,10,null,null,null,null,null,"pitcherCropSide")]
],
hitbox:"slab"
},
pitcherCropStage1:{
verts:[
[objectify(3,0,3,10,10,3,3,null,null,null,null,null,"pitcherCropBottom")],
[objectify(3,6,13,10,10,3,3,null,null,null,null,null,"pitcherCropTop")],
[objectify(13,6,13,10,6,3,10,null,null,null,null,null,"pitcherCropSide"),customFace(2,22,2, 14,22,14, 14,6,14, 2,6,2, 0,0)],
[objectify(3,6,3,10,6,3,10,null,null,null,null,null,"pitcherCropSide"),customFace(14,22,2, 2,22,14, 2,6,14, 14,6,2, 0,0)],
[objectify(13,6,3,10,6,3,10,null,null,null,null,null,"pitcherCropSide"),customFace(14,22,14, 2,22,2, 2,6,2, 14,6,14, 0,0)],
[objectify(3,6,13,10,6,3,10,null,null,null,null,null,"pitcherCropSide"),customFace(2,22,14, 14,22,2, 14,6,2, 2,6,14, 0,0)]
],
hitbox:"cube"
},
pitcherCropStage3:{
verts:[
[objectify(3,0,3,10,10,3,3,null,null,null,null,null,"pitcherCropBottom")],
[objectify(3,6,13,10,10,3,3,null,null,null,null,null,"pitcherCropTop")],
[objectify(13,6,13,10,6,3,10,null,null,null,null,null,"pitcherCropSide"),customFace(2,17,2, 14,17,14, 14,1,14, 2,1,2, 0,0),customFace(2,33,2, 14,33,14, 14,17,14, 2,17,2, 16,0)],
[objectify(3,6,3,10,6,3,10,null,null,null,null,null,"pitcherCropSide"),customFace(14,17,2, 2,17,14, 2,1,14, 14,1,2, 0,0),customFace(14,33,2, 2,33,14, 2,17,14, 14,17,2, 16,0)],
[objectify(13,6,3,10,6,3,10,null,null,null,null,null,"pitcherCropSide"),customFace(14,17,14, 2,17,2, 2,1,2, 14,1,14, 0,0),customFace(14,33,14, 2,33,2, 2,17,2, 14,17,14, 16,0)],
[objectify(3,6,13,10,6,3,10,null,null,null,null,null,"pitcherCropSide"),customFace(2,17,14, 14,17,2, 14,1,2, 2,1,14, 0,0),customFace(2,33,14, 14,33,2, 14,17,2, 2,17,14, 16,0)]
],
hitbox:"tallCube"
},
flat:{
verts:[
[objectify(0,0.25,0,16,16,0,0,false,true)],
[objectify(0,0.25,16,16,16,0,0)],
[],[],[],[]
],
hitbox:"carpet"
},
item: {
verts: generateItemShape(),
},
/*cube2: {
verts: [
[objectify(0,0,0,16,16,0,0),objectify(8,4,8,16,16,0,0)],
[objectify(0,16,16,16,16,0,0),objectify(8,20,24,16,16,0,0)],
[objectify(16,16,16,16,16,0,0),objectify(24,20,24,16,16,0,0)],
[objectify(0,16,0,16,16,0,0),objectify(8,20,8,16,16,0,0)],
[objectify(16,16,0,16,16,0,0),objectify(24,20,8,16,16,0,0)],
[objectify(0,16,16,16,16,0,0),objectify(8,20,24,16,16,0,0)]
],
cull: {
top: 3,
bottom: 3,
north: 3,
south: 3,
east: 3,
west: 3
},
},
cube3: {
verts: [
[objectify(0,0,0,16,16,0,0),objectify(8,4,8,16,16,0,0),objectify(-8,8,-8,16,16,0,0)],
[objectify(0,16,16,16,16,0,0),objectify(8,20,24,16,16,0,0),objectify(-8,24,8,16,16,0,0)],
[objectify(16,16,16,16,16,0,0),objectify(24,20,24,16,16,0,0),objectify(8,24,8,16,16,0,0)],
[objectify(0,16,0,16,16,0,0),objectify(8,20,8,16,16,0,0),objectify(-8,24,-8,16,16,0,0)],
[objectify(16,16,0,16,16,0,0),objectify(24,20,8,16,16,0,0),objectify(8,24,-8,16,16,0,0)],
[objectify(0,16,16,16,16,0,0),objectify(8,20,24,16,16,0,0),objectify(-8,24,8,16,16,0,0)]
],
cull: {
top: 3,
bottom: 3,
north: 3,
south: 3,
east: 3,
west: 3
},
},
cube4: {
verts: [
[objectify(0,0,0,16,16,0,0),objectify(8,4,8,16,16,0,0),objectify(-8,8,-8,16,16,0,0),objectify(8,-4,-8,16,16,0,0)],
[objectify(0,16,16,16,16,0,0),objectify(8,20,24,16,16,0,0),objectify(-8,24,8,16,16,0,0),objectify(8,12,8,16,16,0,0)],
[objectify(16,16,16,16,16,0,0),objectify(24,20,24,16,16,0,0),objectify(8,24,8,16,16,0,0),objectify(24,12,8,16,16,0,0)],
[objectify(0,16,0,16,16,0,0),objectify(8,20,8,16,16,0,0),objectify(-8,24,-8,16,16,0,0),objectify(8,12,-8,16,16,0,0)],
[objectify(16,16,0,16,16,0,0),objectify(24,20,8,16,16,0,0),objectify(8,24,-8,16,16,0,0),objectify(24,12,-8,16,16,0,0)],
[objectify(0,16,16,16,16,0,0),objectify(8,20,24,16,16,0,0),objectify(-8,24,8,16,16,0,0),objectify(8,12,8,16,16,0,0)]
],
cull: {
top: 3,
bottom: 3,
north: 3,
south: 3,
east: 3,
west: 3
}
},
cube5:{
verts:[
[objectify(0,0,0,16,16,0,0),objectify(8,4,8,16,16,0,0),objectify(-8,8,-8,16,16,0,0),objectify(8,-4,-8,16,16,0,0),objectify(16,8,0,16,16,0,0)],
[objectify(0,16,16,16,16,0,0),objectify(8,20,24,16,16,0,0),objectify(-8,24,8,16,16,0,0),objectify(8,12,8,16,16,0,0),objectify(16,24,16,16,16,0,0)],
[objectify(16,16,16,16,16,0,0),objectify(24,20,24,16,16,0,0),objectify(8,24,8,16,16,0,0),objectify(24,12,8,16,16,0,0),objectify(32,24,16,16,16,0,0)],
[objectify(0,16,0,16,16,0,0),objectify(8,20,8,16,16,0,0),objectify(-8,24,-8,16,16,0,0),objectify(8,12,-8,16,16,0,0),objectify(16,24,0,16,16,0,0)],
[objectify(16,16,0,16,16,0,0),objectify(24,20,8,16,16,0,0),objectify(8,24,-8,16,16,0,0),objectify(24,12,-8,16,16,0,0),objectify(32,24,0,16,16,0,0)],
[objectify(0,16,16,16,16,0,0),objectify(8,20,24,16,16,0,0),objectify(-8,24,8,16,16,0,0),objectify(8,12,8,16,16,0,0),objectify(16,24,16,16,16,0,0)]
],
cull: {
top: 3,
bottom: 3,
north: 3,
south: 3,
east: 3,
west: 3
}
},*/
tallCube:{
verts: [
[objectify( 0,  0,  0, 16, 16, 0, 0)], //bottom
[objectify( 0, 32, 16, 16, 16, 0, 0)], //top
[objectify(16, 32, 16, 16, 32, 0, 0)], //north
[objectify( 0, 32,  0, 16, 32, 0, 0)], //south
[objectify(16, 32,  0, 16, 32, 0, 0)], //east
[objectify( 0, 32, 16, 16, 32, 0, 0)]  //west
],
}
}
win.serverShapes = shapes
for(var shape = 0; shape < 8; shape ++){
shapes["layer"+(shape+1)] = {
verts: layerShape((shape+1)*2)
}
shapes["liquidLayer"+(shape+1)] = {
verts: liquidLayerShape((shape+1)*2)
}
}
function compareArr(arr, out) {
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
out[0] = minX
out[1] = minY
out[2] = minZ
out[3] = maxX
out[4] = maxY
out[5] = maxZ
return out
}
function copyArr(a, b) {
for (let i = 0; i < a.length; i++) {
b[i] = a[i]
}
}
function arrayValuesEqual(a1,a2){
if(a1.length !== a2.length) return false
let minLen = a1.length
for(var i=0; i<minLen; i++){
if(a1[i] !== a2[i]){
return false
}
}
return true
}
const {DoubleToIEEE, IEEEToDouble} = (function(){
let tempArrayBuffer = new ArrayBuffer(8)
let tempUint32 = new Uint32Array(tempArrayBuffer), tempFloat64 = new Float64Array(tempArrayBuffer)
return {
DoubleToIEEE(f) {
tempFloat64[0] = f
return tempUint32
},
IEEEToDouble(a,b) {
tempUint32[0] = a
tempUint32[1] = b
return tempFloat64[0]
}
}
})()
const textEncoder = new TextEncoder(), textDecoder = new TextDecoder()
class BitArrayBuilder {
//chaning this requires changing server side
constructor() {
this.bitLength = 0
this.data = [] // Byte array
}
add(num, bits) {
if (+num !== +num || +bits !== +bits || +bits < 0) throw new Error("Broken")
num &= -1 >>> 32 - bits
if(Math.log2(num) >= bits) throw new Error("too big")
let index = this.bitLength >>> 3
let openBits = 8 - (this.bitLength & 7)
this.bitLength += bits
while (bits > 0) {
this.data[index] |= openBits >= bits ? num << openBits - bits : num >>> bits - openBits
bits -= openBits
index++
openBits = 8
}
return this // allow chaining like arr.add(x, 16).add(y, 8).add(z, 16)
}
addDouble(num){
let [a,b] = DoubleToIEEE(num)
this.add(a,32), this.add(b,32)
}
addString(str,lenBits = 8){
if(!str.length) return this.add(0,lenBits)
let arr = textEncoder.encode(str), len = arr.length
this.add(len,lenBits)
this.appendArray(arr.subarray(0,len))
}
/**
* Takes all the bits from another BAB and adds them to this one.
* @param {BitArrayBuilder} bab The BAB to append
*/
append(bab) {
// If our bits are already aligned, just add them directly
if ((this.bitLength & 7) === 0) {
this.data.push(...bab.data)
this.bitLength += bab.bitLength
return
}
// Add them 1 at a time, except for the last one
let bits = bab.bitLength
let i = 0
while (bits > 7) {
this.add(bab.data[i++], 8)
bits -= 8
}
if (bits) {
this.add(bab.data[i] >>> 8 - bits, bits)
}
}
appendArray(arr){//same as above, but for Uint8Array
if ((this.bitLength & 7) === 0) {
this.data.push(...arr)
this.bitLength += arr.length*8
return
}
let bits = arr.length
let i = 0
while (bits) {
this.add(arr[i++], 8)
bits--
}
}
get array() {
return new Uint8Array(this.data)
}
/**
* @param {Number} num
* @returns The number of bits required to hold num
*/
static bits(num) {
return Math.ceil(Math.log2(num))
}
}
win.BitArrayBuilder = BitArrayBuilder
class BitArrayReader {
//chaning this requires changing server side
/**
* @param {Uint8Array} array An array of values from 0 to 255
*/
constructor(array, allowPassLength) {
this.data = array // Byte array; values are assumed to be under 256
this.bit = 0
this.allowPassLength = allowPassLength
}
read(bits, negative = false) {
let openBits = 32 - bits
let { data, bit } = this
this.bit += bits // Move pointer
if (bit > data.length * 8 && !this.allowPassLength) {
throw "Oh no! something got messed up"
}
let unread = 8 - (bit & 7)
let index = bit >>> 3
let ret = 0
while (bits > 0) {
let n = data[index] & -1 >>> 32 - unread
ret |= bits >= unread ? n << bits - unread : n >> unread - bits
bits -= unread
unread = 8
index++
}
if (negative) {
// console.log("Negative", ret, ret << openBits >> openBits)
return ret << openBits >> openBits
}
return ret
}
readDouble(){
return IEEEToDouble(this.read(32),this.read(32))
}
readString(lenBits = 8){
let len = this.read(lenBits)
if(!len) return ""
let arr = new Uint8Array(len)
for(let i=0; i<len; i++){
arr[i] = this.read(8)
}
return textDecoder.decode(arr)
}
readToNew(bits, allowPassLength){
let ret = new Uint8Array(ceil(bits/8))
let idx = 0
while(bits){
let next = min(bits,8)
bits -= next
ret[idx] = this.read(next) << (8-next)
idx++
}
return new BitArrayReader(ret, allowPassLength)
}
readToArray(length){
let ret = new Uint8Array(length)
let idx = 0
length *= 8
while(length){
let next = min(length,8)
length -= next
ret[idx] = this.read(next) << (8-next)
idx++
}
return ret
}
skip(bits){
if (this.bit > this.data.length * 8 && !this.allowPassLength) {
throw "Oh no! something got messed up"
}
this.bits += bits
}
}
win.BitArrayReader = BitArrayReader
function initShapes() {
function mapCoords(rect, face) {
if(rect.custom) return mapCustomCoords(rect)
let x = rect.x
let y = rect.y
let z = rect.z
let w = rect.w
let h = rect.h
let tx = rect.tx
let ty = rect.ty
let tw = rect.tw
let th = rect.th
let tex = [tx+tw,ty, tx,ty, tx,ty+th, tx+tw,ty+th]
if(rect.rt){
if(rect.rt === -1){
tex[0] = tx+th
tex[5] = ty+tw
tex[6] = tx+th
tex[7] = ty+tw
tex.unshift(...tex.splice(tex.length-2,2))
}else if(rect.rt === 2){
tex.push(...tex.splice(0,4))
}else{
tex[0] = tx+th
tex[5] = ty+tw
tex[6] = tx+th
tex[7] = ty+tw
tex.push(...tex.splice(0,2))
}
}
if(rect.txf){
tex[0] = tw-(tex[0]-tx)+tx
tex[2] = tw-(tex[2]-tx)+tx
tex[4] = tw-(tex[4]-tx)+tx
tex[6] = tw-(tex[6]-tx)+tx
}
if(rect.tyf){
tex[1] = th-(tex[1]-ty)+ty
tex[3] = th-(tex[3]-ty)+ty
tex[5] = th-(tex[5]-ty)+ty
tex[7] = th-(tex[7]-ty)+ty
}
let pos = null, normal = null
switch(face) {
case 0: // Bottom
pos = [x,y,z, x+w,y,z, x+w,y,z+h, x,y,z+h]
normal = [0,1,0]
break
case 1: // Top
pos = [x,y,z, x+w,y,z, x+w,y,z-h, x,y,z-h]
normal = [0,-1,0]
break
case 2: // North
pos = [x,y,z, x-w,y,z, x-w,y-h,z, x,y-h,z]
normal = [0,0,-1]
break
case 3: // South
pos = [x,y,z, x+w,y,z, x+w,y-h,z, x,y-h,z]
normal = [0,0,1]
break
case 4: // East
pos = [x,y,z, x,y,z+w, x,y-h,z+w, x,y-h,z]
normal = [-1,0,0]
break
case 5: // West
pos = [x,y,z, x,y,z-w, x,y-h,z-w, x,y-h,z]
normal = [1,0,0]
break
}
pos = pos.map(c => c / 16 - 0.5)
let minmax = compareArr(pos, [])
pos.max = minmax.splice(3, 3)
pos.min = minmax
tex = tex.map(c => c / 16 / 16)
return {
pos,
tex,
normal
}
}
function mapCustomCoords(coords){
let {x,y,z,x2,y2,z2,x3,y3,z3,x4,y4,z4, tx,ty,tw,th} = coords
let tex = [tx+tw,ty, tx,ty, tx,ty+th, tx+tw,ty+th]
let pos = [x,y,z,x2,y2,z2,x3,y3,z3,x4,y4,z4]
pos = pos.map(c => c / 16 - 0.5)
let minmax = compareArr(pos, [])
pos.max = minmax.splice(3, 3)
pos.min = minmax
tex = tex.map(c => c / 16 / 16)
vec1.set(x2-x,y2-y,z2-z)
vec1.crossProduct(x3-x,y3-y,z3-z,vec3)
vec2.set(x3-x,y3-y,z3-z)
vec2.crossProduct(x4-x,y4-y,z4-z,vec4)
vec3.normalize(), vec4.normalize()
let normal = [(vec3.x+vec4.x)/2, (vec3.y+vec4.y)/2, (vec3.z+vec4.z)/2]
return {pos,tex,normal}
}
// 90 degree clockwise rotation; returns a new shape object
function rotate(shape, bit) {
let verts = shape.verts
let texVerts = shape.texVerts
let pos = []
let normal = []
tex = []
for (let i = 0; i < verts.length; i++) {
let side = verts[i]
pos[i] = []
tex[i] = []
normal[i] = []
for (let j = 0; j < side.length; j++) {
let face = side[j]
let c = []
pos[i][j] = c
for (let k = 0; k < face.length; k += 3) {
c[k] = face[k + 2]
c[k + 1] = face[k + 1]
c[k + 2] = -face[k]
}
tex[i][j] = texVerts[i][j].slice() // Copy texture verts exactly
if (i === 0) {
// Bottom
c.push(...c.splice(0, 3))
tex[i][j].push(...tex[i][j].splice(0, 2))
}
if (i === 1) {
// Top
c.unshift(...c.splice(-3, 3))
tex[i][j].unshift(...tex[i][j].splice(-2, 2))
}
let minmax = compareArr(c, [])
c.max = minmax.splice(3, 3)
c.min = minmax
normal[i][j] = shape.normal[i][j].slice()
let temp = normal[i][j][0]
normal[i][j][0] = normal[i][j][2]
normal[i][j][2] = -temp
}
}
let temp = tex[2] // North
tex[2] = tex[5] // North = West
tex[5] = tex[3] // West = South
tex[3] = tex[4] // South = East
tex[4] = temp // East = North
temp = pos[2] // North
pos[2] = pos[5] // North = West
pos[5] = pos[3] // West = South
pos[3] = pos[4] // South = East
pos[4] = temp // East = North
temp = normal[2] // North
normal[2] = normal[5] // North = West
normal[5] = normal[3] // West = South
normal[3] = normal[4] // South = East
normal[4] = temp // East = North
return {
verts: pos,
texVerts: tex,
normal,
rotate: true,
flip: shape.flip,
size: shape.size,
varients: shape.varients,
bit: bit,
rotated: true,
rotateTimes: (shape.rotateTimes || 0) + 1,
originalVerts: shape.originalVerts,
hitbox: shape.hitbox
}
}
// Reflect over the y plane; returns a new shape object
function flip(shape, bit) {
let verts = shape.verts
let texVerts = shape.texVerts
let pos = []
let normal = []
tex = []
for (let i = 0; i < verts.length; i++) {
let side = verts[i]
pos[i] = []
tex[i] = []
normal[i] = []
for (let j = 0; j < side.length; j++) {
let face = side[j].slice().reverse()
let c = []
pos[i][j] = c
for (let k = 0; k < face.length; k += 3) {
c[k] = face[k + 2]
c[k + 1] = -face[k + 1]
c[k + 2] = face[k]
}
let minmax = compareArr(c, [])
c.max = minmax.splice(3, 3)
c.min = minmax
tex[i][j] = texVerts[i][j].slice() // Copy texture verts exactly
normal[i][j] = shape.normal[i][j].slice()
normal[i][j][1] = -normal[i][j][1]
}
}
let temp = pos[0] // Bottom
pos[0] = pos[1] // Bottom = Top
pos[1] = temp // Top = Bottom
temp = tex[0] // Bottom
tex[0] = tex[1] // Bottom = Top
tex[1] = temp // Top = Bottom
temp = normal[0] // Bottom
normal[0] = normal[1] // Bottom = Top
normal[1] = temp // Top = Bottom
return {
verts: pos,
texVerts: tex,
normal,
rotate: shape.rotate,
flip: shape.flip,
size: shape.size,
varients: shape.varients,
bit: bit,
originalVerts: shape.originalVerts
}
}
for (let shape in shapes) {
win.sh = shape
let obj = shapes[shape]
let verts = obj.verts
obj.size = verts[0].length + verts[1].length + verts[2].length + verts[3].length + verts[4].length + verts[5].length
obj.texVerts = []
obj.varients = []
obj.normal = []
if(typeof obj.hitbox === "string"){
obj.hitbox = shapes[obj.hitbox]
}
obj.originalVerts = []
for(let i=0; i<verts.length; i++){
obj.originalVerts[i] = verts[i].slice()
}
// Populate the vertex coordinates
for (let i = 0; i < verts.length; i++) {
let side = verts[i]
let texArr = []
obj.texVerts.push(texArr)
let normal = obj.normal[i] = []
for (let j = 0; j < side.length; j++) {
let face = side[j]
let mapped = mapCoords(face, i)
side[j] = mapped.pos
texArr.push(mapped.tex)
normal[j] = mapped.normal
}
}
if (obj.rotate) {
let v = obj.varients
let east = rotate(obj, 4<<10)
let south = rotate(east, 2<<10)
let west = rotate(south, 6<<10)
v[0] = obj
v[2] = south
v[4] = east
v[6] = west
}
if (obj.flip) {
let v = obj.varients
v[1] = flip(obj,1<<10)
if (obj.rotate) {
v[3] = flip(v[2], 3<<10)
v[5] = flip(v[4], 5<<10)
v[7] = flip(v[6], 7<<10)
}
}
}
function makeBlock(tex,shape,Block, base, Name){
Block.textures = tex
Block.shape = shape
Block.shadow = base ? base.shadow : true
Block.transparent = base ? base.transparent : false
Block.solid = base ? base.solid : true
if(Name) Block.Name = Name
}
function rotTex(tex,n){
tex = tex.slice()
if(n){
for(var i=0; i<n; i++){
let temp = tex[2] // North
tex[2] = tex[5] // North = West
tex[5] = tex[3] // West = South
tex[3] = tex[4] // South = East
tex[4] = temp // East = North
}
}else{
let temp = tex[2] // North
tex[2] = tex[5] // North = West
tex[5] = tex[3] // West = South
tex[3] = tex[4] // South = East
tex[4] = temp // East = North
}
return tex
}
var buttonOnclick = function(x,y,z,dimension,world){
var off = this.id | BUTTON
var on = this.id | SLAB
var target = null
switch(world.getBlock(x,y,z,dimension)){
case off | NORTH:
target = on | NORTH
break
case off | SOUTH:
target = on | SOUTH
break
case off | EAST:
target = on | EAST
break
case off | WEST:
target = on | WEST
}
if(target){
world.setBlock(x,y,z,target, false,false,false,false,dimension)
}
}
var buttonOnupdate = function(x,y,z,b,world,sx,sy,sz,dimension){
var off = this.id | BUTTON
var on = this.id | SLAB
var target = null
var ax=x,ay=y,az=z, dir
var block = world.getBlock(x,y,z,dimension)
switch(block){
case on | NORTH:
case off | NORTH:
az++
dir = "south"
break
case on | SOUTH:
case off | SOUTH:
az--
dir = "north"
break
case on | EAST:
case off | EAST:
ax++
dir = "east"
break
case on | WEST:
case off | WEST:
ax--
dir = "west"
break
}
var hasPower
switch(block){
case on | NORTH:
target = off | NORTH
hasPower = true
break
case on | SOUTH:
target = off | SOUTH
hasPower = true
break
case on | EAST:
target = off | EAST
hasPower = true
break
case on | WEST:
target = off | WEST
hasPower = true
break
}
if(hasPower && !world.getPower(x,y,z,dimension)){
world.setPower(x,y,z,16,false,dimension)
world.spreadPower(x,y,z,16,dimension)
world.setBlockPower(ax,ay,az,"strong",dir,dimension)
world.playSound(x,y,z, "click",1,0.6)
world.setTimeout(function(){
world.setBlock(x,y,z,target, false,false,false,false,dimension)
world.setPower(x,y,z,0,false,dimension)
world.unspreadPower(x,y,z,16,false,dimension)
world.setBlockPower(ax,ay,az,null,dir,dimension)
world.playSound(x,y,z, "click",1,0.5)
},this.stone ? tickTime*20 : tickTime*30, x,y,z,dimension)
}
}
var pressurePlateActivate = function(x,y,z,dimension,block,ent,world){
if(this.heavyWeighted || this.lightWeighted) return //not going to do those yet
if(world.getBlock(x,y,z,dimension) === this.id && pressurePlateHasPressure(x,y,z,dimension,world)){
world.setBlock(x,y,z, this.id | SLAB, false,false,false,false,dimension)
}
}
var pressurePlateOnupdate = function(x,y,z,b,world,sx,sy,sz,dimension){
var block = world.getBlock(x,y,z,dimension)
if(block === (this.id | SLAB) && !world.getPower(x,y,z,dimension)){
world.setPower(x,y,z,16,false,dimension)
world.spreadPower(x,y,z,16,dimension)
world.setBlockPower(x,y-1,z,"strong","top",dimension)
world.playSound(x,y,z, "click",1,0.6)
var me = this
var i = setInterval(function(){
if(pressurePlateHasPressure(x,y,z,dimension,world)) return
clearInterval(i)
world.setTimeout(function(){
world.setBlock(x,y,z,me.id, false,false,false,false,dimension)
world.setPower(x,y,z,0,false,dimension)
world.unspreadPower(x,y,z,16,false,dimension)
world.setBlockPower(x,y-1,z,null,"top",dimension)
world.playSound(x,y,z, "click",1,0.5)
}, tickTime*20, x,y,z,dimension)
}, tickTime*2)
}
}
var logicGateOnupdate = function(x,y,z,b,w,sx,sy,sz,dimension){
this.onpowerupdate(x,y,z,null,null,null,null,dimension,w)
}
var logicGateOndelete = function(x,y,z,prevTags,prevBlock,dimension,world){
world.unspreadPower(x,y,z,16,false,dimension)
world.setBlockPower(x,y,z+1,null,"south",dimension)
world.setBlockPower(x,y,z-1,null,"north",dimension)
world.setBlockPower(x+1,y,z,null,"east",dimension)
world.setBlockPower(x-1,y,z,null,"west",dimension)
}
var logicGateOnpowerupdate = function(x,y,z,sx,sy,sz,blockPowerChanged,dimension,world){
var block = world.getBlock(x,y,z,dimension)
var px = 0, pz = 0
switch(block){
case this.id | NORTH:
case this.id | SLAB | NORTH:
pz++
break
case this.id | SOUTH:
case this.id | SLAB | SOUTH:
pz--
break
case this.id | EAST:
case this.id | SLAB | EAST:
px++
break
case this.id | WEST:
case this.id | SLAB | WEST:
px--
break
}
var shouldBeOn = this.shouldBeOn(x,y,z,dimension,px,pz,world)
var isOn = false
var target, tx = x, ty = y, tz = z, side
switch(block){
case this.id | NORTH:
target = this.id | SLAB | NORTH
tz++
side = "south"
break
case this.id | SOUTH:
target = this.id | SLAB | SOUTH
tz--
side = "north"
break
case this.id | EAST:
target = this.id | SLAB | EAST
tx++
side = "east"
break
case this.id | WEST:
target = this.id | SLAB | WEST
tx--
side = "west"
break
case this.id | SLAB | NORTH:
isOn = true
target = this.id | NORTH
tz++
side = "south"
break
case this.id | SLAB | SOUTH:
isOn = true
target = this.id | SOUTH
tz--
side = "north"
break
case this.id | SLAB | EAST:
isOn = true
target = this.id | EAST
tx++
side = "east"
break
case this.id | SLAB | WEST:
isOn = true
target = this.id | WEST
tx--
side = "west"
break
}
var tblock = world.getBlock(tx,ty,tz,dimension)
if(tblock && blockData[tblock].name === "redstoneDust"){
if(isOn){
if(world.getPower(tx,ty,tz,dimension) !== 15){
world.setPower(tx,ty,tz,15,false,dimension)
world.spreadPower(tx,ty,tz,15,dimension)
}
}
}else if(tblock && !blockData[tblock].transparent){
if(isOn){
world.setBlockPower(tx,ty,tz,"strong",side,dimension)
}else{
world.setBlockPower(tx,ty,tz,null,side,dimension)
}
}
if(isOn !== shouldBeOn){
var t = function(){
world.setBlock(x,y,z,target,false,false,false,false,dimension)
var tblock = world.getBlock(tx,ty,tz,dimension)
if(shouldBeOn){
if(tblock && blockData[tblock].name === "redstoneDust"){
world.setPower(tx,ty,tz,15,false,dimension)
world.spreadPower(tx,ty,tz,15,dimension)
}else if(tblock && !blockData[tblock].transparent){
world.setBlockPower(tx,ty,tz,"strong",side,dimension)
}
}else{
if(tblock && blockData[tblock].name === "redstoneDust"){
world.unspreadPower(tx,ty,tz,15,true,dimension)
}else if(tblock && !blockData[tblock].transparent){
world.setBlockPower(tx,ty,tz,null,side,dimension)
}
}
}
world.setTimeout(t,tickTime*2, x,y,z,dimension)
}
}
var logicGateGetFacing = function(x,y,z,dimension,world){
var block = world.getBlock(x,y,z,dimension)
switch(block){
case this.id | NORTH:
case this.id | SLAB | NORTH:
return "north"
case this.id | SOUTH:
case this.id | SLAB | SOUTH:
return "south"
case this.id | EAST:
case this.id | SLAB | EAST:
return "east"
case this.id | WEST:
case this.id | SLAB | WEST:
return "west"
}
}
var logicGateCanHavePower = function(rx,ry,rz,x,y,z,dimension,world){
var tx = rx, ty = ry, tz = rz, on
var block = world.getBlock(rx,ry,rz,dimension)
switch(block){
case this.id | NORTH | SLAB:
on = true
case this.id | NORTH:
tz++
break
case this.id | SOUTH | SLAB:
on = true
case this.id | SOUTH:
tz--
break
case this.id | EAST | SLAB:
on = true
case this.id | EAST:
tx++
break
case this.id | WEST | SLAB:
on = true
case this.id | WEST:
tx--
break
}
if(on && tx === x && ty === y && tz === z){
return 15
}
return 0
}
var signOnplace = function(x,y,z, dimension, player,world){
var block = world.getBlock(x,y,z,dimension)
var tags = {sign:true}
var rot = round(player.ry*-16/Math.PId)
if((block & STAIR) === STAIR) rot = round(rot/4)*4
tags.rot = rot
world.setTags(x,y,z,tags,false,dimension)
}
var itemFrameOnclick = function(x,y,z, dimension,world, p){
var prev = world.getTagByName(x,y,z,"block",dimension) || 0
if(!prev && p.holding) world.setTagByName(x,y,z, "block",p.holding,false,dimension)
else{
var rot = world.getTagByName(x,y,z,"rot",dimension) || 0
rot++
if(rot >= 8) rot = 0
world.setTagByName(x,y,z, "rot",rot,false,dimension)
}
}
let doorToggle = function(x,y,z,dimension,world){
var b = world.getBlock(x,y,z,dimension)
var o = (b & DOOR) !== DOOR
var shapeId = o ? (this.id | SLAB) : (this.id | DOOR)
var setId = o ? (this.id | DOOR) : (this.id | SLAB)
var set
if(o){
if((shapeId | NORTH) === b){
set = setId | EAST
}else if((shapeId | EAST) === b){
set = setId | SOUTH
}else if((shapeId | SOUTH) === b){
set = setId | WEST
}else if((shapeId | WEST) === b){
set = setId | NORTH
}
}else{
if((shapeId | NORTH) === b){
set = setId | WEST
}else if((shapeId | WEST) === b){
set = setId | SOUTH
}else if((shapeId | SOUTH) === b){
set = setId | EAST
}else if((shapeId | EAST) === b){
set = setId | NORTH
}
}
world.setBlock(x,y,z,set, false,false,false,false,dimension)
doorSound(x,y,z,this.name === "ironDoor"?"iron_door":"wooden_door",!o,world)
}
let trapdoorToggle = function(x,y,z,dimension,world){
let block = world.getBlock(x,y,z,dimension)
let target
switch(block){
case this.id | TRAPDOOR | NORTH:
target = this.id | TRAPDOOROPEN | NORTH
break
case this.id | TRAPDOOR | SOUTH:
target = this.id | TRAPDOOROPEN | SOUTH
break
case this.id | TRAPDOOR | EAST:
target = this.id | TRAPDOOROPEN | EAST
break
case this.id | TRAPDOOR | WEST:
target = this.id | TRAPDOOROPEN | WEST
break
}
world.setBlock(x,y,z,target,false,false,false,false,dimension)
doorSound(x,y,z,this.name === "ironTrapdoor"?"iron_trapdoor":"wooden_trapdoor",true,world)
}
let trapdoorOpenToggle = function(x,y,z,dimension,world){
let block = world.getBlock(x,y,z,dimension)
let target
switch(block){
case this.id | TRAPDOOROPEN | NORTH:
target = this.id | TRAPDOOR | NORTH
break
case this.id | TRAPDOOROPEN | SOUTH:
target = this.id | TRAPDOOR | SOUTH
break
case this.id | TRAPDOOROPEN | EAST:
target = this.id | TRAPDOOR | EAST
break
case this.id | TRAPDOOROPEN | WEST:
target = this.id | TRAPDOOR | WEST
break
}
world.setBlock(x,y,z,target,false,false,false,false,dimension)
doorSound(x,y,z,this.name === "ironTrapdoor"?"iron_trapdoor":"wooden_trapdoor",false,world)
}
const liquidData = {
getLevel:function(block){
switch(block){
case this.id | LAYER1:
return 1
case this.id | LAYER2:
return 2
case this.id | LAYER3:
return 3
case this.id | LAYER4:
return 4
case this.id | LAYER5:
return 5
case this.id | LAYER6:
return 6
case this.id | LAYER7:
return 7
case this.id | LAYER8:
case this.id:
return 8
default:
return 0
}
},
getLevelBlock:function(l){
switch(l){
case 1:
return this.id | LAYER1
case 2:
return this.id | LAYER2
case 3:
return this.id | LAYER3
case 4:
return this.id | LAYER4
case 5:
return this.id | LAYER5
case 6:
return this.id | LAYER6
case 7:
return this.id | LAYER7
case 8:
return this.id | LAYER8
}
},
getLevelAt:function(x,y,z,dimension,world){
var block = world.getBlock(x,y,z,dimension)
return this.getLevel(block)
},
isThisHere:function(x,y,z,d,world){
var b = world.getBlock(x,y,z,d)
return b && blockData[b].id === this.id
},
isThis:function(b){
return b && blockData[b].id === this.id
},
isSourceAt:function(x,y,z,d,world){
var b = world.getBlock(x,y,z,d)
return b === this.id
},
tryFlowTo:function(x,y,z,dimension,level,world){
let block = world.getBlock(x,y,z,dimension)
const data = blockData[block]
if(!block || data.liquidBreakable || data.liquid && this.density > data.density && data.id !== block){
world.setBlock(x,y,z,this.getLevelBlock(level),false,false,false,false,dimension)
if(data.liquidBreakable === "drop"){
world.addItems(x,y,z,dimension,0,0,0,block,true)
world.blockParticles(block,x,y,z,30, "break",dimension)
world.blockSound(block, "dig", x,y,z)
}
return true
}
},
flow:function(x,y,z,dimension,world){
let block = world.getBlock(x,y,z,dimension)
if(!this.isThis(block)) return
let source = block === this.id
let level = this.getLevel(block)
let down = world.getBlock(x,y-1,z,dimension)
if(!source){
if(this.canDuplicate && (world.getBlock(x,y,z+1,dimension) === this.id)+(world.getBlock(x,y,z-1,dimension) === this.id)+(world.getBlock(x+1,y,z,dimension) === this.id)+(world.getBlock(x-1,y,z,dimension) === this.id) >= 2 && (down || down === this.id)){
return world.setBlock(x,y,z,this.id, false,false,false,false,dimension) //if two or more sources surrounding, turn into source
}
let levelTarget = level
if(this.isThisHere(x,y+1,z,dimension,world)){
levelTarget = 8
}else{
let around = max(this.getLevelAt(x,y,z+1,dimension,world), this.getLevelAt(x,y,z-1,dimension,world), this.getLevelAt(x+1,y,z,dimension,world), this.getLevelAt(x-1,y,z,dimension,world))
around = this.getLevelDifference(around,dimension)
if(around !== levelTarget) levelTarget = around
if(levelTarget <= 0) return world.setBlock(x,y,z,0, false,false,false,false,dimension)
}
if(level !== levelTarget){
level = levelTarget
world.setBlock(x,y,z,this.getLevelBlock(level), false,false,false,false,dimension)
}
}else{
let above = world.getBlock(x,y+1,z,dimension)
if(blockData[above].liquid && blockData[above].density > this.density){
world.setBlock(x,y,z,above,false,false,false,false,dimension)
world.setBlock(x,y+1,z,block,false,false,false,false,dimension)
return
}
}
let newLevel = this.getLevelDifference(level,dimension)
if(!this.tryFlowTo(x,y-1,z,dimension,8,world) && newLevel > 0 && !(this.isThis(down) && down !== this.id)){
this.tryFlowTo(x,y,z+1,dimension,newLevel,world)
this.tryFlowTo(x,y,z-1,dimension,newLevel,world)
this.tryFlowTo(x+1,y,z,dimension,newLevel,world)
this.tryFlowTo(x-1,y,z,dimension,newLevel,world)
}
},
current:{
x:0,z:0,
ang4:Math.sqrt(0.5),
ang8:Math.sqrt(5)
},
getCurrent:function(bx,by,bz,dimension,level,noNormalize,world){
if(level === undefined) level = this.getLevelAt(bx,by,bz,dimension,world)
let x = this.getLevelAt(bx-1,by,bz,dimension,world)
let X = this.getLevelAt(bx+1,by,bz,dimension,world)
let z = this.getLevelAt(bx,by,bz-1,dimension,world)
let Z = this.getLevelAt(bx,by,bz+1,dimension,world)
let current = this.current
current.x = (X && X < level) + (x > level) - (X > level) - (x && x < level)
current.z = (Z && Z < level) + (z > level) - (Z > level) - (z && z < level)
if(noNormalize) return current
let mag = Math.sqrt(current.x * current.x + current.z * current.z)
current.x /= mag
current.z /= mag
return current
},
isThisLocalHere(x,y,z,dimension,blocks,func,world){
return blockData[func.call(world, x, y, z, (func === getBlock ? blocks : dimension))].id === this.id
}
}
for (let i = 0; i < BLOCK_COUNT; i++) {
let baseBlock = blockData[i]
for(var t=0; t<baseBlock.textures.length; t++){
if(semiTransTextures.includes(baseBlock.textures[t])){
baseBlock.semiTrans = true
break
}
}
if(baseBlock.item){
if(baseBlock.spyglass) baseBlock.shape = shapes.spyglass
else baseBlock.shape = shapes.item
continue
}
let drop = baseBlock.drop || i
let d = baseBlock.drop
let slabBlock = Object.create(baseBlock)
let stairBlock = Object.create(baseBlock)
let crossBlock = Object.create(baseBlock)
let tallcrossBlock = Object.create(baseBlock)
let doorBlock = Object.create(baseBlock)
let torchBlock = Object.create(baseBlock)
let lanternBlock = Object.create(baseBlock)
let lanternHangBlock = Object.create(baseBlock)
let beaconBlock = Object.create(baseBlock)
let cactusBlock = Object.create(baseBlock)
let paneBlock = Object.create(baseBlock)
let portalBlock = Object.create(baseBlock)
let trapdoorBlock = Object.create(baseBlock)
let openTrapdoor = Object.create(baseBlock)
let wallFlatBlock = Object.create(baseBlock)
let fenceBlock = Object.create(baseBlock)
let wallPostBlock = Object.create(baseBlock)
let buttonBlock = Object.create(baseBlock)
let chainBlock = Object.create(baseBlock)
let potBlock = Object.create(baseBlock)
let potCrossBlock = Object.create(baseBlock)
let carpetBlock = Object.create(baseBlock)
let cornerStairInBlock = Object.create(baseBlock)
let cornerStairOutBlock = Object.create(baseBlock)
let verticalSlabBlock = Object.create(baseBlock)
baseBlock.shape = baseBlock.shapeName ? shapes[baseBlock.shapeName] : shapes.cube
slabBlock.shape = shapes.slab
slabBlock.transparent = true
slabBlock.drop = d || (i | SLAB)
slabBlock.Name += " Slab"
slabBlock.randomRotate = null
stairBlock.shape = shapes.stair
stairBlock.transparent = true
stairBlock.drop = d || (i | STAIR)
stairBlock.Name += " Stair"
stairBlock.randomRotate = null
crossBlock.shape = shapes.cross
crossBlock.drop = drop
tallcrossBlock.shape = shapes.tallCross
tallcrossBlock.drop = drop
doorBlock.shape = shapes.door
doorBlock.drop = drop
torchBlock.shape = shapes.torch
torchBlock.drop = drop
lanternBlock.shape = shapes.lantern
lanternHangBlock.shape = shapes.lanternHang
beaconBlock.shape = shapes.beacon
beaconBlock.drop = drop
cactusBlock.shape = shapes.cactus
cactusBlock.drop = drop
paneBlock.shape = shapes.pane
paneBlock.drop = drop
portalBlock.shape = shapes.portal
wallFlatBlock.shape = shapes.wallFlat
wallFlatBlock.drop = drop
trapdoorBlock.shape = shapes.trapdoor
trapdoorBlock.drop = drop
openTrapdoor.shape = shapes.trapdoorOpen
openTrapdoor.drop = drop
fenceBlock.shape = shapes.fence
fenceBlock.transparent = true
fenceBlock.drop = drop
fenceBlock.randomRotate = null
wallPostBlock.shape = shapes.wallpost
wallPostBlock.transparent = true
wallPostBlock.drop = drop
wallPostBlock.randomRotate = null
buttonBlock.shape = shapes.button
buttonBlock.drop = drop
chainBlock.shape = shapes.chain
chainBlock.drop = drop
potBlock.shape = shapes.pot
potBlock.drop = drop
potCrossBlock.shape = shapes.potCross
potCrossBlock.drop = drop
carpetBlock.shape = shapes.carpet
carpetBlock.shadow = false
carpetBlock.transparent = true
carpetBlock.drop = i
cornerStairInBlock.shape = shapes.stairCornerIn
cornerStairInBlock.transparent = true
cornerStairInBlock.drop = d || (i | STAIR)
cornerStairInBlock.randomRotate = null
cornerStairOutBlock.shape = shapes.stairCornerOut
cornerStairOutBlock.transparent = true
cornerStairOutBlock.drop = d || (i | STAIR)
cornerStairOutBlock.randomRotate = null
verticalSlabBlock.shape = shapes.verticalSlab
verticalSlabBlock.transparent = true
verticalSlabBlock.drop = d || (i | VERTICALSLAB)
verticalSlabBlock.Name += " Vertical Slab"
verticalSlabBlock.randomRotate = null
if(baseBlock.torch || baseBlock.chain){
slabBlock.drop = i
}
if(baseBlock.door){
var onclick = baseBlock.name === "ironDoor" ? emptyFunc : function(x,y,z,dimension,world){
this.toggle(x,y,z,dimension,world)
}
var onpowerupdate = function(x,y,z,sx,sy,sz,blockPowerChanged,dimension,world){
var power = world.getRedstonePower(x,y,z,dimension) || world.getSurroundingBlockPower(x,y,z,dimension) ? true : false
let block = world.getBlock(x,y,z,dimension)
var open = (block & DOOR) !== DOOR
if(power !== open) this.toggle(x,y,z,dimension,world)
}
baseBlock.toggle = doorToggle.bind(baseBlock)
baseBlock.onclick = onclick.bind(baseBlock)
baseBlock.onpowerupdate = onpowerupdate.bind(baseBlock)
slabBlock.shape = shapes.door2
slabBlock.drop = i
slabBlock.Name = "Inverted "+baseBlock.name
}
if(baseBlock.trapdoor){
var onclick = baseBlock.name === "ironTrapdoor" ? emptyFunc : function(x,y,z,dimension,world){
this.toggle(x,y,z,dimension,world)
}
var onpowerupdate = function(x,y,z,sx,sy,sz,blockPowerChanged,dimension,world){
var power = world.getRedstonePower(x,y,z,dimension) || world.getSurroundingBlockPower(x,y,z,dimension) ? true : false
let block = world.getBlock(x,y,z,dimension)
var open = (block & TRAPDOOR) !== TRAPDOOR
if(power !== open) this.toggle(x,y,z,dimension,world)
}
trapdoorBlock.toggle = trapdoorToggle.bind(baseBlock)
openTrapdoor.toggle = trapdoorOpenToggle.bind(baseBlock)
trapdoorBlock.onclick = onclick.bind(trapdoorBlock)
openTrapdoor.onclick = onclick.bind(openTrapdoor)
trapdoorBlock.onpowerupdate = onpowerupdate.bind(trapdoorBlock)
openTrapdoor.onpowerupdate = onpowerupdate.bind(openTrapdoor)
}
if(baseBlock.bed) baseBlock.shape = shapes.bed
if(baseBlock.rotate) baseBlock.shape = shapes.rotate
if(baseBlock.cactus) potCrossBlock.shape = shapes.cactusPot
if(baseBlock.crop) baseBlock.shape = shapes.crop
if(baseBlock.tallCrop)baseBlock.shape = shapes.tallCrop
if(baseBlock.anvil) baseBlock.shape = shapes.anvil
if(baseBlock._1PixLower) baseBlock.shape = shapes._1PixLower, baseBlock.transparent = true
if(baseBlock.torch) slabBlock.shape = shapes.wallTorch
if(baseBlock.sporeBlossom) baseBlock.shape = shapes.sporeBlossom
if(baseBlock.azalea){
baseBlock.shape = shapes.azalea
potCrossBlock.shape = shapes.azaleaPot
var t = baseBlock.potTex
potCrossBlock.textures = [t[0],t[0],t[1],t[1],t[1],t[1]]
}
if(baseBlock.sunflower) baseBlock.shape = shapes.sunflower
if(baseBlock.sideCross){baseBlock.shape = shapes.sideCross; slabBlock.shape = shapes.bottomCross}
if(baseBlock.layers){
torchBlock.shape = shapes.layer1
torchBlock.solid = true
torchBlock.shadow = false
torchBlock.dropAmount = 1
slabBlock.shape = shapes.layer2
slabBlock.solid = true
slabBlock.shadow = false
slabBlock.dropAmount = 2
stairBlock.shape = shapes.layer3
stairBlock.solid = true
stairBlock.shadow = false
stairBlock.dropAmount = 3
crossBlock.shape = shapes.layer4
crossBlock.solid = true
crossBlock.shadow = false
crossBlock.dropAmount = 4
tallcrossBlock.shape = shapes.layer5
tallcrossBlock.solid = true
tallcrossBlock.shadow = false
tallcrossBlock.dropAmount = 5
lanternBlock.shape = shapes.layer6
lanternBlock.solid = true
lanternBlock.shadow = false
lanternBlock.dropAmount = 6
lanternHangBlock.shape = shapes.layer7
lanternHangBlock.solid = true
lanternHangBlock.shadow = false
lanternHangBlock.dropAmount = 7
doorBlock.shape = shapes.layer8
doorBlock.solid = true
doorBlock.shadow = false
doorBlock.dropAmount = 8
}
if(baseBlock.liquid){
Object.assign(baseBlock,liquidData)
baseBlock.shape = shapes.liquidLayer8
torchBlock.shape = shapes.liquidLayer1
torchBlock.ambientSound = baseBlock.flowSound
slabBlock.shape = shapes.liquidLayer2
slabBlock.ambientSound = baseBlock.flowSound
stairBlock.shape = shapes.liquidLayer3
stairBlock.ambientSound = baseBlock.flowSound
crossBlock.shape = shapes.liquidLayer4
crossBlock.ambientSound = baseBlock.flowSound
tallcrossBlock.shape = shapes.liquidLayer5
tallcrossBlock.ambientSound = baseBlock.flowSound
lanternBlock.shape = shapes.liquidLayer6
lanternBlock.ambientSound = baseBlock.flowSound
lanternHangBlock.shape = shapes.liquidLayer7
lanternHangBlock.ambientSound = baseBlock.flowSound
doorBlock.shape = shapes.liquidLayer8
doorBlock.ambientSound = baseBlock.flowSound
}
if(baseBlock.name === "grass"){
crossBlock.shape = shapes.cube
crossBlock.textures = ["dirt","grassTop","snowGrass","snowGrass","snowGrass","snowGrass"]
crossBlock.solid = true
crossBlock.transparent = false
crossBlock.shadow = true
crossBlock.biomeTintTop = false
crossBlock.biomeTintNorth = false
crossBlock.biomeTintSouth = false
crossBlock.biomeTintEast = false
crossBlock.biomeTintWest = false
tallcrossBlock.shape = shapes._1PixLower
tallcrossBlock.textures = ["dirt","dirtPathTop","dirtPathSide","dirtPathSide","dirtPathSide","dirtPathSide"]
tallcrossBlock.solid = true
tallcrossBlock.transparent = true
tallcrossBlock.cullFace = "same"
tallcrossBlock.shadow = true
tallcrossBlock.biomeTintTop = false
tallcrossBlock.biomeTintNorth = false
tallcrossBlock.biomeTintSouth = false
tallcrossBlock.biomeTintEast = false
tallcrossBlock.biomeTintWest = false
}
if(baseBlock.name === "podzol"){
crossBlock.shape = shapes.cube
crossBlock.textures = ["dirt","podzolTop","snowGrass","snowGrass","snowGrass","snowGrass"]
crossBlock.solid = true
crossBlock.transparent = false
crossBlock.shadow = true
}
if(baseBlock.name === "farmland"){
slabBlock.textures = []
copyArr(baseBlock.textures, slabBlock.textures)
slabBlock.textures[1] = "farmlandMoist"
slabBlock.shape = shapes._1PixLower
}
if(baseBlock.mushroomBlock){
var cap = baseBlock.name
var pore = "mushroomBlockInside"
makeBlock(new Array(6).fill(pore), shapes.cube, slabBlock)
makeBlock([pore,cap,pore,pore,pore,pore], shapes.cube, stairBlock)
makeBlock([cap,pore,pore,pore,pore,pore], shapes.cube, crossBlock)
makeBlock([cap,cap,pore,pore,pore,pore], shapes.cube, tallcrossBlock)
makeBlock([pore,pore,cap,pore,pore,pore], shapes.rotate, doorBlock)
makeBlock([pore,cap,cap,pore,pore,pore], shapes.rotate, paneBlock)
makeBlock([cap,pore,cap,pore,pore,pore], shapes.rotate, portalBlock)
makeBlock([cap,cap,cap,pore,pore,pore], shapes.rotate, wallFlatBlock)
}
if(baseBlock.cake) baseBlock.shape = shapes.cake
if(baseBlock.stonecutter) baseBlock.shape = shapes.stonecutter
if(baseBlock.itemFrame){
baseBlock.shape = shapes.itemFrame
baseBlock.onclick = itemFrameOnclick
baseBlock.tagBits = null
}
if(baseBlock.name === "redstoneLamp"){
makeBlock(new Array(6).fill("redstoneLampOn"), shapes.cube, slabBlock)
slabBlock.lightLevel = 15
}
if(baseBlock.name === "endPortalFrame"){
baseBlock.shape = shapes.endPortalFrame
makeBlock(baseBlock.textures, shapes.endPortalFrameWithEyeOfEnder, slabBlock)
}
if(baseBlock.name === "furnace"){
var arr = baseBlock.textures.slice()
arr[3] = "furnaceFrontOn"
makeBlock(arr, shapes.rotate, slabBlock)
slabBlock.textures = arr
}
if(baseBlock.name === "jungleLeaves"){
makeBlock(new Array(6).fill("floweringJungleLeaves"), shapes.cube, slabBlock, null, "Flowering Jungle Leaves")
slabBlock.transparent = true
}
if(baseBlock.fire){
baseBlock.shape = shapes.fire
slabBlock.shape = shapes.sideFire
stairBlock.shape = shapes.bottomFire
}
if(baseBlock.name === "endRod"){
baseBlock.shape = shapes.endRod
slabBlock.shape = shapes.endRodSW
}
if(baseBlock.fenceGate){
baseBlock.shape = shapes.fenceGate
baseBlock.transparent = true
slabBlock.shape = shapes.fenceGateWall
stairBlock.shape = shapes.fenceGateOpen
doorBlock.shape = shapes.fenceGateWallOpen
doorBlock.transparent = true
baseBlock.onclick = (function(x,y,z,dimension){
var b = world.getBlock(x,y,z,dimension)
var set
var id = this.id
let o = false
switch(b){
case id | CUBE | NORTH:
set = id | STAIR | NORTH
o = true
break
case id | CUBE | SOUTH:
set = id | STAIR | SOUTH
o = true
break
case id | CUBE | EAST:
set = id | STAIR | EAST
o = true
break
case id | CUBE | WEST:
set = id | STAIR | WEST
o = true
break
case id | SLAB | NORTH:
set = id | DOOR | NORTH
o = true
break
case id | SLAB | SOUTH:
set = id | DOOR | SOUTH
o = true
break
case id | SLAB | EAST:
set = id | DOOR | EAST
o = true
break
case id | SLAB | WEST:
set = id | DOOR | WEST
o = true
break
case id | STAIR | NORTH:
set = id | CUBE | NORTH
break
case id | STAIR | SOUTH:
set = id | CUBE | SOUTH
break
case id | STAIR | EAST:
set = id | CUBE | EAST
break
case id | STAIR | WEST:
set = id | CUBE | WEST
break
case id | DOOR | NORTH:
set = id | SLAB | NORTH
break
case id | DOOR | SOUTH:
set = id | SLAB | SOUTH
break
case id | DOOR | EAST:
set = id | SLAB | EAST
break
case id | DOOR | WEST:
set = id | SLAB | WEST
break
}
world.setBlock(x,y,z,set,false,false,false,false,dimension)
doorSound(x,y,z,"fence_gate",o,world)
}).bind({id:baseBlock.id})
}
if(baseBlock.barrel){
makeBlock(baseBlock.texturesSW, shapes.rotate, slabBlock, null, baseBlock.Name)
makeBlock(baseBlock.texturesDown, shapes.cube, stairBlock, null, baseBlock.Name)
makeBlock(baseBlock.texturesOpen, shapes.cube, crossBlock, null, baseBlock.Name)
makeBlock(baseBlock.texturesSWOpen, shapes.rotate, doorBlock, null, baseBlock.Name)
makeBlock(baseBlock.texturesDownOpen, shapes.cube, tallcrossBlock, null, baseBlock.Name)
}
if(baseBlock.chain){
slabBlock.shape = shapes.chainSW
slabBlock.textures = slabBlock.textures.slice()
slabBlock.textures[4] = slabBlock.textures[5] = "chainSW"
}
if(baseBlock.name === "beeNest" || baseBlock.name === "beehive"){
makeBlock(baseBlock.texturesHoney, shapes.rotate, slabBlock)
}
if(baseBlock.name === "sponge"){
makeBlock(baseBlock.wetTexture, shapes.cube, slabBlock)
}
if(baseBlock.campfire){
baseBlock.shape = shapes.campfire
slabBlock.shape = shapes.campfireUnlit
slabBlock.transparent = baseBlock.transparent
slabBlock.shadow = baseBlock.shadow
slabBlock.lightLevel = 0
slabBlock.damageUp = 0
}
if(baseBlock.bamboo){
baseBlock.shape = shapes.bamboo
makeBlock(baseBlock.textures, shapes.bambooSmallLeaf, slabBlock)
slabBlock.shadow = false
slabBlock.transparent = true
makeBlock(baseBlock.textures, shapes.bambooBigLeaf, stairBlock)
stairBlock.shadow = false
stairBlock.transparent = true
makeBlock(baseBlock.textures, shapes.bambooYoung, crossBlock)
crossBlock.shadow = false
crossBlock.transparent = true
makeBlock(baseBlock.textures, shapes.bambooYoungLeaf, tallcrossBlock)
tallcrossBlock.shadow = false
tallcrossBlock.transparent = true
potCrossBlock.shape = shapes.bambooPot
}
if(baseBlock.chest) baseBlock.shape = /*shapes.christmasChest//*/shapes.chest//christmas
if(baseBlock.pressurePlate){
baseBlock.shape = shapes.pressurePlate
baseBlock.transparent = true
baseBlock.shadow = false
baseBlock.solid = false
baseBlock.activate = pressurePlateActivate
baseBlock.onupdate = pressurePlateOnupdate
makeBlock(baseBlock.textures, shapes.pressurePlateActive, slabBlock, baseBlock)
}
if(baseBlock.name === "tomatoPlant"){
baseBlock.shape = shapes.cross
makeBlock(baseBlock.textures1, shapes.cross, slabBlock, baseBlock)
makeBlock(baseBlock.textures2, shapes.cross, stairBlock, baseBlock)
makeBlock(baseBlock.textures3, shapes.cross, crossBlock, baseBlock)
makeBlock(baseBlock.textures4, shapes.cross, tallcrossBlock, baseBlock)
crossBlock.drop = "tomato"
crossBlock.dropAmount = [4,8]
tallcrossBlock.drop = "tomato"
tallcrossBlock.dropAmount = [8,16]
}
if(baseBlock.name === "wheat"){
makeBlock(baseBlock.textures1, shapes.crop, slabBlock, baseBlock)
makeBlock(baseBlock.textures2, shapes.crop, stairBlock, baseBlock)
makeBlock(baseBlock.textures3, shapes.crop, crossBlock, baseBlock)
makeBlock(baseBlock.textures4, shapes.crop, tallcrossBlock, baseBlock)
makeBlock(baseBlock.textures5, shapes.crop, doorBlock, baseBlock)
makeBlock(baseBlock.textures6, shapes.crop, torchBlock, baseBlock)
makeBlock(baseBlock.textures7, shapes.crop, lanternBlock, baseBlock)
lanternBlock.drop = baseBlock.fullDrop
}
if(baseBlock.name === "redstoneDust"){
baseBlock.shape = shapes.redstoneDust
makeBlock(new Array(6).fill("redstoneDustLine"), shapes.redstoneDustRotate, slabBlock, baseBlock)
makeBlock(new Array(6).fill("redstoneDustL"), shapes.redstoneDustRotate, stairBlock, baseBlock)
makeBlock(new Array(6).fill("redstoneDustT"), shapes.redstoneDustRotate, doorBlock, baseBlock)
makeBlock(new Array(6).fill("redstoneDust+"), shapes.redstoneDust, paneBlock, baseBlock)
let flip = Object.create(baseBlock)
makeBlock(new Array(6).fill("redstoneDustDot"), shapes.redstoneDust, flip, baseBlock)
flip.tint = flip.blueTint
blockData[i | FLIP] = flip
flip = Object.create(baseBlock)
makeBlock(new Array(6).fill("redstoneDustLine"), shapes.redstoneDustRotate, flip, baseBlock)
flip.tint = flip.blueTint
blockData[i | SLAB | FLIP] = flip
let v = flip.shape.varients
for (let j = 0; j < v.length; j++) {
if (v[j]) {
let block = Object.create(flip)
block.shape = v[j]
blockData[i | SLAB | FLIP |v[j].bit] = block
}
}
flip = Object.create(baseBlock)
makeBlock(new Array(6).fill("redstoneDustL"), shapes.redstoneDustRotate, flip, baseBlock)
flip.tint = flip.blueTint
blockData[i | STAIR | FLIP] = flip
v = flip.shape.varients
for (let j = 0; j < v.length; j++) {
if (v[j]) {
let block = Object.create(flip)
block.shape = v[j]
blockData[i | STAIR | FLIP |v[j].bit] = block
}
}
flip = Object.create(baseBlock)
makeBlock(new Array(6).fill("redstoneDustT"), shapes.redstoneDustRotate, flip, baseBlock)
flip.tint = flip.blueTint
blockData[i | DOOR | FLIP] = flip
v = flip.shape.varients
for (let j = 0; j < v.length; j++) {
if (v[j]) {
let block = Object.create(flip)
block.shape = v[j]
blockData[i | DOOR | FLIP |v[j].bit] = block
}
}
flip = Object.create(baseBlock)
makeBlock(new Array(6).fill("redstoneDust+"), shapes.redstoneDust, flip, baseBlock)
flip.tint = flip.blueTint
blockData[i | PANE | FLIP] = flip
}
if(baseBlock.redstoneTorch){
baseBlock.shape = shapes.redstoneTorch
makeBlock(baseBlock.textures, shapes.redstoneWallTorch, slabBlock, baseBlock)
makeBlock(baseBlock.textures, shapes.torch, crossBlock, baseBlock)
crossBlock.lightLevel = 0
crossBlock.textures = new Array(6).fill("redstoneTorchOff")
makeBlock(baseBlock.textures, shapes.wallTorch, stairBlock, baseBlock)
stairBlock.lightLevel = 0
stairBlock.textures = crossBlock.textures
}
if(baseBlock.lever){
baseBlock.shape = shapes.leverWall
makeBlock(baseBlock.textures, shapes.leverWallOn, slabBlock, baseBlock)
makeBlock(baseBlock.textures, shapes.leverFloor, stairBlock, baseBlock)
makeBlock(baseBlock.textures, shapes.leverFloorOn, crossBlock, baseBlock)
makeBlock(baseBlock.textures, shapes.leverCeil, tallcrossBlock, baseBlock)
makeBlock(baseBlock.textures, shapes.leverCeilOn, doorBlock, baseBlock)
}
if(baseBlock.button){
makeBlock(baseBlock.textures, shapes.buttonPushed, slabBlock, baseBlock)
baseBlock.onclick = buttonOnclick.bind(baseBlock)
baseBlock.onupdate = buttonOnupdate.bind(baseBlock)
}
if(baseBlock.repeater){
baseBlock.shape = shapes.repeater1
makeBlock(baseBlock.textures, shapes.repeater2, slabBlock, baseBlock)
makeBlock(baseBlock.textures, shapes.repeater3, stairBlock, baseBlock)
makeBlock(baseBlock.textures, shapes.repeater4, doorBlock, baseBlock)
makeBlock(baseBlock.textures, shapes.repeaterOn1, paneBlock, baseBlock)
makeBlock(baseBlock.textures, shapes.repeaterOn2, portalBlock, baseBlock)
makeBlock(baseBlock.textures, shapes.repeaterOn3, wallFlatBlock, baseBlock)
makeBlock(baseBlock.textures, shapes.repeaterOn4, openTrapdoor, baseBlock)
}
if(baseBlock.piston){
var baseBlockTransparent = Object.create(baseBlock)
baseBlockTransparent.transparent = true
//not extended
var textures = baseBlock.textures.slice()
var t = textures[0]
textures[0] = textures[1]
textures[1] = t
var flipped = Object.create(baseBlock)
makeBlock(textures, shapes.flipped, flipped, baseBlock)
blockData[i | FLIP] = flipped
var shape = shapes.SW
t = baseBlock.textures
textures = [t[2],t[2],t[0],t[1],t[2],t[2]]
makeBlock(textures, shape, slabBlock, baseBlock)
//head
t = baseBlock.textures[1]
var t2 = baseBlock.headSideTexture
var t3 = baseBlock.headBackTexture
makeBlock([t3,t,t2,t2,t2,t2], shapes.pistonHead, stairBlock, baseBlockTransparent)
flipped = Object.create(baseBlock)
makeBlock([t,t3,t2,t2,t2,t2], shapes.pistonHeadFlipped, flipped, baseBlockTransparent)
blockData[i | STAIR | FLIP] = flipped
makeBlock([t2,t2,t3,t,t2,t2], shapes.pistonHeadSW, doorBlock, baseBlockTransparent)
//head cut
makeBlock(stairBlock.textures, shapes.pistonHeadCut, crossBlock, baseBlock)
flipped = Object.create(baseBlock)
makeBlock(blockData[i | STAIR | FLIP].textures, shapes.pistonHeadCutFlipped, flipped, baseBlock)
blockData[i | CROSS | FLIP] = flipped
makeBlock(doorBlock.textures, shapes.pistonHeadCutSW, paneBlock, baseBlock)
//open
var textures = baseBlock.textures.slice()
textures[1] = baseBlock.frontOpenTexture
makeBlock(textures, shapes.pistonOpen, tallcrossBlock, baseBlockTransparent)
textures = blockData[i | FLIP].textures.slice()
textures[0] = baseBlock.frontOpenTexture
flipped = Object.create(baseBlock)
makeBlock(textures, shapes.pistonOpenFlipped, flipped, baseBlockTransparent)
blockData[i | TALLCROSS | FLIP] = flipped
var textures = baseBlock.textures.slice()
var temp = textures[2] //side with piston head
textures[2] = textures[0]
textures[3] = baseBlock.frontOpenTexture
textures[0] = textures[1] = temp
makeBlock(textures, shapes.pistonOpenSW, portalBlock, baseBlockTransparent)
}
if(baseBlock.name === "tnt"){
makeBlock(fillTextureArray(baseBlock.superTntTextures), shapes.cube, slabBlock, baseBlock, "Super TNT")
makeBlock(fillTextureArray(baseBlock.ultraTntTextures), shapes.cube, stairBlock, baseBlock, "Ultra TNT")
makeBlock(new Array(6).fill("blank"), shapes.cube, crossBlock, baseBlock)
}
if(baseBlock.name === "observer"){
baseBlock.shape = shapes.rotate
var t = baseBlock.textures
var textures = [t[3],t[2],t[0],t[1],t[4]+"SW",t[5]+"SW"]
makeBlock(textures, shapes.cube, slabBlock, baseBlock)
var flipped = Object.create(baseBlock)
var textures = textures.slice()
var t = textures[1]
textures[1] = textures[0]
textures[0] = t
makeBlock(textures, shapes.flipped, flipped, baseBlock)
blockData[i | SLAB | FLIP] = flipped
//on
textures = baseBlock.textures.slice()
textures[2] += "On"
makeBlock(textures, shapes.rotate, stairBlock, baseBlock)
textures = slabBlock.textures.slice()
textures[1] += "On"
makeBlock(textures, shapes.cube, crossBlock, baseBlock)
var flipped = Object.create(baseBlock)
textures = blockData[i | SLAB | FLIP].textures.slice()
textures[0] += "On"
makeBlock(textures, shapes.flipped, flipped, baseBlock)
blockData[i | CROSS | FLIP] = flipped
}
if(baseBlock.name === "endPortal"){
baseBlock.shape = shapes.endPortal
}
if(baseBlock.pane){
var t = baseBlock.textures
makeBlock([t[2],t[3],t[0],t[1],t[0],t[1]], shapes.horizontalPane, slabBlock, baseBlock)
}
if(baseBlock.coloredRedstoneLamp){
makeBlock(new Array(6).fill(baseBlock.name), shapes.cube, slabBlock)
slabBlock.lightLevel = 15
}
if(baseBlock.name === "sweetBerryBush"){
baseBlock.shape = shapes.cross
makeBlock(baseBlock.textures1, shapes.cross, slabBlock, baseBlock)
slabBlock.spikyBush = true
makeBlock(baseBlock.textures2, shapes.cross, stairBlock, baseBlock)
stairBlock.spikyBush = true
stairBlock.dropAmount = [1,2]
makeBlock(baseBlock.textures3, shapes.cross, crossBlock, baseBlock)
crossBlock.spikyBush = true
crossBlock.dropAmount = [2,3]
}
if(baseBlock.logicGate){
var t = baseBlock.textures.slice()
t[1] += "On"
makeBlock(t, baseBlock.shape, slabBlock, baseBlock)
baseBlock.onupdate = logicGateOnupdate
baseBlock.onpowerupdate = logicGateOnpowerupdate
baseBlock.ondelete = logicGateOndelete
baseBlock.getFacing = logicGateGetFacing
baseBlock.canHavePower = logicGateCanHavePower
}
if(baseBlock.name === "pointedDripstone"){
makeBlock(new Array(6).fill("pointedDripstoneUpTip"), shapes.cross, baseBlock, baseBlock)
var flip = Object.create(baseBlock)
makeBlock(new Array(6).fill("pointedDripstoneDownTip"), shapes.cross, flip, baseBlock)
blockData[i | FLIP] = flip
makeBlock(new Array(6).fill("pointedDripstoneUpBase"), shapes.cross, slabBlock, baseBlock)
var flip = Object.create(baseBlock)
makeBlock(new Array(6).fill("pointedDripstoneDownBase"), shapes.cross, flip, baseBlock)
blockData[i | SLAB | FLIP] = flip
makeBlock(new Array(6).fill("pointedDripstoneUpMiddle"), shapes.cross, stairBlock, baseBlock)
var flip = Object.create(baseBlock)
makeBlock(new Array(6).fill("pointedDripstoneDownMiddle"), shapes.cross, flip, baseBlock)
blockData[i | STAIR | FLIP] = flip
makeBlock(new Array(6).fill("pointedDripstoneUpFrustum"), shapes.cross, crossBlock, baseBlock)
var flip = Object.create(baseBlock)
makeBlock(new Array(6).fill("pointedDripstoneDownFrustum"), shapes.cross, flip, baseBlock)
blockData[i | CROSS | FLIP] = flip
makeBlock(new Array(6).fill("pointedDripstoneUpTipMerge"), shapes.cross, tallcrossBlock, baseBlock)
var flip = Object.create(baseBlock)
makeBlock(new Array(6).fill("pointedDripstoneDownTipMerge"), shapes.cross, flip, baseBlock)
blockData[i | TALLCROSS | FLIP] = flip
}
if(baseBlock.sign){
slabBlock.shape = shapes.sign
slabBlock.textures = baseBlock.textures
slabBlock.drop = i
crossBlock.shape = shapes.wallSign
crossBlock.textures = baseBlock.textures
crossBlock.drop = i
baseBlock.shape = shapes.none
baseBlock.transparent = true
baseBlock.shadow = false
baseBlock.solid = false
baseBlock.onplace = signOnplace
baseBlock.tagBits = null
stairBlock.shape = shapes.none
}
if(baseBlock.name === "composter"){
baseBlock.shape = shapes.composter
makeBlock(baseBlock.textures, shapes.composter2, slabBlock, baseBlock)
makeBlock(baseBlock.textures, shapes.composter3, stairBlock, baseBlock)
makeBlock(baseBlock.textures, shapes.composter4, crossBlock, baseBlock)
makeBlock(baseBlock.textures, shapes.composter5, tallcrossBlock, baseBlock)
makeBlock(baseBlock.textures, shapes.composter6, doorBlock, baseBlock)
makeBlock(baseBlock.textures, shapes.composter7, torchBlock, baseBlock)
makeBlock(baseBlock.textures, shapes.composter8, lanternBlock, baseBlock)
}
if(baseBlock.name === "cocoa"){
baseBlock.shape = shapes.cocoaStage0
baseBlock.textures.fill("cocoaStage0")
makeBlock(new Array(6).fill("cocoaStage1"), shapes.cocoaStage1, slabBlock, baseBlock)
makeBlock(new Array(6).fill("cocoaStage2"), shapes.cocoaStage2, stairBlock, baseBlock)
stairBlock.dropAmount = [2,3]
}
if(baseBlock.name === "beetroots"){
makeBlock(baseBlock.textures1, shapes.crop, slabBlock, baseBlock)
makeBlock(baseBlock.textures2, shapes.crop, stairBlock, baseBlock)
makeBlock(baseBlock.textures3, shapes.crop, crossBlock, baseBlock)
crossBlock.drop = ["beetrootSeeds","beetroot"]
crossBlock.dropAmount = [1,4]
}
if(baseBlock.name === "potatoes"){
makeBlock(baseBlock.textures1, shapes.crop, slabBlock, baseBlock)
makeBlock(baseBlock.textures2, shapes.crop, stairBlock, baseBlock)
makeBlock(baseBlock.textures3, shapes.crop, crossBlock, baseBlock)
crossBlock.dropAmount = [1,5]
}
if(baseBlock.name === "carrots"){
makeBlock(baseBlock.textures1, shapes.crop, slabBlock, baseBlock)
makeBlock(baseBlock.textures2, shapes.crop, stairBlock, baseBlock)
makeBlock(baseBlock.textures3, shapes.crop, crossBlock, baseBlock)
crossBlock.dropAmount = [2,5]
}
if(baseBlock.name === "dropper" || baseBlock.name === "dispenser"){
baseBlock.shape = shapes.rotate
makeBlock(baseBlock.upTextures, shapes.cube, slabBlock)
makeBlock(baseBlock.downTextures, shapes.cube, stairBlock)
}
if(baseBlock.name === "hopper"){
baseBlock.shape = shapes.hopper
makeBlock(baseBlock.textures, shapes.hopperWall, slabBlock, baseBlock)
}
if(baseBlock.name === "comparator"){
baseBlock.shape = shapes.comparator
makeBlock(baseBlock.textures, shapes.comparatorOn, slabBlock, baseBlock)
makeBlock(baseBlock.textures, shapes.comparatorSubtract, stairBlock, baseBlock)
makeBlock(baseBlock.textures, shapes.comparatorSubtractOn, doorBlock, baseBlock)
}
if(baseBlock.name === "daylightDetector"){
baseBlock.shape = shapes.daylightDetector
makeBlock(baseBlock.invertedTextures, shapes.daylightDetector, slabBlock, baseBlock)
}
if(baseBlock.commandBlock){
let flip = Object.create(baseBlock)
makeBlock(baseBlock.errorTextures, shapes.cube, flip, baseBlock)
blockData[i | FLIP] = flip
makeBlock(baseBlock.sideTextures, shapes.rotateSW, slabBlock, baseBlock)
flip = Object.create(baseBlock)
makeBlock(baseBlock.sideErrorTextures, shapes.rotateSW, flip, baseBlock)
blockData[i | SLAB | FLIP] = flip
let v = flip.shape.varients
for (let j = 0; j < v.length; j++) {
if (v[j]) {
let block = Object.create(flip)
block.shape = v[j]
if(v[j].rotated) block.textures = rotTex(flip.textures, v[j].rotateTimes) //rotate textures around
blockData[i | SLAB | FLIP |v[j].bit] = block
}
}
makeBlock(baseBlock.flipTextures, shapes.flipped, stairBlock, baseBlock)
flip = Object.create(baseBlock)
makeBlock(baseBlock.flipErrorTextures, shapes.flipped, flip, baseBlock)
blockData[i | STAIR | FLIP] = flip
}
if(baseBlock.name === "sugarCane"){
baseBlock.shape = shapes.cross
makeBlock(baseBlock.textures, shapes.cross, slabBlock, baseBlock)
slabBlock.tint = baseBlock.purpleTint
}
if(baseBlock.name === "bow"){
baseBlock.shape = shapes.item
baseBlock.textures = new Array(6).fill(baseBlock.pullTextures[0])
makeBlock(new Array(6).fill(baseBlock.pullTextures[1]), shapes.item, slabBlock)
makeBlock(new Array(6).fill(baseBlock.pullTextures[2]), shapes.item, stairBlock)
makeBlock(new Array(6).fill(baseBlock.pullTextures[3]), shapes.item, crossBlock)
}
if(baseBlock.beacon){
baseBlock.shape = shapes.beacon
}
if(baseBlock.name === "pitcherCrop"){
baseBlock.shape = shapes.pitcherCropStage0
makeBlock(baseBlock.textures1, shapes.pitcherCropStage1, slabBlock, baseBlock)
makeBlock(baseBlock.textures2, shapes.pitcherCropStage1, stairBlock, baseBlock)
makeBlock(baseBlock.textures3, shapes.pitcherCropStage3, crossBlock, baseBlock)
makeBlock(baseBlock.textures4, shapes.pitcherCropStage3, tallcrossBlock, baseBlock)
}
if(baseBlock.name === "torchflower"){
makeBlock(baseBlock.textures1, shapes.cross, slabBlock, baseBlock)
makeBlock(baseBlock.textures2, shapes.cross, stairBlock, baseBlock)
crossBlock.drop = "torchflower"
}
if(baseBlock.driedLeaves){
baseBlock.shape = shapes.flat
if(baseBlock.textures1) makeBlock(new Array(6).fill(baseBlock.textures1), shapes.flat, slabBlock, baseBlock, "Thick "+baseBlock.Name)
}
blockData[i | SLAB] = slabBlock
blockData[i | STAIR] = stairBlock
blockData[i | CROSS] = crossBlock
blockData[i | TALLCROSS] = tallcrossBlock
blockData[i | DOOR] = doorBlock
blockData[i | TORCH] = torchBlock
blockData[i | LANTERN] = lanternBlock
blockData[i | LANTERNHANG] = lanternHangBlock
if(baseBlock.beacon) blockData[i | BEACON] = beaconBlock
if(baseBlock.cactus) blockData[i | CACTUS] = cactusBlock
blockData[i | PANE] = paneBlock
blockData[i | PORTAL] = portalBlock
blockData[i | WALLFLAT] = wallFlatBlock
blockData[i | TRAPDOOR] = trapdoorBlock
blockData[i | TRAPDOOROPEN] = openTrapdoor
blockData[i | FENCE] = fenceBlock
blockData[i | WALLPOST] = wallPostBlock
if(baseBlock.button) blockData[i | BUTTON] = buttonBlock
if(baseBlock.chain) blockData[i | CHAIN] = chainBlock
if(baseBlock.pot) blockData[i | POT] = potBlock
blockData[i | POTCROSS] = potCrossBlock
if(baseBlock.carpet) blockData[i | CARPET] = carpetBlock
blockData[i | CORNERSTAIRIN] = cornerStairInBlock
blockData[i | CORNERSTAIROUT] = cornerStairOutBlock
blockData[i | VERTICALSLAB] = verticalSlabBlock
let v
if(baseBlock.shape.rotate || baseBlock.shape.flip){
let t = baseBlock.textures
v = baseBlock.shape.varients
for (let j = 0; j < v.length; j++) {
if (v[j]) {
let block = Object.create(baseBlock)
block.shape = v[j]
if(v[j].rotated) block.textures = rotTex(t, v[j].rotateTimes) //rotate textures around
blockData[i | v[j].bit] = block
}
}
}
v = slabBlock.shape.varients
for (let j = 0; j < v.length; j++) {
let t = slabBlock.textures
if (v[j]) {
let block = Object.create(slabBlock)
block.shape = v[j]
if(v[j].rotated) block.textures = rotTex(t, v[j].rotateTimes) //rotate textures around
blockData[i | SLAB | v[j].bit] = block
}
}
v = stairBlock.shape.varients
for (let j = 0; j < v.length; j++) {
let t = stairBlock.textures
if (v[j]) {
let block = Object.create(stairBlock)
block.shape = v[j]
if(v[j].rotated) block.textures = rotTex(t, v[j].rotateTimes) //rotate textures around
blockData[i | STAIR | v[j].bit] = block
}
}
v = doorBlock.shape.varients
for (let j = 0; j < v.length; j++) {
let t = doorBlock.textures
if (v[j]) {
let block = Object.create(doorBlock)
block.shape = v[j]
if(v[j].rotated) block.textures = rotTex(t, v[j].rotateTimes) //rotate textures around
blockData[i | DOOR | v[j].bit] = block
}
}
v = paneBlock.shape.varients
for (let j = 0; j < v.length; j++) {
let t = paneBlock.textures
if (v[j]) {
let block = Object.create(paneBlock)
block.shape = v[j]
if(v[j].rotated) block.textures = rotTex(t, v[j].rotateTimes) //rotate textures around
blockData[i | PANE | v[j].bit] = block
}
}
v = portalBlock.shape.varients
for (let j = 0; j < v.length; j++) {
let t = portalBlock.textures
if (v[j]) {
let block = Object.create(portalBlock)
block.shape = v[j]
if(v[j].rotated) block.textures = rotTex(t, v[j].rotateTimes)
blockData[i | PORTAL | v[j].bit] = block
}
}
v = wallFlatBlock.shape.varients
for (let j = 0; j < v.length; j++) {
if (v[j]) {
let block = Object.create(wallFlatBlock)
block.shape = v[j]
blockData[i | WALLFLAT | v[j].bit] = block
}
}
v = trapdoorBlock.shape.varients
for (let j = 0; j < v.length; j++) {
if (v[j]) {
let block = Object.create(trapdoorBlock)
block.shape = v[j]
blockData[i | TRAPDOOR | v[j].bit] = block
}
}
v = openTrapdoor.shape.varients
for (let j = 0; j < v.length; j++) {
if (v[j]) {
let block = Object.create(openTrapdoor)
block.shape = v[j]
blockData[i | TRAPDOOROPEN | v[j].bit] = block
}
}
v = buttonBlock.shape.varients
for (let j = 0; j < v.length; j++) {
if (v[j] && blockData[i].button) {
let block = Object.create(buttonBlock)
block.shape = v[j]
blockData[i | BUTTON | v[j].bit] = block
}
}
v = cornerStairInBlock.shape.varients
for (let j = 0; j < v.length; j++) {
if (v[j]) {
let block = Object.create(cornerStairInBlock)
block.shape = v[j]
blockData[i | CORNERSTAIRIN | v[j].bit] = block
}
}
v = cornerStairOutBlock.shape.varients
for (let j = 0; j < v.length; j++) {
if (v[j]) {
let block = Object.create(cornerStairOutBlock)
block.shape = v[j]
blockData[i | CORNERSTAIROUT | v[j].bit] = block
}
}
v = verticalSlabBlock.shape.varients
for (let j = 0; j < v.length; j++) {
if (v[j]) {
let block = Object.create(verticalSlabBlock)
block.shape = v[j]
blockData[i | VERTICALSLAB | v[j].bit] = block
}
}
}
}
let CUBE,SLAB,STAIR,CROSS,TALLCROSS,DOOR,TORCH,LANTERN,LANTERNHANG,BEACON,
CACTUS,PANE,PORTAL,WALLFLAT,TRAPDOOR,TRAPDOOROPEN,FENCE,WALLPOST,
BUTTON,CHAIN,POT,POTCROSS,CARPET,CORNERSTAIRIN,CORNERSTAIROUT,VERTICALSLAB,
//if you change this, change debugStick and server side
LAYER1,LAYER2,LAYER3,LAYER4,LAYER5,LAYER6,LAYER7,LAYER8,
FLIP,NORTH,SOUTH,EAST,WEST,ROTATION// Mask for the direction bits
let isCube
let prevConstVersion = null
function verMoreThan(a,b){
a = a.split(".").map(r => parseInt(r))
b = b.split(".").map(r => parseInt(r))
if(a[0] > b[0]) return true
if(a[1] > b[1] && a[0] === b[0]) return true
if(a[2] > b[2] && a[1] === b[1]) return true
}
function bin(n){
return parseInt(n,2)
}
function constVersion(v){
if(v === prevConstVersion) return
prevConstVersion = v
isCube = 0xff
let verNum = v.replace(/(Alpha|Beta) /, '')//.replace(/(?<=\..*)\./g, '') //second regex removes the periods after the first
if(verMoreThan(verNum, "1.0.3") || verNum==="1.0.3"){
CUBE = 0
LAYER2=SLAB =          bin("10000000000000") // 9th bit
LAYER3=STAIR =        bin("100000000000000") // 10th bit
LAYER4=CROSS =        bin("110000000000000")
LAYER5=TALLCROSS =bin("1001110000000000000")
LAYER6=LANTERN =    bin("10010000000000000")
LAYER7=LANTERNHANG=bin("100010000000000000")
BEACON =           bin("100110000000000000")
CACTUS =           bin("101000000000000000")
POT =              bin("101010000000000000")
POTCROSS =         bin("101110000000000000")
LAYER1 = TORCH =   bin("110000000000000000")
CHAIN =            bin("110010000000000000")
LAYER8 = DOOR =   bin("1000010000000000000")
PORTAL =          bin("1000100000000000000")
WALLFLAT =        bin("1000110000000000000")
PANE =           bin("10001000000000000000")
TRAPDOOR =        bin("1010000000000000000")
TRAPDOOROPEN =   bin("10000000000000000000")
FENCE =          bin("11000000000000000000")
WALLPOST =       bin("11000100000000000000")
//WALL = 0x6400<<5
//WALLU = 0x6600<<5 //wall withe exteion under another wall
//FENCQ = 0x4100<<5 //fence (one extension)
BUTTON =         bin("10000100000000000000")
CARPET    =      bin("10000110000000000000")
CORNERSTAIRIN =      bin("1000000000000000")
CORNERSTAIROUT =     bin("1010000000000000")
VERTICALSLAB =       bin("1100000000000000")
FLIP      =               bin("10000000000") // 11th bit
NORTH = 0 // 12th and 13th bits for the 4 directions
SOUTH =                  bin("100000000000")
EAST =                  bin("1000000000000")
WEST =                  bin("1100000000000")
ROTATION =              bin("1100000000000") // Mask for the direction bits
isCube =                  bin("11111111111") // Mask for block id bits
}else if(verMoreThan(verNum, "1.0.0") || verNum === "1.0.0"){
CUBE = 0
LAYER2 = SLAB = 0x100 // 9th bit
LAYER3 = STAIR = 0x200 // 10th bit
LAYER4 = CROSS = 0x300
FLIP = 0x400 // 11th bit
LAYER5 = TALLCROSS = 0x700
LAYER6 = LANTERN = 0x900
LAYER7 = LANTERNHANG=0x1100
BEACON = 0x1300
CACTUS = 0x1400
POT = 0x1500
POTCROSS = 0x1700
LAYER1 = TORCH = 0x1800
CHAIN = 0x1900
LAYER8 = DOOR = 0x2100
PORTAL = 0x2200
WALLFLAT = 0x2300
PANE = 0x4400
TRAPDOOR = 0x2800
TRAPDOOROPEN=0x4000
FENCE = 0x6000
WALLPOST = 0x6200
//WALL = 0x6400
//WALLU = 0x6600 //wall withe exteion under another wall
//FENCQ = 0x4100 //fence (one extension)
BUTTON = 0x4200
CARPET    = 0x4300
FLIP      = 0x400 // 11th bit
NORTH = 0 // 12th and 13th bits for the 4 directions
SOUTH = 0x800
EAST = 0x1000
WEST = 0x1800
ROTATION = 0x1800 // Mask for the direction bits
}else{
CUBE      = 0
LAYER2 = SLAB      = 0x100 // 9th bit
LAYER3 = STAIR     = 0x200 // 10th bit
LAYER4 = CROSS     = 0x2000
LAYER5 = TALLCROSS = 0x2200
LAYER8 = DOOR      = 0x2400
LAYER1 = TORCH     = 0x2600
LAYER6 = LANTERN   = 0x2800
LAYER7 = LANTERNHANG=0x3000
BEACON    = 0x4200
CACTUS    = 0x4400
PANE      = 0x4600
PORTAL    = 0x5000
WALLFLAT  = 0x4800
TRAPDOOR  = 0x5200
TRAPDOOROPEN=0x5400
FENCE     = 0x6000
WALLPOST  = 0x6200
//WALL      = 0x6400
//WALLU     = 0x6600 //wall withe exteion under another wall
//FENCQ     = 0x6800 //fence (one extension)
BUTTON    = 0x7000
CHAIN     = 0x7200
POT       = 0x8000
POTCROSS  = 0x8200
CARPET    = 0x8400
FLIP      = 0x400 // 11th bit
NORTH     = 0 // 12th and 13th bits for the 4 directions
SOUTH     = 0x800
EAST      = 0x1000
WEST      = 0x1800
ROTATION  = 0x1800 // Mask for the direction bits
}
}
{//Commands
let copiedBlocks
function fillBlocks(x,y,z,x2,y2,z2, blockID, dimension,world){
if(x>x2){var px=x; x=x2; x2=px}
if(y>y2){var py=y; y=y2; y2=py}
if(z>z2){var pz=z; z=z2; z2=pz}
for(var X=x; x2>=X; X++){
for(var Y=y; y2>=Y; Y++){
for(var Z=z; z2>=Z; Z++){
world.setBlock(X,Y,Z,blockID, false,false,false,false,dimension)
}
}
}
}
function copy(x,y,z,x2,y2,z2, dimension,world){
if(x>x2){var px=x; x=x2; x2=px}
if(y>y2){var py=y; y=y2; y2=py}
if(z>z2){var pz=z; z=z2; z2=pz}
copiedBlocks = [];
for(var X=x; x2>=X; X++){
var xRow = [];
for(var Y=y; y2>=Y; Y++){
var yRow = []
for(var Z=z; z2>=Z; Z++){
yRow.push(world.getBlock(X,Y,Z,dimension), world.getTags(X,Y,Z,dimension));
}
xRow.push(yRow);
}
copiedBlocks.push(xRow);
}
}
function paste(x,y,z,dimension,world){
for(var X = 0; X<copiedBlocks.length; X++){
var xRow = copiedBlocks[X];
for(var Y=0; Y<xRow.length; Y++){
var yRow = xRow[Y];
for(var Z=0; Z<yRow.length/2; Z++){
var block = yRow[Z*2]
world.setBlock(X+x,Y+y,Z+z,block,false,false,false,false,dimension)
var tags = yRow[z*2+1]
if(tags) world.setTags(X+x,Y+y,Z+z, tags,false, dimension)
}
}
}
}
function replaceBlocks(x,y,z,x2,y2,z2, replace, into, dimension,world){
if(x>x2){var px=x; x=x2; x2=px}
if(y>y2){var py=y; y=y2; y2=py}
if(z>z2){var pz=z; z=z2; z2=pz}
for(var X=x; x2>=X; X++){
for(var Y=y; y2>=Y; Y++){
for(var Z=z; z2>=Z; Z++){
if(world.getBlock(X,Y,Z,dimension) === replace){
world.setBlock(X,Y,Z,into, false,false,false,false,dimension)
}
}
}
}
}
function fromPlayer(p,world){
p.prevPosCmd = [round(p.x), round(p.y), round(p.z)]
}
function fillToPlayer(id,p,world){
//fills at player feet
fillBlocks(p.prevPosCmd[0], p.prevPosCmd[1]-1, p.prevPosCmd[2], round(p.x), round(p.y-1), round(p.z), id, p.dimension,world)
}
function copyToPlayer(p,world){
copiedBlocks = p.copiedBlocksCmd
copy(p.prevPosCmd[0], p.prevPosCmd[1]-1, p.prevPosCmd[2], round(p.x), round(p.y-1), round(p.z), p.dimension,world);
}
function pasteAtPlayer(p,world){
copiedBlocks = p.copiedBlocksCmd
paste(round(p.x), round(p.y-1), round(p.z), p.dimension,world)
}
let cancelShape = 0
async function hcyl(width, height, depth, id, X,Y,Z, dimension,world) {
let cid = cancelShape
let w2 = width * width
let d2 = depth * depth
let w3 = (width - 1.2) * (width - 1.2)
let d3 = (depth - 1.2) * (depth - 1.2)
for (let x = floor(-width); x <= ceil(width); x++) {
for (let y = floor(-height); y <= ceil(height); y++) {
for (let z = floor(-depth); z <= ceil(depth); z++) {
let n = x * x / w2 + z * z / d2
let n2 = x * x / w3 + z * z / d3
if (n < 1 && n2 >= 1) {
world.setBlock(round(X + x), round(Y + y), round(Z + z), id, false,false,false,false, dimension)
await sleep(10)
if(cancelShape > cid) return
}
}
}
}
}
async function cyl(width, height, depth, id, X,Y,Z, dimension,world) {
let cid = cancelShape
let w2 = width * width
let d2 = depth * depth
for (let x = floor(-width); x <= ceil(width); x++) {
for (let y = floor(-height); y <= ceil(height); y++) {
for (let z = floor(-depth); z <= ceil(depth); z++) {
let n = x * x / w2 + z * z / d2
if (n < 1) {
world.setBlock(round(X + x), round(Y + y), round(Z + z), id, false,false,false,false, dimension)
await sleep(10)
if(cancelShape > cid) return
}
}
}
}
}
async function sphereoid(w, h, d, id, X,Y,Z, dimension,world) {
let cid = cancelShape
let w2 = w * w
let h2 = h * h
let d2 = d * d
let w3 = (w - 1.5) * (w - 1.5)
let h3 = (h - 1.5) * (h - 1.5)
let d3 = (d - 1.5) * (d - 1.5)
for (let y = floor(-h); y <= ceil(h); y++) {
for (let x = floor(-w); x <= ceil(w); x++) {
for (let z = floor(-d); z <= ceil(d); z++) {
let n = x * x / w2 + y * y / h2 + z * z / d2
let n2 = x * x / w3 + y * y / h3 + z * z / d3
if (n < 1 && n2 >= 1) {
world.setBlock(round(X + x), round(Y + y), round(Z + z), id, false,false,false,false, dimension)
await sleep(10)
if(cancelShape > cid) return
}
}
}
}
}
async function ball(w, h, d, id, X,Y,Z, dimension,world) {
let cid = cancelShape
let w2 = w * w
let h2 = h * h
let d2 = d * d
for (let y = floor(-h); y <= ceil(h); y++) {
for (let x = floor(-w); x <= ceil(w); x++) {
for (let z = floor(-d); z <= ceil(d); z++) {
let n = x * x / w2 + y * y / h2 + z * z / d2
if (n < 1) {
world.setBlock(round(X + x), round(Y + y), round(Z + z), id, false,false,false,false, dimension)
await sleep(10)
if(cancelShape > cid) return
}
}
}
}
}
function parsePosition(x,px,int=false){
let ret
if(x.startsWith('~+')){
ret = px+parseFloat(x.split("+")[1])
}else if(x.startsWith('~-')){
ret = px-parseFloat(x.split("-")[1])
}else{
ret = x.startsWith('~')?px:parseFloat(x)
}
if(int) ret = round(ret)
return ret
}
function parseTarget(str,pos,world){
if(str === "@s"){
return [pos]
}else if(str === "@a"){
let a = world.players.slice()
return a
}else if(str === "@e"){
return world.entities.slice()
}else if(str === "@p"){
let closest = Infinity, cp = undefined
for(let P of world.players){
let d = dist3(pos.x,pos.y,pos.z,P.x,P.y,P.z)
if(d < closest){
closest = d
cp = P
}
}
return [cp]
}else{
return getPlayerByUsername(str,world)
}
}
let defaultServerCommands = [
{
name: "fromPlayer",
info: "Sets starting position to player position",
func: (args,pos,scope,world) => fromPlayer(pos,world),
anonymousFunc: null
},
{
name: "fillToPlayer",
args: ["block_name"],
argValues:{block_name:"type:block"},
info: "Fills from starting position to player position",
func: (args,pos,scope,world) => {
let id = blockIds[args.block_name]
if(!args.block_name) id = 0
fillToPlayer(id,pos,world)
},
anonymousFunc: null
},
{
name: "copyToPlayer",
info: "Copys blocks from starting position to player position",
func: (args,pos,scope,world) => copyToPlayer(pos,world),
anonymousFunc: null
},
{
name: "pasteAtPlayer",
info: "Pastes copied blocks at the player's position",
func: (args,pos,scope,world) => pasteAtPlayer(pos,world),
anonymousFunc: null
},
{
name: "shape",
info: "Type can be: sphere, hollowSphere, cylinder, hollowCylinder",
args: ["type","width", "height", "depth", "block_name", "x", "y", "z"],
argValues: {block_name:"type:block",x:"type:x",y:"type:y",z:"type:z",type:["sphere","hollowSphere","cylinder","hollowCylinder"],width:"type:number",height:"type:number",depth:"type:number"},
func: (args,pos,scope,world) => {
let id = blockIds[args.block_name]
if(!args.block_name) id = 0
let x = args.x ? parseFloat(args.x) : pos.x,
y = args.y ? parseFloat(args.y) : pos.y,
z = args.z ? parseFloat(args.z) : pos.z,
width = parseFloat(args.width) || 0,
height = parseFloat(args.height) || 0,
depth = parseFloat(args.depth) || 0
if(args.type === "sphere") return ball(width, height, depth, id, x,y,z, pos.dimension, world)
else if(args.type === "hollowSphere") return sphereoid(width, height, depth, id, x,y,z, pos.dimension, world)
else if(args.type === "cylinder") return cyl(width, height, depth, id, x,y,z, pos.dimension, world)
else if(args.type === "hollowCylinder") return hcyl(width, height, depth, id, x,y,z, pos.dimension, world)
else return ["No such shape: "+args.type,"error"]
}
},
{
name:"cancelShape",
info:"Stop generating shapes currently being generated.",
func: () => {
cancelShape++
}
},
{
name: "replaceToPlayer",
args: ["replace_what", "with_what"],
argValues:{replace_what:"type:block",with_what:"type:block"},
func: (args,pos,scope,world) => {
let replace = blockIds[args.replace_what]
if(!args.replace_what) replace = 0
let into = blockIds[args.with_what]
if(!args.with_what) into = 0
replaceBlocks(pos.prevPosCmd[0], pos.prevPosCmd[1]-1, pos.prevPosCmd[2], round(pos.x), round(pos.y-1), round(pos.z), replace, into, p.dimension, world)
},
anonymousFunc: null
},
{
name: "give",
args: ["target", "block_name", "amount"],
argValues:{block_name:"type:block",target:["type:player","@s","@a","@p"],amount:"type:number"},
info: "Gives the target the the specified amount of specified blocks",
func: (args,pos,scope,world) => {
let id = blockIds[args.block_name]
let amount = parseInt(args.amount) || 1
let arr = parseTarget(args.target,pos,world)
if(arr){
for(let i of arr){
world.addItems(i.x,i.y,i.z,i.dimension,0,0,0,id,false,amount)
}
}else return ["No such target: "+args.target,"error"]
}
},
{
name: "kill",
args: ["target","message"],
lastArgRaw:true,
argValues:{target:["type:player","@s","@a","@e","@p"]},
info: "Kills someone. Target can be: @s, your username, someone's uername, @a, @e",
func: (args,pos,scope,world) => {
if(worldSettings.killCmdOff) return ["Kill command is disabled on this world.","error"]
args.target = args.target || "@s"
let arr = parseTarget(args.target,pos,world)
if(arr){
for(let i of arr){
if(i.type === "Player"){
world.sendPlayer({type:"kill", data:args.message || pos.username+" killed "+(args.target === "@a" ? "everyone" : args.target)+" with the kill command."},i.id)
}else{
world.deleteEntity(i.id)
}
}
}else return ["No such target: "+args.target,"error"]
}
},
{
name: "time",
args: ["mode","n"],
argValues:{mode:["set","add","subtract"],n:["day","night","type:number"]},
info: "mode can be: set, add, subtract. n is the time to set to. 1000 is a day. n an also be: day, night",
func: (args,pos,scope,world) => {
let time
if(args.n === "day") time = 500
else if(args.n === "night") time = 0
else time = parseInt(args.n) || 0
if(args.mode === "set"){
world.time = time
}else if(args.mode === "add"){
world.time += time
}else if(args.mode === "subtract"){
world.time -= time
}else{
return ["No such mode: "+args.mode,"error"]
}
}
},
{
name: "weather",
args: ["w"],
argValues:{w:["clear","rain","snow"]},
info: "w is the weather to set to. It can be clear, rain, or snow",
func: (args,pos,scope,world) => {
if(args.w === "rain") world.weather = "rain"
else if(args.w === "snow") world.weather = "snow"
else world.weather = ""
}
},
{
name:"teleportToPlayer",
names:["tpPlayer","tpp"],
args: ["to_who"],
argValues:{to_who:"type:player"},
info: "Teleport to someone. \"to_who\" should be a username.",
func: (args,pos,scope,world) => {
let p = getPlayerByUsername(args.to_who,world)
if(p){
world.sendPlayer({type:"tp",x:p.x,y:p.y,z:p.z,dimension:p.dimension},pos.id)
}else{
return ["Player doesn't exsist: "+args.to_who,"error"]
}
},
anonymousFunc: null
},
//Trexler made this command
{
name: "teleport",
names:["tp"],
args: ["x","y","z","dimension"],
argValues:{x:"type:x",y:"type:y",z:"type:z",dimension:"type:dimension"},
info: "x, y, and z are the coordinates to teleport to. dimension is optional.",
func: (args,pos,scope,world) => {
if(!args.x || !args.y || !args.z) return ["You need to set the coordinates.","error"]
let px = pos.x, py = pos.y, pz = pos.z
let x = parsePosition(args.x,px)
let y = parsePosition(args.y,py)
let z = parsePosition(args.z,pz)
if(isNaN(x)) x = px
if(isNaN(y)) y = py
if(isNaN(z)) z = pz
world.sendPlayer({type:"tp",x,y,z,dimension:args.dimension},pos.id)
},
anonymousFunc: null
},
{
name:"playSound",
args:["sound", "volume", "pitch"],
argValues:{sound:"type:sound",volume:"type:number",pitch:"type:number"},
info:"Plays a sound. Sound can be any sound, for example: click, block.grass.dig1, entity.generic.explode1. Volume is a number from 0 to 1.",
func: (args,pos,scope,world) => {
if(!args.sound) return ["The first argument (sound) is required.","error"]
let volume = parseFloat(args.volume)
let pitch = parseFloat(args.pitch)
world.playSound(null,null,null,args.sound, volume, pitch)
//return ["That sound doesn't exist.","error"]
}
},
{
name:"title",
args:['text','subtext','color','fadeIn','fadeOut','stay'],
argValues:{fadeIn:"type:number",fadeOut:"type:number",stay:"type:number"},
info:"Shows text on screen. fadeIn and fadeOut and stay are miliseconds.",
func: (args,pos,scope,world) => {
args.text = args.text || "/title"
args.fadeIn = (args.fadeIn || args.fadeIn === 0) ? parseFloat(args.fadeIn) : 500
args.fadeOut = (args.fadeOut || args.fadeOut === 0) ? parseFloat(args.fadeOut) : 2000
args.stay = (args.stay || args.stay === 0) ? parseFloat(args.stay) : 1000
world.sendAll({type:"title",data:args.text,sub:args.subtext,color:args.color,fadeIn:args.fadeIn,fadeOut:args.fadeOut,stay:args.stay})
}
},
{
name:"setBlock",
args:["x","y","z","dimension","block"],
argValues:{block:"type:block",x:"type:x",y:"type:y",z:"type:z",dimension:"type:dimension"},
info:"Sets a block at a specified position.",
func: (args,pos,scope,world) => {
let block = blockIds[args.block]
if(block === undefined) block = parseInt(args.block)
if(!blockData[block]) return ["No such block "+block,"error"]
let x = parsePosition(args.x,pos.x,true),
y = parsePosition(args.y,pos.y,true),
z = parsePosition(args.z,pos.z,true),
dimension = args.dimension || ""
world.setBlock(x,y,z,block,false,false,false,false,dimension)
}
},
{
name:"getBlock",
args:["x","y","z","dimension"],
argValues:{x:"type:x",y:"type:y",z:"type:z",dimension:"type:dimension"},
info:"Gets a block at the specified position and sets a variable called block_name.",
func: (args,pos,scope,world) => {
let x = parsePosition(args.x,pos.x,true),
y = parsePosition(args.y,pos.y,true),
z = parsePosition(args.z,pos.z,true),
dimension = args.dimension || ""
scope.block_name = blockData[world.getBlock(x,y,z,dimension)].name
}
},
{
name:"setTag",
args:["x","y","z","dimension","tag_name","tag_data"],
argValues:{x:"type:x",y:"type:y",z:"type:z",dimension:"type:dimension"},
info:"Sets a specified tag at a specified position. tag_name can be JSON or raw text.",
func: (args,pos,scope,world) => {
let data
try{
data = JSON.parse(args.tag_data)
}catch{
data = args.tag_data
}
let x = parsePosition(args.x,pos.x,true),
y = parsePosition(args.y,pos.y,true),
z = parsePosition(args.z,pos.z,true),
dimension = args.dimension || ""
try{
world.setTagByName(x,y,z,args.tag_name,args.tag_data, false,dimension)
}catch(e){
return [e.message,"error"]
}
}
},
{
name:"getTag",
args:["x","y","z","dimension","tag_name"],
argValues:{x:"type:x",y:"type:y",z:"type:z",dimension:"type:dimension"},
info:"Gets a specified tag at the specified position and sets a variable called tag_data. tag_data will be JSON string if not a string.",
func: (args,pos,scope,world) => {
let x = parsePosition(args.x,pos.x,true),
y = parsePosition(args.y,pos.y,true),
z = parsePosition(args.z,pos.z,true),
dimension = args.dimension || ""
scope.tag_data = world.getTagByName(x,y,z,args.tag_name,dimension)
if(typeof scope.tag_data !== "string") scope.tag_data = JSON.stringify(scope.tag_data)
}
},
{
name:"online",
noCheats: true,
info: "Lists people that are in this world.",
func: (args,pos,scope,world) => {
let arr = world.players.map(u => u.username)
let str = "<span style='color:lime;'>"+arr.length + " players online: " + arr.join(", ")
let bannedLength = 0
for(let b in world.banned) bannedLength ++
if(bannedLength){
str += "<br>"
str += bannedLength + " players banned: "
for(let b in world.banned) str += b + ", "
str = str.slice(0,str.length-2)
}
if(world.whitelist){
str += "<br>"
str += world.whitelist.length + " players whitelisted: "+world.whitelist.join(", ")
}
return [str,""]
}
},
{
name:"echo",
args:["data"],
info:"Outputs data.",
func: args => {
return [args.data+"",""]
}
},
{
name:"var",
args:["name","value"],
info:"Set a variable to a value. Value can be empty.",
func: (args,pos,scope) => {
if(!args.name) return ["Error: name required.","error"]
scope[args.name] = args.value
}
},
{
name:"solve",
args:["value1","operation","value2"],
argValues:{operation:["+","-","/","*","<",">","=","round","floor","ceil","sin","cos","tan","sqrt","%"]},
info:"Calculate operation on value1 and value2 and sets a variabled called value. Some operations don't use value2. Example: /solve 1 + 1",
func: (args,pos,scope) => {
let value1 = parseFloat(args.value1), value2 = parseFloat(args.value2)
if(isNaN(value1) || isNaN(args.value1)) value1 = args.value1
if(isNaN(value2) || isNaN(args.value2)) value2 = args.value2
switch(args.operation){
case "+":
scope.value = value1+value2
break
case "-":
scope.value = value1-value2
break
case "*":
scope.value = value1*value2
break
case "/":
scope.value = value1/value2
break
case "<":
scope.value = value1<value2
break
case ">":
scope.value = value1>value2
break
case "=":
scope.value = value1===value2
break
case "round":
scope.value = round(value1)
break
case "floor":
scope.value = floor(value1)
break
case "ceil":
scope.value = ceil(value1)
break
case "sin":
scope.value = sin(value1)
break
case "cos":
scope.value = cos(value1)
break
case "tan":
scope.value = tan(value1)
break
case "sqrt":
scope.value = sqrt(value1)
break
case "%":
scope.value = value1 % value2
break
default:
return ["No such operation called "+args.operation,"error"]
}
scope.value += "" //convert to string
}
},
{
name:"getPos",
names:["gp"],
args:["target"],
argValues:{target:["type:player","@s","@p"]},
info:"Gets position of specified target and sets target_x, target_y, target_z, target_dimension, target_name. Target can be @s, @p, or a username.",
func: (args,pos,scope,world) => {
args.target = args.target || "@s"
let arr = parseTarget(args.target,pos,world)
if(!arr || !arr[0]) return ["No such target: "+args.target,"error"]
let t = arr[0]
scope.target_x = t.x+""
scope.target_y = t.y+""
scope.target_z = t.z+""
scope.target_dimension = t.dimension+""
scope.target_name = t.username || t.name
}
},
{
name:"wait",
args:["time"],
argValues:{time:["type:number"]},
info:"Wait for time miliseconds.",
func: args => {
return sleep(parseFloat(args.time))
}
},
{
name:"getTime",
args:["timestart"],
argValues:{timestart:["type:number"]},
info:"Sets time to the current time in miliseconds. If timestart is specified, the time is subtracted from timestart.",
func: (args,pos,scope) => {
scope.time = Date.now()
if(args.timestart) scope.time -= parseInt(args.timestart)
scope.time += ""
}
},
{
name:"blockInfo",
names:["bi"],
args:["block"],
argValues:{block:["type:block"]},
func: args => {
let block = blockData[blockIds[args.block]]
if(!block){
return ["No such block "+args.block,"error"]
}
let str = ''
for(let i in block){
if(i === "shape") continue
str += i+": "
if(typeof block[i] === "function") str += "function() { [code] }"
else if(typeof block[i] === "string") str += block[i]
else str += JSON.stringify(block[i])
str += "<br>"
}
return [str,""]
},
noCheats:true
},
{
name:"seed",
noCheats:true,
func: (args,pos,scope,world) => [world.worldSeed+"",""]
}
]
win.defaultServerCommands = defaultServerCommands
}
const {defaultServerCommands} = win
function getCmd(name,world){
for(let i of world.serverCommands){
if(i.name.toLowerCase() === name.toLowerCase()){
return i
}
if(i.names && i.names.includes(name)){
return i
}
}
}
function parseCmd(str,scope,world){
let hasSlash = str[0] === "/" ? "/" : ""
if(hasSlash) str = str.substring(1) //remove leading slash if there is one
let args = []
let val = "", inQuotes = false, quoteType = null, argIsVar = false
let remaining
let cmd
for(let i=0; i<str.length; i++){
let noRaw = !cmd || !cmd.args || !cmd.lastArgRaw || args.length !== cmd.args.length
if(str[i] === "/" && !(hasSlash && i === 0) && !inQuotes && noRaw){
remaining = str.substring(i)
break
}
if(noRaw && (str[i] === "'" || str[i] === '"') && (!inQuotes || quoteType === str[i])){
inQuotes = !inQuotes
quoteType = str[i]
}else if(str[i] === "$" && !inQuotes && !val){//starts with $
argIsVar = true
}else if(noRaw && (str[i] === " " || str[i] === "\n") && !inQuotes){
if(argIsVar) val = scope[val]+""
args.push(val)
if(args.length === 1) cmd = getCmd(val,world)
val = ""
argIsVar = false
}else val += str[i]
}
if(argIsVar) val = scope[val]
args.push(val)
if(args.length === 1) cmd = getCmd(val,world)
let name = args.shift()
args = cmd && cmd.args ? Object.fromEntries(args.filter((v,i) => i in cmd.args).map((v, i) => [cmd.args[i],v])) : {}
return [args,remaining,name,cmd]
}
async function runCmd(str, pos, world, anonymous = false, cb = emptyFunc){
let remaining = str
let output = [], newOutputs = []
let scope = {}
while(remaining){
let [args,remain,name,cmd] = parseCmd(remaining,scope,world)
remaining = remain
await runParsedCommand(name,cmd,args,pos,scope,newOutputs,output,world,anonymous,cb)
}
output.push(...newOutputs)
return cb(output,newOutputs)
}
async function runParsedCommand(name,cmd,args,pos,scope,newOutputs,output,world,anonymous = false,cb = emptyFunc){//Used if client runs server command
if(cmd){
let func = anonymous ? cmd.anonymousFunc !== null && (cmd.anonymousFunc || world.serverCommandFuncs[cmd.name]) : world.serverCommandFuncs[cmd.name]
if(func){
let thisOutput = func(args,pos,scope,world)
if(thisOutput instanceof Promise){//Output previous data because new data won't be instant
output.push(...newOutputs)
cb(output,newOutputs)
newOutputs.length = 0
thisOutput = await thisOutput
}
if(thisOutput) newOutputs.push(...thisOutput)
if(thisOutput && thisOutput[1] === "error"){
output.push(...newOutputs)
cb(output,newOutputs)
newOutputs.length = 0
return true
}
}else{
newOutputs.push("§cError: cannot run §f"+name,"error")
output.push(...newOutputs)
cb(output,newOutputs)
newOutputs.length = 0
return true
}
}else{
newOutputs.push("§cError: no such command called §f"+name,"error")
output.push(...newOutputs)
cb(output,newOutputs)
newOutputs.length = 0
return true
}
}
async function runCmdFromClient(name,args,pos,scope,world,id){
let cmd = getCmd(name,world)
let newOutputs = [], output = []
await runParsedCommand(name,cmd,args,pos,scope,newOutputs,output,world,false)
output.push(...newOutputs)
world.sendPlayer({type:"commandDone",data:output,scope,id},pos.id)
}
class Contacts {
constructor() {
this.array = []
this.size = 0
}
add(x, y, z, block, data) {
if (this.size === this.array.length) {
this.array.push([ x, y, z, block, data ])
} else {
this.array[this.size][0] = x
this.array[this.size][1] = y
this.array[this.size][2] = z
this.array[this.size][3] = block
this.array[this.size][4] = data
}
this.size++
}
clear() {
this.size = 0
}
}
let entities = [], entityIds = {}
class Entity {
constructor(x, y, z, pitch, yaw, velx, vely, velz, width, height, depth, vertices, texture, faces, despawns, vao, dimension) {
this.x = x
this.y = y
this.z = z
this.previousX = x
this.previousY = y
this.previousZ = z
this.canStepX = true
this.canStepY = true
this.pitch = pitch
this.yaw = yaw
this.roll = 0
this.pitch2 = 0
this.previousPitch = pitch
this.previousYaw = yaw
this.previousRoll = 0
this.previousPitch2 = 0
this.velx = velx
this.vely = vely
this.velz = velz
this.width = width
this.height = height
this.depth = depth
this.offsetY = 0
this.prevOffsetY = 0
this.extraSize = 0
this.hidden = false
this.harmEffect = 0
this.contacts = new Contacts()
this.lastUpdate = performance.now()
this.onGround = false
this.hasCollided = false
this.gravityStength = -0.11
this.standingOn = 0
this.insideBlock = 0
this.despawns = despawns
this.spawn = this.lastUpdate
this.canDespawn = false
this.dieEffect = 0
this.dieRotate = 0
this.burning = false
this.liquid = false
this.prevLiquid = false
this.wet = false
this.parts = {}
this.shader = 0
this.world = null //also set in addEntity
this.chunkX = x >> 4
this.chunkZ = z >> 4
this.chunkDimension = ""
this.glow = false
this.dimension = dimension
}
updateVelocity(now) {
this.standingOn = this.world.getBlock(round(this.x), floor(this.y-this.height/2), round(this.z), this.dimension)
this.insideBlock = this.world.getBlock(round(this.x),round(this.y),round(this.z), this.dimension)
if(this.prevLiquid !== this.liquid){
this.prevLiquid = this.liquid
if(this.liquid && this.wet){
this.world.playSound(this.x,this.y-this.height/2,this.z,"liquid.splash",0)
this.world.sendAll({
type:"particles", particleType:"SplashParticle",
x:this.x, y:this.y-this.height/2, z:this.z, dimension:this.dimension, amount: 10
})
}
}
this.vely += this.gravityStength
let drag = this.liquid && !this.canFloat ? 0.7 : (this.onGround ? 0.8 : 0.9)
let yDrag = this.liquid ? 0.3 : 0.8
if(blockData[this.standingOn].slide) drag = blockData[this.standingOn].slide
this.velz += (this.velz * drag - this.velz)
this.velx += (this.velx * drag - this.velx)
this.vely += (this.vely * yDrag - this.vely)
}
collided(x, y, z, vx, vy, vz, block) {
let verts = blockData[block].shape.verts
let px = this.x - this.width / 2 - x
let py = this.y - this.height / 2 - y
let pz = this.z - this.depth / 2 - z
let pxx = this.x + this.width / 2 - x
let pyy = this.y + this.height / 2 - y
let pzz = this.z + this.depth / 2 - z
let minX, minY, minZ, maxX, maxY, maxZ, min, max
let stuckInBlock = this.mob && this.insideBlock && blockData[this.insideBlock].solid
//Top and bottom faces
let faces = verts[0]
if (vy <= 0) {
faces = verts[1]
}
if (vx === null && vz === null) {
let col = false
for (let face of faces) {
min = face.min
minX = min[0]
minZ = min[2]
max = face.max
maxX = max[0]
maxZ = max[2]
if (face[1] > py && face[1] < pyy && minX < pxx && maxX > px && minZ < pzz && maxZ > pz) {
col = true
if (vy <= 0) {
this.onGround = true
if(!stuckInBlock) this.y = face[1] + y + this.height / 2; else this.y = this.previousY
this.vely = 0
} else {
if(!stuckInBlock) this.y = face[1] + y - this.height / 2; else this.y = this.previousY
this.vely = 0
}
}
}
return col
}
//West and East faces
if (vx < 0) {
faces = verts[4]
} else if (vx > 0) {
faces = verts[5]
}
if (vx !== null) {
let col = false
for (let face of faces) {
min = face.min
minZ = min[2]
minY = min[1]
max = face.max
maxZ = max[2]
maxY = max[1]
if (face[0] > px && face[0] < pxx && minY < pyy && maxY > py && minZ < pzz && maxZ > pz) {
if (maxY - py > 0.5) {
this.canStepX = false
if(!stuckInBlock) this.x = x + face[0] + (vx < 0 ? this.width / 2 : -this.width / 2); else this.y = this.previousX
this.velx = 0
}
col = true
}
}
return col
}
//South and North faces
if (vz < 0) {
faces = verts[2]
} else if (vz > 0) {
faces = verts[3]
}
if (vz !== null) {
let col = false
for (let face of faces) {
min = face.min
minX = min[0]
minY = min[1]
max = face.max
maxX = max[0]
maxY = max[1]
if (face[2] > pz && face[2] < pzz && minY < pyy && maxY > py && minX < pxx && maxX > px) {
if (maxY - py > 0.5) {
this.canStepZ = false
if(!stuckInBlock) this.z = z + face[2] + (vz < 0 ? this.depth / 2 : -this.depth / 2); else this.y = this.previousY
this.velz = 0
}
col = true
}
}
return col
}
}
move(now) {
let steps = Math.ceil(max(abs(this.velx / (this.width/2)), abs(this.vely / (this.height/2)), abs(this.velz / (this.depth/2)), 1))
const VX = this.velx / steps
const VY = this.vely / steps
const VZ = this.velz / steps
let pminX = floor(this.x - this.width / 2)
let pmaxX = ceil(this.x + this.width / 2)
let pminY = floor(this.y - this.height / 2)
let pmaxY = ceil(this.y + this.height / 2)
let pminZ = floor(this.z - this.depth / 2)
let pmaxZ = ceil(this.z + this.depth / 2)
let block = null
this.liquid = this.wet = false
for (let x = pminX; x <= pmaxX; x++) {
for (let y = pminY; y <= pmaxY; y++) {
for (let z = pminZ; z <= pmaxZ; z++) {
let block = this.world.getBlock(x, y, z, this.dimension)
if (block && blockData[block].solid) {
this.contacts.add(x, y, z, block)
}
if(x === round(this.x) && z === round(this.z) && blockData[block].liquid){
this.liquid = true
if(this.canFloat && x === round(this.x) && z === round(this.z) && y === round(this.y)){
this.vely+=1/4
}
if(blockData[block].wet) this.wet = true
}
if(blockData[block].getCurrent){
var me = blockData[block]
var c = me.getCurrent(x,y,z,this.dimension,undefined,undefined,this.world)
this.velx += (c.x||0)/64
this.velz += (c.z||0)/64
var under = this.world.getBlock(x,y-1,z,this.dimension)
if(me.isThis(under) && under !== me.id) this.vely -= 1/128
}
if(blockData[block].pressurePlate && blockData[block].activate){
blockData[block].activate(x,y,z,this.dimension,block,this,this.world)
}
if(this.ontouch) this.ontouch(x,y,z,block)
}
}
}
this.world.getEntitiesNear(this.x,this.y,this.z,this.dimension, max(this.width,this.height,this.depth)/2, nearEntityArray)
for(let e of nearEntityArray) {
if(e.canStandOn && e.block && e.x > pminX && e.x < pmaxX && e.y > pminY && e.y < pmaxY && e.z > pminZ && e.z < pmaxZ) {
this.contacts.add(e.x, e.y, e.z, e.block, e)
}
}
if(this.world.weather === "rain" && this.world.weatherAmount > 0.5){
let top = this.world.getSolidTop(round(this.x),round(this.z),this.dimension)
if(this.y > top) this.wet = true
}
this.previousX = this.x
this.previousY = this.y
this.previousZ = this.z
this.previousPitch = this.pitch
this.previousYaw = this.yaw
this.previousRoll = this.roll
this.previousPitch2 = this.pitch2
this.prevOffsetY = this.offsetY
this.hasCollided = false
for(let part in this.parts){
this.parts[part].prx = this.parts[part].rx
this.parts[part].pry = this.parts[part].ry
this.parts[part].prz = this.parts[part].rz
this.parts[part].pry2 = this.parts[part].ry2
}
for (let j = 1; j <= steps && !this.hasCollided; j++) {
let px = this.x, pz = this.z, py = this.y
this.canStepX = false
this.canStepY = false
this.onGround = false
//Check collisions in the Y direction
this.y += VY
for (let i = 0; i < this.contacts.size; i++) {
block = this.contacts.array[i]
let x = block[0], y = block[1], z = block[2], vy = VY
if(block[4]){
x = block[4].previousX
z = block[4].previousZ
vy -= (block[4].y-block[4].previousY)/steps
}
if (this.collided(x, y, z, null, vy, null, block[3])) {
this.hasCollided = true
//break
}
}
if (this.onGround) {
this.canStepX = true
this.canStepZ = true
}
//Check collisions in the X direction
this.x += VX
for (let i = 0; i < this.contacts.size; i++) {
block = this.contacts.array[i]
let x = block[0], y = block[1], z = block[2], vx = VX
if(block[4]){
z = block[4].previousZ
vx -= (block[4].x-block[4].previousX)/steps
}
if (this.collided(x, y, z, vx, null, null, block[3])) {
if (this.canStepX && !this.world.getBlock(block[0], block[1] + 1, block[2], this.dimension) && !this.world.getBlock(block[0], block[1] + 2, block[2]), this.dimension) {
continue
}
this.hasCollided = true
//break
}
}
//Check collisions in the Z direction
this.z += VZ
for (let i = 0; i < this.contacts.size; i++) {
block = this.contacts.array[i]
let x = block[0], y = block[1], z = block[2], vz = VZ
if(block[4]){
vz -= (block[4].z-block[4].previousZ)/steps
}
if (this.collided(x, y, z, null, null, vz, block[3])) {
if (this.canStepZ && !this.world.getBlock(block[0], block[1] + 1, block[2], this.dimension) && !this.world.getBlock(block[0], block[1] + 2, block[2], this.dimension)) {
continue
}
this.hasCollided = true
//break
}
}
}
if(this.onGround){
this.hasCollided = true
}
this.updateChunk()
this.lastUpdate = now
this.contacts.clear()
}
updateChunk(){
let chunkX = this.x >> 4, chunkZ = this.z >> 4
if(this.chunkX !== chunkX || this.chunkZ !== chunkZ || this.dimension !== this.chunkDimension){
let oldChunk = this.world.getChunk(this.chunkX<<4,this.chunkZ<<4,this.chunkDimension)
let chunk = this.world.getChunk(chunkX<<4,chunkZ<<4,this.dimension)
this.chunkX = chunkX
this.chunkZ = chunkZ
this.chunkDimension = this.dimension
if(oldChunk && oldChunk.entities[this.id]){
delete oldChunk.entities[this.id]
if(chunk) chunk.entities[this.id] = this
else this.world.waitingEntities.push(this)
}
}
}
goToChunk(){
let chunkX = this.x >> 4, chunkZ = this.z >> 4
let chunk = this.world.getChunk(chunkX<<4,chunkZ<<4,this.dimension)
this.chunkX = chunkX
this.chunkZ = chunkZ
this.chunkDimension = this.dimension
if(chunk){
chunk.entities[this.id] = this
return true
}
}
moveTowards(x,y,z, rw, rh, rd, slowDown = 1){
var dist = dist3(this.x/rw,this.y/rh,this.z/rd,x/rw,y/rh,z/rd)
var aDist = abs(dist)
if(aDist > 1) return
var iDist = 1 - aDist //inverted distance
var velx = x-this.x
var vely = y-this.y
var velz = z-this.z
var mag = sqrt(velx * velx + vely * vely + velz * velz)
this.velx += velx*iDist/mag/slowDown
if(this.onGround) this.vely = vely*iDist/mag/slowDown
this.velz += velz*iDist/mag/slowDown
/*var toX = lerp(iDist, this.x, x)
var toY = lerp(iDist, this.y, y)
var toZ = lerp(iDist, this.z, z)
this.velx = (toX - this.x) / slowDown * iDist
if(this.onGround) this.vely = (toY - this.y) / slowDown * iDist
this.velz = (toZ - this.z) / slowDown * iDist*/
/*var xd = this.x - p.x, zd = this.z - p.z;
var x = xd; this.velx = (x-(Math.sign(x)*7.25)) / 150
if(this.onGround) {var y = this.y - (p.y-p.bottomH); this.vely = (y-(Math.sign(y)*7.25)) / 40}
var z = zd; this.velz = (z-(Math.sign(z)*7.25)) / 150*/
}
setPos(x,y,z,vx,vy,vz){
this.velx = vx
this.vely = vy
this.velz = vz
this.x = x
this.y = y
this.z = z
}
update() {
this.updateVelocity(now)
this.move(now)
if (now - this.spawn > this.despawns) {
this.canDespawn = true
}
}
addPart(name,size,vao,x,y,z,w,h,d,rx,ry,rz = 0,attached = null,glow = false){
let part =  this.parts[name] = {
name,
size,vao,
x,y,z,w,h,d,rx,ry,rz,ry2:0, //x,y,z,rx,ry are relative to entity position
px:x,py:y,pz:z,prx:rx,pry:ry,prz:rz,
originalX:x, originalY:y, originalZ:z,
attached, glow
}
if(vao && vao.tHeVerticesBuffer){
part.verticesBuffer = vao.tHeVerticesBuffer
part.textureBuffer = vao.tHeTextureBuffer
part.normalBuffer = vao.tHeNormalBuffer
}
let attachChain = []
let part2 = part
while(part2.attached){
part2 = this.parts[part2.attached]
if(!part2) break
attachChain.push(part2.name)
}
attachChain.reverse()
part.attachChain = attachChain
return part
}
facePlayer(){
this.yaw = Math.PId - (atan2(p.z+p.offsetZ - this.z, p.x+p.offsetX - this.x) + Math.PI2 + Math.PI)
var adjacent = dist2(this.x,this.z,p.x+p.offsetX,p.z+p.offsetZ)
this.pitch = Math.PId - atan2(p.y+p.offsetY - this.y, adjacent)
}
pointAt(x,y,z){
this.yaw = Math.PId - (atan2(z - this.z, x - this.x) + Math.PI2 + Math.PI)
var adjacent = dist2(this.x,this.z,x,z)
this.pitch = Math.PId - atan2(y - this.y, adjacent)
}
delete(){}
}
const
pW = 0.3,
pTopH = 0.18,
pDefaultBottomH = 1.62,
pSitBottomH = 0.995,
pSneakBottomH = 1.32,
pSwimBottomH = 0.625,
pGravity = -0.11
//if you add something to above, change player entity too and server side
class Player extends Entity{
type = "Player"
constructor(noExtrapolate){
super(0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, null, null, 0, Infinity, "this isn't really a VAO... but it will be overwritten")
this.w = pW
this.bottomH = pDefaultBottomH
this.topH = pTopH
let pix = 1/16
this.targetX = 0
this.targetY = 0
this.targetZ = 0
this.lastPos = performance.now()
this.headYaw = 0
this.headPitch = 0
this.targetHeadYaw = 0
this.targetHeadPitch = 0
this.bodyRot = 0
this.defaultOffsetY = pix*-8
this.sneakingOffsetY = pix*(-8+4.8-6)
this.die = false
this.sneaking = false
this.walking = false
this.sprinting = false
this.eating = false
this.sleeping = false
this.sitting = false
this.swimming = false
this.usingItem = false
this.prevWalking = false
this.walkStart = 0
this.prevSwimming = false
this.swimStart = 0
this.addPart("head",null,null,0,pix*6,0,1,1,1,0,0)
this.addPart("leftArm",null,null,pix*4,pix*6,0,1,1,1,0,0)
this.addPart("rightArm",null,null,pix*-4,pix*6,0,1,1,1,0,0)
this.addPart("leftLeg",null,null,pix*2,pix*-6,0,1,1,1,0,0)
this.addPart("rightLeg",null,null,pix*-2,pix*-6,0,1,1,1,0,0)
this.addPart("cape",null,null,0,pix*6,pix*-3,1,1,1,0,0)
this.holding = 0 //shown in the hand, it is set to the blockid for the block the player is holding
this.prevHolding = 0
this.holdRot = Math.PI / -10
this.addPart("holding",null,null,0, 0, 0, 1,1,1, 0, 0)
this.walkRot = 0
this.punchEffect = 0
this.pOffsetry = this.offsetry = 0
this.offsetZ = this.pOffsetZ = 0
this.skinSet = false
this.skinURL = null
this.skinImg = images.skin
this.capeSet = false
this.capeURL = null
this.capeImg = null
this.nameText = null
this.previousText = null
this.username = null
this.afk = false
this.scale = 1
this.prevScale = null
this.noExtrapolate = noExtrapolate
}
update(){
var pix = 1 / 16
var armRot = (sin((now - this.spawn) / 1000) / 2 + 0.5) * Math.PI / 40
if(this.harmEffect > 0){
this.harmEffect -= 3
}
if(this.die){
this.dieEffect += 0.05
this.dieRotate = (this.dieEffect**4)*Math.PI2
if(this.dieEffect > 1){
this.die = false
this.dieEffect = 0
this.dieRotate = 0
this.hidden = true
}
}
this.lastUpdate = now
this.previousX = this.x
this.previousY = this.y
this.previousZ = this.z
if(this.noExtrapolate){
this.x = this.targetX
this.y = this.targetY
this.z = this.targetZ
}else{
let diff = (now - this.lastPos) / tickTime
if(diff > 10) diff = 10
this.x = this.targetX+this.velx*diff
this.y = this.targetY+this.vely*diff
this.z = this.targetZ+this.velz*diff
}
this.previousPitch = this.pitch
this.previousYaw = this.yaw
this.headPitch = this.targetHeadPitch
this.headYaw = this.targetHeadYaw
this.yaw = this.bodyRot
if(this.yaw - this.previousYaw > Math.PI) this.previousYaw += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.yaw - this.previousYaw < -Math.PI) this.previousYaw -= Math.PId
if(this.scale !== this.prevScale){
this.prevScale = this.scale
let s = this.scale
this.w = pW*s
this.bottomH = pDefaultBottomH*s
this.topH = pTopH*s
this.defaultBottomH = pDefaultBottomH*s
this.sitBottomH = pSitBottomH*s
this.sneakBottomH = pSneakBottomH*s
this.swimBottomH = pSwimBottomH*s
}
if(this.sneaking || this.eating || this.usingItem && blockData[this.holding].spyglass){
}else if(this.sitting){
this.bottomH = this.sitBottomH
}else if(this.swimming){
this.bottomH = this.swimBottomH
}else if(!this.sprinting){
this.bottomH = this.defaultBottomH
}
for(var p in this.parts){
var part = this.parts[p]
part.prx = part.rx
part.pry = part.ry
part.prz = part.rz
part.pry2 = part.ry2
part.lastUpdate = now
}
this.pOffsetry = this.offsetry
if(this.swimming !== this.prevSwimming){
this.prevSwimming = this.swimming
this.swimStart = now
}
this.parts.head.rx = this.headPitch
this.parts.head.ry = 0
this.parts.head.ry2 = this.headYaw
this.parts.leftLeg.ry2 = 0
this.parts.rightLeg.ry2 = 0
this.parts.leftLeg.y = this.parts.leftLeg.originalY
this.parts.rightLeg.y = this.parts.rightLeg.originalY
this.pOffsetZ = this.offsetZ
this.offsetZ = 0
if(this.sleeping){
this.offsetY = 0
this.pitch = -Math.PI2
}else if(this.sitting){
this.offsetY = this.defaultOffsetY
this.pitch = 0
this.parts.leftLeg.rx = this.parts.rightLeg.rx = -Math.PI2
this.parts.leftLeg.ry2 = Math.PI/8
this.parts.rightLeg.ry2 = -Math.PI/8
}else if(this.sneaking){
this.offsetY = this.sneakingOffsetY
var rot = Math.PI / 6
this.pitch = rot
this.parts.leftLeg.rx = this.parts.rightLeg.rx = -rot
this.parts.leftLeg.y += 0.25
this.parts.rightLeg.y += 0.25
this.offsetZ = -0.25
}else if(this.swimming){
this.offsetY = this.defaultOffsetY
this.parts.leftLeg.rx = this.parts.rightLeg.rx = 0
if(now - this.swimStart < 250){
this.pitch = lerp((now-this.swimStart)/250,0,Math.PI2+this.headPitch)
}else{
this.pitch = Math.PI2 + this.headPitch
}
}else{
this.offsetY = this.defaultOffsetY
this.pitch = 0
this.parts.leftLeg.rx = this.parts.rightLeg.rx = 0
if(now - this.swimStart < 500){
this.pitch = lerp((now-this.swimStart)/500,Math.PI2+this.headPitch,0)
}
}
if(this.parts.head.ry2 - this.parts.head.pry2 > Math.PI) this.parts.head.pry2 += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry2 - this.parts.head.pry2 < -Math.PI) this.parts.head.pry2 -= Math.PId
this.parts.leftArm.rz = armRot
this.parts.rightArm.rz = -armRot
var part = this.parts.holding
if(this.holding !== this.prevHolding){
this.prevHolding = this.holding
}
this.parts.rightArm.rx = this.holdRot
this.parts.leftArm.rx = 0 //if you change below, also change mob holding
if(blockData[this.holding].tool){
part.x = pix*-2
part.y = pix*-12
part.z = pix*6
part.w = part.h = part.d = 1
part.rx = Math.PI / 1.25
part.ry = Math.PI * -0.5
}else if(blockData[this.holding].name === "bow"){
part.x = 0
part.y = pix*-12
part.z = 0
part.w = part.h = part.d = 1
part.rx = Math.PI / 1.25
part.ry = Math.PI * -0.5
}else if(blockData[this.holding].spyglass){
part.x = pix*2
part.y = pix*-10
part.z = 0
part.w = part.h = part.d = 1
part.rx = -this.holdRot
part.ry = 0
}else if(blockData[this.holding].item){
part.x = 0
part.y = pix*-11
part.z = pix*4
part.w = part.h = part.d = 0.5
part.rx = Math.PI2
part.ry = 0
}else if(this.holding){
part.x = 0
part.y = pix*-12
part.z = pix*3
part.w = part.h = part.d = 0.25
part.rx = 0
part.ry = Math.PI / 4
}else{
this.parts.rightArm.rx = 0
}
if(this.walking !== this.prevWalking){
this.prevWalking = this.walking
this.walkStart = now
}
var walkRotTarget
if(this.walking){
if(this.sprinting && !this.swimming){
walkRotTarget = sin(((now - this.walkStart) / 250) * Math.PI) * Math.PI / 4
}else if(this.sneaking && !this.swimming){
walkRotTarget = sin((now - this.walkStart) / 220) * Math.PI / 4
}else{
walkRotTarget = sin(((now - this.walkStart) / 500) * Math.PI) * Math.PI / 4
}
}else{
walkRotTarget = 0
}
this.walkRot = lerp(0.5, this.walkRot, walkRotTarget)
this.parts.leftLeg.rx += this.walkRot
this.parts.rightLeg.rx -= this.walkRot
if(this.swimming && this.walking){
var swimCycle = (now - this.swimStart) % 2000
if(swimCycle < 750){
var a = swimCycle*Math.PI2/750
this.parts.leftArm.rz += a
this.parts.rightArm.rz -= a
}else if(swimCycle < 1000){
this.parts.leftArm.rz += Math.PI2
this.parts.rightArm.rz -= Math.PI2
}else if(swimCycle < 1500){
var a = (500-(swimCycle-1000))*Math.PI2/500
var b = (swimCycle-1000)*Math.PI2/500
this.parts.leftArm.rx -= b
this.parts.rightArm.rx -= b
this.parts.leftArm.rz += a
this.parts.rightArm.rz -= a
}else{
var b = (500-(swimCycle-1500))*Math.PI2/500
this.parts.leftArm.rx -= b
this.parts.rightArm.rx -= b
}
}else{
this.parts.leftArm.rx += this.walkRot
this.parts.rightArm.rx -= this.walkRot
}
if(this.punchEffect > 0){
this.punchEffect -= 1.5
if(this.punchEffect < 0) this.punchEffect = 0
var punchEffect = this.punchEffect
this.parts.rightArm.rx -= punchEffect/6
this.parts.rightArm.ry2 = sin(punchEffect*Math.PI/10)
this.offsetry = this.parts.rightArm.ry2 / 3
}else this.parts.rightArm.ry2 = 0
this.parts.leftArm.ry2 = 0
if(this.eating){
this.parts.rightArm.rx -= Math.PI2 + (sin(((now - this.spawn) / 125) * Math.PI) / 16) - 0.5
this.parts.rightArm.ry2 = Math.PI4
}
if(this.usingItem){
if(blockData[this.holding].name === "bow"){
this.parts.leftArm.rx = -Math.PI2
this.parts.leftArm.ry2 = -Math.PI4
this.parts.rightArm.rx = -Math.PI2
}else if(blockData[this.holding].spyglass){
this.parts.rightArm.rx = -Math.PI2+this.holdRot
}else if(blockData[this.holding].sword){
this.parts.rightArm.rx = -Math.PI2*0.8
this.parts.holding.ry = Math.PI
this.parts.holding.rx = Math.PI2
this.parts.holding.y = pix*-10
this.parts.holding.x = pix*5
}
}
}
setPos(x,y,z,vx,vy,vz){
this.targetX = x
this.targetY = y
this.targetZ = z
this.velx = vx
this.vely = vy
this.velz = vz
this.lastPos = performance.now()
}
setRot(rx,ry, bodyRot){
this.targetHeadPitch = rx
this.targetHeadYaw = ry
this.bodyRot = (bodyRot || bodyRot === 0) ? bodyRot : ry
}
}
entities[entities.length] = class Item extends Entity {
static name2 = "Item"
constructor(x, y, z, velx, vely, velz, blockID, autoSetVel, amount, durability = null, name = null, from) {
super(x, y, z, 0, 0, velx, vely, velz, 0.25, 0.25, 0.25, null, null, 0, 300000/*1500000*/)
this.block = blockID
this.from = from || undefined
this.durability = durability
this.name = name
this.amount = amount || 1
this.gravityStength = -0.07
this.noHitbox = true
this.canFloat = true
this.cullFace = true
if(autoSetVel){
this.velx = (Math.random()-0.5) * 0.2
this.vely = Math.random() * 0.2
this.velz = (Math.random()-0.5) * 0.2
}
}
goCloserToPlayer(e){
let xDist = this.x - e.x
let yDist = this.y - (e.y - e.bottomH)
let zDist = this.z - e.z
var hRange = 1.425
let comeCloser = xDist > -hRange && xDist < hRange && yDist > -0.75 && yDist < 2.3 && zDist > -hRange && zDist < hRange
if(comeCloser){
var onGround = this.onGround
this.onGround = true
this.moveTowards(e.x, e.y, e.z, hRange,2.3,hRange, 3)
this.onGround = onGround
}
/*if(pickup){
var dist = dist3(this.x, this.y, this.z, p.x, p.y, p.z)
var dist2 = dist3(this.x, this.y, this.z, p.x, p.y-1, p.z)
pickup = ((1 >= dist) && (dist >= -1)) || ((1 >= dist2) && (dist2 >= -1))
}*/
}
update() {
this.updateVelocity(now)
this.move(now)
if(this.amount <= 0){
return this.canDespawn = true
}
this.yaw += 0.05;
if(this.yaw > Math.PId){
this.yaw -= Math.PId
this.previousYaw -= Math.PId
}
if(now - this.spawn > 1000){
for(var P of this.world.players){
if(!P.hidden && !P.die && P.dimension === this.dimension) this.goCloserToPlayer(P)
}
}
let d = 3/4
var stackSize = blockData[this.block].stackSize
var c = false
this.world.getEntitiesNear(this.x,this.y,this.z,this.dimension, 1, nearEntityArray)
for(var e of nearEntityArray){
if(e.type === "Item" && e !== this && e.block === this.block && (!e.name && !this.name || e.name === this.name) && e.amount + this.amount <= stackSize){
var xDist = this.x - e.x
var yDist = this.y - e.y
var zDist = this.z - e.z
let stack = xDist > -d && xDist < d && yDist > -d && yDist < d && zDist > -d && zDist < d
if(stack){
this.amount += e.amount
e.amount = 0
this.velx = (this.velx+e.velx)/2
this.vely = (this.vely+e.vely)/2
this.velz = (this.velz+e.velz)/2
this.x = (this.x+e.x)/2
this.y = (this.y+e.y)/2
this.z = (this.z+e.z)/2
c = true
}
}
}
if(c) this.world.sendAll({type:"entEvent",event:"itemAmount",data:this.amount,id:this.id})
if (now - this.spawn > this.despawns) {
this.canDespawn = true
}
if(!this.amount){
this.canDespawn = true
}
if(this.insideBlock && blockData[this.insideBlock].itemOnTop || this.standingOn && blockData[this.standingOn].itemOnTop){
var inside = this.insideBlock && blockData[this.insideBlock].itemOnTop
var block = inside ? this.insideBlock : this.standingOn
var y = inside ? round(this.y) : ceil(this.y-this.height/2)-1
var amount = blockData[block].itemOnTop(round(this.x),y,round(this.z),this.dimension,this)
if(amount){
this.amount = amount
this.willUpdateShape = true
this.world.sendAll({type:"entEvent",event:"itemAmount",data:this.amount,id:this.id})
}else if(amount === 0) this.canDespawn = true
}
}
}
let BlockEntity = entities[entities.length] = class BlockEntity extends Entity{
static name2 = "BlockEntity"
constructor(blockID, x,y,z, solidOnGround){
super(x, y, z, 0, 0, 0, 0, 0, 1, 1, 1, null, null, null, 1500000)
this.block = blockID
this.solidOnGround = solidOnGround
this.lastY = y
this.noHitbox = true
this.cullFace = true
}
changeBlock(blockID){
if(this.block === blockID) return
this.block = blockID
}
update() {
this.updateVelocity(now)
this.move(now)
if (now - this.spawn > this.despawns) {
this.canDespawn = true
}
if(this.onGround && this.solidOnGround){
var x = round(this.x), y = round(this.y), z = round(this.z)
var b = this.world.getBlock(x, y, z, this.dimension)
if(b && !blockData[b].liquid){
// non cube block breaks falling blocks
this.world.addItems(x,y,z,this.dimension, 0,0,0, this.block)
}else{
this.world.setBlock(x,y,z, this.block,false,false,false,false,this.dimension)
this.world.blockSound(this.block, "land", x,y,z)
}
this.canDespawn = true
}
if(blockData[this.block].name === "anvil" || blockData[this.block].name === "pointedDripstone"){
var ent = entCollided(this)
var d
if(blockData[this.block].name === "pointedDripstone") d = min(max((this.lastY - this.y - 2) * 2, 0), 40)
else if(blockData[this.block].name === "anvil") d = min(max((this.lastY - this.y - 1) * 2, 0), 40)
if(entPlayerCollided){
var reason
if(blockData[this.block].name === "pointedDripstone") reason = username+" got poked to death by a falling pointed dripstone"+(p.attackedBy ? " while being attacked by "+p.attackedBy+"." : ".")
else if(blockData[this.block].name === "anvil") reason = username+" got hit by an anvil and stuff"+(p.attackedBy ? " while being attacked by "+p.attackedBy+"." : ".")
this.world.sendAll({type:"hit", username:from, damage:d, message:reason,x:this.previousX,y:this.previousY,z:this.previousZ}, collided.id)
}else if(ent && ent.damage){
ent.damage(d)
}
if(blockData[this.block].name === "pointedDripstone" && this.onGround){
var b = blockIds.pointedDripstone
this.world.addItems(this.x,this.y,this.z,this.dimension,0,0,0,b,true)
this.world.blockParticles(b,this.x,this.y,this.z,30, "break",this.dimension)
this.canDespawn = true
}
}
}
}
let PrimedTNT = entities[entities.length] = class PrimedTNT extends BlockEntity{
static name2 = "PrimedTNT"
constructor(x,y,z, timerStart, tntBlockId = blockIds.tnt){
super(tntBlockId, x,y,z)
this.velx = (Math.random() * 0.1) - 0.05
this.vely = Math.random() * 0.1
this.velz = (Math.random() * 0.1) - 0.05
this.timerStart = timerStart || this.spawn
this.lastCollidedY = this.timerStart
this.timeLimit = 80
this.tntBlockId = tntBlockId
}
explode(){
var x = round(this.x), y = round(this.y), z = round(this.z)
this.world.explode(x,y,z,4, this.liquid || !this.world.settings.tntExplode, this.dimension)
}
update() {
this.updateVelocity(now)
this.move(now)
if(this.onGround){
this.lastCollidedY = this.y
}
var h = this.y - this.lastCollidedY
if(h > 19.75){
this.lastCollidedY = this.y
this.timerStart -= 1000
}
if((now - this.spawn) / tickTime >= this.timeLimit){
this.canDespawn = true
this.explode()
}
}
}
entities[entities.length] = class PrimedSuperTNT extends PrimedTNT{
static name2 = "PrimedSuperTNT"
constructor(x,y,z, timerStart){
super(x,y,z, timerStart, blockIds.tnt | SLAB)
}
explode(){
var x = round(this.x), y = round(this.y), z = round(this.z)
this.world.explode(x,y,z,8, blockData[this.world.getBlock(x,y,z)].liquid || !this.world.settings.tntExplode, this.dimension)
}
}
entities[entities.length] = class PrimedUltraTNT extends PrimedTNT{
static name2 = "PrimedUltraTNT"
constructor(x,y,z, timerStart){
super(x,y,z, timerStart, blockIds.tnt | STAIR)
}
explode(){
var x = round(this.x), y = round(this.y), z = round(this.z)
this.world.explode(x,y,z,24, blockData[this.world.getBlock(x,y,z)].liquid || !this.world.settings.tntExplode, this.dimension)
}
}
entities[entities.length] = class PrimedUnTNT extends PrimedTNT{
static name2 = "PrimedUnTNT"
constructor(x,y,z, timerStart){
super(x,y,z, timerStart, blockIds.untnt)
}
explode(){
var x = round(this.x), y = round(this.y), z = round(this.z)
this.world.explode(x,y,z,5, blockData[this.world.getBlock(x,y,z)].liquid || !this.world.settings.tntExplode || "original", this.dimension)
}
}
entities[entities.length] = class MovingBlock extends BlockEntity{
static name2 = "MovingBlock"
constructor(block,x,y,z,mx,my,mz,despawns, solidWhenDone = false, tags = null){
super(block, x,y,z)
this.sx = x //s stands for start
this.sy = y
this.sz = z
this.mx = mx //m stands for end
this.my = my
this.mz = mz
this.despawns = despawns //also tells how much time for it to move
this.solidWhenDone = solidWhenDone
this.tags = tags
this.canStandOn = true
this.endAs = null
}
update() {
if (this.lastUpdate - this.spawn >= this.despawns) {
this.canDespawn = true
if(this.solidWhenDone){
this.x = this.mx
this.y = this.my
this.z = this.mz
this.world.setBlock(round(this.x),round(this.y),round(this.z),this.endAs || this.block, false,false,false,false, this.dimension)
if(this.tags) this.world.setTags(round(this.x),round(this.y),round(this.z), this.tags, false, this.dimension)
}
}
this.previousX = this.x
this.previousY = this.y
this.previousZ = this.z
this.lastUpdate = now
var prog = min((now - this.spawn) / this.despawns, 1)
this.x = lerp(prog, this.sx, this.mx)
this.y = lerp(prog, this.sy, this.my)
this.z = lerp(prog, this.sz, this.mz)
this.velx = this.x - this.previousX
this.vely = this.y - this.previousY
this.velz = this.z - this.previousZ
}
}
entities[entities.length] = class BlockDisplay extends BlockEntity{
static name2 = "BlockDisplay"
constructor(block,x,y,z,w,h,d){
super(block, x,y,z, w,h,d)
this.width = w
this.height = h
this.depth = d
}
update() {}
}
entities[entities.length] = class EnderPearl extends BlockEntity{
static name2 = "EnderPearl"
constructor(x,y,z,velx,vely,velz){
super(blockIds.enderPearl, x,y,z)
this.velx = velx
this.vely = vely
this.velz = velz
this.from = null
this.facesPlayer = true
this.gravityStength = -0.04
}
update() {
this.updateVelocity(now)
this.move(now)
if (now - this.spawn > this.despawns) {
this.canDespawn = true
}
if(this.hasCollided){
if(this.from) this.world.sendPlayer({type:"tp",x:this.x,y:this.y+1,z:this.z,dimension:this.dimension},this.from)
this.canDespawn = true
}
this.canFacePlayer = true
}
}
entities[entities.length] = class Snowball extends BlockEntity{
static name2 = "Snowball"
constructor(x,y,z,velx,vely,velz){
super(blockIds.snowball, x,y,z)
this.velx = velx
this.vely = vely
this.velz = velz
this.from = null
this.facesPlayer = true
this.gravityStength = -0.04
}
update() {
this.updateVelocity(now)
this.move(now)
if(now - this.spawn > 250){
var collided = entCollided(this)
let from = getEntityOrPlayer(this.from,this.world)
from = from && (from.username || from.name)
if(collided && collided !== this){
if(entPlayerCollided){
this.world.sendAll({type:"hit", username:from, damage:1, message:from+" killed "+collided.username+" with snowballs.",x:this.previousX,y:this.previousY,z:this.previousZ}, collided.id)
}else{
if(collided.damage) collided.onhit(1,false, 0,0, this.from)
}
this.canDespawn = true
}
}
if (now - this.spawn > this.despawns || this.hasCollided) {
this.canDespawn = true
}
if(this.canDespawn) this.world.blockParticles(this.block,this.x,this.y,this.z,30, "break",this.dimension)
this.canFacePlayer = true
}
}
entities[entities.length] = class SmallFireball extends BlockEntity{
static name2 = "SmallFireball"
constructor(x,y,z,velx,vely,velz){
super(blockIds.fireCharge, x,y,z)
this.width = this.height = this.depth = 0.3125
this.velx = velx
this.vely = vely
this.velz = velz
this.from = null
this.facesPlayer = true
this.gravityStength = -0.07
}
update() {
this.updateVelocity(now)
this.move(now)
if(now - this.spawn > 250){
var collided = entCollided(this)
let from = getEntityOrPlayer(this.from,this.world)
from = from && (from.username || from.name)
if(collided && collided !== this){
if(entPlayerCollided){
this.world.sendAll({type:"hit", username:from, damage:5, burn:8, message:collided.username+" was shot by fireballs from "+from+".",x:this.previousX,y:this.previousY,z:this.previousZ}, collided.id)
}else{
if(collided.damage) collided.onhit(5,false, 0,0, this.from), collided.burnTimer += 8
}
this.canDespawn = true
}
}
if (now - this.spawn > this.despawns || this.hasCollided) {
this.canDespawn = true
if(this.hasCollided) this.world.setBlock(round(this.x),round(this.y),round(this.z),blockIds.fire,false,false,false,false,this.dimension)
}
if(this.canDespawn) this.world.blockParticles(this.block,this.x,this.y,this.z,30, "break",this.dimension)
this.canFacePlayer = true
}
}
entities[entities.length] = class Egg extends BlockEntity{
static name2 = "Egg"
constructor(x,y,z,velx,vely,velz){
super(blockIds.egg, x,y,z)
this.velx = velx
this.vely = vely
this.velz = velz
this.from = null
this.facesPlayer = true
this.gravityStength = -0.07
}
update() {
this.updateVelocity(now)
this.move(now)
var collided = entCollided(this)
let from = getEntityOrPlayer(this.from,this.world)
from = from && (from.username || from.name)
if(collided && collided !== this){
if(entPlayerCollided) this.world.sendAll({type:"hit", username:from, damage:1, message:from+" killed "+collided.username+" with eggs.",x:this.previousX,y:this.previousY,z:this.previousZ}, collided.id)
else if(collided.damage) collided.onhit(1,false, 0,0, this.from)
this.canDespawn = true
}
if (now - this.spawn > this.despawns || this.hasCollided) {
this.canDespawn = true
}
if(this.canDespawn){
this.world.blockParticles(this.block,this.x,this.y,this.z,30, "break",this.dimension)
if(rand() > 0.9) this.world.addEntity(new entities[entityIds.Chicken](this.x,this.y,this.z),false,this.dimension)
}
this.canFacePlayer = true
}
}
entities[entities.length] = class SlingshotShot extends BlockEntity{
static name2 = "SlingshotShot"
constructor(x,y,z,velx,vely,velz){
super(blockIds.ironNugget, x,y,z)
this.velx = velx
this.vely = vely
this.velz = velz
this.despawns = 10000
this.facesPlayer = true
this.gravityStength = -0.02
}
update() {
this.updateVelocity(now)
this.move(now)
if (now - this.spawn > this.despawns && this.onGround) {
this.canDespawn = true
//world.addEntity(new Item(this.x,this.y,this.z,0,0,0,blockIds.ironNugget))
}
var collided = entCollided(this)
if(collided){
if(entPlayerCollided) this.world.sendAll({type:"hit", damage:5, message:collided.username+" got killed by a slingshot.",x:this.previousX,y:this.previousY,z:this.previousZ}, collided.id)
else if(collided.damage) collided.damage(5)
this.canDespawn = true
}
this.canFacePlayer = true
}
move(now) {
let pminX = floor(this.x - this.width / 2)
let pmaxX = ceil(this.x + this.width / 2)
let pminY = floor(this.y - this.height / 2)
let pmaxY = ceil(this.y + this.height / 2)
let pminZ = floor(this.z - this.depth / 2)
let pmaxZ = ceil(this.z + this.depth / 2)
let block = null
this.liquid = false
for (let x = pminX; x <= pmaxX; x++) {
for (let y = pminY; y <= pmaxY; y++) {
for (let z = pminZ; z <= pmaxZ; z++) {
let block = this.world.getBlock(x, y, z, this.dimension)
if (block && blockData[block].solid) {
this.contacts.add(x, y, z, block)
}
if(x === round(this.x) && z === round(this.z) && blockData[block].liquid){
this.liquid = true
}
}
}
}
this.previousX = this.x
this.previousY = this.y
this.previousZ = this.z
var xBounce, yBounce, zBounce, pvelx = this.velx, pvely = this.vely, pvelz = this.velz
this.canStepX = false
this.canStepY = false
this.onGround = false
this.hasCollided = false
//Check collisions in the Y direction
this.y += this.vely
for (let i = 0; i < this.contacts.size; i++) {
block = this.contacts.array[i]
if (this.collided(block[0], block[1], block[2], null, this.vely, null, block[3])) {
this.y = this.previousY
this.vely = 0
this.hasCollided = true
yBounce = true
break
}
}
if (this.y === this.previousY) {
this.canStepX = true
this.canStepZ = true
}
//Check collisions in the X direction
this.x += this.velx
for (let i = 0; i < this.contacts.size; i++) {
block = this.contacts.array[i]
if (this.collided(block[0], block[1], block[2], this.velx, null, null, block[3])) {
if (this.canStepX && !this.world.getBlock(block[0], block[1] + 1, block[2], this.dimension) && !this.world.getBlock(block[0], block[1] + 2, block[2], this.dimension)) {
continue
}
this.x = this.previousX
this.velx = 0
this.hasCollided = true
xBounce = true
break
}
}
//Check collisions in the Z direction
this.z += this.velz
for (let i = 0; i < this.contacts.size; i++) {
block = this.contacts.array[i]
if (this.collided(block[0], block[1], block[2], null, null, this.velz, block[3])) {
if (this.canStepZ && !this.world.getBlock(block[0], block[1] + 1, block[2], this.dimension) && !this.world.getBlock(block[0], block[1] + 2, block[2]), this.dimension) {
continue
}
this.z = this.previousZ
this.velz = 0
this.hasCollided = true
zBounce = true
break
}
}
if(this.onGround){
this.hasCollided = true
}
if(xBounce) this.velx = -pvelx
if(yBounce) this.vely = -pvely
if(zBounce) this.velz = -pvelz
this.updateChunk()
this.lastUpdate = now
this.contacts.clear()
}
}
entities[entities.length] = class Arrow extends Entity{
static name2 = "Arrow"
constructor(x,y,z,dx,dy,dz, from){
super(x, y, z, 0, 0, dx, dy, dz, 0.25, 0.25, 0.25, null, null, null, 60000)
this.gravityStength = -0.01
this.prevChangedX = x
this.prevChangedY = y
this.prevChangedZ = z
this.direction = new PVector(dx,dy,dz)
this.stopStart = this.spawn
this.hasStopped = false
this.noHitbox = true
this.from = from
}
updateVelocity(now) {
if(this.hasCollided){
this.velx = this.vely = this.velz = 0
}else{
this.vely += this.gravityStength
if (this.vely < -1.5) {
this.vely = -1.5
}
let drag = this.liquid ? 0.7 : 0.99
this.velz += (this.velz * drag - this.velz)
this.velx += (this.velx * drag - this.velx)
// this.vely += (this.vely * 0.9 - this.vely) * dt
}
}
collided(x, y, z, vx, vy, vz, block) {
let verts = blockData[block].shape.verts
let px = this.x - this.width / 2 - x
let py = this.y - this.height / 2 - y
let pz = this.z - this.depth / 2 - z
let pxx = this.x + this.width / 2 - x
let pyy = this.y + this.height / 2 - y
let pzz = this.z + this.depth / 2 - z
let minX, minY, minZ, maxX, maxY, maxZ, min, max
//Top and bottom faces
let faces = verts[0]
if (vy <= 0) {
faces = verts[1]
}
if (vx === null && vz === null) {
let col = false
for (let face of faces) {
min = face.min
minX = min[0]
minZ = min[2]
max = face.max
maxX = max[0]
maxZ = max[2]
if (face[1] > py && face[1] < pyy && minX < pxx && maxX > px && minZ < pzz && maxZ > pz) {
col = true
if (vy <= 0) {
this.onGround = true
this.y = face[1] + y + this.height / 2
this.vely = 0
} else {
this.y = face[1] + y - this.height / 2
this.vely = 0
}
}
if (face[1] >= py && face[1] <= pyy && minX <= pxx && maxX >= px && minZ <= pzz && maxZ >= pz) this.hasCollided = true
}
return col
}
//West and East faces
if (vx < 0) {
faces = verts[4]
} else if (vx > 0) {
faces = verts[5]
}
if (vx !== null) {
let col = false
for (let face of faces) {
min = face.min
minZ = min[2]
minY = min[1]
max = face.max
maxZ = max[2]
maxY = max[1]
if (face[0] > px && face[0] < pxx && minY < pyy && maxY > py && minZ < pzz && maxZ > pz) {
if (maxY - py > 0.5) {
this.canStepX = false
this.x = x + face[0] + (vx < 0 ? this.width / 2 : -this.width / 2)
this.velx = 0
}
col = true
}
if (face[0] >= px && face[0] <= pxx && minY <= pyy && maxY >= py && minZ <= pzz && maxZ >= pz) this.hasCollided = true
}
return col
}
//South and North faces
if (vz < 0) {
faces = verts[2]
} else if (vz > 0) {
faces = verts[3]
}
if (vz !== null) {
let col = false
for (let face of faces) {
min = face.min
minX = min[0]
minY = min[1]
max = face.max
maxX = max[0]
maxY = max[1]
if (face[2] > pz && face[2] < pzz && minY < pyy && maxY > py && minX < pxx && maxX > px) {
if (maxY - py > 0.5) {
this.canStepZ = false
this.z = z + face[2] + (vz < 0 ? this.depth / 2 : -this.depth / 2)
this.velz = 0
}
col = true
}
if (face[2] >= pz && face[2] <= pzz && minY <= pyy && maxY >= py && minX <= pxx && maxX >= px) this.hasCollided = true
}
return col
}
}
update(){
this.updateVelocity(now)
this.move(now)
if(this.previousX !== this.x || this.previousY !== this.y || this.previousZ !== this.z){
this.prevChangedX = this.previousX
this.prevChangedY = this.previousY
this.prevChangedZ = this.previousZ
}
if(!this.hasCollided){
this.hasStopped = false
this.direction.x = this.velx
this.direction.y = this.vely
this.direction.z = this.velz
}else if(!this.hasStopped){
this.hasStopped = true
this.stopStart = now
this.direction.normalize()
var x = round(this.x+this.direction.x)
var y = round(this.y+this.direction.y)
var z = round(this.z+this.direction.z)
var block = this.world.getBlock(x,y,z,this.dimension)
if(block && blockData[block].projectileHit){
blockData[block].projectileHit(x,y,z,this.dimension,this)
}
}
if (now - this.stopStart > this.despawns) {
this.canDespawn = true
}
if(!this.hasCollided){
var collided = entCollided(this)
let from = getEntityOrPlayer(this.from,this.world)
from = from && (from.username || from.name)
let d = dist3(this.velx,this.vely,this.velz,0,0,0)*4
if(collided && collided !== this){
this.canDespawn = true
if(entPlayerCollided) this.world.sendAll({type:"hit", velx:this.velx/2, velz:this.velz/2, username:from, damage:d, message:collided.username+" got killed by an arrow"+(from ? " from "+from+"." : "."),x:this.previousX,y:this.previousY,z:this.previousZ}, collided.id)
else if(collided.onhit) collided.onhit(d,false, this.velx/2,this.velz/2, this.from)
else this.canDespawn = false
}
}
this.yaw = Math.PId - (atan2(this.z - this.prevChangedZ, this.x - this.prevChangedX) + Math.PI2 + Math.PI)
var adjacent = dist2(this.prevChangedX,this.prevChangedZ,this.x,this.z)
this.pitch = Math.PId - atan2(this.y - this.prevChangedY, adjacent)
}
}
entities[entities.length] = class ExperienceOrb extends Entity{
static name2 = "ExperienceOrb"
constructor(x,y,z,value){
super(x, y, z, 0, 0, 0, 0, 0, 0.5, 0.5, 0.5, null, null, null, 300000)
this.amount = value
this.noHitbox = true
this.facesPlayer = true
}
goToPlayer(e){
var dist = dist3(this.x,this.y,this.z,e.x,e.y-e.bottomH,e.z)
if(dist < 7.25){
////var speed = (7.25 - dist) / 10
//var aDist = abs(dist)
//var xd = this.x - p.x, zd = this.z - p.z;
//var x = xd/*/abs(zd)*/; this.velx = (x-(Math.sign(x)*7.25)) / 150//; this.velx = -this.velx
//if(this.onGround) {var y = this.y - (p.y-p.bottomH); this.vely = (y-(Math.sign(y)*7.25)) / 40/*; this.vely = -this.vely*/}
//var z = zd/*/abs(xd)*/; this.velz = (z-(Math.sign(z)*7.25)) / 150//; this.velx = -this.velx
this.moveTowards(e.x, e.y-e.bottomH, e.z, 7.25,7.25,7.25, 20)
}
return dist < 0.5
}
update(){
for(var p of this.world.players){
if(!p.hidden && !p.die && p.dimension === this.dimension) this.goToPlayer(p)
}
this.updateVelocity(now)
this.move(now)
if (now - this.spawn > this.despawns) {
this.canDespawn = true
}
}
}
class Mob extends Entity{
static mob = true
mob = true
constructor(){
super(...arguments)
/*this.moveTime = 0
this.spinTime = 0
this.spin = 0
this.dirx = 0
this.dirz = 0*/
this.health = 0
this.lastDamage = 0
this.lastY = this.y
this.path = null
this.walking = false
this.panick = 0
this.drop = null
this.dropAmount = 0
this.maxDamageBlock = 0 //for blocks with damage
this.maxBurnBlock = 0
this.burnTimer = 0
this.burning = false
this.lastBlockDamage = 0
this.oxygen = 20
this.lastOxygenChange = 0
this.spinTarget = 0
this.spinTargetPitch = 0
this.die = false
this.lastStepSound = 0
this.noScale = true
this.hostile = false
this.minFollowDist = 0
this.maxFollowDist = 0
this.detectionDist = 0
this.target = null, this.targetEnt = null
this.attackStrength = 0
this.attackCooldown = 0, this.maxAttackCooldown = 0
this.holding = this.prevHolding = 0
this.canClimb = false
this.canFly = false
this.attacks = null
this.attracts = null
this.attractEnt = null
this.attractedBy = null
this.sitting = false
this.owner = null
this.name = null
this.despawnStart = 0
}
findPath(fx,fy,fz,x,y,z){
let spreaded = [], spreadAt = [fx,fy,fz,null] //x y z parent
let maxDist = 10, dist, dx, dy, dz, dd
let sx = fx, sy = fy, sz = fz, xDir, yDir, zDir, cy
let f = this.canFly
while(spreadAt.length && max(abs(sx-x),abs(sy-y),abs(sz-z)) > 1){
[sx,sy,sz] = spreadAt
let closestDist = Infinity, closestY = Infinity
xDir = yDir = zDir = 0
if(max(abs(sx-fx),abs(sy-fy),abs(sz-fz)) <= maxDist){
dist = abs(sx+1-x)+abs(sz-z)
if(dist < closestDist){
dx = 1, dy = 0, dz = 0, dd = false, cy = Infinity
let a = blockData[this.world.getBlock(sx+dx,sy+1,sz+dz)].solid, b = blockData[this.world.getBlock(sx+dx,sy,sz+dz)].solid, c = blockData[this.world.getBlock(sx+dx,sy-1,sz+dz)].solid, d = blockData[this.world.getBlock(sx+dx,sy-2,sz+dz)].solid
if((b||f) && !a && abs(sy+1-fy) < cy) dy = 1, dd = true, cy = abs(sy-1-fy)
if((c || blockData[this.world.getBlock(sx+dx,sy-1,sz+dz)].liquid || f) && !(b || blockData[this.world.getBlock(sx+dx,sy,sz+dz)].liquid) && abs(sy-fy) < cy) dy = 0, dd = true, cy = abs(sy-1-fy)
if((d||f) && !c && abs(sy-1-fy) < cy) dy = -1, dd = true, cy = abs(sy-1-fy)
if(dd && !xyArrayHas(spreaded,spreadAt,sx+dx,sy+dy,sz+dz)) closestDist = dist, xDir = dx, yDir = dy, zDir = dz, closestY = cy
}
dist = abs(sx-1-x)+abs(sz-z)
if(dist < closestDist){
dx = -1, dy = 0, dz = 0, dd = false, cy = Infinity
let a = blockData[this.world.getBlock(sx+dx,sy+1,sz+dz)].solid, b = blockData[this.world.getBlock(sx+dx,sy,sz+dz)].solid, c = blockData[this.world.getBlock(sx+dx,sy-1,sz+dz)].solid, d = blockData[this.world.getBlock(sx+dx,sy-2,sz+dz)].solid
if((b||f) && !a && abs(sy+1-fy) < cy) dy = 1, dd = true, cy = abs(sy-1-fy)
if((c || blockData[this.world.getBlock(sx+dx,sy-1,sz+dz)].liquid || f) && !(b || blockData[this.world.getBlock(sx+dx,sy,sz+dz)].liquid) && abs(sy-fy) < cy) dy = 0, dd = true, cy = abs(sy-1-fy)
if((d||f) && !c && abs(sy-1-fy) < cy) dy = -1, dd = true, cy = abs(sy-1-fy)
if(dd && !xyArrayHas(spreaded,spreadAt,sx+dx,sy+dy,sz+dz)) closestDist = dist, xDir = dx, yDir = dy, zDir = dz, closestY = cy
}
dist = abs(sx-x)+abs(sz+1-z)
if(dist < closestDist){
dx = 0, dy = 0, dz = 1, dd = false, cy = Infinity
let a = blockData[this.world.getBlock(sx+dx,sy+1,sz+dz)].solid, b = blockData[this.world.getBlock(sx+dx,sy,sz+dz)].solid, c = blockData[this.world.getBlock(sx+dx,sy-1,sz+dz)].solid, d = blockData[this.world.getBlock(sx+dx,sy-2,sz+dz)].solid
if((b||f) && !a && abs(sy+1-fy) < cy) dy = 1, dd = true, cy = abs(sy-1-fy)
if((c || blockData[this.world.getBlock(sx+dx,sy-1,sz+dz)].liquid || f) && !(b || blockData[this.world.getBlock(sx+dx,sy,sz+dz)].liquid) && abs(sy-fy) < cy) dy = 0, dd = true, cy = abs(sy-1-fy)
if((d||f) && !c && abs(sy-1-fy) < cy) dy = -1, dd = true, cy = abs(sy-1-fy)
if(dd && !xyArrayHas(spreaded,spreadAt,sx+dx,sy+dy,sz+dz)) closestDist = dist, xDir = dx, yDir = dy, zDir = dz, closestY = cy
}
dist = abs(sx-x)+abs(sz-1-z)
if(dist < closestDist){
dx = 0, dy = 0, dz = -1, dd = false, cy = Infinity
let a = blockData[this.world.getBlock(sx+dx,sy+1,sz+dz)].solid, b = blockData[this.world.getBlock(sx+dx,sy,sz+dz)].solid, c = blockData[this.world.getBlock(sx+dx,sy-1,sz+dz)].solid, d = blockData[this.world.getBlock(sx+dx,sy-2,sz+dz)].solid
if((b||f) && !a && abs(sy+1-fy) < cy) dy = 1, dd = true, cy = abs(sy-1-fy)
if((c || blockData[this.world.getBlock(sx+dx,sy-1,sz+dz)].liquid || f) && !(b || blockData[this.world.getBlock(sx+dx,sy,sz+dz)].liquid) && abs(sy-fy) < cy) dy = 0, dd = true, cy = abs(sy-1-fy)
if((d||f) && !c && abs(sy-1-fy) < cy) dy = -1, dd = true, cy = abs(sy-1-fy)
if(dd && !xyArrayHas(spreaded,spreadAt,sx+dx,sy+dy,sz+dz)) closestDist = dist, xDir = dx, yDir = dy, zDir = dz, closestY = cy
}
if(!isFinite(closestDist) && this.canClimb){
let b = blockData[this.world.getBlock(sx+1,sy,sz)].solid || blockData[this.world.getBlock(sx-1,sy,sz)].solid || blockData[this.world.getBlock(sx,sy,sz+1)].solid || blockData[this.world.getBlock(sx,sy,sz-1)].solid,
a2 = blockData[this.world.getBlock(sx,sy+1,sz)].solid,
b2 = blockData[this.world.getBlock(sx,sy,sz)].solid
if(!a2 && !b2 && b && abs(sy+1-fy) < closestY && !xyArrayHas(spreaded,spreadAt,sx,sy+1,sz)) yDir = 1, closestY = abs(sy+1-fy), closestDist = abs(sx-x)+abs(sz-z)
}else if(!isFinite(closestDist) && this.canFly){
let a2 = blockData[this.world.getBlock(sx,sy+1,sz)].solid,
b2 = blockData[this.world.getBlock(sx,sy,sz)].solid
if(!a2 && !b2 && abs(sy+1-fy) < closestY && !xyArrayHas(spreaded,spreadAt,sx,sy+1,sz)) yDir = 1, closestY = abs(sy+1-fy), closestDist = abs(sx-x)+abs(sz-z)
}
}
spreaded.push(...spreadAt.splice(0,4))
if(isFinite(closestDist)) spreadAt.push(sx+xDir,sy+yDir,sz+zDir, spreaded.length-4)
}
if(sx === fx && sy === fy && sz === fz) return null
let i = spreaded.length-4, path = [sx,sy,sz,sx+xDir,sy+yDir,sz+zDir]
while(path.length < 85){
i = spreaded[i+3]
if(i || i === 0) path.unshift(spreaded[i],spreaded[i+1],spreaded[i+2])
else break
}
return path
}
randomPath(){
let x = round(this.x+rand(-10,10))
let z = round(this.z+rand(-10,10))
let y, y2
for(y = y2 = round(this.y); y<round(this.y)+10; y++, y2--){
let data = blockData[this.world.getBlock(x,y,z,this.dimension)]
if(!data.solid && !data.liquid) break
data = blockData[this.world.getBlock(x,y2,z,this.dimension)]
if(!data.solid && !data.liquid) break
}
this.path = this.findPath(round(this.x),round(this.y-this.height/2),round(this.z),x,y,z) || null
}
AI(now){
let target = this.target && getEntityOrPlayer(this.target,this.world)
let follow = target || this.attractEnt
let d = follow && max(abs(follow.x-this.x),abs(follow.y-this.y),abs(follow.z-this.z))
if(this.path && (!follow || follow === target && d > this.minFollowDist || follow === this.attractEnt && d > 2)){
let x,y,z, c = Infinity, i
for(let i2=0; i2<this.path.length; i2+=3){
let d = max(abs(this.path[i2]-this.x),abs(this.path[i2+1]-this.y),abs(this.path[i2+2]-this.z))
if(d < c) c = d, x = this.path[i2], y = this.path[i2+1], z = this.path[i2+2], i = i2
}
if(i > 0) this.path.splice(0,i) //get rid of the part that it wont go to
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.spinTarget = yaw
let d = max(min(yaw - this.yaw, 0.3),-0.3)
this.yaw += d
let speed = this.panick > 0 ? 0.08 : (this.target ? 0.04 : 0.02)
this.velx += sin(this.yaw) * speed
this.velz += cos(this.yaw) * speed
if(y > round(this.y-this.height/2)){
if(this.canClimb) this.vely = 0.2
else if(this.canFly) this.vely += 0.2
else if(this.onGround) this.vely = 0.6
}
if(max(abs(this.x-x),abs(this.z-z)) < (this.panick ? 1 : 0.25) && abs(this.y-this.height/2-y) < 1){
this.path.splice(0,3)
}
if(!this.path.length) this.path = null
this.walking = true
}else{
this.walking = false
if(this.spinTarget !== this.yaw){
let yaw = this.spinTarget
let d = max(min(yaw - this.yaw, 0.1),-0.1)
this.yaw += d
}
}
if(this.liquid) this.vely += 0.3
if(this.path && this.sitting) this.path = null
if(this.sitting && this.targetEnt) this.targetEnt = target = null
if(target){
let d = max(abs(this.x-target.x),abs(this.y-target.y),abs(this.z-target.z))
if(d > this.maxFollowDist ||
this.dimension !== target.dimension || target.hidden || target.die || target.survival !== undefined && !target.survival
) this.target = target = null
}
if(this.hostile && !target && !this.sitting){
let c = Infinity
if(!this.attacks || this.attacks.includes("Player")) for(let ent of this.world.players){
if(this.dimension === ent.dimension && !ent.hidden && !ent.die && ent.survival){
let d = max(abs(this.x-ent.x),abs(this.y-ent.y),abs(this.z-ent.z))
if(d<this.detectionDist && d<c){
c = d
this.target = ent.id, target = ent
}
}
}
if(this.attacks){
this.world.getEntitiesNear(this.x,this.y,this.z,this.dimension, this.detectionDist, nearEntityArray)
for(let ent of nearEntityArray){
if(this.dimension === ent.dimension && !ent.hidden && !ent.die && this.attacks.includes(ent.type)){
let d = max(abs(this.x-ent.x),abs(this.y-ent.y),abs(this.z-ent.z))
if(d<this.detectionDist && d<c){
c = d
this.target = ent.id, target = ent
}
}
}
}
}
this.attractEnt = null
if(!target && this.attracts){
let cd = Infinity
for(let p of this.world.players){
let dist = max(abs(this.x-p.x),abs(this.y-p.y),abs(this.z-p.z))
if(p.dimension === this.dimension && !p.hidden && !p.die && dist < 5 && dist < cd && this.attracts.includes(p.holding)) cd = dist, this.attractEnt = p
}
}
this.attractedBy = this.attractEnt ? (this.attractEnt.id) : null
if(this.attackCooldown > 0) this.attackCooldown--
if(follow && !this.sitting){
let y = round(follow.y)
if(!this.canFly){
while(!blockData[this.world.getBlock(round(this.x),y,round(this.z),this.dimension)].solid && y>round(this.y)-this.detectionDist) y--
y++
}
let path = this.findPath(round(this.x),round(this.y-this.height/2),round(this.z),round(follow.x),y,round(follow.z))
if(path){
path.splice(0,3)
this.path = path
}
if(target && this.attackStrength && this.attackCooldown <= 0 && (d || d === 0) && d <= this.minFollowDist){
let velx = sin(this.yaw)/2, velz = cos(this.yaw)/2
if(target.type === "Player"){
this.world.sendPlayer({type:"hit", damageType:"mobHit", username:this.name || this.defaultName, id:this.id, damage:this.attackStrength, message:this.killMessage(target.username),x:this.x,y:this.y,z:this.z}, target.id)
}else if(target.onhit) target.onhit(this.attackStrength,false, velx,velz, this.id)
this.attackCooldown = this.maxAttackCooldown
this.world.sendAllInChunk({type:"entEvent",event:"mobAttack",id:this.id},this.chunkX,this.chunkZ,this.chunkDimension)
}
}else{
if(!this.sitting && rand() > 0.995){
this.randomPath()
}else if(rand() > 0.99){
this.spinTarget = rand(Math.PId)
this.spinTargetPitch = 0
}
}
if(this.saySound && rand() > 0.999){
let sound = this.saySound
if(Array.isArray(sound)) sound = sound[Math.floor(Math.random()*sound.length)]
this.world.playSound(this.x,this.y,this.z, sound)
}
this.targetEnt = target
if(this.additionalAI) this.additionalAI()
/*let dt = (now - this.lastUpdate) / 33
dt = dt > 2 ? 2 : dt
if(this.moveTime > 0){
this.moveTime --
this.velx += this.dirx / 100
this.velz += this.dirz / 100
}else if(this.spinTime > 0){
this.spinTime --
this.yaw += this.spin
if(this.yaw > Math.PI*2){
this.yaw -= Math.PI*2
}
if(this.yaw < 0){
this.yaw += Math.PI*2
}
}else if(Math.random()>0.8){
if(Math.random() > 0.5){
this.spinTime = Math.random()*60
this.spin = (Math.random()>0.5 ? 0.05 : -0.05)
}else{
this.moveTime = Math.random()*60
this.dirx = Math.cos(this.yaw)
this.dirz = -Math.sin(this.yaw)
}
}
if(this.moveTime > 0 && Math.random() > 0.5){
var b = world.getBlock(round(this.x+this.dirx), this.y, round(this.z+this.dirz), this.dimension)
if(this.onGround && blockData[b].solid && !blockData[b].liquid){
this.vely = 0.3
}
if(blockData[b].liquid){
this.vely += 0.05
}
}*/
}
pushByPlayer(ent){
let w = this.width/2, d = this.depth/2, h = this.height/2
let w2 = ent.w, d2 = ent.w
let w3 = w+w2, d3 = d+d2
if(this.x-w<ent.x+w2 && this.x+w>ent.x-w2 && this.z-d<ent.z+d2 && this.z+d>ent.z-d2 && this.y-h<ent.y+ent.topH && this.y+h>ent.y-ent.bottomH){
let velx = (this.x-ent.x)/w3
let velz = (this.z-ent.z)/d3
if(velx === 0 && velz === 0) return
let mag = sqrt(velx*velx+velz*velz)
velx = velx/mag/w3/10
velz = velz/mag/d3/10
this.velx += velx, this.velz += velz
}
}
pushByMob(ent){
let w = this.width/2, d = this.depth/2, h = this.height/2
let w2 = ent.width/2, d2 = ent.depth/2, h2 = ent.height/2
let w3 = w+w2, d3 = d+d2
if(this.x-w<ent.x+w2 && this.x+w>ent.x-w2 && this.z-d<ent.z+d2 && this.z+d>ent.z-d2 && this.y-h<ent.y+h2 && this.y+h>ent.y-h2){
let velx = (this.x-ent.x)/w3
let velz = (this.z-ent.z)/d3
if(velx === 0 && velz === 0) return
let mag = sqrt(velx*velx+velz*velz)
velx = velx/mag/w3/10
velz = velz/mag/d3/10
this.velx += velx, this.velz += velz
}
}
ontouch(x,y,z,block){
let data = blockData[block]
if(this.x - 0.6 < x+1 && this.x + 0.6 > x-1 && this.y - 0.6 < y+1 && this.y + 0.6 > y-1 && this.z - 0.6 < z+1 && this.z + 0.6 > z-1){
if(data.damage){
let d = data.damage
if(typeof d === "function") d = d(x,y,z,p.dimension)
if(d > this.maxDamageBlock) this.maxDamageBlock = d
}
if(data.burnEnt) this.maxBurnBlock = 0.2
}else if(data.damageUp && this.x-this.width/2 < x+0.5 && this.x+this.width/2 > x-0.5 && this.y-this.height/2 <= y+0.5 && this.y+this.height/2 > y-0.5 && this.z - this.depth/2 < z+0.5 && this.z + this.depth/2 > z-0.5){
if(data.damageUp > this.maxDamageBlock) this.maxDamageBlock = data.damageUp
}
}
mobUpdate(now) {
this.maxBurnBlock = this.maxDamageBlock = 0
this.updateVelocity(now)
this.move(now)
for(let P of this.world.players){
if(!P.hidden && !P.die && P.dimension === this.dimension) this.pushByPlayer(P)
}
this.world.getEntitiesNear(this.x,this.y,this.z,this.dimension, 16, nearEntityArray)
for(let ent of nearEntityArray){
if(ent.mob && ent !== this && ent.dimension === this.dimension) this.pushByMob(ent)
}
this.AI(now)
//health and death & stuff
if(this.y > this.lastY) this.lastY = this.y
if(this.onGround && !this.canFly){
let fall = this.lastY - this.y
this.lastY = this.y
if(!this.liquid && fall > 3){
this.damage(fall-3)
}
}
if(this.maxDamageBlock > 0 && now - this.lastBlockDamage > 500){
this.lastBlockDamage = now
this.damage(this.maxDamageBlock)
if(!this.path) this.randomPath()
this.sitting = false
this.world.sendAllInChunk({type:"entEvent",event:"sit",id:this.id, data:this.sitting},this.chunkX,this.chunkZ,this.chunkDimension)
this.panick = 20
}
this.burnTimer += this.maxBurnBlock
if(this.burnTimer > 16) this.burnTimer = 16
this.burning = this.burnTimer > 0
if(this.burning){
if(now - this.lastBlockDamage > 1000){
this.lastBlockDamage = now
this.burnTimer -= 2
this.damage(1)
if(!this.path) this.randomPath()
this.sitting = false
this.world.sendAllInChunk({type:"entEvent",event:"sit",id:this.id, data:this.sitting},this.chunkX,this.chunkZ,this.chunkDimension)
this.panick = 20
}
}
if(this.insideBlock && (blockData[this.insideBlock].solid && !blockData[this.insideBlock].transparent || blockData[this.insideBlock].liquid)){
if(this.oxygen > 0){
if(now - this.lastOxygenChange > (blockData[this.insideBlock].liquid ? 1000 : 500)){
this.lastOxygenChange = now
this.oxygen-=2
}
}else{
if(now - this.lastOxygenChange > 500){
this.lastOxygenChange = now
this.damage(1)
if(!this.path) this.randomPath()
this.world.sendAllInChunk({type:"entEvent",event:"sit",id:this.id, data:this.sitting},this.chunkX,this.chunkZ,this.chunkDimension)
this.sitting = false
this.panick = 20
}
}
}else if(this.oxygen < 20){
if(now - this.lastOxygenChange > 250){
this.lastOxygenChange = now
this.oxygen+=2
}
}
if(this.oxygen < 0) this.oxygen = 0
if(this.oxygen > 20) this.oxygen = 20
if(this.harmEffect > 0){
this.harmEffect -= 3
}
if(this.health <= 0 && !this.die){
this.die = true
if(this.deathSound){
let sound = this.deathSound
if(Array.isArray(sound)) sound = sound[Math.floor(Math.random()*sound.length)]
this.world.playSound(this.x,this.y,this.z, sound, 0)
}
if(this.drop){
for(let i of this.drop){
let amount = this.dropAmount || 1
if(Array.isArray(amount)) amount = round(rand(amount[0],amount[1]))
this.world.addItems(this.x,this.y,this.z,this.dimension,0,0,0,i,true,amount,null,null,this.id)
}
if(this.holding) this.world.addItems(this.x,this.y,this.z,this.dimension,0,0,0,this.holding,true,null,null,null,this.id)
if(this.experience) this.world.addEntity(new entities[entityIds.ExperienceOrb](this.x, this.y, this.z, this.experience),false,this.dimension)
if(this.ondie) this.ondie()
}
}
if(this.die){
this.dieEffect += 0.04//0.05 //slower than client side to allow animation
this.dieRotate = (this.dieEffect**4)*Math.PI2
if(this.dieEffect > 1){
this.canDespawn = true
this.dieEffect = 0
this.dieRotate = 0
this.hidden = true
}
}
if(this.walking && this.stepSound && now - this.lastStepSound > (this.panick ? 500 : 1000)){
this.lastStepSound = now
let sound = this.stepSound
if(Array.isArray(sound)) sound = sound[Math.floor(Math.random()*sound.length)]
this.world.playSound(this.x,this.y,this.z, sound)
}
if(this.panick > 0) this.panick--
let canDespawn = true
for(let p of this.world.players){
if(max(abs(this.x-p.x),abs(this.z-p.z)) <= 48) canDespawn = false
}
if(this.name) canDespawn = false
if(!canDespawn) this.despawnStart = now + this.despawns
else if (now - this.spawn > this.despawnStart) {
this.canDespawn = true
}
}
damage(amount,vx,vy,vz){
if(vx) this.velx += vx
if(vy) this.vely += vy
if(vz) this.velz += vz
var prev = amount
if(this.harmEffect > 0){
if(amount > this.lastDamage){
amount -= this.lastDamage
}else return
}
this.health -= amount
this.harmEffect = 30
this.lastDamage = prev
if(this.hurtSound){
let sound = this.hurtSound
if(Array.isArray(sound)) sound = sound[Math.floor(Math.random()*sound.length)]
this.world.playSound(this.x,this.y,this.z, sound)
}
}
onhit(damage,remote, vx,vz, from){
if(!remote) this.world.sendAll({
type:"entEvent",event:"damageMob",id:this.id,
data:{damage, vx,vz, from}
})
this.panick = 60
if(!this.path) this.randomPath()
this.world.sendAllInChunk({type:"entEvent",event:"sit",id:this.id, data:this.sitting},this.chunkX,this.chunkZ,this.chunkDimension)
this.sitting = false
this.damage(damage,vx,min(max(0.5-this.vely,0),0.5),vz)
setTarget:if(this.hostile){
if(this.owner){
let owner = getPlayerByUsername(this.owner,this.world)
if(from === owner.username) break setTarget
}
this.target = from || null
}
}
}
entities[entities.length] = class Cow extends Mob{
static name2 = "Cow"
drop = [blockIds.rawBeef]
dropAmount = [1,3]
saySound = ["entity.cow.say1","entity.cow.say2","entity.cow.say3","entity.cow.say4"]
stepSound = ["entity.cow.step1","entity.cow.step2","entity.cow.step3","entity.cow.step4"]
hurtSound = ["entity.cow.hurt1","entity.cow.hurt2","entity.cow.hurt3"]
defaultName = "Cow"
constructor(x,y,z){
super(x, y, z, 0, 0, 0, 0, 0, 1, 21/16, 1, null,null, null, 300000)
var pix = 1/16
this.offsetY = pix*9.5
this.addPart("frontRightLeg",null,null,pix*-4,pix*-8,pix*7,1,1,1,0,0)
this.addPart("frontLeftLeg",null,null,pix*4,pix*-8,pix*7,1,1,1,0,0)
this.addPart("backRightLeg",null,null,pix*-4,pix*-8,pix*-6,1,1,1,0,0)
this.addPart("backLeftLeg",null,null,pix*4,pix*-8,pix*-6,1,1,1,0,0)
this.addPart("head",null,null,0,0,pix*9,1,1,1,0,0)
this.health = 10
this.prevWalking = false
this.walkStart = 0
this.walkRot = 0
this.attracts = [blockIds.wheat]
}
update(){
this.mobUpdate(now)
if(this.prevWalking !== this.walking){
this.prevWalking = this.walking
this.walkStart = now
}
var walkRotTarget = 0
if(this.walking){
if(this.panick > 0) walkRotTarget = sin(((now - this.walkStart) / 500) * Math.PI) * Math.PI / 4
else walkRotTarget = sin(((now - this.walkStart) / 1000) * Math.PI) * Math.PI / 4
}
this.walkRot = lerp(0.5,this.walkRot,walkRotTarget)
this.parts.frontLeftLeg.rx = this.walkRot
this.parts.frontRightLeg.rx = -this.walkRot
this.parts.backLeftLeg.rx = this.walkRot
this.parts.backRightLeg.rx = -this.walkRot
if(this.targetEnt || this.attractEnt){
let {x,y,z} = this.targetEnt || this.attractEnt
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.parts.head.ry2 = -(this.yaw - yaw)
if(this.parts.head.ry2 - this.parts.head.pry2 > Math.PI) this.parts.head.pry2 += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry2 - this.parts.head.pry2 < -Math.PI) this.parts.head.pry2 -= Math.PId
let adjacent = dist2(this.x,this.z,x,z)
this.parts.head.rx = Math.PId - atan2(y - (this.y+this.parts.head.y), adjacent)
this.parts.head.ry = 0
}else if(this.path){
let i = this.path.length - 3
let x = this.path[i], y = this.path[i+1], z = this.path[i+2]
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.parts.head.ry = -(this.yaw - yaw)
if(this.parts.head.ry - this.parts.head.pry > Math.PI) this.parts.head.pry += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry - this.parts.head.pry < -Math.PI) this.parts.head.pry -= Math.PId
this.parts.head.rx = this.parts.head.ry2 = 0
}else if(this.spinTarget){
let yaw = this.spinTarget
this.parts.head.ry = -(this.yaw - yaw)
if(this.parts.head.ry - this.parts.head.pry > Math.PI) this.parts.head.pry += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry - this.parts.head.pry < -Math.PI) this.parts.head.pry -= Math.PId
this.parts.head.rx = this.parts.head.ry2 = 0
}
}
}
entities[entities.length] = class Pig extends Mob{
static name2 = "Pig"
drop = [blockIds.rawPorkchop]
dropAmount = [1,3]
saySound = ["entity.pig.say1","entity.pig.say2","entity.pig.say3"]
stepSound = ["entity.pig.step1","entity.pig.step2","entity.pig.step3","entity.pig.step4","entity.pig.step5"]
deathSound = "entity.pig.death"
defaultName = "Pig"
constructor(x,y,z){
super(x, y, z, 0, 0, 0, 0, 0, 1, 1, 1, null,null, null, 300000)
var pix = 1/16
this.offsetY = pix*6
this.addPart("frontRightLeg",null,null,pix*-3,pix*-8,pix*5,1,1,1,0,0)
this.addPart("frontLeftLeg",null,null,pix*3,pix*-8,pix*5,1,1,1,0,0)
this.addPart("backRightLeg",null,null,pix*-3,pix*-8,pix*-7,1,1,1,0,0)
this.addPart("backLeftLeg",null,null,pix*3,pix*-8,pix*-7,1,1,1,0,0)
this.addPart("head",null,null,0,pix*-2,pix*10,1,1,1,0,0)
this.health = 10
this.prevWalking = false
this.walkStart = 0
this.walkRot = 0
this.attracts = [blockIds.carrot, blockIds.potato]
}
update(){
this.mobUpdate(now)
if(this.prevWalking !== this.walking){
this.prevWalking = this.walking
this.walkStart = now
}
var walkRotTarget = 0
if(this.walking){
if(this.panick > 0) walkRotTarget = sin(((now - this.walkStart) / 500) * Math.PI) * Math.PI / 4
else walkRotTarget = sin(((now - this.walkStart) / 1000) * Math.PI) * Math.PI / 4
}
this.walkRot = lerp(0.5,this.walkRot,walkRotTarget)
this.parts.frontLeftLeg.rx = this.walkRot
this.parts.frontRightLeg.rx = -this.walkRot
this.parts.backLeftLeg.rx = this.walkRot
this.parts.backRightLeg.rx = -this.walkRot
if(this.targetEnt || this.attractEnt){
let {x,y,z} = this.targetEnt || this.attractEnt
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.parts.head.ry2 = -(this.yaw - yaw)
if(this.parts.head.ry2 - this.parts.head.pry2 > Math.PI) this.parts.head.pry2 += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry2 - this.parts.head.pry2 < -Math.PI) this.parts.head.pry2 -= Math.PId
let adjacent = dist2(this.x,this.z,x,z)
this.parts.head.rx = Math.PId - atan2(y - (this.y+this.parts.head.y), adjacent)
this.parts.head.ry = 0
}else if(this.path){
let i = this.path.length - 3
let x = this.path[i], y = this.path[i+1], z = this.path[i+2]
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.parts.head.ry = -(this.yaw - yaw)
if(this.parts.head.ry - this.parts.head.pry > Math.PI) this.parts.head.pry += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry - this.parts.head.pry < -Math.PI) this.parts.head.pry -= Math.PId
this.parts.head.rx = this.parts.head.ry2 = 0
}else if(this.spinTarget){
let yaw = this.spinTarget
this.parts.head.ry = -(this.yaw - yaw)
if(this.parts.head.ry - this.parts.head.pry > Math.PI) this.parts.head.pry += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry - this.parts.head.pry < -Math.PI) this.parts.head.pry -= Math.PId
this.parts.head.rx = this.parts.head.ry2 = 0
}
}
}
entities[entities.length] = class Creeper extends Mob{
static name2 = "Creeper"
drop = [blockIds.gunpowder]
dropAmount = [0,2]
experience = 5
hurtSound = ["entity.creeper.say1","entity.creeper.say2","entity.creeper.say3","entity.creeper.say4"]
deathSound = "entity.creeper.death"
defaultName = "Creeper"
constructor(x,y,z){
super(x, y, z, 0, 0, 0, 0, 0, 0.5, 26/16, 0.5, null,null, null, 300000)
var pix = 1/16
this.offsetY = pix*-1
this.addPart("frontRightLeg",null,null,pix*-2,pix*-6,pix*4,1,1,1,0,0)
this.addPart("frontLeftLeg",null,null,pix*2,pix*-6,pix*4,1,1,1,0,0)
this.addPart("backRightLeg",null,null,pix*-2,pix*-6,pix*-4,1,1,1,0,0)
this.addPart("backLeftLeg",null,null,pix*2,pix*-6,pix*-4,1,1,1,0,0)
this.addPart("head",null,null,0,pix*10,0,1,1,1,0,0)
this.health = 10
this.prevWalking = false
this.walkStart = 0
this.walkRot = 0
this.hostile = true
this.minFollowDist = 3
this.maxFollowDist = this.detectionDist = 16
this.timerStart = 0
this.explodeAmount = 0
this.timeLimit = 30
}
explode(){
var x = round(this.x), y = round(this.y), z = round(this.z)
this.world.explode(x,y,z,3, this.liquid || !worldSettings.tntExplode, this.dimension)
}
update(){
this.mobUpdate(now)
if(this.prevWalking !== this.walking){
this.prevWalking = this.walking
this.walkStart = now
}
var walkRotTarget = 0
if(this.walking){
if(this.panick > 0) walkRotTarget = sin(((now - this.walkStart) / 500) * Math.PI) * Math.PI / 4
else walkRotTarget = sin(((now - this.walkStart) / 1000) * Math.PI) * Math.PI / 4
}
this.walkRot = lerp(0.5,this.walkRot,walkRotTarget)
this.parts.frontLeftLeg.rx = this.walkRot
this.parts.frontRightLeg.rx = -this.walkRot
this.parts.backLeftLeg.rx = this.walkRot
this.parts.backRightLeg.rx = -this.walkRot
if(this.targetEnt){
let {x,y,z} = this.targetEnt
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.parts.head.ry2 = -(this.yaw - yaw)
if(this.parts.head.ry2 - this.parts.head.pry2 > Math.PI) this.parts.head.pry2 += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry2 - this.parts.head.pry2 < -Math.PI) this.parts.head.pry2 -= Math.PId
let adjacent = dist2(this.x,this.z,x,z)
this.parts.head.rx = Math.PId - atan2(y - (this.y+this.parts.head.y), adjacent)
this.parts.head.ry = 0
}else if(this.path){
let i = this.path.length - 3
let x = this.path[i], y = this.path[i+1], z = this.path[i+2]
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.parts.head.ry = -(this.yaw - yaw)
if(this.parts.head.ry - this.parts.head.pry > Math.PI) this.parts.head.pry += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry - this.parts.head.pry < -Math.PI) this.parts.head.pry -= Math.PId
this.parts.head.rx = this.parts.head.ry2 = 0
}else if(this.spinTarget){
let yaw = this.spinTarget
this.parts.head.ry = -(this.yaw - yaw)
if(this.parts.head.ry - this.parts.head.pry > Math.PI) this.parts.head.pry += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry - this.parts.head.pry < -Math.PI) this.parts.head.pry -= Math.PId
this.parts.head.rx = this.parts.head.ry2 = 0
}
let d = this.targetEnt && max(abs(this.targetEnt.x-this.x),abs(this.targetEnt.y-this.y),abs(this.targetEnt.z-this.z))
if(this.targetEnt && d<=this.minFollowDist){
if(!this.explodeAmount){
this.timerStart = now
this.world.playSound(this.x,this.y,this.z, "entity.tnt.fuse", 0)
}
this.explodeAmount++
if(this.explodeAmount > 20) this.explodeAmount = 20
}else if(this.explodeAmount) this.explodeAmount--
this.shader = 0, this.extraSize = 0
if(this.explodeAmount>0){
var i = Math.floor((now - this.timerStart) / 125)
if(!(i%2)){
this.shader = 1
}
if((now - this.timerStart) / tickTime >= this.timeLimit - 10){
//get bigger
this.extraSize = min(-((this.timeLimit - 10) - ((now - this.timerStart) / tickTime)) / 40,0.25)
this.shader = 1
}
if((now - this.timerStart) / tickTime >= this.timeLimit){
this.canDespawn = true
this.explode()
}
}
}
forceExplode(remote){
this.explodeAmount = 100
this.timerStart = now
if(!remote){
this.world.sendAllInChunk({type:"entEvent",event:"creeperForceExplode",id:this.id},this.chunkX,this.chunkZ,this.chunkDimension)
}
}
}
entities[entities.length] = class Sheep extends Mob{
static name2 = "Sheep"
drop = [blockIds.rawMutton]
dropAmount = [1,2]
saySound = ["entity.sheep.say1","entity.sheep.say2","entity.sheep.say3"]
hurtSound = ["entity.sheep.say1","entity.sheep.say2","entity.sheep.say3"]
stepSound = ["entity.sheep.step1","entity.sheep.step2","entity.sheep.step3","entity.sheep.step4","entity.sheep.step5"]
defaultName = "Sheep"
constructor(x,y,z, color, wool){
super(x, y, z, 0, 0, 0, 0, 0, 1, 1, 1, null,null, 0, 300000, "vao")
var pix = 1/16
this.offsetY = pix*7
this.addPart("frontRightLeg",null,null,pix*-3,pix*-3,pix*5,1,1,1,0,0)
this.addPart("frontLeftLeg",null,null,pix*3,pix*-3,pix*5,1,1,1,0,0)
this.addPart("backRightLeg",null,null,pix*-3,pix*-3,pix*-7,1,1,1,0,0)
this.addPart("backLeftLeg",null,null,pix*3,pix*-3,pix*-7,1,1,1,0,0)
this.addPart("head",null,null,0,pix*4,pix*10,1,1,1,0,0)
this.health = 10
this.prevWalking = false
this.walkStart = 0
this.walkRot = 0
this.fur = true
this.prevFur = true
this.eating = 0
this.color = color
this.wool = wool
if(!color){
let r = rand(100), dye
if(r > 50) dye = "white"
else if(r > 35) dye = "lightGray"
else if(r > 20) dye = "gray"
else if(r > 5) dye = "black"
else if(r > 1) dye = "brown"
else dye = "pink"
this.color = colors.dye[dye].slice()
this.wool = dye+"Wool"
}
this.attracts = [blockIds.wheat]
}
shear(){
if(!this.fur) return
this.fur = false
this.world.addItems(this.x,this.y,this.z,this.dimension,0,0,0,blockIds[this.wool],true,round(rand(1,3)))
this.world.sendAllInChunk({type:"entEvent",event:"sheepFur",data:false,id:this.id},this.chunkX,this.chunkZ,this.chunkDimension)
this.world.playSound(this.x,this.y,this.z, "entity.sheep.shear")
}
ondie(){
this.world.addItems(this.x,this.y,this.z,this.dimension,0,0,0,blockIds[this.wool],true,round(rand(1,2)))
}
onclick(holding,replaceItem,useDurability,minusOne){
if(holding.dye){
this.color = colors.dye[holding.dye].slice()
this.wool = holding.dye+"Wool"
if(multiplayer) send({type:"entEvent",event:"sheepColor",data:{color:this.color,wool:this.wool},id:this.id})
}
}
additionalAI(now){
if(!this.eating && this.standingOn === blockIds.grass && rand() > 0.999){
this.eating = 1
this.world.sendAllInChunk({type:"entEvent",event:"sheepEat",id:this.id},this.chunkX,this.chunkZ,this.chunkDimension)
}
if(this.eating && this.standingOn !== blockIds.grass) this.eating = 0
if(this.eating && ++this.eating > 40){
this.eating = 0
this.world.setBlock(round(this.x),floor(this.y-this.height/2),round(this.z),blockIds.dirt,false,false,false,false,this.dimension)
this.fur = true
this.world.sendAllInChunk({type:"entEvent",event:"sheepFur",data:true,id:this.id},this.chunkX,this.chunkZ,this.chunkDimension)
this.world.blockParticles(this.standingOn,round(this.x),floor(this.y-this.height/2)+0.5,round(this.z),30, "break",this.dimension)
}
}
update(){
this.mobUpdate(now)
if(this.prevWalking !== this.walking){
this.prevWalking = this.walking
this.walkStart = now
}
var walkRotTarget = 0
if(this.walking){
if(this.panick > 0) walkRotTarget = sin(((now - this.walkStart) / 500) * Math.PI) * Math.PI / 4
else walkRotTarget = sin(((now - this.walkStart) / 1000) * Math.PI) * Math.PI / 4
}
this.walkRot = lerp(0.5,this.walkRot,walkRotTarget)
this.parts.frontLeftLeg.rx = this.walkRot
this.parts.frontRightLeg.rx = -this.walkRot
this.parts.backLeftLeg.rx = this.walkRot
this.parts.backRightLeg.rx = -this.walkRot
if(this.targetEnt || this.attractEnt){
let {x,y,z} = this.targetEnt || this.attractEnt
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.parts.head.ry2 = -(this.yaw - yaw)
if(this.parts.head.ry2 - this.parts.head.pry2 > Math.PI) this.parts.head.pry2 += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry2 - this.parts.head.pry2 < -Math.PI) this.parts.head.pry2 -= Math.PId
let adjacent = dist2(this.x,this.z,x,z)
this.parts.head.rx = Math.PId - atan2(y - (this.y+this.parts.head.y), adjacent)
this.parts.head.ry = 0
}else if(this.path){
let i = this.path.length - 3
let x = this.path[i], y = this.path[i+1], z = this.path[i+2]
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.parts.head.ry = -(this.yaw - yaw)
if(this.parts.head.ry - this.parts.head.pry > Math.PI) this.parts.head.pry += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry - this.parts.head.pry < -Math.PI) this.parts.head.pry -= Math.PId
this.parts.head.rx = this.parts.head.ry2 = 0
}else if(this.spinTarget){
let yaw = this.spinTarget
this.parts.head.ry = -(this.yaw - yaw)
if(this.parts.head.ry - this.parts.head.pry > Math.PI) this.parts.head.pry += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry - this.parts.head.pry < -Math.PI) this.parts.head.pry -= Math.PId
this.parts.head.rx = this.parts.head.ry2 = 0
}
if(this.eating){
if(this.parts.head.y > this.parts.head.originalY - 0.5){
this.parts.head.y -= 0.05
}else{
this.parts.head.rx = (sin(((now - this.spawn) / 250) * Math.PI) * Math.PI / 8)+Math.PI4
}
}else if(this.parts.head.y < this.parts.head.originalY){
this.parts.head.y += 0.05
this.parts.head.rx = 0
if(this.parts.head.y > this.parts.head.originalY) this.parts.head.y = this.parts.head.originalY
}
if(this.fur !== this.prevFur){
this.prevFur = this.fur
}
}
}
entities[entities.length] = class Chicken extends Mob{
static name2 = "Chicken"
drop = [blockIds.rawChicken,blockIds.feather]
saySound = ["entity.chicken.say1","entity.chicken.say2","entity.chicken.say3"]
stepSound = ["entity.chicken.step1","entity.chicken.step2"]
hurtSound = ["entity.chicken.hurt1","entity.chicken.hurt2"]
defaultName = "Chicken"
constructor(x,y,z){
var pix = 1/16
super(x, y, z, 0, 0, 0, 0, 0, 0.5, pix*11, 0.5, null,null, null, 300000)
this.offsetY = pix*2.5
this.addPart("leftWing",null,null,pix*3.5,pix*3,0,1,1,1,0,0)
this.addPart("rightWing",null,null,pix*-3.5,pix*3,0,1,1,1,0,0)
this.addPart("rightLeg",null,null,pix*-1.5,pix*-3,0,1,1,1,0,0)
this.addPart("leftLeg",null,null,pix*1.5,pix*-3,0,1,1,1,0,0)
this.addPart("head",null,null,0,pix*4,pix*4.5,1,1,1,0,0)
this.health = 4
this.prevWalking = false
this.walkStart = 0
this.walkRot = 0
this.attracts = [blockIds.beetrootSeeds, blockIds.tomatoSeeds, blockIds.pumpkinSeeds, blockIds.melonSeeds, blockIds.wheatSeeds]
}
additionalAI(){
if(rand() > 0.999){
this.world.addItems(this.x,this.y,this.z,this.dimension,0,0,0,blockIds.egg,true)
this.world.playSound(this.x,this.y,this.z, "entity.chicken.plop")
}
}
update(){
this.mobUpdate(now)
if(this.vely < 0){
this.vely *= 0.5
this.lastY = this.y
}
if(this.vely < 0 || this.liquid){
let rot = sin(((now - this.walkStart) / 125) * Math.PI) * Math.PI / 4 + Math.PI2
this.parts.leftWing.rz = rot
this.parts.rightWing.rz = -rot
}else{
this.parts.leftWing.rz = this.parts.rightWing.rz = 0
}
if(this.prevWalking !== this.walking){
this.prevWalking = this.walking
this.walkStart = now
}
var walkRotTarget = 0
if(this.walking){
if(this.panick > 0) walkRotTarget = sin(((now - this.walkStart) / 500) * Math.PI) * Math.PI / 4
else walkRotTarget = sin(((now - this.walkStart) / 1000) * Math.PI) * Math.PI / 4
}
this.walkRot = lerp(0.5,this.walkRot,walkRotTarget)
this.parts.leftLeg.rx = this.walkRot
this.parts.rightLeg.rx = -this.walkRot
if(this.targetEnt || this.attractEnt){
let {x,y,z} = this.targetEnt || this.attractEnt
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.parts.head.ry2 = -(this.yaw - yaw)
if(this.parts.head.ry2 - this.parts.head.pry2 > Math.PI) this.parts.head.pry2 += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry2 - this.parts.head.pry2 < -Math.PI) this.parts.head.pry2 -= Math.PId
let adjacent = dist2(this.x,this.z,x,z)
this.parts.head.rx = Math.PId - atan2(y - (this.y+this.parts.head.y), adjacent)
this.parts.head.ry = 0
}else if(this.path){
let i = this.path.length - 3
let x = this.path[i], y = this.path[i+1], z = this.path[i+2]
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.parts.head.ry = -(this.yaw - yaw)
if(this.parts.head.ry - this.parts.head.pry > Math.PI) this.parts.head.pry += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry - this.parts.head.pry < -Math.PI) this.parts.head.pry -= Math.PId
this.parts.head.rx = this.parts.head.ry2 = 0
}else if(this.spinTarget){
let yaw = this.spinTarget
this.parts.head.ry = -(this.yaw - yaw)
if(this.parts.head.ry - this.parts.head.pry > Math.PI) this.parts.head.pry += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry - this.parts.head.pry < -Math.PI) this.parts.head.pry -= Math.PId
this.parts.head.rx = this.parts.head.ry2 = 0
}
}
}
entities[entities.length] = class Zombie extends Mob{
static name2 = "Zombie"
drop = [blockIds.rottenFlesh]
dropAmount = [0,3]
experience = 5
saySound = ["entity.zombie.say1","entity.zombie.say2","entity.zombie.say3"]
stepSound = ["entity.zombie.step1","entity.zombie.step2","entity.zombie.step3","entity.zombie.step4","entity.zombie.step5"]
hurtSound = ["entity.zombie.hurt1","entity.zombie.hurt2"]
deathSound = "entity.zombie.death"
defaultName = "Zombie"
constructor(x,y,z){
super(x, y, z, 0, 0, 0, 0, 0, 1, 2, 1, null,null, null, 300000)
var pix = 1/16
this.offsetY = pix*2
this.addPart("rightLeg",null,null,pix*-2,pix*-6,0,1,1,1,0,0)
this.addPart("leftLeg",null,null,pix*2,pix*-6,0,1,1,1,0,0)
this.addPart("rightArm",null,null,pix*-6,pix*6,pix*0,1,1,1,0,0)
this.addPart("leftArm",null,null,pix*6,pix*6,pix*0,1,1,1,0,0)
this.addPart("head",null,null,0,pix*10,0,1,1,1,0,0)
this.health = 20
this.prevWalking = false
this.walkStart = 0
this.walkRot = 0
this.hostile = true
this.minFollowDist = 1
this.maxFollowDist = 35
this.detectionDist = 17.5
this.attackStrength = 3
this.maxAttackCooldown = 20
}
killMessage(username){return username+" died from some small punches from a Zombie."}
update(){
this.mobUpdate(now)
if(!this.liquid && this.world.getLight(round(this.x), round(this.y), round(this.z), 0, this.dimension)*this.world.skyLight > 11){
this.burnTimer += 0.2
}
if(this.prevWalking !== this.walking){
this.prevWalking = this.walking
this.walkStart = now
}
var walkRotTarget = 0
if(this.walking){
if(this.panick > 0) walkRotTarget = sin(((now - this.walkStart) / 500) * Math.PI) * Math.PI / 4
else walkRotTarget = sin(((now - this.walkStart) / 1000) * Math.PI) * Math.PI / 4
}
this.walkRot = lerp(0.5,this.walkRot,walkRotTarget)
this.parts.leftLeg.rx = this.walkRot
this.parts.rightLeg.rx = -this.walkRot
let pix = 1 / 16
let armRot = (sin((now - this.spawn) / 1000) / 2 + 0.5) * Math.PI / 40
this.parts.leftArm.rz = armRot
this.parts.rightArm.rz = -armRot
this.parts.leftArm.rx = this.walkRot
this.parts.rightArm.rx = -this.walkRot
if(this.targetEnt){
let offset = -(10-abs(this.attackCooldown-10))*Math.PI4/10
this.parts.leftArm.rx = -Math.PI2+offset
this.parts.rightArm.rx = -Math.PI2+offset
}else{
this.parts.leftArm.rx = this.walkRot
this.parts.rightArm.rx = -this.walkRot
}
if(this.targetEnt){
let {x,y,z} = this.targetEnt
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.parts.head.ry2 = -(this.yaw - yaw)
if(this.parts.head.ry2 - this.parts.head.pry2 > Math.PI) this.parts.head.pry2 += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry2 - this.parts.head.pry2 < -Math.PI) this.parts.head.pry2 -= Math.PId
let adjacent = dist2(this.x,this.z,x,z)
this.parts.head.rx = Math.PId - atan2(y - (this.y+this.parts.head.y), adjacent)
this.parts.head.ry = 0
}else if(this.path){
let i = this.path.length - 3
let x = this.path[i], y = this.path[i+1], z = this.path[i+2]
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.parts.head.ry = -(this.yaw - yaw)
if(this.parts.head.ry - this.parts.head.pry > Math.PI) this.parts.head.pry += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry - this.parts.head.pry < -Math.PI) this.parts.head.pry -= Math.PId
this.parts.head.rx = this.parts.head.ry2 = 0
}else if(this.spinTarget){
let yaw = this.spinTarget
this.parts.head.ry = -(this.yaw - yaw)
if(this.parts.head.ry - this.parts.head.pry > Math.PI) this.parts.head.pry += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry - this.parts.head.pry < -Math.PI) this.parts.head.pry -= Math.PId
this.parts.head.rx = this.parts.head.ry2 = 0
}
}
}
entities[entities.length] = class Skeleton extends Mob{
static name2 = "Skeleton"
drop = [blockIds.bone,blockIds.arrow]
dropAmount = [1,2]
experience = 5
saySound = ["entity.skeleton.say1","entity.skeleton.say2","entity.skeleton.say3"]
stepSound = ["entity.skeleton.step1","entity.skeleton.step2","entity.skeleton.step3","entity.skeleton.step4"]
hurtSound = ["entity.skeleton.hurt1","entity.skeleton.hurt2","entity.skeleton.hurt3","entity.skeleton.hurt4"]
deathSound = "entity.skeleton.death"
defaultName = "Skeleton"
constructor(x,y,z){
super(x, y, z, 0, 0, 0, 0, 0, 0.75, 2, 0.75, null,null, null, 300000)
var pix = 1/16
this.offsetY = pix*2
this.addPart("rightLeg",null,null,pix*-2,pix*-6,0,1,1,1,0,0)
this.addPart("leftLeg",null,null,pix*2,pix*-6,0,1,1,1,0,0)
this.addPart("rightArm",null,null,pix*-5,pix*6,pix*0,1,1,1,0,0)
this.addPart("leftArm",null,null,pix*5,pix*6,pix*0,1,1,1,0,0)
this.addPart("head",null,null,0,pix*10,0,1,1,1,0,0)
this.addPart("holding",null,null,0,0,0,1,1,1,0,0,undefined,"rightArm") //changed later
this.health = 20
this.prevWalking = false
this.walkStart = 0
this.walkRot = 0
this.hostile = true
this.minFollowDist = 8
this.maxFollowDist = this.detectionDist = 16
this.holding = blockIds.bow, this.maxAttackCooldown = 20
}
updateHolding(){
let part = this.parts.holding
let pix = 1 / 16
if(blockData[this.holding].tool){
part.x = 0
part.y = pix*-12
part.z = pix*6
part.w = part.h = part.d = 1
part.rx = Math.PI / 1.25
part.ry = Math.PI * -0.5
}else if(blockData[this.holding].name === "bow"){
part.x = 0
part.y = pix*-12
part.z = 0
part.w = part.h = part.d = 1
part.rx = Math.PI / 1.25
part.ry = Math.PI * -0.5
}else if(blockData[this.holding].spyglass){
part.x = pix*2
part.y = pix*-10
part.z = 0
part.w = part.h = part.d = 1
part.rx = -this.holdRot
part.ry = 0
}else if(blockData[this.holding].item){
part.x = 0
part.y = pix*-11
part.z = pix*4
part.w = part.h = part.d = 0.5
part.rx = Math.PI2
part.ry = 0
}else if(this.holding){
part.x = 0
part.y = pix*-12
part.z = pix*3
part.w = part.h = part.d = 0.25
part.rx = 0
part.ry = Math.PI / 4
}else{
this.parts.rightArm.rx = 0
}
}
additionalAI(){
if(blockData[this.holding].name === "bow" && this.targetEnt && this.attackCooldown <= 0){
let vx = this.targetEnt.x - this.x, vy = this.targetEnt.y - this.y, vz = this.targetEnt.z - this.z
let mag = sqrt(vx*vx+vy*vy+vz*vz)
vx /= mag, vy /= mag, vz /= mag
this.world.addEntity(new entities[entityIds.Arrow](this.x+vx,this.y+vy,this.z+vz,vx,vy,vz,this.id),false,this.dimension)
this.attackCooldown = this.maxAttackCooldown
this.world.sendAllInChunk({type:"entEvent",event:"mobAttack",id:this.id},this.chunkX,this.chunkZ,this.chunkDimension)
}
}
update(){
this.mobUpdate(now)
if(!this.liquid && this.world.getLight(round(this.x), round(this.y), round(this.z), 0, this.dimension)*this.world.skyLight > 11){
this.burnTimer += 0.2
}
if(this.prevWalking !== this.walking){
this.prevWalking = this.walking
this.walkStart = now
}
var walkRotTarget = 0
if(this.walking){
if(this.panick > 0) walkRotTarget = sin(((now - this.walkStart) / 500) * Math.PI) * Math.PI / 4
else walkRotTarget = sin(((now - this.walkStart) / 1000) * Math.PI) * Math.PI / 4
}
this.walkRot = lerp(0.5,this.walkRot,walkRotTarget)
this.parts.leftLeg.rx = this.walkRot
this.parts.rightLeg.rx = -this.walkRot
let armRot = (sin((now - this.spawn) / 1000) / 2 + 0.5) * Math.PI / 40
this.parts.leftArm.rz = armRot
this.parts.rightArm.rz = -armRot
if(this.targetEnt){
if(blockData[this.holding].name === "bow"){
this.parts.leftArm.rx = -Math.PI2
this.parts.leftArm.ry2 = -Math.PI4
this.parts.rightArm.rx = -Math.PI2
}else if(blockData[this.holding].spyglass){
this.parts.rightArm.rx = -Math.PI2+this.holdRot
}else{
this.parts.leftArm.rx = this.parts.rightArm.rx = -Math.PI2
}
}else{
this.parts.leftArm.rx = this.walkRot
this.parts.rightArm.rx = -this.walkRot
}
if(this.targetEnt){
let {x,y,z} = this.targetEnt
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.parts.head.ry2 = -(this.yaw - yaw)
if(this.parts.head.ry2 - this.parts.head.pry2 > Math.PI) this.parts.head.pry2 += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry2 - this.parts.head.pry2 < -Math.PI) this.parts.head.pry2 -= Math.PId
let adjacent = dist2(this.x,this.z,x,z)
this.parts.head.rx = Math.PId - atan2(y - (this.y+this.parts.head.y), adjacent)
this.parts.head.ry = 0
}else if(this.path){
let i = this.path.length - 3
let x = this.path[i], y = this.path[i+1], z = this.path[i+2]
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.parts.head.ry = -(this.yaw - yaw)
if(this.parts.head.ry - this.parts.head.pry > Math.PI) this.parts.head.pry += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry - this.parts.head.pry < -Math.PI) this.parts.head.pry -= Math.PId
this.parts.head.rx = this.parts.head.ry2 = 0
}else if(this.spinTarget){
let yaw = this.spinTarget
this.parts.head.ry = -(this.yaw - yaw)
if(this.parts.head.ry - this.parts.head.pry > Math.PI) this.parts.head.pry += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry - this.parts.head.pry < -Math.PI) this.parts.head.pry -= Math.PId
this.parts.head.rx = this.parts.head.ry2 = 0
}
}
}
entities[entities.length] = class Spider extends Mob{
static name2 = "Spider"
saySound = ["entity.spider.say1","entity.spider.say2","entity.spider.say3","entity.spider.say4"]
stepSound = ["entity.spider.step1","entity.spider.step2","entity.spider.step3","entity.spider.step4"]
deathSound = "entity.spider.death"
drop = [blockIds.string,blockIds.spiderEye]
dropAmount = [0,2]
experience = 5
constructor(x,y,z,cave){
let s = cave ? 0.7 : 1
super(x, y, z, 0, 0, 0, 0, 0, s, s, s, null,null, null, 300000)
this.noScale = false
var pix = 1/16
this.offsetY = pix*2
let legRot = Math.PI/8
this.addPart("rightLeg0",null,null,pix*-3,0,0,1,1,1,0,0,legRot)
this.addPart("rightLeg1",null,null,pix*-3,0,0,1,1,1,0,0,legRot)
this.addPart("rightLeg2",null,null,pix*-3,0,0,1,1,1,0,0,legRot)
this.addPart("rightLeg3",null,null,pix*-3,0,0,1,1,1,0,0,legRot)
this.addPart("leftLeg0",null,null,pix*3,0,0,1,1,1,0,0,-legRot)
this.addPart("leftLeg1",null,null,pix*3,0,0,1,1,1,0,0,-legRot)
this.addPart("leftLeg2",null,null,pix*3,0,0,1,1,1,0,0,-legRot)
this.addPart("leftLeg3",null,null,pix*3,0,0,1,1,1,0,0,-legRot)
this.addPart("head",null,null,0,0,pix*7,1,1,1,0,0)
this.fur = !!cave
this.defaultName = cave ? "Cave Spider" : "Spider"
this.health = 16
this.prevWalking = false
this.walkStart = 0
this.walkRot = 0
this.canClimb = true
this.hostile = true
this.minFollowDist = 1.5
this.maxFollowDist = 16
this.detectionDist = -1
this.attackStrength = 2
this.maxAttackCooldown = 20
}
killMessage(username){return username+" died from a tiny little spider."}
update(){
this.mobUpdate(now)
if(this.prevWalking !== this.walking){
this.prevWalking = this.walking
this.walkStart = now
}
var walkRotTarget = 0
if(this.walking){
if(this.panick > 0) walkRotTarget = sin(((now - this.walkStart) / 125) * Math.PI) * 0.1
else walkRotTarget = sin(((now - this.walkStart) / 250) * Math.PI) * 0.1
}
this.walkRot = lerp(0.5,this.walkRot,walkRotTarget)
this.parts.leftLeg0.ry = this.walkRot+Math.PI2*1.3
this.parts.leftLeg1.ry = -this.walkRot+Math.PI2*1.1
this.parts.leftLeg2.ry = this.walkRot+Math.PI2*0.9
this.parts.leftLeg3.ry = -this.walkRot+Math.PI2*0.6
this.parts.rightLeg0.ry = -this.walkRot-Math.PI2*1.3
this.parts.rightLeg1.ry = this.walkRot-Math.PI2*1.1
this.parts.rightLeg2.ry = -this.walkRot-Math.PI2*0.9
this.parts.rightLeg3.ry = this.walkRot-Math.PI2*0.6
if(this.targetEnt){
let {x,y,z} = this.targetEnt
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.parts.head.ry2 = -(this.yaw - yaw)
if(this.parts.head.ry2 - this.parts.head.pry2 > Math.PI) this.parts.head.pry2 += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry2 - this.parts.head.pry2 < -Math.PI) this.parts.head.pry2 -= Math.PId
let adjacent = dist2(this.x,this.z,x,z)
this.parts.head.rx = Math.PId - atan2(y - (this.y+this.parts.head.y), adjacent)
this.parts.head.ry = 0
}else if(this.path){
let i = this.path.length - 3
let x = this.path[i], y = this.path[i+1], z = this.path[i+2]
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.parts.head.ry = -(this.yaw - yaw)
if(this.parts.head.ry - this.parts.head.pry > Math.PI) this.parts.head.pry += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry - this.parts.head.pry < -Math.PI) this.parts.head.pry -= Math.PId
this.parts.head.rx = this.parts.head.ry2 = 0
}else if(this.spinTarget){
let yaw = this.spinTarget
this.parts.head.ry = -(this.yaw - yaw)
if(this.parts.head.ry - this.parts.head.pry > Math.PI) this.parts.head.pry += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry - this.parts.head.pry < -Math.PI) this.parts.head.pry -= Math.PId
this.parts.head.rx = this.parts.head.ry2 = 0
}
}
}
entities[entities.length] = class Wolf extends Mob{
static name2 = "Wolf"
defaultName = "Wolf"
constructor(x,y,z){
super(x, y, z, 0, 0, 0, 0, 0, 0.6, 0.8, 0.6, null,null, null, Infinity, "vao")
var pix = 1/16
this.defaultOffsetY = pix*4.5
this.addPart("head",null,null,0,0,pix*10,1,1,1,0,0)
this.addPart("frontRightLeg",null,null,pix*-1.5,pix*-3,pix*5,1,1,1,0,0)
this.addPart("frontLeftLeg",null,null,pix*1.5,pix*-3,pix*5,1,1,1,0,0)
this.addPart("backRightLeg",null,null,pix*-1.5,pix*-3,pix*-6,1,1,1,0,0)
this.addPart("backLeftLeg",null,null,pix*1.5,pix*-3,pix*-6,1,1,1,0,0)
this.addPart("tail",null,null,0,0,pix*-8,1,1,1,Math.PI2,0)
this.addPart("collar",null,null,0,0,pix*6.1,1,1,1,0,0)
this.health = 8
this.prevWalking = false
this.walkStart = 0
this.walkRot = 0
this.hostile = true
this.minFollowDist = 1.5
this.maxFollowDist = 16
this.detectionDist = 16
this.attackStrength = 4
this.maxAttackCooldown = 20
this.attacks = ["Sheep","Rabbit","Fox","Skeleton"]
this.prevTarget = null
this.attracts = [blockIds.bone]
this.wetStuff = 0
this.tame = false
this.prevTame = false
this.color = colors.dye.red.slice()
}
feed(id){
if(id === blockIds.bone){
if(this.tame){
let prev = this.health
this.health++
if(this.health > 20) this.health = 20
if(multiplayer) send({type:"entEvent",event:"healthAdd",id:this.id,data:this.health-prev})
}else{
if(rand(3) > 1){
if(!settings.performanceFast) for(let i=0; i<10; i++){
world.addParticle(new entities[entityIds.SmokeParticle](this.x+rand()-0.5,this.y+rand()-0.5,this.z+rand()-0.5),this.dimension)
}
if(multiplayer) send({
type:"particles",particleType:"smokeCube",
x:this.x,y:this.y,z:this.z,dimension:this.dimension,amount:10
})
}else{
for(let i=0; i<10; i++){
world.addParticle(new entities[entityIds.HeartParticle](this.x+rand()-0.5,this.y+rand()-0.5,this.z+rand()-0.5),this.dimension)
}
if(multiplayer) send({
type:"particles",particleType:"hearts",
x:this.x,y:this.y,z:this.z,dimension:this.dimension,amount:10
})
world.addEntity(new entities[entityIds.ExperienceOrb](this.x,this.y,this.z, rand(1,7)),false,p.dimension)
this.tame = true
this.health *= 20/8
this.owner = username
if(multiplayer) send({type:"entEvent",event:"tame",id:this.id,data:username})
}
}
}
}
onclick(holding,replaceItem,useDurability,minusOne){
if(holding.dye){
this.color = colors.dye[holding.dye].slice()
if(multiplayer) send({type:"entEvent",event:"wolfCollarColor",data:this.color,id:this.id})
this.updateShape()
}else if(holding === blockIds.bone){}else if(this.tame){
this.sitting = !this.sitting
if(multiplayer) send({type:"entEvent",event:"sit",id:this.id, data:this.sitting})
}
}
killMessage(username){return username+" got bited by a wolf."}
additionalAI(){
let owner = this.owner && getPlayerByUsername(this.owner,this.world)
if(!owner || owner.die || owner.hidden) return
let d = max(abs(this.x-owner.x),abs(this.y-owner.y),abs(this.z-owner.z))
if(d > 16 && !this.sitting){
this.target = null
let x = round(this.x), y = round(this.y), z = round(this.z)
let closest = Infinity, cx, cy, cz
for(let x2=-5;x2<5;x2++) for(let z2=-5;z2<5;z2++) for(let y2=-5;y2<5;y2++){
if(!blockData[world.getBlock(owner.x+x2,owner.y+y2,owner.z+z2)].solid){
let dist = max(abs(x2),abs(y2),abs(z2))
if(dist < closest && blockData[world.getBlock(owner.x+x2,owner.y+y2-1,owner.z+z2)].solid) closest = dist, cx = x2, cy = y2, cz = z2
}
}
if(isFinite(closest)){
this.x = owner.x+cx
this.y = owner.y+cy
this.z = owner.z+cz
this.path = null
this.lastY = 0
this.world.sendAll({type:"entEvent",event:"tp",id:this.id, data:{x:this.x,y:this.y,z:this.z}})
}
}else if(d > 8 && !this.sitting){
let path = this.findPath(round(this.x),round(this.y-this.height/2),round(this.z),round(owner.x),round(owner.y),round(owner.z))
if(path){
path.splice(0,3)
this.path = path
}
}
}
update(){
this.mobUpdate(now)
let pix = 1 / 16
if(this.prevWalking !== this.walking){
this.prevWalking = this.walking
this.walkStart = now
}
var walkRotTarget = 0
if(this.walking){
if(this.panick > 0) walkRotTarget = sin(((now - this.walkStart) / 500) * Math.PI) * Math.PI / 4
else walkRotTarget = sin(((now - this.walkStart) / 1000) * Math.PI) * Math.PI / 4
}
this.walkRot = lerp(0.5,this.walkRot,walkRotTarget)
if(this.sitting){
this.offsetY = this.defaultOffsetY - pix*3
this.parts.collar.rx = this.pitch2 = -Math.PI4
this.parts.frontLeftLeg.rx = -Math.PI/8
this.parts.frontRightLeg.rx = -Math.PI/8
this.parts.backLeftLeg.rx = -Math.PI2
this.parts.backRightLeg.rx = -Math.PI2
this.parts.tail.y = this.parts.tail.originalY-pix*4
this.parts.tail.z = this.parts.tail.originalZ+pix*2
this.parts.frontLeftLeg.y = this.parts.frontLeftLeg.originalY+pix*3
this.parts.frontRightLeg.y = this.parts.frontRightLeg.originalY+pix*3
this.parts.backLeftLeg.y = this.parts.backLeftLeg.originalY-pix*4
this.parts.backRightLeg.y = this.parts.backRightLeg.originalY-pix*4
this.parts.head.y = this.parts.head.originalY+pix*6
this.parts.head.z = this.parts.head.originalZ-pix*3
}else{
this.offsetY = this.defaultOffsetY
this.parts.collar.rx = this.pitch2 = 0
this.parts.frontLeftLeg.rx = this.walkRot
this.parts.frontRightLeg.rx = -this.walkRot
this.parts.backLeftLeg.rx = this.walkRot
this.parts.backRightLeg.rx = -this.walkRot
this.parts.tail.y = this.parts.tail.originalY
this.parts.tail.z = this.parts.tail.originalZ
this.parts.frontLeftLeg.y = this.parts.frontLeftLeg.originalY
this.parts.frontRightLeg.y = this.parts.frontRightLeg.originalY
this.parts.backLeftLeg.y = this.parts.backLeftLeg.originalY
this.parts.backRightLeg.y = this.parts.backRightLeg.originalY
this.parts.head.y = this.parts.head.originalY
this.parts.head.z = this.parts.head.originalZ
}
this.parts.tail.rx = this.target ? Math.PI2 : this.health/20*Math.PI
if(this.targetEnt || this.attractEnt){
let {x,y,z} = this.targetEnt || this.attractEnt
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.parts.head.ry2 = -(this.yaw - yaw)
if(this.parts.head.ry2 - this.parts.head.pry2 > Math.PI) this.parts.head.pry2 += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry2 - this.parts.head.pry2 < -Math.PI) this.parts.head.pry2 -= Math.PId
let adjacent = dist2(this.x,this.z,x,z)
this.parts.head.rx = Math.PId - atan2(y - (this.y+this.parts.head.y), adjacent)
this.parts.head.ry = 0
}else if(this.path){
let i = this.path.length - 3
let x = this.path[i], y = this.path[i+1], z = this.path[i+2]
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.parts.head.ry = -(this.yaw - yaw)
if(this.parts.head.ry - this.parts.head.pry > Math.PI) this.parts.head.pry += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry - this.parts.head.pry < -Math.PI) this.parts.head.pry -= Math.PId
this.parts.head.rx = this.parts.head.ry2 = 0
}else if(this.spinTarget){
let yaw = this.spinTarget
this.parts.head.ry = -(this.yaw - yaw)
if(this.parts.head.ry - this.parts.head.pry > Math.PI) this.parts.head.pry += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry - this.parts.head.pry < -Math.PI) this.parts.head.pry -= Math.PId
this.parts.head.rx = this.parts.head.ry2 = 0
}
if(this.prevTarget !== this.target || this.prevTame !== this.tame){
this.prevTarget = this.target
this.prevTame = this.tame
}
if(!this.target && !this.tame){
this.world.getEntitiesNear(this.x,this.y,this.z,this.dimension, 16, nearEntityArray)
let cd = Infinity, ctarget
for(let i of nearEntityArray){
if(i.dimension === this.dimension && i.type === this.type && i.target){
let d = max(abs(i.x-this.x),abs(i.y-this.y),abs(i.z-this.z))
if(d < 16 && d < cd) cd = d, ctarget = i.target
}
}
if(ctarget) this.target = ctarget
}
}
}
entities[entities.length] = class Blaze extends Mob{
static name2 = "Blaze"
drop = [blockIds.blazeRod]
dropAmount = [0,1]
experience = 10
saySound = ["entity.blaze.breathe1","entity.blaze.breathe2","entity.blaze.breathe3","entity.blaze.breathe4"]
hurtSound = ["entity.blaze.hit1","entity.blaze.hit2","entity.blaze.hit3","entity.blaze.hit4"]
deathSound = "entity.blaze.death"
defaultName = "Blaze"
constructor(x,y,z){
var pix = 1/16
super(x, y, z, 0, 0, 0, 0, 0, 1, pix*22, 1, null,null, null, 300000)
this.addPart("head",null,null,0,pix*10,0,1,1,1,0,0)
this.health = 20
this.hostile = true
this.minFollowDist = 1
this.maxFollowDist = 48
this.detectionDist = 48
this.attackStrength = 6
this.maxAttackCooldown = 200
this.canFly = true
}
killMessage(username){return username+" got killed by weird stuff."}
additionalAI(){
if(this.targetEnt){
if(this.attackCooldown <= 0){
this.attackCooldown = this.maxAttackCooldown
this.world.sendAll({type:"entEvent",event:"mobAttack",id:this.id})
}
if(this.attackCooldown === 20 || this.attackCooldown === 11 || this.attackCooldown === 2){
let vx = this.targetEnt.x - this.x, vy = this.targetEnt.y - this.y, vz = this.targetEnt.z - this.z
let mag = sqrt(vx*vx+vy*vy+vz*vz)
vx /= mag, vy /= mag, vz /= mag
this.world.addEntity(new entities[entityIds.SmallFireball](this.x+vx,this.y+vy,this.z+vz,vx,vy,vz,this.id),false,this.dimension)
}
}
}
update(){
this.mobUpdate(now)
if(this.burnTimer) this.burnTimer = 0
if(this.targetEnt && this.attackCooldown > 0 && this.attackCooldown < 100) this.burning = true
if(this.targetEnt){
let {x,y,z} = this.targetEnt
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.parts.head.ry2 = -(this.yaw - yaw)
if(this.parts.head.ry2 - this.parts.head.pry2 > Math.PI) this.parts.head.pry2 += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry2 - this.parts.head.pry2 < -Math.PI) this.parts.head.pry2 -= Math.PId
let adjacent = dist2(this.x,this.z,x,z)
this.parts.head.rx = Math.PId - atan2(y - (this.y+this.parts.head.y), adjacent)
this.parts.head.ry = 0
}else if(this.path){
let i = this.path.length - 3
let x = this.path[i], y = this.path[i+1], z = this.path[i+2]
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.parts.head.ry = -(this.yaw - yaw)
if(this.parts.head.ry - this.parts.head.pry > Math.PI) this.parts.head.pry += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry - this.parts.head.pry < -Math.PI) this.parts.head.pry -= Math.PId
this.parts.head.rx = this.parts.head.ry2 = 0
}else if(this.spinTarget){
let yaw = this.spinTarget
this.parts.head.ry = -(this.yaw - yaw)
if(this.parts.head.ry - this.parts.head.pry > Math.PI) this.parts.head.pry += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry - this.parts.head.pry < -Math.PI) this.parts.head.pry -= Math.PId
this.parts.head.rx = this.parts.head.ry2 = 0
}
}
}
entities[entities.length] = class Enderman extends Mob{
static name2 = "Enderman"
defaultName = "Enderman"
constructor(x,y,z){
super(x, y, z, 0, 0, 0, 0, 0, 0.75, 3, 0.75, null,null, null, 300000)
let pix = 1/16
this.offsetY = pix*13
this.addPart("rightLeg",null,null,pix*-2,pix*-6,0,1,1,1,0,0)
this.addPart("leftLeg",null,null,pix*2,pix*-6,0,1,1,1,0,0)
this.addPart("rightArm",null,null,pix*-4,pix*6,pix*0,1,1,1,0,0)
this.addPart("leftArm",null,null,pix*4,pix*6,pix*0,1,1,1,0,0)
this.addPart("head",null,null,0,pix*10,0,1,1,1,0,0)
this.health = 40
this.prevWalking = false
this.walkStart = 0
this.walkRot = 0
this.hostile = true
this.minFollowDist = 1
this.maxFollowDist = 16
this.detectionDist = 16
this.attackStrength = 7
this.maxAttackCooldown = 20
}
killMessage(username){return username+" died from Enderman."}
update(){
this.mobUpdate(now)
if(this.wet){
if(now - this.lastBlockDamage > 1000){
this.lastBlockDamage = now
this.damage(1)
}
}
if(this.prevWalking !== this.walking){
this.prevWalking = this.walking
this.walkStart = now
}
let walkRotTarget = 0
if(this.walking){
if(this.panick > 0) walkRotTarget = sin(((now - this.walkStart) / 500) * Math.PI) * Math.PI / 4
else walkRotTarget = sin(((now - this.walkStart) / 1000) * Math.PI) * Math.PI / 4
}
this.walkRot = lerp(0.5,this.walkRot,walkRotTarget)
this.parts.leftLeg.rx = this.walkRot
this.parts.rightLeg.rx = -this.walkRot
let pix = 1 / 16
let armRot = (sin((now - this.spawn) / 1000) / 2 + 0.5) * Math.PI / 40
this.parts.leftArm.rz = armRot
this.parts.rightArm.rz = -armRot
this.parts.leftArm.rx = this.walkRot
this.parts.rightArm.rx = -this.walkRot
if(this.targetEnt){
let {x,y,z} = this.targetEnt
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.parts.head.ry2 = -(this.yaw - yaw)
if(this.parts.head.ry2 - this.parts.head.pry2 > Math.PI) this.parts.head.pry2 += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry2 - this.parts.head.pry2 < -Math.PI) this.parts.head.pry2 -= Math.PId
let adjacent = dist2(this.x,this.z,x,z)
this.parts.head.rx = Math.PId - atan2(y - (this.y+this.parts.head.y), adjacent)
this.parts.head.ry = 0
}else if(this.path){
let i = this.path.length - 3
let x = this.path[i], y = this.path[i+1], z = this.path[i+2]
let yaw = Math.PId - (atan2(z - this.z, x - this.x) - Math.PI2)
this.parts.head.ry = -(this.yaw - yaw)
if(this.parts.head.ry - this.parts.head.pry > Math.PI) this.parts.head.pry += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry - this.parts.head.pry < -Math.PI) this.parts.head.pry -= Math.PId
this.parts.head.rx = this.parts.head.ry2 = 0
}else if(this.spinTarget){
let yaw = this.spinTarget
this.parts.head.ry = -(this.yaw - yaw)
if(this.parts.head.ry - this.parts.head.pry > Math.PI) this.parts.head.pry += Math.PId //prevent weird thing happening when rotation was 0 but is now 360
if(this.parts.head.ry - this.parts.head.pry < -Math.PI) this.parts.head.pry -= Math.PId
this.parts.head.rx = this.parts.head.ry2 = 0
}
}
}
let entityOrder = ['Item','BlockEntity', 'PrimedTNT', 'PrimedSuperTNT', 'PrimedUltraTNT', 'PrimedUnTNT', 'MovingBlock', 'EnderPearl', 'Snowball', 'Egg', 'SlingshotShot', 'Arrow', 'Sign', 'ItemFrame', 'ExperienceOrb', 'Cow', 'Pig', 'Creeper', 'Sheep', 'Chicken', 'Zombie', 'Skeleton', 'Spider', 'EnderDragon', 'BlockParticle', 'PoofParticle', 'FallingDustParticle', 'RedstoneParticle', 'ShockwaveParticle', 'SmokeParticle', 'NoteParticle', 'GlintParticle', 'FlameParticle', 'LavaParticle', 'DripParticle', 'SplashParticle', 'Spark', 'TextDisplay','Wolf','HeartParticle',"Blaze","SmallFireball","BlockDisplay","BeaconBeam","Enderman"]
let unorderedEntities = entities.slice()
for(let i=0; i<entities.length; i++){
entityIds[entities[i].name2] = i
}
for(let i=0; i<entityOrder.length; i++){
if(entityIds[entityOrder[i]] === undefined){
delete entities[i]
delete entityIds[entityOrder[i]]
continue
}
entities[i] = unorderedEntities[entityIds[entityOrder[i]]]
entities[i].prototype.entId = i
entities[i].prototype.type = entities[i].name2
entityIds[entities[i].name2] = i
}
console.log(entities.length,'entities and particles on server side')
class IslandGenerator {
constructor(world) {
this.world = world
this.seedSet = false;
this.seed = 0;
this.reset()
}
reset(){
this.size = 600;
this.diagonalNeighbors = true; //true if the corners are also adjacent
this.grid = [];
this.vertex = [];
this.river = [];
this.precip = [];
this.biome = [];
this.biomeBlend = [];
this.highestPoint = [0,0];
this.updates = [];
this.stage = 0;
this.changes = 0;
this.rivers = 0;
this.h = 0;
this.X = 0;
}
GetVertex(x, y) {
if (x < 0 || x >= this.size || y < 0 || y >= this.size) {return 0;}
return this.vertex[x+y*this.size];
}
GetHeight(x, y) {
x = (x+this.size/2)*0.5; y = (y+this.size/2)*0.5;
if (x < 0 || x >= this.size || y < 0 || y >= this.size) {return 5;}
return Math.round(
(this.GetVertex(Math.floor(x), Math.floor(y))+
this.GetVertex(Math.floor(x+0.5), Math.floor(y))+
this.GetVertex(Math.floor(x), Math.floor(y+0.5))+
this.GetVertex(Math.floor(x+0.5), Math.floor(y+0.5)))*0.5+5);
};
GetWater(x, y) {
if (x < 0 || x >= this.size || y < 0 || y >= this.size) {return 1;}
if (this.GetBiome(x,y) === -15099421 || this.GetBiome(x,y) === -16479791) {return 1}
return Math.sqrt(this.river[x+y*this.size]);
}
GetWaterDepth(x, y) {
x = (x+this.size/2)*0.5; y = (y+this.size/2)*0.5;
if (x < 0 || x >= this.size || y < 0 || y >= this.size) {return 1;}
var w = 0;
for (let x2 = 0; x2 < 1; x2+=0.5) {
for (let y2 = 0; y2 < 1; y2+=0.5) {
w += this.GetWater(Math.floor(x+x2),Math.floor(y+y2));
}
}
w = w/4.0;
if (w > 0.25) {
return 1;
}   else {
return 0;
}
}
GetBiome(x, y) {
if (x < 0 || x >= this.size || y < 0 || y >= this.size) {return -16479791;}
return this.biome[x+y*this.size];
}
GetBiomeType(x, y) {
x = (x+this.size/2)*0.5; y = (y+this.size/2)*0.5;
if (x < 0 || x >= this.size || y < 0 || y >= this.size) {return 1;}
return this.GetBiome(Math.floor(x),Math.floor(y));
}
GetNeighbors(x, y) {
var n = [];
if (x > 0) {
n.push({x:x-1, y:y});
if (this.diagonalNeighbors) {
if (y > 0) {
n.push({x:x-1, y:y-1});
}
if (y < this.size-1) {
n.push({x:x-1, y:y+1});
}}
}
if (x < this.size-1) {
n.push({x:x+1, y:y});
if (this.diagonalNeighbors) {
if (y > 0) {
n.push({x:x+1, y:y-1});
}
if (y < this.size-1) {
n.push({x:x+1, y:y+1});
}
}
}
if (y > 0) {
n.push({x:x, y:y-1});
}
if (y < this.size-1) {
n.push({x:x, y:y+1});
}
return n;
}
GetDown(x, y) {
var n = this.GetNeighbors(x, y);
var l = this.size;
var ld = [];
for (var i in n) {
if (this.vertex[n[i].x + n[i].y*this.size] <= l) {
if (this.vertex[n[i].x + n[i].y*this.size] === l) {
ld.push(n[i]);
}
l = this.vertex[n[i].x + n[i].y*this.size];
ld = [n[i]];
}
}
if (l <= this.vertex[x + y*this.size]) {
return ld[Math.floor(this.random(ld.length))];
}
return undefined;
}
SetSeed(seed) {
if(this.seed !== seed) this.reset()
this.seed = seed;
this.seedSet = true;
this.randomGenerator = new Marsaglia(hash(seed, 2123155232) * 210000000)
this.random = (max = 1) => this.randomGenerator.nextDouble()*max
}
async Generate() {
if(this.generating) return
this.generating = true
var nS = 0.021;
function sq(n) {return n*n}
function color(r, g, b, a) {
a = (a === undefined ? 255 : a);
g = (g === undefined ? r : g);
b = (b === undefined ? g : b);
if (a > 127) {a = -256+a;}
return b+g*256+r*65536+a*16777216;
}
while(this.stage < 10){
if (this.stage === 0) { //landmass
while (this.X < this.size) {
var x = this.X;
for (var y = 0; y < this.size; y++) {
this.grid[x +y*this.size] = 0;
this.vertex[x + y*this.size] = -1;
this.precip[x + y*this.size] = -1;
this.river[x + y*this.size] = 0;
var d = this.size/2-Math.sqrt(sq(x-this.size/2)+sq(y-this.size/2));
var islandMask = Math.sqrt(sq(this.size/2)-sq(d-this.size/2))*2/this.size;
var v = this.world.noiseProfile.noise(x*nS, y*nS, this.seed);
if (v*islandMask > 0.3) {
this.grid[x+y*this.size] = 1;
}
}
this.X++;
await yieldThread()
}
if (this.X === this.size) {
this.updates.push({type:"ocean", x:0, y:0});
}
}   else if (this.stage === 1) {    //Oceans
while (this.updates.length > 0) {
var u = this.updates.shift();
if (this.grid[u.x+u.y*this.size] === 0) {
this.grid[u.x+u.y*this.size] = 2;
var n = this.GetNeighbors(u.x, u.y);
for (var i = 0; i < n.length; i++) {
if (this.grid[n[i].x+n[i].y*this.size] === 0) {
this.updates.push({type:"ocean",x:n[i].x,y:n[i].y});
}
}
}
await yieldThread()
}
if (this.updates.length === 0) {
this.X = this.size;
}
}   else if (this.stage === 2) {    //altitude
if (this.h === -1) {this.h = 0;}
var doingLake = false;
var I = 0;
while (this.updates.length > 0 && I < this.updates.length) {
if (this.updates[I].type === "lake") {
var u = this.updates.splice(I, 1)[0];
if (this.grid[u.x + u.y*this.size] === 0 && this.vertex[u.x+u.y*this.size] === -1) {
this.vertex[u.x + u.y*this.size] = u.a;
var n = this.GetNeighbors(u.x, u.y);
for (var i in n) {
if (this.grid[n[i].x+n[i].y*this.size] === 0 && this.vertex[n[i].x + n[i].y*this.size] === -1) {
this.updates.push({type:"lake",x:n[i].x,y:n[i].y,a:u.a});
}
}
}
I--;
}
I++;
await yieldThread()
}
while (this.X < this.size && !doingLake) {
var x = this.X;
for (var y = 0; y < this.size; y++) {
if (this.vertex[x+y*this.size] === -1) {
if (this.grid[x+y*this.size] === 2) {
this.vertex[x+y*this.size] = this.h;
this.changes++;
}   else if (this.h > 0) {
var n = this.GetNeighbors(x, y);
var l = this.size;
var ld;
for (var i in n) {
var v = this.vertex[n[i].x + n[i].y*this.size];
if (v < l && v !== -1) {
l = v;
ld = n[i];
}
}
if (l !== this.size && l <= this.h) {
if (this.grid[x+y*this.size] === 0) {
this.updates.push({type:"river",x:ld.x,y:ld.y});
this.updates.push({type:"lake",x:x,y:y,a:l});
}   else {
this.vertex[x+y*this.size] = l+1+(this.random() > 0.5 ? 1 : 0);
}
this.changes++;
}
}
}
}
this.X++;
await yieldThread()
}
if (this.X === this.size && this.h < this.size/3) {
if (this.changes === 0) {
this.h++;
}
this.X = 0;
this.changes = 0;
}
}   else if (this.stage === 3) {    //altitude readjustment
while (this.X < this.size) {
var x = this.X;
for (var y = 0; y < this.size; y++) {
this.vertex[x+y*this.size] = (Math.pow(20, this.vertex[x+y*this.size]/this.size*3)-1)/(20-1)*this.size/3;
if (this.vertex[x+y*this.size] > this.vertex[this.highestPoint[0]+this.highestPoint[1]*this.size]) {
this.highestPoint[0] = x;
this.highestPoint[1] = y;
}
}
this.X++;
await yieldThread()
}
}   else if (this.stage === 4) {    //rivers
if (this.rivers === 0) {
var x, y;
for (var i = 0; i < 200 && this.rivers < 100; i++) {
x = Math.floor(this.random(this.size));
y = Math.floor(this.random(this.size));
if (this.grid[x+y*this.size] === 1) {
this.updates.push({type:"river",x:x,y:y});
this.rivers++;
}
}
}   else {
if (this.updates.length === 0) {
this.X = this.size;
}
}
while(this.updates.length > 0) {
var u = this.updates[0];
if (this.grid[u.x+u.y*this.size] === 1) {
this.river[u.x+u.y*this.size]++;
var d = this.GetDown(u.x, u.y);
if (d === undefined) {
this.updates.shift();
}   else {
this.updates[0].x = d.x; this.updates[0].y = d.y;
}
}   else {
this.updates.shift();
}
await yieldThread()
}
}   else if (this.stage === 5) {    //precipitation
while (this.X < this.size) {
var x = this.X;
for (var y = 0; y < this.size; y++) {
if (this.precip[x + y*this.size] === -1) {
if (this.h === -1) {
if (this.grid[x + y*this.size] === 2) {
this.precip[x + y*this.size] = 5;
this.changes++;
}
}   else {
if (this.h <= 8) {
if (this.grid[x + y*this.size] === 0 || this.river[x+y*this.size] > 0) {
this.precip[x + y*this.size] = 8;
this.changes++;
}
}
var n = this.GetNeighbors(x, y);
var h = -1;
for (var i in n) {
if (this.precip[n[i].x + n[i].y*this.size] > h) {
h = this.precip[n[i].x + n[i].y*this.size];
}
}
if (h > -1 && h >= this.h) {
this.precip[x+y*this.size] = Math.max(h - (this.random() < 0.5 ? 0.66 : 0.33), 0);
this.changes++;
}
}
}
}
this.X++;
await yieldThread()
}
if (this.X === this.size) {
this.X = 0;
if (this.h === -1) {
this.h = 10;
}   else {
if (this.changes === 0) {
this.h--;
}
this.changes = 0;
if (this.h < 0) {
this.X = this.size;
}
}
}
}   else if (this.stage === 6) {    //readjust precipitation
while (this.X < this.size) {
var x = this.X;
for (var y = 0; y < this.size; y++) {
this.precip[x+y*this.size] = Math.floor(this.precip[x+y*this.size]/10*6);
}
this.X++;
await yieldThread()
}
}   else if (this.stage === 7) {    //temperature
while (this.X < this.size) {
var x = this.X;
for (var y = 0; y < this.size; y++) {
}
this.X++;
await yieldThread()
}
}   else if (this.stage === 8) {    //biomes
while (this.X < this.size) {
var x = this.X;
for (var y = 0; y < this.size; y++) {
var c;
var h = Math.floor(this.vertex[x+y*this.size]/this.size*6*5);
switch (this.grid[x+y*this.size]) {
case 0: if (h > 2) {
c = color(157, 194, 201);
}   else {
c = color(25, 153, 227);
}   break;
case 1: if (this.river[x+y*this.size] > 0) {
if (h > 2) {
c = color(157, 194, 201);
}   else {
c = color(25, 153, 227);
}
}   else {
switch (h) {
case 0: switch (this.precip[x+y*this.size]) {
case 5: case 4: c = color(10, 133, 72); break;
case 3: case 2: c = color(10, 133, 23); break;
case 1: c = color(179, 232, 35); break;
case 0: c = color(209, 166, 58); break;
} break;
case 1: switch (this.precip[x+y*this.size]) {
case 5: c = color(14, 156, 85); break;
case 4: case 3: c = color(72, 133, 10); break;
case 2: case 1: c = color(179, 232, 35); break;
case 0: c = color(207, 195, 58); break;
} break;
case 2: switch (this.precip[x+y*this.size]) {
case 5: case 4: c = color(121, 191, 95); break;
case 3: case 2: c = color(155, 161, 135); break;
case 1: case 0: c = color(207, 195, 58); break;
} break;
case 3: case 4: switch (this.precip[x+y*this.size]) {
case 5: case 4: case 3: c = color(255); break;
case 2: c = color(149, 189, 94); break;
case 1: c = color(180); break;
case 0: c = color(128);
} break;
}
}
break;
case 2: c = color(4, 137, 209); break;
}
this.biome[x+y*this.size] = c;
}
this.X++;
await yieldThread()
}
}   else if (this.stage === 9) {    //add lava
let ph = this.vertex[this.highestPoint[0] + this.highestPoint[1]*this.size]-5;
while (this.X < this.size) {
var x = this.X;
for (var y = 0; y < this.size; y++) {
if (this.vertex[x + y*this.size] > ph) {
this.vertex[x + y*this.size] = ph-2;
this.biome[x + y*this.size] = -65536;
}
}
this.X++;
await yieldThread()
}
}
if (this.X === this.size) {
this.X = 0;
this.h = -1;
this.stage++;
}
}
this.generating = false
}
}
class Section {
constructor(x, y, z, chunk, blocks = undefined) {
this.x = x
this.y = y
this.z = z
let size = 16
this.size = size
this.arraySize = size * size * size
this.blocks = blocks || new Int32Array(this.arraySize)
this.light = new Uint8Array(this.arraySize)
this.tags = new Array(this.arraySize)
this.chunk = chunk
this.world = chunk && chunk.world
this.type = chunk && chunk.type
this.edited = false
this.caves = this.type !== "" || !world.caves
}
getBlock(x, y, z) {
let s = this.size
return this.blocks[x * s * s + y * s + z]
}
setBlock(x, y, z, blockId) {
let s = this.size
this.blocks[x * s * s + y * s + z] = blockId
}
deleteBlock(x, y, z) {
let s = this.size
this.blocks[x * s * s + y * s + z] = 0
}
updateBlock(x, y, z, world, noOnupdate, sx,sy,sz) {
let i = x
let j = y
let k = z
let s = this.size
x += this.x
y += this.y
z += this.z
let block = this.blocks[i * s * s + j * s + k]
if(!noOnupdate && blockData[block].onupdate) blockData[block].onupdate(x,y,z,block,this.world,sx,sy,sz,this.type);
/*else if(!noOnupdate){
if((block & STAIR) === STAIR || (block & CORNERSTAIRIN) === CORNERSTAIRIN || (block & CORNERSTAIROUT) === CORNERSTAIROUT){
let front, back //front is lower side
let rot = block & ROTATION
switch(rot){
case NORTH:
front = this.world.getBlock(x,y,z-1,this.type)
back = this.world.getBlock(x,y,z+1,this.type)
break
case SOUTH:
front = this.world.getBlock(x,y,z+1,this.type)
back = this.world.getBlock(x,y,z-1,this.type)
break
case EAST:
front = this.world.getBlock(x-1,y,z,this.type)
back = this.world.getBlock(x+1,y,z,this.type)
break
case WEST:
front = this.world.getBlock(x+1,y,z,this.type)
back = this.world.getBlock(x-1,y,z,this.type)
break
}
front = front
back = back
let frontType = (front & STAIR) === STAIR && 1 || (front & CORNERSTAIRIN) === CORNERSTAIRIN && 2 || (front & CORNERSTAIROUT) === CORNERSTAIROUT && 3 || 0
let backType = (back & STAIR) === STAIR && 1 || (back & CORNERSTAIRIN) === CORNERSTAIRIN && 2 || (back & CORNERSTAIROUT) === CORNERSTAIROUT && 3 || 0
let target = blockData[block].id, rotate = 0, type = STAIR
if(frontType === 1){
switch(front & ROTATION){
case NORTH:
if(rot === EAST) type = CORNERSTAIRIN
else if(rot === WEST){ rotate = 1; type = CORNERSTAIRIN }
break
}
}
target |= type
if(rotate){
switch(rot){
case NORTH:
target |= EAST
break
case EAST:
target |= SOUTH
break
case SOUTH:
target |= WEST
break
case WEST:
target |= NORTH
break
}
}else target |= rot
if(block !== target) this.world.setBlock(x,y,z,target,false,false,false,false,this.type)
}
}*/
}
carveCaves() {
let wx = this.x + 16, wz = this.z + 16, wy = this.y + 16
for (let x = this.x, xx = 0; x < wx; x++, xx++) {
for (let z = this.z, zz = 0; z < wz; z++, zz++) {
wy = this.chunk.tops[zz * 16 + xx]
for (let y = this.y; y < wy; y++) {
if (isCave(x, y, z)) {
if (y > 3) {
for (let i = 0; i < sphere.length; i += 3) {
if(y+sphere[i + 1]<10) world.setBlock(x + sphere[i], y + sphere[i + 1], z + sphere[i + 2], blockIds.Lava, true,true,false,false, this.type)
else world.setBlock(x + sphere[i], y + sphere[i + 1], z + sphere[i + 2], blockIds.air, true,true,false,false, this.type)
}
}
}
}
}
}
this.caves = true
}
oldSpawnMobs(){
let {world} = this
let fieldMobs = ["Cow","Pig","Sheep","Chicken"]
let snowMobs = ["Wolf"]
let hostileMobs = ["Creeper","Zombie","Skeleton","Spider","Enderman"]
let netherWasteMobs = ["Blaze"]
let endMobs = ["Enderman"]
let x = Math.random() * 16 | 0
let y = Math.random() * 16 | 0
let z = Math.random() * 16 | 0
let minChunkX = this.x + x - 32 >> 4
let maxChunkX = this.x + x + 32 >> 4
let minChunkZ = this.z + z - 32 >> 4
let maxChunkZ = this.z + z + 32 >> 4
let chunks = this.type === "nether" ? this.world.netherChunks : (this.type === "end" ? this.world.endChunks : this.world.chunks)
let block = this.getBlock(x,y,z), light = max(this.getLight(x,y,z,0)*this.world.skyLight,this.getLight(x,y,z,1))
let under = this.chunk.getBlock(x,y+this.y-1,z,0,true)
if(this.type === "" && !block && light > 10 && under === blockIds.grass){
for(let x2=minChunkX; x2<=maxChunkX; x2++) for(let z2=minChunkZ; z2<=maxChunkZ; z2++){
if(chunks[x2] && chunks[x2][z2]) for(let i in chunks[x2][z2].entities){
let ent = chunks[x2][z2].entities[i]
if(ent.mob && max(abs(this.x+x-ent.x),abs(this.y+y-ent.y),abs(this.z+z-ent.z)) < 32) return
}
}
let amount = rand(1,6)
let mob = fieldMobs[floor(rand(fieldMobs.length))]
for(let i=0; i<amount; i++) blockData[blockIds["spawn"+mob]].spawnMob(x+this.x+rand(),y+this.y,z+this.z+rand(),this.type,world)
}else if(this.type === "" && !block && light > 10 && this.world.getBiome(this.x+x,this.y+y,this.z+z,this.type) === "snowyPlains" && (under === blockIds.grass || blockData[under].name === "snow")){
for(let x2=minChunkX; x2<=maxChunkX; x2++) for(let z2=minChunkZ; z2<=maxChunkZ; z2++){
if(chunks[x2] && chunks[x2][z2]) for(let i in chunks[x2][z2].entities){
let ent = chunks[x2][z2].entities[i]
if(ent.mob && max(abs(this.x+x-ent.x),abs(this.y+y-ent.y),abs(this.z+z-ent.z)) < 32) return
}
}
let amount = rand(1,6)
let mob = snowMobs[floor(rand(snowMobs.length))]
for(let i=0; i<amount; i++) blockData[blockIds["spawn"+mob]].spawnMob(x+this.x+rand(),y+this.y,z+this.z+rand(),this.type,world)
}else if(this.type === "" && !block && light <= 11 && under){
if(max(abs(this.x+x-p.x),abs(this.y+y-p.y),abs(this.z+z-p.z)) < 16) return
for(let p of this.world.players){
if(max(abs(this.x+x-p.x),abs(this.y+y-p.y),abs(this.z+z-p.z)) < 16) return
}
for(let x2=minChunkX; x2<=maxChunkX; x2++) for(let z2=minChunkZ; z2<=maxChunkZ; z2++){
if(chunks[x2] && chunks[x2][z2]) for(let i in chunks[x2][z2].entities){
let ent = chunks[x2][z2].entities[i]
if(ent.mob && ent.hostile && max(abs(this.x+x-ent.x),abs(this.y+y-ent.y),abs(this.z+z-ent.z)) < 32) return
}
}
let mob = hostileMobs[floor(rand(hostileMobs.length))]
blockData[blockIds["spawn"+mob]].spawnMob(x+this.x+rand(),y+this.y,z+this.z+rand(),this.type,world)
}else if(this.type === "nether" && !block && this.world.getBiome(this.x+x,this.y+y,this.z+z,this.type) === "netherWastes" && under === blockIds.netherrack){
for(let x2=minChunkX; x2<=maxChunkX; x2++) for(let z2=minChunkZ; z2<=maxChunkZ; z2++){
if(chunks[x2] && chunks[x2][z2]) for(let i in chunks[x2][z2].entities){
let ent = chunks[x2][z2].entities[i]
if(ent.mob && max(abs(this.x+x-ent.x),abs(this.y+y-ent.y),abs(this.z+z-ent.z)) < 32) return
}
}
let amount = rand(1,6)
let mob = netherWasteMobs[floor(rand(netherWasteMobs.length))]
for(let i=0; i<amount; i++) blockData[blockIds["spawn"+mob]].spawnMob(x+this.x+rand(),y+this.y,z+this.z+rand(),this.type,world)
}else if(this.type === "end" && !block && blockData[under].solid){
for(let x2=minChunkX; x2<=maxChunkX; x2++) for(let z2=minChunkZ; z2<=maxChunkZ; z2++){
if(chunks[x2] && chunks[x2][z2]) for(let i in chunks[x2][z2].entities){
let ent = chunks[x2][z2].entities[i]
if(ent.mob && max(abs(this.x+x-ent.x),abs(this.y+y-ent.y),abs(this.z+z-ent.z)) < 32) return
}
}
let amount = rand(1,6)
let mob = endMobs[floor(rand(endMobs.length))]
for(let i=0; i<amount; i++) blockData[blockIds["spawn"+mob]].spawnMob(x+this.x+rand(),y+this.y,z+this.z+rand(),this.type,world)
}
}
spawnMobs(){
if(!this.chunk.lit) return
if(this.world.usePreBeta) return this.oldSpawnMobs()
let {world} = this
let x = Math.random() * 16 | 0
let y = Math.random() * 16 | 0
let z = Math.random() * 16 | 0
let minChunkX = this.x + x - 32 >> 4
let maxChunkX = this.x + x + 32 >> 4
let minChunkZ = this.z + z - 32 >> 4
let maxChunkZ = this.z + z + 32 >> 4
let chunks = this.type === "nether" ? this.world.netherChunks : (this.type === "end" ? this.world.endChunks : this.world.chunks)
let block = this.getBlock(x,y,z), light = max(this.getLight(x,y,z,0)*this.world.skyLight,this.getLight(x,y,z,1))
let under = this.chunk.getBlock(x,y+this.y-1,z,0,true)
let biome = world.getBiome(x+this.x,y+this.y,z+this.z)
let passiveMobs = biomeData[biome][2]
let hostileMobs = biomeData[biome][3]
if(passiveMobs && !block && light > 10 && under){
for(let x2=minChunkX; x2<=maxChunkX; x2++) for(let z2=minChunkZ; z2<=maxChunkZ; z2++){
if(chunks[x2] && chunks[x2][z2]) for(let i in chunks[x2][z2].entities){
let ent = chunks[x2][z2].entities[i]
if(ent.mob && max(abs(this.x+x-ent.x),abs(this.y+y-ent.y),abs(this.z+z-ent.z)) < 32) return
}
}
let mob = passiveMobs[floor(rand(passiveMobs.length))]
let amount = rand(mob[1],mob[2])
if(blockIds["spawn"+mob[0]]){
for(let i=0; i<amount; i++) blockData[blockIds["spawn"+mob[0]]].spawnMob(x+this.x+rand(),y+this.y,z+this.z+rand(),this.type,world)
}
}
if(hostileMobs && !block && !light && under){
if(max(abs(this.x+x-p.x),abs(this.y+y-p.y),abs(this.z+z-p.z)) < 16) return
for(let i of this.world.players){
if(max(abs(this.x+x-p.x),abs(this.y+y-p.y),abs(this.z+z-p.z)) < 16) return
}
for(let x2=minChunkX; x2<=maxChunkX; x2++) for(let z2=minChunkZ; z2<=maxChunkZ; z2++){
if(chunks[x2] && chunks[x2][z2]) for(let i in chunks[x2][z2].entities){
let ent = chunks[x2][z2].entities[i]
if(ent.mob && ent.hostile && max(abs(this.x+x-ent.x),abs(this.y+y-ent.y),abs(this.z+z-ent.z)) < 32) return
}
}
let mob = hostileMobs[floor(rand(hostileMobs.length))]
let amount = rand(mob[1],mob[2])
if(blockIds["spawn"+mob[0]]){
for(let i=0; i<amount; i++) blockData[blockIds["spawn"+mob[0]]].spawnMob(x+this.x+rand(),y+this.y,z+this.z+rand(),this.type,world)
}
}
}
tick() {
var world = this.world
for (let i = 0; i < 9; i++) {
let rnd = Math.random() * this.blocks.length | 0
if ((this.blocks[rnd]) === blockIds.grass) {
// Spread grass
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
if (!blockData[world.getBlock(x, y + 1, z, this.type)].transparent) {
world.setBlock(x, y, z, blockIds.dirt, false,false,false,false, this.type)
return
}
let rnd2 = Math.random() * 27 | 0
let x2 = rnd2 % 3 - 1
rnd2 = (rnd2 - x2 - 1) / 3
let y2 = rnd2 % 3 - 1
rnd2 = (rnd2 - y2 - 1) / 3
z += rnd2 - 1
x += x2
y += y2
if (this.world.getBlock(x, y, z, this.type) === blockIds.dirt && this.world.getBlock(x, y + 1, z, this.type) === blockIds.air) {
this.world.setBlock(x, y, z, blockIds.grass, false,false,false,false, this.type)
}
} else if (blockData[this.blocks[rnd]].grow){
let i = (rnd >> 8) + this.x
let j = (rnd >> 4 & 15) + this.y
let k = (rnd & 15) + this.z
blockData[this.blocks[rnd]].grow(i,j,k,this.type,this.world)
}else if(blockData[this.blocks[rnd]].name === "vine" || blockData[this.blocks[rnd]].name === "weepingVines"){
let i = (rnd >> 8) + this.x
let j = (rnd >> 4 & 15) + this.y
let k = (rnd & 15) + this.z
if(!this.world.getBlock(i,j-1,k)){
this.world.setBlock(i,j-1,k,this.blocks[rnd], false,false,false,false,this.type)
}
}else if(blockData[this.blocks[rnd]].name === "twistingVines"){
let i = (rnd >> 8) + this.x
let j = (rnd >> 4 & 15) + this.y
let k = (rnd & 15) + this.z
if(!this.world.getBlock(i,j+1,k)){
this.world.setBlock(i,j+1,k,this.blocks[rnd], false,false,false,false,this.type)
}
}
}
for (let i = 0; i < 8; i++) {
let rnd = rand(this.blocks.length) | 0
if(this.blocks[rnd] === blockIds.tomatoPlant){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, blockIds.tomatoPlant|SLAB, false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.tomatoPlant|SLAB)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, blockIds.tomatoPlant|STAIR, false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.tomatoPlant|STAIR)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, blockIds.tomatoPlant|CROSS, false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.tomatoPlant|CROSS)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, blockIds.tomatoPlant|TALLCROSS, false,false,false,false, this.type)
}/*wheat*/else if(this.blocks[rnd] === (blockIds.wheat)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, blockIds.wheat|SLAB, false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.wheat|SLAB)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, blockIds.wheat|STAIR, false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.wheat|STAIR)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, blockIds.wheat|CROSS, false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.wheat|CROSS)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, blockIds.wheat|TALLCROSS, false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.wheat|TALLCROSS)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, blockIds.wheat|DOOR, false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.wheat|DOOR)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, blockIds.wheat|TORCH, false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.wheat|TORCH)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, blockIds.wheat|LANTERN, false,false,false,false, this.type)
}/*cactus fruit*/else if(this.blocks[rnd] === (blockIds.newCactusFruit|CROSS)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, blockIds.greenCactusFruit|CROSS, false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.greenCactusFruit|CROSS)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, blockIds.redCactusFruit|CROSS, false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.redCactusFruit|CROSS)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, blockIds.purpleCactusFruit|CROSS, false,false,false,false, this.type)
}/*cactus*/else if(this.blocks[rnd] === (blockIds.cactus|CACTUS)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
var tall = 0
var maxTall = 3
for(var t=0; t<maxTall; t++){
if(world.getBlock(x,y-t,z,this.type) === (blockIds.cactus|CACTUS)) tall++
else break
}
if(tall >= maxTall) return
var above = world.getBlock(x,y+1,z,this.type)
if(blockData[above].cactusFruit){
if(world.getBlock(x,y+2,z,this.type)) return //the cactus fruit can't replace blocks
world.setBlock(x,y+2,z, above, false,false,false,false, this.type) //move the cactus fruit up
}else if(above) return //there is a block so it can't grow
world.setBlock(x,y+1,z, blockIds.cactus|CACTUS, false,false,false,false, this.type)
}else if(this.blocks[rnd] === blockIds.sweetBerryBush){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, blockIds.sweetBerryBush|SLAB, false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.sweetBerryBush | SLAB)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, blockIds.sweetBerryBush|STAIR, false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.sweetBerryBush | STAIR)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, blockIds.sweetBerryBush|CROSS, false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.cocoa | (this.blocks[rnd] & ROTATION))){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, blockIds.cocoa|SLAB|(this.blocks[rnd]&ROTATION), false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.cocoa | SLAB | (this.blocks[rnd] & ROTATION))){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, blockIds.cocoa|STAIR|(this.blocks[rnd]&ROTATION), false,false,false,false, this.type)
}else if(this.blocks[rnd] === blockIds.beetroots){//beetroot
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, (blockIds.beetroots|SLAB), false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.beetroots | SLAB)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, (blockIds.beetroots|STAIR), false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.beetroots | STAIR)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, (blockIds.beetroots|CROSS), false,false,false,false, this.type)
}else if(this.blocks[rnd] === blockIds.potatoes){//potato
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, (blockIds.potatoes|SLAB), false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.potatoes | SLAB)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, (blockIds.potatoes|STAIR), false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.potatoes | STAIR)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, (blockIds.potatoes|CROSS), false,false,false,false, this.type)
}else if(this.blocks[rnd] === blockIds.carrots){//carrot
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, (blockIds.carrots|SLAB), false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.carrots | SLAB)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, (blockIds.carrots|STAIR), false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.carrots | STAIR)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, (blockIds.carrots|CROSS), false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.bambooStalk | STAIR) || this.blocks[rnd] === (blockIds.bambooStalk | SLAB) || this.blocks[rnd] === blockIds.bambooStalk || this.blocks[rnd] === (blockIds.bambooStalk | CROSS) || this.blocks[rnd] === (blockIds.bambooStalk | TALLCROSS)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
var tall = 0
var maxTall = 16
let blocks = []
for(let t=0; t<maxTall; t++){
let block = world.getBlock(x,y-t,z,this.type)
if(blockData[block].name === "bambooStalk"){
tall++
blocks.push(block)
}else break
}
if(tall >= maxTall) return
var above = world.getBlock(x,y+1,z,this.type)
if(above) return //there is a block so it can't grow
world.setBlock(x,y+1,z, blockIds.bambooStalk | (tall > 3 ? STAIR : TALLCROSS), false,false,false,false, this.type)
if(tall > 3){
for(let t=0; t<tall; t++){
let block = blocks[t]
if(t === 0 && block !== (blockIds.bambooStalk | SLAB)) world.setBlock(x,y-t,z,blockIds.bambooStalk | SLAB,false,false,false,false,this.type)
else if(block !== blockIds.bambooStalk) world.setBlock(x,y-t,z,blockIds.bambooStalk,false,false,false,false,this.type)
}
}else{
for(let t=0; t<tall; t++){
let block = blocks[t]
if(t === 0 && block !== (blockIds.bambooStalk | CROSS)) world.setBlock(x,y-t,z,blockIds.bambooStalk | CROSS,false,false,false,false,this.type)
}
}
}else if(this.blocks[rnd] === (blockIds.bambooShoot | CROSS)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
if(world.getBlock(x,y+1,z,this.type)) return
world.setBlock(x, y, z, blockIds.bambooStalk|CROSS, false,false,false,false, this.type)
world.setBlock(x, y+1, z, blockIds.bambooStalk|TALLCROSS, false,false,false,false, this.type)
}else if(blockData[this.blocks[rnd]].name === "sugarCane"){
let b = this.blocks[rnd]
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
var tall = 0
var maxTall = 3
for(var t=0; t<maxTall; t++){
if(world.getBlock(x,y-t,z,this.type) === b) tall++
else break
}
if(tall >= maxTall) return
var above = world.getBlock(x,y+1,z,this.type)
if(above) return //there is a block so it can't grow
world.setBlock(x,y+1,z, b, false,false,false,false, this.type)
}else if(this.blocks[rnd] === blockIds.pitcherCrop){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, (blockIds.pitcherCrop|SLAB), false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.pitcherCrop | SLAB)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, (blockIds.pitcherCrop|STAIR), false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.pitcherCrop | STAIR)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, (blockIds.pitcherCrop|CROSS), false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.pitcherCrop | CROSS)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, (blockIds.pitcherCrop|TALLCROSS), false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.torchflower | SLAB)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, (blockIds.torchflower|STAIR), false,false,false,false, this.type)
}else if(this.blocks[rnd] === (blockIds.torchflower | STAIR)){
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
world.setBlock(x, y, z, (blockIds.torchflower|CROSS), false,false,false,false, this.type)
}
}
for (let i = 0; i < 40; i++) {
let rnd = rand(this.blocks.length) | 0
let x = (rnd >> 8) + this.x
let y = (rnd >> 4 & 15) + this.y
let z = (rnd & 15) + this.z
let block = this.blocks[rnd] || 0
if(blockData[block].name === "fire" || blockData[block].name === "Lava"){
if(this.world.settings.fireSpreads) blockData[block].tick(x,y,z,this.type,this.world)
}else if(blockData[block].tick){
blockData[block].tick(block,x,y,z,this.type,this.world)
}
if(blockData[block].beacon){
blockData[block].update(x,y,z,this.type,this.world)
}
}
}
getLight(x, y, z, block = 0) {
let s = this.size
let i = x * s * s + y * s + z
return (this.light[i] & 15 << (block * 4)) >> (block * 4)
}
setLight(x, y, z, level, block = 0) {
let s = this.size
let i = x * s * s + y * s + z
this.light[i] = level << (block * 4) | (this.light[i] & 15 << (!block * 4))
}
getTags(x, y, z){
let s = this.size
return this.tags[x * s * s + y * s + z]
}
getTagByName(x, y, z, n){
var t = this.getTags(x,y,z)
let tagBits = blockData[this.getBlock(x,y,z)].tagBits
if(tagBits){
if(!tagBits[n]) return 0
return (t >> tagBits[n][0]) & ((1 << tagBits[n][1])-1)
//((1 << tagBits[n][1])-1) does this: 2 -> 11,  3 -> 111
}else return t && t[n]
}
setTags(x,y,z, data){
let s = this.size
this.tags[x * s * s + y * s + z] = data
}
setTagByName(x, y, z, n, data){
let s = this.size
var i = x * s * s + y * s + z
var t = this.tags[i]
let tagBits = blockData[this.getBlock(x,y,z)].tagBits
if(!t){
if(tagBits) t = this.tags[i] = 0
else t = this.tags[i] = {}
}
if(tagBits){
if(!tagBits[n]) throw new Error("Cannot set "+n+" on binary tags.")
let countMask = (1 << tagBits[n][1])-1
if(data > countMask) throw new Error("Tag too large")
let mask = countMask << tagBits[n][0]
t = (t & (~mask)) | (data << tagBits[n][0])
//what this complicated thing does is: set certain bits
if(t) this.tags[i] = t
else delete this.tags[i]
}else t[n] = data
return t
}
}
let emptySection = new Section(0, 0, 0)
let fullSection = new Section(0, 0, 0)
fullSection.blocks.fill(blockIds.bedrock)
emptySection.light.fill(15)
function getTagBits(t,n,block){
let tagBits = blockData[block].tagBits
return (t >> tagBits[n][0]) & ((1 << tagBits[n][1])-1)
}
function getTag(t,n,block){
let tagBits = block.tagBits
if(tagBits){
return (t >> tagBits[n][0]) & ((1 << tagBits[n][1])-1)
}else return t && t[n]
}
class Chunk {
constructor(x, z, type, world) {
this.x = x
this.z = z
this.maxY = 0
this.minY = 255
this.sections = []
this.cleanSections = []
this.tops = new Uint8Array(16 * 16) // Store the heighest block at every (x,z) coordinate
this.ceils = new Uint8Array(16 * 16) //for nether
this.solidTops = new Uint8Array(16 * 16)
this.biomes = new Uint8Array(16 * 16) // biome id at every (x,z) coordinate
this.caveY = new Uint8Array(16 * 16 * 2) //Bottom and top of the highest cave
this.caveBiomes = new Uint8Array(16 * 16)
this.generated = false; // Terrain
this.generating = false //is it currently generating?
this.populated = world.superflat === true || world.superflat === "void" // Trees and ores
this.carving = false
this.lit = false
this.lazy = false
this.edited = false
this.loaded = false
this.type = type || ""
// vao for this chunk
this.caves = this.type !== "" || !world.caves
this.doubleRender = false
this.world = world
this.entities = {}
this.columnHashs = new Uint8Array(16 * 16)//used to detect when column changes
}
getBlock(x, y, z) {
y -= minHeight
let s = y >> 4
return s < this.sections.length && s >= 0 ? this.sections[s].getBlock(x, y & 15, z) : 0
}
setBlock(x, y, z, blockID, user) {
let py = y
y -= minHeight
if(y<0) return
if (!this.sections[y >> 4]) {
do {
let section = new Section(this.x, this.sections.length * 16 + minHeight, this.z, this)
if(this.lit) section.light.fill(15)
this.sections.push(section)
} while (!this.sections[y >> 4])
}
if (user && !this.sections[y >> 4].edited) {
this.cleanSections[y >> 4] = this.sections[y >> 4].blocks.slice()
this.sections[y >> 4].edited = true
this.edited = true
}
if (blockData[blockID].semiTrans) {
this.doubleRender = true
}
this.sections[y >> 4].setBlock(x, y & 15, z, blockID)
this.updateSolidTop(x,py,z,blockID)
this.columnHashs[z*16+x]++
}
updateSolidTop(x,y,z,blockID){
if(blockID && (blockData[blockID].solid || blockData[blockID].liquid)){
this.solidTops[z*16+x] = max(this.solidTops[z*16+x],y)
}else if(y >= this.solidTops[z*16+x]){
let top = this.solidTops[z*16+x]
while(true) {
let block = this.getBlock(x,top,z)
if(blockData[block].solid || blockData[block].liquid || top<minHeight) break
top--
}
this.solidTops[z*16+x] = top
}
}
deleteBlock(x, y, z, user) {
let py = y
y -= minHeight
if (!this.sections[y >> 4]) {
return
}
if (user && !this.sections[y >> 4].edited) {
this.cleanSections[y >> 4] = this.sections[y >> 4].blocks.slice()
this.sections[y >> 4].edited = true
this.edited = true
}
this.sections[y >> 4].deleteBlock(x, y & 15, z)
this.minY = py < this.minY ? py : this.minY
this.maxY = py > this.maxY ? py : this.maxY
this.updateSolidTop(x,py,z,0)
this.columnHashs[z*16+x]++
}
getOriginalBlock(x,y,z){
y -= minHeight
let s = y >> 4
if(!this.cleanSections[s]) return 0
y = y & 15
let c = this.sections[s]
return this.cleanSections[s][x * c.size * c.size + y * c.size + z]
}
getTags(x, y, z){
y -= minHeight
let s = y >> 4
return s < this.sections.length && s >= 0 ? this.sections[s].getTags(x, y & 15, z) : undefined
}
getTagByName(x,y,z,n){
y -= minHeight
let s = y >> 4
return s < this.sections.length && s >= 0 ? this.sections[s].getTagByName(x, y & 15, z,n) : undefined
}
setTags(x,y,z,data){
y -= minHeight
let s = y >> 4
if(s < this.sections.length && s >= 0) this.sections[s].setTags(x, y & 15, z, data)
}
setTagByName(x,y,z,n,data){
y -= minHeight
let s = y >> 4
if(s < this.sections.length && s >= 0) return this.sections[s].setTagByName(x, y & 15, z,n,data)
}
fillLight() {
let max = this.sections.length * 16 - 1 + minHeight
let blockSpread = []
// Set virtical columns of light to level 15
for (let x = 0; x < 16; x++) {
for (let z = 0; z < 16; z++) {
let stop = false
for (let y = max; y >= minHeight; y--) {
let data = blockData[this.getBlock(x, y, z)]
if (data.lightLevel) {
if (!blockSpread[data.lightLevel]) blockSpread[data.lightLevel] = []
blockSpread[data.lightLevel].push(x + this.x, y, z + this.z)
this.setLight(x, y, z, data.lightLevel, 1)
}
if (!stop && !data.transparent) {
this.tops[z * 16 + x] = y
stop = true
} else if (!stop) {
this.setLight(x, y, z, 15, 0)
}
}
}
}
// Spread the light to places where the virtical columns stopped earlier, plus chunk borders
let spread = []
for (let x = 0; x < 16; x++) {
for (let z = 0; z < 16; z++) {
for (let y = this.tops[z * 16 + x] + 1; y <= max; y++) {
if (x === 15 || this.tops[z * 16 + x + 1] > y) {
spread.push(x + this.x, y, z + this.z)
continue
}
if (x === 0 || this.tops[z * 16 + x - 1] > y) {
spread.push(x + this.x, y, z + this.z)
continue
}
if (z === 15 || this.tops[(z + 1) * 16 + x] > y) {
spread.push(x + this.x, y, z + this.z)
continue
}
if (z === 0 || this.tops[(z - 1) * 16 + x] > y) {
spread.push(x + this.x, y, z + this.z)
continue
}
break
}
}
}
this.spreadLight(spread, 14)
for (let i = blockSpread.length - 1; i > 0; i--) {
let blocks = blockSpread[i]
if (blocks && blocks.length) {
this.spreadLight(blocks, i - 1, false, 1)
}
}
this.lit = true
}
setLight(x, y, z, level, blockLight) {
y -= minHeight
if(this.sections[y >> 4]) this.sections[y >> 4].setLight(x, y & 15, z, level, blockLight)
}
getLight(x, y, z, blockLight = 0, fullOutside) {
y -= minHeight
if (y >= this.sections.length * 16) return (!blockLight || fullOutside) * 15
return this.sections[y >> 4].getLight(x, y & 15, z, blockLight)
}
trySpread(x, y, z, level, spread, blockLight, update = false) {
if(y < minHeight) return
if (this.world.getLight(x, y, z, blockLight, this.type, 1) < level) {
if (blockData[this.world.getBlock(x, y, z, this.type)].transparent) {
this.world.setLight(x, y, z, level, blockLight, this.type)
spread.push(x, y, z)
}
}
}
spreadLight(blocks, level, update = false, blockLight = 0) {
let spread = []
let x = 0, y = 0, z = 0
for (let i = 0; i < blocks.length; i += 3) {
x = blocks[i]
y = blocks[i+1]
z = blocks[i+2]
if(y < minHeight) continue
this.trySpread(x - 1, y, z, level, spread, blockLight, update)
this.trySpread(x + 1, y, z, level, spread, blockLight, update)
this.trySpread(x, y - 1, z, level, spread, blockLight, update)
this.trySpread(x, y + 1, z, level, spread, blockLight, update)
this.trySpread(x, y, z - 1, level, spread, blockLight, update)
this.trySpread(x, y, z + 1, level, spread, blockLight, update)
}
if (level > 1 && spread.length) {
this.spreadLight(spread, level - 1, update, blockLight)
}
}
tryUnSpread(x, y, z, level, spread, respread, blockLight) {
if(y < minHeight) return
let light = this.world.getLight(x, y, z, blockLight, this.type, 1)
let trans = blockData[this.world.getBlock(x, y, z, this.type)].transparent
if (light === level) {
if (trans) {
this.world.setLight(x, y, z, 0, blockLight, this.type)
spread.push(x, y, z)
}
} else if (light > level) {
respread[light].push(x, y, z)
}
}
unSpreadLight(blocks, level, respread, blockLight) {
let spread = []
let x = 0, y = 0, z = 0
for (let i = 0; i < blocks.length; i += 3) {
x = blocks[i]
y = blocks[i+1]
z = blocks[i+2]
if(y < minHeight) continue
this.tryUnSpread(x - 1, y, z, level, spread, respread, blockLight)
this.tryUnSpread(x + 1, y, z, level, spread, respread, blockLight)
this.tryUnSpread(x, y - 1, z, level, spread, respread, blockLight)
this.tryUnSpread(x, y + 1, z, level, spread, respread, blockLight)
this.tryUnSpread(x, y, z - 1, level, spread, respread, blockLight)
this.tryUnSpread(x, y, z + 1, level, spread, respread, blockLight)
}
if (level > 1 && spread.length) {
this.unSpreadLight(spread, level - 1, respread, blockLight)
}
}
reSpreadLight(respread, blockLight) {
for (let i = respread.length - 1; i > 1; i--) {
let blocks = respread[i]
let level = i - 1
let spread = respread[level]
for (let j = 0; j < blocks.length; j += 3) {
let x = blocks[j]
let y = blocks[j+1]
let z = blocks[j+2]
this.trySpread(x - 1, y, z, level, spread, blockLight)
this.trySpread(x + 1, y, z, level, spread, blockLight)
this.trySpread(x, y - 1, z, level, spread, blockLight)
this.trySpread(x, y + 1, z, level, spread, blockLight)
this.trySpread(x, y, z - 1, level, spread, blockLight)
this.trySpread(x, y, z + 1, level, spread, blockLight)
}
}
}
updateBlock(x, y, z, world, lazy, noOnupdate, sx,sy,sz) {
y -= minHeight
if (this.allGenerated) {
this.lazy = lazy
if ((this.sections.length > y >> 4) && this.sections[y >> 4]) {
this.sections[y >> 4].updateBlock(x, y & 15, z, world, noOnupdate, sx,sy,sz)
}
}
}
async carveCaves() {
if(this.carving) return
this.carving = true
if(this.world.usePreBeta || this.world.superflat){
for (let i = (-minHeight)>>4; i < this.sections.length; i++) {
if (!this.sections[i].caves) {
this.sections[i].carveCaves()
}
}
}else{
let {blocks,tops,biomes,caveY} = await doWork({caves:true, densities:this.densities, bottoms:this.densityBottoms, tops:this.tops, trueX:this.x,trueZ:this.z,blocks:this.tempSections,biomes:this.biomes,seed:this.world.worldSeed},[...Object.values(this.densities).map(r=>r.buffer),this.densityBottoms.buffer,...this.tempSections.map(r=>r.buffer),this.tops.buffer])
for(let i=0; i<blocks.length; i++){
this.sections[i] = new Section(this.x, i*16+minHeight, this.z, this, blocks[i])
}
this.tops = tops
this.solidTops.set(tops)
this.caveY = caveY
this.caveBiomes = biomes
delete this.densities
delete this.densityBottoms
delete this.tempSections
}
this.caves = true
this.carving = false
}
async generate() {
let x = this.x >> 4
let z = this.z >> 4
let trueX = this.x
let trueZ = this.z
if (this.generated || this.generating) {
return false
}
this.generating = true
const {noiseProfile} = this.world
let hide = !loadString
let smoothness = generator.smooth
let hilliness = generator.height
let biomeSmooth = generator.biomeSmooth
//{ for the nether terrain
const bottom = 0 // Minimum height of the ground
const hillSize = 0.004 // smaller = bigger; 0.005 to 0.01 seems the be a reasonable range
//}
let gen = 0, floatGen = 0
if(this.world.usePreBeta || this.type !== "" || this.world.superflat){
for (let i = 0; i < 16; i++) {
for (let k = 0; k < 16; k++) {
let wx = trueX + i, wz = trueZ + k
floatGen = noiseProfile.noise((trueX + i) * smoothness, (trueZ + k) * smoothness) * hilliness + generator.extra
gen = this.world.superflat === "island" && this.type === "" ? this.world.islandGenerator.GetHeight(x*16+i, z*16+k) : (this.world.superflat ? 4 : Math.round(floatGen))
/*if(this.type === "nether" && superflat){
gen = Math.round(floatGen)
}*/
this.tops[k * 16 + i] = gen
if(this.type === "nether"){
let biome = noiseProfile.noise((trueX + i) * biomeSmooth, (trueZ + k) * biomeSmooth)
let b = getNetherBiome(biome)
this.biomes[k * 16 + i] = biomeIds[b]
let block = blockIds.netherrack
if(b === "warpedForest"){
block = blockIds.warpedNylium
}else if(b === "crimsonForest"){
block = blockIds.crimsonNylium
}
//const smo = noise((trueX + i) * biomeSize, (trueZ + k) * biomeSize) * flatness + 40
const smo = 40
let top = 0
let solid = false
for (let j = 1; j < netherHeight; j++) {
var noiseRes = noiseProfile.noise((trueX + i)/smo, j/smo, (trueZ + k)/smo) - ((110 + j/4) - bottom) * hillSize
if(j > netherHeight - 10){
noiseRes = lerp((j - (netherHeight - 10)) / 10, noiseRes, 0.1)
}
if (noiseRes > 0) {
this.setBlock(i, j, k, blockIds.netherrack)
if(!solid) this.ceils[k * 16 + i] = j
if(j > 31) solid = true
} else if (solid && j > 31) {
this.setBlock(i, j - 1, k, block)
/*if (chunk.getBlock(i, j - 2, k)) chunk.setBlock(i, j - 2, k, block)
if (chunk.getBlock(i, j - 3, k)) chunk.setBlock(i, j - 3, k, block)
if (chunk.getBlock(i, j - 4, k)) chunk.setBlock(i, j - 4, k, block)*/
solid = false
top = j
} else if(j < 32){
this.setBlock(i, j, k, blockIds.Lava)
if(this.getBlock(i, j - 1, k) === block) this.setBlock(i, j-2, k, blockIds.netherrack)
}
}
this.tops[k * 16 + i] = top-1
this.setBlock(i, 0, k, blockIds.bedrock)
/*block = blockIds.netherrack
for(let j=1; j<gen; j++){
chunk.setBlock(i, netherHeight - j, k, block)
}*/
this.setBlock(i,netherHeight,k, blockIds.bedrock)
}else if(this.type === "end"){
this.tops[k * 16 + i] = 0
for(let j = 0; j<64; j++){
gen = noiseProfile.noise(wx * 0.01, j*0.01, wz * 0.01) - 0.57
if(wx > -64 && wx < 64 && wz > -64 && wz < 64){
//main island
gen = gen + 0.57 - lerp(max(abs(wx),abs(wz))/64, 0,0.57)
}else if(wx > -80 && wx < 80 && wz > -80 && wz < 80){
//blend into void
gen = gen + 0.57 - lerp(max(abs(wx)-64,abs(wz)-64)/16, 0.57,1)
}else if(wx > -200 && wx < 200 && wz > -200 && wz < 200){
//blend void into outer islands
var dist = 200-64
gen = lerp(max(abs(wx)-dist,abs(wz)-dist,0)/64, -0.1,gen)
}
if(j < 32){
gen = lerp(j/32,-0.1,gen)
}
if(j > 48){
gen = lerp((j-48)/16, gen,-0.1)
}
if(gen > 0){
this.tops[k * 16 + i] = j
this.setBlock(i,j,k,blockIds.endStone)
}
}
if(wx < -200 || wx > 200 || wz < -200 || wz > 200){
this.biomes[k * 16 + i] = biomeIds.endIslands
}else{
this.biomes[k * 16 + i] = biomeIds.end
}
}else if (this.world.superflat === "island") {
if (this.world.islandGenerator.GetWaterDepth(x*16+i, z*16+k) > 0) {
this.setBlock(i, gen, k, blockIds.Water);
this.setBlock(i, gen - 1, k, blockIds.Water)
this.setBlock(i, gen - 2, k, blockIds.dirt)
this.setBlock(i, gen - 3, k, blockIds.dirt)
}   else {
let biomeHere = this.world.islandGenerator.GetBiomeType(x*16+i, z*16+k);
if (biomeHere === -3161286) {
this.setBlock(i, gen, k, blockIds.sand)
this.setBlock(i, gen - 1, k, blockIds.sand)
this.setBlock(i, gen - 2, k, blockIds.sand)
this.setBlock(i, gen - 3, k, blockIds.sand)
this.biomes[k * 16 + i] = biomeIds.desert
}   else if (biomeHere === -1) {
this.setBlock(i, gen, k, blockIds.snowBlock)
this.setBlock(i, gen - 1, k, blockIds.snowBlock)
this.setBlock(i, gen - 2, k, blockIds.stone)
this.setBlock(i, gen - 3, k, blockIds.stone)
this.biomes[k * 16 + i] = biomeIds.snowyPlains
}   else if (biomeHere === -4934476 || biomeHere === -8355712 || biomeHere === -6963874) {
this.setBlock(i, gen, k, blockIds.stone)
this.setBlock(i, gen - 1, k, blockIds.stone)
this.setBlock(i, gen - 2, k, blockIds.stone)
this.setBlock(i, gen - 3, k, blockIds.stone)
this.biomes[k * 16 + i] = biomeIds.desert
} else if (biomeHere === -65536) {
this.setBlock(i, gen, k, blockIds.Lava)
this.setBlock(i, gen - 1, k, blockIds.stone)
this.setBlock(i, gen - 2, k, blockIds.stone)
this.setBlock(i, gen - 3, k, blockIds.stone)
this.biomes[k * 16 + i] = biomeIds.desert
} else {
this.setBlock(i, gen, k, blockIds.grass)
this.setBlock(i, gen - 1, k, blockIds.dirt)
this.setBlock(i, gen - 2, k, blockIds.dirt)
this.setBlock(i, gen - 3, k, blockIds.dirt)
this.biomes[k * 16 + i] = biomeIds.plains
}
}
} else if(this.world.superflat === "void"){
this.biomes[k * 16 + i] = biomeIds.void
} else if(this.world.superflat){
this.tops[k * 16 + i] = gen;
this.biomes[k * 16 + i] = biomeIds.plains
this.setBlock(i, gen, k, blockIds.grass);
this.setBlock(i, gen - 1, k, blockIds.dirt);
this.setBlock(i, gen - 2, k, blockIds.dirt);
this.setBlock(i, gen - 3, k, blockIds.dirt);
}else{
let biome = noiseProfile.noise((trueX + i) * biomeSmooth, (trueZ + k) * biomeSmooth);
var b = getBiome(biome)
this.biomes[k * 16 + i] = biomeIds[b]
if(b === "desert"){
this.tops[k * 16 + i] = gen;
this.setBlock(i, gen, k, blockIds.sand);
this.setBlock(i, gen - 1, k, blockIds.sand);
this.setBlock(i, gen - 2, k, blockIds.sandstone);
this.setBlock(i, gen - 3, k, blockIds.sandstone);
if(gen<60) {
gen = 59;
this.setBlock(i, gen+1, k, blockIds.Water);
this.setBlock(i, gen, k, blockIds.Water);
this.setBlock(i, gen - 1, k, blockIds.Water);
this.setBlock(i, gen - 2, k, blockIds.gravel);
this.setBlock(i, gen - 3, k, blockIds.gravel);
}
if(gen>120){
this.setBlock(i, gen, k, blockIds.stone);
}
if(gen>140){
this.setBlock(i, gen, k, blockIds.sand);
}
}
if(b === "plains" || b === "forest"){
this.tops[k * 16 + i] = gen;
this.setBlock(i, gen, k, blockIds.grass);
this.setBlock(i, gen - 1, k, blockIds.dirt);
this.setBlock(i, gen - 2, k, blockIds.dirt);
this.setBlock(i, gen - 3, k, blockIds.dirt);
if(gen<60) {
gen = 59;
this.setBlock(i, gen+1, k, blockIds.Water);
this.setBlock(i, gen, k, blockIds.Water);
this.setBlock(i, gen - 1, k, blockIds.Water);
this.setBlock(i, gen - 2, k, blockIds.gravel);
this.setBlock(i, gen - 3, k, blockIds.gravel);
}
}
if(b === "snowyPlains"){
this.tops[k * 16 + i] = gen;
if(gen >= 60){
var h = ceil(((floatGen + 0.5) % 1) * 8)
switch(h){//really smooth terrain!
case 1:
this.setBlock(i, gen + 1, k, blockIds.snow | LAYER1)
break
case 2:
this.setBlock(i, gen + 1, k, blockIds.snow | LAYER2)
break
case 3:
this.setBlock(i, gen + 1, k, blockIds.snow | LAYER3)
break
case 4:
this.setBlock(i, gen + 1, k, blockIds.snow | LAYER4)
break
case 5:
this.setBlock(i, gen + 1, k, blockIds.snow | LAYER5)
break
case 6:
this.setBlock(i, gen + 1, k, blockIds.snow | LAYER6)
break
case 7:
this.setBlock(i, gen + 1, k, blockIds.snow | LAYER7)
break
case 8:
this.setBlock(i, gen + 1, k, blockIds.snowBlock)
break
}
this.setBlock(i, gen, k, blockIds.grass | CROSS);
this.setBlock(i, gen - 1, k, blockIds.dirt);
this.setBlock(i, gen - 2, k, blockIds.dirt);
this.setBlock(i, gen - 3, k, blockIds.dirt);
}
if(gen<60) {
gen = 59;
this.setBlock(i, gen+1, k, blockIds.ice);
this.setBlock(i, gen, k, blockIds.ice);
this.setBlock(i, gen - 1, k, blockIds.Water);
this.setBlock(i, gen - 2, k, blockIds.gravel);
this.setBlock(i, gen - 3, k, blockIds.gravel);
}
}
if(b === "sparseJungle" || b === "jungle" || b === "bambooJungle"){
this.tops[k * 16 + i] = gen;
if(b === "bambooJungle") this.setBlock(i, gen, k, blockIds.podzol)
else this.setBlock(i, gen, k, blockIds.grass)
this.setBlock(i, gen - 1, k, blockIds.dirt);
this.setBlock(i, gen - 2, k, blockIds.dirt);
this.setBlock(i, gen - 3, k, blockIds.dirt);
if(gen<60) {
this.setBlock(i, 60, k, blockIds.Water);
for(var y=59; y>=gen; y--){
this.setBlock(i, y, k, blockIds.Water);
}
this.setBlock(i, gen, k, blockIds.gravel);
this.setBlock(i, gen - 1, k, blockIds.gravel);
}
}
}
if(this.type === "" && this.world.superflat !== "void"){
for (let j = 1; j < gen - 3; j++) {
this.setBlock(i, j, k, blockIds.stone)
}
this.setBlock(i, 0, k, blockIds.bedrock)
}
}
}}else{
let {blocks,tops,biomes,hasSemiTrans,minY,maxY,densityBottoms,densities} = await doWork({generate:true,trueX,trueZ,seed:this.world.worldSeed})
this.tops = tops
this.solidTops.set(tops)
this.biomes = biomes
if(hasSemiTrans){
this.doubleRender = true
}
this.minY = minY
this.maxY = maxY
if(this.caves){ //Caves turned off
for(let i=0; i<blocks.length; i++){
this.sections[i] = new Section(this.x, i*16+minHeight, this.z, this, blocks[i])
}
}else{
this.densityBottoms = densityBottoms, this.densities = densities//Used for caves
this.tempSections = blocks//For later
}
}
this.generating = false
this.generated = true
}
generateOldBlob(replace, blockID, amount, x,y,z, size = 1){
// Blob code from https://biome-testing.lukep0wers.repl.co
// generate blobs (ore blobs, dirt blobs, etc)
let newX=0, newY=0, newZ=0
for(let cv = 0; cv < amount; cv++) {
var block = this.getBlock(x+newX, y+newY, z+newZ)
var canReplace = false
if(Array.isArray(replace)){
for(var id of replace){
if(block === id){
canReplace = true
break
}
}
}else{
if(block === replace) {
canReplace = true
}
}
if(canReplace) this.setBlock(x+newX, y+newY, z+newZ,blockID);
newX = round(random(-size, size));
newY = round(random(-size, size));
newZ = round(random(-size, size));
}
}
generateBlob(X,Y,Z,replace,oreSegments,oreWeirdness,oreSize,oreSegmentSize, flat = false){
oreSize = round(oreSize)
let {world} = this
//https://www.khanacademy.org/computer-programming/ore-generator/6387555023765504
let balls=[],bx=0,by=0,bz=0;
let dx=random()*2-1,dy=random()*2-1,dz=random()*2-1;
for(let i=0;i<oreSegments;i++){
let d=Math.hypot(dx,dy,dz);
dx /= d;
dy /= d;
dz /= d;
balls.push(bx,by,bz);
bx += dx*oreWeirdness;
if(!flat) by += dy*oreWeirdness;
bz += dz*oreWeirdness;
if(bx>oreSize){
bx = -oreSize;
}
if(bx<-oreSize){
bx = oreSize;
}
if(by>oreSize){
by = -oreSize;
}
if(by<-oreSize){
by = oreSize;
}
if(bz>oreSize){
bz = -oreSize;
}
if(bz<-oreSize){
bz = oreSize;
}
dx=random()*2-1;
dy=random()*2-1;
dz=random()*2-1;
}
for(let x=-oreSize;x<oreSize;x++){
for(let y=-oreSize;y<oreSize;y++){
for(let z=-oreSize;z<oreSize;z++){
let block = replace[world.getBlock(X+x,Y+y,Z+z,this.type)]
if(block === undefined) continue
if(typeof block === "function") block = block()
let d=0;
for(let i=0; i<balls.length; i+=3){
d += 1/dist3(balls[i],balls[i+1],balls[i+2],x,y,z);
}
if(d>1/oreSegmentSize){
world.spawnBlock(X+x,Y+y,Z+z,block,this.type, true)
}
}
}
}
}
spawnOres(replace,tries,minY,maxY,type, oreSize, oreSegmentSize = oreSize/10, oreWeirdness = 4, oreSegments = 8){
for(let i=0;i<tries;i++){
let y
if(type === "triangle"){
y = random()
if(random() > 1-abs(0.5-y)*2) continue
y = round(lerp(y,minY,maxY))
}else y = round(random(minY,maxY))
let x = round(random(15)), z = round(random(15))
if(!replace[this.getBlock(this.x+x,y,this.z+z)] || replace.biomes && !replace.biomes.includes(biomeIds[this.biomes[z*16+x]])) continue
this.generateBlob(this.x+x,y,this.z+z,replace,oreSegments,oreWeirdness,oreSize,oreSegmentSize)
}
}
allFlowers = [blockIds.lilyOftheValley, blockIds.poppy, blockIds.dandelion, 
blockIds.blueOrchid, blockIds.pinkTulip, blockIds.orangeTulip, blockIds.redTulip, blockIds.whiteTulip,
blockIds.azureBluet, blockIds.cornFlower, blockIds.purpleFlower, blockIds.witherRose,
blockIds.allium, blockIds.oxeyeDaisy,
blockIds.lilac, blockIds.roseBush, blockIds.peony,
blockIds.TallGrass, blockIds.DoubleTallGrass]
trashland = [blockIds.grass,blockIds.blackConcrete,blockIds.blackTerracotta,blockIds.soup3,blockIds.coalBlock,blockIds.ancientDebris,blockIds.obsidian,blockIds.blackstone,blockIds.tuff,blockIds.mud]
spawnSmallTree(i,ground,k,wx,wz,isBirch,dying){
let place
let {type, world} = this
let top = ground + floor(4.5 + random(2.5))
let rand = floor(random(4096))
let tree = isBirch === undefined ? (random() < 0.6 ? blockIds.oakLog : ++top && blockIds.birchLog) : (isBirch ? blockIds.birchLog : blockIds.oakLog)
let leaf = tree === blockIds.oakLog ? blockIds.oakLeaves : blockIds.birchLeaves
//Center
for (let j = ground + 1; j <= top; j++) {
this.setBlock(i, j, k, tree)
if(dying) worldGenArray.add(wx,j,wz,blockIds.vine)
}
this.setBlock(i, top + 1, k, leaf)
this.setBlock(i, ground, k, blockIds.dirt)
//Bottom leaves
for (let x = -2; x <= 2; x++) {
for (let z = -2; z <= 2; z++) {
if (x || z) {
if ((x * z & 7) === 4) {
place = rand & 1
rand >>>= 1
if (place) {
world.spawnBlock(wx + x, top - 2, wz + z, leaf, type)
}
} else {
world.spawnBlock(wx + x, top - 2, wz + z, leaf, type)
}
}
}
}
//2nd layer leaves
for (let x = -2; x <= 2; x++) {
for (let z = -2; z <= 2; z++) {
if (x || z) {
if ((x * z & 7) === 4) {
place = rand & 1
rand >>>= 1
if (place) {
world.spawnBlock(wx + x, top - 1, wz + z, leaf, type)
}
} else {
world.spawnBlock(wx + x, top - 1, wz + z, leaf, type)
}
}
}
}
//3rd layer leaves
for (let x = -1; x <= 1; x++) {
for (let z = -1; z <= 1; z++) {
if (x || z) {
if (x & z) {
place = rand & 1
rand >>>= 1
if (place) {
world.spawnBlock(wx + x, top, wz + z, leaf, type)
}
} else {
world.spawnBlock(wx + x, top, wz + z, leaf, type)
}
}
}
}
//Top leaves
world.spawnBlock(wx + 1, top + 1, wz, leaf, type)
world.spawnBlock(wx, top + 1, wz - 1, leaf, type)
world.spawnBlock(wx, top + 1, wz + 1, leaf, type)
world.spawnBlock(wx - 1, top + 1, wz, leaf, type)
}
spawnSnowSmallTree(i,ground,k,wx,wz){
let place
let {type, world} = this
let top = ground + floor(4.5 + random(2.5))
let rand = floor(random(4096))
let tree = random() < 0.6 ? blockIds.oakLog : ++top && blockIds.birchLog
let leaf = tree === blockIds.oakLog ? blockIds.oakLeaves : blockIds.birchLeaves
let snow = blockIds.snow
//Center
for (let j = ground + 1; j <= top; j++) {
this.setBlock(i, j, k, tree)
}
this.setBlock(i, top + 1, k, leaf)
this.setBlock(i, ground, k, blockIds.dirt)
this.setBlock(i, top + 2, k, snow | LAYER2)
//Top leaves
world.spawnBlock(wx + 1, top + 1, wz, leaf, type)
world.spawnBlock(wx, top + 1, wz - 1, leaf, type)
world.spawnBlock(wx, top + 1, wz + 1, leaf, type)
world.spawnBlock(wx - 1, top + 1, wz, leaf, type)
world.spawnBlock(wx + 1, top + 2, wz, snow | LAYER1, type)
world.spawnBlock(wx, top + 2, wz - 1, snow | LAYER1, type)
world.spawnBlock(wx, top + 2, wz + 1, snow | LAYER1, type)
world.spawnBlock(wx - 1, top + 2, wz, snow | LAYER1, type)
//Bottom leaves
for (let x = -2; x <= 2; x++) {
for (let z = -2; z <= 2; z++) {
if (x || z) {
if ((x * z & 7) === 4) {
place = rand & 1
rand >>>= 1
if (place) {
world.spawnBlock(wx + x, top - 2, wz + z, leaf, type)
}
} else {
world.spawnBlock(wx + x, top - 2, wz + z, leaf, type)
}
}
}
}
//3rd layer leaves
for (let x = -1; x <= 1; x++) {
for (let z = -1; z <= 1; z++) {
if (x || z) {
if (x & z) {
place = rand & 1
rand >>>= 1
if (place) {
world.spawnBlock(wx + x, top, wz + z, leaf, type)
if(rand & 2) world.spawnBlock(wx + x, top + 1, wz + z, snow | LAYER2, type)
else world.spawnBlock(wx + x, top + 1, wz + z, snow | LAYER1, type)
}
} else {
world.spawnBlock(wx + x, top, wz + z, leaf, type)
world.spawnBlock(wx + x, top + 1, wz + z, snow | LAYER1, type)
}
}
}
}
//2nd layer leaves
for (let x = -2; x <= 2; x++) {
for (let z = -2; z <= 2; z++) {
if (x || z) {
if ((x * z & 7) === 4) {
place = rand & 1
rand >>>= 1
if (place) {
world.spawnBlock(wx + x, top - 1, wz + z, leaf, type)
if(rand & 2) world.spawnBlock(wx + x, top, wz + z, snow | LAYER2, type)
else world.spawnBlock(wx + x, top, wz + z, snow | LAYER1, type)
}
} else {
world.spawnBlock(wx + x, top - 1, wz + z, leaf, type)
world.spawnBlock(wx + x, top, wz + z, snow | LAYER1, type)
}
}
}
}
//get rid of snow underneath
/*for (let x = -1; x <= 1; x++) {
for (let z = -1; z <= 1; z++) {
if(x || z){
var g = world.getTop(wx,wz)
if(g) world.setBlock(wx+i, g+1, wz+k, 0)
}
}
}*/
//
}
spawnCactus(i,ground,k){
let rnd = random()
let top = ground + Math.floor(2.5 + rnd*1.5);
let rand = Math.floor(random(4096));
let tree = blockIds.cactus | CACTUS;
//Center
for (let j = ground + 1; j <= top; j++) {
this.setBlock(i, j, k, tree);
}
//Fruit
switch(round(rnd*4)){
case 0:
this.setBlock(i, top+1, k, blockIds.newCactusFruit|CROSS);
break
case 1:
this.setBlock(i, top+1, k, blockIds.greenCactusFruit|CROSS);
break
case 2:
this.setBlock(i, top+1, k, blockIds.redCactusFruit|CROSS);
break
}
}
spawnSmallJungleTree(i,ground,k,wx,wz){
let place
let {type, world} = this
let rand = floor(random(4096))
let tall = floor(5 + random(5)) //5 to 10
let top = ground + tall
let tree = blockIds.jungleLog
let leaf = blockIds.jungleLeaves
//Center
for (let j = ground + 1; j <= top; j++) {
this.setBlock(i, j, k, tree)
worldGenArray.add(wx,j,wz,blockIds.vine)
worldGenArray.add(wx,j,wz,blockIds.cocoa)
}
this.setBlock(i, top + 1, k, leaf)
this.setBlock(i, ground, k, blockIds.dirt)
//Bottom leaves
for (let x = -2; x <= 2; x++) {
for (let z = -2; z <= 2; z++) {
if (x || z) {
if ((x * z & 7) === 4) {
place = rand & 1
rand >>>= 1
if (place) {
world.spawnBlock(wx + x, top - 2, wz + z, leaf, type)
worldGenArray.add(wx+x,top-2,wz+z,blockIds.vine)
}
} else {
world.spawnBlock(wx + x, top - 2, wz + z, leaf, type)
worldGenArray.add(wx+x,top-2,wz+z,blockIds.vine)
}
}
}
}
//2nd layer leaves
for (let x = -2; x <= 2; x++) {
for (let z = -2; z <= 2; z++) {
if (x || z) {
if ((x * z & 7) === 4) {
place = rand & 1
rand >>>= 1
if (place) {
world.spawnBlock(wx + x, top - 1, wz + z, leaf, type)
worldGenArray.add(wx+x,top-1,wz+z,blockIds.vine)
}
} else {
world.spawnBlock(wx + x, top - 1, wz + z, leaf, type)
worldGenArray.add(wx+x,top-1,wz+z,blockIds.vine)
}
}
}
}
//3rd layer leaves
for (let x = -1; x <= 1; x++) {
for (let z = -1; z <= 1; z++) {
if (x || z) {
if (x & z) {
place = rand & 1
rand >>>= 1
if (place) {
world.spawnBlock(wx + x, top, wz + z, leaf, type)
worldGenArray.add(wx+x,top,wz+z,blockIds.vine)
}
} else {
world.spawnBlock(wx + x, top, wz + z, leaf, type)
worldGenArray.add(wx+x,top,wz+z,blockIds.vine)
}
}
}
}
//Top leaves
world.spawnBlock(wx + 1, top + 1, wz, leaf, type)
world.spawnBlock(wx, top + 1, wz - 1, leaf, type)
world.spawnBlock(wx, top + 1, wz + 1, leaf, type)
world.spawnBlock(wx - 1, top + 1, wz, leaf, type)
worldGenArray.add(wx+1,top+1,wz,blockIds.vine)
worldGenArray.add(wx,top+1,wz-1,blockIds.vine)
worldGenArray.add(wx,top+1,wz+1,blockIds.vine)
worldGenArray.add(wx-1,top+1,wz,blockIds.vine)
}
spawnJungleTree(i,ground,k,wx,wz){
let {type, world} = this
let tall = floor(10 + random(20)) //10 to 30
let top = ground + tall
let tree = blockIds.jungleLog
let leaf = blockIds.jungleLeaves
//Center
for (let j = ground + 1; j < top; j++) {
this.setBlock(i, j, k, tree)
world.spawnBlock(wx + 1, j, wz, tree, type)
world.spawnBlock(wx, j, wz + 1, tree, type)
world.spawnBlock(wx+1, j, wz+1, tree, type)
}
this.setBlock(i, ground, k, blockIds.dirt)
world.spawnBlock(wx + 1, ground, wz, blockIds.dirt, type)
world.spawnBlock(wx, ground, wz + 1, blockIds.dirt, type)
world.spawnBlock(wx+1, ground, wz+1, blockIds.dirt, type)
//Messy part
//leaves
let w2 = 5 * 5
let d2 = 5 * 5
let h2 = 5 * 5
for(var x=-4.5; x<4.5; x++){
for(var y=2; y<4.5; y++){
for(var z=-4.5; z<4.5; z++){
let n = x * x / w2 + y * y / h2 + z * z / d2
if (n < 1) {
world.spawnBlock(wx + x+1, top-4+y, wz + z+1, leaf, type)
worldGenArray.add(wx+x+1,top-4+y,wz+z+1,blockIds.vine)
}
}
}
}
//the diagonal branches
w2 = 3 * 3
d2 = 3 * 3
h2 = 3 * 3
for(y=ground+5; y<top; y += Math.floor(random(10))){
let side = floor(random(4))
let mx=0,mz=0
switch(side){
case 0:
mx=1
break
case 1:
mx=-1
break
case 2:
mz=1
break
case 3:
mz=-1
break
}
let x = mx === 1?2:mx, z = mz === 1?2:mz
let rnd = floor(random(4))+2
//branch
for(var by=0; by<rnd; by++){
world.spawnBlock(wx+x, y+by, wz+z, tree, type)
worldGenArray.add(wx+x,y+by,wz+z,blockIds.vine)
x += mx
z += mz
}
x -= mx
z -= mz
by -= 1
//leaves
for(var lx=-3; lx<3; lx++){
for(var ly=1; ly<3; ly++){
for(var lz=-3; lz<3; lz++){
let n = lx * lx / w2 + ly * ly / h2 + lz * lz / d2
if (n < 1) {
world.spawnBlock(wx+x + lx, y+by+ly, wz+z + lz, leaf, type)
worldGenArray.add(wx+x+lx,y+by+ly,wz+z+lz,blockIds.vine)
}
}
}
}
// m = move; l = leaf
}
//vines
for(var vi=0; vi<10; vi++){
var vy = random(ground, top)
var side = floor(random(4))
var vx = wx, vz = wz
switch(side){
case 0:
vz += 2
side = SOUTH
break
case 1:
vz -= 1
side = NORTH
break
case 2:
vx += 2
side = WEST
break
case 3:
vx -= 1
side = EAST
break
}
var vh = max(floor(random(ground,vy)), ground)
for(; vy > vh && !world.getBlock(vx, vy, vz, type); vy --){
world.spawnBlock(vx,vy,vz, blockIds.vine | WALLFLAT | side, type)
}
}
}
spawnJungleBush(i,k,wx,ground,wz){
let {type, world} = this
let place, rand = floor(random(512))//9 bits
let leaf = blockIds.jungleLeaves
this.setBlock(i,ground+1,k,blockIds.jungleLog)
//bottom leaves
for (let x = -2; x <= 2; x++) {
for (let z = -2; z <= 2; z++) {
if (x || z) {
if ((x * z & 7) === 4) {
place = rand & 1
rand >>>= 1
if (place) {
world.spawnBlock(wx + x, ground+1, wz + z, leaf, type)
}
} else {
world.spawnBlock(wx + x, ground+1, wz + z, leaf, type)
}
}
}
}
//2nd layer
for (let x = -1; x <= 1; x++) {
for (let z = -1; z <= 1; z++) {
if (x & z) {
place = rand & 1
rand >>>= 1
if (place) {
world.spawnBlock(wx + x, ground+2, wz + z, leaf, type)
}
} else {
world.spawnBlock(wx + x, ground+2, wz + z, leaf, type)
}
}
}
if(rand & 1){
this.setBlock(i,ground+3,k,leaf)
}
}
spawnNetherMushroom(i,ground,k,wx,wz,b){
let place
let {type, world} = this
let tall = floor(4.5 + random(2.5))
if(floor(random(12)) === 1) tall *= 2
let top = ground + tall
let rand = floor(random(4096))
let tree
let leaf
if(b === "warpedForest"){
tree = blockIds.warpedStem
leaf = blockIds.warpedWartBlock
}else if(b === "crimsonForest"){
tree = blockIds.crimsonStem
leaf = blockIds.netherWartBlock
}
//Center
for (let j = ground + 1; j <= top; j++) {
this.setBlock(i, j, k, tree)
}
this.setBlock(i, top + 1, k, leaf)
this.setBlock(i, ground, k, blockIds.netherrack)
//Shroomlight
for(var l=0; l<3; l++) world.spawnBlock(wx + random(-2, 2), top + random(-1,1), wz + random(-2,2), blockIds.shroomlight, type)
//Top leaves
for(var x=-1; x<2; x++){
for(var z=-1; z<2; z++){
place = (x&1) && (z&1) ? rand & 1 : true
rand >>>= 1
if(place){
world.spawnBlock(wx + x, top + 1, wz + z, leaf, type)
}
}
}
//layer 2 leaves
for(var x=-2; x<3; x++){
for(var z=-2; z<3; z++){
place = (x===2 || x===-2) && (z===2 || z==-2) ? rand & 1 : true
rand >>>= 1
if(place){
world.spawnBlock(wx + x, top, wz + z, leaf, type)
}
}
}
rand = floor(random(4096))
//layer 1 leaves
for(var x=-2; x<3; x++){
for(var z=-2; z<3; z++){
place = x===2 || x===-2 || z===2 || z==-2 ? !(rand & 1) : false
rand >>>= 1
if(place){
world.spawnBlock(wx + x, top - 1, wz + z, leaf, type)
}
}
}
rand = floor(random(40964096))
//drooping leaves
for(var x=-2; x<3; x++){
for(var z=-2; z<3; z++){
place = x===2 || x===-2 || z===2 || z==-2
rand >>>= 1
if(place){
var h = rand & 4 && rand & 8 ? rand & 3 : 0
if(h){
world.spawnBlock(wx + x, top - 1, wz + z, leaf, type) //to make sure removed ones are put back
for(var y=0; y<h; y++){
world.spawnBlock(wx + x, top - 2 - y, wz + z, leaf, type)
}
}
}
}
}
if(b === "crimsonForest"){
rand = floor(random(40964096))
//vines
for(var x=-2; x<3; x++){
for(var z=-2; z<3; z++){
place = x===2 || x===-2 || z===2 || z==-2
rand >>>= 1
if(place){
var h = (rand & 4 && rand & 8) ? (rand & (tall-2)) - 1 : 0
if(h){
world.spawnBlock(wx + x, top - 1, wz + z, leaf, type) //to make sure removed ones are put back
for(var y=0; y<h; y++){
world.spawnBlock(wx + x, top - 2 - y, wz + z, blockIds.weepingVinesPlant, type)
}
world.spawnBlock(wx + x, top - 2 - h, wz + z, blockIds.weepingVines, type)
}
}
}
}
}
}
spawnBamboo(i,ground,k){
if(random() < 0.2){
this.setBlock(i, ground+1, k, blockIds.bambooShoot | CROSS)
}else{
var h = round(4+random()*10)
let top = ground+h
for(var y=ground+1; y<top+1; y++){
if(y === top){
this.setBlock(i,y,k,blockIds.bambooStalk | STAIR)
}else if(y === top-1){
this.setBlock(i,y,k,blockIds.bambooStalk | SLAB)
}else{
this.setBlock(i,y,k,blockIds.bambooStalk)
}
}
}
}
spawnLavaRiver(wx,ground,wz){
let {type, world} = this
let it = 0
let x=wx, y=ground, z=wz
let dir=floor(random(0,8))
for(; it<100; it++){
let xp,zp
switch(dir){
case 0:
x+=1
zp=true
break
case 1:
x+=1
z+=1
break
case 2:
z+=1
xp=true
break
case 3:
x-=1
z+=1
break
case 4:
x-=1
zp=true
break
case 5:
x-=1
z-=1
break
case 6:
z-=1
xp=true
break
case 7:
x+=1
z-=1
break
}
if(random() < 0.08){
dir += round(random(-1,1))
}
let prev = world.getBlock(x,y,z, type)
world.spawnBlock(x,y,z,blockIds.Lava,type,true)
if(xp){
world.spawnBlock(x+1,y,z,blockIds.Lava,type,true)
}
if(zp){
world.spawnBlock(x,y,z+1,blockIds.Lava,type,true)
}
if(!prev && y>1){
y--
prev = world.getBlock(x,y,z, type)
world.spawnBlock(x,y,z,blockIds.Lava,type,true)
while(!prev && y>1){
y--
prev = world.getBlock(x,y,z, type)
world.spawnBlock(x,y,z,blockIds.Lava,type,true)
}
}
if(world.getBlock(x,y-1,z, type) === blockIds.Lava) break
}
}
spawnBigOak(i,ground,k,wx,wz){
let {type, world} = this
var heightLimit = Math.floor(random(11)+3)
var trunkHeight
var leafDistanceLimit = 7
var heightAttenuation = 1/0.618
var branchCount
var branchSlope = 0.381
let tree = blockIds.oakLog
let leaf = blockIds.oakLeaves
var branches = []
trunkHeight = Math.floor(heightLimit * heightAttenuation)
if(heightLimit > 10) branchCount = 2
else branchCount = 1
branches.push([wx,ground+trunkHeight,wz])
var endy = trunkHeight//heightLimit * 0.3
var maxDist = heightLimit * 0.664 / 2
var minDist = maxDist * 0.247
for(var y=heightLimit - leafDistanceLimit; y<endy; y+=heightAttenuation){
for(var b=0; b<branchCount; b++){
var arr = []
var dist = random(maxDist-minDist)+minDist
var angle = random(Math.PI*2)
var sy = y-(dist*branchSlope)
var ex = wx+(dist*Math.sin(angle))
var ez = wz+(dist*Math.cos(angle))
line3D(ex,y+ground,ez,wx,sy+ground,wz,arr)
branches.push(arr)
}
}
for(var y=0; y<trunkHeight; y++){
this.setBlock(i,ground+y,k,tree)
}
var miny = heightLimit*0.2
for(var b of branches){
var x = b[0]
var y = b[1]
var z = b[2]
if(y >= miny+ground){
for(var bi=0;bi<b.length;bi+=3){
world.spawnBlock(b[bi],b[bi+1],b[bi+2],tree,type)
}
}
}
for(var b of branches){
var l = b.length
var x = b[l-3]
var y = b[l-2]
var z = b[l-1]
let w = 2.8, h = 2.3
let w2 = w*w, h2 = h*h
for (let ly = floor(-h); ly < ceil(h); ly++) {
for (let lx = floor(-w); lx <= ceil(w); lx++) {
for (let lz = floor(-w); lz <= ceil(w); lz++) {
let n = lx * lx / w2 + ly * ly / h2 + lz * lz / w2
if (n < 1) {
world.spawnBlock(lx + x, ly + y, lz + z, leaf,type)
}
}
}
}
}
}
spawnFallenTree(i,ground,k,wx,wz,tree,minDist,maxDist,hasVines){//oak: 4-7, birch: 5-15
let {type, world} = this
let length = round(random(minDist,maxDist))
let rnd = floor(random(8))
let distance = (rnd&1)+2
let direction = (rnd>>1)&3
let sw = blockData[tree].swId
let dx = 0, dz = 0, rot
switch(direction){
case 0:
dx = 1
rot = EAST
break
case 1:
dz = 1
rot = NORTH
break
case 2:
dx = -1
rot = WEST
break
case 3:
dz = -1
rot = SOUTH
break
}
rnd = floor(random(256))
this.setBlock(i,ground,k,blockIds.dirt)
this.setBlock(i,ground+1,k,tree)
if(hasVines && random()<hasVines){
worldGenArray.add(wx,ground+1,wz,blockIds.vine)
}
for(let l=0; l<length; l++){
let x = wx+(distance+l)*dx, z = wz+(distance+l)*dz
world.spawnBlock(x,ground+1,z,sw|rot,type)
if(rnd&1){
let mushroom = ((rnd>>1)&1) ? blockIds.redMushroom : blockIds.brownMushroom
world.spawnBlock(x,ground+2,z,mushroom,type)
}
rnd >>= 2
}
}
spawnTallBirch(i,ground,k,wx,wz){
let place
let {type, world} = this
let top = ground + floor(5.5 + random(8.5))
let rand = floor(random(4096))
let tree = blockIds.birchLog
let leaf = blockIds.birchLeaves
//Center
for (let j = ground + 1; j <= top; j++) {
this.setBlock(i, j, k, tree)
}
this.setBlock(i, top + 1, k, leaf)
this.setBlock(i, ground, k, blockIds.dirt)
//Bottom leaves
for (let x = -2; x <= 2; x++) {
for (let z = -2; z <= 2; z++) {
if (x || z) {
if ((x * z & 7) === 4) {
place = rand & 1
rand >>>= 1
if (place) {
world.spawnBlock(wx + x, top - 2, wz + z, leaf, type)
}
} else {
world.spawnBlock(wx + x, top - 2, wz + z, leaf, type)
}
}
}
}
//2nd layer leaves
for (let x = -2; x <= 2; x++) {
for (let z = -2; z <= 2; z++) {
if (x || z) {
if ((x * z & 7) === 4) {
place = rand & 1
rand >>>= 1
if (place) {
world.spawnBlock(wx + x, top - 1, wz + z, leaf, type)
}
} else {
world.spawnBlock(wx + x, top - 1, wz + z, leaf, type)
}
}
}
}
//3rd layer leaves
for (let x = -1; x <= 1; x++) {
for (let z = -1; z <= 1; z++) {
if (x || z) {
if (x & z) {
place = rand & 1
rand >>>= 1
if (place) {
world.spawnBlock(wx + x, top, wz + z, leaf, type)
}
} else {
world.spawnBlock(wx + x, top, wz + z, leaf, type)
}
}
}
}
//Top leaves
world.spawnBlock(wx + 1, top + 1, wz, leaf, type)
world.spawnBlock(wx, top + 1, wz - 1, leaf, type)
world.spawnBlock(wx, top + 1, wz + 1, leaf, type)
world.spawnBlock(wx - 1, top + 1, wz, leaf, type)
}
spawnSpruce(i,ground,k,wx,wz){
let {type, world} = this
let top = ground + floor(random(5,12))
let tree = blockIds.spruceLog
let leaf = blockIds.spruceLeaves
let topOffseted = top+round(random())
let bigStart = 5 //Which layer do big ones start
for (let j = ground + 1; j <= top; j++) {
this.setBlock(i, j, k, tree)
}
this.setBlock(i, top + 1, k, leaf)
this.setBlock(i, ground, k, blockIds.dirt)
//Top leaves
world.spawnBlock(wx + 1, topOffseted, wz, leaf, type)
world.spawnBlock(wx, topOffseted, wz - 1, leaf, type)
world.spawnBlock(wx, topOffseted, wz + 1, leaf, type)
world.spawnBlock(wx - 1, topOffseted, wz, leaf, type)
for(let j=topOffseted-2, l=0; j>ground+1; j--, l++){
if(l > bigStart && !(l%2)){//big layer
for (let x = -3; x <= 3; x++) {
for (let z = -3; z <= 3; z++) {
if (x || z) {
if (abs(x) !== 3 || abs(z) !== 3) {
world.spawnBlock(wx + x, j, wz + z, leaf, type)
}
}
}
}
}else if((l%2) || l>bigStart){//medium big layer
for (let x = -2; x <= 2; x++) {
for (let z = -2; z <= 2; z++) {
if (x || z) {
if ((x * z & 7) !== 4) {
world.spawnBlock(wx + x, j, wz + z, leaf, type)
}
}
}
}
}else{//small layer
world.spawnBlock(wx + 1, j, wz, leaf, type)
world.spawnBlock(wx, j, wz - 1, leaf, type)
world.spawnBlock(wx, j, wz + 1, leaf, type)
world.spawnBlock(wx - 1, j, wz, leaf, type)
}
}
}
spawnPine(i,ground,k,wx,wz){
let {type, world} = this
let top = ground + floor(random(6,10))
let tree = blockIds.spruceLog
let leaf = blockIds.spruceLeaves
let layers = round(random(2.25,3.75))
for (let j = ground + 1; j <= top; j++) {
this.setBlock(i, j, k, tree)
}
this.setBlock(i, top + 1, k, leaf)
this.setBlock(i, ground, k, blockIds.dirt)
for(let l=0; l<layers; l++){
if(layers === 3 && l === 1){//medium big layer
for (let x = -2; x <= 2; x++) {
for (let z = -2; z <= 2; z++) {
if (x || z) {
if ((x * z & 7) !== 4) {
world.spawnBlock(wx + x, top-l, wz + z, leaf, type)
}
}
}
}
}else{
world.spawnBlock(wx+1, top - l, wz, leaf, type)
world.spawnBlock(wx-1, top - l, wz, leaf, type)
world.spawnBlock(wx, top - l, wz+1, leaf, type)
world.spawnBlock(wx, top - l, wz-1, leaf, type)
}
}
}
spawnBigSpruce(i,ground,k,wx,wz){
let {type, world} = this
let top = ground + floor(random(15,27))
let tree = blockIds.spruceLog
let leaf = blockIds.spruceLeaves
this.generateBlob(wx,ground,wz,this.patches.podzol,4,3,6,1.5,true)
for (let j = ground + 1; j < top; j++) {
this.setBlock(i, j, k, tree)
world.spawnBlock(wx + 1, j, wz, tree, type)
world.spawnBlock(wx, j, wz + 1, tree, type)
world.spawnBlock(wx+1, j, wz+1, tree, type)
}
this.setBlock(i, ground, k, blockIds.dirt)
world.spawnBlock(wx + 1, ground, wz, blockIds.dirt, type)
world.spawnBlock(wx, ground, wz + 1, blockIds.dirt, type)
world.spawnBlock(wx+1, ground, wz+1, blockIds.dirt, type)
//Top leaves
this.setBlock(i, top, k, leaf)
world.spawnBlock(wx + 1, top, wz, leaf, type)
world.spawnBlock(wx, top, wz + 1, leaf, type)
world.spawnBlock(wx+1, top, wz+1, leaf, type)
//2nd layer leaves
world.spawnBlock(wx-1, top-1, wz, leaf, type)
world.spawnBlock(wx-1, top-1, wz+1, leaf, type)
world.spawnBlock(wx, top-1, wz-1, leaf, type)
world.spawnBlock(wx+1, top-1, wz-1, leaf, type)
world.spawnBlock(wx+2, top-1, wz, leaf, type)
world.spawnBlock(wx+2, top-1, wz+1, leaf, type)
world.spawnBlock(wx, top-1, wz+2, leaf, type)
world.spawnBlock(wx+1, top-1, wz+2, leaf, type)
for (let j = top-2, l=0; j > ground+4; j--, l++) {
let size = round(l/4+(l%2)+1)
let s2 = size * size
for(let x=-size; x<=size; x++){
for(let z=-size; z<=size; z++){
let n = (x+0.5)**2 / s2 + (z+0.5)**2 / s2
if (n < 1) {
world.spawnBlock(wx + x+1, j, wz + z+1, leaf, type)
}
}
}
}
}
spawnBigPine(i,ground,k,wx,wz){
let {type, world} = this
let top = ground + floor(random(15,27))
let tree = blockIds.spruceLog
let leaf = blockIds.spruceLeaves
let layers = round(random(3,7))
this.generateBlob(wx,ground,wz,this.patches.podzol,4,3,6,1.5,true)
for (let j = ground + 1; j < top; j++) {
this.setBlock(i, j, k, tree)
world.spawnBlock(wx + 1, j, wz, tree, type)
world.spawnBlock(wx, j, wz + 1, tree, type)
world.spawnBlock(wx+1, j, wz+1, tree, type)
}
this.setBlock(i, ground, k, blockIds.dirt)
world.spawnBlock(wx + 1, ground, wz, blockIds.dirt, type)
world.spawnBlock(wx, ground, wz + 1, blockIds.dirt, type)
world.spawnBlock(wx+1, ground, wz+1, blockIds.dirt, type)
for (let j = top, l=0; l<layers; j--, l++) {
let size = l+1
let s2 = size * size
for(let x=-size; x<=size; x++){
for(let z=-size; z<=size; z++){
let n = (x+0.5)**2 / s2 + (z+0.5)**2 / s2
if (n < 1) {
world.spawnBlock(wx + x+1, j, wz + z+1, leaf, type)
}
}
}
}
}
spawnAcacia(i,ground,k,wx,wz){
let {type, world} = this
let top = ground + floor(random(6,8))
let tree = blockIds.acaciaLog
let leaf = blockIds.acaciaLeaves
for (let j = ground + 1; j < top; j++) {
this.setBlock(i, j, k, tree)
}
let rnd = floor(random(16384))
let branch1 = rnd&3 //branch length
let branch2 = (rnd>>2)&3
let branch1Top = (rnd>>4)&1//vertical part of branch
let branch2Top = (rnd>>5)&1
let size1 = 3+((rnd>>6)&1)//radius of leaves
let size2 = 3+((rnd>>7)&1)
let dir1 = (rnd>>8)&3//direction of branch
let dir2 = (rnd>>10)&3
let offset1 = (rnd>>12)&1//branch go down
let offset2 = (rnd>>13)&1
//branch 1
let dx = 0, dz = 0, y = top-1-offset1, x = wx, z = wz
switch(dir1){
case 0: dx = 1; break
case 1: dz = 1; break
case 2: dx = -1; break
case 3: dz = -1; break
}
for(let i=0; i<branch1; i++){
x += dx, z += dz, y++
world.spawnBlock(x,y,z,tree,type)
}
if(branch1Top){
y++
world.spawnBlock(x,y,z,tree,type)
}
let s2 = size1 ** 2
for(var x2=-size1; x2<size1; x2++){
for(var y2=size1-2; y2<size1; y2++){
for(var z2=-size1; z2<size1; z2++){
let n = x2 * x2 / s2 + y2 * y2 / s2 + z2 * z2 / s2
if (n < 1) {
world.spawnBlock(x+x2, y-1+y2, z+z2, leaf, type)
}
}
}
}
if(!branch1 && !branch2 || dir1 === dir2) return
//branch 2
dx = 0, dz = 0, y = top-1-offset2, x = wx, z = wz
switch(dir2){
case 0: dx = 1; break
case 1: dz = 1; break
case 2: dx = -1; break
case 3: dz = -1; break
}
for(let i=0; i<branch2; i++){
x += dx, z += dz, y++
world.spawnBlock(x,y,z,tree,type)
}
if(branch2Top){
y++
world.spawnBlock(x,y,z,tree,type)
}
s2 = size2 ** 2
for(var x2=-size2; x2<size2; x2++){
for(var y2=size2-2; y2<size2; y2++){
for(var z2=-size2; z2<size2; z2++){
let n = x2 * x2 / s2 + y2 * y2 / s2 + z2 * z2 / s2
if (n < 1) {
world.spawnBlock(x+x2, y-1+y2, z+z2, leaf, type)
}
}
}
}
}
spawnBigAcacia(i,ground,k,wx,wz){
let {type, world} = this
let top = ground + floor(random(14,20))
let tree = blockIds.acaciaLog
let leaf = blockIds.acaciaLeaves
let sw = blockData[tree].swId
for (let j = ground + 1; j < top; j++) {
this.setBlock(i, j, k, tree)
}
for (let j = top-6; j < top; j++) {//branches
if(j === top-1 || random()>0.5){
let dir = floor(random(16))
let dx = 0, dz = 0, dy = ((dir>>2)+1)/4, y = j, x = wx, z = wz, rot
switch(dir&3){
case 0: dx = 1; rot = EAST; break
case 1: dz = 1; rot = NORTH; break
case 2: dx = -1; rot = WEST; break
case 3: dz = -1; rot = SOUTH; break
}
let length = (1-dy+0.25)*8
for(let l=0; l<length; l++){
x += dx, z += dz, y += dy
world.spawnBlock(x,round(y),z,sw|rot,type)
}
y = round(y)
for(var x2=-8; x2<8; x2++){
for(var y2=6; y2<8; y2++){
for(var z2=-8; z2<8; z2++){
let n = x2 * x2 / 64 + y2 * y2 / 64 + z2 * z2 / 64
if (n < 1) {
world.spawnBlock(x+x2, y-6+y2, z+z2, leaf, type)
}
}
}
}
}
}
}
spawnDisk(wx,wz, replace, block, underBlock = block, radius){
let {type, world} = this
let r2 = radius**2
for(let x2=-radius; x2<radius; x2++){
for(let z2=-radius; z2<radius; z2++){
let n = x2 * x2 / r2 + z2 * z2 / r2
if (n < 1) {
let y = world.getSolidTop(wx+x2,wz+z2,type)
let blockHere = world.getBlock(wx+x2, y, wz+z2,type)
if(!replace.includes(blockHere)) continue
let under = block !== underBlock && world.getBlock(wx+x2, y+1, wz+z2,type)
world.spawnBlock(wx+x2, y, wz+z2, under ? underBlock : block, type, true)
}
}
}
}
spawnRock(X,Y,Z,type){
const {world} = this
let oreSegments,oreWeirdness,oreSize,oreSegmentSize
let isStone = false
if(type === "big"){
oreSegments = 4,oreWeirdness = 6,oreSize = 12,oreSegmentSize = 1.8
isStone = random() > 0.2
}else if(type === "mossy" || type === "small"){
oreSegments = 4,oreWeirdness = 0.5,oreSize = 3,oreSegmentSize = 0.4
}else if(type === "medium"){
oreSegments = 4,oreWeirdness = 2,oreSize = 8,oreSegmentSize = 1
isStone = random() > 0.5
}
oreSize = round(oreSize)
//https://www.khanacademy.org/computer-programming/ore-generator/6387555023765504
let balls=[],bx=0,by=0,bz=0;
let dx=random()*2-1,dy=1,dz=random()*2-1;
for(let i=0;i<oreSegments;i++){
let d=Math.hypot(dx,dy,dz);
dx /= d;
dy /= d;
dz /= d;
balls.push(bx,by,bz);
bx += dx*oreWeirdness;
by += dy*oreWeirdness;
bz += dz*oreWeirdness;
if(bx>oreSize){
bx = -oreSize;
}
if(bx<-oreSize){
bx = oreSize;
}
if(by>oreSize){
by = -oreSize;
}
if(by<-oreSize){
by = oreSize;
}
if(bz>oreSize){
bz = -oreSize;
}
if(bz<-oreSize){
bz = oreSize;
}
dx=random()*2-1;
dy=random()*2-(type==="big"?1.4:0.75);//go up more
dz=random()*2-1;
}
for(let x=-oreSize;x<oreSize;x++){
for(let y=oreSize-1;y>=-oreSize;y--){
for(let z=-oreSize;z<oreSize;z++){
let d=0;
for(let i=0; i<balls.length; i+=3){
d += 1/dist3(balls[i],balls[i+1],balls[i+2],x,y,z);
}
if(d>1/oreSegmentSize){
if(type === "mossy"){
world.spawnBlock(X+x,Y+y,Z+z,blockIds.mossyCobble,this.type, true)
}else if(type === "small"){
world.spawnBlock(X+x,Y+y,Z+z,blockIds.cobblestone,this.type, true)
}else if(isStone){
world.spawnBlock(X+x,Y+y,Z+z,blockIds.stone,this.type, true)
}else{
if(!world.getBlock(X+x,Y+y+1,Z+z,this.type) && random() > (type==="big" ? 0.65 : 0.4)){
world.spawnBlock(X+x,Y+y,Z+z, blockIds.grass, this.type, true)
if(random()>0.75) world.spawnBlock(X+x,Y+y+1,Z+z, blockIds.TallGrass, this.type, true)
}else{
world.spawnBlock(X+x,Y+y,Z+z, random()>0.5?blockIds.stone:blockIds.cobblestone, this.type, true)
}
}
if(world.getBlock(X+x,Y+y-1,Z+z,this.type) === blockIds.grass){
world.spawnBlock(X+x,Y+y-1,Z+z,blockIds.dirt,this.type, true)
}
}
}
}
}
}
/*spawnAquifer(){ //Unused because it can affect ores and trees differntly each load
let {type, world} = this
let ax = 6//floor(random(16))+this.x
let az = 8//floor(random(16))+this.z
let ay = 12//floor(random(minHeight,this.tops[az*16+ax]))
if(world.getBlock(ax,ay,az,type)) return
let aquiferSpreadAt = [ax,ay,az,0], aquiferSpreaded = 0
let maxHeight = ay //Will get lower if the aquifer overflows so that it doesn't overflow
let maxDist = 16**2
let barrierDist = 15**2
let dist
while(aquiferSpreadAt.length){
let [x,y,z] = aquiferSpreadAt.splice(0,4)
if(y > maxHeight) continue //Prevent doing extra unneeded stuff
dist = (ax-x)**2 + (ay-y)**2 + (az-z)**2
if(dist > maxDist){
maxHeight = min(maxHeight, world.getTop(x,z,type)) //Prevent overflow if outside cave
}else{
if(!world.getBlock(x+1,y,z,type) && !xyArrayHas(aquiferSpreadAt,bigArray,x+1,y,z,undefined,aquiferSpreaded)) aquiferSpreadAt.push(x+1,y,z,0)
if(!world.getBlock(x-1,y,z,type) && !xyArrayHas(aquiferSpreadAt,bigArray,x-1,y,z,undefined,aquiferSpreaded)) aquiferSpreadAt.push(x-1,y,z,0)
if(!world.getBlock(x,y,z+1,type) && !xyArrayHas(aquiferSpreadAt,bigArray,x,y,z+1,undefined,aquiferSpreaded)) aquiferSpreadAt.push(x,y,z+1,0)
if(!world.getBlock(x,y,z-1,type) && !xyArrayHas(aquiferSpreadAt,bigArray,x,y,z-1,undefined,aquiferSpreaded)) aquiferSpreadAt.push(x,y,z-1,0)
if(!world.getBlock(x,y-1,z,type) && !xyArrayHas(aquiferSpreadAt,bigArray,x,y-1,z,undefined,aquiferSpreaded)) aquiferSpreadAt.push(x,y-1,z,0)
}
bigArray[aquiferSpreaded++] = x
bigArray[aquiferSpreaded++] = y
bigArray[aquiferSpreaded++] = z
bigArray[aquiferSpreaded++] = dist>barrierDist
}
console.log(ax,ay,az,aquiferSpreaded)
for(let i=0; i<aquiferSpreaded; i+=4){
if(bigArray[i+1] > maxHeight) continue
let x = bigArray[i], y = bigArray[i+1], z = bigArray[i+2]
let barrier = bigArray[i+3]
world.spawnBlock(x,y,z,barrier?blockIds.stone:blockIds.Water,type,true)
}
}*/
/*spawnAmethystGeode(X,Y,Z){
const {world} = this
let oreSegments = 4, oreWeirdness = 1, oreSize = 9
//https://www.khanacademy.org/computer-programming/ore-generator/6387555023765504
let balls=[],bx=0,by=0,bz=0;
let dx=random()*2-1,dy=1,dz=random()*2-1;
for(let i=0;i<oreSegments;i++){
let d=Math.hypot(dx,dy,dz);
dx /= d;
dy /= d;
dz /= d;
balls.push(bx,by,bz);
bx += dx*oreWeirdness;
by += dy*oreWeirdness;
bz += dz*oreWeirdness;
if(bx>oreSize){
bx = -oreSize;
}
if(bx<-oreSize){
bx = oreSize;
}
if(by>oreSize){
by = -oreSize;
}
if(by<-oreSize){
by = oreSize;
}
if(bz>oreSize){
bz = -oreSize;
}
if(bz<-oreSize){
bz = oreSize;
}
dx=random()*2-1;
dy=random()*2-1;
dz=random()*2-1;
}
let buds = []
for(let x=-oreSize;x<=oreSize;x++){
for(let y=oreSize;y>=-oreSize;y--){
for(let z=-oreSize;z<=oreSize;z++){
let d=0;
for(let i=0; i<balls.length; i+=3){
d += 1/dist3(balls[i],balls[i+1],balls[i+2],x,y,z);
}
if(d>0.8){
world.spawnBlock(X+x,Y+y,Z+z,0,this.type,true)
}else if(d>0.7){
let bud = random()>0.8
world.spawnBlock(X+x,Y+y,Z+z, bud?blockIds.buddingAmethyst:blockIds.amethystBlock,this.type,true)
if(bud) buds.push(X+x,Y+y,Z+z)
}else if(d>0.6){
world.spawnBlock(X+x,Y+y,Z+z,blockIds.calcite,this.type,true)
}else if(d>0.5){
world.spawnBlock(X+x,Y+y,Z+z,blockIds.smoothBasalt,this.type,true)
}
}
}
}
for(let i=0; i<buds.length; i+=3){
let x = buds[i], y = buds[i+1], z = buds[i+2]
let type = round(random(3))
let block
switch(type){
case 0:
block = blockIds.amethystCluster
break
case 1:
block = blockIds.smallAmethystBud
break
case 2:
block = blockIds.mediumAmethystBud
break
case 3:
block = blockIds.largeAmethystBud
break
}
world.spawnBlock(x,y+1,z,block|CROSS,this.type)
world.spawnBlock(x,y-1,z,block|SLAB,this.type)
world.spawnBlock(x+1,y,z,block|WEST,this.type)
world.spawnBlock(x-1,y,z,block|EAST,this.type)
world.spawnBlock(x,y,z+1,block|SOUTH,this.type)
world.spawnBlock(x,y,z-1,block|NORTH,this.type)
}
}*/
patches = {
flowers:[blockIds.poppy,blockIds.dandelion],
forestFlowers:[blockIds.poppy,blockIds.dandelion,blockIds.lilac,blockIds.roseBush,blockIds.peony,blockIds.lilyOftheValley],
plainsFlowers:[blockIds.poppy,blockIds.poppy,blockIds.azureBluet,blockIds.azureBluet,blockIds.oxeyeDaisy,blockIds.oxeyeDaisy,blockIds.cornFlower,blockIds.cornFlower,blockIds.orangeTulip,blockIds.pinkTulip,blockIds.redTulip,blockIds.whiteTulip],
flowerForestFlowers:[blockIds.dandelion,blockIds.poppy,blockIds.allium,blockIds.azureBluet,blockIds.orangeTulip,blockIds.pinkTulip,blockIds.redTulip,blockIds.whiteTulip,blockIds.oxeyeDaisy,blockIds.cornFlower,blockIds.lilyOftheValley],
sunflowerPlainsFlowers:[blockIds.sunflower,blockIds.sunflower,blockIds.sunflower,blockIds.sunflower,blockIds.sunflower,blockIds.sunflower,blockIds.poppy,blockIds.azureBluet,blockIds.oxeyeDaisy,blockIds.cornFlower],
meadowFlowers:[blockIds.poppy,blockIds.dandelion,blockIds.allium,blockIds.azureBluet,blockIds.cornFlower,blockIds.oxeyeDaisy],
grass:[blockIds.TallGrass],
tallGrass:[blockIds.TallGrass,blockIds.DoubleTallGrass],
grassFern:[blockIds.TallGrass,blockIds.DoubleTallGrass,blockIds.fern,blockIds.largeFern],
fernGrass:[blockIds.fern,blockIds.largeFern,blockIds.TallGrass,blockIds.DoubleTallGrass],
fern:[blockIds.fern,blockIds.largeFern],
fernBerries:[blockIds.fern,blockIds.sweetBerryBush|CROSS,blockIds.largeFern],
grassLeaves:[blockIds.TallGrass,blockIds.driedOakLeaves],
lushCaves:[blockIds.TallGrass,blockIds.DoubleTallGrass,blockIds.mossCarpet|CARPET,blockIds.azalea,blockIds.floweringAzalea],
jungle:[blockIds.TallGrass,blockIds.DoubleTallGrass,blockIds.fern,blockIds.largeFern,blockIds.mossCarpet|CARPET,blockIds.azalea,blockIds.floweringAzalea],
seagrass:[blockIds.seagrass,blockIds.tallSeagrass],
mostTallGras:[blockIds.DoubleTallGrass,blockIds.DoubleTallGrass,blockIds.DoubleTallGrass,blockIds.TallGrass],
dirtOre: {[blockIds.stone]:blockIds.dirt},
gravelOre: {[blockIds.stone]:blockIds.gravel,[blockIds.deepslate]:blockIds.gravel},
graniteOre: {[blockIds.stone]:blockIds.granite,[blockIds.deepslate]:blockIds.granite},
dioriteOre: {[blockIds.stone]:blockIds.diorite,[blockIds.deepslate]:blockIds.diorite},
andesiteOre: {[blockIds.stone]:blockIds.andesite,[blockIds.deepslate]:blockIds.andesite},
tuffOre: {[blockIds.stone]:blockIds.tuff,[blockIds.deepslate]:blockIds.tuff},
coalOre: {[blockIds.stone]:blockIds.coalOre,[blockIds.deepslate]:blockIds.deepslateCoalOre},
ironOre: {[blockIds.stone]:blockIds.ironOre,[blockIds.deepslate]:blockIds.deepslateIronOre},
copperOre: {[blockIds.stone]:blockIds.copperOre,[blockIds.deepslate]:blockIds.deepslateCopperOre},
redstoneOre: {[blockIds.stone]:blockIds.redstoneOre,[blockIds.deepslate]:blockIds.deepslateRedstoneOre},
lapisOre: {[blockIds.stone]:blockIds.lapisOre,[blockIds.deepslate]:blockIds.deepslateLapisOre},
goldOre: {[blockIds.stone]:blockIds.goldOre,[blockIds.deepslate]:blockIds.deepslateGoldOre},
diamondOre: {[blockIds.stone]:blockIds.diamondOre,[blockIds.deepslate]:blockIds.deepslateDiamondOre},
emeraldOre: {biomes:["windsweptHills","grove","jaggedPeaks","meadow","frozenPeaks","stonePeaks","windsweptForest","snowySlopes","windsweptGravelHills"], [blockIds.stone]:blockIds.emeraldOre,[blockIds.deepslate]:blockIds.deepslateEmeraldOre},
badlandsGoldOre: {biomes:["badlands,erodedBadlands,woodedBadlands"], [blockIds.stone]:blockIds.goldOre,[blockIds.deepslate]:blockIds.deepslateGoldOre},
limestoneOre: {[blockIds.stone]:blockIds.limestone,[blockIds.deepslate]:blockIds.limestone},
podzol:{[blockIds.grass]:blockIds.podzol,[blockIds.coarseDirt]:blockIds.podzol}, //For big spruce & pine
sandDisk:[blockIds.dirt,blockIds.grass],
clayDisk:[blockIds.dirt],
dirtDisk:[blockIds.dirt,blockIds.mud],
azaleaLeaves:{0:() => random() > 0.65 ? blockIds.floweringAzaleaLeaves : blockIds.azaleaLeaves}
}
async populate() {
const world = this.world
const {trees} = world
seedHash(world.worldSeed)
randomSeed(hash(this.x, this.z) * 210000000)
const {noiseProfile} = world
let wx = 0, wz = 0, ground = 0
let trueX = this.x, trueY = this.y, trueZ = this.z
let biome = 0
let type = this.type
worldGenArray.clear() //generate extras like vines
if(this.world.usePreBeta && type === ""){
const flowers = this.allFlowers
const clayReplaceable = [blockIds.dirt, blockIds.stone, blockIds.gravel]
const dirtReplaceable = [blockIds.stone,blockIds.gravel]
let smoothness = generator.smooth, hilliness = generator.height, biomeSmooth = generator.biomeSmooth
for (let i = 0; i < 16; i++) {
for (let k = 0; k < 16; k++) {
wx = this.x + i
wz = this.z + k
ground = this.tops[k * 16 + i]
//biome = superflat ? 0 : noiseProfile.noise((trueX + i) * biomeSmooth, (trueZ + k) * biomeSmooth)
//var b
//if(superflat){b = "plains"}else b = getBiome(biome)
//let nb = getNetherBiome(biome)
let b = biomes[this.biomes[k * 16 + i]]
if (trees && random() < 0.01 && type === "" && b === "plains" && this.getBlock(i, ground, k) === blockIds.grass) {
this.spawnSmallTree(i,ground,k,wx,wz)
}
if(b === "snowyPlains" && trees && random() < 0.01 && type === "" && this.getBlock(i, ground, k)){
this.spawnSnowSmallTree(i,ground,k,wx,wz)
}
// Cactus
if (random() < 0.01 && this.getBlock(i, ground, k) && b === "desert" && ground > 60 && this.type === "") {
this.spawnCactus(i,ground,k)
}
if (random() < 0.006 && this.getBlock(i, ground, k) && b === "desert" && ground > 60 && this.type === "") {
this.setBlock(i,ground+1,k, blockIds.deadBush | CROSS);
}
// Jungle trees
if(trees && random() < 0.01 && type === "" && (b === "sparseJungle" || b === "jungle") && this.getBlock(i, ground, k)){
this.spawnSmallJungleTree(i,ground,k,wx,wz)
}
//Giant jungle trees
if(trees && random() < 0.01 && type === "" && b === "jungle" && this.getBlock(i, ground, k)){
this.spawnJungleTree(i,ground,k,wx,wz)
}
if(trees && random() < 0.015 && type === "" && (b === "sparseJungle" || b === "jungle") && this.getBlock(i, ground, k)){
let w2 = 3 * 3
let d2 = 3 * 3
let h2 = 3 * 3
for(var x=-3; x<3; x++){
for(var y=1; y<3; y++){
for(var z=-3; z<3; z++){
let n = x * x / w2 + y * y / h2 + z * z / d2
if (n < 1) {
world.spawnBlock(wx+x, ground+y, wz+z, blockIds.jungleLeaves, type)
worldGenArray.add(wx+x,ground+y,wz+z,blockIds.vine)
}
}
}
}
this.setBlock(i, ground+1, k, blockIds.jungleLog)
}
//flowers and vines
if (random() < 0.05 && this.getBlock(i, ground, k, type) === blockIds.grass) {
var rnd = random()
var flower
if(b === "jungle"){
if(rnd > 0.75){
flower = blockIds.TallGrass
}else if(rnd > 0.5){
flower = blockIds.DoubleTallGrass
}else if(rnd > 0.25){
flower = blockIds.fern
}else{
flower = blockIds.largeFern
}
}else flower = flowers[Math.round(rnd * (flowers.length - 1))]
world.spawnBlock(wx, ground+1, wz, flower, type);
}
//bamboo
if(random() < 0.2 && this.getBlock(i, ground, k) && b === "bambooJungle" && ground > 60 && this.type === ""){
this.spawnBamboo(i,ground,k)
}
// Blocks of each per chunk in Minecraft
// Coal: 185.5
// Iron: 111.5
// Gold: 10.4
// Redstone: 29.1
// Diamond: 3.7
// Lapis: 4.1
//there is also copper
ground -= 4
if (random() < 3.7 / 256) {
let y = random() * 16 | 0 + 1
y = y < ground ? y : ground
if (this.getBlock(i, y, k)) {
//this.setBlock(i, y < ground ? y : ground, k, blockIds.diamondOre)
this.generateOldBlob(blockIds.stone, blockIds.diamondOre, round(random(3, 8)), i,y,k, 10)
}
}
if (random() < 111.5 / 256) {
let y = random() * 64 | 0 + 1
y = y < ground ? y : ground
if (this.getBlock(i, y, k)) {
//this.setBlock(i, y < ground ? y : ground, k, blockIds.ironOre)
this.generateOldBlob(blockIds.stone, blockIds.ironOre, round(random(1, 13)), i,y,k, 9)
}
}
if (random() < 51 / 256) {
let y = random() * 64 | 0 + 1
y = y < ground ? y : ground
if (this.getBlock(i, y, k)) {
//this.setBlock(i, y < ground ? y : ground, k, blockIds.copperOre)
this.generateOldBlob(blockIds.stone, blockIds.copperOre, round(random(1, 16)), i,y,k, 9)
}
}
if (random() < 185.5 / 256) {
let y = random() * ground | 0 + 1
y = y < ground ? y : ground
if (this.getBlock(i, y, k)) {
//this.setBlock(i, y < ground ? y : ground, k, blockIds.coalOre)
this.generateOldBlob(blockIds.stone, blockIds.coalOre, round(random(1, 37)), i,y,k, 20)
}
}
if (random() < 10.4 / 256) {
let y = random() * 32 | 0 + 1
y = y < ground ? y : ground
if (this.getBlock(i, y, k)) {
//this.setBlock(i, y < ground ? y : ground, k, blockIds.goldOre)
this.generateOldBlob(blockIds.stone, blockIds.goldOre, round(random(1, 13)), i,y,k, 9)
}
}
if (random() < 29.1 / 256) {
let y = random() * 16 | 0 + 1
y = y < ground ? y : ground
if (this.getBlock(i, y, k)) {
//this.setBlock(i, y < ground ? y : ground, k, blockIds.redstoneOre)
this.generateOldBlob(blockIds.stone, blockIds.redstoneOre, round(random(1, 10)), i,y,k, 8)
}
}
if (random() < 4.1 / 256) {
let y = random() * 32 | 0 + 1
y = y < ground ? y : ground
if (this.getBlock(i, y, k)) {
//this.setBlock(i, y < ground ? y : ground, k, blockIds.lapisOre)
this.generateOldBlob(blockIds.stone, blockIds.lapisOre, round(random(1, 9)), i,y,k, 9)
}
}
//clay & dirt
if (random() < 0.1) {
let y = random() * ground | 0 + 1
y = y < ground ? y : ground
if (this.getBlock(i, y, k)/* && blockData[this.getBlock(i, y+1, k)].name === "Water"*/) {
this.generateOldBlob(clayReplaceable, blockIds.clay, round(random(20, 40)), i,y,k, 5)
}
}
if (random() < 0.1) {
let y = random() * ground | 0 + 1
y = y < ground ? y : ground
if (this.getBlock(i, y, k)) {
this.generateOldBlob(dirtReplaceable, blockIds.dirt, round(random(20, 40)), i,y,k, 5)
}
}
}
}
}else if(this.type === "nether"){
for (let i = 0; i < 16; i++) {
for (let k = 0; k < 16; k++) {
if (random() < 0.005 && type === "nether" && ground > 79 && (b === "crimsonForest" || b === "warpedForest")){
this.spawnNetherMushroom(i,ground,k,wx,wz,b)
}
var block = this.getBlock(i, ground, k)
if(random() < 0.05){
if(block === blockIds.crimsonNylium){
world.spawnBlock(wx, ground+1, wz, blockIds.crimsonRoots, type);
}else if(block === blockIds.warpedNylium){
world.spawnBlock(wx, ground+1, wz, blockIds.warpedRoots, type);
}
}
//lava rivers
if(random() < 0.005 && this.getBlock(i,ground,k, type) && this.type==="nether"){
this.spawnLavaRiver(wx,ground,wz)
}
let l
if(random() < 0.005){
/*let r = random(12345123451234512345)*3
let x=wx, y=this.ceils[k * 16 + i], z=wz
let ri=floor(random(5,15))
for(l=0; l<ri; l++){
x += r&1 - 1; r >>>= 1
y += r&3 - 2; r >>>= 1
z += r&1 - 1; r >>>= 1
world.spawnBlock(x,y,z, blockIds.glowstone)
}*/
this.generateOldBlob(0, blockIds.glowstone, 20, wx,this.ceils[k * 16 + i],wz, 2)
}
for(l=0; l<16; l++){
let x = random(0, 16)
let y = random(10, 177)
let z = random(0, 16)
if(world.getBlock(wx+x,y,wz+z,this.type) === blockIds.netherrack && world.getBlock(wx+x,y+1,wz+z,this.type) === blockIds.netherrack && world.getBlock(wx+x,y-1,wz+z,this.type) === blockIds.netherrack){
world.setBlock(wx+x,y,wz+z, blockIds.netherQuartzOre, false,false,false,false,this.type)
}
}
for(l=0; l<10; l++){
let x = random(0, 16)
let y = random(10, 177)
let z = random(0, 16)
if(world.getBlock(wx+x,y,wz+z,this.type) === blockIds.netherrack && world.getBlock(wx+x,y+1,wz+z,this.type) === blockIds.netherrack && world.getBlock(wx+x,y-1,wz+z,this.type) === blockIds.netherrack){
world.setBlock(wx+x,y,wz+z, blockIds.netherGoldOre, false,false,false,false,this.type)
}
}
}
}
}else if(!this.world.usePreBeta){
if(trees) for (let i = 0; i < 16; i++) {
for (let k = 0; k < 16; k++) {
wx = this.x + i
wz = this.z + k
ground = this.tops[k * 16 + i]
let b = biomes[this.biomes[k * 16 + i]]
let birchAndOak, bigOak, oak, birch, tallBirch, smallJungle, bigJungle, spruce, pine, bigSpruce, bigPine, acacia, bigAcacia
let deadBush, cactus, sugarcane = 0.2, melonPatch, kelp
let rock = 0.025, rockType = "medium"
let grassType, flowerType, bamboo, flowerDensity = 0.65, grassDensity = 0.4, seagrass //flowerDensity more is less flowers
let fallenOak, fallenBirch, fallenTallBirch, fallenJungle, fallenSpruce
switch(b){
case "forest":
birchAndOak = 9, bigOak = 0.5, flowerType = this.patches.forestFlowers, grassType = this.patches.grassLeaves
break
case "plains":
oak = 0.1, bigOak = 0.0333333333, rock = 0, flowerType = this.patches.plainsFlowers, grassType = this.patches.tallGrass
break
case "flowerForest":
birchAndOak = 4, bigOak = 0.25, flowerDensity = 0.35, flowerType = this.patches.flowerForestFlowers, grassType = this.patches.grass
break
case "sunflowerPlains":
flowerDensity = 0.4, flowerType = this.patches.sunflowerPlainsFlowers, grassType = this.patches.tallGrass
break
case "meadows":
birchAndOak = 0.02, bigOak = 0.02, flowerDensity = 0.6, rock = 0, flowerType = this.patches.meadowFlowers, grassType = this.patches.mostTallGras, grassDensity = 0.1
break
case "birchForest":
birch = 9, flowerType = this.patches.forestFlowers, grassType = this.patches.grass
break
case "oldBirchForest":
tallBirch = 9, flowerType = this.patches.forestFlowers, grassType = this.patches.grass
break
case "sparseJungle":
bamboo = 0.25, smallJungle = 2, bigOak = 0.25, melonPatch = true, grassType = this.patches.grass
break
case "jungle":
bamboo = 0.25, smallJungle = 8, bigJungle = 1, bigOak = 0.5, melonPatch = true, grassType = this.patches.jungle
break
case "bambooJungle":
bamboo = 180, bigJungle = 1, bigOak = 0.5, melonPatch = true, grassType = this.patches.grass
break
case "desert":
deadBush = 1, cactus = 1, sugarcane = 0.4, rock = 0
break
case "oldSpruceTaiga":
deadBush = 1, spruce = 1, bigSpruce = 2, pine = 0.25, bigPine = 0.125, rock = 1, rockType = "mossy", grassType = this.patches.fern, grassDensity = 0.65, flowerType = this.patches.flowers
break
case "oldPineTaiga":
deadBush = 1, pine = 1, bigPine = 2, spruce = 0.25, bigSpruce = 0.125, rock = 1, rockType = "mossy", grassType = this.patches.fern, grassDensity = 0.65, flowerType = this.patches.flowers
break
case "grove":
spruce = 2, pine = 0.666666667, rock = 0
break
case "windsweptGravelHills":
oak = 0.05, spruce = 0.0333, bigOak = 0.005, flowerDensity = 0.8, rock = 1, rockType = "small", flowerType = this.patches.flowers, grassType = this.patches.grass, grassDensity = 0.6
break
case "windsweptForest":
oak = 1, spruce = 0.666, bigOak = 0.1, flowerDensity = 0.8, rock = 1, rockType = "small", rock = 0, flowerType = this.patches.flowers, grassType = this.patches.grass, grassDensity = 0.6
break
case "windsweptHills":
rock = 1, rockType = "small"
break
case "taiga":
spruce = 2, pine = 0.666, flowerDensity = 0.8, flowerType = this.patches.flowers, grassType = this.patches.fernBerries, grassDensity = 0.5
break
case "snowyTaiga":
spruce = 2, pine = 0.666, flowerDensity = 0.8, flowerType = this.patches.flowers, grassType = this.patches.fernGrass, grassDensity = 0.5
break
case "snowyPlains":
spruce = 0.08, flowerType = this.patches.flowers, flowerDensity = 0.8, grassType = this.patches.grass, grassDensity = 0.65
break
case "woodedBadlands":
oak = 4, rock = 0, grassType = this.patches.grass, grassDensity = 0.65, deadBush = 1, cactus = 0.25
break
case "badlands":
case "erodedBadlands":
deadBush = 1, cactus = 1, rock = 0
break
case "savanna":
case "savannaPlateau":
acacia = 0.5, bigAcacia = 0.05, grassType = this.patches.tallGrass, flowerType = this.patches.flowers
break
case "snowySlopes":
case "frozenPeaks":
case "jaggedPeaks":
case "stonePeaks":
case "beach":
case "stonyShore":
case "snowyBeach":
case "lushHills":
rock = 0
break
case "ocean":
case "deepOcean":
case "coldOcean":
case "deepColdOcean":
//kelp = 0.5, seagrass = true, grassType = this.patches.seagrass
break
case "lukewarmOcean":
case "deepLukewarmOcean":
//kelp = 0.3, seagrass = true, grassType = this.patches.seagrass
break
case "warmOcean":
//seagrass = true, grassType = this.patches.seagrass
//todo: put coral
break
}
let under = this.getBlock(i,ground,k), aboveGround = this.getBlock(i,ground+1,k)
if(!aboveGround && bamboo && (under === blockIds.grass || under === blockIds.podzol) && random(256) < bamboo){
this.spawnBamboo(i,ground,k)
}
if(!aboveGround && birchAndOak && under === blockIds.grass && random(256) < birchAndOak){
this.spawnSmallTree(i,ground,k,wx,wz,random() > 0.8, random() > 0.9)
}
if(!aboveGround && oak && blockData[under].type === "ground" && random(256) < oak){
this.spawnSmallTree(i,ground,k,wx,wz,false)
}
if(!aboveGround && birch && under === blockIds.grass && random(256) < birch){
this.spawnSmallTree(i,ground,k,wx,wz,true)
}
if(!aboveGround && bigOak && under === blockIds.grass && random(256) < bigOak){
this.spawnBigOak(i,ground,k,wx,wz)
}
if(!aboveGround && tallBirch && under === blockIds.grass && random(256) < tallBirch){
this.spawnTallBirch(i,ground,k,wx,wz)
}
if(!aboveGround && smallJungle && under === blockIds.grass && random(256) < smallJungle){
if(random()>0.5) this.spawnSmallJungleTree(i,ground,k,wx,wz)
else this.spawnJungleBush(i,k,wx,ground,wz)
}
if(!aboveGround && bigJungle && under === blockIds.grass && random(256) < bigJungle){
this.spawnJungleTree(i,ground,k,wx,wz)
}
if(!aboveGround && deadBush && under && random(256) < deadBush){
this.setBlock(i,ground+1,k, blockIds.deadBush | CROSS);
}
if(!aboveGround && cactus && under && random(256) < cactus){
this.spawnCactus(i,ground,k)
}
if(!aboveGround && spruce && under && random(256) < spruce){
this.spawnSpruce(i,ground,k,wx,wz)
}
if(!aboveGround && pine && under && random(256) < pine){
this.spawnPine(i,ground,k,wx,wz)
}
if(!aboveGround && bigSpruce && under && random(256) < bigSpruce){
this.spawnBigSpruce(i,ground,k,wx,wz)
}
if(!aboveGround && bigPine && under && random(256) < bigPine){
this.spawnBigPine(i,ground,k,wx,wz)
}
if(!aboveGround && acacia && under && random(256) < acacia){
this.spawnAcacia(i,ground,k,wx,wz)
}
if(!aboveGround && bigAcacia && under && random(256) < bigAcacia){
this.spawnBigAcacia(i,ground,k,wx,wz)
}
fallenOak = (birchAndOak||oak||0) * 0.05, fallenBirch = (birchAndOak||birch||0) * 0.05, fallenTallBirch = (tallBirch||0) * 0.05
fallenJungle = (smallJungle||0) * 0.05, fallenSpruce = (spruce||pine||0) * 0.05
if(!aboveGround && fallenOak && random(256) < fallenOak){
this.spawnFallenTree(i,ground,k,wx,wz,blockIds.oakLog,4,7,0.75)
}
if(!aboveGround && fallenBirch && random(256) < fallenBirch){
this.spawnFallenTree(i,ground,k,wx,wz,blockIds.birchLog,5,8)
}
if(!aboveGround && fallenTallBirch && random(256) < fallenTallBirch){
this.spawnFallenTree(i,ground,k,wx,wz,blockIds.birchLog,5,15)
}
if(!aboveGround && fallenJungle && random(256) < fallenJungle){
this.spawnFallenTree(i,ground,k,wx,wz,blockIds.jungleLog,4,11,0.75)
}
if(!aboveGround && fallenSpruce && random(256) < fallenSpruce){
this.spawnFallenTree(i,ground,k,wx,wz,blockIds.spruceLog,6,10)
}
if(!aboveGround && ground < 64 && (under === blockIds.grass || under === blockIds.sand) && mapClamped(noiseProfile.noise(wx*0.1,5,wz*0.1),0.3,0.7) < sugarcane){
if(
world.getBlock(wx+1,ground,wz,this.type) === blockIds.Water ||
world.getBlock(wx-1,ground,wz,this.type) === blockIds.Water ||
world.getBlock(wx,ground,wz+1,this.type) === blockIds.Water ||
world.getBlock(wx,ground,wz-1,this.type) === blockIds.Water
){
this.setBlock(i,ground+1,k, blockIds.sugarCane|CROSS)
this.setBlock(i,ground+2,k, blockIds.sugarCane|CROSS)
if(random()>0.5) this.setBlock(i,ground+3,k, blockIds.sugarCane|CROSS)
}
}
if(!aboveGround && rock && random(256) < rock){
this.spawnRock(wx,ground,wz,rockType)
}
if(b==="trashland"){
let block=this.trashland[floor(random(this.trashland.length))]
let h = ceil(mapClamped(noiseProfile.noise(wx*0.2,7,wz*0.2),0.3,0.7)*3)
if(h===1 && !aboveGround && random()>0.6)block=blockIds.oil
for(let l=0;l<h;l++){
this.setBlock(i,ground+l,k, block)
}
}
if(!aboveGround && flowerType && under === blockIds.grass && random(mapClamped(noiseProfile.noise(wx*0.1,2,wz*0.1),0.3,0.7)) > flowerDensity){
let f = flowerType[round(mapClamped(noiseProfile.noise(wx*0.04,3,wz*0.04),0.3,0.7)*(flowerType.length-1))]
world.spawnBlock(wx, ground+1, wz, f, type)
}
if((!aboveGround || seagrass) && grassType && blockData[under].type === "ground" && random(mapClamped(noiseProfile.noise(wx*0.1,4,wz*0.1),0.3,0.7)) > grassDensity){
let f = grassType[floor(random()**3*grassType.length)] //first items are more common than last items
world.spawnBlock(wx, ground+1, wz, f, type, seagrass)
}
if(!aboveGround && under === blockIds.grass && mapClamped(noiseProfile.noise(wx*0.1,6,wz*0.1),0.3,0.7) > 0.9){
if(random() > 0.5) world.spawnBlock(wx, ground+1, wz, melonPatch ? blockIds.melon : blockIds.pumpkin, type)
}
if(kelp && random(mapClamped(noiseProfile.noise(wx*0.02,8,wz*0.02),0.3,0.7))>kelp){
let height = min(round(random(16,32)), 63-ground)
for(let l=0; l<height; l++){
world.spawnBlock(wx, ground+1+l, wz, l+1 === height ? blockIds.kelp : blockIds.kelpPlant, type,true)
}
}
if(aboveGround === blockIds.Water && random() < 8/256){
let disk = floor(random(4)), block, underBlock, replace
switch(disk){
case 0: block = blockIds.sand; replace = this.patches.sandDisk; break
case 1: block = blockIds.gravel; replace = this.patches.sandDisk; break
case 2: block = blockIds.clay; replace = this.patches.clayDisk; break
case 3: block = blockIds.grass; underBlock = blockIds.dirt; replace = this.patches.dirtDisk; break
}
this.spawnDisk(wx,wz, replace, block, underBlock, round(random(3,5)))
}
await yieldThread()
}
}
for (let i = 0; i < 16; i++) {
let wx = i+this.x
for (let k = 0; k < 16; k++) {
let wz = k+this.z
let b = biomes[this.caveBiomes[k * 16 + i]]
let caveMin = this.caveY[k*16+i]
let caveMax = this.caveY[k*16+i+256]
ground = this.tops[k * 16 + i]
if(b === "void" || caveMin === caveMax || !this.getBlock(i,caveMin-1,k) || !this.getBlock(i,caveMax+1,k)) continue
if(b === "dripstoneCaves"){
if(noiseProfile.noise(wx*0.1,22,wz*0.1) > 0.55 && !blockData[world.getBlock(wx+1,caveMin,wz)].transparent && !blockData[world.getBlock(wx-1,caveMin,wz)].transparent && !blockData[world.getBlock(wx,caveMin,wz+1)].transparent && !blockData[world.getBlock(wx,caveMin,wz-1)].transparent){
this.setBlock(i,caveMin,k,blockIds.Water)
continue
}
if(noiseProfile.noise(wx*0.04,20,wz*0.04) > 0.4){
this.setBlock(i,caveMin,k,blockIds.dripstoneBlock)
this.setBlock(i,caveMax,k,blockIds.dripstoneBlock)
}
if(random() > 0.75){
let h = round(random(8))
for(let l=1; l<h; l++){
this.setBlock(i,caveMin+l,k,blockIds.pointedDripstone)
if(caveMax-l <= caveMin+l) break
this.setBlock(i,caveMax-l,k,blockIds.pointedDripstone|FLIP)
}
for(let l=1; l<h; l++){
blockData[blockIds.pointedDripstone].spawnUpdate(trueX+i,caveMin+l,trueZ+k,blockIds.pointedDripstone,this.world,type)
if(caveMax-l <= caveMin+l) break
blockData[blockIds.pointedDripstone].spawnUpdate(trueX+i,caveMax-l,trueZ+k,blockIds.pointedDripstone|FLIP,this.world,type)
}
}
}else if(b === "lushCaves"){
if(noiseProfile.noise(wx*0.02,21,wz*0.02) > 0.55){
if(noiseProfile.noise(wx*0.05,23,wz*0.05) > 0.5 && world.getBlock(wx+1,caveMin,wz) && world.getBlock(wx-1,caveMin,wz) && world.getBlock(wx,caveMin,wz+1) && world.getBlock(wx,caveMin,wz-1)){
this.setBlock(i,caveMin,k, blockIds.Water)
}else{
this.setBlock(i,caveMin,k, blockIds.clay)
if(random() > 0.96){
let h = round(random(1,4))
if(h === 1){
this.setBlock(i,caveMin+1,k, blockIds.smallDripleaf)
}else{
for(let l=0; l<h; l++){
this.setBlock(i,caveMin+1+l,k, l === h-1 ? blockIds.bigDripleaf : (blockIds.bigDripleaf|CROSS))
}
}
}
}
}else{
this.setBlock(i,caveMin,k, blockIds.mossBlock)
let grassType = this.patches.lushCaves
if(grassType && random() > 0.5){
let f = grassType[floor(random()**3*grassType.length)] //first items are more common than last items
world.spawnBlock(wx, caveMin+1, wz, f, type)
}
}
this.setBlock(i,caveMax,k, blockIds.mossBlock)
if(random() > 0.9){
let h = round(random(1,6))
for(let l=0; l<h; l++){
this.setBlock(i, caveMax-1-l, k, (random() > 0.25 ? (l === h-1 ? blockIds.caveVines : blockIds.caveVinesPlant) : (l === h-1 ? blockIds.caveVinesLit : blockIds.caveVinesPlantLit)) | CROSS)
}
}
}
//glow lichen
let x = i, z = k
let y = round(random(0,caveMax))
if(!this.getBlock(x,y,z)) continue
let block = blockIds.glowLichen | WALLFLAT
switch(floor(random()*4)){
case 0:
z++
block = block | SOUTH
break
case 1:
z--
block = block | NORTH
break
case 2:
x++
block = block | WEST
break
case 3:
x--
block = block | EAST
break
}
if(!this.getBlock(x,y,z)) this.setBlock(x,y,z,block)
//azalea trees
if(b === "lushCaves" && random() < 0.001){
let top = ground + floor(6 + random(2.5))
for (let j = ground; j <= top; j++) {
this.setBlock(i, j, k, blockIds.oakLog)
}
this.generateBlob(wx,top,wz,this.patches.azaleaLeaves, 8,1,8,0.4)
for(var l = 0; ground+l > caveMax-3; l--) {
for(var m = 0; m < 14; m++) {
let rX = round(random(-2.75, 2.75));
let rZ = round(random(-2.75, 2.75));
let here = this.getBlock(i+rX, ground+l, k+rZ)
if(here !== blockIds.grass && here !== blockIds.air) {
this.setBlock(i+rX, ground+l, k+rZ, blockIds.rootedDirt);
} else if(this.getBlock(i+rX, ground+l+1, k+rZ)===blockIds.rootedDirt) {
this.setBlock(i+rX, ground+l, k+rZ, blockIds.hangingRoots | CROSS);
}
}
}
}
await yieldThread()
}
}
this.spawnOres(this.patches.dirtOre,1,0,160,"", 8)
this.spawnOres(this.patches.gravelOre,1,0,320,"", 8)
this.spawnOres(this.patches.graniteOre,1,0,128,"", 8)
this.spawnOres(this.patches.dioriteOre,1,0,128,"", 8)
this.spawnOres(this.patches.andesiteOre,2,0,128,"", 8)
this.spawnOres(this.patches.tuffOre,2,-64,0,"", 8)
await yieldThread()
this.spawnOres(this.patches.coalOre,20,0,192,"triangle", 4)
this.spawnOres(this.patches.coalOre,30,136,320,"", 4)
this.spawnOres(this.patches.ironOre,20,-64,72,"", 3)
this.spawnOres(this.patches.ironOre,20,-24,56,"triangle", 3)
this.spawnOres(this.patches.copperOre,20,-16,112,"triangle", 3)
this.spawnOres(this.patches.redstoneOre,8,-64,15,"", 3)
await yieldThread()
this.spawnOres(this.patches.redstoneOre,16,-96,-32,"triangle", 3)
this.spawnOres(this.patches.lapisOre,4,-32,32,"triangle", 3)
this.spawnOres(this.patches.lapisOre,8,-64,64,"", 3)
this.spawnOres(this.patches.goldOre,8,-64,32,"triangle", 3)
this.spawnOres(this.patches.badlandsGoldOre,50,32,256,"", 3)
this.spawnOres(this.patches.diamondOre,16,-144,16,"triangle", 4)
await yieldThread()
this.spawnOres(this.patches.emeraldOre,16,-16,480,"triangle", 4)
this.spawnOres(this.patches.limestoneOre,1,0,128,"triangle", 6)
//place snow
for (let i = 0; i < 16; i++) {
for (let k = 0; k < 16; k++) {
let top = this.solidTops[k*16+i]
if(getBiomeTemperature(biomes[this.biomes[k*16+i]],top) > 0.15) continue
let block = this.getBlock(i,top,k)
if(block === blockIds.Water){
this.setBlock(i,top,k,blockIds.ice)
}else if(blockData[block].solid && !this.getBlock(i,top+1,k)){
this.setBlock(i,top+1,k,blockIds.snow|LAYER1)
if(block === blockIds.grass){
this.setBlock(i,top,k,blockIds.grass|CROSS)
}
}
}
}
}
if(worldGenArray.size){
for(var l=0; l<round(worldGenArray.size/2); l++){
var rnd = (random()*worldGenArray.size)|0
var block = worldGenArray.array[rnd][3]
let x = worldGenArray.array[rnd][0], y = worldGenArray.array[rnd][1], z = worldGenArray.array[rnd][2]
if(block === blockIds.vine){
block = block | WALLFLAT
switch(floor(random()*4)){
case 0:
z++
block = block | SOUTH
break
case 1:
z--
block = block | NORTH
break
case 2:
x++
block = block | WEST
break
case 3:
x--
block = block | EAST
break
}
for(var m=0; m<round(random(3)+1); m++){
if(world.getBlock(x,y-m,z,type)) break
world.spawnBlock(x,y-m,z,block,type)
}
}else if(block === blockIds.cocoa){
switch(floor(random(3))){
case 1:
block |= SLAB
break
case 2:
block |= STAIR
break
}
switch(floor(random(4))){
case 0:
z++
block = block | SOUTH
break
case 1:
z--
block = block | NORTH
break
case 2:
x++
block = block | WEST
break
case 3:
x--
block = block | EAST
break
}
world.spawnBlock(x,y,z,block,type)
}
}
}
//Structures
if(trees && !world.superflat && random() > 0.96){
let rnd = random(256)
let x = (rnd >> 4) + this.x
let z = (rnd & 15) + this.z
let structure = structureArr[Math.floor(random(structureArr.length))]
let rot = Math.floor(random(4))
let {data,w,h,d} = structures[structure].variants[rot]
let rotS, rotE, rotW
switch(rot){
case 0:
rot = NORTH
rotE = EAST
rotS = SOUTH
rotW = WEST
break
case 1:
rot = EAST
rotE = NORTH
rotS = WEST
rotW = SOUTH
break
case 2:
rot = SOUTH
rotE = WEST
rotS = NORTH
rotW = EAST
break
case 3:
rot = WEST
rotE = SOUTH
rotS = EAST
rotW = NORTH
break
}
let y = structures[structure].getY(x,z,rnd)
x -= Math.round(w/2)
y -= Math.round(h/2)
z -= Math.round(d/2)
for(let i=0;i<data.length;i+=4){
let block = data[i+3]
if(!block) continue
if(typeof block === "function") block = block(rot,rotE,rotS,rotW)
if(typeof block === "string") block = blockIds[block]
world.spawnBlock(x+data[i],y+data[i+1],z+data[i+2],block,type,true)
}
}
this.populated = true
}
tick() {
const {world} = this
if (this.edited) {
for (let i = 0; i < this.sections.length; i++) {
if (this.sections[i].edited) {
this.sections[i].tick()
}
}
}
for (let i in this.entities) {
const entity = this.entities[i]
entity.update()
if (entity.canDespawn || (entity.y <= minEntityY)) {
world.deleteEntity(i)
}
}
if(this.world.weather)weatherStuff:{
let x = rand(16) | 0, z = rand(16) | 0
snow:if(this.world.weather === "snow" || this.world.weather === "rain"){
if(this.world.weather === "rain" && getBiomeTemperature(biomes[this.biomes[z * 16 + x]]) > 0.15) break snow
if(this.edited && rand(this.world.weatherAmount) > 0.9){
let y = this.solidTops[z * 16 + x]
if(y < minHeight || y > 192) break snow
let b = this.getBlock(x,y,z), blockMode, set
let layer = 0
if((b & LAYER1) === LAYER1) layer = 1
if((b & LAYER2) === LAYER2) layer = 2
if((b & LAYER3) === LAYER3) layer = 3
if((b & LAYER4) === LAYER4) layer = 4
if((b & LAYER5) === LAYER5) layer = 5
if((b & LAYER6) === LAYER6) layer = 6
if((b & LAYER7) === LAYER7) layer = 7
if((b & LAYER8) === LAYER8) layer = 8
if(((b & blockIds.snow) === blockIds.snow) && layer > 0 && layer < 8){
layer ++
switch(layer){
case 2:
blockMode = LAYER2
break
case 3:
blockMode = LAYER3
break
case 4:
blockMode = LAYER4
break
case 5:
blockMode = LAYER5
break
case 6:
blockMode = LAYER6
break
case 7:
blockMode = LAYER7
break
case 8:
blockMode = LAYER8
break
}
set = true
}else if(!this.getBlock(x,y+1,z)){
blockMode = LAYER1
y++
set = true
}
if(set) world.setBlock(x+this.x,y,z+this.z, blockIds.snow | blockMode, false,false,false,false,this.type)
}
break weatherStuff
}
}
if(this.world.settings.mobSpawning){
for(let s of this.sections) s.spawnMobs()
}
}
load() {
if (this.loaded) {
return
}
const { world } = this
let chunkX = this.x >> 4
let chunkZ = this.z >> 4
let str = `${chunkX},${chunkZ}`
let loadFrom = this.type === "nether" ? world.netherLoadFrom : (this.type === "end" ? world.endLoadFrom : world.loadFrom)
let load = loadFrom[str]
if (load) {
for (let j in load.blocks) {
let block = load.blocks[j], tags = load.tags[j]
if(!blockData[block]) continue
const z = j & 15, x = (j >> 4) & 15, y = (j >> 8) + minHeight
this.setBlock(x,y,z,block,world)
if(tags) this.setTags(x,y,z,tags)
}
delete loadFrom[str]
}
this.loaded = true
}
async getData(){
let blockSet = new Set()
let sectionMap = {}, sectionTags = {}, sectionTagsLength = {}
for (let y = 0; y < this.sections.length; y++) {
const section = this.sections[y], blocks = section.blocks, tags = section.tags
for (let i = 0; i < blocks.length; i++) {
if(!blocks[i]) continue
blockSet.add(blocks[i])
let x = (i >> 8)
let y = (i >> 4 & 15) + section.y - minHeight
let z = (i & 15)
let str = `${x>>3},${y>>3},${z>>3}` // 8x8x8 sections
if (!sectionMap[str]) {
sectionMap[str] = []
for (let k = 0; k < 6; k++) sectionMap[str].push(new Int32Array(8*8*8).fill(-1))
sectionTags[str] = []
sectionTagsLength[str] = 0
}
// 6 copies of the chunk, all oriented in different directions so we can see which one compresses the most
sectionMap[str][0][(y & 7) << 6 | (x & 7) << 3 | z & 7] = blocks[i]
sectionMap[str][1][(y & 7) << 6 | (z & 7) << 3 | x & 7] = blocks[i]
sectionMap[str][2][(x & 7) << 6 | (y & 7) << 3 | z & 7] = blocks[i]
sectionMap[str][3][(x & 7) << 6 | (z & 7) << 3 | y & 7] = blocks[i]
sectionMap[str][4][(z & 7) << 6 | (x & 7) << 3 | y & 7] = blocks[i]
sectionMap[str][5][(z & 7) << 6 | (y & 7) << 3 | x & 7] = blocks[i]
if(tags[i]){
sectionTags[str][(y & 7) << 6 | (x & 7) << 3 | z & 7] = typeof tags[i] === "number" ? tags[i] : JSON.stringify(tags[i]).substring(0,65535)
sectionTagsLength[str]++
}
}
await yieldThread()
}
let bab = new BitArrayBuilder()
let blocks = Array.from(blockSet)
let palette = {}
blocks.forEach((block, index) => palette[block] = index)
let paletteBits = BitArrayBuilder.bits(blocks.length)
bab.add(blocks.length, 32)
for (let block of blocks) bab.add(block, 32)
let sections = Object.entries(sectionMap)
bab.add(sections.length, 32)
for (let [coords, section] of sections) {
let [sx, sy, sz] = coords.split(",").map(Number)
bab.add(sx, 1).add(sy, 8).add(sz, 1)
// Determine the most compact orientation by checking all 6!
let bestBAB = null
for (let i = 0; i < 6; i++) {
let bab = new BitArrayBuilder()
let blocks = section[i]
bab.add(i, 3)
let run = null
let runs = []
let singles = []
for (let i = 0; i < blocks.length; i++) {
const block = blocks[i]
if (block >= 0) {
if (!run && i < blocks.length - 2 && blocks[i + 1] >= 0 && blocks[i + 2] >= 0) {
run = [i, []]
runs.push(run)
}
if (run) {
if (run[1].length && block === run[1][run[1].length-1][1]) run[1][run[1].length-1][0]++
else run[1].push([1, block])
}
else singles.push([i, blocks[i]])
}
else run = null
}
bab.add(runs.length, 8)
bab.add(singles.length, 9)
for (let [start, blocks] of runs) {
// Determine the number of bits needed to store the lengths of each block type
let maxBlocks = 0
for (let block of blocks) maxBlocks = Math.max(maxBlocks, block[0])
let lenBits = BitArrayBuilder.bits(maxBlocks)
bab.add(start, 9).add(blocks.length, 9).add(lenBits, 4)
for (let [count, block] of blocks) bab.add(count - 1, lenBits).add(palette[block], paletteBits)
}
for (let [index, block] of singles) {
bab.add(index, 9).add(palette[block], paletteBits)
}
bab.add(sectionTagsLength[coords],9)
if(sectionTagsLength[coords]) for(let i in sectionTags[coords]){
let tags = sectionTags[coords][i]
bab.add(i,9)
if(typeof tags === "number"){
bab.add(0,1)
bab.add(tags,32)
}else{
bab.add(1,1)
bab.addString(tags,16)
}
}
if (!bestBAB || bab.bitLength < bestBAB.bitLength) {
bestBAB = bab
}
await yieldThread()
}
bab.append(bestBAB)
}
return bab.array
}
}
let explodeSounds = ["entity.generic.explode1", "entity.generic.explode2", "entity.generic.explode3", "entity.generic.explode4"]
function explodeSound(x,y,z, power = 1, world){
var sound, soundPower
//explodeSounds[Math.floor(Math.random()*explodeSounds.length)]
if(power >= 10) {sound = explodeSounds[0], soundPower = 10}
else if(power >= 8) {sound = explodeSounds[1], soundPower = 8}
else if(power >= 4) {sound = explodeSounds[2], soundPower = 4}
else {sound = explodeSounds[3], soundPower = 1}
var pitch = 1 - ((power - soundPower) / 10)
if(pitch <= 0) return
world.playSound(x,y,z,sound,1, pitch)
}
let doorSounds = {
fence_gateOpen:2,
fence_gateClose:2,
wooden_doorOpen:4,
wooden_doorClose:6,
iron_doorOpen:4,
iron_doorClose:4,
wooden_trapdoorOpen:5,
wooden_trapdoorClose:3,
iron_trapdoorOpen:4,
iron_trapdoorClose:4
}
function doorSound(x,y,z,type,open, world){
let a = doorSounds[type+(open?"Open":"Close")]
var i = "block."+type+"."+(open?"open":"close")+Math.ceil(Math.random()*a)
world.playSound(x,y,z,i)
}
function fall(x,y,z,b,world, instant,dimension, solid = true){
if(!world.settings.blocksFall || world.getBlock(x,y-1,z,dimension)) return
if(instant){
world.setBlock(x,y,z, 0, false,false,false,false,dimension)
world.addEntity(new entities[entityIds.BlockEntity](b, x,y,z, solid),false,dimension)
}else{
world.setTimeout(() => {
if(world.getBlock(x,y-1,z,dimension)) return
world.setBlock(x,y,z, 0, false,false,false,false,dimension)
world.addEntity(new entities[entityIds.BlockEntity](b, x,y,z, solid),false,dimension)
}, tickTime, x,y,z,dimension)
}
return true
}
function needsSupportingBlocks(x,y,z, b,world,dimension){ // if block under is gone, dissapear
if(!world.settings.blocksFall) return
var under = world.getBlock(x,y-1,z,dimension)
if(!under || !blockData[under].solid){
world.setTimeout(() => {
var under = world.getBlock(x,y-1,z,dimension)
if(under && blockData[under].solid) return
world.setBlock(x,y,z, 0,false,false,false,false,dimension)
world.addItems(x,y,z,dimension,0,0,0,b,true)
world.blockParticles(b,x,y,z,30, "break",dimension)
world.blockSound(b, "dig", x,y,z)
}, tickTime, x,y,z,dimension)
return true
}
}
function putItemInContainer(x,y,z,dimension,id,durability,customName,lazy,world){
var tags = world.getTags(x,y,z,dimension)
if(typeof tags === "number") return false
if(!tags || !tags.contents){
var block = world.getBlock(x,y,z,dimension)
if(blockData[block].setContents) tags = blockData[block].setContents(x,y,z,dimension,world)
else return false
}
for(var i=0; i<tags.contents.length; i++){
if(!tags.contents[i] || !tags.contents[i].id){
tags.contents[i] = {id,amount:1,durability,customName}
if(!lazy) world.setTags(x,y,z,tags,false,dimension)
return true
}else if(tags.contents[i].id === id && (!tags.contents[i].customName && !customName || tags.contents[i].customName === customName) && tags.contents[i].amount < blockData[id].stackSize){
tags.contents[i].amount++
if(!lazy) world.setTags(x,y,z,tags,false,dimension)
return true
}
}
return false
}
function getContainerFullness(x,y,z,dimension,world){
var tags = world.getTags(x,y,z,dimension)
var block = world.getBlock(x,y,z,dimension)
if(tags && blockData[block].name === "furnace"){
return (
(tags.input && tags.input.id && tags.input.amount / blockData[tags.input.id].stackSize || 0)
+(tags.output && tags.output.id && tags.output.amount / blockData[tags.output.id].stackSize || 0)
+(tags.fuel && tags.fuel.id && tags.fuel.amount / blockData[tags.fuel.id].stackSize || 0)
) / 3
}else if(blockData[block].name === "composter"){
return blockData[block].getLevel(block) / 16
}else if(blockData[block].name === "endPortalFrame"){
return ((block & SLAB) === SLAB) * 1
}else if(tags && blockData[block].itemFrame){
return (tags.rot || 0) / 16
}else if((typeof tags === "object") && tags.contents){
var f = 0
for(var i of tags.contents){
if(i && i.id) f += i.amount / blockData[i.id].stackSize
}
f /= tags.contents.length
return f
}
}
let nearEntityArray = []
function pressurePlateHasPressure(x,y,z,dimension,world){
world.getEntitiesNear(x,y,z,dimension, 2, nearEntityArray)
for(var ent of nearEntityArray){
let w2 = ent.width/2, h2 = ent.height/2, d2 = ent.depth/2
if(x - 0.5 < ent.x + w2 &&
x + 0.5 > ent.x - w2 &&
y - 0.5 < ent.y + h2 &&
y - 0.25 > ent.y - h2 &&
z - 0.5 < ent.z + d2 &&
z + 0.5 > ent.z - d2) return true
}
for(let P of world.players){
if(x - 0.5 < P.x + P.w &&
x + 0.5 > P.x - P.w &&
y - 0.5 < P.y + P.topH &&
y - 0.25 > P.y - P.bottomH &&
z - 0.5 < P.z + P.w &&
z + 0.5 > P.z - P.w) return true
}
return false
}
function getEntityOrPlayer(id,world){
for(let p of world.players){
if(p.id === id) return p
}
for(let i=0; i<world.entities.length; i++){
if(world.entities[i].id === id){
return world.entities[i]
}
}
}
function getPlayerByUsername(username2,world){
for(let p of world.players){
if(p.username === username2) return p
}
}
let entPlayerCollided
function entCollided(ent){
var w2 = ent.width/2, h2 = ent.height/2, d2 = ent.depth/2
entPlayerCollided = false
ent.world.getEntitiesNear(ent.x,ent.y,ent.z,ent.dimension, 2, nearEntityArray)
for(var e of nearEntityArray){
if(e === ent || e.dimension !== ent.dimension) continue
var ew2 = e.width/2, eh2 = e.height/2, ed2 = e.depth/2
if(ent.x - w2 < e.x + ew2 &&
ent.x + w2 > e.x - ew2 &&
ent.y - h2 < e.y + eh2 &&
ent.y - h2 > e.y - eh2 &&
ent.z - d2 < e.z + ed2 &&
ent.z + d2 > e.z - ed2) return e
}
for(let e of ent.world.players){
if(e === ent || e.dimension !== ent.dimension || e.hidden || e.die) continue
if(ent.x - w2 <= e.x + e.w &&
ent.x + w2 >= e.x - e.w &&
ent.y - h2 <= e.y + e.topH &&
ent.y - h2 >= e.y - e.bottomH &&
ent.z - d2 <= e.z + e.w &&
ent.z + d2 >= e.z - e.w){
entPlayerCollided = true
return e
}
}
}
function maxDist(x, z, x2, z2) {
let ax = abs(x2 - x)
let az = abs(z2 - z)
return max(ax, az)
}
let chunkPlayerDistArr = []
let sortChunkPX = 0
let sortChunkPZ = 0
function sortChunks(c1, c2) { //Sort the list of chunks based on distance from the player
let dx1 = sortChunkPX - c1.x - 8
let dy1 = sortChunkPZ - c1.z - 8
let dx2 = sortChunkPX - c2.x - 8
let dy2 = sortChunkPZ - c2.z - 8
return dx1 * dx1 + dy1 * dy1 - (dx2 * dx2 + dy2 * dy2)
}
const {
seedHash,
hash, hash3
} = (() => {
// closure around mutable `seed`; updated via calls to `seedHash`
let seed = Math.random() * 2100000000 | 0;
const PRIME32_2 = 1883677709;
const PRIME32_3 = 2034071983;
const PRIME32_4 = 668265263;
const PRIME32_5 = 374761393;
const seedHash = s => {
seed = s | 0;
}
const { imul } = Math;
const hash = (x, y) => {
let h32 = 0;
h32 = seed + PRIME32_5 | 0;
h32 += 8;
h32 += imul(x, PRIME32_3);
h32 = imul(h32 << 17 | h32 >> 32 - 17, PRIME32_4);
h32 += imul(y, PRIME32_3);
h32 = imul(h32 << 17 | h32 >> 32 - 17, PRIME32_4);
h32 ^= h32 >> 15;
h32 *= PRIME32_2;
h32 ^= h32 >> 13;
h32 *= PRIME32_3;
h32 ^= h32 >> 16;
return h32 / 2147483647;
};
const hash3 = (x, y, z) => {
let h32 = 0;
h32 = seed + PRIME32_5 | 0;
h32 += 8;
h32 += imul(x, PRIME32_3);
h32 = imul(h32 << 17 | h32 >> 32 - 17, PRIME32_4);
h32 += imul(y, PRIME32_3);
h32 = imul(h32 << 17 | h32 >> 32 - 17, PRIME32_4);
h32 += imul(z, PRIME32_3);
h32 = imul(h32 << 17 | h32 >> 32 - 17, PRIME32_4);
h32 ^= h32 >> 15;
h32 *= PRIME32_2;
h32 ^= h32 >> 13;
h32 *= PRIME32_3;
h32 ^= h32 >> 16;
return h32 / 2147483647;
};
return {
seedHash,
hash, hash3
};
})();
class Marsaglia {
// from http://www.math.uni-bielefeld.de/~sillke/ALGORITHMS/random/marsaglia-c
nextInt() {
const { z, w } = this;
this.z = 36969 * (z & 65535) + (z >>> 16) & 0xFFFFFFFF;
this.w = 18000 * (w & 65535) + (w >>> 16) & 0xFFFFFFFF;
return ((this.z & 0xFFFF) << 16 | this.w & 0xFFFF) & 0xFFFFFFFF;
}
nextDouble() {
const i = this.nextInt() / 4294967296;
const is_less_than_zero = (i < 0) | 0; // cast to 1 or 0
return is_less_than_zero + i;
}
constructor(i1, i2) { // better param names
this.z = (i1 | 0) || 362436069;
this.w = i2 || hash(521288629, this.z) * 2147483647 | 0;
}
}
// The noise and random functions are copied from the processing.js source code; these others are polyfills made by me to avoid needing to remove all the pjs draw calls
const {
randomSeed,
random
} = (() => {
// closure around mut `currentRandom`
let currentRandom = null;
const randomSeed = seed => {
currentRandom = new Marsaglia(seed);
};
const random = (min, max) => {
if (!max) {
if (min) {
max = min;
min = 0;
} else {
min = 0;
max = 1;
}
}
return currentRandom.nextDouble() * (max - min) + min;
};
return {
randomSeed,
random
};
})();
class PerlinNoise {
// http://www.noisemachine.com/talk1/17b.html
// http://mrl.nyu.edu/~perlin/noise/
static grad3d(i, x, y, z) {
const h = i & 15; // convert into 12 gradient directions
const u = h < 8
? x
: y;
const v = h < 4
? y
: h === 12 || h === 14
? x
: z;
return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
}
static grad2d(i, x, y) {
const v = (i & 1) === 0
? x
: y;
return (i & 2) === 0
? -v
: v;
}
static grad1d(i, x) {
return (i & 1) === 0
? -x
: x;
}
static lerp(t, a, b) {
return a + t * (b - a);
}
// end of statics
// permutation
perm = new Uint8Array(0x200);
// prototype functions:
noise3d(x, y, z) {
const { floor } = Math;
const X = floor(x) & 0xff;
const Y = floor(y) & 0xff;
const Z = floor(z) & 0xff;
x -= floor(x);
y -= floor(y);
z -= floor(z);
const fx = (3 - 2 * x) * x * x;
const fy = (3 - 2 * y) * y * y;
const fz = (3 - 2 * z) * z * z;
const { perm } = this;
const p0 = perm[X] + Y;
const p00 = perm[p0] + Z;
const p01 = perm[p0 + 1] + Z;
const p1 = perm[X + 1] + Y;
const p10 = perm[p1] + Z;
const p11 = perm[p1 + 1] + Z;
const { lerp, grad3d } = PerlinNoise;
return lerp(
fz,
lerp(
fy,
lerp(
fx,
grad3d(perm[p00], x, y, z),
grad3d(perm[p10], x - 1, y, z)
),
lerp(
fx,
grad3d(perm[p01], x, y - 1, z),
grad3d(perm[p11],x - 1, y - 1, z)
)
),
lerp(
fy,
lerp(
fx,
grad3d(perm[p00 + 1], x, y, z - 1),
grad3d(perm[p10 + 1], x - 1, y, z - 1)
),
lerp(
fx,
grad3d(perm[p01 + 1], x, y - 1, z - 1),
grad3d(perm[p11 + 1], x - 1, y - 1, z - 1)
)
)
);
}
noise2d(x, y) {
const { floor } = Math;
const X = floor(x) & 0xff;
const Y = floor(y) & 0xff;
x -= floor(x);
y -= floor(y);
const { perm } = this;
const fx = (3 - 2 * x) * x * x;
const fy = (3 - 2 * y) * y * y;
const p0 = perm[X] + Y;
const p1 = perm[X + 1] + Y;
const { lerp, grad2d } = PerlinNoise;
return lerp(
fy,
lerp(
fx,
grad2d(
perm[p0],
x,
y
),
grad2d(
perm[p1],
x - 1,
y
)
),
lerp(
fx,
grad2d(
perm[p0 + 1],
x,
y - 1
),
grad2d(
perm[p1 + 1],
x - 1,
y - 1
)
)
);
}
noise1d(x) {
const { floor } = Math;
const X = floor(x) & 0xff;
x -= floor(x);
const fx = (3 - 2 * x) * x * x;
const { lerp, grad1d } = PerlinNoise;
return lerp(
fx,
grad1d(perm[X], x),
grad1d(perm[X + 1], x - 1)
);
}
constructor(seed) {
if (seed === undefined) {
throw new TypeError("A value for `seed` parameter was not provided to `PerlinNoise`");
}
const rnd = new Marsaglia(seed);
// generate permutation
const { perm } = this;
// fill 0x0..0x100
for (let i = 0; i < 0x100; ++i) {
perm[i] = i;
}
for (let i = 0; i < 0x100; ++i) {
const j = rnd.nextInt() & 0xFF;
const t = perm[j];
perm[j] = perm[i];
perm[i] = t;
}
// copy to avoid taking mod in perm[0]
// copies from first half of array, into the second half
perm.copyWithin(0x100, 0x0, 0x100);
}
}
// Copied and modified from https://github.com/blindman67/SimplexNoiseJS
function openSimplexNoise(clientSeed) {
const SQ4 = 2
const toNums = function(s) { return s.split(",").map(function(s) { return new Uint8Array(s.split("").map(function(v) { return Number(v) })) }) }
const decode = function(m, r, s) { return new Int8Array(s.split("").map(function(v) { return parseInt(v, r) + m })) }
const toNumsB32 = function(s) { return s.split(",").map(function(s) { return parseInt(s, 32) }) }
const NORM_3D = 1.0 / 206.0
const SQUISH_3D = 1 / 3
const STRETCH_3D = -1 / 6
var base3D = toNums("0000110010101001,2110210120113111,110010101001211021012011")
const gradients3D = decode(-11, 23, "0ff7mf7fmmfffmfffm07f70f77mm7ff0ff7m0f77m77f0mf7fm7ff0077707770m77f07f70")
var lookupPairs3D = function() { return new Uint16Array(toNumsB32("0,2,1,1,2,2,5,1,6,0,7,0,10,2,12,2,41,1,45,1,50,5,51,5,g6,0,g7,0,h2,4,h6,4,k5,3,k7,3,l0,5,l1,5,l2,4,l5,3,l6,4,l7,3,l8,d,l9,d,la,c,ld,e,le,c,lf,e,m8,k,ma,i,p9,l,pd,n,q8,k,q9,l,15e,j,15f,m,16a,i,16e,j,19d,n,19f,m,1a8,f,1a9,h,1aa,f,1ad,h,1ae,g,1af,g,1ag,b,1ah,a,1ai,b,1al,a,1am,9,1an,9,1bg,b,1bi,b,1eh,a,1el,a,1fg,8,1fh,8,1qm,9,1qn,9,1ri,7,1rm,7,1ul,6,1un,6,1vg,8,1vh,8,1vi,7,1vl,6,1vm,7,1vn,6")) }
var p3D = decode(-1, 5, "112011210110211120110121102132212220132122202131222022243214231243124213241324123222113311221213131221123113311112202311112022311112220342223113342223311342223131322023113322023311320223113320223131322203311322203131")
const setOf = function(count) { var a = [],i = 0; while (i < count) { a.push(i++) } return a }
const doFor = function(count, cb) { var i = 0; while (i < count && cb(i++) !== true) {} }
function shuffleSeed(seed,count){
seed = seed * 1664525 + 1013904223 | 0
count -= 1
return count > 0 ? shuffleSeed(seed, count) : seed
}
const types = {
_3D : {
base : base3D,
squish : SQUISH_3D,
dimensions : 3,
pD : p3D,
lookup : lookupPairs3D,
}
}
function createContribution(type, baseSet, index) {
var i = 0
const multiplier = baseSet[index ++]
const c = { next : undefined }
while(i < type.dimensions) {
const axis = ("xyzw")[i]
c[axis + "sb"] = baseSet[index + i]
c["d" + axis] = - baseSet[index + i++] - multiplier * type.squish
}
return c
}
function createLookupPairs(lookupArray, contributions){
var i
const a = lookupArray()
const res = new Map()
for (i = 0; i < a.length; i += 2) { res.set(a[i], contributions[a[i + 1]]); }
return res
}
function createContributionArray(type) {
const conts = []
const d = type.dimensions
const baseStep = d * d
var k, i = 0
while (i < type.pD.length) {
const baseSet = type.base[type.pD[i]]
let previous, current
k = 0
do {
current = createContribution(type, baseSet, k)
if (!previous) { conts[i / baseStep] = current; }
else { previous.next = current; }
previous = current
k += d + 1
} while(k < baseSet.length)
current.next = createContribution(type, type.pD, i + 1)
if (d >= 3) { current.next.next = createContribution(type, type.pD, i + d + 2) }
if (d === 4) { current.next.next.next = createContribution(type, type.pD, i + 11) }
i += baseStep
}
const result = [conts, createLookupPairs(type.lookup, conts)]
type.base = undefined
type.lookup = undefined
return result
}
let temp = createContributionArray(types._3D)
const contributions3D = temp[0], lookup3D = temp[1]
const perm = new Uint8Array(256)
const perm3D = new Uint8Array(256)
const source = new Uint8Array(setOf(256))
var seed = shuffleSeed(clientSeed, 3)
doFor(256, function(i) {
i = 255 - i
seed = shuffleSeed(seed, 1)
var r = (seed + 31) % (i + 1)
r += r < 0 ? i + 1 : 0
perm[i] = source[r]
perm3D[i] = (perm[i] % 24) * 3
source[r] = source[i]
})
base3D = undefined
lookupPairs3D = undefined
p3D = undefined
return function(x, y, z) {
const pD = perm3D
const p = perm
const g = gradients3D
const stretchOffset = (x + y + z) * STRETCH_3D
const xs = x + stretchOffset, ys = y + stretchOffset, zs = z + stretchOffset
const xsb = floor(xs), ysb = floor(ys), zsb = floor(zs)
const squishOffset	= (xsb + ysb + zsb) * SQUISH_3D
const dx0 = x - (xsb + squishOffset), dy0 = y - (ysb + squishOffset), dz0 = z - (zsb + squishOffset)
const xins = xs - xsb, yins = ys - ysb, zins = zs - zsb
const inSum = xins + yins + zins
var c = lookup3D.get(
(yins - zins + 1) |
((xins - yins + 1) << 1) |
((xins - zins + 1) << 2) |
(inSum << 3) |
((inSum + zins) << 5) |
((inSum + yins) << 7) |
((inSum + xins) << 9)
)
var i, value = 0
while (c !== undefined) {
const dx = dx0 + c.dx, dy = dy0 + c.dy, dz = dz0 + c.dz
let attn = 2 - dx * dx - dy * dy - dz * dz
if (attn > 0) {
i = pD[(((p[(xsb + c.xsb) & 0xFF] + (ysb + c.ysb)) & 0xFF) + (zsb + c.zsb)) & 0xFF]
attn *= attn
value += attn * attn * (g[i++] * dx + g[i++] * dy + g[i] * dz)
}
c = c.next
}
return value * NORM_3D + 0.5
}
}
class PVector {
constructor(x, y, z) {
this.x = x
this.y = y
this.z = z
}
set(x, y, z) {
if (y === undefined) {
this.x = x.x
this.y = x.y
this.z = x.z
} else {
this.x = x
this.y = y
this.z = z
}
}
normalize() {
let mag = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
this.x /= mag
this.y /= mag
this.z /= mag
}
add(v) {
this.x += v.x
this.y += v.y
this.z += v.z
}
mult(m) {
this.x *= m
this.y *= m
this.z *= m
}
mag() {
return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
}
magSquared() {
return this.x * this.x + this.y * this.y + this.z * this.z
}
crossProduct(x,y,z,vector) {
vector.x = this.y * z - this.z * y
vector.y = this.z * x - this.x * z
vector.z = this.x * y - this.y * x
return vector
}
product(x,y,z,vector) {
vector.x = this.x * x
vector.y = this.y * y
vector.z = this.z * z
return vector
}
}
win.PVector = PVector
let vec1 = new PVector(), vec2 = new PVector(), vec3 = new PVector(), vec4 = new PVector()
//piston extend & retract
const pistonPushLimit = 12
function pistonFindStickyBlocksConnectedTo(cx,cy,cz,tx,ty,tz,block,blocks,checkProp,dimension,world){
//c = current position, t = direction
var spreadAt = [cx,cy,cz,block]
while(spreadAt.length){
var sx = spreadAt[0]
var sy = spreadAt[1]
var sz = spreadAt[2]
var block2
block2 = world.getBlock(sx,sy,sz+1,dimension)
if(block2 && !xyArrayHas(blocks,spreadAt,sx,sy,sz+1)){
if(!blockData[block2][checkProp]){
if(!tx && !ty && tz === 1) return false
}else if(blockData[block2].sticky && block2 !== block && !(!tx && !ty && tz === 1)){
}else{
blocks.push(sx,sy,sz+1,block2)
if(blockData[block2].sticky){
spreadAt.push(sx,sy,sz+1,block2)
}else if(!(!tx && !ty && tz === -1)){
if(pistonFindStack(sx,sy,sz+1,tx,ty,tz,blocks,dimension,world) === false) return false
}
}
}
block2 = world.getBlock(sx,sy,sz-1,dimension)
if(block2 && !xyArrayHas(blocks,spreadAt,sx,sy,sz-1)){
if(!blockData[block2][checkProp]){
if(!tx && !ty && tz === -1) return false
}else if(blockData[block2].sticky && block2 !== block && !(!tx && !ty && tz === -1)){
}else{
blocks.push(sx,sy,sz-1,block2)
if(blockData[block2].sticky){
spreadAt.push(sx,sy,sz-1,block2)
}else if(!(!tx && !ty && tz === 1)){
if(pistonFindStack(sx,sy,sz-1,tx,ty,tz,blocks,dimension,world) === false) return false
}
}
}
block2 = world.getBlock(sx,sy+1,sz,dimension)
if(block2 && !xyArrayHas(blocks,spreadAt,sx,sy+1,sz)){
if(!blockData[block2][checkProp]){
if(!tx && ty === 1 && !tz) return false
}else if(blockData[block2].sticky && block2 !== block && !(!tx && ty === 1 && !tz)){
}else{
blocks.push(sx,sy+1,sz,block2)
if(blockData[block2].sticky){
spreadAt.push(sx,sy+1,sz,block2)
}else if(!(!tx && ty === -1 && !tz)){
if(pistonFindStack(sx,sy+1,sz,tx,ty,tz,blocks,dimension,world) === false) return false
}
}
}
block2 = world.getBlock(sx,sy-1,sz,dimension)
if(block2 && !xyArrayHas(blocks,spreadAt,sx,sy-1,sz)){
if(!blockData[block2][checkProp]){
if(!tx && ty === -1 && !tz) return false
}else if(blockData[block2].sticky && block2 !== block && !(!tx && ty === -1 && !tz)){
}else{
blocks.push(sx,sy-1,sz,block2)
if(blockData[block2].sticky){
spreadAt.push(sx,sy-1,sz,block2)
}else if(!(!tx && ty === 1 && !tz)){
if(pistonFindStack(sx,sy-1,sz,tx,ty,tz,blocks,dimension,world) === false) return false
}
}
}
block2 = world.getBlock(sx+1,sy,sz,dimension)
if(block2 && !xyArrayHas(blocks,spreadAt,sx+1,sy,sz)){
if(!blockData[block2][checkProp]){
if(tx === 1 && !ty && !tz) return false
}else if(blockData[block2].sticky && block2 !== block && !(tx === 1 && !ty && !tz)){
}else{
blocks.push(sx+1,sy,sz,block2)
if(blockData[block2].sticky){
spreadAt.push(sx+1,sy,sz,block2)
}else if(!(tx === -1 && !ty && !tz)){
if(pistonFindStack(sx+1,sy,sz,tx,ty,tz,blocks,dimension,world) === false) return false
}
}
}
block2 = world.getBlock(sx-1,sy,sz,dimension)
if(block2 && !xyArrayHas(blocks,spreadAt,sx-1,sy,sz)){
if(!blockData[block2][checkProp]){
if(tx === -1 && !ty && !tz) return false
}else if(blockData[block2].sticky && block2 !== block && !(tx === -1 && !ty && !tz)){
}else{
blocks.push(sx-1,sy,sz,block2)
if(blockData[block2].sticky){
spreadAt.push(sx-1,sy,sz,block2)
}else if(!(tx === 1 && !ty && !tz)){
if(pistonFindStack(sx-1,sy,sz,tx,ty,tz,blocks,dimension,world) === false) return false
}
}
}
spreadAt.splice(0,4)
}
}
win.pistonFindStickyBlocksConnectedTo = pistonFindStickyBlocksConnectedTo
function pistonFindStack(x,y,z,tx,ty,tz,blocks,dimension,world){
var cx = x, cy = y, cz = z  //current position
for(var i=0; i<pistonPushLimit+1; i++){
cx += tx
cy += ty
cz += tz
var block = world.getBlock(cx,cy,cz,dimension)
if(block && !blockData[block].pistonPush) return false
if(blockData[block].sticky){
if(pistonFindStickyBlocksConnectedTo(cx,cy,cz,tx,ty,tz,block,blocks,"pistonPush",dimension,world) === false) return false
}
if(block){if(!xyArrayHas(blocks,null,cx,cy,cz)){blocks.push(cx,cy,cz,block)}}
else break
}
}
function getPistonPushedBlocks(x,y,z,tx,ty,tz,dimension,world){
var blocks = [x,y,z,0]
if(pistonFindStack(x,y,z,tx,ty,tz,blocks,dimension,world) === false) return false
blocks.splice(0,4) //remove the temporary coordinates
if((blocks.length / 4) > pistonPushLimit) return false
return blocks
}
win.getPistonPushedBlocks = getPistonPushedBlocks
function getPistonPulledBlocks(x,y,z,tx,ty,tz,dimension,world){
var blocks = [x,y,z,0]
var cx = x+tx, cy = y+ty, cz = z+tz
cx += tx
cy += ty
cz += tz
var block = world.getBlock(cx,cy,cz,dimension)
if(blockData[block].sticky){
if(pistonFindStickyBlocksConnectedTo(cx,cy,cz,-tx,-ty,-tz,block,blocks,"pistonPull",dimension,world) === false) return false
}
if(block && !xyArrayHas(blocks,null,cx,cy,cz) && blockData[block].pistonPull) blocks.push(cx,cy,cz,block)
blocks.splice(0,4)
if(blocks.length/4 > pistonPushLimit) return false
return blocks
}
win.getPistonPulledBlocks = getPistonPulledBlocks
let colors = {
rgb:{
0: [0,0,0],
1: [0,0,170],
2: [0,170,0],
3: [0,170,170],
4: [170,0,0],
5: [170,0,170],
6: [255,170,0],
7: [170,170,170],
8: [85,85,85],
9: [85,85,255],
a: [85,255,85],
b: [85,255,255],
c: [255,85,85],
d: [255,85,255],
e: [255,255,85],
f: [255,255,255],
g: [221,214,5],//minecoin gold
},
css:{},
dye:{
red:[176/255, 46/255, 38/255],
lightGray:[157/255, 157/255, 151/255],
lightBlue:[58/255, 178/255, 218/255],
magenta:[199/255, 78/255, 189/255],
yellow:[254/255, 215/255, 61/255],
purple:[137/255, 50/255, 184/255],
orange:[249/255, 128/255, 29/255],
white:[249/255, 1, 254/255],
green:[93/255, 124/255, 22/255],
brown:[131/255, 84/255, 50/255],
black:[29/255, 29/255, 33/255],
pink:[243/255, 139/255, 170/255],
lime:[128/255, 199/255, 31/255],
gray:[71/255, 79/255, 82/255],
cyan:[22/255, 156/255, 156/255],
blue:[60/255, 67/255, 170/255]
}
}
for(var c in colors.rgb){
colors.css[c] = "rgb("+colors.rgb[c].join(",")+")"
colors.rgb[c][0] /= 255
colors.rgb[c][1] /= 255
colors.rgb[c][2] /= 255
}
win.colors = colors
//each mob: [mob name, min, max]
const grassMobs = [["Sheep",4,4],["Pig",4,4],["Chicken",4,4],["Cow",4,4],["Horse",2,6],["Donkey",1,3]]
const taigaMobs = [...grassMobs,["Rabbit",2,3],["Fox",2,4]]
const beachMobs = [["Turtle",4,4]]
const peakMobs = [["Rabbit",2,3],["Goat",1,3]]
const hostileMobs = [["Zombie",4,4],["Skeleton",4,4],["Creeper",4,4],["Enderman",4,4]]
let biomeData = { //[temperature, downfall, passive mobs, hostile mobs]
void:[0.5,0.5],
ocean:[0.5,0.5],
deepOcean:[0.5,0.5],
warmOcean:[0.8,0.6],
lukewarmOcean:[0.6,0.5],
deepLukewarmOcean:[0.6,0.5],
coldOcean:[0.35,0.5],
deepColdOcean:[0.35,0.5],
frozenOcean:[0,0.5],
deepFrozenOcean:[0,0.5],
plains:[0.8,0.4, grassMobs,hostileMobs],
iceSpikes:[0,0.5],
snowyPlains:[0,0.5, [["Rabbit",1,1],["PolarBear",1,1]],hostileMobs],
grove:[-0.2,0.8, taigaMobs,hostileMobs],
snowyTaiga:[-0.5,0.4, taigaMobs,hostileMobs],
taiga:[0.25,0.8, taigaMobs,hostileMobs],
shrubland:[0.3,0.8, grassMobs,hostileMobs],
meadows:[0.3,0.8, grassMobs,hostileMobs],
forest:[0.7,0.8, grassMobs,hostileMobs],
oldPineTaiga:[0.3,0.8, taigaMobs,hostileMobs],
oldSpruceTaiga:[0.25,0.8, taigaMobs,hostileMobs],
flowerForest:[0.7,0.8, grassMobs,hostileMobs],
oldBirchForest:[0.6,0.6, grassMobs,hostileMobs],
birchForest:[0.7,0.8, grassMobs,hostileMobs],
darkForest:[0.6,0.6, grassMobs,hostileMobs],
savanna:[1.2,0, grassMobs,hostileMobs],
sparseJungle:[0.95,0.8, grassMobs,hostileMobs],
bambooJungle:[0.95,0.9, grassMobs,hostileMobs],
jungle:[0.95,0.9, grassMobs,hostileMobs],
desert:[2,0],
snowyBeach:[0.05,0.3, beachMobs,hostileMobs],
beach:[0.8,0.4, beachMobs,hostileMobs],
snowySlopes:[-0.3,0.9, peakMobs,hostileMobs],
windsweptGravelHills:[0.2,0.3, grassMobs,hostileMobs],
lushHills:[0.2,0.8,32, grassMobs,hostileMobs],
windsweptHills:[0.2,0.3, grassMobs,hostileMobs],
windsweptForest:[0.2,0.3, grassMobs,hostileMobs],
frozenPeaks:[-0.7,0.9],
stonePeaks:[1,0.3],
jaggedPeaks:[-0.7,0.9, peakMobs,hostileMobs],
frozenRiver:[0,0.5],
river:[0.5,0.5],
sunflowerPlains:[0.8,0.4, grassMobs,hostileMobs],
stonyShore:[0.2,0.3],
savannaPlateau:[1,0, grassMobs,hostileMobs],
erodedBadlands:[2,0],
badlands:[2,0],
woodedBadlands:[2,0],
windsweptSavanna:[1.1,0.5, grassMobs,hostileMobs],
mushroomFields:[0.9,1, ["Mooshroom",4,4]],
trashland:[0.25,0],
dripstoneCaves:[0.2,0],
lushCaves:[0.9,0],
warpedForest:[2,0],
crimsonForest:[2,0],
netherWastes:[2,0, ["Blaze",4,4]],
end:[0.5,0.5],
endIslands:[0.5,0.5]
}
let biomes = Object.keys(biomeData)
let biomeIds = Object.fromEntries(biomes.map((b,i) => [b,i]))
function getNetherBiome(biome) {
if(biome > 0.4 && biome < 0.5){
return "warpedForest"
}else if(biome > 0.4){
return "crimsonForest"
}
return "netherWastes"
}
function getBiome(biome){
if(biome > 0.6){
return "snowyPlains"
}else if(biome > 0.5){
return "desert"
}else if(biome > 0.4){
return "plains"
}else if(biome > 0.37){
return "sparseJungle"
}else if(biome > 0.35){
return "jungle"
}else if(biome > 0.3){
return "bambooJungle"
}else{
return "forest"
}
}
function getBiomeTemperature(biome,y){
if(!biomeData[biome]) return 0
let t = biomeData[biome][0]
if(y > 80) t -= (y-80)/800
return t
}
let defaultWorldSettings = {
tntExplode:true,
killCmdOff:false,
dayNightCycle: true,
blocksFall: true,
attack: true,
fireSpreads: true,
weatherCycle: true,
mobSpawning: true,
autosave: true
}
//changing defaultWorldSettings requires changing server side
let worldSettingKeys = Object.keys(defaultWorldSettings)
let now = 0
function debug(message) {
let ellapsed = performance.now() - debug.start
if (ellapsed > 30) {
console.log(message, ellapsed.toFixed(2), "milliseconds")
}
}
const worldGenArray = {
array: [],
size: 0,
add: function(x, y, z, block) {
if (this.size === this.array.length) {
this.array.push([ x, y, z, block ])
} else {
this.array[this.size][0] = x
this.array[this.size][1] = y
this.array[this.size][2] = z
this.array[this.size][3] = block
}
this.size++
},
clear: function() {
this.size = 0
},
get:function(n){
if(n < this.size) return this.array[n]
}
}
class World{
constructor(operators = []) {
this.version = version
this.usePreBeta = verMoreThan("1.1.0",version.replace(/(Alpha|Beta) /, ''))
//Initialize the world's arrays
this.chunks = []
this.netherChunks = []
this.endChunks = []
this.loaded = []
this.sortedChunks = []
this.chunkGenQueue = []
this.populateQueue = []
this.generateQueue = []
this.lightingQueue = []
this.loadQueue = []
this.timeoutQueue = []
this.loadFrom = {}
this.loadKeys = []
this.netherLoadFrom = {}
this.netherLoadKeys = []
this.endLoadFrom = {}
this.endLoadKeys = []
this.generatedChunks = 0
this.entities = []
this.waitingEntities = [] //entities waiting to have their chunk loaded
this.resourcePacks = []
this.activeResourcePacks = []
this.ticking = false
this.players = []
this.loadDistance = 4
this.loadedUpdate = true
this.playersInv = {}
this.time = 375
this.trees = true
this.caves = true
this.superflat = false
this.survival = false //game mode on join
this.cheats = true //game mode on join
this.banned = {}
this.whitelist = null
this.resourcePacks = []
this.activeResourcePacks = []
this.spawnPoint = {
x:8,z:8,y:70,
landProg:0
}//Global Spawn point
this.loadPromises = [] //Array of promises (load save, find land)
this.weather = ""
this.slowWeatherAmount = 0
this.weatherAmount = 0
this.nextWeather = rand(0.5,7.5)*1000
this.time = 375
this.skyLight = 0
this.settings = Object.assign({},defaultWorldSettings)
this.operators = operators
this.serverCommands = defaultServerCommands.map(r => ({...r, func:undefined}))
this.serverCommandFuncs = Object.fromEntries(defaultServerCommands.map(r => [r.name,r.func]))
this.serverCommands.forEach(cmd => {
if(cmd.argValues) for(var i in cmd.argValues){
if(!Array.isArray(cmd.argValues[i])) cmd.argValues[i] = [cmd.argValues[i]]
}
})
this.worldSeed = 0
this.islandGenerator = new IslandGenerator(this);
this.setSeed = (seed, noFindSpawn) => {
this.worldSeed = seed
seedHash(seed)
this.caveNoise = openSimplexNoise(seed)
this.noiseProfile.noiseSeed(seed)
this.islandGenerator.SetSeed(seed)
sendAllWorkers({newSeed:seed})
if(!noFindSpawn) this.findSpawnPoint()
}
this.noiseProfile = {
generator: undefined,
octaves: 4,
fallout: 0.5,
seed: undefined,
noiseSeed(seed) {
this.seed = seed;
this.generator = new PerlinNoise(this.seed);
},
noise(x, y, z) {
const { generator, octaves, fallout } = this;
let effect = 1,
k = 1,
sum = 0;
for (let i = 0; i < octaves; ++i) {
effect *= fallout;
const k = 1 << i;
let temp;
switch (arguments.length) {
case 1: {
temp = generator.noise1d(k * x);
break;
} case 2: {
temp = generator.noise2d(k * x, k * y);
break;
} case 3: {
temp = generator.noise3d(k * x, k * y, k * z);
break;
}
}
sum += effect * (1 + temp) / 2;
}
return sum;
}
}
this.pos = setInterval(this.onpos.bind(this), 500)
}
findSpawnPoint(){
if(!this.usePreBeta && !this.superflat){
this.loadPromises.push(
doWork({findLand:true, seed:this.worldSeed}, progress => {
this.spawnPoint.landProg = progress
}).then(land => {
this.spawnPoint.x = land.x
this.spawnPoint.y = land.y
this.spawnPoint.z = land.z
this.spawnPoint.land = true
})
)
}else{
this.spawnPoint.y = this.superflat ? 6 : round(noiseProfile.noise(this.spawnPoint.x * smoothness, this.spawnPoint.z * smoothness) * hilliness + generator.extra) + 2
}
}
serverChangeBlock(x,y,z,dimension,action,block,drop,dropAmount,prevBlock,prevTags,p){
const {holding} = p
if(action === "click"){
let cblock = this.getBlock(x,y,z,dimension)
if(blockData[cblock].onclick) blockData[cblock].onclick(x,y,z,dimension,this,p)
else if(holding && blockData[holding].shovel){
if(cblock === blockIds.grass || cblock === blockIds.dirt || cblock === blockIds.rootedDirt || cblock === blockIds.mycelium || cblock === blockIds.podzol){
this.setBlock(x,y,z,blockIds.grass | TALLCROSS, false,false,false,false,p.dimension)
}
if(blockData[cblock].campfire){
this.setBlock(x,y,z,blockData[cblock].id | SLAB, false,false,false,false,p.dimension)
}
}else if(holding && cblock && blockData[holding].axe){
var name = blockData[cblock].name
name = name[0].toUpperCase() + name.substring(1)
name = "stripped"+name
if(blockIds[name]){
this.setBlock(x,y,z,blockIds[name], p.dimension)
}
}else if(holding && cblock && blockData[holding].hoe){
if((blockData[cblock].name === "grass" || cblock === blockIds.dirt) && !this.getBlock(x,y+1,z)){
this.setBlock(x,y,z,blockIds.farmland, false,false,false,false,p.dimension)
}
if(cblock === blockIds.rootedDirt){
this.setBlock(x,y,z,blockIds.dirt, false,false,false,false,p.dimension)
this.addItems(x, y+0.5, z,p.dimension, 0, 0, 0, blockIds.hangingRoots, true)
}
}else if(holding && cblock && blockData[holding].shears){
if(cblock === blockIds.pumpkin){
this.setBlock(x,y,z,blockIds.carvedPumpkin, false,false,false,false,p.dimension)
this.addItems(x, y+0.5, z,p.dimension, 0, 0, 0, blockIds.pumpkinSeeds, true, 4)
}
}else if(holding && cblock && blockData[holding].name === "eyeOfEnder" && blockData[cblock].name === "endPortalFrame"){
world.setBlock(x,y,z,cblock | SLAB, false,false,false,false,p.dimension)
blockData[cblock].eyeplace(x,y,z,p.dimension,world)
this.blockSound(holding, "place", x,y,z)
}
}else{
let prevBlock = this.getBlock(x,y,z, dimension)
let prevTags = this.getTags(x,y,z, dimension)
let dropAmount, drop
if(p.survival && !block){
drop = 0
let block = prevBlock
let theDrop = blockData[prevBlock].drop
let amount = blockData[prevBlock].dropAmount
let canDrop = handBreakable.includes(blockData[prevBlock].type)
if(holding && breakTypes[blockData[prevBlock].type] && breakTypes[blockData[prevBlock].type].includes(blockData[holding].name)) canDrop = true
if(!blockData[prevBlock].type) canDrop = true
if(canDrop){
if(amount === undefined) amount = 1
if(amount.length === 2){
amount = round(rand(amount[0], amount[1]))
}
if(holding && blockData[holding].shears && blockData[prevBlock].dropSelfWhenSheared){
if(blockData[prevBlock].shearDropAmount){
amount = blockData[prevBlock].shearDropAmount
}
}else{
if(typeof theDrop === "number") block = theDrop
else if(typeof theDrop === "function"){
block = blockIds[theDrop()]
}else if(Array.isArray(theDrop)){
block = theDrop
}else if(theDrop) block = blockIds[theDrop]
}
if(block){
drop = block
dropAmount = amount
}
}
}
let worked = this.setBlock(x, y, z, block, false,false,false,false,dimension)
if(worked === false) return this.sendAll({type:"setBlock", data:{x:x, y:y, z:z, block:prevBlock, dimension}})
if(drop){
if(Array.isArray(drop)){//drop multiple items
for(let d of drop){
if(typeof d === "string") d = blockIds[d]
this.addItems(x, y, z,dimension, 0, 0, 0, d, true, dropAmount,null,null,p.id)
}
}else{
this.addItems(x, y, z,dimension, 0, 0, 0, drop, true, dropAmount,null,null,p.id)
}
}
if(block){
if(blockData[block].onplace) blockData[block].onplace(x,y,z,dimension,p,this)
}else{
this.blockParticles(prevBlock,x,y,z,30, "break",dimension)
if(blockData[prevBlock].onbreak){
blockData[prevBlock].onbreak(x,y,z, prevBlock, prevTags,dimension,this)
}
this.blockSound(prevBlock, "dig", x, y, z)
if(p.survival && blockData[prevBlock].experience) this.addEntity(new entities[entityIds.ExperienceOrb](x, y, z, blockData[prevBlock].experience),false,dimension)
}
}
}
blockParticles(block,x,y,z,amount, type, dimension, dir, remote){
if(!remote) this.sendAll({
type:"particles", particleType:"blockParticles",
x,y,z,amount,dimension,data:{block,thisType:type,dir}
})
}
explode(x,y,z, r, type, dimension){
/*world.setBlock(x,y,z,blockIds.air);
for(var i=radius; i>0; i--){
sphereoidAt(x,y,z,i,i,i, blockIds.air)
}*/
//ball(x,y,z,r,r,r,0)
if(!type)this.setBlock(x,y,z, 0, false,false,false,false,dimension)
else if(type === "original") this.setBlock(x,y,z, this.getOriginalBlock(x,y,z,dimension), false,false,false,false,dimension)
/*let w2 = r * r
let h2 = w2
let d2 = w2
for (let Y = -r; Y < r; Y++) {
for (let X = -r; X <= r; X++) {
for (let Z = -r; Z <= r; Z++) {
let n = X * X / w2 + Y * Y / h2 + Z * Z / d2
if (n < 1) {
if(world.getBlock(X + x, Y + y, Z + z) === blockIds.tnt){
blockData[blockIds.tnt].explode(X+x,Y+y,Z+z, "explosion")
}
if(Math.random() > 0.5){
var time = Math.random()*1000
if(time < 10){
world.particles.push(new ExplodeParticle(X + x, Y + y, Z + z))
}else{
setTimeout(() => world.particles.push(new ExplodeParticle(X + x, Y + y, Z + z)), time)
}
}
if(!liquid){
var block = world.getBlock(X+x,Y+y,Z+z)
if(blockData[block].ongetexploded){
blockData[block].ongetexploded(x+X,y+Y,z+Z,block,world)
}
world.setBlock(X + x, Y + y, Z + z, 0)
}
}
}
}
}*/
//create rays rays coming from the center of the cube to each outer edge
let destroyed = {}, particles = []
for(var cx=0; cx<16; cx++){
for(var cy=0; cy<16; cy++){
for(var cz=0; cz<16; cz++){
if(!(cx === 0 || cx === 15 || cy === 0 || cy === 15 || cz === 0 || cz === 15)) continue
var intensity =  (0.7 + rand(0.6)) * r
var x2 = cx / 16, y2 = cy / 16, z2 = cz / 16
//step 0.3 blocks each time
var d = abs(dist3(0,0,0, (x2-0.5)*2*r,(y2-0.5)*2*r,(z2-0.5)*2*r))
var step = (0.3/d)/2 //how much to go along ray
for(var i=0; i<1; i+=step){
var sx = round(lerp(i, x, (x2-0.5)*2*r+x))
var sy = round(lerp(i, y, (y2-0.5)*2*r+y))
var sz = round(lerp(i, z, (z2-0.5)*2*r+z))
intensity -= 0.3 * 0.75
var block = this.getBlock(sx,sy,sz, dimension)
var isDestroyed = destroyed[sx+","+sy+","+sz]
//if block isn't air, reduce intensity based on blast resistance
if(block && !isDestroyed){
var br = blockData[block].blastResistance || 0
intensity -= (br + 0.3) * 0.3
if(intensity > 0) {
destroyed[sx+","+sy+","+sz] = true
if(!type){
if(blockData[block].ongetexploded){
blockData[block].ongetexploded(sx,sy,sz,block,this,dimension)
}
this.setBlock(sx, sy, sz, 0, false,false,false,false, dimension)
if(round(rand(r-1)) === 0){
this.addItems(sx, sy, sz, dimension, 0, 0, 0, block, true)
}
}
if(block === blockIds.tnt){
blockData[blockIds.tnt].explode(sx,sy,sz, "explosion",dimension,this)
}else if(block === blockIds.untnt){
blockData[blockIds.untnt].explode(sx,sy,sz, "explosion",dimension,this)
}
}/*end if(intensity > 0)*/else{
continue
}
}
if(intensity > 0 && type === "original" && !isDestroyed){
this.setBlock(sx,sy,sz, this.getOriginalBlock(sx,sy,sz,dimension), false,false,false,false,dimension)
}
if(intensity > 0 && rand() > 0.995){
let time = rand()*1000
particles.push(sx,sy,sz,dimension,time)
}
}
}//end for loop
}
}
this.sendAll({type:"particles", particleType:"explosion", data:particles, dimension})
//the calculation below is not from minecraft
let nearEntities = this.getEntitiesNear(x,y,z,dimension,r)
for(let ent of nearEntities){
if(ent.dimension !== dimension) continue
let dist = dist3(x,y,z, ent.x, ent.y, ent.z)
if(dist <= r){
let speed = (r-dist)
let X = ent.x - x
let Y = ent.y - y
let Z = ent.z - z
let velx = X/dist*speed, vely = Y/dist*speed, velz = Z/dist*speed
/*
velx = ((Math.sign(X)*r)-X)/5
vely = ((Math.sign(Y)*r)-Y)/5
velz = ((Math.sign(Z)*r)-Z)/5*/
if(ent.damage){
let damageTook = (r - dist) * 6
ent.damage(damageTook,velx,vely,velz)
}else{
ent.velx += velx
ent.vely += vely
ent.velz += velz
}
this.sendAll({type:"entEvent",event:"vel",data:{x:ent.velx,y:ent.vely,z:ent.velz},id:ent.id})
}
}
for(let ent of this.players){
if(ent.dimension !== dimension || ent.hidden || ent.die) continue
let dist = dist3(x,y,z, ent.x, ent.y, ent.z)
if(dist <= r){
let speed = (r-dist)
let X = ent.x - x
let Y = ent.y - y
let Z = ent.z - z
let velx = X/dist*speed, vely = Y/dist*speed, velz = Z/dist*speed
let damageTook = (r - dist) * 6
this.sendAll({type:"hit", damage:damageTook, damageType:"explosion", velx,vely,velz,x,y,z}, ent.id)
}
}
explodeSound(x,y,z, r, this)
}
blockSound(blockID, type, x,y,z, volume){
let block = blockData[blockID]
let sound, pitch = 1
switch(type){
case "place":
sound = block.placeSound || block.digSound
break;
case "dig":
sound = block.digSound
break;
case "step":
sound = block.stepSound
break;
case "lowStep":
sound = block.stepSound
pitch = 0.5
break;
case "breaking":
sound = block.stepSound
pitch = 0.5
break;
case "land":
sound = block.landSound || block.digSound
}
if(typeof sound === "function") return sound()
if(Array.isArray(sound)){
sound = sound[Math.floor(Math.random()*sound.length)]
}
if(sound){
this.playSound(x,y,z,sound, volume, pitch)
}
}
playSound(x,y,z, name, volume = 1, pitch = 1){
this.sendAll({type:"playSound", data:name, volume, pitch, x,y,z, hasPos: (typeof x === "number")})
}
poof(x,y,z,amount = 20,dimension, unremote){
if(unremote) this.sendAll({
type:"particles",particleType:"poof",
x,y,z,dimension,amount
})
}
glint(x,y,z,dimension,remote){
if(!remote) this.sendAll({
type:"particles", particleType:"glint",
x,y,z,dimension
})
}
updateBlock(x, y, z, lazy, noOnupdate, sx,sy,sz, dimension) {
let chunks = dimension === "nether" ? this.netherChunks : (dimension === "end" ? this.endChunks : this.chunks)
let chunk = chunks[x >> 4] && chunks[x >> 4][z >> 4]
if (chunk && chunk.allGenerated) {
chunk.updateBlock(x & 15, y, z & 15, this, lazy, noOnupdate, sx,sy,sz)
}
}
getChunk(x, z, dimension) {
let chunks = dimension === "nether" ? this.netherChunks : (dimension === "end" ? this.endChunks : this.chunks)
return chunks[x >> 4] && chunks[x >> 4][z >> 4]
}
getBlock(x, y, z, dimension) {
if (y > maxHeight) {
return blockIds.air
} else if (y < minHeight) {
return blockIds.air
}
let chunks = dimension === "nether" ? this.netherChunks : (dimension === "end" ? this.endChunks : this.chunks)
if (!chunks[x >> 4] || !chunks[x >> 4][z >> 4]) {
return blockIds.air
}
return chunks[x >> 4][z >> 4].getBlock(x & 15, y, z & 15)
}
getOriginalBlock(x, y, z, dimension) {
let chunk = this.getChunk(x,z,dimension)
return chunk ? chunk.getOriginalBlock(x & 15, y, z & 15) : blockIds.air
}
setBlock(x, y, z, blockID, lazy, noOnupdate, remote, keepTags, dimension) {
let chunks = dimension === "nether" ? this.netherChunks : (dimension === "end" ? this.endChunks : this.chunks)
if (!chunks[x >> 4] || !chunks[x >> 4][z >> 4]) {
return false
}
if(y < minHeight) return false
let chunk = chunks[x >> 4][z >> 4]
let xm = x & 15
let zm = z & 15
let prev = chunk.getBlock(xm,y,zm)
if (blockID) {
if(prev){ //block gets replaced
let prevData = blockData[prev]
chunk.deleteBlock(xm, y, zm, !lazy)
if (!lazy && chunk.allGenerated && (!prevData.transparent || prevData.lightLevel) && chunk.lit) {
this.updateLight(x, y, z, false, prevData.lightLevel, dimension)
}
}
let data = blockData[blockID]
chunk.setBlock(xm, y, zm, blockID, !lazy)
if (!lazy && chunk.allGenerated && (!data.transparent || data.lightLevel) && chunk.lit) {
this.updateLight(x, y, z, true, data.lightLevel, dimension)
}
} else {
let data = blockData[prev]
chunk.deleteBlock(xm, y, zm, !lazy)
if (!lazy && chunk.allGenerated && (!data.transparent || data.lightLevel) && chunk.lit) {
this.updateLight(x, y, z, false, data.lightLevel, dimension)
}
}
if (lazy) {
return
}
let prevTags = this.getTags(x,y,z, dimension)
if(!keepTags) this.setTags(x, y, z, undefined, remote, dimension)
for(let i = this.timeoutQueue.length-1; i>=0; i--){
let timeout = this.timeoutQueue[i]
if(timeout.x === x && timeout.y === y && timeout.z === z && timeout.dimension === dimension && (timeout.block === undefined || timeout.block === blockID)){
this.timeoutQueue.splice(i,1)
break
}
}
let nameChanged = blockData[prev].name !== blockData[blockID || 0].name
if(!noOnupdate && prev && blockData[prev].ondelete && nameChanged){
blockData[prev].ondelete(x,y,z, prevTags, prev, dimension,this)
}
if(!noOnupdate && blockID && blockData[blockID].onset && nameChanged){
blockData[blockID].onset(x,y,z, dimension,this)
}
if(!remote) this.sendAllInChunk({type:"setBlock", data:{x:x, y:y, z:z, block:blockID, dimension:dimension, keepTags:keepTags}},x>>4,z>>4,dimension)
//Update the 6 adjacent blocks and 1 changed block
if (xm && xm !== 15 && zm && zm !== 15) {
chunk.updateBlock(xm - 1, y, zm, this, lazy, false, x,y,z)
chunk.updateBlock(xm, y - 1, zm, this, lazy, false, x,y,z)
chunk.updateBlock(xm + 1, y, zm, this, lazy, false, x,y,z)
chunk.updateBlock(xm, y + 1, zm, this, lazy, false, x,y,z)
chunk.updateBlock(xm, y, zm - 1, this, lazy, false, x,y,z)
chunk.updateBlock(xm, y, zm + 1, this, lazy, false, x,y,z)
}
else {
this.updateBlock(x - 1, y, z, lazy, false, x,y,z, dimension)
this.updateBlock(x + 1, y, z, lazy, false, x,y,z, dimension)
this.updateBlock(x, y - 1, z, lazy, false, x,y,z, dimension)
this.updateBlock(x, y + 1, z, lazy, false, x,y,z, dimension)
this.updateBlock(x, y, z - 1, lazy, false, x,y,z, dimension)
this.updateBlock(x, y, z + 1, lazy, false, x,y,z, dimension)
}
chunk.updateBlock(xm, y, zm, this, lazy, noOnupdate, x,y,z)
// Update the corner chunks so shadows in adjacent chunks update correctly
if (xm | zm === 0) { this.updateBlock(x - 1, y, z - 1, lazy, true,x,y,z,dimension); }
if (xm === 15 && zm === 0) { this.updateBlock(x + 1, y, z - 1, lazy, true,x,y,z,dimension); }
if (xm === 0 && zm === 15) { this.updateBlock(x - 1, y, z + 1, lazy, true,x,y,z,dimension); }
if (xm & zm === 15) { this.updateBlock(x + 1, y, z + 1, lazy, true,x,y,z,dimension); }
}
tagUpdate(x,y,z,dimension,t){
var block = this.getBlock(x,y,z,dimension)
if(block && blockData[block].ontagsupdate) blockData[block].ontagsupdate(x,y,z,dimension,t,this)
}
tagsChanged(x,y,z, t, remote, dimension, lazy){
/*var str = x.toString(36)+","+y.toString(36)+","+z.toString(36)
var editedTags = dimension === "nether" ? this.netherEditedTags : (dimension === "end" ? this.endEditedTags : this.editedTags)
if(t){
if(!editedTags.includes(str)) editedTags.push(str)
}else{
if(editedTags.includes(str)){
editedTags.splice(editedTags.indexOf(str),1)
}
}*/
if(!lazy){
this.tagUpdate(x,y,z,dimension,t)
this.tagUpdate(x-1,y,z,dimension,t)
this.tagUpdate(x+1,y,z,dimension,t)
this.tagUpdate(x,y-1,z,dimension,t)
this.tagUpdate(x,y+1,z,dimension,t)
this.tagUpdate(x,y,z-1,dimension,t)
this.tagUpdate(x,y,z+1,dimension,t)
}
if(!remote){
this.sendAllInChunk({type:"setTags", x, y, z, data:t, dimension, lazy},x>>4,z>>4,dimension)
}
}
getTags(x,y,z,dimension){
if (y > maxHeight) {
return
} else if (y < minHeight) {
return
}
let chunks = dimension === "nether" ? this.netherChunks : (dimension === "end" ? this.endChunks : this.chunks)
if (!chunks[x >> 4] || !chunks[x >> 4][z >> 4]) {
return
}
return chunks[x >> 4][z >> 4].getTags(x & 15, y, z & 15)
}
getTagByName(x,y,z,n,dimension){
if (y > maxHeight) {
return
} else if (y < minHeight) {
return
}
return this.getChunk(x, z, dimension).getTagByName(x & 15, y, z & 15, n)
}
setTags(x,y,z,data, remote,dimension, lazy){
var chunks = dimension === "nether" ? this.netherChunks : (dimension === "end" ? this.endChunks : this.chunks)
if (!chunks[x >> 4] || !chunks[x >> 4][z >> 4]) {
return
}
if(y < minHeight) return
let chunk = chunks[x >> 4][z >> 4]
let xm = x & 15
let zm = z & 15
chunk.setTags(xm, y, zm, data)
this.tagsChanged(x,y,z,data, remote, dimension, lazy)
}
setTagByName(x,y,z,n,data, remote,dimension, lazy){
let chunks = dimension === "nether" ? this.netherChunks : (dimension === "end" ? this.endChunks : this.chunks)
if (!chunks[x >> 4] || !chunks[x >> 4][z >> 4]) {
return
}
if(y < minHeight) return
let chunk = chunks[x >> 4][z >> 4]
let xm = x & 15
let zm = z & 15
var t = chunk.setTagByName(xm, y, zm, n,data)
this.tagsChanged(x,y,z,t, remote,dimension, lazy)
}
updateTags(x,y,z,dimension,lazy){
var t = this.getTags(x,y,z,dimension)
this.tagsChanged(x,y,z,t,false,dimension,lazy)
}
getLight(x, y, z, blockLight = 0, dimension, fullOutside = 0) {
if(y < minHeight) return 0
let chunks = dimension === "nether" ? this.netherChunks : (dimension === "end" ? this.endChunks : this.chunks)
let chunk = chunks[x >> 4][z >> 4]
if(chunk){
return chunk.getLight(x & 15, y, z & 15, blockLight, fullOutside)
}
return (!blockLight || fullOutside) * 15
}
setLight(x, y, z, level, block, dimension) {
let chunks = dimension === "nether" ? this.netherChunks : (dimension === "end" ? this.endChunks : this.chunks)
let chunk = chunks[x >> 4][z >> 4]
if (chunk) {
return chunk.setLight(x & 15, y, z & 15, level, block)
}
}
updateLight(x, y, z, place, blockLight = 0, dimension) {
let chunk = this.getChunk(x, z, dimension)
let cx = x & 15
let cz = z & 15
let center = chunk.getLight(cx, y, cz, 0)
let blight = chunk.getLight(cx, y, cz, 1)
let up = this.getLight(x, y+1, z, 0, dimension)
let down = this.getLight(x, y-1, z, 0, dimension)
let north = this.getLight(x, y, z+1, 0, dimension)
let south = this.getLight(x, y, z-1, 0, dimension)
let east = this.getLight(x+1, y, z, 0, dimension)
let west = this.getLight(x-1, y, z, 0, dimension)
/*if(place){ //set vertical column to 15
let spread = []
for(let x2 = x-1; x2 <= x+1; x2++) for(let z2 = z-1; z2 <= z+1; z2++){
//spread around side too so the sides won't get dark
let i = chunk.sections.length * 16 - 1
let cx2 = x2 & 15, cz2 = z2 & 15
for(; i >= 0; i--){
if(!blockData[chunk.getBlock(cx2,i,cz2)].transparent) break
if(chunk.getLight(cx2,i,cz2,0) !== 15){
chunk.setLight(cx2,i,cz2,15,0)
spread.push(x2,i,z2)
}
}
}
if(spread.length) chunk.spreadLight(spread, 14, true)
}*/
let spread = []
if (!place) { // Block was removed; increase light levels
if ((up & 15) === 15) {
for (let i = y; i > minHeight; i--) {
if (blockData[chunk.getBlock(cx, i, cz)].transparent) {
chunk.setLight(cx, i, cz, 15)
spread.push(x, i, z)
} else {
break
}
}
chunk.spreadLight(spread, 14, true)
} else {
center = max(up, down, north, south, east, west)
if (center > 0) center -= 1
this.setLight(x, y, z, center, 0, dimension)
if (center > 1) {
spread.push(x, y, z)
chunk.spreadLight(spread, center - 1, true)
}
}
// Block light levels
if (!blockLight || blockLight < blight) {
spread.length = 0
up = this.getLight(x, y+1, z, 1, dimension)
down = this.getLight(x, y-1, z, 1, dimension)
north = this.getLight(x, y, z+1, 1, dimension)
south = this.getLight(x, y, z-1, 1, dimension)
east = this.getLight(x+1, y, z, 1, dimension)
west = this.getLight(x-1, y, z, 1, dimension)
blight = max(up, down, north, south, east, west)
if (blight > 0) blight -= 1
this.setLight(x, y, z, blight, 1, dimension)
if (blight > 1) {
spread.push(x, y, z)
chunk.spreadLight(spread, blight - 1, true, 1)
}
}
}
else if (place && (center !== 0 || blight !== 0)) { // Block was placed; decrease light levels
let respread = []
for (let i = 0; i <= 15/*center + 1*/; i++) respread[i] = []
chunk.setLight(cx, y, cz, 0, 0)
chunk.setLight(cx, y, cz, 0, 1)
spread.push(x, y, z)
// Sky light
if (center === 15) {
for (let i = y-1; i > minHeight; i--) {
if (blockData[chunk.getBlock(cx, i, cz)].transparent) {
chunk.setLight(cx, i, cz, 0)
spread.push(x, i, z)
} else {
break
}
}
}
chunk.unSpreadLight(spread, center - 1, respread)
chunk.reSpreadLight(respread)
// Block light
if (blight) {
respread.length = 0
for (let i = 0; i <= 15/*blight + 1*/; i++) respread[i] = []
spread.length = 0
spread.push(x, y, z)
chunk.unSpreadLight(spread, blight - 1, respread, 1)
chunk.reSpreadLight(respread, 1)
}
}
if (place && blockLight) { // Light block was placed
this.setLight(x, y, z, blockLight, 1, dimension)
spread.length = 0
spread.push(x, y, z)
chunk.spreadLight(spread, blockLight - 1, true, 1)
} else if (!place && blockLight) { // Light block was removed
this.setLight(x, y, z, 0, 1, dimension)
spread.push(x, y, z)
let respread = []
for (let i = 0; i <= 15/*blockLight + 1*/; i++) respread[i] = []
chunk.unSpreadLight(spread, blockLight - 1, respread, 1)
chunk.reSpreadLight(respread, 1)
}
}
spawnBlock(x, y, z, blockID, dimension, force) {
//Sets a block anywhere without causing block updates around it. Only to be used in world gen.
if(blockData[blockID].crossShape) blockID |= CROSS
if(blockData[blockID].tallcrossShape) blockID |= TALLCROSS
if(blockData[blockID].cactus) blockID |= CACTUS
let chunkX = x >> 4
let chunkZ = z >> 4
let chunks = dimension === "nether" ? this.netherChunks : (dimension === "end" ? this.endChunks : this.chunks)
if (!chunks[chunkX]) {
chunks[chunkX] = []
}
let chunk = chunks[chunkX][chunkZ]
if (!chunk) {
chunk = new Chunk(chunkX * 16, chunkZ * 16, dimension, this)
chunks[chunkX][chunkZ] = chunk
}
if (chunk.allGenerated) {
//Only used if spawning a block post-gen
this.setBlock(x, y, z, blockID, true, false,false,false, dimension)
} else if (force || !chunk.getBlock(x & 15, y, z & 15)) {
chunk.setBlock(x & 15, y, z & 15, blockID)
}
}
getBiome(x,y,z,dimension){
let chunks = dimension === "nether" ? this.netherChunks : (dimension === "end" ? this.endChunks : this.chunks)
if (!chunks[x >> 4] || !chunks[x >> 4][z >> 4]) {
return
}
let X = x & 15
let Z = z & 15
let caveMinY = chunks[x >> 4][z >> 4].caveY[Z * 16 + X]
let caveMaxY = chunks[x >> 4][z >> 4].caveY[Z * 16 + X + 256]
return biomes[y < caveMaxY && y > caveMinY ? (chunks[x >> 4][z >> 4].caveBiomes[Z * 16 + X]) : (chunks[x >> 4][z >> 4].biomes[Z * 16 + X])]
}
getEntity(id){
for(var i=0; i<this.entities.length; i++){
if(this.entities[i].id === id){
return i
}
}
}
getEntPos(ent,now){
let bab = new BitArrayBuilder()
bab.add(min(ent.id.length,255),8)
for(let c of ent.id.substring(0,255)) bab.add(c.charCodeAt(0),8)
bab.add(ent.entId,8)
bab.add(ent.x*16,24).add(ent.y*16,this.usePreBeta?12:15).add(ent.z*16,24)
bab.add(ent.dimension === "nether" ? 1 : (ent.dimension === "end" ? 2 : 0),3)
bab.add(ent.pitch*100,11)
bab.add(ent.yaw*100,11)
bab.add(ent.velx*100,11).add(ent.vely*100,11).add(ent.velz*100,11)
bab.add(min(now-ent.spawn),32) //entity should despawn before limit or have no limit
if(this.usePreBeta) bab.add(ent.amount||0,16)
else bab.add((ent.amount||0)*10,20)
bab.add(ent.block||0,32)
bab.add(ent.from ? min(ent.from.length,255) : 0,8)
if(ent.from) for(let c of ent.from.substring(0,255)) bab.add(c.charCodeAt(0),8)
bab.add(ent.durability||0,16)
bab.addString(ent.name||"")
if(ent.type === "BlockEntity"){
bab.add(ent.solidOnGround||0,1)
}else if(ent.type === "MovingBlock"){
bab.add(ent.sx,20).add(ent.sy,20).add(ent.sz,20)
bab.add(ent.mx,20).add(ent.my,20).add(ent.mz,20)
bab.add(ent.despawns,32)
bab.add(ent.solidWhenDone,1)
}else if(ent.type === "TextDisplay"){
bab.addString(ent.text)
bab.add(ent.size*256,8)
bab.add(ent.color[0]*255,8).add(ent.color[1]*255,8).add(ent.color[2]*255,8)
bab.add(ent.background[0]*255,8).add(ent.background[1]*255,8).add(ent.background[2]*255,8).add(ent.background[3]*255,8)
}else if(ent.mob){
bab.add(ent.harmEffect,6)
bab.add(ent.health,16)
bab.add(ent.burning,1)
bab.add(ent.burnTimer*16,8)
bab.add(ent.oxygen,5)
bab.add(ent.spinTarget*100,11)
bab.add(ent.path ? ent.path.length : 0,8)
if(ent.path && ent.path.length > 255) logError("entity path too long")
if(ent.path){
for(let i of ent.path){
bab.add(i,20)
}
}
bab.add(ent.fur||0,1)
if(ent.color) bab.add(ent.color[0]*255,8).add(ent.color[1]*255,8).add(ent.color[2]*255,8)
else bab.add(0,24)
bab.add(ent.eating||0,6)
bab.add(ent.target ? min(ent.target.length,255) : 0,8)
if(ent.target) for(let c of ent.target.substring(0,255)) bab.add(c.charCodeAt(0),8)
bab.add(ent.wool ? min(ent.wool.length,255) : 0,8)
if(ent.wool) for(let c of ent.wool.substring(0,255)) bab.add(c.charCodeAt(0),8)
bab.add(ent.tame||0,1)
bab.add(ent.sitting||0,1)
bab.add(ent.owner ? min(ent.owner.length,255) : 0,8)
if(ent.owner) for(let c of ent.owner.substring(0,255)) bab.add(c.charCodeAt(0),8)
bab.add(ent.holding||0, 32)
bab.add(ent.attractedBy ? min(ent.attractedBy.length,255) : 0,8)
if(ent.attractedBy) for(let c of ent.attractedBy.substring(0,255)) bab.add(c.charCodeAt(0),8)
}else if(ent.type === "BlockDisplay"){
bab.add(ent.width*256,16).add(ent.height*256,16).add(ent.depth*256,16)
}
return bab
}
addEntity(ent, remote, dimension){
if(!ent.id) ent.id = generateID()
ent.world = this
if(dimension || dimension === "") ent.dimension = ent.chunkDimension = dimension
if(!remote && !ent.remote){
//host controls entities
this.sendAllInChunk({type:"entityPos", data:this.getEntPos(ent,performance.now()).array}, ent.chunkX,ent.chunkZ,ent.dimension)
}
this.entities.push(ent)
//if(ent.alwaysRender) this.alwaysRenderEntities.push(ent)
let chunk = this.getChunk(ent.chunkX<<4,ent.chunkZ<<4,ent.dimension)
if(chunk){
chunk.entities[ent.id] = ent
}else{
this.waitingEntities.push(ent)
}
}
deleteEntity(id, remote, i){
i = (i || i===0) ? i : this.getEntity(id)
let ent = this.entities[i]
if(!ent) return
ent.delete() //better name: ondelete
let waiting = this.waitingEntities.indexOf(ent)
id = ent.id
if(!remote){
this.sendAllInChunk({type:"entityDelete", id}, ent.chunkX,ent.chunkZ,ent.dimension)
}
if(i || i===0) this.entities.splice(i, 1)
/*if(ent.alwaysRender){
let i = this.alwaysRenderEntities.indexOf(ent)
this.alwaysRenderEntities.splice(i,1)
}*/
if(waiting !== -1) this.waitingEntities.splice(waiting,1)
const {chunkX, chunkZ} = ent
let chunk = this.getChunk(chunkX<<4,chunkZ<<4,ent.dimension)
if(chunk) delete chunk.entities[id]
}
posEntity(p, m){
if (typeof p === "string") {
try {
p = new BitArrayReader(atoarr(p), true)
}catch(e){
return
}
}else if(!(p instanceof BitArrayReader)) return
let nameLen = p.read(8)
let id = ""
for (let i = 0; i < nameLen; i++) id += String.fromCharCode(p.read(8))
const type = p.read(8)
let i = this.getEntity(id)
let ent
const entType = entityOrder[type]
const x = p.read(24,true)/16, y = p.read(this.usePreBeta?12:15,true)/16, z = p.read(24,true)/16
let dimension = p.read(3)
dimension = dimension === 1 ? "nether" : (dimension === 2 ? "end" : "")
const pitch = p.read(11,true)/100
const yaw = p.read(11,true)/100
const velx = p.read(11,true)/100
const vely = p.read(11,true)/100
const velz = p.read(11,true)/100
const spawn = performance.now() - p.read(32,true)
const amount = this.usePreBeta ? p.read(16) : p.read(20)/10
const block = p.read(32)
nameLen = p.read(8)
let from = ""
for (let i = 0; i < nameLen; i++) from += String.fromCharCode(p.read(8))
const durability = p.read(16)
let name = p.readString()
//below var because it can be accessed outside block scope
if(entType === "BlockEntity"){
var solidOnGround = Boolean(p.read(1))
}else if(entType === "MovingBlock"){
var sx = p.read(20,true), sy = p.read(20,true), sz = p.read(20,true)
var mx = p.read(20,true), my = p.read(20,true), mz = p.read(20,true)
var despawns = p.read(32)
var solidWhenDone = p.read(1)
}else if(entType === "TextDisplay"){
var text = p.readString()
var size = p.read(8)/256
var color = [p.read(8)/255,p.read(8)/255,p.read(8)/255]
var background = [p.read(8)/255,p.read(8)/255,p.read(8)/255,p.read(8)/255]
}else if(entities[type].mob){
var harmEffect = p.read(6)
var health = p.read(16)
var burning = Boolean(p.read(1))
var burnTimer = p.read(8)/16
var oxygen = p.read(5)
var spinTarget = p.read(11)/100
nameLen = p.read(8)
if(nameLen){
var path = []
for(let i = 0; i < nameLen; i++){
path.push(p.read(20,true))
}
}
var fur = Boolean(p.read(1))
var color = [p.read(8)/255,p.read(8)/255,p.read(8)/255]
var eating = p.read(6)
nameLen = p.read(8)
var target = ""
for (let i = 0; i < nameLen; i++) target += String.fromCharCode(p.read(8))
nameLen = p.read(8)
var wool = ""
for (let i = 0; i < nameLen; i++) wool += String.fromCharCode(p.read(8))
var tame = Boolean(p.read(1))
var sitting = Boolean(p.read(1))
nameLen = p.read(8)
var owner = ""
for (let i = 0; i < nameLen; i++) owner += String.fromCharCode(p.read(8))
var holding = p.read(32)
nameLen = p.read(8)
var attractedBy = ""
for (let i = 0; i < nameLen; i++) attractedBy += String.fromCharCode(p.read(8))
}else if(entType === "BlockDisplay"){
var width = p.read(16)/256, height = p.read(16)/256, depth = p.read(16)/256
}
if(i || i===0){
ent = this.entities[i]
if(entType === "TextDisplay" && ent.text !== text) ent.setText(text)
if(entType === "Item" && ent.amount !== amount) ent.amount = amount, ent.willUpdateShape = true
}else{
ent = entities[type]
switch(ent && ent.name2){
case "Item":
ent = new ent(0, 0, 0, 0, 0, 0, block, false, amount, durability||null, null)
break
case "BlockEntity":
ent = new ent(block, 0,0,0, solidOnGround)
break
case "PrimedTNT":
case "PrimedSuperTNT":
case "PrimedUltraTNT":
case "PrimedUnTNT":
ent = new ent(0,0,0)
break
case "MovingBlock":
ent = new ent(block, sx,sy,sz,mx,my,mz,solidWhenDone)
break
case "BlockDisplay":
ent = new ent(block,0,0,0,0,0,0)
break
case "EnderPearl":
case "Snowball":
case "SmallFireball":
case "Egg":
case "SlingshotShot":
case "Arrow":
ent = new ent(0,0,0,0,0,0)
break
case "ExperienceOrb":
ent = new ent(0,0,0,amount)
break
case "Cow":
case "Pig":
case "Creeper":
case "Chicken":
case "Zombie":
case "Skeleton":
case "Wolf":
case "Blaze":
case "Enderman":
ent = new ent(0,0,0)
break
case "Sheep":
ent = new ent(0,0,0, color, wool)
break
case "Spider":
ent = new ent(0,0,0,fur)
break
case "EnderDragon":
ent = new ent(0,0,0)
break
case "TextDisplay":
ent = new ent(0,0,0,text,size,color,background)
default:
break
}
if(!ent) return
ent.id = id
this.addEntity(ent, true)
ent.previousX = parseFloat(p[0])
ent.previousY = parseFloat(p[1])
ent.previousZ = parseFloat(p[2])
}
if(!ent) return
ent.setPos(x,y,z,velx,vely,velz)
ent.dimension = dimension
if(!ent.facesPlayer){
ent.yaw = yaw
ent.pitch = pitch
}
ent.spawn = spawn
if("from" in ent) ent.from = from
if(name) ent.name = name
if(ent.mob){
ent.harmEffect = harmEffect
ent.health = health
ent.burning = burning
ent.burnTimer = burnTimer
ent.oxygen = oxygen
ent.spinTarget = spinTarget
if(path){
ent.path = path
}else ent.path = null
if("fur" in ent) ent.fur = fur
if("color" in ent){
ent.color = color
}
if("eating" in ent) ent.eating = eating
ent.target = target
if("wool" in ent) ent.wool = wool
if("tame" in ent) ent.tame = tame
if("sitting" in ent) ent.sitting = sitting
if("owner" in ent) ent.owner = owner
ent.holding = holding
ent.attractedBy = attractedBy
}else if(ent.type === "BlockDisplay"){
ent.width = width
ent.height = height
ent.depth = depth
}
ent.updateChunk()
}
getEntities(p){
let x = p.x >> 4
let z = p.z >> 4
let {dimension, loadDistance} = p
loadDistance--
//if(!this.entities.length) return this.entities //its an empty array, so no problemslet minChunkX = x - d >> 4
let minChunkX = x - loadDistance
let maxChunkX = x + loadDistance
let minChunkZ = z - loadDistance
let maxChunkZ = z + loadDistance
let chunks = dimension === "nether" ? this.netherChunks : (dimension === "end" ? this.endChunks : this.chunks)
let arr = []
for (x = minChunkX; x <= maxChunkX; x++) {
for (z = minChunkZ; z <= maxChunkZ; z++) {
if (chunks[x] && chunks[x][z]) {
let chunk = chunks[x][z]
for(let i in chunk.entities){
let now = performance.now()
//if(ent.remote) return
arr.push(this.getEntPos(chunk.entities[i],now).array)
}
}
}
}
return arr
}
getEntitiesNear(x,y,z,dimension,d, ret = []){
let chunks = dimension === "nether" ? this.netherChunks : (dimension === "end" ? this.endChunks : this.chunks)
let minChunkX = x - d >> 4
let maxChunkX = x + d >> 4
let minChunkY = y - d >> 4
let maxChunkY = y + d >> 4
let minChunkZ = z - d >> 4
let maxChunkZ = z + d >> 4
let section = null
ret.length = 0
let i = 0
for (x = minChunkX; x <= maxChunkX; x++) {
for (let y = minChunkY; y <= maxChunkY; y++) {
for (z = minChunkZ; z <= maxChunkZ; z++) {
if (y >= minHeight && chunks[x] && chunks[x][z]) {
let ents = chunks[x][z].entities
for(let i in ents){
ret.push(ents[i])
}
}
}
}
}
return ret
}
addItems(x,y,z,dimension,vx,vy,vz,block,autoSetVel,amount = 1,durability,customName,from){
if(!block) return
var data = blockData[block]
while(amount){
var a = min(amount,data.stackSize)
amount -= a
this.addEntity(new entities[entityIds.Item](x, y, z, vx, vy, vz, block, autoSetVel, a,durability,customName,from),false,dimension)
}
}
getRedstoneConnectedTo(x,y,z, level, dimension){
var spreaded = []
var spreadAt = []
spreadAt.push(x,y,z,0)
while(spreadAt.length){
var x = spreadAt[0]
var y = spreadAt[1]
var z = spreadAt[2]
var i = spreadAt[3]
if(i < level) {
if(!xyArrayHas(spreaded,spreadAt,x+1,y,z) && blockData[this.getBlock(x+1,y,z,dimension)].name === "redstoneDust") spreadAt.push(x+1,y,z,i+1)
if(!xyArrayHas(spreaded,spreadAt,x-1,y,z) && blockData[this.getBlock(x-1,y,z,dimension)].name === "redstoneDust") spreadAt.push(x-1,y,z,i+1)
if(!xyArrayHas(spreaded,spreadAt,x,y,z+1) && blockData[this.getBlock(x,y,z+1,dimension)].name === "redstoneDust") spreadAt.push(x,y,z+1,i+1)
if(!xyArrayHas(spreaded,spreadAt,x,y,z-1) && blockData[this.getBlock(x,y,z-1,dimension)].name === "redstoneDust") spreadAt.push(x,y,z-1,i+1)
if(!xyArrayHas(spreaded,spreadAt,x,y+1,z) && blockData[this.getBlock(x,y+1,z,dimension)].name === "redstoneDust") spreadAt.push(x,y+1,z,i+1)
if(!xyArrayHas(spreaded,spreadAt,x,y-1,z) && blockData[this.getBlock(x,y-1,z,dimension)].name === "redstoneDust") spreadAt.push(x,y-1,z,i+1)
var tags = this.getTags(x,y,z, dimension), block = this.getBlock(x,y,z,dimension)
if(blockData[block].name === "redstoneDust"){
if(getTagBits(tags,"westUp",block) && !xyArrayHas(spreaded,spreadAt,x+1,y+1,z)) spreadAt.push(x+1,y+1,z,i+1)
if(getTagBits(tags,"eastUp",block) && !xyArrayHas(spreaded,spreadAt,x-1,y+1,z)) spreadAt.push(x-1,y+1,z,i+1)
if(getTagBits(tags,"northUp",block) && !xyArrayHas(spreaded,spreadAt,x,y+1,z+1)) spreadAt.push(x,y+1,z+1,i+1)
if(getTagBits(tags,"southUp",block) && !xyArrayHas(spreaded,spreadAt,x,y+1,z-1)) spreadAt.push(x,y+1,z-1,i+1)
if(getTagBits(tags,"westDown",block) && !xyArrayHas(spreaded,spreadAt,x+1,y-1,z)) spreadAt.push(x+1,y-1,z,i+1)
if(getTagBits(tags,"eastDown",block) && !xyArrayHas(spreaded,spreadAt,x-1,y-1,z)) spreadAt.push(x-1,y-1,z,i+1)
if(getTagBits(tags,"northDown",block) && !xyArrayHas(spreaded,spreadAt,x,y-1,z+1)) spreadAt.push(x,y-1,z+1,i+1)
if(getTagBits(tags,"southDown",block) && !xyArrayHas(spreaded,spreadAt,x,y-1,z-1)) spreadAt.push(x,y-1,z-1,i+1)
}					
spreaded.push(x,y,z,i)
}
spreadAt.splice(0,4)
}
return spreaded
}
spreadPower(x,y,z, level,dimension){
if(!level) return
var spread = this.getRedstoneConnectedTo(x,y,z,level,dimension)
for(var i=0; i<spread.length; i+=4){
var bx = spread[i]
var by = spread[i+1]
var bz = spread[i+2]
if(bx === x && by === y && bz === z) continue
var l = this.getRedstoneWirePower(bx,by,bz,dimension)
if(l !== this.getPower(bx,by,bz,dimension)) this.setPower(bx,by,bz, l,false,dimension)
}
}
unspreadPower(x,y,z, level, includeSource,dimension){
if(!level) return
var spread = this.getRedstoneConnectedTo(x,y,z,level,dimension)
var toUpdate = []
for(var n=0; n<level; n++){
for(var i=0; i<spread.length; i+=4){
var bx = spread[i]
var by = spread[i+1]
var bz = spread[i+2]
if(!includeSource && bx === x && by === y && bz === z) continue
var l = this.getRedstoneWirePower(bx,by,bz,dimension)
if(l !== this.getPower(bx,by,bz,dimension)) this.setPower(bx,by,bz, l, true,dimension), toUpdate[i] = true
}
}
for(var i=0; i<toUpdate.length; i+=4){
if(toUpdate[i]){
var x = spread[i], y = spread[i+1], z = spread[i+2]
this.powerChangeUpdate(x,y,z, x,y,z, false,dimension)
this.powerChangeUpdate(x+1,y,z, x,y,z, false,dimension)
this.powerChangeUpdate(x-1,y,z, x,y,z, false,dimension)
this.powerChangeUpdate(x,y,z+1, x,y,z, false,dimension)
this.powerChangeUpdate(x,y,z-1, x,y,z, false,dimension)
this.powerChangeUpdate(x,y+1,z, x,y,z, false,dimension)
this.powerChangeUpdate(x,y-1,z, x,y,z, false,dimension)
this.updateTags(x,y,z,dimension,true)
}
}
/*this.powerChangeUpdate(x+1,y,z)
this.powerChangeUpdate(x-1,y,z)
this.powerChangeUpdate(x,y,z+1)
this.powerChangeUpdate(x,y,z-1)*/
}
getPowerForWire(x,y,z,dimension,blue){
var block = this.getBlock(x,y,z,dimension)
if(blockData[block].name === "redstoneDust" && blue !== (block & FLIP)) return 0
return this.getPower(x,y,z,dimension)
}
getRedstoneWirePower(x,y,z,dimension){
var tags = this.getTags(x,y,z,dimension), block = this.getBlock(x,y,z,dimension), blue = block & FLIP
var right = this.getPowerForWire(x+1,y,z,dimension,blue)
var left = this.getPowerForWire(x-1,y,z,dimension,blue)
var down = this.getPowerForWire(x,y,z+1,dimension,blue)
var up = this.getPowerForWire(x,y,z-1,dimension,blue)
var top = this.getPowerForWire(x,y+1,z,dimension,blue)
var bottom = this.getPowerForWire(x,y-1,z,dimension,blue)
var westUp = tags && getTagBits(tags,"westUp",block) ? this.getPowerForWire(x+1,y+1,z,dimension,blue) : 0
var eastUp = tags && getTagBits(tags,"eastUp",block) ? this.getPowerForWire(x-1,y+1,z,dimension,blue) : 0
var northUp = tags && getTagBits(tags,"northUp",block) ? this.getPowerForWire(x,y+1,z+1,dimension,blue) : 0
var southUp = tags && getTagBits(tags,"southUp",block) ? this.getPowerForWire(x,y+1,z-1,dimension,blue) : 0
var westDown = tags && getTagBits(tags,"westDown",block) ? this.getPowerForWire(x+1,y-1,z,dimension,blue) : 0
var eastDown = tags && getTagBits(tags,"eastDown",block) ? this.getPowerForWire(x-1,y-1,z,dimension,blue) : 0
var northDown = tags && getTagBits(tags,"northDown",block) ? this.getPowerForWire(x,y-1,z+1,dimension,blue) : 0
var southDown = tags && getTagBits(tags,"southDown",block) ? this.getPowerForWire(x,y-1,z-1,dimension,blue) : 0
var level = max(right,left,down,up, top,bottom, northUp,southUp,eastUp,westUp, northDown,southDown,eastDown,westDown,this.redstoneComponentPowering(x,y,z,dimension)+1) - 1
if(this.getSurroundingBlockPower(x,y,z,dimension) === "strong"){
level = 15
}
return level < 0 ? 0 : level
}
repeaterIsPowering(x,y,z,rx,ry,rz,dimension){
var block = this.getBlock(rx,ry,rz,dimension)
if(block && (blockData[block].name === "repeater" || blockData[block].logicGate || blockData[block].name === "comparator")){
return blockData[block].canHavePower(rx,ry,rz,x,y,z,dimension,this)
}
return 0
}
observerIsPowering(x,y,z,rx,ry,rz,dimension){
var block = this.getBlock(rx,ry,rz,dimension)
if(block && blockData[block].name === "observer"){
return blockData[block].canHavePower(rx,ry,rz,x,y,z,dimension,this)
}
return 0
}
redstoneComponentPowering(x,y,z,dimension){
return max(
this.repeaterIsPowering(x,y,z,x+1,y,z,dimension),
this.repeaterIsPowering(x,y,z,x-1,y,z,dimension),
this.repeaterIsPowering(x,y,z,x,y,z+1,dimension),
this.repeaterIsPowering(x,y,z,x,y,z-1,dimension),
this.observerIsPowering(x,y,z,x+1,y,z,dimension),
this.observerIsPowering(x,y,z,x-1,y,z,dimension),
this.observerIsPowering(x,y,z,x,y+1,z,dimension),
this.observerIsPowering(x,y,z,x,y-1,z,dimension),
this.observerIsPowering(x,y,z,x,y,z+1,dimension),
this.observerIsPowering(x,y,z,x,y,z-1,dimension)
)
}
getRedstonePower(x,y,z,dimension){
var right = this.getPower(x+1,y,z,dimension)
var left = this.getPower(x-1,y,z,dimension)
var down = this.getPower(x,y,z+1,dimension)
var up = this.getPower(x,y,z-1,dimension)
var top = this.getPower(x,y+1,z,dimension)
var bottom = this.getPower(x,y-1,z,dimension)
var level = max(right,left,down,up,top,bottom, this.redstoneComponentPowering(x,y,z,dimension))
return level
}
getRepeaterPower(x,y,z,fx,fy,fz,dimension){
var level = max(this.getPower(fx,fy,fz,dimension), this.repeaterIsPowering(x,y,z,fx,fy,fz,dimension), this.observerIsPowering(x,y,z,fx,fy,fz,dimension))
return level
}
getPower(x,y,z,dimension){
return this.getTagByName(x,y,z,"power",dimension) || 0
}
setPower(x,y,z, level, lazy,dimension){
var block = this.getBlock(x,y,z,dimension)
if(block && blockData[block].noSetPower) return
let tagBits = blockData[block].tagBits
if(tagBits){
this.setTagByName(x,y,z,"power",level,lazy,dimension,true)
}else{
var tags = this.getTags(x,y,z,dimension) || {}
if(level) tags.power = level
else delete tags.power
this.setTags(x,y,z,tags,false,dimension,true)
}
this.updateBlock(x,y,z,false,true,null,null,null,dimension)
if(lazy) return //don't update blocks if lazy
this.powerChangeUpdate(x,y,z, x,y,z, false,dimension)
this.powerChangeUpdate(x+1,y,z, x,y,z, false,dimension)
this.powerChangeUpdate(x-1,y,z, x,y,z, false,dimension)
this.powerChangeUpdate(x,y,z+1, x,y,z, false,dimension)
this.powerChangeUpdate(x,y,z-1, x,y,z, false,dimension)
this.powerChangeUpdate(x,y+1,z, x,y,z, false,dimension)
this.powerChangeUpdate(x,y-1,z, x,y,z, false,dimension)
}
blockPowerNames = {top:"blockPowerTop",bottom:"blockPowerBottom",north:"blockPowerNorth",south:"blockPowerSouth",east:"blockPowerEast",west:"blockPowerWest"}
setBlockPower(x,y,z, type, fromDir,dimension){
var block = this.getBlock(x,y,z,dimension)
if(block && blockData[block].noSetPower) return
if(type !== null && type !== "weak" && type !== "strong") {type = null; console.error("Oh no! It can only be strong or weak or null. But it was",type)}
let tagBits = blockData[block].tagBits
type = !type ? 0 : (type === "strong" ? 2 : 1)
if(tagBits){
this.setTagByName(x,y,z,this.blockPowerNames[fromDir],type,false,dimension)
}else{
var tags = this.getTags(x,y,z,dimension) || {}
if(type){
if(!tags.blockPower) tags.blockPower = {}
tags.blockPower[fromDir] = type
}else if(tags.blockPower){
delete tags.blockPower[fromDir]
if(!tags.blockPower.top && !tags.blockPower.bottom && !tags.blockPower.north && !tags.blockPower.south && !tags.blockPower.east && !tags.blockPower.west) delete tags.blockPower
}
this.setTags(x,y,z,tags,false,dimension)
}
this.powerChangeUpdate(x,y,z, x,y,z, true,dimension)
if(fromDir !== "west") this.powerChangeUpdate(x+1,y,z, x,y,z, true,dimension)
if(fromDir !== "east") this.powerChangeUpdate(x-1,y,z, x,y,z, true,dimension)
if(fromDir !== "north") this.powerChangeUpdate(x,y,z+1, x,y,z, true,dimension)
if(fromDir !== "south") this.powerChangeUpdate(x,y,z-1, x,y,z, true,dimension)
if(fromDir !== "top") this.powerChangeUpdate(x,y+1,z, x,y,z, true,dimension)
if(fromDir !== "bottom") this.powerChangeUpdate(x,y-1,z, x,y,z, true,dimension)
}
getBlockPower(x,y,z, dir,dimension){
var tags = this.getTags(x,y,z,dimension)
if(!tags) return null
let block = this.getBlock(x,y,z,dimension)
let tagBits = blockData[block].tagBits
let power
if(tagBits){
if(dir){
power = this.getTagByName(x,y,z,this.blockPowerNames[dir],dimension)
}else{
power = max(
this.getTagByName(x,y,z,this.blockPowerNames["top"],dimension),
this.getTagByName(x,y,z,this.blockPowerNames["bottom"],dimension),
this.getTagByName(x,y,z,this.blockPowerNames["north"],dimension),
this.getTagByName(x,y,z,this.blockPowerNames["south"],dimension),
this.getTagByName(x,y,z,this.blockPowerNames["east"],dimension),
this.getTagByName(x,y,z,this.blockPowerNames["west"],dimension),
)
}
}else{
var blockPower = tags.blockPower
if(!blockPower) return null
if(dir){
power = blockPower[dir]
}else{
power = max(blockPower.top, blockPower.bottom, blockPower.north, blockPower.south, blockPower.east, blockPower.west)
}
}
return !power ? null : (power === 2 ? "strong" : "weak")
}
getSurroundingBlockPower(x,y,z,dimension){
var north = this.getBlockPower(x,y,z-1,null,dimension)
var south = this.getBlockPower(x,y,z+1,null,dimension)
var east = this.getBlockPower(x-1,y,z,null,dimension)
var west = this.getBlockPower(x+1,y,z,null,dimension)
var top = this.getBlockPower(x,y+1,z,null,dimension)
var bottom = this.getBlockPower(x,y-1,z,null,dimension)
if(top === "strong" || bottom === "strong" || north === "strong" || south === "strong" || east === "strong" || west === "strong"){
return "strong"
}else if(top === "weak" || bottom === "weak" || north === "weak" || south === "weak" || east === "weak" || west === "weak"){
return "weak"
}
return null
}
powerChangeUpdate(x,y,z,sx,sy,sz, blockPowerChanged,dimension){
var block = this.getBlock(x,y,z,dimension)
if(block && blockData[block].onpowerupdate){
blockData[block].onpowerupdate(x,y,z,sx,sy,sz, blockPowerChanged,dimension,this)
}
}
setTimeout(func,time,x,y,z,dimension,block){
let exist
if(x || x === 0) for(let i = this.timeoutQueue.length-1; i>=0; i--){
let timeout = this.timeoutQueue[i]
if(timeout.x === x && timeout.y === y && timeout.z === z && timeout.dimension === dimension){
exist = timeout
break
}
}
if(exist){
exist.func = func
exist.time = performance.now() + time
exist.x = x, exist.y = y, exist.z = z, exist.dimension = dimension
}else this.timeoutQueue.push({
func,
time:performance.now() + time,
x,y,z,dimension
})
}
loadChunks(){
this.chunkGenQueue.length = 0
this.lightingQueue.length = 0
this.populateQueue.length = 0
this.generateQueue.length = 0
this.loadQueue.length = 0
this.loaded.length = 0
for(let p of this.players){
let chunks = p.dimension === "nether" ? this.netherChunks : (p.dimension === "end" ? this.endChunks : this.chunks)
let cx = p.x >> 4
let cz = p.z >> 4
let loadDistance = min(this.loadDistance,p.loadDistance)
chunkPlayerDistArr.length = 0
sortChunkPX = p.x
sortChunkPZ = p.z
let minChunkX = cx - loadDistance - 2 //Load extra for generating & populating
let maxChunkX = cx + loadDistance + 2
let minChunkZ = cz - loadDistance - 2
let maxChunkZ = cz + loadDistance + 2
for (let x = minChunkX; x <= maxChunkX; x++) {
for (let z = minChunkZ; z <= maxChunkZ; z++) {
let chunk
if (!chunks[x]) {
chunks[x] = []
}
if (!chunks[x][z]) {
chunk = new Chunk(x * 16, z * 16, p.dimension,this)
chunks[x][z] = chunk
}
chunk = chunks[x][z]
if(!chunk.allGenerated && maxDist(cx, cz, x, z) <= loadDistance && !this.chunkGenQueue.includes(chunk)){
chunkPlayerDistArr.push(chunk)
}
if(!this.loaded.includes(chunk)){
this.loaded[this.loaded.length] = chunk
}
}
}
this.chunkGenQueue.push(...chunkPlayerDistArr.sort(sortChunks))
}
}
async tick() {
let tickStart = performance.now()
if(this.loadedUpdate) this.loadChunks()
now = tickStart
let sleep = 1, sleepTotal = 1
for(var p of this.players){
if(p.hidden) continue
if(p.sleeping) sleep++
sleepTotal++
}
let allSleeping = sleep === sleepTotal
if(this.settings.dayNightCycle){
if(allSleeping){
this.time += 6.25
}else this.time += 0.125
}
if(this.settings.weatherCycle){
this.nextWeather -= allSleeping ? 6.25 : 0.125
if(this.nextWeather <= 0) {
this.nextWeather = 0
this.weather = this.weather ? "" : "rain"
this.nextWeather = this.weather ? rand(0.5,1)*1000 : rand(0.5,7.5)*1000
}
}
if(this.weather === "rain" || this.weather === "snow"){
if(this.slowWeatherAmount >= 0.5){
this.weatherAmount += 0.02
if(this.weatherAmount > 1) this.weatherAmount = 1
}
this.slowWeatherAmount += 0.01
if(this.slowWeatherAmount > 1) this.slowWeatherAmount = 1
}else{
this.weatherAmount -= 0.02
if(this.weatherAmount < 0) this.weatherAmount = 0
this.slowWeatherAmount -= 0.01
if(this.slowWeatherAmount < 0) this.slowWeatherAmount = 0
}
let time = this.time % 1000
if(time > 725 && time < 850) this.skyLight = 1 - ((time - 725) / 125) //get darker
else if(time > 150 && time < 275) this.skyLight = (time - 150) / 125 //get brighter
else if(time >= 850 || time <= 150) this.skyLight = 0
else this.skyLight = 1
for (let i = 0; i < this.loaded.length; i++) {
this.loaded[i].tick()
}
for(let i = this.waitingEntities.length-1; i>=0; i--){
if(this.waitingEntities[i].goToChunk()) this.waitingEntities.splice(i,1)
}
for(let i in this.players){
this.players[i].update()
this.players[i].updateLoaded()
}
for(let i = this.timeoutQueue.length-1; i>=0; i--){
if(tickStart - this.timeoutQueue[i].time >= 0) this.timeoutQueue.splice(i,1)[0].func()
}
if(this.superflat === "island" && this.islandGenerator.stage < 10){
if(!this.islandGenerator.generating){
this.loadPromises.push(this.islandGenerator.Generate())
}
return
}
if(this.ticking) return
this.ticking = true
let doneWork = true
while(doneWork) {
doneWork = false
debug.start = performance.now()
if(this.generateQueue.length){
for(let i=0; i<this.generateQueue.length; i++){
let chunk = this.generateQueue[i]
if(chunk.generated){
this.generateQueue.splice(i,1)
i--
}else chunk.generate()
}
doneWork = true
}
if(this.populateQueue.length && !doneWork){
let chunk = this.populateQueue[this.populateQueue.length - 1]
if(chunk.populated){
this.populateQueue.pop()
if(this.populateQueue.length) doneWork = true
}else{
if (!chunk.caves) {
chunk.carveCaves()
} else if (!chunk.populated) {
await chunk.populate()
}
doneWork = true
}
}
if (this.loadQueue.length && !doneWork) {
this.loadQueue.pop().load()
doneWork = true
}
if (this.lightingQueue.length && !doneWork) {
this.lightingQueue.pop().fillLight()
doneWork = true
}
if (this.chunkGenQueue.length && !doneWork) {
let chunk = this.chunkGenQueue[0]
if(this.fillReqs(chunk.x >> 4, chunk.z >> 4, chunk.type)) {
let dimension = chunk.type
let loadFrom = dimension === "nether" ? this.netherLoadFrom : (dimension === "end" ? this.endLoadFrom : this.loadFrom)
let done = true
if (!chunk.loaded && !this.loadQueue.includes(chunk)) {
if(loadFrom[(chunk.x>>4)+","+(chunk.z>>4)]) this.loadQueue.push(chunk)
else chunk.loaded = true
done = false
}
if (!chunk.lit && !this.lightingQueue.includes(chunk)) {
this.lightingQueue.push(chunk)
done = false
}
if(done){
chunk.allGenerated = true
this.chunkGenQueue.shift()
this.generatedChunks++
}
}
doneWork = true
}
if (doneWork) await yieldThread()
}
this.ticking = false
}
fillReqs(x, z, dimension) {
// Chunks must all be loaded first.
let done = true
for (let i = x - 2; i <= x + 2; i++) {
for (let j = z - 2; j <= z + 2; j++) {
let chunk = this.getChunk(i*16,j*16,dimension)
if(!chunk){
done = false
continue
}
if (!chunk.generated && !this.generateQueue.includes(chunk)) {
this.generateQueue.push(chunk)
done = false
}
if (!chunk.populated && i >= x - 1 && i <= x + 1 && j >= z - 1 && j <= z + 1 && !this.populateQueue.includes(chunk)) {
this.populateQueue.push(chunk)
done = false
}
}
}
return done
}
getTop(x,z,dimension){
let chunk = this.getChunk(x,z,dimension)
return chunk && chunk.tops[(z&15) * 16 + (x&15)] || 0
}
getSolidTop(x,z,dimension){
let chunk = this.getChunk(x,z,dimension)
return chunk && chunk.solidTops[(z&15) * 16 + (x&15)] || 0
}
getSaveString(){
let world = this
let chunks = this.chunks, netherChunks = this.netherChunks, endChunks = this.endChunks
let blockSet = new Set()
let sectionMap = {}, sectionTags = {}, sectionTagsLength = {}
for (let x in chunks) {
for (let z in chunks[x]) {
let chunk = chunks[x][z]
if (chunk.edited) {
for (let y = 0; y < chunk.sections.length; y++) {
const section = chunk.sections[y], original = chunk.cleanSections[y], blocks = section.blocks, tags = section.tags
if(!section.edited) continue
let changes = false
for (let i = 0; i < blocks.length; i++) {
if (blocks[i] !== original[i] || tags[i]) {
blockSet.add(blocks[i])
changes = true
let x = (i >> 8) + section.x
let y = (i >> 4 & 15) + section.y - minHeight
let z = (i & 15) + section.z
let str = `${x>>3},${y>>3},${z>>3},0` // 8x8x8 sections
if (!sectionMap[str]) {
sectionMap[str] = []
for (let k = 0; k < 6; k++) sectionMap[str].push(new Int32Array(8*8*8).fill(-1))
sectionTags[str] = []
sectionTagsLength[str] = 0
}
// 6 copies of the chunk, all oriented in different directions so we can see which one compresses the most
sectionMap[str][0][(y & 7) << 6 | (x & 7) << 3 | z & 7] = blocks[i]
sectionMap[str][1][(y & 7) << 6 | (z & 7) << 3 | x & 7] = blocks[i]
sectionMap[str][2][(x & 7) << 6 | (y & 7) << 3 | z & 7] = blocks[i]
sectionMap[str][3][(x & 7) << 6 | (z & 7) << 3 | y & 7] = blocks[i]
sectionMap[str][4][(z & 7) << 6 | (x & 7) << 3 | y & 7] = blocks[i]
sectionMap[str][5][(z & 7) << 6 | (y & 7) << 3 | x & 7] = blocks[i]
if(tags[i]){
sectionTags[str][(y & 7) << 6 | (x & 7) << 3 | z & 7] = typeof tags[i] === "number" ? tags[i] : JSON.stringify(tags[i]).substring(0,65535)
sectionTagsLength[str]++
}
}
}
if (!changes) {
section.edited = false
}
}
}
}
}
for(let j in this.loadFrom){
const section = this.loadFrom[j], blocks = section.blocks, tags = section.tags
let [sx, sz] = j.split(",").map(Number)
for(let i in blocks){
blockSet.add(blocks[i])
const z = (i & 15)+sz*16, x = ((i >> 4) & 15)+sx*16, y = (i >> 8) & 255
let str = `${x>>3},${y>>3},${z>>3},0`
if (!sectionMap[str]) {
sectionMap[str] = []
for (let k = 0; k < 6; k++) sectionMap[str].push(new Int32Array(8*8*8).fill(-1))
sectionTags[str] = []
sectionTagsLength[str] = 0
}
sectionMap[str][0][(y & 7) << 6 | (x & 7) << 3 | z & 7] = blocks[i]
sectionMap[str][1][(y & 7) << 6 | (z & 7) << 3 | x & 7] = blocks[i]
sectionMap[str][2][(x & 7) << 6 | (y & 7) << 3 | z & 7] = blocks[i]
sectionMap[str][3][(x & 7) << 6 | (z & 7) << 3 | y & 7] = blocks[i]
sectionMap[str][4][(z & 7) << 6 | (x & 7) << 3 | y & 7] = blocks[i]
sectionMap[str][5][(z & 7) << 6 | (y & 7) << 3 | x & 7] = blocks[i]
if(tags[i]){
sectionTags[str][(y & 7) << 6 | (x & 7) << 3 | z & 7] = typeof tags[i] === "number" ? tags[i] : JSON.stringify(tags[i]).substring(0,65535)
sectionTagsLength[str]++
}
}
}
//nether
for (let x in netherChunks) {
for (let z in netherChunks[x]) {
let chunk = netherChunks[x][z]
if (chunk.edited) {
for (let y = 0; y < chunk.sections.length; y++) {
const section = chunk.sections[y], original = chunk.cleanSections[y], blocks = section.blocks, tags = section.tags
if(!section.edited) continue
let changes = false
for (let i = 0; i < blocks.length; i++) {
if (blocks[i] !== original[i] || tags[i]) {
blockSet.add(blocks[i])
changes = true
let x = (i >> 8) + section.x
let y = (i >> 4 & 15) + section.y - minHeight
let z = (i & 15) + section.z
let str = `${x>>3},${y>>3},${z>>3},1` // 8x8x8 sections
if (!sectionMap[str]) {
sectionMap[str] = []
for (let k = 0; k < 6; k++) sectionMap[str].push(new Int32Array(8*8*8).fill(-1))
sectionTags[str] = []
sectionTagsLength[str] = 0
}
// 6 copies of the chunk, all oriented in different directions so we can see which one compresses the most
sectionMap[str][0][(y & 7) << 6 | (x & 7) << 3 | z & 7] = blocks[i]
sectionMap[str][1][(y & 7) << 6 | (z & 7) << 3 | x & 7] = blocks[i]
sectionMap[str][2][(x & 7) << 6 | (y & 7) << 3 | z & 7] = blocks[i]
sectionMap[str][3][(x & 7) << 6 | (z & 7) << 3 | y & 7] = blocks[i]
sectionMap[str][4][(z & 7) << 6 | (x & 7) << 3 | y & 7] = blocks[i]
sectionMap[str][5][(z & 7) << 6 | (y & 7) << 3 | x & 7] = blocks[i]
if(tags[i]){
sectionTags[str][(y & 7) << 6 | (x & 7) << 3 | z & 7] = typeof tags[i] === "number" ? tags[i] : JSON.stringify(tags[i]).substring(0,65535)
sectionTagsLength[str]++
}
}
}
if (!changes) {
section.edited = false
}
}
}
}
}
for(let j in this.netherLoadFrom){
const section = this.netherLoadFrom[j], blocks = section.blocks, tags = section.tags
let [sx, sz] = j.split(",").map(Number)
for(let i in blocks){
blockSet.add(blocks[i])
const z = (i & 15)+sz*16, x = ((i >> 4) & 15)+sx*16, y = (i >> 8) & 255
let str = `${x>>3},${y>>3},${z>>3},1`
if (!sectionMap[str]) {
sectionMap[str] = []
for (let k = 0; k < 6; k++) sectionMap[str].push(new Int32Array(8*8*8).fill(-1))
sectionTags[str] = []
sectionTagsLength[str] = 0
}
sectionMap[str][0][(y & 7) << 6 | (x & 7) << 3 | z & 7] = blocks[i]
sectionMap[str][1][(y & 7) << 6 | (z & 7) << 3 | x & 7] = blocks[i]
sectionMap[str][2][(x & 7) << 6 | (y & 7) << 3 | z & 7] = blocks[i]
sectionMap[str][3][(x & 7) << 6 | (z & 7) << 3 | y & 7] = blocks[i]
sectionMap[str][4][(z & 7) << 6 | (x & 7) << 3 | y & 7] = blocks[i]
sectionMap[str][5][(z & 7) << 6 | (y & 7) << 3 | x & 7] = blocks[i]
if(tags[i]){
sectionTags[str][(y & 7) << 6 | (x & 7) << 3 | z & 7] = typeof tags[i] === "number" ? tags[i] : JSON.stringify(tags[i]).substring(0,65535)
sectionTagsLength[str]++
}
}
}
//end
for (let x in endChunks) {
for (let z in endChunks[x]) {
let chunk = endChunks[x][z]
if (chunk.edited) {
for (let y = 0; y < chunk.sections.length; y++) {
const section = chunk.sections[y], original = chunk.cleanSections[y], blocks = section.blocks, tags = section.tags
if(!section.edited) continue
let changes = false
for (let i = 0; i < blocks.length; i++) {
if (blocks[i] !== original[i] || tags[i]) {
blockSet.add(blocks[i])
changes = true
let x = (i >> 8) + section.x
let y = (i >> 4 & 15) + section.y - minHeight
let z = (i & 15) + section.z
let str = `${x>>3},${y>>3},${z>>3},2` // 8x8x8 sections
if (!sectionMap[str]) {
sectionMap[str] = []
for (let k = 0; k < 6; k++) sectionMap[str].push(new Int32Array(8*8*8).fill(-1))
sectionTags[str] = []
sectionTagsLength[str] = 0
}
// 6 copies of the chunk, all oriented in different directions so we can see which one compresses the most
sectionMap[str][0][(y & 7) << 6 | (x & 7) << 3 | z & 7] = blocks[i]
sectionMap[str][1][(y & 7) << 6 | (z & 7) << 3 | x & 7] = blocks[i]
sectionMap[str][2][(x & 7) << 6 | (y & 7) << 3 | z & 7] = blocks[i]
sectionMap[str][3][(x & 7) << 6 | (z & 7) << 3 | y & 7] = blocks[i]
sectionMap[str][4][(z & 7) << 6 | (x & 7) << 3 | y & 7] = blocks[i]
sectionMap[str][5][(z & 7) << 6 | (y & 7) << 3 | x & 7] = blocks[i]
if(tags[i]){
sectionTags[str][(y & 7) << 6 | (x & 7) << 3 | z & 7] = typeof tags[i] === "number" ? tags[i] : JSON.stringify(tags[i]).substring(0,65535)
sectionTagsLength[str]++
}
}
}
if (!changes) {
section.edited = false
}
}
}
}
}
for(let j in this.endLoadFrom){
const section = this.endLoadFrom[j], blocks = section.blocks, tags = section.tags
let [sx, sz] = j.split(",").map(Number)
for(let i in blocks){
blockSet.add(blocks[i])
const z = (i & 15)+sz*16, x = ((i >> 4) & 15)+sx*16, y = (i >> 8) & 255
let str = `${x>>3},${y>>3},${z>>3},1`
if (!sectionMap[str]) {
sectionMap[str] = []
for (let k = 0; k < 6; k++) sectionMap[str].push(new Int32Array(8*8*8).fill(-1))
sectionTags[str] = []
sectionTagsLength[str] = 0
}
sectionMap[str][0][(y & 7) << 6 | (x & 7) << 3 | z & 7] = blocks[i]
sectionMap[str][1][(y & 7) << 6 | (z & 7) << 3 | x & 7] = blocks[i]
sectionMap[str][2][(x & 7) << 6 | (y & 7) << 3 | z & 7] = blocks[i]
sectionMap[str][3][(x & 7) << 6 | (z & 7) << 3 | y & 7] = blocks[i]
sectionMap[str][4][(z & 7) << 6 | (x & 7) << 3 | y & 7] = blocks[i]
sectionMap[str][5][(z & 7) << 6 | (y & 7) << 3 | x & 7] = blocks[i]
if(tags[i]){
sectionTags[str][(y & 7) << 6 | (x & 7) << 3 | z & 7] = typeof tags[i] === "number" ? tags[i] : JSON.stringify(tags[i]).substring(0,65535)
sectionTagsLength[str]++
}
}
}
let blocks = Array.from(blockSet)
let palette = {}
blocks.forEach((block, index) => palette[block] = index)
let paletteBits = BitArrayBuilder.bits(blocks.length)
let superflats = this.superflat==="island" ? 2 : (this.superflat === "void" ? 3 : this.superflat)
let weatherBits = this.weather==="rain" ? 1 : (this.weather === "snow" ? 2 : 0)
let bab = new BitArrayBuilder()
bab.addString(this.name)
bab.add(this.worldSeed, 32)
bab.add(round(this.time), 32)
bab.add(weatherBits,2).add(this.nextWeather,17)
bab.add(superflats, 2).add(this.caves, 1).add(this.trees, 1)
let v = this.usePreBeta ? "Alpha 1.0.5" : version
bab.add(v.length, 8)
for (let c of v) bab.add(c.charCodeAt(0), 8)
bab.add(blocks.length, 32)
for (let block of blocks) bab.add(block, 32)
let sections = Object.entries(sectionMap)
bab.add(sections.length, 32)
for (let [coords, section] of sections) {
let [sx, sy, sz, dimension] = coords.split(",").map(Number)
bab.add(sx, 16).add(sy, this.usePreBeta?5:8).add(sz, 16).add(dimension,3)
// Determine the most compact orientation by checking all 6!
let bestBAB = null
for (let i = 0; i < 6; i++) {
let bab = new BitArrayBuilder()
let blocks = section[i]
bab.add(i, 3)
let run = null
let runs = []
let singles = []
for (let i = 0; i < blocks.length; i++) {
const block = blocks[i]
if (block >= 0) {
if (!run && i < blocks.length - 2 && blocks[i + 1] >= 0 && blocks[i + 2] >= 0) {
run = [i, []]
runs.push(run)
}
if (run) {
if (run[1].length && block === run[1][run[1].length-1][1]) run[1][run[1].length-1][0]++
else run[1].push([1, block])
}
else singles.push([i, blocks[i]])
}
else run = null
}
bab.add(runs.length, 8)
bab.add(singles.length, 9)
for (let [start, blocks] of runs) {
// Determine the number of bits needed to store the lengths of each block type
let maxBlocks = 0
for (let block of blocks) maxBlocks = Math.max(maxBlocks, block[0])
let lenBits = BitArrayBuilder.bits(maxBlocks)
bab.add(start, 9).add(blocks.length, 9).add(lenBits, 4)
for (let [count, block] of blocks) bab.add(count - 1, lenBits).add(palette[block], paletteBits)
}
for (let [index, block] of singles) {
bab.add(index, 9).add(palette[block], paletteBits)
}
bab.add(sectionTagsLength[coords],9)
if(sectionTagsLength[coords]) for(let i in sectionTags[coords]){
let tags = sectionTags[coords][i]
bab.add(i,9)
if(typeof tags === "number"){
bab.add(0,1)
bab.add(tags,32)
}else{
bab.add(1,1)
bab.addString(tags,16)
}
}
if (!bestBAB || bab.bitLength < bestBAB.bitLength) {
bestBAB = bab
}
}
bab.append(bestBAB)
}
bab.add(worldSettingKeys.length,8)
for(let i of worldSettingKeys){
bab.add(this.settings[i]?1:0, 1)
}
let entities = this.entities.filter(r => !r.remote)
bab.add(entities.length,32)
let now = performance.now()
for(let i of entities){
let pos = this.getEntPos(i,now)
bab.add(pos.bitLength,16)
bab.append(pos)
}
bab.add(this.survival?(this.survival==="hardcore"?2:1):0,2).add(this.cheats?1:0,1)
return bab.array
}
loadSave(data, onlyMetdata = false) {
if (typeof data === "string") {
if (data.includes("Alpha")) {
try {
return this.loadOldSave(data, onlyMetdata)
}
catch(e) {
console.error(e)
alert("Unable to load save string.")
}
}
try {
data = atoarr(data)
}
catch(e) {
alert("Malformatted save string. Unable to load")
throw e
}
}
let reader = new BitArrayReader(data)
this.name = reader.readString()
this.setSeed(reader.read(32),true)
this.time = reader.read(32)
let weatherBits = reader.read(2)
this.weather = weatherBits === 1 ? "rain" : (weatherBits === 2 ? "snow" : "")
this.nextWeather = reader.read(17)
this.superflat = reader.read(2)
this.superflat = this.superflat === 2 ? "island" : (this.superflat === 3 ? "void" : Boolean(this.superflat))
this.caves = reader.read(1)
this.trees = reader.read(1)
let nameLen = reader.read(8)
try{
this.version = ""
for (let i = 0; i < nameLen; i++) this.version += String.fromCharCode(reader.read(8))
if(!this.version.includes("Alpha") && !this.version.includes("Beta")) throw ""
}catch(e){
console.error(e)
return this.loadCrossSaveCode(data, onlyMetdata)
}
this.usePreBeta = verMoreThan("1.1.0",this.version.replace(/(Alpha|Beta) /, ''))
if(onlyMetdata) return
let paletteLen = reader.read(32)
let palette = []
let paletteBits = BitArrayBuilder.bits(paletteLen)
for (let i = 0; i < paletteLen; i++) palette.push(reader.read(32))
const getIndex = [
(index, x, y, z) => (y + (index >> 6 & 7))*256 + (x + (index >> 3 & 7))*16 + z + (index >> 0 & 7),
(index, x, y, z) => (y + (index >> 6 & 7))*256 + (x + (index >> 0 & 7))*16 + z + (index >> 3 & 7),
(index, x, y, z) => (y + (index >> 3 & 7))*256 + (x + (index >> 6 & 7))*16 + z + (index >> 0 & 7),
(index, x, y, z) => (y + (index >> 0 & 7))*256 + (x + (index >> 6 & 7))*16 + z + (index >> 3 & 7),
(index, x, y, z) => (y + (index >> 0 & 7))*256 + (x + (index >> 3 & 7))*16 + z + (index >> 6 & 7),
(index, x, y, z) => (y + (index >> 3 & 7))*256 + (x + (index >> 0 & 7))*16 + z + (index >> 6 & 7)
]
let sectionCount = reader.read(32)
let chunks = [{},{},{}]
for (let i = 0; i < sectionCount; i++) {
let x = reader.read(16, true) * 8
let y = reader.read(this.usePreBeta?5:8, false) * 8
let z = reader.read(16, true) * 8
let dimension = reader.read(3)
let orientation = reader.read(3)
if(this.usePreBeta) y -= minHeight
let cx = x >> 4
let cz = z >> 4
// Make them into local chunk coords
x = x !== cx * 16 ? 8 : 0
z = z !== cz * 16 ? 8 : 0
let ckey = `${cx},${cz}`
let chunk = chunks[dimension][ckey]
if (!chunk) {
chunk = {blocks:[],tags:[]}
chunks[dimension][ckey] = chunk
}
let runs = reader.read(8)
let singles = reader.read(9)
for (let j = 0; j < runs; j++) {
let index = reader.read(9)
let types = reader.read(9)
let lenSize = reader.read(4)
for (let k = 0; k < types; k++) {
let chain = reader.read(lenSize) + 1
let block = reader.read(paletteBits)
for (let l = 0; l < chain; l++) {
chunk.blocks[getIndex[orientation](index, x, y, z)] = palette[block]
index++
}
}
}
for (let j = 0; j < singles; j++) {
let index = reader.read(9)
let block = reader.read(paletteBits)
chunk.blocks[getIndex[orientation](index, x, y, z)] = palette[block]
}
let tagsCount = reader.read(9)
for(let j=0; j<tagsCount; j++){
let index = reader.read(9)
if(reader.read(1)){
let tags = reader.readString(16)
try{
chunk.tags[getIndex[0](index, x, y, z)] = JSON.parse(tags)
}catch(e){console.log(e)}
}else{
chunk.tags[getIndex[0](index, x, y, z)] = reader.read(32)
}
}
}
this.loadFrom = chunks[0]
this.loadKeys = Object.keys(chunks[0])
this.netherLoadFrom = chunks[1]
this.netherLoadKeys = Object.keys(chunks[1])
this.endLoadFrom = chunks[2]
this.endLoadKeys = Object.keys(chunks[2])
let settingsKeys = reader.read(8)
Object.assign(this.settings,defaultWorldSettings)
for(let i=0; i<settingsKeys; i++){
this.settings[worldSettingKeys[i]] = reader.read(1) ? true : false
}
if(this.usePreBeta){
let inv = this.playersInv[":host"] = {}
let survivLength = reader.read(8)
if(survivLength) inv.survivStr = reader.readToNew(survivLength,true)
let invLength = reader.read(16)
if(invLength) inv.inv = reader.readToNew(invLength,true)
}
let entsLen = reader.read(32)
for(let i=0; i<entsLen; i++){
let entLen = reader.read(16)
this.posEntity(reader.readToNew(entLen, true))
}
if(!this.usePreBeta){
this.survival = reader.read(2); this.survival = this.survival === 1 ? true : (this.survival === 2 ? "hardcore" : false)
this.cheats = reader.read(1)
}
this.findSpawnPoint()
this.usePreBeta = this.usePreBeta && !this.superflat //Superflat and other types can be upgraded
}
loadCrossSaveCode(data, onlyMetdata){
const oldSLAB     = 0x100 // 9th bit
const oldSTAIR    = 0x200 // 10th bit
const oldFLIP     = 0x400 // 11th bit
const oldSOUTH    = 0x800
const oldEAST     = 0x1000
const oldWEST     = 0x1800
const blockConvert = [
"air",
"grass",
"dirt",
"stone",
"bedrock",
"sand",
"gravel",
"leaves",
"glass",
"cobblestone",
"mossyCobble",
"stoneBricks",
"mossyStoneBricks",
"bricks",
"coalOre",
"ironOre",
"goldOre",
"diamondOre",
"redstoneOre",
"lapisOre",
"emeraldOre",
"coalBlock",
"ironBlock",
"goldBlock",
"diamondBlock",
"redstoneBlock",
"lapisBlock",
"emeraldBlock",
"oakPlanks",
"oakLog",
"acaciaPlanks",
"acaciaLog",
"birchPlanks",
"birchLog",
"darkOakPlanks",
"darkOakLog",
"junglePlanks",
"jungleLog",
"sprucePlanks",
"spruceLog",
"whiteWool",
"orangeWool",
"magentaWool",
"lightBlueWool",
"yellowWool",
"limeWool",
"pinkWool",
"grayWool",
"lightGrayWool",
"cyanWool",
"purpleWool",
"blueWool",
"brownWool",
"greenWool",
"redWool",
"blackWool",
"whiteConcrete",
"orangeConcrete",
"magentaConcrete",
"lightBlueConcrete",
"yellowConcrete",
"limeConcrete",
"pinkConcrete",
"grayConcrete",
"lightGrayConcrete",
"cyanConcrete",
"purpleConcrete",
"blueConcrete",
"brownConcrete",
"greenConcrete",
"redConcrete",
"blackConcrete",
"bookshelf",
"netherrack",
"soulSand",
"glowstone",
"netherWartBlock",
"netherBricks",
"redNetherBricks",
"netherQuartzOre",
"quartzBlock",
"quartzPillar",
"chiseledQuartzBlock",
"chiseledStoneBricks",
"smoothStone",
"andesite",
"polishedAndesite",
"diorite",
"polishedDiorite",
"granite",
"polishedGranite",
"light",
"water",
"lava",
"obsidian",
"cryingObsidian",
"endStone",
"endStoneBricks",
"chiseledNetherBricks",
"crackedNetherBricks",
"crackedPolishedBlackstoneBricks",
"crackedStoneBricks",
"polishedBlackstoneBricks",
"prismarineBricks",
"quartzBricks",
"oakDoorTop",
"oakDoorBottom",
"warpedDoorTop",
"warpedDoorBottom",
"ironTrapdoor"
].reduce((a, v, i) => ({
...a,
[i]: blockIds[v],
[i|oldSLAB]: blockIds[v]|SLAB,
[i|oldSLAB|oldFLIP]: blockIds[v]|FLIP,
[i|oldSTAIR]: blockIds[v]|STAIR,
[i|oldSTAIR|oldSOUTH]: blockIds[v]|STAIR|SOUTH,
[i|oldSTAIR|oldEAST]: blockIds[v]|STAIR|EAST,
[i|oldSTAIR|oldWEST]: blockIds[v]|STAIR|WEST,
[i|oldSTAIR|oldFLIP]: blockIds[v]|STAIR|FLIP,
[i|oldSTAIR|oldSOUTH|oldFLIP]: blockIds[v]|STAIR|SOUTH|FLIP,
[i|oldSTAIR|oldEAST|oldFLIP]: blockIds[v]|STAIR|EAST|FLIP,
[i|oldSTAIR|oldWEST|oldFLIP]: blockIds[v]|STAIR|WEST|FLIP,
}), {}) 
let reader = new BitArrayReader(data)
let nameLen = reader.read(8)
this.name = ""
for (let i = 0; i < nameLen; i++) this.name += String.fromCharCode(reader.read(8))
this.setSeed(reader.read(32),true)
this.time = reader.read(32)*0+500
let inv = this.playersInv[":host"] = {}
inv.customPos = true
inv.x = reader.read(20, true)
inv.y = reader.read(8)
inv.z = reader.read(20, true)
for (let i = 0; i < 9; i++){
let id = reader.skip(16)
}
reader.skip(4)
reader.skip(1)
reader.skip(1)
this.superflat = Boolean(reader.read(1))
this.caves = reader.read(1)
this.trees = reader.read(1)
this.version = "Alpha " + [reader.read(8), reader.read(8), reader.read(8)].join(".")
this.usePreBeta = !this.superflat //Superflat and other types can be upgraded
if(onlyMetdata) return
let paletteLen = reader.read(16)
let palette = []
let paletteBits = BitArrayBuilder.bits(paletteLen)
for (let i = 0; i < paletteLen; i++) palette.push(reader.read(16))
for(let i=0; i<palette.length; i++){
if(blockConvert[palette[i]]) palette[i] = blockConvert[palette[i]]
}
const getIndex = [
(index, x, y, z) => (y + (index >> 6 & 7))*256 + (x + (index >> 3 & 7))*16 + z + (index >> 0 & 7),
(index, x, y, z) => (y + (index >> 6 & 7))*256 + (x + (index >> 0 & 7))*16 + z + (index >> 3 & 7),
(index, x, y, z) => (y + (index >> 3 & 7))*256 + (x + (index >> 6 & 7))*16 + z + (index >> 0 & 7),
(index, x, y, z) => (y + (index >> 0 & 7))*256 + (x + (index >> 6 & 7))*16 + z + (index >> 3 & 7),
(index, x, y, z) => (y + (index >> 0 & 7))*256 + (x + (index >> 3 & 7))*16 + z + (index >> 6 & 7),
(index, x, y, z) => (y + (index >> 3 & 7))*256 + (x + (index >> 0 & 7))*16 + z + (index >> 6 & 7)
]
let sectionCount = reader.read(32)
let chunks = {}
for (let i = 0; i < sectionCount; i++) {
let x = reader.read(16, true) * 8
let y = reader.read(5, false) * 8 - minHeight
let z = reader.read(16, true) * 8
let orientation = reader.read(3)
let cx = x >> 4
let cz = z >> 4
// Make them into local chunk coords
x = x !== cx * 16 ? 8 : 0
z = z !== cz * 16 ? 8 : 0
let ckey = `${cx},${cz}`
let chunk = chunks[ckey]
if (!chunk) {
chunk = {blocks:[],tags:[]}
chunks[ckey] = chunk
}
let runs = reader.read(8)
let singles = reader.read(9)
for (let j = 0; j < runs; j++) {
let index = reader.read(9)
let types = reader.read(9)
let lenSize = reader.read(4)
for (let k = 0; k < types; k++) {
let chain = reader.read(lenSize) + 1
let block = reader.read(paletteBits)
for (let l = 0; l < chain; l++) {
chunk.blocks[getIndex[orientation](index, x, y, z)] = palette[block]
index++
}
}
}
for (let j = 0; j < singles; j++) {
let index = reader.read(9)
let block = reader.read(paletteBits)
chunk.blocks[getIndex[orientation](index, x, y, z)] = palette[block]
}
}
this.loadFrom = chunks
this.loadKeys = Object.keys(chunks)
this.spawnPoint.y = superflat ? 6 : (round(this.noiseProfile.noise(8 * generator.smooth, 8 * generator.smooth) * generator.height) + 2 + generator.extra)
Object.assign(this.settings, defaultWorldSettings)
}
loadOldSave(str, onlyMetdata){
let data = str.split(";")
if (!str.includes("Alpha ")) {
return alert("too old")
}
this.name = data.shift()
let worldData = data.shift().split(",")
this.setSeed(parseInt(worldData.shift(), 36),true)
this.time = typeof worldData[0] === "string" ? parseFloat(worldData.shift()) : (worldData.shift(), 375)
this.weather = worldData.shift() || ""
this.nextWeather = parseFloat(worldData.shift()) || this.nextWeather
let inv = this.playersInv[":host"] = {}
let playerData = data.shift().split(",")
inv.p.x = parseInt(playerData[0], 36)
inv.p.y = parseInt(playerData[1], 36)
inv.p.z = parseInt(playerData[2], 36)
let options = parseInt(playerData[5], 36)
let v = data[0].replace("Alpha ","")
this.superflat = options >> 1 & 3
if(this.superflat === 0) this.superflat = false
if(this.superflat === 1) this.superflat = true
if(this.superflat === 2) this.superflat = "island"
if(this.superflat === 3) this.superflat = "void"
this.caves = options >> 4 & 1
this.trees = options >> 5 & 1
let version = data.shift()
this.version = version
this.usePreBeta = !this.superflat //Superflat and other types can be upgraded
if(onlyMetdata) return
// if (version.split(" ")[1].split(".").join("") < 70) {
// 	alert("This save code is for an older version. 0.7.0 or later is needed")
// }
let palletes = data.shift().split("|")
let pallete = palletes[0].split(",").map(n => parseInt(n, 36)), netherPallete = palletes[1] ? palletes[1].split(",").map(n => parseInt(n, 36)) : "", endPallete = palletes[2] ? palletes[2].split(",").map(n => parseInt(n, 36)) : ""
let chunks = {}, netherChunks = {}, endChunks = {}
let dimension = ""
for (let i = 0; data.length; i++) {
let blocks = data.shift().split(",")
if(blocks[0].startsWith("|")){
blocks[0] = blocks[0].substring(1)
if(dimension === "") dimension = "nether"
else if(dimension === "nether") dimension = "end"
else alert("Error: Save string cotains extra dimensions not in this version.")
}
if(!blocks[0]) continue //maybe it was only the "|"
var loadFrom = dimension === "nether" ? netherChunks : (dimension === "end" ? endChunks : chunks)
let cx = parseInt(blocks.shift(), 36)
let cy = parseInt(blocks.shift(), 36)
let cz = parseInt(blocks.shift(), 36)
let str = `${cx},${cz}`
if (!chunks[str]) chunks[str] = {blocks:[],tags:[]}
let chunk = chunks[str]
var currentPallete = dimension === "nether" ? netherPallete : (dimension === "end" ? endPallete : pallete)
for (let j = 0; j < blocks.length; j++) {
let block, tags
if(blocks[j].includes("/")){
let data = blocks[j].split("/")
block = parseInt(data[0], 36)
try{
tags = parseInt(data[1], 36) || JSON.parse(data[1].replace(/\\x2f/g,"/").replace(/\\x3b/g,";").replace(/\\x2c/g,",").replace(/\\x7c/g,"|"))
}catch(e){
console.error(e,data[1])
}
}else block = parseInt(blocks[j], 36)
// Old index was 0xXYZ, new index is 0xYYXZ
let x = block >> 8 & 15
let y = block >> 4 & 15
let z = block & 15
let index = (cy * 16 + y - minHeight) * 256 + x * 16 + z
let pid = block >> 12
chunk.blocks[index] = currentPallete[pid]
chunk.tags[index] = tags
}
}
this.loadFrom = chunks
this.loadKeys = Object.keys(chunks)
this.netherLoadFrom = netherChunks
this.netherLoadKeys = Object.keys(netherChunks)
this.endLoadFrom = endChunks
this.endLoadKeys = Object.keys(endChunks)
this.spawnPoint.y = superflat ? 6 : (round(this.noiseProfile.noise(8 * generator.smooth, 8 * generator.smooth) * generator.height) + 2 + generator.extra)
Object.assign(this.settings, defaultWorldSettings)
}
setResourcePacks(inactive,active){
this.activeResourcePacks.length = 0
this.activeResourcePacks.push(...active)
this.resourcePacks.length = 0
this.resourcePacks.push(...inactive)
this.sendAll({type:"resourcePacks",resourcePacks:this.resourcePacks,activeResourcePacks:this.activeResourcePacks})
}
loadMod(code){
this.mod = code
if(this.modContainer){
this.modContainer.contentWindow.postMessage({close:true})
this.modContainer.remove()
}
//const modURL = window.URL.createObjectURL(new Blob([document.querySelector('#modPreCode').text,"const host="+(host?"true":"false")+"\n",data], { type: "text/javascript" }))
const sandboxURL = window.URL.createObjectURL(new Blob([`
<!doctype html>
<html><head><meta charset="utf-8"></head><body><script>
let worker
addEventListener('message',e => {
if(e.data.createWorker){
const workerURL = window.URL.createObjectURL(new Blob(e.data.data, { type: "text/javascript" }))
worker = new Worker(workerURL)
worker.onmessage = e => {
window.parent.postMessage(e.data, "*")
}
}else if(e.data.close){
worker.terminate()
}else{
worker.postMessage(e.data)
}
})
window.parent.postMessage({ready:true}, "*")
<\/script></body></html>
`], { type: 'text/html' }))
let mod = this.modContainer = doc.createElement("iframe")//new Worker(modURL)
mod.src = sandboxURL
mod.className = "hidden"
mod.sandbox = "allow-scripts"
doc.body.appendChild(mod)
let world = this
const safeFunctions = ["getBlock","setBlock","getTags","setTags","getTagByName","setTagByName"]
const safeGlobalFunctions = {showTitle,sideMessage,customMenu,safeEval}
mod.messageListener = addEventListener('message',e => {
if(e.source !== mod.contentWindow) return
if(e.data.ready){
mod.contentWindow.postMessage({
createWorker:true,
data:[
document.querySelector('#modPreCode').text.replace("SAFEFUNCTIONS",JSON.stringify(safeFunctions)).replace("SAFEGLOBALFUNCTIONS",JSON.stringify(Object.keys(safeGlobalFunctions)))+"\n",
"const host="+(host?"true":"false")+"\n",code
]
},"*")
}else{
const {data} = e
if(safeFunctions.includes(data.action)){
mod.contentWindow.postMessage({id:data.id,data:world[data.action](...data.data)},"*")
}else if(safeGlobalFunctions[data.action]){
mod.contentWindow.postMessage({id:data.id,data:safeGlobalFunctions[data.action](...data.data)},"*")
}
}
})
}
onpos(){
/*let entities = this.getEntities(), arr = [], length = 0
for(let i=0; i<entities.length; i++){
let ent = entities[i]
let l = ent.length
if(length+l > 10000){
this.sendAll({type:"entityPosAll", data: arr})
length = 0
arr.length = 0
}
length += l
arr.push(ent)
}
if(length) this.sendAll({type:"entityPosAll", data: arr})*/
this.sendAll({type:"settings", data:this.settings, time:this.time, weather:this.weather})
}
//c must be a connection: {send: function, onmessage, onclose, close: function}	
/*p: {
loadChunks: chunks that need to be sent to player,
loadDistance
update,
updateingLoaded,
updateingLoadedI
}*/
serverAddPlayer(c, id, username, host = false, admin = false){
let p = new Player()
p.id = id
p.host = host
p.connection = c
p.admin = admin
p.loadChunks = [], p.loadDistance = 0
p.posUpdated = {} //List of updated player positions
p.lastSendEntities = 0
p.updateingLoadedI = 0
this.players.push(p)
let world = this
function sendOthers(msg){
for(let p2 of world.players){
if(p2 !== p) p2.connection.send(msg)
}
}
c.onmessage = async function(data){
p.posUpdated = []//other player position updated
if(data.type === "connect"){
username = p.username = username || data.username
await Promise.all(world.loadPromises)
//let saveStr = world.getSaveString()
let inv = world.playersInv[host ? ":host" : data.USER]
if(inv){//older stuff
if(typeof inv.inv === "string"){
inv.inv = atoarr(inv.inv)
}
if(typeof inv.survivStr === "string"){
inv.survivStr = atoarr(inv.survivStr)
}
}
c.send({
type:"loadSave",
name:world.name,
mod: world.mod,
id: world.id,
inv,
whitelist:world.whitelist,banned:world.banned,
resourcePacks:world.resourcePacks,
activeResourcePacks:world.activeResourcePacks,
spawnPointX:world.spawnPoint.x,
spawnPointZ:world.spawnPoint.z,
spawnPointY:world.spawnPoint.y,
version:world.version,
weather:world.weather,
time:world.time,
survival:world.survival?(world.survival==="hardcore"?2:1):0,
cheats:world.cheats,
usePreBeta:world.usePreBeta
})
c.send({
type:"serverCmds",
data:world.serverCommands
})
}else if(data.type === "pos"){
let pos = data.data
p.setPos(pos.x,pos.y,pos.z,pos.velx,pos.vely,pos.velz)
p.setRot(pos.rx, pos.ry, pos.bodyRot)
p.sneaking = pos.sneaking
p.dimension = pos.dimension
p.survival = pos.survival
p.harmEffect = pos.harmEffect
/*if(thisplayer.username !== pos.username){
thisplayer.username = pos.username
//thisplayer.changeBlock(abs((pos.username || "").hashCode()) % 80 + 1)
}*/
p.crackPos = pos.crackPos
p.crack = pos.crack //crack number
p.burning = pos.burning
p.holding = pos.holding || 0
p.walking = pos.walking
p.sprinting = pos.sprinting
p.punchEffect = pos.punchEffect
p.eating = pos.eating
p.sleeping = pos.sleeping
p.sitting = pos.sitting
p.swimming = pos.swimming
p.usingItem = pos.usingItem
p.hidden = pos.hidden
p.spectating = pos.spectating
p.afk = data.afk
p.scale = pos.scale
if(data.inv){
world.playersInv[host ? ":host" : data.USER] = data.inv
}
p.pos = data
delete p.pos.inv
for(let p2 of world.players){
if(p2 !== p && p2.pos) p2.posUpdated[id] = p.pos
}
for(let u in p.posUpdated){
p.send(p.posUpdated[u])
p.posUpdated[u] = null
}
let now = performance.now()
if(now - p.lastSendEntities > 125){
p.lastSendEntities = now
let entities = world.getEntities(p), arr = [], length = 0
for(let i=0; i<entities.length; i++){
let ent = entities[i]
let l = ent.length
if(length+l > 10000){
p.connection.send({type:"entityPosAll", data: arr})
length = 0
arr.length = 0
}
length += l
arr.push(ent)
}
if(length) p.connection.send({type:"entityPosAll", data: arr})
}
c.send({type:"canSendPos"})
}else if(data.type === "loadChunks"){
p.updateingLoadedI++
p.loadDistance = data.loadDistance
p.loadChunks = data.data
p.dimension = data.dimension
world.loadedUpdate = true
}else if(data.type === "mySkin" || data.type === "particles" || data.type === "achievment" || data.type === "hit" || data.type === "harmEffect" || data.type === "playSound" || data.type === "title" || data.type === "joined"){
sendOthers(data)
}else if(data.type === "message"){
data.fromServer = false
data.username = username
sendOthers(data)
}else if(data.type === "setBlock"){
let pos = data.data
world.setBlock(pos.x, pos.y, pos.z, pos.block, false, false, true, pos.keepTags, pos.dimension)
sendOthers(data)
}else if(data.type === "setTags"){
world.setTags(data.x,data.y,data.z,data.data, true, data.dimension, data.lazy)
sendOthers(data)
}else if(data.type === "serverChangeBlock"){
world.serverChangeBlock(data.x,data.y,data.z,data.dimension,data.action,data.block,data.drop,data.dropAmount,data.prevBlock,data.prevTags,data.p)
}else if(data.type === "entityPos"){
world.posEntity(new BitArrayReader(data.data, true), true)
sendOthers(data)
}else if(data.type === "entityDelete"){
world.deleteEntity(data.id, true)
sendOthers(data)
}else if(data.type === "entEvent"){
var ent = world && world.entities[world.getEntity(data.id)]
if(!ent) return
if(data.event === "itemAmount"){
ent.amount = data.data
}else if(data.event === "damageMob"){
ent.onhit(data.data.damage,true,data.data.vx,data.data.vz,data.data.from)
}else if(data.event === "creeperForceExplode"){
ent.forceExplode(true)
}else if(data.event === "sheepFur"){
ent.fur = data.data
}else if(data.event === "sheepEat"){
ent.eating = 1
}else if(data.event === "sheepColor"){
ent.color = data.data.color
ent.wool = data.data.wool
}else if(data.event === "mobAttack"){
ent.attackCooldown = ent.maxAttackCooldown
}else if(data.event === "vel"){
ent.velx = data.data.x
ent.vely = data.data.y
ent.velz = data.data.z
}else if(data.event === "tame"){
ent.tame = true
ent.owner = data.data
}else if(data.event === "wolfCollarColor"){
ent.color = data.data
}else if(data.event === "sit"){
ent.sitting = data.data
}else if(data.event === "tp"){
ent.x = data.data.x
ent.y = data.data.y
ent.z = data.data.z
ent.lastY = 0
if(ent.path) ent.path = null
}else if(data.event === "wolfTarget"){
ent.target = data.data
}else if(data.event === "healthAdd"){
ent.health += data.data
}else if(data.event === "name"){
ent.name = data.data
}
sendOthers(data)
}else if(data.type === "kill"){
if(data.data === "@a"){
sendOthers({type:"kill",data:data.message})
}else{
this.sendPlayerName({
type:"kill",
data:data.message
}, data.data)
}
}else if(data.type === "die"){
p.die = true
}else if(data.type === "remoteControl"){
if(host || admin) this.sendPlayer(data,data.TO)
}else if(data.type === "diamondsToYou"){
this.sendPlayer(data,data.TO)
}else if(data.type === "serverCmd"){
runCmdFromClient(data.data,data.args,p,data.scope||{},world,data.id)
}
}
c.onclose = function(){
let i = world.players.indexOf(p)
if(i !== -1) world.players.splice(i,1)
for(let p2 of world.players){
delete p2.posUpdated[id]
}
}
p.updateLoaded = async function(){
if(this.updateingLoaded) return
let id = this.updateingLoadedI
this.updateingLoaded = true
for(let i=0; i<p.loadChunks.length; i+=2){
if(this.updateingLoadedI !== id) break
let x = p.loadChunks[i], z = p.loadChunks[i+1]
let chunk = world.getChunk(x*16,z*16,p.dimension)
if(chunk && chunk.allGenerated){
c.send({
type:"chunkData",
x,z,
data:await chunk.getData(),
tops:chunk.tops,
solidTops:chunk.solidTops,
biomes:chunk.biomes,
caveY:chunk.caveY,
caveBiomes:chunk.caveBiomes
})
p.loadChunks.splice(i,2)
i -= 2
}
}
this.updateingLoaded = false
}
}
sendAll(msg){
for(let p of this.players) p.connection.send(msg)
}
sendPlayerName(msg, to){
for(var p of this.players){
if(p.username === to){
p.connection.send(msg)
}
}
}
sendPlayer(msg, to){
for(var p of this.players){
if(p.id === to){
p.connection.send(msg)
}
}
}
sendAllInChunk(msg,x,z,dimension){
for(let p of this.players){
if(p.dimension === dimension && maxDist(x,z,round(p.x/16),round(p.z/16)) <= p.loadDistance){
p.connection.send(msg)
}
}
}
close(){
sendAllWorkers({deleteSeed:this.worldSeed})
for(let p of this.players) p.connection.close()
clearInterval(this.pos)
if(this.modContainer){
this.modContainer.contentWindow.postMessage({close:true})
this.modContainer.remove()
}
}
}
win.ServerWorld = World
function initServerEverything(){
constVersion(version)
initBlockData()
initShapes()
sendAllWorkers({blockIds:generateBlockIds,biomeIds,blockStates:{CROSS,LAYER1,LAYER2,LAYER3,LAYER4,LAYER5,LAYER6,LAYER7,LAYER8,isCube},semiTrans:semiTransBlocks})
}
win.initServerEverything = initServerEverything
}