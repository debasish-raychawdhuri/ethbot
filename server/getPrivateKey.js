var keythereum = require("keythereum");
var datadir = "/root/gethdir";
var address= "0xAe930f01A40776B27E0bb92262537b3a83F92779";
const password = Buffer.from("", 'utf8');

var keyObject = keythereum.importFromFile(address, datadir);
var privateKey = keythereum.recover(password, keyObject);
console.log(privateKey.toString('hex'));
