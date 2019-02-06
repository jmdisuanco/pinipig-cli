const root = require('./root')

let Routes = [root]
let allRoutes = []

let routeLoad = (routeSet) => {
  routeSet.map(route => {
    allRoutes.push(route)
  })
}

Routes.map(routes => {
  routeLoad(routes)
})

module.exports = allRoutes