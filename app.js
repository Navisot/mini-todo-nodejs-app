var express = require('express')
var todoController = require('./controllers/todoController')

// Initialize App
var app = express();
// Template Engine
app.set('view engine', 'ejs')
// Map Static Folder - Express Middleware
app.use(express.static('./public'))

// Fire Controllers
todoController(app)

//Listen
app.listen(3000)

console.log('Application listening to port 3000...')