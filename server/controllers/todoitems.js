const TodoItem = require('../models').TodoItem;

const multer = require("multer");
const storage=multer.diskStorage({
  destination: function(req,file,cb){
      cb(null,"./uploads")
  },
  filename: function(req,file,cb){
          cb(null,file.originalname)
  }
})
const upload=multer({storage: storage});
module.exports = {
  create(req, res) {
    return TodoItem
      .create({
        content: req.body.content,
        todoId: req.params.todoId,
        //image: req.body.filename,
      })
      .then(todoItem =>res.status(201).send(todoItem))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return TodoItem
      .findOne({
          where: {
            id: req.params.todoItemId,
            todoId: req.params.todoId,
          },
        })
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'TodoItem Not Found',
          });
        }
  
        return todoItem
          .update({
            content: req.body.content || todoItem.content,
            complete: req.body.complete || todoItem.complete,
          })
          .then(updatedTodoItem => res.status(200).send(updatedTodoItem))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  
  destroy(req, res) {
    return TodoItem
      .findOne({
          where: {
            id: req.params.todoItemId,
            todoId: req.params.todoId,
          },
        })
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'TodoItem Not Found',
          });
        }
  
        return todoItem
          .destroy()
          .then(() => res.status(204).send({
              message: "Delete successfully...",
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  uploadFile(req, res){
  return  TodoItem
  .create({
      image: req.file.originalname,
    })
    .then(() => {
      res.json({msg:'File uploaded successfully! -> filename = ' + req.file.originalname});
    })
    .catch(err => {
      console.log(err);
      res.json({msg: 'Error', detail: err});
    });
  }
  
};