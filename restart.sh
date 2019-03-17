cd basic-network
./stop.sh
docker stop $(docker ps -a -q)
./teardown.sh
./start.sh
cd ../commercial-paper/organization/magnetocorp/configuration/cli/
docker-compose -f docker-compose.yml up -d cliMagnetoCorp
cd ../../contract
docker exec cliMagnetoCorp peer chaincode install -n papercontract -v 0 -p /opt/gopath/src/github.com/contract -l node
docker exec cliMagnetoCorp peer chaincode instantiate -n papercontract -v 0 -l node -c '{"Args":["org.papernet.commercialpaper:instantiate"]}' -C mychannel -P "AND ('Org1MSP.member')"
cd ../../digibank/configuration/cli
docker-compose -f docker-compose.yml up -d cliDigiBank
