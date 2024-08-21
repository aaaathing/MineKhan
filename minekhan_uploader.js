//This node.js program uploads minekhan
//Only for using locally

console.log('works')
const fs=require("fs/promises")
const fetch=require("@replit/node-fetch")

const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

rl.question('file (default index): ').then(async(answer) => {
	const auth="Basic "+Buffer.from(":editmk2023-824").toString("base64")
	let doMinify = await rl.question("minify? y/n (default y): ")
	doMinify = !doMinify || doMinify === "y"
	rl.close();
	let file = "public/minekhan/"+(answer || "index")+".html"
	let bigFile = doMinify ? "public/minekhan/index-unminified.txt" : file
	let file2 = "public/minekhan/"+(answer || "")+"-world.js"
	let bigFile2 = doMinify ? "public/minekhan/index-unminified-world.txt" : file2
	console.log("reading")
	let str = await fs.readFile(__dirname+"/minekhan.html", { encoding: 'utf8' })
	let str2 = await fs.readFile(__dirname+"/minekhan-world.js", { encoding: 'utf8' })
	if(doMinify){
		let minify = (await import("minify")).minify
		console.log("Minifying...")
		let whereInsert = str.indexOf("//INSERT-SERVER-CODE-HERE")
		let content = await minify.html(str.substring(0,whereInsert)+str2+str.substring(whereInsert))//,{html:{minifyJS:{compress:{keep_classnames:true}}}} //complicated because i had to look through a lot of package's code
		console.log("saving ",file,file2)
		await fetch(
			"https://thingmaker.us.eu.org/editor/save/"+encodeURIComponent(file),
			{method:"POST",body:content,headers:{Authorization:auth}}
		).then(r => r.text()).then(r => {
			console.log(r)
		})
	}
	str = str.replace(/(?<=\n)( |\t)+/g,"").replace(/(?<=\n)\n+/g,"")
	str2 = str2.replace(/(?<=\n)( |\t)+/g,"").replace(/(?<=\n)\n+/g,"")
	console.log("saving ",bigFile,bigFile2)
	await fetch(
		"https://thingmaker.us.eu.org/editor/save/"+encodeURIComponent(bigFile),
		{method:"POST",body:str,headers:{Authorization:auth}}
	).then(r => r.text()).then(r => {
		console.log(r)
	})
	await fetch(
		"https://thingmaker.us.eu.org/editor/save/"+encodeURIComponent(bigFile2),
		{method:"POST",body:str2,headers:{Authorization:auth}}
	).then(r => r.text()).then(r => {
		console.log(r)
	})
	console.log("reading todo")
	str = await fs.readFile(__dirname+"/todo.txt",{encoding:"utf-8"})
	str = str.substring(0,str.indexOf("DONTMAKEBELOWPUBLIC"))
	file = "public/todo.html"
	console.log("saving "+file)
	await fetch(
		"https://thingmaker.us.eu.org/editor/save/"+encodeURIComponent(file),
		{method:"POST",body:str,headers:{Authorization:auth}}
	).then(r => r.text()).then(r => {
		console.log(r)
	})
	console.log('done')
})