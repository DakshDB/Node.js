const http  = require('http')
const port = 3000
http.createServer((req,res)=>{
  res.writeHead(202,{'Content-Type': 'text/plain'})
  res.end('hello world\n')
}).listen(port)

console.log(`Server running at http://localhost:${port}/`)
