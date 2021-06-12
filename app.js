const express= require('express');
const app = express();
app.use(express.json());


const mongoose = require('./database/mongoose');

const List = require('./database/models/list');
const Task = require('./database/models/task');

app.use((req, res, next) => {

  

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


  // GET API (list)
  app.get('/lists', (req, res) => {
    List.find({})
    .then((lists) => res.send(lists))
    .catch((error)=> console.log(error));
  });

  // Single GET API (list)
  app.get('/lists/:listId', (req, res)=>{
    List.find({ _id: req.params.listId })
    .then((lists) => res.send(lists))
    .catch((error)=> console.log(error));
  })

  // POST API (list)
  app.post('/lists', (req, res) => {
    (new List({'title': req.body.title }))
    .save()
    .then((list)=> res.send(list))
    .catch((error)=> console.log(error));
  });

  // PATCH API (list)
  app.patch('/lists/:listId', (req, res)=>{
    List.findOneAndUpdate({'_id': req.params.listId }, {$set: req.body})
    .then((list)=> res.send(list))
    .catch((error)=> console.log(error));
  });

  // DELETE API (list)
  app.delete('/lists/:listId', (req, res)=>{
    const deleteTasks = (list)=> {
      Task.deleteMany({ _listId: list._id})
      .then(()=> list)
      .catch((error)=> console.log(error));
    };

   List.findByIdAndDelete(req.params.listId)
    .then((list)=> res.send(deleteTasks(list)))
    .catch((error)=> console.log(error));
  res.status(200).send(list);  
  });
// --------------------------------------------------------------------

// GET api (task)
app.get('/lists/:listId/tasks', (req, res) => {
  Task.find({ _listId: req.params.listId })
  // Task.find({ _listId: mongoose.Types.ObjectId(req.params.listId)})
  // Task.find({listId: req.params.listId})
  // Task.find
  // (req.params.listId. console.log(req.params.listId))
  .then((tasks) => res.send(tasks))
    .catch((error)=> console.log(error));

// const a = req.params.listId; 
// console.log({count: a.length})

// app.get('/lists/:listId/tasks', (req, res)=>{
// Task.find({
//   _listId: req.params.listId
// }).then((tasks) => {
//   res.send(tasks);
// })

});

// GET api single (task)
app.get('/lists/:listId/tasks/:taskId', (req, res)=>{
  Task.findOne({ _listId: req.params.listId, _id: req.params.taskId })
  .then((task)=> res.send(task))
    .catch((error)=> console.log(error));
});

//  PATCH api (task)
app.patch('/lists/:listId/tasks/:taskId', (req, res)=>{
  Task.findOneAndUpdate({ _listId: req.params.listId, _id: req.params.taskId}, {$set: req.body})
  .then((task)=> res.send(task))
    .catch((error)=> console.log(error));
})


// POST api (task)
app.post('/lists/:listId/tasks', (req, res)=>{
  (new Task({ '_listId': req.params.listId, 'title': req.body.title }))
  .save()
  .then((tasks)=> res.send(tasks))
    .catch((error)=> console.log(error));
});

//  DELETE api (task)
app.delete('/lists/:listId/tasks/:taskId', (req, res)=>{
  Task.findOneAndDelete({ _listId: req.params.listId, _id: req.params.taskId })
  .then((task)=> res.send(task))
  .catch((error)=> console.log(error));
});


app.listen(3000, () => console.log("Server connected on 3000"));