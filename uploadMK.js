/*
To run:
node uploadMK.js
*/
let fs=require("fs").promises
;(async function(){
	console.log("Reading...")
	//let files = await fs.readdir("minekhan/")
	//let str = await fs.readFile("public/minekhan/"+files.find(r => r.startsWith("_mksrc") && r.endsWith(".html")), { encoding: 'utf8' })
	//let str2 = await fs.readFile("public/minekhan/"+files.find(r => r.startsWith("_mksrc") && r.endsWith("-world.js")), { encoding: 'utf8' })
	let str = await fs.readFile(__dirname+"/minekhan.html", { encoding: 'utf8' })
	let str2 = await fs.readFile(__dirname+"/minekhan-world.js", { encoding: 'utf8' })
	let strservers = await fs.readFile(__dirname+"/servers.js", { encoding: 'utf8' })
	let minify = (await import("minify")).minify
	console.log("Minifying...")
	str = str.replace('<script src="minekhan-world.js">', "<script>"+str2)
	str = str.replace('<script src="servers.js">', "<script>"+strservers)
	//let content = str.replace(/(?<=\n)( |\t)+/g,"").replace(/(?<=\n)\n+/g,"")
	let content = await minify.html(str, {html:{minifyJS:{format: { semicolons: false }}, preserveLineBreaks:true,removeAttributeQuotes:false,removeRedundantAttributes:false}}) //complicated because i had to look through a lot of package's code
	console.log("Saving")
	await fs.writeFile(__dirname+"/index.html", content)
})()