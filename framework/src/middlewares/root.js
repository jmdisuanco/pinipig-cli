const fs = require('fs')
const path = require('path')

let sendFile = (path, res)=>{
    console.log('hello')
    fs.readFile(path, (err,data)=>{
        if(err) {
            res.writeHead(401)
            console.log(err)
            res.end()
        }else{
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(data)
        }
    })
}

let Root = (ctx) => {
      ctx.res.writeHead(200, { 'Content-Type': 'text/html' });
     sendFile( path.join(__dirname,'../public/index.html'), ctx.res)
    
 }
 module.exports = Root
