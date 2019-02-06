let find =  (Model, ctx, query) => {  
    console.log('find')
    Model.find(query, (err, data) => {
         if(err){
           ctx.err = err
           return ctx
         }else{
           ctx.data = data
           return ctx
        }
    } )
 }

let findById = (ctx, Model)=>{
    let serve = (err, data)=>{
        if(err){
            ctx.res.writeHead(401, { 'Content-Type': 'application/json' })
            ctx.res.end('Error')
        }else{
            ctx.res.writeHead(200, { 'Content-Type': 'application/json' })
            if(data !=null){
                ctx.res.end(JSON.stringify(data))
            }else{
                ctx.res.end(JSON.stringify({result:0}))
            }
        }
        
    }
    Model.findById(ctx.data.id, (err, data)=> {serve(err,data)})
}

let create = (ctx, Model)=>{
    let serve = (err, data)=>{
        if(err){
            // ctx.res.writeHead(401, { 'Content-Type': 'application/json' })
            // ctx.res.end('Error')
        }else{
            ctx.res.writeHead(200, { 'Content-Type': 'application/json' })
            if(data !=null){
                ctx.res.end(JSON.stringify(data))
            }else{
                ctx.res.end(JSON.stringify({result:0}))
            }
        }
        
    }
    Model.create(ctx.data.fields, (err, data)=> {serve(err,data)})
}


module.exports = {
    find,
    findById,
    create
}