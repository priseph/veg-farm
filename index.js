const fs = require('fs')
const http = require('http')
const url = require('url')

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
//SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const productData = JSON.parse(data)
const server = http.createServer((req, res) => {
  const pathName = req.url

  if (pathName === '/' || pathName === '/overview') {
    res.end('Home page')
  } else if (pathName === '/product') {
    res.end('Product page')
  } else if (pathName === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(data)
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.end('<h1>Wetin you dey find here</h1>')
  }
})

server.listen(8000, 'localhost', () => {
  console.log('Server listening on port 8000')
})
