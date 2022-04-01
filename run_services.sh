./geth --http --http.port 8546 --http.corsdomain '*' --networkid 2010 --http.api "personal,eth,net,web3,txpool,admin" --nodiscover  --datadir gethdir --port 30304 --syncmode "light" --verbosity 9 &
nodejs bot.js > output &

wait 
exit $?
