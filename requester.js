#!/bin/node
require("dotenv").config();
const fs = require("mz/fs");
const request = require("request");

if(process.argv.length < 3){
    console.log("Please pass the image path as argument.");
    process.exit(1);
}

(async function(){
    try{
        request.post({
            url: `http://localhost:${process.env.port || 8080}/ocr`,
            form: {
                data: Buffer.from(await fs.readFile(process.argv[2])).toString("base64")
            },
            json: true
        }, (err, res) => {
            if(err){
                console.error("Error in Request: ", err);
                process.exit(1);
            }

            console.log("Response: ", res.body);
        })
    }catch(e){
        console.error("Error: ", e);
        process.exit(1);
    }
})()