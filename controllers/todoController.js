var bodyParser = require('body-parser');
var urlencoded = bodyParser.urlencoded({extended:false});
var mongoose = require('mongoose');

//Connect to database
mongoose.connect("mongodb://test:test12@ds119024.mlab.com:19024/nodetest")

// DB Model
var todoSchema = new mongoose.Schema({
    item: String
})
var Todo = mongoose.model('Todo', todoSchema)


module.exports = function(app) {

    // Get Todos
    app.get('/todo', function(req, res){
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos: data})
        });
        
    });

    // Post New Todo - Ajax
    app.post('/todo', urlencoded, function(req, res){
            // Get Data From Ajax
            var todos = req.body
            // Save MongoDB
            Todo(todos).save(function(err, data){
                if(err) throw err;
                // Return Updated Data
                res.json(data)
            })
    });

    // Delete Todo
    app.post('/todo/del', urlencoded, function(req, res){
            Todo.find({item: req.body.item}).remove(function(err, data){
                if (err) throw err
                res.json(data);
            })
    });

}