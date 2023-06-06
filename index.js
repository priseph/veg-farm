const fs = require('fs')
const http = require('http')

//const textme = fs.readFileSync('./txt/input.txt', 'utf-8')
//console.log(textme)

//reading file in a file
/*
fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
  fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data1) => {
    console.log(data1)
  })
})
*/
////////////////////////////////////////////////////////////////
//Server
const server = http.createServer((req, res) => {
  res.end('Server worked!')
})

server.listen(8000, 'localhost', () => {
  console.log('Server listening on port 8000')
})
