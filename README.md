# Google-Vision-API-Server

API Server for converting base64 to image and send to google vision api for OCR.

## How to use:

Create `.env` file and type following:

```
path=Complete Path to your vision api credentials json file
```

example:

```
path=/home/user/credential.json
```

1. `npm install`

2. `npm start`

3. `node requester.js imagepath`


## API Method(s):

`POST Method: /ocr`

Params:

`data: ImageInBase64`