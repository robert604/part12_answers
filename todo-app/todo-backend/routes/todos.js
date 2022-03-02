const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  console.log('in get todos')
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = req.todo
  if(!todo) res.sendStatus(405);
  res.send(todo)  
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todo = req.todo
  if(!todo) res.sendStatus(405)
  const id = todo._id
  const toUpdate = req.body
  const result = await Todo.findByIdAndUpdate(id,toUpdate)
  res.sendStatus(200)
 

});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
