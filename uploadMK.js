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
	let str = await fs.readFile(__dirname+"/src/minekhan.html", { encoding: 'utf8' })
	let str2 = await fs.readFile(__dirname+"/src/minekhan-world.js", { encoding: 'utf8' })
	let minify = (await import("minify")).minify
	console.log("Minifying...")
	let whereInsert = str.indexOf("//INSERT-SERVER-CODE-HERE")
	let content = await minify.html(str.substring(0,whereInsert)+str2+str.substring(whereInsert))//,{html:{minifyJS:{compress:{keep_classnames:true}}}} //complicated because i had to look through a lot of package's code
	console.log("Saving")
	await fs.writeFile(__dirname+"/index.html", content)
})()