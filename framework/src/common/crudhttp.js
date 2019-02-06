ObjectID = require('mongodb').ObjectID

let read = model => (ctx) => {
  let id
  ObjectID.isValid(ctx.data.id) ? id = ObjectID(ctx.data.id) : id = parseInt(ctx.data.id)
  model.find({
    where: {
      _id: id
    }
  }, (err, data) => {
    if (err) return err
    ctx.res.end(JSON.stringify(data))
  })
}

let readList = model => (ctx) => {
  let urlQuery = ctx.query //getURLQuery(ctx)
  let query = {}
  let count = 0
  if (urlQuery) {
    urlQuery.limit != undefined ? query.limit = parseInt(urlQuery.limit) : query.limit = 100
    urlQuery.skip != undefined ? query.skip = parseInt(urlQuery.skip) : query.skip = 0
    urlQuery.order != undefined ? query.order = urlQuery.order : null
  }

  model.all(query, (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    model.count({}, (err, c) => {
      let count = c
      let prettify = null
      if (ctx.query != undefined) {
        ctx.query.pretty == 'true' ? prettify = 2 : null
      }
      ctx.res.end(JSON.stringify({
        count: count,
        limit: query.limit,
        skip: query.skip,
        data: data
      }, null, prettify))
    })

  })
}

let create = model => (ctx) => {
  model.create(ctx.data.fields, (err, data) => {
    if (err) {
      ctx.res.end(JSON.stringify(err))
      return
    }
    ctx.res.end(JSON.stringify({
      result: 'created',
      data: data
    }))
  })
}

let update = model => (ctx) => {
  id = ObjectID(ctx.data.id)
  model.exists(id, (err, exists) => {
    if (exists) {
      model.update({
        _id: id
      }, ctx.data.fields, (err, result) => {
        ctx.res.end(JSON.stringify({
          result: 'updated',
          id: id
        }))
      })

    }
  })
}

let destroy = model => (ctx) => {
  id = ObjectID(ctx.data.id)
  model.destroyById(id, (err, result) => {
    ctx.res.end(JSON.stringify({
      result: 'deleted',
      id: id
    }))
  })
}

let count = model => (ctx) => {
  model.count({}, (err, c) => {
    ctx.res.end(JSON.stringify({
      count: c
    }))
  })
}
module.exports = {
  create,
  read,
  readList,
  update,
  destroy, // delete
  count
}