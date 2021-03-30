const express = require('express');
const http = require('http');
const app = express();
const server  = http.createServer(app);
app.use(express.static('public'));

server.listen(80, () => {
    console.log("Server started",80);
});