const mongoose = require('mongoose')
const errorhandler = require('errorhandler')
const logger = require('morgan')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/test')

const express = require('express')
const app = express()


app.use(bodyParser.json())
app.use(errorhandler())
app.use(logger('dev'))

const accounts = mongoose.model('Accountt' ,
  {name: String ,
  balance : Number}
)

app.use((req,res ,next)=>{
  console.log(`${req.method} : ${req.url}`)
  next()
})

app.get('/', (req, res) => res.send('Hello World!'))


app.get('/accounts' , (req,res,next) =>{
  accounts.find(function(err,accoun){
    res.json(accoun);
  })
})

app.post('/accounts' , (req,res,next) =>{
  let x = new accounts(req.body)
  x.save((error,result)=>{
    if (error) {
      console.error(error)
      res.send({msg: 'Failed to add Data'});
    } else {
      res.send('Data added sucessfully');
      console.log('saved',result)
    }
  })
})


app.put('/accounts/:id' , (req,res,next) =>{
  let y = new accounts(req.body)
  accounts.update({_id:req.params.id}, req.body , (err,result)=>{
    if(err)
    {
      res.json(err);
    }
    else {
      res.json(result);
    }
  })
})


app.delete('/accounts/:id' , (req,res,next) =>{
  accounts.deleteOne({_id:req.params.id} , function(err,result){
    if(err)
    {
      res.json(err);
    }
    else {
      res.json(result);
    }
  })
})





app.listen(3000)
