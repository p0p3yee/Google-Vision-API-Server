require("dotenv").config();
const vision = require('@google-cloud/vision');
const fs = require("mz/fs");
const crypto = require("crypto");
const regexFinder = require("../Regex");

process.env.GOOGLE_APPLICATION_CREDENTIALS = process.env.path;

const client = new vision.ImageAnnotatorClient();

module.exports = async (req, res) => {
    if(!!!req.body.data) return res.json({
        error: "base64 not found."
    });

    const base64 = req.body.data.replace(/^data:image\/(png|jpg);base64,/, "");
    const ext = base64[0] == "/" ? "jpg" : "png";
    try{
        const fileName = `${crypto.randomBytes(8).toString("hex")}-${Date.now()}.${ext}`;
        await fs.writeFile(fileName, base64, "base64");
        const [result] = await client.textDetection(fileName);
        const text = result.textAnnotations[0].description.split("\n")
        setTimeout(async () => {
            try{
                await fs.unlink(fileName);
            }catch(e){
                console.error("Error in delete file: ", e);
            }
        }, 1000 * 10);

        const regexResult = [];
        text.forEach(v => !!v && regexResult.push(regexFinder.findMatch(v)));
    
        return res.json({
            raw: text,
            parsed: regexResult,
            isNewID: regexFinder.isNewCard(text)
        })
    }catch(e){
        console.error("Error in OCR: ", e);
        return res.json({
            error: e
        })
    }
    
    
    return res.json()
}