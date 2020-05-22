const http = require('http')
const url = 'http://gyandeepshikshabharati.com'

http.get(url , (response)=>{
  let buff = ''
  let c = 0
  response.on('data',(chunk)=>{
    buff+=chunk
    ++c
  })
  response.on('end',()=>{
    console.log(buff,c)
  })
}).on('error',(error)=>{
  console.error('Got error : ' , error)
})
