const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

let book = mongoose.model('Book' , {name: String})

let practicalNoteBook = new book({name : 'Practical node js 2nd'})
practicalNoteBook.save((err,result)=>{
  if (err) {
    console.error(err)
    process.exit(1)
  }else {
    console.log('saved',result)
    process.exit(0)
  }
})
