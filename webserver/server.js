const http = require("http");
const host = '127.18.1.1';
const port = 8000;
let count = 0;
const requestListener = function (req, res) {
    count++;
    if(count % 100 == 0){
        console.log(count);
    }
    res.writeHead(200);
    res.end("okay!!");
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});