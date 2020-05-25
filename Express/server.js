const express = require('express')
const app = express()

app.use((req,res ,next)=>{
  console.log(`${req.method} : ${req.url}`)
  next()
})

app.get('/accounts' , (req,res) =>{
  res.send('Accounts')
})

app.get('/transaction' , (req,res) =>{
  res.send('transaction')
})

app.get('/' , (req,res) =>{
  res.send('Hello world')
})

app.listen(3000)
