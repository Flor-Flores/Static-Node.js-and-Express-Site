const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
var indexRouter = require('./routes/index')

app.set('view engine', 'pug')

app.use( '/static', express.static('public') )

app.use('/', indexRouter)



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

