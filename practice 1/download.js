const http = require('http')
const fs = require('fs')
const path = require('path')
const uuidv = require('uuid')

const downloadPage = (url = 'http://coursera.org') => {
  console.log('Downloading', url)
  const fetchPage = (url  , callback) => {
    http.get(url,(res) => {
      let buff = ''
      res.on('data',(chunk)=> {
        buff+=chunk
      })
      res.on('end',()=>{
        callback(null,buff)
      })
    }).on('error',(error)=>{
      console.error(`Got error : ${error.message}`)
      callback(error)
    })
  }
  const folderName = uuidv()
  fs.mkdirSync(folderName)
  fetchPage(url,(error , data)=>{
    if (error) return console.log(error)
    fs.writeFileSync(path.join(__dirname, folderName, 'url.txt'), url)
    fs.writeFileSync(path.join(__dirname, folderName, 'file.html'), data)
    console.log('downloading is done in folder ', folderName)
  })
}
downloadPage(process.argv[2])
