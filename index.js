const fs = require('fs');
const http = require('http');
const url = require('url');
// const slugify = require('slugify'); //used to replace a string in url with anotehr one for meaningful purpose
const replaceTemplate = require('./modules/replaceTemplate');

/*This is the code from the last tutorials where we had learned the async file manipulation */
// fs.readFile('./txt/output_file.txt',
//     'utf-8', (err, data) => {

//         if (err) throw err;

//         console.log('Our data is read well');

//         fs.readFile('./txt/append.txt', 'utf-8', (err, data1) => {
//             if (err) throw err;

//             fs.writeFile('./txt/final.txt', `${data}\n${data1}`, 'utf-8', (err) => {
//                 if (err) throw err;
//             });
//         });

//     });

// console.log('Will read the file now');

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

// const slugs = dataObj.map(el => {
//     return slugify(el.productName, { lower: true });
// });
// console.log(slugs);

const server = http.createServer((req, res) => {
    const { query } = url.parse(req.url, true);
    const { pathname } = url.parse(req.url, true);

    //OVERVIEW PAGE
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        //we use .join() in order to parse everything into a string
        // .map() is used to call a callback function for each element in an array, by default arrow functions without colons return something, if we specify the colons then we have to write 'return'
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