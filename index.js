const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');



//Server //

const dataRead = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
var dataObj = JSON.parse(dataRead);
const tempOverview = fs.readFileSync(
    `${__dirname}/templates/template_overview.html`,
    'utf-8'
);
const tempCard = fs.readFileSync(
    `${__dirname}/templates/template_card.html`,
    'utf-8'
);
const tempProduct = fs.readFileSync(
    `${__dirname}/templates/template_product.html`,
    'utf-8'
);



const server = http.createServer((req, res) => {
    const { query } = url.parse(req.url, true);
    const { pathname } = url.parse(req.url, true);

    //OVERVIEW PAGE
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        const cardsHtml = dataObj
            .map(el => {
                return replaceTemplate(tempCard, el);
            })
            .join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        res.end(output);
    }
    //PRODUCT PAGE
    else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }
    //API
    else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(dataRead);
    }
    //NOT FOUND
    else {
        res.end("The page couldn't be found");
        res.writeHead(404, {
            'Content-type': 'text/html',
            'My-name': 'Vladimir Balaur'
        });
    }
    res.end("Hello world, this is the server that we've created");
});

server.listen(10, '127.0.0.1', () => {
    console.log('Listening to request on port 10');
});
