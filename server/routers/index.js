const multer = require("multer");

const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;

const db = require("../models/index");
const File = db.files;
const { todoItems } = require('../controllers');
module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));
const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"./uploads")
    },
    filename: function(req,file,cb){
            cb(null,file.originalname)
    }
})
const upload=multer({storage: storage});
app.post("/uploads",upload.single("file"),function(req,res){
    console.log(req.file);
    res.send("Upload file thanh cong");
    
})
  app.post('/api/todos', todosController.create);
  app.get('/api/todos', todosController.list);
  app.post('/api/todos/:todoId/items', todoItemsController.create);
  app.post('/api/upload/:todoId/items', todoItemsController.uploadFile);
  app.get('/api/todos/:todoId', todosController.retrieve);
  app.put('/api/todos/:todoId', todosController.update);
  app.delete('/api/todos/:todoId', todosController.destroy);
  app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
  app.delete('/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy);
  
  // For any other request method on todo items, we're going to return "Method Not Allowed"
  app.all('/api/todos/:todoId/items', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
  }));
};