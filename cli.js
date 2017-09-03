#!/usr/bin/env node
'use strict';

const search = require('./search');
const process = require('process');

(async()=>{
  if(process.argv[2] === "help") {
    console.log('./cli.js "keywords" "http://url-goes-here.com"');
    process.exit();
  }

  if(process.argv[2] && process.argv[3]) {
    search(process.argv[2], process.argv[3]).then(v=>{
      console.log(JSON.stringify(v, null, 4));
      process.exit();
    })
  } else {
    console.log('missing arguments');
    process.exit(1);
  }
})()


