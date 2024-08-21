//run in shell: node --expose-gc minify.js
//it minifies html in index-unminified.txt and puts it in index.html
const fs = require("fs")
import('minify').then(async r => {
  let minify = r.minify
  console.log("Reading original...")
  let file = await fs.promises.readFile("index-unminified.txt",{ encoding: 'utf8' })
  console.log("Minifying...")
  let content = await minify.html(file,{html:{minifyJS:{compress:{keep_classnames:true}}}}) //complicated because i had to look through a lot of package's code
  console.log("Writing result...")
  // directly writing index.html won't work with code or the editor
  await fs.promises.writeFile("c.html",content)
  await fs.promises.rename("c.html","index.html")
  console.log("Collecting garbage...")
  global.gc()
  console.log("Done!")
  process.exit()
})