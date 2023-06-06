const fs = require('fs')
const http = require('http')
const url = require('url')
const replaceTemplate = require('./modules/replaceTemp')

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

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
)
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
)
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
)

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const productData = JSON.parse(data)

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true)

  //Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-Type': 'text/html' })

    const cardsHtml = productData
      .map((card) => replaceTemplate(tempCard, card))
      .join('')
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
    res.end(output)

    //Product Page
  } else if (pathname === '/product') {
    const product = productData[query.id]
    const output = replaceTemplate(tempProduct, product)
    res.end(output)

    //API
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(data)

    //Not Found
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.end('<h1>Wetin you dey find here</h1>')
  }
})

server.listen(8000, 'localhost', () => {
  console.log('Server listening on port 8000')
})
