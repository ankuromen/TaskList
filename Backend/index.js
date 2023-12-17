const express=require("express")
var cors = require('cors')
var MongoClient = require('mongodb').MongoClient;
const mongoose=require("mongoose")
const app=express();
app.use(express.json())
const Users=require("./model/user");
const loginroutes=require("./routes/login")
const middleware =require("./middleware/middleware.js")

const dotenv = require('dotenv').config()
app.use(cors())

let dburl=process.env.DB_URL


mongoose.connect(dburl).then(()=>{
    console.log("Connected Successfuly")
}).catch((error)=>{
    console.log("Error Coonection DB",error);
});

const Task = mongoose.model('Task', {
    content: String,
  });

app.use('/api',loginroutes)

app.get('/api/tasks', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json({ tasks });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/api/tasks', async (req, res) => {
    const { content } = req.body;
  
    try {
      const task = new Task({ content });
      await task.save();
      res.json({ task });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.put('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
  
    try {
      const task = await Task.findByIdAndUpdate(id, { content }, { new: true });
      res.json({ task });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


app.delete('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await Task.findByIdAndDelete(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  






const PORT=process.env.PORT||5055;
app.listen(PORT,()=>{
    console.log("Server is Running on port "+ PORT )
})
