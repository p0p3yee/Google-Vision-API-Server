#!/bin/node
require("dotenv").config();
const fs = require("mz/fs");
const request = require("request");
const path = require("path");
const util = require("util");

if(process.argv.length < 3){
    console.log("Please pass the image path as argument.");
    process.exit(1);
}

async function sendRequest(path){
    console.log("Sending request of path: " + path)
    try{
        request.post({
            url: `http://localhost:${process.env.port || 8080}/ocr`,
            form: {
                data: Buffer.from(await fs.readFile(path)).toString("base64")
            },
            json: true
        }, (err, res) => {
            if(err){
                console.error(`Error in request of Image Path: "${path}" : `, err);
            }

            console.log(`Response of Image Path: "${path}" : `, util.inspect(res.body, false, null, true));
        })
    }catch(e){
        console.error(`Error of Image Path: "${path}" : `, e);
    }
}

(async function(){
    const arg = process.argv[2];
    const pathStat = await fs.lstat(arg).catch(e => {
        console.error(`Error in reading path stat: ${arg} :`, e);
        process.exit();
    });
    if(pathStat.isFile()){
        sendRequest(arg);
    }else{
        const allFile = await fs.readdir(arg).catch(e => {
            console.error(`Error in reading directory: ${arg} :`, e);
            process.exit();
        });
        for(var i = 0; i < allFile.length; i++){
            var currentPath = path.join(arg, allFile[i])
            var fileStat = await fs.lstat(currentPath).catch(e => {
                console.error(`Error in reading Path: ${currentPath} :`, e);
                process.exit();
            });
            if(fileStat.isDirectory()) continue;
            sendRequest(currentPath)
        }
    }
})()