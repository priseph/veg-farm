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
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
  output = output.replace(/{%IMAGE%}/g, product.image)
  output = output.replace(/{%QUANTITY%}/g, product.quantity)
  output = output.replace(/{%PRICE%}/g, product.price)
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
  output = output.replace(/{%FROM%}/g, product.from)
  output = output.replace(/{%DESCRIPTION%}/g, product.description)
  output = output.replace(/{%ID%}/g, product.id)

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
  return output
}

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
  const pathName = req.url

  //Overview Page
  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, { 'Content-Type': 'text/html' })

    const cardsHtml = productData
      .map((card) => replaceTemplate(tempCard, card))
      .join('')
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
    res.end(output)

    //Product Page
  } else if (pathName === '/product') {
    res.end('Product page')

    //API
  } else if (pathName === '/api') {
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
