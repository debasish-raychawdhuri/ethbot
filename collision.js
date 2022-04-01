let prod = 1;
for(let i=1;i<=process.argv[2];i++){
    prod*=(1-(i/process.argv[3]));
}

console.log(prod);