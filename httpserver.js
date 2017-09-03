#!/usr/bin/env node

'use strict';

const http = require('http');
const url = require('url');
const search = require('./search');
const process = require('process');

(async()=> {
    const server = http.createServer( (request, response) => {

        let queryData = url.parse(request.url, true).query;
        let contentType = {"Content-Type":"application/json"};
        if(queryData.keyword && queryData.url) {
            search(queryData.keyword, queryData.url).then(v=>{
                response.writeHead(200, contentType);
                response.end(JSON.stringify(v, 4));
            }).catch(v=>{
                response.writeHead(400, contentType);
                response.end(JSON.stringify(v));
            })
        } else {
            response.writeHead(400, contentType);
            response.end();
        }
    });

    server.listen(process.env.port || 8000);
})();

